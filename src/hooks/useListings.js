import { useEffect, useState } from 'react';
import { fetchApproved } from '../api';  // NEW

export function useListings() {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchApproved();
        setListings(data || []);  // handle empty array
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  return { listings, loading, error };
}