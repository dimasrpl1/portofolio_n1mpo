export type Certificate = {
  id: string;
  title: string;
  issuer: string;
  date: string;
  image: string;
  description?: string;
  credentialUrl?: string;
};

export const certificates: Certificate[] = [
  {
    id: "cert-react",
    title: "React - The Complete Guide",
    issuer: "Udemy",
    date: "2024",
    image: "/projects/placeholder.svg",
    description:
      "Kursus lengkap React mulai dari dasar hingga topik lanjutan seperti hooks, context API, Redux, dan React Router.",
    credentialUrl: "https://udemy.com/certificate/example",
  },
  {
    id: "cert-nextjs",
    title: "Next.js & React - The Complete Guide",
    issuer: "Udemy",
    date: "2024",
    image: "/projects/placeholder.svg",
    description:
      "Menguasai Next.js dengan fitur App Router, Server Components, SSR, SSG, dan integrasi database.",
    credentialUrl: "https://udemy.com/certificate/example",
  },
  {
    id: "cert-typescript",
    title: "Understanding TypeScript",
    issuer: "Udemy",
    date: "2023",
    image: "/projects/placeholder.svg",
    description:
      "Belajar TypeScript dari dasar hingga mahir termasuk generics, decorators, dan integrasi dengan React.",
    credentialUrl: "https://udemy.com/certificate/example",
  },
  {
    id: "cert-fullstack",
    title: "Full Stack Open",
    issuer: "University of Helsinki",
    date: "2023",
    image: "/projects/placeholder.svg",
    description:
      "Program intensif pengembangan web modern mencakup React, Node.js, MongoDB, GraphQL, dan TypeScript.",
    credentialUrl: "https://fullstackopen.com/certificate/example",
  },
  {
    id: "cert-google-ux",
    title: "Google UX Design Certificate",
    issuer: "Google / Coursera",
    date: "2023",
    image: "/projects/placeholder.svg",
    description:
      "Sertifikasi resmi Google untuk desain UX mencakup penelitian pengguna, wireframing, prototyping, dan pengujian.",
    credentialUrl: "https://coursera.org/verify/example",
  },
  {
    id: "cert-nodejs",
    title: "Node.js Developer Course",
    issuer: "Udemy",
    date: "2023",
    image: "/projects/placeholder.svg",
    description:
      "Membangun REST API dengan Node.js, Express, MongoDB, JWT authentication, dan deployment ke Heroku.",
    credentialUrl: "https://udemy.com/certificate/example",
  },
  {
    id: "cert-tailwind",
    title: "Tailwind CSS From Scratch",
    issuer: "Udemy",
    date: "2022",
    image: "/projects/placeholder.svg",
    description:
      "Menguasai Tailwind CSS utility-first framework untuk membangun antarmuka responsif secara cepat dan efisien.",
    credentialUrl: "https://udemy.com/certificate/example",
  },
  {
    id: "cert-git",
    title: "Git & GitHub Bootcamp",
    issuer: "Udemy",
    date: "2022",
    image: "/projects/placeholder.svg",
    description:
      "Penguasaan sistem kontrol versi Git termasuk branching, merging, rebasing, dan kolaborasi tim lewat GitHub.",
    credentialUrl: "https://udemy.com/certificate/example",
  },
  {
    id: "cert-web-dasar",
    title: "Belajar Dasar Pemrograman Web",
    issuer: "Dicoding Indonesia",
    date: "2022",
    image: "/projects/placeholder.svg",
    description:
      "Sertifikasi Dicoding untuk pemrograman web dasar mencakup HTML, CSS, dan JavaScript tingkat pemula.",
    credentialUrl: "https://dicoding.com/certificates/example",
  },
  {
    id: "cert-javascript",
    title: "JavaScript Algorithms and Data Structures",
    issuer: "freeCodeCamp",
    date: "2022",
    image: "/projects/placeholder.svg",
    description:
      "Menyelesaikan 300+ jam kurikulum JavaScript mencakup ES6, reguler ekspresi, debugging, dan struktur data.",
    credentialUrl: "https://freecodecamp.org/certification/example",
  },
];
