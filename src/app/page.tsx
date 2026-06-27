"use client";

import { useState } from "react";
import { AnimatePresence } from "motion/react";
import { Preloader } from "@/components/Preloader";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/sections/Hero";
import { Skills } from "@/components/sections/Skills";
import { Projects } from "@/components/sections/Projects";
import { Comments } from "@/components/sections/Comments";
import { Footer } from "@/components/sections/Footer";

export default function Home() {
  const [ready, setReady] = useState(false);

  return (
    <>
      <AnimatePresence>
        {!ready && <Preloader onComplete={() => setReady(true)} />}
      </AnimatePresence>

      <Navbar />
      <main>
        <Hero />
        <Skills />
        <Projects />
        <Comments />
      </main>
      <Footer />
    </>
  );
}
