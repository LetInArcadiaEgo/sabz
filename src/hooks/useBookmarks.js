import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuth } from '../context/AuthContext';

const API_BASE_URL = import.meta.env.VITE_API_BASE || 'http://localhost:3001';

export function useBookmarks() {
  const { user, session } = useAuth();
  const qc = useQueryClient();

  /* ---------- read query ---------- */
  const {
    data: bookmarks = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ['bookmarks'],
    enabled: !!user && !!session?.access_token,
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
    queryFn: async () => {
      const res = await fetch(`${API_BASE_URL}/api/me/bookmarks`, {
        headers: {
          Authorization: `Bearer ${session.access_token}`,
        },
      });
      if (!res.ok) throw new Error('Failed to fetch bookmarks');
      return (await res.json()).data ?? [];
    },
  });

  /* ---------- write mutation with optimistic update ---------- */
  const { mutate: toggleBookmark, isLoading: toggling } = useMutation({
    mutationFn: async (listingId) => {
      // figure out if it's bookmarked right now
      const exists = bookmarks.some(
        (b) => (b.listing_id || b.id) === listingId,
      );
      const method = exists ? 'DELETE' : 'POST';
      const url = `${API_BASE_URL}/api/listings/${listingId}/bookmark`;

      const res = await fetch(url, {
        method,
        headers: { Authorization: `Bearer ${session.access_token}` },
      });
      if (!res.ok) throw new Error('Toggle failed');
      return { listingId, added: !exists };
    },

    /* --- OPTIMISTIC UPDATE --- */
    onMutate: async (listingId) => {
      await qc.cancelQueries(['bookmarks']);
      const prev = qc.getQueryData(['bookmarks']);

      qc.setQueryData(['bookmarks'], (curr = []) => {
        const exists = curr.some(
          (b) => (b.listing_id || b.id) === listingId,
        );
        return exists
          ? curr.filter((b) => (b.listing_id || b.id) !== listingId)
          : [
              ...curr,
              {
                listing_id: listingId,         // minimal shape
                id: listingId,
                bookmarked_at: new Date().toISOString(),
              },
            ];
      });

      return { prev };
    },

    onError: (_err, _vars, ctx) => {
      // rollback
      if (ctx?.prev) qc.setQueryData(['bookmarks'], ctx.prev);
    },

    onSettled: () => {
      // final truth from server after optimistic UI
      qc.invalidateQueries(['bookmarks']);
    },
  });

  /* ---------- helper for hearts ---------- */
  const isBookmarked = (id) =>
    bookmarks.some((b) => (b.listing_id || b.id) === id);

  return { bookmarks, isLoading, error, isBookmarked, toggleBookmark, toggling };
} 