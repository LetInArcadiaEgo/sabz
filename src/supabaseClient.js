import { createClient } from '@supabase/supabase-js';

// Values are read from .env.local (CRA loads any REACT_APP_* keys)
export const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.REACT_APP_SUPABASE_ANON_KEY,
  {
    // keep the session between page reloads; Supabase stores it in localStorage
    persistSession: true,
  }
); 