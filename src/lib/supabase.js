import { createClient } from '@supabase/supabase-js'

// Una sola instancia para toda la app
export const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_KEY
)
