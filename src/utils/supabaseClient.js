import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPBASE_URL; // configuring the supabase client
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_API_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
