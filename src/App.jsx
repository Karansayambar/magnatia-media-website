import { lazy, Suspense, useEffect, useState } from "react";
import Navbar from "./components/Navbar";

const HeroWebGL = lazy(() => import("./components/HeroWebGL"));
const Hero = lazy(() => import("./components/Hero"));
const Services = lazy(() => import("./components/Services"));
const Strategically = lazy(() => import("./components/Strategically"));
const OurWork = lazy(() => import("./components/OurWork"));
const Sectors = lazy(() => import("./components/Sectors"));
const Blogs = lazy(() => import("./components/Blogs"));
const Contact = lazy(() => import("./components/Contact"));
const Footer = lazy(() => import("./components/Footer"));

function App() {
  const [activeSection, setActiveSection] = useState(null);

  useEffect(() => {
    const sectionIds = ["projects", "blog", "career", "contact"];
    const observers = [];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveSection(id); // set current visible section
            }
          });
        },
        { threshold: 0.3 }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => {
      observers.forEach((observer) => observer.disconnect());
    };
  }, []);

  return (
    <>
      <Suspense fallback={<div className="fixed inset-0 bg-black z-0" />}>
        <HeroWebGL
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            width: "100%",
            height: "100vh",
            zIndex: 0,
            opacity: 1,
          }}
          className="h-screen"
        />
      </Suspense>

      <main style={{ position: "relative", zIndex: 10 }}>
        {/* 👇 Pass activeSection to Navbar */}
        <Navbar activeSection={activeSection} />

        <Suspense fallback={<div className="min-h-screen" />}>
          <section id="about">
            <Hero />
          </section>
        </Suspense>

        <Suspense fallback={null}>
          <section id="services">
            <Services />
          </section>
        </Suspense>

        <Suspense fallback={null}>
          <section id="Strategically">
            <Strategically />
          </section>
        </Suspense>

        <Suspense fallback={null}>
          <section id="projects">
            <OurWork />
          </section>
        </Suspense>

        <Suspense fallback={null}>
          <section id="blog">
            <Blogs />
          </section>
        </Suspense>

        <Suspense fallback={null}>
          <section id="career">
            <Sectors />
          </section>
        </Suspense>

        <Suspense fallback={null}>
          <section id="contact">
            <Contact />
          </section>
        </Suspense>

        <Suspense fallback={null}>
          <section id="footer">
            <Footer />
          </section>
        </Suspense>
      </main>
    </>
  );
}

export default App;
