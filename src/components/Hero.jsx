// import React, { useEffect, useRef } from "react";
// import { gsap } from "gsap";
// import { SplitText } from "gsap/SplitText";

// // Register SplitText plugin
// gsap.registerPlugin(SplitText);

// export default function Hero() {
//   const heroRef = useRef(null);
//   const animationRef = useRef(null);

//   useEffect(() => {
//     if (!heroRef.current) return;

//     // Cleanup previous animations
//     if (animationRef.current) {
//       animationRef.current.kill();
//     }

//     const mainHeading = heroRef.current.querySelector(".main-heading");
//     const subHeading = heroRef.current.querySelector(".sub-heading");
//     const description = heroRef.current.querySelector(".description");
//     const ctaButton = heroRef.current.querySelector(".cta-button");
//     const decorator = heroRef.current.querySelector(".decorator");

//     if (!mainHeading || !subHeading || !description) return;

//     // Create SplitText instances
//     const splitMain = new SplitText(mainHeading, { type: "chars,words" });
//     const splitSub = new SplitText(subHeading, { type: "chars" });
//     const splitDesc = new SplitText(description, { type: "lines" });

//     // Create timeline
//     const tl = gsap.timeline({ defaults: { ease: "expo.out" } });
//     animationRef.current = tl;

//     // Animate main heading (character by character)
//     tl.from(splitMain.chars, {
//       y: 80,
//       opacity: 0,
//       rotationX: -90,
//       duration: 1,
//       stagger: 0.03,
//     });

//     // Animate subheading (word by word)
//     tl.from(
//       splitSub.chars,
//       {
//         y: 30,
//         opacity: 0,
//         duration: 0.8,
//         stagger: 0.02,
//       },
//       "-=0.5"
//     );

//     // Animate description (line by line)
//     tl.from(
//       splitDesc.lines,
//       {
//         y: 20,
//         opacity: 0,
//         duration: 0.6,
//         stagger: 0.1,
//       },
//       "-=0.3"
//     );

//     // Animate CTA button
//     tl.from(
//       ctaButton,
//       {
//         y: 20,
//         opacity: 0,
//         duration: 0.5,
//       },
//       "-=0.2"
//     );

//     // Animate decorator element
//     tl.from(
//       decorator,
//       {
//         scale: 0,
//         opacity: 0,
//         duration: 1,
//         ease: "elastic.out(1, 0.5)",
//       },
//       "-=0.5"
//     );

//     // Background elements animation
//     tl.from(
//       heroRef.current.querySelector(".background-overlay"),
//       {
//         opacity: 0,
//         duration: 1.5,
//       },
//       0
//     );

//     // Cleanup function
//     return () => {
//       splitMain.revert();
//       splitSub.revert();
//       splitDesc.revert();
//       if (animationRef.current) {
//         animationRef.current.kill();
//       }
//     };
//   }, []);

//   return (
//     <section
//       ref={heroRef}
//       className="relative w-full min-h-screen overflow-hidden flex items-center justify-center "
//     >
//       <div className="absolute inset-0 overflow-hidden">
//         {/* Gradient orbs */}
//         <div className="bg-element absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-400/20 to-purple-600/20 rounded-full blur-3xl floating-1"></div>
//         <div className="bg-element absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-purple-400/15 to-pink-600/15 rounded-full blur-3xl floating-2"></div>
//         <div className="bg-element absolute top-1/2 right-1/3 w-64 h-64 bg-gradient-to-r from-cyan-400/10 to-blue-600/10 rounded-full blur-2xl floating-3"></div>

//         {/* Grid pattern */}
//         <div className="bg-element absolute inset-0 opacity-[0.02] bg-[linear-gradient(rgba(0,0,0,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.1)_1px,transparent_1px)] bg-[size:50px_50px]"></div>

