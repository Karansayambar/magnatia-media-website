// App.js
import { lazy, Suspense, useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";

const HeroWebGL = lazy(() => import("./components/HeroWebGL"));
const Hero = lazy(() => import("./components/Hero"));
const Services = lazy(() => import("./components/Services"));
const Strategically = lazy(() => import("./components/Strategically"));
const OurWork = lazy(() => import("./components/OurWork"));
const Sectors = lazy(() => import("./components/Sectors"));
const Blogs = lazy(() => import("./components/Blogs"));
const BlogDetails = lazy(() => import("./components/BlogDetails"));
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
              setActiveSection(id);
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
    <Router>
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
        <Navbar activeSection={activeSection} />

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/blog-details/:articleId"
            element={<BlogDetailsPage />}
          />
        </Routes>
      </main>
    </Router>
  );
}

// HomePage component to structure the main page
const HomePage = () => {
  return (
    <>
      <Suspense fallback={<div className="min-h-screen" />}>
        <section id="home">
          <Hero />
        </section>
      </Suspense>

      <Suspense fallback={null}>
        <section id="services">
          <Services />
        </section>
      </Suspense>

      <Suspense fallback={null}>
        <section id="about">
          <Strategically />
        </section>
      </Suspense>

      {/* <Suspense fallback={null}>
        <section id="projects">
          <OurWork />
        </section>
      </Suspense> */}

      <Suspense fallback={null}>
        <section id="blog">
          <Blogs />
        </section>
      </Suspense>

      <Suspense fallback={null}>
        <section id="sectors">
          <Sectors />
        </section>
      </Suspense>

      <Suspense fallback={null}>
        <section id="contact">
          <Contact />
        </section>
      </Suspense>

      <Suspense fallback={null}>
        <Footer />
      </Suspense>
    </>
  );
};

// BlogDetailsPage component
const BlogDetailsPage = () => {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      }
    >
      <BlogDetails />
    </Suspense>
  );
};

export default App;
