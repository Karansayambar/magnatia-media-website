import React, { useState } from "react";

const OurWork = () => {
  const [hoveredProject, setHoveredProject] = useState(null);

  // Placeholder image for demonstration
  const placeholderImg =
    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300' viewBox='0 0 400 300'%3E%3Cdefs%3E%3ClinearGradient id='grad1' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%236366F1;stop-opacity:1' /%3E%3Cstop offset='100%25' style='stop-color:%238B5CF6;stop-opacity:1' /%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='400' height='300' fill='url(%23grad1)'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-size='18' fill='white' font-weight='bold'%3EProject Preview%3C/text%3E%3C/svg%3E";

  const projects = [
    {
      id: 1,
      title: "E-Commerce Revolution",
      category: "Web Design & Development",
      description: "Complete brand transformation with modern UI/UX",
      image: placeholderImg,
      gradient: "from-purple-600 to-pink-600",
      stats: { increase: "250%", metric: "conversion rate" },
    },
    {
      id: 2,
      title: "Digital Banking App",
      category: "Mobile App Design",
      description: "Intuitive banking experience with cutting-edge security",
      image: placeholderImg,
      gradient: "from-blue-600 to-cyan-600",
      stats: { increase: "180%", metric: "user engagement" },
    },
    {
      id: 3,
      title: "SaaS Platform Redesign",
      category: "Dashboard Design",
      description: "Complex data visualization made simple and beautiful",
      image: placeholderImg,
      gradient: "from-emerald-600 to-teal-600",
      stats: { increase: "320%", metric: "user retention" },
    },
    {
      id: 4,
      title: "Brand Identity Suite",
      category: "Brand Design",
      description: "Complete visual identity for tech startup",
      image: placeholderImg,
      gradient: "from-orange-600 to-red-600",
      stats: { increase: "400%", metric: "brand recognition" },
    },
  ];

  return (
    <div
      id="ourwork"
      className="bg-black text-white min-h-screen py-12 sm:py-16 md:py-20 px-4 sm:px-8 md:px-12 lg:px-20"
    >
      {/* Hero Section */}
      <div className="w-full mx-auto">
        <div className="flex flex-col lg:flex-row gap-8 md:gap-12 lg:gap-20 items-center mb-16 md:mb-24 lg:mb-32">
          {/* Title Section */}
          <div className="relative w-full lg:w-1/2">
            <div className="absolute -top-6 -left-6 sm:-top-8 sm:-left-8 w-24 h-24 sm:w-32 sm:h-32 border-white bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-full blur-3xl"></div>
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-[160px] font-space-poppins leading-none relative z-10">
              <span className="block bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                OUR
              </span>
              <span className="block bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent sm:ml-8">
                WORK
              </span>
            </h1>

            {/* Decorative Elements */}
            <div className="absolute -bottom-4 sm:-bottom-5 right-0 w-16 h-16 sm:w-24 sm:h-24 border-2 border-purple-500/30 rounded-full"></div>
            <div className="absolute top-1/2 -right-4 sm:-right-5 w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-full blur-xl"></div>
          </div>

          {/* Content Section */}
          <div className="relative w-full lg:w-1/2">
            <div className="absolute -top-4 -right-4 sm:-top-5 sm:-right-5 w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 rounded-full blur-2xl"></div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 md:mb-8 leading-tight">
              Making brands a{" "}
              <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                damn site
              </span>{" "}
              better.
            </h2>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-300 leading-relaxed">
              Let's face it, first impressions matter. Your website's an
              opportunity to wow your audience, so why choose bad design? Brands
              win over fans when they're brave enough to go beyond their
              creative comfort zone.
            </p>

            {/* Stats */}
            <div className="flex flex-wrap gap-4 sm:gap-6 md:gap-8 mt-8 sm:mt-10 md:mt-12">
              <div className="text-center min-w-[80px] sm:min-w-[100px]">
                <div className="text-2xl sm:text-3xl font-bold text-purple-400">
                  50+
                </div>
                <div className="text-xs sm:text-sm text-gray-400">Projects</div>
              </div>
              <div className="text-center min-w-[80px] sm:min-w-[100px]">
                <div className="text-2xl sm:text-3xl font-bold text-cyan-400">
                  98%
                </div>
                <div className="text-xs sm:text-sm text-gray-400">
                  Success Rate
                </div>
              </div>
              <div className="text-center min-w-[80px] sm:min-w-[100px]">
                <div className="text-2xl sm:text-3xl font-bold text-emerald-400">
                  24/7
                </div>
                <div className="text-xs sm:text-sm text-gray-400">Support</div>
              </div>
            </div>
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 md:gap-10 lg:gap-12">
          {projects.map((project, index) => (
            <div
              key={project.id}
              className={`group relative overflow-hidden rounded-xl sm:rounded-2xl lg:rounded-3xl bg-gradient-to-br from-gray-900/50 to-gray-800/30 border border-gray-700/50 backdrop-blur-sm transition-all duration-500 hover:scale-[1.02] sm:hover:scale-[1.03] lg:hover:scale-105 hover:border-gray-600 ${
                index % 2 === 0
                  ? "sm:translate-y-6 lg:translate-y-12"
                  : "sm:translate-y-6 lg:translate-y-12"
              }`}
              onMouseEnter={() => setHoveredProject(project.id)}
              onMouseLeave={() => setHoveredProject(null)}
            >
              {/* Background Glow */}
              <div
                className={`absolute inset-0 bg-gradient-to-r ${project.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
              ></div>

              {/* Image Section */}
              <div className="relative h-48 sm:h-56 md:h-64 lg:h-80 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500"></div>

                {/* Floating Stats */}
                <div
                  className={`absolute top-4 sm:top-6 right-4 sm:right-6 bg-black/70 backdrop-blur-sm rounded-xl sm:rounded-2xl px-3 py-1 sm:px-4 sm:py-2 transition-all duration-500 ${
                    hoveredProject === project.id ? "scale-110 bg-black/90" : ""
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

                {/* Category Badge */}
                <div className="absolute top-4 sm:top-6 left-4 sm:left-6 bg-white/10 backdrop-blur-sm rounded-full px-3 py-1 sm:px-4 sm:py-2 text-xs sm:text-sm font-medium border border-white/20">
                  {project.category}
                </div>
              </div>

              {/* Content Section */}
              <div className="p-4 sm:p-6 md:p-8">
                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2 sm:mb-4 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:from-white group-hover:to-gray-300 transition-all duration-500">
                  {project.title}
                </h3>
                <p className="text-gray-400 text-sm sm:text-base md:text-lg leading-relaxed mb-4 sm:mb-6">
                  {project.description}
                </p>

                {/* Action Button */}
                <button
                  className={`inline-flex items-center space-x-2 px-4 py-2 sm:px-5 sm:py-2.5 md:px-6 md:py-3 bg-gradient-to-r ${project.gradient} rounded-full text-white font-medium transition-all duration-300 hover:shadow-lg sm:hover:shadow-xl hover:scale-105 transform text-sm sm:text-base`}
                >
                  <span>View Project</span>
                  <svg
                    className="w-3 h-3 sm:w-4 sm:h-4 transition-transform duration-300 group-hover:translate-x-1"
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

              {/* Decorative Elements */}
              <div className="absolute bottom-2 sm:bottom-4 right-2 sm:right-4 w-12 h-12 sm:w-16 sm:h-16 border-2 border-gray-600/30 rounded-full opacity-50 group-hover:opacity-100 group-hover:border-gray-400/50 transition-all duration-500"></div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16 sm:mt-20 md:mt-24">
          <div className="relative inline-block">
            <div className="absolute -inset-2 sm:-inset-3 md:-inset-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full blur-xl sm:blur-2xl opacity-30"></div>
            <button className="relative px-6 py-3 sm:px-8 sm:py-3 md:px-10 md:py-4 lg:px-12 lg:py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full text-white font-bold text-base sm:text-lg md:text-xl transition-all duration-300 hover:scale-105 hover:shadow-lg sm:hover:shadow-xl">
              Let's Create Something Amazing
            </button>
          </div>
          <p className="text-gray-400 mt-4 sm:mt-6 text-sm sm:text-base md:text-lg">
            Ready to transform your brand? Let's make it happen.
          </p>
        </div>
      </div>
    </div>
  );
};

export default OurWork;
