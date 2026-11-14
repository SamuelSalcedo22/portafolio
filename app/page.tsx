import About from "@/components/About";
import Certificates from "@/components/Certificates";
import Contact from "@/components/Contact";
import Experience from "@/components/Experience";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import Preloader from "@/components/Preloader";
import Projects from "@/components/Projects";
import SmoothScroll from "@/components/SmoothScroll";
import Testimonials from "@/components/Testimonials";
import { interests, profile } from "@/data/portfolio";

function Marquee() {
  const items = [profile.role, ...interests.slice(0, 4).map((i) => i.title), "Pasto · Colombia"];
  const row = [...items, ...items, ...items, ...items];
  return (
    <div aria-hidden className="-rotate-1 scale-[1.02] overflow-hidden border-y-2 border-ink bg-accent py-3 text-ink">
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
      <main>
        <Hero />
        <Marquee />
        <About />
        <Projects />
        <Testimonials />
        <Experience />
        <Contact />
        <Certificates />
      </main>
      <Footer />
    </>
  );
}
