import { createClient } from '@supabase/supabase-js';

// Values are read from .env.local (Vite loads any VITE_* keys)
export const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY,
  {
    // keep the session between page reloads; Supabase stores it in localStorage
    persistSession: true,
  }
); 