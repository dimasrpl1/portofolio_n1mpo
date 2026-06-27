import { Filter } from "bad-words";

/**
 * Daftar kata kasar Bahasa Indonesia (bisa Anda tambah/kurangi sendiri).
 * Disengaja ringkas; tambahkan sesuai kebutuhan moderasi Anda.
 */
const indonesianBadWords = [
  "anjing", "anjg", "bangsat", "bajingan", "kontol", "memek", "ngentot",
  "ngewe", "pepek", "pantek", "tai", "taik", "tolol", "goblok", "kampret",
  "bego", "babi", "asu", "jancok", "jancuk", "cok", "cuk", "kunyuk",
  "bangke", "setan", "sialan", "keparat", "kampang", "pelacur", "lonte",
  "perek", "jablay", "ngentod", "entot", "kentot", "puki", "pukimak",
];

const filter = new Filter();
filter.addWords(...indonesianBadWords);

/**
 * Normalisasi sederhana untuk menangkap penyamaran umum
 * (huruf diganti angka: 4=a, 1=i, 0=o, 3=e, 5=s, 7=t, @=a, $=s).
 * Hanya dipakai untuk DETEKSI; teks asli yang disensor tetap dipakai untuk output.
 */
function deobfuscate(word: string): string {
  return word
    .toLowerCase()
    .replace(/4|@/g, "a")
    .replace(/1|\!/g, "i")
    .replace(/0/g, "o")
    .replace(/3/g, "e")
    .replace(/5|\$/g, "s")
    .replace(/7/g, "t")
    .replace(/[^a-z]/g, "");
}

/**
 * Sensor kata kasar di server. Kata kasar ditutup dengan '*'
 * (huruf pertama tetap terlihat), sisanya utuh.
 * Mengembalikan teks yang AMAN untuk disimpan & ditampilkan.
 */
export function censor(text: string): string {
  return text
    .split(/(\s+)/) // pertahankan spasi
    .map((token) => {
      if (/^\s+$/.test(token) || token.length === 0) return token;
      const core = deobfuscate(token);
      if (core && filter.isProfane(core)) {
        const first = token.trimStart()[0] ?? "";
        return first + "*".repeat(Math.max(token.length - 1, 1));
      }
      return token;
    })
    .join("");
}
