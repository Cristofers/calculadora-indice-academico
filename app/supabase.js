import { createClient } from "@supabase/supabase-js";
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const Client = () => createClient(supabaseUrl, supabaseKey);
const MySupabase = Client();
export default MySupabase;