//         {/* Floating particles */}
//         <div className="particle absolute top-1/4 left-1/2 w-2 h-2 bg-red-400 rounded-full floating-1"></div>
//         <div className="particle absolute top-3/4 left-1/4 w-1 h-1 bg-purple-400 rounded-full floating-2"></div>
//         <div className="particle absolute top-1/2 right-1/4 w-3 h-3 bg-cyan-400 rounded-full floating-3"></div>
//         <div className="particle absolute bottom-1/3 left-3/4 w-1.5 h-1.5 bg-pink-400 rounded-full floating-1"></div>
//       </div>
//       {/* Pattern Overlay Layer */}
//       <div className="absolute inset-0 bg-pattern-layer opacity-20 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDAgTSAwIDIwIEwgNDAgMjAgTSAyMCAwIEwgMjAgNDAgTSAwIDMwIEwgNDAgMzAgTSAzMCAwIEwgMzAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzAwMCIgc3Ryb2tlLW9wYWNpdHk9IjAuMiIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')]"></div>
//       {/* Abstract decorator element */}
//       <div className="decorator absolute right-20 top-1/4 w-80 h-80 rounded-full bg-gradient-conic from-blue-500/30 via-transparent to-transparent blur-xl"></div>

//       {/* Content container */}
//       <div className="relative z-10 container mx-auto px-6 py-20 mt-20">
//         <div className="max-w-8xl mx-auto">
//           {/* Subheading */}
//           <h2 className="sub-heading font-mono text-md md:text-lg lg:text-2xl tracking-widest  text-blue-800 uppercase mb-4">
//             Digital Innovation
//           </h2>

//           {/* Main heading */}
//           <h1 className="main-heading text-7xl sm:text-6xl md:text-7xl lg:text-[12rem] font-bold tracking-tight font-space-Mozilla text-gray-900 mb-6">
//             Magnify your brand's Potential
//           </h1>
//           <div>
//             {/* Description */}
//             <p className="description text-lg md:text-3xl text-gray-700 mb-10 max-w-4xl leading-relaxed">
//               From Vision to <strong>Visibility- evolving</strong> brand stories
//               to standout success projects.
//             </p>

//             {/* CTA button */}
//             <button className=" px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-full hover:shadow-lg hover:shadow-blue-500/30 transition-all duration-300">
//               Explore Our Work
//             </button>
//           </div>
//         </div>
//         {/* Decorative Elements */}
//         <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
//           {/* Geometric shapes */}
//           <div className="decorator absolute top-1/4 left-10 w-20 h-20 border-2 border-blue-800 rounded-2xl rotate-45 opacity-30 parallax-light"></div>
//           <div className="decorator absolute bottom-1/3 right-10 w-16 h-16 bg-gradient-to-br from-purple-200 to-blue-200 rounded-full opacity-25 parallax-heavy"></div>
//           <div className="decorator absolute top-2/3 left-1/4 w-12 h-12 border border-cyan-200 rotate-45 opacity-20 parallax-light"></div>

//           {/* Floating lines */}
//           <div className="decorator absolute top-1/2 right-1/4 w-32 h-0.5 bg-gradient-to-r from-transparent via-blue-300 to-transparent opacity-30 parallax-light"></div>
//           <div className="decorator absolute bottom-1/4 left-1/3 w-24 h-0.5 bg-gradient-to-r from-transparent via-purple-300 to-transparent opacity-25 parallax-heavy"></div>
//         </div>

//         {/* Scroll Indicator */}
//         <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center text-gray-400">
//           <span className="text-xs font-medium mb-2 tracking-widest uppercase">
//             Scroll
//           </span>
//           <div className="w-0.5 h-8 bg-gradient-to-b from-gray-400 to-transparent relative overflow-hidden">
//             <div className="absolute top-0 left-0 w-full h-2 bg-blue-500 animate-pulse"></div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }
import React, { useEffect, useRef } from "react";

