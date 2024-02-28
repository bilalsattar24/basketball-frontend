import { createClient } from '@supabase/supabase-js'
export const supabaseUrl = 'https://yeurtxzjsxhnjuzrzgzh.supabase.co'
export const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlldXJ0eHpqc3hobmp1enJ6Z3poIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDkwNzM0NTgsImV4cCI6MjAyNDY0OTQ1OH0.9WJpIDuAlFEOf-FLtJ7CS1NX9BEnooZblcopVIj7_jU'

export const getSupabaseClient = () => {
  return createClient(supabaseUrl, supabaseKey)
}
