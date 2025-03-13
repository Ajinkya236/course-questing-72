
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://vxohrnvgfleqnnwzkecm.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ4b2hybnZnZmxlcW5ud3prZWNtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDEyMzgyMzYsImV4cCI6MjA1NjgxNDIzNn0.N20LFNdwJ9IjO711g-1KJRD8LNPHuLVp0s2myA1Z48k";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);
