import { createClient } from "@supabase/supabase-js";

// Client browser (anon/publishable key) untuk baca + realtime komentar.
// Insert dilakukan lewat Server Action (lihat src/app/actions.ts).
export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
);

export type Comment = {
  id: string;
  name: string;
  message: string;
  created_at: string;
};
