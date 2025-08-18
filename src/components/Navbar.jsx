import React, { useEffect, useState } from "react";
import logo from "../assets/logo.png";
import { LuEqual } from "react-icons/lu";
import { IoMdClose } from "react-icons/io";

const Navbar = () => {
  const [toggleMenu, setToggleMenu] = useState(false);
  const [activeSection, setActiveSection] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  // Responsive state for mobile/desktop
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setToggleMenu(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Intersection Observer for multiple sections
  useEffect(() => {
    const sectionIds = ["ourwork", "projects", "blog", "career", "contact"];
    const observers = [];

    sectionIds.forEach((id) => {
      const section = document.getElementById(id);
      if (!section) return;

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

      observer.observe(section);
      observers.push(observer);
    });

    return () => {
      observers.forEach((observer) => observer.disconnect());
    };
  }, []);

  // Define which sections should have white text
  const isOverDark = ["projects", "blog", "career", "contact"].includes(
    activeSection
  );

  const handleToggleMenu = () => {
    setToggleMenu((prev) => !prev);
  };

  const handleMenuItemClick = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
    setToggleMenu(false);
  };

  const navItems = [
    { id: "about", label: "About" },
    { id: "services", label: "Services" },
    { id: "projects", label: "Projects" },
    { id: "blog", label: "Blog" },
    { id: "career", label: "Career" },
    { id: "contact", label: "Contact" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 px-4 md:px-6 py-3 md:py-4 flex items-center justify-between z-50 
      bg-gradient-to-r from-white/10 via-white/20 to-white/10 backdrop-blur-xl border-b border-white/20`}
    >
      {/* Logo & Brand */}
      <div className="flex items-center gap-2 md:gap-4">
        <div
          className={`border-4 w-12 h-12 md:w-16 md:h-16 rounded-md overflow-hidden ${
            isOverDark ? "border-white" : "border-black"
          }`}
        >
          <img
            src={logo}
            alt="logo-img"
            className="w-full h-full object-contain"
          />
        </div>
        <p
          className={`font-space-mono uppercase tracking-[0.2em] text-lg md:text-xl ${
            isOverDark ? "text-white" : "text-black"
          }`}
        >
          Magnetia Media
        </p>
      </div>

      {/* Desktop Navigation */}
      {!isMobile && (
        <div className="hidden md:flex items-center gap-6">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleMenuItemClick(item.id)}
              className={`font-medium hover:opacity-80 transition ${
                isOverDark ? "text-white" : "text-black"
              } ${activeSection === item.id ? "underline" : ""}`}
            >
              {item.label}
            </button>
          ))}
        </div>
      )}

      {/* Mobile Menu Button + Dropdown */}
      <div className="flex items-center gap-2 md:gap-4 relative">
        <button
          onClick={() => handleMenuItemClick("contact")}
          className={`border-2 rounded-full px-4 py-2 md:px-6 md:py-3 text-sm md:text-base transition
            ${
              isOverDark
                ? "text-black bg-white hover:bg-gray-100"
                : "text-white bg-black hover:bg-gray-800"
            }`}
        >
          Contact Us
        </button>

        {isMobile && (
          <button
            onClick={handleToggleMenu}
            className={`border-2 rounded-full p-2 md:p-3 transition
              ${
                isOverDark
                  ? "text-white border-white hover:bg-white/10"
                  : "text-black border-black hover:bg-black/10"
              }`}
          >
            {toggleMenu ? <IoMdClose size={24} /> : <LuEqual size={24} />}
          </button>
        )}

        {/* Mobile Dropdown Menu */}
        {toggleMenu && isMobile && (
          <div
            className="bg-white text-black p-4 text-xl leading-[2.5rem] border rounded-lg shadow-lg min-w-[180px] absolute right-0 top-12 md:top-16
            animate-[fadeInScale_0.2s_ease-out] origin-top-right"
            style={{
              animationFillMode: "forwards",
            }}
          >
            {navItems.map((item) => (
              <p
                key={item.id}
                className="cursor-pointer hover:text-gray-500 block"
                onClick={() => handleMenuItemClick(item.id)}
              >
                {item.label}
              </p>
            ))}
          </div>
        )}
      </div>

      {/* Inline keyframes */}
      <style>
        {`
          @keyframes fadeInScale {
            0% { opacity: 0; transform: scale(0.9); }
            100% { opacity: 1; transform: scale(1); }
          }
        `}
      </style>
    </nav>
  );
};

export default Navbar;
