import About from "@/components/About";
import Contact from "@/components/Contact";
import Experience from "@/components/Experience";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import LangMain from "@/components/LangMain";
import Navbar from "@/components/Navbar";
import Preloader from "@/components/Preloader";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import SmoothScroll from "@/components/SmoothScroll";
import Testimonials from "@/components/Testimonials";
import { about } from "@/data/portfolio";

function Marquee() {
  const row = [...about.skills, ...about.skills];
  return (
    <div aria-hidden className="-rotate-1 scale-[1.02] overflow-hidden border-y-2 border-night bg-accent py-3 text-night">
      <div className="marquee">
        {row.map((t, i) => (
          <span key={i} className="display flex items-center gap-6 px-6 text-3xl md:text-5xl">
            {t} <span className="text-xl">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <>
      <Preloader />
      <SmoothScroll />
      <Navbar />
      <LangMain>
        <Hero />
        <Marquee />
        <About />
        <Projects />
        <Testimonials />
        <Experience />
        <Contact />
        <Skills />
      </LangMain>
      <Footer />
    </>
  );
}
