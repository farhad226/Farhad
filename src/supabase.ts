import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://rkvuqpgusapxjrkawlzx.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJrdnVxcGd1c2FweGpya2F3bHp4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg4MzI0MjksImV4cCI6MjA5NDQwODQyOX0.EXV_EPVddvbpfa-i92_ZHxaJk717l8TZGUbJZqXsrtk';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
