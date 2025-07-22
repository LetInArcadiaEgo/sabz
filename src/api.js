const API_BASE_URL = process.env.REACT_APP_API_BASE;  

/* fetches only approved rows */
export async function fetchApproved() {
    const r = await fetch(`${API_BASE_URL}/api/listings`);
    const { data } = await r.json();   // { success, data }
    return data;                       // array of listings
}

/* sends a new listing (status will be 'pending') */
export async function createListing(body) {
  await fetch(`${API_BASE_URL}/api/listings`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
}