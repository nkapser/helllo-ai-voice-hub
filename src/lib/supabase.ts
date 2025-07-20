import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.NEXT_PUBLIC_SUPABASE_URL || 'https://ykpilprbhhbtvnknarmb.supabase.co'
const supabaseAnonKey = import.meta.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlrcGlscHJiaGhidHZua25hcm1iIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg2Nzc1OTYsImV4cCI6MjA2NDI1MzU5Nn0.mvbtq6jkMf-A9vMpHoyYzGF4Wb71Sn-ZhINntsodXFg'

// Only create the client if we have valid credentials
export const supabase = supabaseUrl && supabaseAnonKey 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null 