export default function Hero() {
  const heroRef = useRef(null);
  const animationRef = useRef(null);

  useEffect(() => {
    if (!heroRef.current) return;

    // Simulate GSAP animations with CSS transitions and delays
    const mainHeading = heroRef.current.querySelector(".main-heading");
    const subHeading = heroRef.current.querySelector(".sub-heading");
    const description = heroRef.current.querySelector(".description");
    const ctaButton = heroRef.current.querySelector(".cta-button");
    const decorators = heroRef.current.querySelectorAll(".decorator");
    const backgroundOverlay = heroRef.current.querySelector(
      ".background-overlay"
    );

    // Animate elements with staggered delays
    setTimeout(() => {
      if (backgroundOverlay) backgroundOverlay.style.opacity = "1";
    }, 0);

    setTimeout(() => {
      if (subHeading) {
        subHeading.style.opacity = "1";
        subHeading.style.transform = "translateY(0)";
      }
    }, 300);

    setTimeout(() => {
      if (mainHeading) {
        mainHeading.style.opacity = "1";
        mainHeading.style.transform = "translateY(0) rotateX(0)";
      }
    }, 600);

    setTimeout(() => {
      if (description) {
        description.style.opacity = "1";
        description.style.transform = "translateY(0)";
      }
    }, 1200);

    setTimeout(() => {
      if (ctaButton) {
        ctaButton.style.opacity = "1";
        ctaButton.style.transform = "translateY(0)";
      }
    }, 1500);

    decorators.forEach((decorator, index) => {
      setTimeout(() => {
        decorator.style.opacity = "1";
        decorator.style.transform = "scale(1)";
      }, 1800 + index * 100);
    });

    return () => {
      // Cleanup
    };
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative w-full min-h-screen overflow-hidden flex items-center justify-center "
    >
      {/* Enhanced Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Premium gradient orbs with enhanced styling */}
        {/* <div className="bg-element absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-500/30 to-purple-600/40 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="bg-element absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-purple-500/25 to-pink-600/35 rounded-full blur-3xl floating-2"></div>
        <div className="bg-element absolute top-1/2 right-1/3 w-64 h-64 bg-gradient-to-r from-cyan-500/20 to-blue-600/30 rounded-full blur-2xl floating-3"></div> */}

        {/* Additional accent orbs */}
        {/* <div className="bg-element absolute top-1/3 right-1/5 w-48 h-48 bg-gradient-to-r from-emerald-400/15 to-teal-500/25 rounded-full blur-2xl floating-1"></div>
        <div className="bg-element absolute bottom-1/3 left-1/5 w-56 h-56 bg-gradient-to-r from-orange-400/10 to-red-500/20 rounded-full blur-3xl floating-2"></div> */}

        {/* Enhanced grid pattern */}
        {/* <div className="bg-element absolute inset-0 opacity-[0.08] bg-[linear-gradient(rgba(59,130,246,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.1)_1px,transparent_1px)] bg-[size:50px_50px]"></div> */}

        {/* Premium floating particles */}
        <div className="particle absolute top-1/4 left-1/2 w-3 h-3 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full floating-1 shadow-lg"></div>
        <div className="particle absolute top-3/4 left-1/4 w-2 h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full floating-2 shadow-md"></div>
        <div className="particle absolute top-1/2 right-1/4 w-4 h-4 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full floating-3 shadow-lg"></div>
        <div className="particle absolute bottom-1/3 left-3/4 w-2.5 h-2.5 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full floating-1 shadow-md"></div>

        {/* Additional micro particles */}
        <div className="particle absolute top-1/5 left-1/3 w-1 h-1 bg-blue-400 rounded-full floating-3 opacity-70"></div>
        <div className="particle absolute bottom-1/5 right-1/3 w-1.5 h-1.5 bg-purple-400 rounded-full floating-2 opacity-60"></div>
        <div className="particle absolute top-2/3 left-1/5 w-1 h-1 bg-cyan-400 rounded-full floating-1 opacity-80"></div>
      </div>

      {/* Enhanced Pattern Overlay Layer */}
      <div className="background-overlay absolute inset-0 bg-pattern-layer opacity-0 transition-opacity duration-1500 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDAgTSAwIDIwIEwgNDAgMjAgTSAyMCAwIEwgMjAgNDAgTSAwIDMwIEwgNDAgMzAgTSAzMCAwIEwgMzAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzM3NzNmNCIgc3Ryb2tlLW9wYWNpdHk9IjAuMSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] bg-[size:80px_80px]"></div>

      {/* Enhanced Abstract decorator element */}
      <div className="decorator absolute right-20 top-1/4 w-96 h-96 rounded-full bg-gradient-conic from-blue-500/40 via-purple-500/30 via-cyan-500/20 to-transparent blur-2xl opacity-0 transition-all duration-1000 scale-75"></div>

      {/* Additional decorative elements */}
      <div className="decorator absolute left-20 bottom-1/4 w-72 h-72 rounded-full bg-gradient-conic from-purple-500/30 via-pink-500/20 via-orange-500/10 to-transparent blur-2xl opacity-0 transition-all duration-1000 scale-75"></div>

      {/* Content container with enhanced styling */}
      <div className="relative z-10 container mx-auto px-6 py-20 mt-20">
        <div className="max-w-8xl mx-auto">
          {/* Enhanced Subheading */}
          <h2 className="sub-heading font-mono text-sm md:text-lg lg:text-xl tracking-[0.3em] text-blue-700 uppercase mb-8 opacity-0 transform translate-y-8 transition-all duration-800 relative">
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent font-semibold">
              Digital Innovation
            </span>
            <div className="absolute -bottom-2 left-0 w-16 h-0.5 bg-gradient-to-r from-blue-500 to-transparent"></div>
          </h2>

          {/* Enhanced Main heading with better typography */}
          <h1 className="main-heading text-5xl sm:text-6xl md:text-7xl lg:text-[8rem] xl:text-[10rem] font-black tracking-tight mb-8 opacity-0 transform translate-y-12 rotateX-90 transition-all duration-1000 leading-[0.85]">
            <span className="main-heading text-7xl sm:text-6xl md:text-7xl lg:text-[12rem] block bg-gradient-to-r from-slate-900 via-slate-700 to-slate-900 bg-clip-text text-transparent font-bold tracking-tight font-space-Mozilla">
              Magnify your
            </span>
            <span className="main-heading text-7xl sm:text-6xl md:text-7xl lg:text-[12rem] block bg-gradient-to-r from-slate-900 via-slate-700 to-slate-900 bg-clip-text text-transparent relative font-bold tracking-tight font-space-Mozilla">
              brand's Potential
              <div className="absolute -bottom-4 left-0 w-32 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-transparent opacity-70"></div>
            </span>
          </h1>

          <div>
            {/* Enhanced Description with better readability */}
            <p className="description text-xl md:text-2xl lg:text-3xl text-slate-600 mb-12 max-w-5xl leading-relaxed opacity-0 transform translate-y-8 transition-all duration-800 font-light">
              From Vision to{" "}
              <span className="font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Visibility
              </span>{" "}
              - evolving brand stories into standout success projects.
            </p>

            {/* Enhanced CTA button with premium styling */}
            <div className="opacity-0 transform translate-y-8 transition-all duration-800">
              <button className="cta-button group relative px-10 py-5 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-700 text-white font-semibold rounded-full overflow-hidden transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/30 text-lg">
                <span className="relative z-10 flex items-center gap-3">
                  Explore Our Work
                  <svg
                    className="w-5 h-5 transition-transform group-hover:translate-x-1"
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
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-blue-600 to-purple-700 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full blur-xl"></div>
              </button>
            </div>

            {/* Additional feature highlights */}
            <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl opacity-0 transform translate-y-8 transition-all duration-800 delay-300">
              <div className="flex items-center gap-3 text-slate-600">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
                  <svg
                    className="w-4 h-4 text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <span className="font-medium">Award-winning designs</span>
              </div>
              <div className="flex items-center gap-3 text-slate-600">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                  <svg
                    className="w-4 h-4 text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <span className="font-medium">Global reach</span>
              </div>
              <div className="flex items-center gap-3 text-slate-600">
                <div className="w-8 h-8 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full flex items-center justify-center">
                  <svg
                    className="w-4 h-4 text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <span className="font-medium">24/7 support</span>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Decorative Elements */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
          {/* Premium geometric shapes */}
          <div className="decorator absolute top-1/4 left-10 w-26 h-26 md:w-44 md:h-44 border-2 border-blue-400/40 rounded-3xl rotate-45 opacity-0 transition-all duration-1000 scale-75 parallax-light backdrop-blur-sm bg-white/10 shadow-lg"></div>
          <div className="decorator absolute bottom-1/3 right-10 w-20 h-20 bg-gradient-to-br from-purple-400/50 to-blue-400/50 rounded-full opacity-0 transition-all duration-1000 scale-75 parallax-heavy shadow-xl"></div>
          <div className="decorator absolute top-2/3 left-1/4 w-16 h-16 border-2 border-cyan-400/50 rotate-45 opacity-0 transition-all duration-1000 scale-75 parallax-light backdrop-blur-sm bg-gradient-to-br from-cyan-100/20 to-blue-100/20 rounded-xl shadow-md"></div>

          {/* Enhanced floating lines with glow effects */}
          <div className="decorator absolute top-1/2 right-1/4 w-40 h-1 bg-gradient-to-r from-transparent via-blue-400/60 to-transparent opacity-0 transition-all duration-1000 parallax-light rounded-full shadow-lg shadow-blue-400/20"></div>
          <div className="decorator absolute bottom-1/4 left-1/3 w-32 h-1 bg-gradient-to-r from-transparent via-purple-400/60 to-transparent opacity-0 transition-all duration-1000 parallax-heavy rounded-full shadow-lg shadow-purple-400/20"></div>

          {/* Additional decorative elements */}
          <div className="decorator absolute top-1/3 right-1/5 w-6 h-6 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full opacity-0 transition-all duration-1000 scale-75 shadow-lg"></div>
          <div className="decorator absolute bottom-1/5 left-1/6 w-8 h-8 border border-rose-400/50 rounded-full opacity-0 transition-all duration-1000 scale-75 backdrop-blur-sm bg-rose-100/20"></div>
        </div>

        {/* Enhanced Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center text-slate-500 group cursor-pointer">
          <span className="text-xs font-semibold mb-3 tracking-[0.2em] uppercase transition-colors group-hover:text-blue-600">
            Scroll
          </span>
          <div className="w-1 h-12 bg-gradient-to-b from-slate-400 via-blue-400 to-transparent relative overflow-hidden rounded-full">
            <div className="absolute top-0 left-0 w-full h-3 bg-gradient-to-b from-blue-500 to-purple-500 animate-bounce rounded-full shadow-lg shadow-blue-400/30"></div>
          </div>
        </div>
      </div>

      {/* Custom CSS for enhanced animations */}
      <style jsx>{`
        @keyframes floating-1 {
          0%,
          100% {
            transform: translateY(0px) translateX(0px) rotate(0deg);
          }
          25% {
            transform: translateY(-20px) translateX(10px) rotate(90deg);
          }
          50% {
            transform: translateY(-10px) translateX(-10px) rotate(180deg);
          }
          75% {
            transform: translateY(-15px) translateX(5px) rotate(270deg);
          }
        }

        @keyframes floating-2 {
          0%,
          100% {
            transform: translateY(0px) translateX(0px) rotate(0deg);
          }
          33% {
            transform: translateY(-15px) translateX(-10px) rotate(120deg);
          }
          66% {
            transform: translateY(-25px) translateX(15px) rotate(240deg);
          }
        }

        @keyframes floating-3 {
          0%,
          100% {
            transform: translateY(0px) translateX(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-30px) translateX(20px) rotate(180deg);
          }
        }

        @keyframes pulse-slow {
          0%,
          100% {
            opacity: 0.3;
            transform: scale(1);
          }
          50% {
            opacity: 0.6;
            transform: scale(1.05);
          }
        }

        .floating-1 {
          animation: floating-1 8s ease-in-out infinite;
        }
        .floating-2 {
          animation: floating-2 10s ease-in-out infinite;
        }
        .floating-3 {
          animation: floating-3 12s ease-in-out infinite;
        }
        .animate-pulse-slow {
          animation: pulse-slow 4s ease-in-out infinite;
        }

        .parallax-light {
          animation: floating-1 15s ease-in-out infinite;
        }
        .parallax-heavy {
          animation: floating-2 20s ease-in-out infinite;
        }

        .rotateX-90 {
          transform: rotateX(-90deg);
        }

        /* Additional hover effects */
        .cta-button:hover {
          transform: translateY(-2px) scale(1.05);
          box-shadow: 0 20px 40px rgba(59, 130, 246, 0.3);
        }

        /* Gradient animation */
        @keyframes gradient-shift {
          0%,
          100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }

        .main-heading {
          background-size: 200% 200%;
          animation: gradient-shift 6s ease infinite;
        }

        /* Backdrop blur effects for modern glassmorphism */
        .bg-element {
          backdrop-filter: blur(1px);
        }
      `}</style>
    </section>
  );
}
