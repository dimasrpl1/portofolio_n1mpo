export type Project = {
  id: string;
  title: string;
  description: string;
  image: string; // taruh file di /public/projects/...
  tags: string[];
  demoUrl?: string;
  repoUrl?: string;
  featured?: boolean;
};

export const projects: Project[] = [
  {
    id: "project-one",
    title: "Project One",
    description:
      "Deskripsi singkat proyek. Jelaskan masalah yang diselesaikan dan peran Anda.",
    image: "/projects/placeholder.svg",
    tags: ["Next.js", "TypeScript", "Tailwind"],
    demoUrl: "https://example.com",
    repoUrl: "https://github.com/username/repo",
    featured: true,
  },
  {
    id: "project-two",
    title: "Project Two",
    description:
      "Deskripsi singkat proyek kedua. Ganti dengan karya nyata Anda.",
    image: "/projects/placeholder.svg",
    tags: ["React", "Supabase"],
    demoUrl: "https://example.com",
    repoUrl: "https://github.com/username/repo",
  },
  {
    id: "project-three",
    title: "Project Three",
    description:
      "Deskripsi singkat proyek ketiga. Tambah / hapus objek di file ini.",
    image: "/projects/placeholder.svg",
    tags: ["Next.js", "GSAP"],
    repoUrl: "https://github.com/username/repo",
  },
];
