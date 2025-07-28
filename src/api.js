const API_BASE_URL = process.env.REACT_APP_API_BASE;

/* fetches only approved rows */
export async function fetchApproved() {
  const r = await fetch(`${API_BASE_URL}/api/listings`);
  const { data } = await r.json();
  return data;
}

/* sends a new listing (status will be 'pending') + images */
export async function createListing(draft) {
  // draft.images may contain File objects (from file input) or string URLs
  const {
    images = [],
    propertyType,
    totalArea,
    areaUnit,
    ...rest
  } = draft;

  // Build payload with correct column names for backend
  const listingPayload = {
    ...rest,
    property_type: propertyType || 'house',
    total_area:    typeof totalArea === 'number' ? totalArea : totalArea ? Number(totalArea) : null,
    area_unit:     areaUnit || null,
  };

  const form = new FormData();
  form.append('listing', JSON.stringify(listingPayload));

  // Helper to append images in a way that mirrors the backend seed script
  const appendImagesToForm = async () => {
    const tasks = images.map(async (img, idx) => {
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

  const res = await fetch(`${API_BASE_URL}/api/listings`, {
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

// Updates an existing listing by ID (Phase 4)
export async function updateListing(id, payload) {
  if (!id) throw new Error('Listing ID is required');

  // Transform certain nested forms to the flat shape the backend expects
  const transformed = { ...payload };
  if (payload?.price && typeof payload.price === 'object') {
    transformed.price = payload.price.base ?? 0;
  }

  // propertyType remains nested – keep as-is for backend

  // keep basicInfo nested; backend will flatten to DB columns

  if (payload?.address && typeof payload.address === 'object') {
    transformed.address = payload.address; // keep nested – backend already supports
  }

  if (Array.isArray(payload?.photos)) {
    // backend expects 'photos' key, so keep unchanged
  }

  const res = await fetch(`${API_BASE_URL}/api/listings/${id}`, {
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

  // eslint-disable-next-line no-console
  console.log('[api.uploadPhotos] uploading', files.length, 'files');

  const form = new FormData();
  files.forEach((f) => form.append('images', f, f.name));

  const res  = await fetch(`${API_BASE_URL}/api/listings/${id}/photos`, {
    method: 'PUT',
    body:   form,
  });

  const json = await res.json();
  // eslint-disable-next-line no-console
  console.log('[api.uploadPhotos] server response', json);
  if (!json.success) throw new Error(json.message || 'Photo upload failed');
  return json.images || [];
}