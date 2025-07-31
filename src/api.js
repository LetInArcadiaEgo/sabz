import { listingToApiFormat } from './models/Listing';
import { supabase } from './supabaseClient';

const API_BASE_URL = import.meta.env.VITE_API_BASE || 'http://localhost:3001';

// Helper function to add auth headers to requests
const withAuth = async (init = {}) => {
  try {
    const { data: { session }, error } = await supabase.auth.getSession();
    if (error) {
      console.error('Error getting session:', error);
      return init;
    }

    const accessToken = session?.access_token;
    if (!accessToken) {
      return init;
    }

    return {
      ...init,
      headers: {
        ...init.headers,
        Authorization: `Bearer ${accessToken}`,
      },
    };
  } catch (error) {
    console.error('Error adding auth headers:', error);
    return init;
  }
};

// Helper function to make authenticated requests with retry on 401
const authenticatedFetch = async (url, init = {}) => {
  // First attempt with auth
  const authInit = await withAuth(init);
  let response = await fetch(url, authInit);

  // If 401 (token expired), try to refresh and retry once
  if (response.status === 401) {
    try {
      const { error } = await supabase.auth.refreshSession();
      if (error) {
        console.error('Failed to refresh session:', error);
        throw new Error('Authentication failed');
      }

      // Retry with new token
      const refreshedAuthInit = await withAuth(init);
      response = await fetch(url, refreshedAuthInit);
    } catch (refreshError) {
      console.error('Session refresh failed:', refreshError);
      throw new Error('Authentication failed');
    }
  }

  return response;
};

/* fetches only approved rows */
export async function fetchApproved() {
  const r = await fetch(`${API_BASE_URL}/api/listings`);
  const { data } = await r.json();
  return data;
}

/* sends a new listing (status will be 'pending') + images */
export async function createListing(draft) {
  // Convert to API format using centralized function
  const listingPayload = listingToApiFormat(draft);
  
  // Payload prepared for backend
  
  // Handle both images (create flow) and photos (edit flow)
  const imageFiles = draft.images || draft.photos || [];

  const form = new FormData();
  form.append('listing', JSON.stringify(listingPayload));

  // Helper to append images in a way that mirrors the backend seed script
  const appendImagesToForm = async () => {
    const tasks = imageFiles.map(async (img, idx) => {
      // Case 1: Already a File object from <input type="file" />
      if (img instanceof File) {
        form.append('images', img, img.name);
        return;
      }

      // Case 2: A URL string – fetch, convert to Blob, then append
      if (typeof img === 'string') {
        try {
          const response = await fetch(img);
          const blob = await response.blob();
          const mime = blob.type || 'image/png';
          const ext  = mime.split('/')[1] || 'png';
          const filename = `image-${idx + 1}.${ext}`;
          form.append('images', blob, filename);
        } catch (error) {
          console.warn(`⚠️  Skipped image ${img}:`, error);
        }
        return;
      }

      // If we reach here, the type is unsupported
      console.warn('⚠️  Unsupported image type:', img);
    });

    await Promise.all(tasks);
  };

  // Build form data (listing JSON + images)
  await appendImagesToForm();

  const res = await authenticatedFetch(`${API_BASE_URL}/api/listings`, {
    method: 'POST',
    body:   form, // browser sets correct Content-Type with boundary
  });

  const json = await res.json();
  if (!json.success) throw new Error(json.message);
  return json.id;
}

export async function fetchListing(id) {
  if (!id) throw new Error('Listing ID is required');

  const attempt = async (url) => {
    const res = await fetch(url);
    // Try to parse JSON even on non-OK to extract error message
    let json;
    try {
      json = await res.json();
    } catch (_) {
      json = {};
    }

    if (!res.ok || json.success === false) {
      throw new Error(json.message || `Request failed: ${res.status}`);
    }

    return json.data ?? json.listing ?? json; // support various shapes
  };

  const base = `${API_BASE_URL}/api/listings`;
  const primaryUrl = `${base}/${id}`;
  const fallbackUrl = `${base}?id=eq.${id}`; // Supabase style query

  try {
    const data = await attempt(primaryUrl);
    // Handle array response
    return Array.isArray(data) ? data[0] : data;
  } catch (err) {
    const data = await attempt(fallbackUrl);
    return Array.isArray(data) ? data[0] : data;
  }
}

// Updates an existing listing by ID
export async function updateListing(id, payload) {
  if (!id) throw new Error('Listing ID is required');

  // Use centralized API format conversion
  const transformed = listingToApiFormat(payload);

  const res = await authenticatedFetch(`${API_BASE_URL}/api/listings/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(transformed),
  });

  const json = await res.json().catch(() => ({}));

  if (!res.ok || json.success === false) {
    throw new Error(json.message || `Failed to update listing (${res.status})`);
  }

  return json.id ?? id;
}

// Uploads new image Files for an existing listing and returns their public URLs
export async function uploadPhotos(id, files) {
  if (!files?.length) return [];

  // Uploading files

  const form = new FormData();
  files.forEach((f) => form.append('images', f, f.name));

  const res  = await authenticatedFetch(`${API_BASE_URL}/api/listings/${id}/photos`, {
    method: 'PUT',
    body:   form,
  });

  const json = await res.json();
  if (!json.success) throw new Error(json.message || 'Photo upload failed');
  return json.images || [];
}