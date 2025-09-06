

import { createClient } from '@supabase/supabase-js';

// Get Supabase credentials from environment variables
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

// A function to initialize the client, which can return null if not configured.
function initializeSupabase() {
  // Check if credentials are provided
  if (!supabaseUrl || !supabaseKey) {
    console.warn('WARNING: Supabase environment variables are not set. File upload functionality will be disabled.');
    return null;
  }
  // If credentials exist, create and return the client.
  return createClient(supabaseUrl, supabaseKey);
}

// Create and export the Supabase client. It will be null if not configured.
export const supabase = initializeSupabase();

// Define the storage bucket name
export const STORAGE_BUCKET = 'mememarket-uploads';