"use server";

import { createClient } from "@supabase/supabase-js";
import { censor } from "@/lib/profanity";

const admin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
);

type Result = { ok: boolean; error?: string };

export async function postComment(formData: FormData): Promise<Result> {
  // Honeypot anti-spam: field tersembunyi yang harus kosong
  if ((formData.get("website") as string)?.length) {
    return { ok: true }; // diam-diam abaikan bot
  }

  const rawName = (formData.get("name") as string | null)?.trim() ?? "";
  const rawMessage = (formData.get("message") as string | null)?.trim() ?? "";

  if (!rawName || !rawMessage) {
    return { ok: false, error: "Nama dan pesan wajib diisi." };
  }
  if (rawName.length > 60) {
    return { ok: false, error: "Nama terlalu panjang (maks 60 karakter)." };
  }
  if (rawMessage.length > 500) {
    return { ok: false, error: "Pesan terlalu panjang (maks 500 karakter)." };
  }

  // Sensor kata kasar DI SERVER — yang disimpan sudah aman.
  const name = censor(rawName);
  const message = censor(rawMessage);

  const { error } = await admin.from("comments").insert({ name, message });
  if (error) {
    return { ok: false, error: "Gagal mengirim komentar. Coba lagi." };
  }
  return { ok: true };
}
