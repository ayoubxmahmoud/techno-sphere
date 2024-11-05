import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://mvuopmuxiepoohtnubqt.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im12dW9wbXV4aWVwb29odG51YnF0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzA3MjY3MDMsImV4cCI6MjA0NjMwMjcwM30.o3Ghy0s8XvX3q_FQMGS4LdRyqE7iRoyCykoDOylj0oA';
export const supabase = createClient(supabaseUrl, supabaseKey);
