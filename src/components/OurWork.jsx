import React, { useState, useRef, useEffect } from "react";

const OurWork = () => {
  const [hoveredProject, setHoveredProject] = useState(null);
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const statsRef = useRef([]);
  const cardsRef = useRef([]);
  const ctaRef = useRef(null);
  const heroContentRef = useRef(null);

  // Placeholder images with different gradients for variety
  const createPlaceholderImg = (gradient) => {
    return `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300' viewBox='0 0 400 300'%3E%3Cdefs%3E%3ClinearGradient id='grad1' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%23${gradient.from};stop-opacity:1' /%3E%3Cstop offset='100%25' style='stop-color:%23${gradient.to};stop-opacity:1' /%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='400' height='300' fill='url(%23grad1)'/%3E%3Ctext x='50%25' y='45%25' dominant-baseline='middle' text-anchor='middle' font-size='16' fill='white' font-weight='bold'%3EProject Preview%3C/text%3E%3Ctext x='50%25' y='60%25' dominant-baseline='middle' text-anchor='middle' font-size='12' fill='white' opacity='0.8'%3EClick to View%3C/text%3E%3C/svg%3E`;
  };

  const projects = [
    {
      id: 1,
      title: "GreenStone",
      category: "Web Design & Development",
      description:
        "Complete brand transformation with modern UI/UX design, featuring responsive layouts and seamless user experience across all devices.",
      image: createPlaceholderImg({ from: "9333EA", to: "EC4899" }),
      gradient: "from-purple-600 to-pink-600",
      stats: { increase: "250%", metric: "conversion rate" },
    },
    {
      id: 2,
      title: "Digital Banking App",
      category: "Mobile App Design",
      description:
        "Intuitive banking experience with cutting-edge security features, biometric authentication, and real-time transaction monitoring.",
      image: createPlaceholderImg({ from: "2563EB", to: "0891B2" }),
      gradient: "from-blue-600 to-cyan-600",
      stats: { increase: "180%", metric: "user engagement" },
    },
    {
      id: 3,
      title: "SaaS Platform Redesign",
      category: "Dashboard Design",
      description:
        "Complex data visualization made simple and beautiful with interactive charts, real-time analytics, and intuitive navigation.",
      image: createPlaceholderImg({ from: "059669", to: "0D9488" }),
      gradient: "from-emerald-600 to-teal-600",
      stats: { increase: "320%", metric: "user retention" },
    },
    {
      id: 4,
      title: "Brand Identity Suite",
      category: "Brand Design",
      description:
        "Complete visual identity for tech startup including logo design, color palette, typography, and brand guidelines.",
      image: createPlaceholderImg({ from: "EA580C", to: "DC2626" }),
      gradient: "from-orange-600 to-red-600",
      stats: { increase: "400%", metric: "brand recognition" },
    },
  ];

  useEffect(() => {
    // Set initial states for all animated elements
    const initializeElements = () => {
      // Title animation setup
      if (titleRef.current) {
        const titleChars = titleRef.current.querySelectorAll(".char");
        titleChars.forEach((char, i) => {
          char.style.transform = `translateY(100px) rotateX(-90deg)`;
          char.style.opacity = "0";
        });
      }

      // Hero content setup
      if (heroContentRef.current) {
        heroContentRef.current.style.transform = "translateX(100px)";
        heroContentRef.current.style.opacity = "0";
      }

      // Stats setup
      statsRef.current.forEach((stat, i) => {
        if (stat) {
          stat.style.transform = `translateY(50px) scale(0.8)`;
          stat.style.opacity = "0";
        }
      });

      // Cards setup
      cardsRef.current.forEach((card, i) => {
        if (card) {
          const directions = [
            { x: -200, y: 100, rotation: -15 },
            { x: 200, y: 150, rotation: 15 },
            { x: -150, y: 200, rotation: -10 },
            { x: 180, y: 120, rotation: 12 },
          ];
          const direction = directions[i % directions.length];

          card.style.transform = `translate(${direction.x}px, ${direction.y}px) rotate(${direction.rotation}deg) scale(0.6)`;
          card.style.opacity = "0";
        }
      });

      // CTA setup
      if (ctaRef.current) {
        ctaRef.current.style.transform = "translateY(80px) scale(0.9)";
        ctaRef.current.style.opacity = "0";
      }
    };

    const animateElements = () => {
      // Title animation with stagger
      if (titleRef.current) {
        const titleChars = titleRef.current.querySelectorAll(".char");
        titleChars.forEach((char, i) => {
          setTimeout(() => {
            char.style.transition =
              "all 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275)";
            char.style.transform = "translateY(0) rotateX(0deg)";
            char.style.opacity = "1";
          }, i * 100);
        });
      }

      // Hero content animation
      setTimeout(() => {
        if (heroContentRef.current) {
          heroContentRef.current.style.transition =
            "all 1s cubic-bezier(0.175, 0.885, 0.32, 1.275)";
          heroContentRef.current.style.transform = "translateX(0)";
          heroContentRef.current.style.opacity = "1";
        }
      }, 600);

      // Stats animation
      setTimeout(() => {
        statsRef.current.forEach((stat, i) => {
          if (stat) {
            setTimeout(() => {
              stat.style.transition =
                "all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275)";
              stat.style.transform = "translateY(0) scale(1)";
              stat.style.opacity = "1";
            }, i * 150);
          }
        });
      }, 1000);

      // Cards animation with stagger
      setTimeout(() => {
        cardsRef.current.forEach((card, i) => {
          if (card) {
            setTimeout(() => {
              card.style.transition =
                "all 1s cubic-bezier(0.175, 0.885, 0.32, 1.275)";
              card.style.transform = "translate(0, 0) rotate(0deg) scale(1)";
              card.style.opacity = "1";
            }, i * 200);
          }
        });
      }, 1400);

      // CTA animation
      setTimeout(() => {
        if (ctaRef.current) {
          ctaRef.current.style.transition =
            "all 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275)";
          ctaRef.current.style.transform = "translateY(0) scale(1)";
          ctaRef.current.style.opacity = "1";
        }
      }, 2200);
    };

    // Initialize and animate
    initializeElements();

    // Use IntersectionObserver for better performance
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateElements();
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const splitTextIntoChars = (text) => {
    return text.split("").map((char, i) => (
      <span
        key={i}
        className="char inline-block bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent"
        style={{ transformOrigin: "center bottom" }}
      >
        {char === " " ? "\u00A0" : char}
      </span>
    ));
  };

  const handleCardHover = (projectId, isHovering) => {
    setHoveredProject(isHovering ? projectId : null);

    const card = cardsRef.current.find(
      (card) => card && card.dataset.projectId === projectId.toString()
    );

    if (card) {
      if (isHovering) {
        card.style.transform = "translateY(-10px) scale(1.02)";
        card.style.transition =
          "transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)";
      } else {
        card.style.transform = "translateY(0) scale(1)";
        card.style.transition =
          "transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)";
      }
    }
  };

  return (
    <div
      id="ourwork"
      ref={sectionRef}
      className="bg-black text-white min-h-screen py-12 sm:py-16 md:py-20 px-4 sm:px-8 md:px-12 lg:px-20 overflow-hidden"
    >
      {/* Animated Background Elements */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-600/5 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-600/5 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
        <div
          className="absolute top-1/2 left-1/2 w-48 h-48 bg-emerald-600/5 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "4s" }}
        ></div>
      </div>

      {/* Hero Section */}
      <div className="relative w-full mx-auto">
        <div className="flex flex-col lg:flex-row gap-8 md:gap-12 lg:gap-20 items-center mb-16 md:mb-24 lg:mb-32">
          {/* Title Section */}
          <div className="relative w-full lg:w-1/2 ">
            <div className="absolute -top-6 -left-6 sm:-top-8 sm:-left-8 w-24 h-24 sm:w-32 sm:h-32 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-full blur-3xl animate-pulse"></div>

            <h1
              ref={titleRef}
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-[160px] font-bold leading-none relative z-10"
            >
              <span className="block sm:ml-8">{splitTextIntoChars("OUR")}</span>
              <span className="block sm:ml-8">
                {splitTextIntoChars("WORK")}
              </span>
            </h1>

            {/* Enhanced Decorative Elements */}
            <div className="absolute -bottom-4 sm:-bottom-5 right-0 w-16 h-16 sm:w-24 sm:h-24 border-2 border-purple-500/30 rounded-full animate-spin-slow"></div>
            <div className="absolute top-1/2 -right-4 sm:-right-5 w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-full blur-xl animate-pulse"></div>
            <div className="absolute top-1/4 left-1/4 w-6 h-6 bg-yellow-400/40 rounded-full animate-ping"></div>
            <div className="absolute top-2/4 left-2/4 w-6 h-6 bg-yellow-400/40 rounded-full animate-ping"></div>
          </div>

          {/* Content Section */}
          <div ref={heroContentRef} className="relative w-full lg:w-1/2 ">
            <div className="absolute -top-4 -right-4 sm:-top-5 sm:-right-5 w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 rounded-full blur-2xl animate-pulse"></div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 md:mb-8 leading-tight">
              Crafting digital experiences that{" "}
              <span className="bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent">
                captivate
              </span>{" "}
              and{" "}
              <span className="bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent">
                convert
              </span>
              .
            </h2>

            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-300 leading-relaxed mb-6">
              We don't just create websites—we build digital ecosystems that
              tell your story, engage your audience, and drive measurable
              results. Every pixel has purpose, every interaction tells a story.
            </p>

            <div className="flex items-center space-x-4 mb-8">
              <div className="w-12 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></div>
              <span className="text-gray-400 font-medium">
                Trusted by industry leaders
              </span>
            </div>

            {/* Enhanced Stats */}
            <div className="grid grid-cols-3 gap-4 sm:gap-6 md:gap-8">
              {[
                {
                  value: "150+",
                  label: "Projects Delivered",
                  color: "text-purple-400",
                },
                {
                  value: "99%",
                  label: "Client Satisfaction",
                  color: "text-cyan-400",
                },
                {
                  value: "24/7",
                  label: "Premium Support",
                  color: "text-emerald-400",
                },
              ].map((stat, index) => (
                <div
                  key={index}
                  ref={(el) => (statsRef.current[index] = el)}
                  className="text-center group cursor-pointer"
                >
                  <div
                    className={`text-2xl sm:text-3xl md:text-4xl font-bold ${stat.color} group-hover:scale-110 transition-transform duration-300`}
                  >
                    {stat.value}
                  </div>
                  <div className="text-xs sm:text-sm text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Enhanced Projects Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 md:gap-10 lg:gap-12">
          {projects.map((project, index) => (
            <div
              key={project.id}
              ref={(el) => (cardsRef.current[index] = el)}
              data-project-id={project.id}
              className={`group relative overflow-hidden rounded-2xl lg:rounded-3xl bg-gradient-to-br from-gray-900/50 to-gray-800/30 border border-gray-700/50 backdrop-blur-sm cursor-pointer ${
                index % 2 === 0
                  ? "sm:translate-y-6 lg:translate-y-12"
                  : "sm:-translate-y-6 lg:-translate-y-12"
              }`}
              onMouseEnter={() => handleCardHover(project.id, true)}
              onMouseLeave={() => handleCardHover(project.id, false)}
            >
              {/* Enhanced Background Glow */}
              <div
                className={`absolute inset-0 bg-gradient-to-r ${project.gradient} opacity-0 group-hover:opacity-15 transition-all duration-700`}
              ></div>

              {/* Animated Border */}
              <div
                className={`absolute inset-0 rounded-2xl lg:rounded-3xl bg-gradient-to-r ${project.gradient} opacity-0 group-hover:opacity-20 blur-sm transition-all duration-700`}
              ></div>

              {/* Image Section */}
              <div className="relative h-48 sm:h-56 md:h-64 lg:h-80 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                  loading="lazy"
                />

                {/* Enhanced Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-60 group-hover:opacity-30 transition-all duration-500"></div>

                {/* Floating Stats with Animation */}
                <div
                  className={`absolute top-4 sm:top-6 right-4 sm:right-6 bg-black/70 backdrop-blur-md rounded-xl sm:rounded-2xl px-3 py-2 sm:px-4 sm:py-3 transition-all duration-500 transform ${
                    hoveredProject === project.id
                      ? "scale-110 bg-black/90 shadow-2xl"
                      : ""
                  }`}
                >
                  <div
                    className={`text-xl sm:text-2xl font-bold bg-gradient-to-r ${project.gradient} bg-clip-text text-transparent`}
                  >
                    +{project.stats.increase}
                  </div>
                  <div className="text-xs text-gray-300">
                    {project.stats.metric}
                  </div>
                </div>

                {/* Enhanced Category Badge */}
                <div className="absolute top-4 sm:top-6 left-4 sm:left-6 bg-white/10 backdrop-blur-md rounded-full px-3 py-1 sm:px-4 sm:py-2 text-xs sm:text-sm font-medium border border-white/20 group-hover:border-white/40 group-hover:bg-white/20 transition-all duration-300">
                  {project.category}
                </div>

                {/* Hover Indicator */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="bg-white/20 backdrop-blur-sm rounded-full p-4 border border-white/30">
                    <svg
                      className="w-8 h-8 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Enhanced Content Section */}
              <div className="p-4 sm:p-6 md:p-8">
                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-3 sm:mb-4 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:from-white group-hover:to-gray-300 transition-all duration-500">
                  {project.title}
                </h3>

                <p className="text-gray-400 text-sm sm:text-base md:text-lg leading-relaxed mb-4 sm:mb-6 group-hover:text-gray-300 transition-colors duration-300">
                  {project.description}
                </p>

                {/* Enhanced Action Button */}
                <button
                  className={`inline-flex items-center space-x-2 px-4 py-2 sm:px-5 sm:py-3 md:px-6 md:py-3 bg-gradient-to-r ${project.gradient} rounded-full text-white font-medium transition-all duration-300 hover:shadow-lg sm:hover:shadow-xl hover:scale-105 transform text-sm sm:text-base group/btn`}
                >
                  <span>Explore Project</span>
                  <svg
                    className="w-3 h-3 sm:w-4 sm:h-4 transition-transform duration-300 group-hover/btn:translate-x-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </button>
              </div>

              {/* Enhanced Decorative Elements */}
              <div className="absolute bottom-2 sm:bottom-4 right-2 sm:right-4 w-12 h-12 sm:w-16 sm:h-16 border-2 border-gray-600/30 rounded-full opacity-50 group-hover:opacity-100 group-hover:border-gray-400/50 group-hover:scale-110 transition-all duration-500"></div>

              {/* Corner Accent */}
              <div
                className={`absolute top-0 right-0 w-0 h-0 border-l-[30px] border-b-[30px] border-l-transparent group-hover:border-b-purple-500/20 transition-all duration-500`}
              ></div>
            </div>
          ))}
        </div>

        {/* Enhanced Call to Action */}
        <div ref={ctaRef} className="text-center mt-16 sm:mt-20 md:mt-24">
          <div className="relative inline-block group">
            <div className="absolute -inset-2 sm:-inset-3 md:-inset-4 bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 rounded-full blur-xl sm:blur-2xl opacity-30 group-hover:opacity-50 transition-opacity duration-500"></div>
            <button className="relative px-8 py-4 sm:px-10 sm:py-4 md:px-12 md:py-5 lg:px-14 lg:py-5 bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 rounded-full text-white font-bold text-base sm:text-lg md:text-xl transition-all duration-500 hover:scale-105 hover:shadow-2xl group-hover:shadow-purple-500/25 overflow-hidden">
              <span className="relative z-10">
                Let's Create Digital Magic Together
              </span>

              {/* Button shine effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
            </button>
          </div>

          <p className="text-gray-400 mt-4 sm:mt-6 text-sm sm:text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            Ready to transform your digital presence? Let's collaborate to
            create something extraordinary that resonates with your audience and
            drives real results.
          </p>

          {/* Contact indicators */}
          <div className="flex justify-center items-center space-x-6 mt-8">
            <div className="flex items-center space-x-2 text-gray-500 hover:text-gray-300 transition-colors duration-300 cursor-pointer">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm">Available for new projects</span>
            </div>
          </div>
        </div>
      </div>

      {/* Custom styles for animations */}
      <style jsx>{`
        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default OurWork;
