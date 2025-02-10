const { createClient } = require("@supabase/supabase-js");
require("dotenv").config(); // Load environment variables

// ✅ Replace with your Supabase Project URL and API Key
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

module.exports = supabase;
