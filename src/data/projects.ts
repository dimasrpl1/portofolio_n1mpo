export type Project = {
  id: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  demoUrl?: string;
  repoUrl?: string;
  featured?: boolean;
};

export const projects: Project[] = [
  {
    id: "toko-online",
    title: "Toko Online",
    description:
      "Platform e-commerce lengkap dengan fitur keranjang belanja, pembayaran Midtrans, dan dashboard admin untuk mengelola produk dan pesanan.",
    image: "/projects/placeholder.svg",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "Supabase"],
    demoUrl: "https://example.com",
    repoUrl: "https://github.com/username/toko-online",
    featured: true,
  },
  {
    id: "portfolio-v1",
    title: "Portfolio Website",
    description:
      "Website portofolio pribadi dengan animasi halus menggunakan Framer Motion dan desain responsif yang dioptimalkan untuk semua perangkat.",
    image: "/projects/placeholder.svg",
    tags: ["Next.js", "Framer Motion", "Tailwind CSS"],
    demoUrl: "https://example.com",
    repoUrl: "https://github.com/username/portfolio",
    featured: true,
  },
  {
    id: "manajemen-tugas",
    title: "Aplikasi Manajemen Tugas",
    description:
      "Aplikasi to-do list kolaboratif real-time dengan fitur drag-and-drop, kategori tugas, dan notifikasi deadline berbasis Supabase.",
    image: "/projects/placeholder.svg",
    tags: ["React", "Supabase", "TypeScript", "dnd-kit"],
    demoUrl: "https://example.com",
    repoUrl: "https://github.com/username/task-manager",
    featured: true,
  },
  {
    id: "blog-cms",
    title: "Blog dengan CMS",
    description:
      "Blog pribadi dengan headless CMS menggunakan Contentful, dilengkapi fitur pencarian, tag, dan optimasi SEO untuk performa maksimal.",
    image: "/projects/placeholder.svg",
    tags: ["Next.js", "Contentful", "MDX", "TypeScript"],
    demoUrl: "https://example.com",
    repoUrl: "https://github.com/username/blog-cms",
  },
  {
    id: "chat-app",
    title: "Aplikasi Chat Real-time",
    description:
      "Aplikasi pesan instan dengan fitur ruang obrolan publik/privat, kirim gambar, dan indikator status online menggunakan WebSocket.",
    image: "/projects/placeholder.svg",
    tags: ["React", "Socket.io", "Node.js", "PostgreSQL"],
    repoUrl: "https://github.com/username/chat-app",
  },
  {
    id: "dashboard-analitik",
    title: "Dashboard Analitik",
    description:
      "Dashboard visualisasi data penjualan interaktif dengan grafik dinamis, filter rentang tanggal, dan ekspor laporan ke PDF/Excel.",
    image: "/projects/placeholder.svg",
    tags: ["React", "Recharts", "TypeScript", "REST API"],
    demoUrl: "https://example.com",
    repoUrl: "https://github.com/username/analytics-dashboard",
  },
  {
    id: "resep-masakan",
    title: "Aplikasi Resep Masakan",
    description:
      "Aplikasi pencarian dan penyimpanan resep masakan dengan fitur filter berdasarkan bahan, simpan favorit, dan perencanaan menu mingguan.",
    image: "/projects/placeholder.svg",
    tags: ["Next.js", "Tailwind CSS", "Zustand", "Spoonacular API"],
    demoUrl: "https://example.com",
    repoUrl: "https://github.com/username/resep-app",
  },
  {
    id: "booking-jadwal",
    title: "Sistem Booking Jadwal",
    description:
      "Sistem reservasi online untuk klinik/barbershop dengan kalender interaktif, konfirmasi email otomatis, dan manajemen slot waktu.",
    image: "/projects/placeholder.svg",
    tags: ["Next.js", "Supabase", "Nodemailer", "TypeScript"],
    repoUrl: "https://github.com/username/booking-system",
  },
  {
    id: "kalkulator-keuangan",
    title: "Kalkulator Keuangan",
    description:
      "Aplikasi pencatat pemasukan & pengeluaran bulanan dengan visualisasi grafik, kategori pengeluaran, dan laporan ringkasan keuangan.",
    image: "/projects/placeholder.svg",
    tags: ["React", "Chart.js", "LocalStorage", "Tailwind CSS"],
    demoUrl: "https://example.com",
    repoUrl: "https://github.com/username/finance-tracker",
  },
  {
    id: "api-cuaca",
    title: "Aplikasi Cuaca",
    description:
      "Aplikasi prakiraan cuaca 7 hari dengan geolokasi otomatis, tampilan animasi kondisi cuaca, dan data angin serta kelembapan.",
    image: "/projects/placeholder.svg",
    tags: ["Next.js", "OpenWeather API", "Framer Motion", "TypeScript"],
    demoUrl: "https://example.com",
    repoUrl: "https://github.com/username/weather-app",
  },
];
