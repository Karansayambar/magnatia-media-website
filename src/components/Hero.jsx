// import React, { useEffect, useRef } from "react";
// import { gsap } from "gsap";

// export default function Hero() {
//   const heroRef = useRef(null);

//   useEffect(() => {
//     const headings = heroRef.current.querySelectorAll(".heading-text");

//     headings.forEach((heading, i) => {
//       const words = heading.innerText.split(" ");

//       // Wrap each word in a container (overflow-hidden) and an inner span
//       heading.innerHTML = words
//         .map(
//           (word) => `
//           <span class="word-wrapper inline-block overflow-hidden">
//             <span class="word inline-block">${word}</span>
//           </span>
//         `
//         )
//         .join(" ");

//       // Animate the inner .word span
//       gsap.fromTo(
//         heading.querySelectorAll(".word"),
//         { y: "100%", opacity: 0 },
//         {
//           y: "0%",
//           opacity: 1,
//           duration: 1.5,
//           ease: "power3.out",
//           stagger: 0.1,
//           delay: i * 0.1,
//         }
//       );
//     });
//   }, []);

//   return (
//     <section className="relative w-full h-screen overflow-hidden">
//       {/* Background Gradient Layer */}
//       <div className="absolute inset-0 bg-gradient-layer"></div>

//       {/* Pattern Overlay Layer */}
//       <div className="absolute inset-0 bg-pattern-layer"></div>

//       {/* Content */}
//       <div
//         ref={heroRef}
//         className="relative z-10 flex flex-col items-center justify-center h-full px-6 text-center text-black"
//       >
//         <div className="w-full space-x-auto space-y-6 px-30 py-20 flex ">
//           <div className="max-w-400 flex-8 p-0 m-0 ">
//             <div>
//               <p className="heading-text text-4xl sm:text-5xl md:text-[14rem] tracking-wide font-medium  text-center font-space-Mozilla p-0 m-0 h-40">
//                 Unlock
//               </p>
//             </div>
//             <div>
//               <p className="heading-text text-4xl sm:text-5xl md:text-[14rem] tracking-wide font-medium  font-space-Mozilla h-40">
//                 Your
//               </p>
//             </div>
//             <div>
//               <p className="heading-text text-4xl sm:text-5xl md:text-[14rem] tracking-wide font-medium  font-space-Mozilla h-40">
//                 Brand
//               </p>
//             </div>
//             <div className="">
//               <p className="heading-text font-space-Mozilla text-4xl tracking-wide sm:text-5xl font-medium md:text-[14rem] h-40">
//                 Potential
//               </p>
//             </div>
//           </div>
//           <div className="flex sm:flex-row md:flex-col gap-4 items-end justify-end h-50 w-120">
//             <p className="text-lg sm:text-2xl text-gray-900 text-start font-space-Roboto">
//               Tap into a world where billions engage, purchase, and follow,
//               elevating your brand to new heights in the
//               <strong> thriving social marketplace.</strong>
//             </p>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText";

// Register SplitText plugin
gsap.registerPlugin(SplitText);

export default function Hero() {
  const heroRef = useRef(null);
  const animationRef = useRef(null);

  useEffect(() => {
    if (!heroRef.current) return;

    // Cleanup previous animations
    if (animationRef.current) {
      animationRef.current.kill();
    }

    const mainHeading = heroRef.current.querySelector(".main-heading");
    const subHeading = heroRef.current.querySelector(".sub-heading");
    const description = heroRef.current.querySelector(".description");
    const ctaButton = heroRef.current.querySelector(".cta-button");
    const decorator = heroRef.current.querySelector(".decorator");

    if (!mainHeading || !subHeading || !description) return;

    // Create SplitText instances
    const splitMain = new SplitText(mainHeading, { type: "chars,words" });
    const splitSub = new SplitText(subHeading, { type: "chars" });
    const splitDesc = new SplitText(description, { type: "lines" });

    // Create timeline
    const tl = gsap.timeline({ defaults: { ease: "expo.out" } });
    animationRef.current = tl;

    // Animate main heading (character by character)
    tl.from(splitMain.chars, {
      y: 80,
      opacity: 0,
      rotationX: -90,
      duration: 1,
      stagger: 0.03,
    });

    // Animate subheading (word by word)
    tl.from(
      splitSub.chars,
      {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.02,
      },
      "-=0.5"
    );

    // Animate description (line by line)
    tl.from(
      splitDesc.lines,
      {
        y: 20,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
      },
      "-=0.3"
    );

    // Animate CTA button
    tl.from(
      ctaButton,
      {
        y: 20,
        opacity: 0,
        duration: 0.5,
      },
      "-=0.2"
    );

    // Animate decorator element
    tl.from(
      decorator,
      {
        scale: 0,
        opacity: 0,
        duration: 1,
        ease: "elastic.out(1, 0.5)",
      },
      "-=0.5"
    );

    // Background elements animation
    tl.from(
      heroRef.current.querySelector(".background-overlay"),
      {
        opacity: 0,
        duration: 1.5,
      },
      0
    );

    // Cleanup function
    return () => {
      splitMain.revert();
      splitSub.revert();
      splitDesc.revert();
      if (animationRef.current) {
        animationRef.current.kill();
      }
    };
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative w-full min-h-screen overflow-hidden flex items-center justify-center "
    >
      {/* Pattern Overlay Layer */}
      <div className="absolute inset-0 bg-pattern-layer opacity-20 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDAgTSAwIDIwIEwgNDAgMjAgTSAyMCAwIEwgMjAgNDAgTSAwIDMwIEwgNDAgMzAgTSAzMCAwIEwgMzAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzAwMCIgc3Ryb2tlLW9wYWNpdHk9IjAuMiIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')]"></div>
      {/* Abstract decorator element */}
      <div className="decorator absolute right-20 top-1/4 w-80 h-80 rounded-full bg-gradient-conic from-blue-500/30 via-transparent to-transparent blur-xl"></div>

      {/* Content container */}
      <div className="relative z-10 container mx-auto px-6 py-20 mt-20">
        <div className="max-w-4xl mx-auto">
          {/* Subheading */}
          <h2 className="sub-heading font-mono text-sm md:text-lg tracking-widest  text-blue-800 uppercase mb-4">
            Digital Innovation
          </h2>

          {/* Main heading */}
          <h1 className="main-heading text-5xl sm:text-6xl md:text-7xl lg:text-[160px] font-bold tracking-tight font-space-Mozilla text-black mb-6">
            Unfold Your Brand's Potetial!
          </h1>

          {/* Description */}
          <p className="description text-lg md:text-2xl text-gray-700 mb-10 max-w-2xl leading-relaxed">
            Tap into a world where billions engage, purchase, and follow,
            elevating your brand to new heights in the{" "}
            <strong>thriving social marketplace</strong>.
          </p>

          {/* CTA button */}
          <button className="cta-button px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-full hover:shadow-lg hover:shadow-blue-500/30 transition-all duration-300">
            Explore Our Work
          </button>
        </div>
      </div>
    </section>
  );
}
