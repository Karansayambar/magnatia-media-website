// import { useState, useRef, useEffect } from "react";
// import { gsap } from "gsap";
// import design from "../assets/design.jpg";
// import build from "../assets/build-a-future.jpg";
// import Strategy from "../assets/strategy.jpg";

// const steps = [
//   {
//     id: 1,
//     number: "01/",
//     title: "Design with guts.",
//     img: design,
//     description:
//       "Immersive experiences that wow while working hard; and tugs at heartstrings; just enough to move your audience to act.",
//   },
//   {
//     id: 2,
//     number: "02/",
//     title: "Strategy creativity.",
//     img: Strategy,
//     description:
//       "Taking the road less travelled, but with sharp strategy and standout creativity; ensuring that your brand gets the spotlight it deserves.",
//   },
//   {
//     id: 3,
//     number: "03/",
//     title: "Build for the future.",
//     img: build,
//     description:
//       "We develop scalable, future-ready solutions designed to grow with your brand and adapt to an ever-changing digital landscape.",
//   },
// ];

// const Strategically = () => {
//   const [hoveredItem, setHoveredItem] = useState(null);
//   const containerRefs = useRef({});
//   const imgRefs = useRef({});
//   const borderRefs = useRef({});
//   const descRefs = useRef({});
//   const titleRefs = useRef({});
//   const mousePos = useRef({ x: 0, y: 0 });
//   const animationFrame = useRef(null);

//   // Smooth mouse follow using GSAP ticker
//   useEffect(() => {
//     const update = () => {
//       if (hoveredItem) {
//         gsap.to(imgRefs.current[hoveredItem], {
//           x: mousePos.current.x,
//           y: mousePos.current.y,
//           duration: 0.3,
//           ease: "power1.inOut",
//         });
//       }
//     };
//     gsap.ticker.add(update);
//     return () => gsap.ticker.remove(update);
//   }, [hoveredItem]);

//   const handleMouseEnter = (id) => {
//     setHoveredItem(id);

//     gsap.to(imgRefs.current[id], {
//       autoAlpha: 1,
//       scale: 1,
//       duration: 0.4,
//       ease: "power3.in",
//     });

//     gsap.to(borderRefs.current[id], {
//       backgroundImage: "linear-gradient(to right, #a855f7, #3b82f6)",
//       duration: 0.5,
//     });

//     gsap.to(descRefs.current[id], {
//       autoAlpha: 1,
//       y: 0,
//       duration: 0.5,
//       ease: "power3.out",
//     });

//     gsap.to(titleRefs.current[id], {
//       autoAlpha: 1,
//       duration: 0.5,
//       opacity: 1,
//       ease: "power3.out",
//     });
//   };

//   const handleMouseLeave = (id) => {
//     setHoveredItem(null);
//     gsap.to(titleRefs.current[id], {
//       autoAlpha: 0.6,
//       duration: 0.5,
//       opacity: 0.6,
//       ease: "power3.out",
//     });

//     gsap.to(imgRefs.current[id], {
//       autoAlpha: 0,
//       scale: 0.75,
//       duration: 0.4,
//       ease: "power3.out",
//     });

//     gsap.to(borderRefs.current[id], {
//       backgroundImage: "linear-gradient(to right, black, black)",
//       duration: 0.5,
//     });

//     gsap.to(descRefs.current[id], {
//       autoAlpha: 0,
//       y: 20,
//       duration: 0.4,
//     });
//   };

//   const handleMouseMove = (e, id) => {
//     const rect = containerRefs.current[id].getBoundingClientRect();
//     mousePos.current.x = e.clientX - rect.left - rect.width / 2;
//     mousePos.current.y = e.clientY - rect.top - rect.height / 1;
//   };

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen py-20 md:py-40 px-4 sm:px-6 md:px-10 lg:px-20 bg-transparent">
//       {/* Header Section */}
//       <div className="max-w-6xl mx-auto my-20 md:my-40">
//         <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[110px] font-space-poppins text-center leading-[1.1] md:leading-[110px] tracking-tighter text-gray-900">
//           Brand-led, Strategically built, Engineered for Impact.
//         </h1>
//       </div>

//       {/* Steps Section */}
//       <div className="w-full mx-auto px-4 sm:px-6 md:px-10 lg:px-16">
//         <ul>
//           {steps.map((step) => (
//             <li
//               key={step.id}
//               ref={(el) => (containerRefs.current[step.id] = el)}
//               className="relative flex flex-col lg:flex-row items-start lg:items-center justify-between h-auto lg:h-[400px] p-6 lg:p-10 border-b border-gray-300 cursor-pointer overflow-visible"
//               onMouseEnter={() => handleMouseEnter(step.id)}
//               onMouseLeave={() => handleMouseLeave(step.id)}
//               onMouseMove={(e) => handleMouseMove(e, step.id)}
//             >
//               {/* Number */}
//               <div className="absolute top-4 left-4 lg:top-6 lg:left-6 z-30">
//                 <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-mono text-gray-600">
//                   {step.number}
//                 </p>
//               </div>

//               {/* Title */}
//               <div
//                 ref={(el) => (titleRefs.current[step.id] = el)}
//                 className="flex-1 mt-12 lg:mt-0 lg:max-w-2xl xl:max-w-4xl z-20"
//               >
//                 <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-[120px] font-medium text-black opacity-70 hover:opacity-100 tracking-tighter font-space-poppins">
//                   {step.title}
//                 </h2>
//               </div>

//               {/* Floating Image */}
//               <div
//                 ref={(el) => (imgRefs.current[step.id] = el)}
//                 className="absolute top-1/2 left-1/2 z-10 opacity-0 scale-95 pointer-events-none w-[200px] h-[200px] sm:w-[250px] sm:h-[250px] md:w-[300px] md:h-[300px] lg:h-[500px] lg:w-[500px]"
//                 style={{ transform: "translate(-50%, -50%)" }}
//               >
//                 <img
//                   src={step.img}
//                   alt="creative"
//                   className="w-full h-full object-cover shadow-2xl rounded-lg"
//                 />
//               </div>

//               {/* Description */}
//               <div
//                 ref={(el) => (descRefs.current[step.id] = el)}
//                 className="mt-6 lg:mt-0 lg:max-w-md opacity-0 translate-y-4 z-20"
//               >
//                 <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-medium leading-tight tracking-tight text-black">
//                   {step.description}
//                 </p>
//               </div>

//               {/* Border */}
//               <div
//                 ref={(el) => (borderRefs.current[step.id] = el)}
//                 className="absolute bottom-0 left-0 h-0.5 w-full bg-black z-0"
//               ></div>
//             </li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// };

// export default Strategically;

import { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import design from "../assets/design.jpg";
import build from "../assets/build-a-future.jpg";
import Strategy from "../assets/strategy.jpg";

const steps = [
  {
    id: 1,
    number: "01/",
    title: "Design with guts.",
    img: design,
    description:
      "Immersive experiences that wow while working hard; and tugs at heartstrings; just enough to move your audience to act.",
  },
  {
    id: 2,
    number: "02/",
    title: "Strategy creativity.",
    img: Strategy,
    description:
      "Taking the road less travelled, but with sharp strategy and standout creativity; ensuring that your brand gets the spotlight it deserves.",
  },
  {
    id: 3,
    number: "03/",
    title: "Build for the future.",
    img: build,
    description:
      "We develop scalable, future-ready solutions designed to grow with your brand and adapt to an ever-changing digital landscape.",
  },
];

const Strategically = () => {
  const [activeId, setActiveId] = useState(null);
  const containerRefs = useRef({});
  const imgRefs = useRef({});
  const borderRefs = useRef({});
  const descRefs = useRef({});
  const titleRefs = useRef({});
  const mousePos = useRef({ x: 0, y: 0 });

  // Animate in
  const animateIn = (id) => {
    gsap.to(imgRefs.current[id], {
      autoAlpha: 1,
      scale: 1,
      duration: 0.4,
      ease: "power3.in",
    });

    gsap.to(borderRefs.current[id], {
      backgroundImage: "linear-gradient(to right, #a855f7, #3b82f6)",
      duration: 0.5,
    });

    gsap.to(descRefs.current[id], {
      autoAlpha: 1,
      y: 0,
      duration: 0.5,
      ease: "power3.out",
    });

    gsap.to(titleRefs.current[id], {
      autoAlpha: 1,
      duration: 0.5,
      opacity: 1,
      ease: "power3.out",
    });
  };

  // Animate out
  const animateOut = (id) => {
    gsap.to(titleRefs.current[id], {
      autoAlpha: 0.6,
      duration: 0.5,
      opacity: 0.6,
      ease: "power3.out",
    });

    gsap.to(imgRefs.current[id], {
      autoAlpha: 0,
      top: 1,
      scale: 0.75,
      duration: 0.4,
      ease: "power3.out",
    });

    gsap.to(borderRefs.current[id], {
      backgroundImage: "linear-gradient(to right, black, black)",
      duration: 0.5,
    });

    gsap.to(descRefs.current[id], {
      autoAlpha: 0,
      y: 20,
      duration: 0.4,
    });
  };

  const handleMouseMove = (e, id) => {
    const rect = containerRefs.current[id].getBoundingClientRect();
    mousePos.current.x = e.clientX - rect.left - rect.width / 2;
    mousePos.current.y = e.clientY - rect.top - rect.height / 1;
  };

  // Move image with cursor (desktop only)
  useEffect(() => {
    const update = () => {
      if (activeId && window.innerWidth > 768) {
        gsap.to(imgRefs.current[activeId], {
          x: mousePos.current.x,
          y: mousePos.current.y,
          duration: 0.3,
          ease: "power1.inOut",
        });
      }
    };
    gsap.ticker.add(update);
    return () => gsap.ticker.remove(update);
  }, [activeId]);

  // Intersection Observer — detect element closest to center
  useEffect(() => {
    const handleScroll = () => {
      let closestId = null;
      let closestDistance = Infinity;

      Object.entries(containerRefs.current).forEach(([id, el]) => {
        if (el) {
          const rect = el.getBoundingClientRect();
          const elCenter = rect.top + rect.height / 2;
          const screenCenter = window.innerHeight / 2;
          const distance = Math.abs(elCenter - screenCenter);

          if (distance < closestDistance) {
            closestDistance = distance;
            closestId = Number(id);
          }
        }
      });

      if (closestId !== activeId) {
        if (activeId !== null) animateOut(activeId);
        setActiveId(closestId);
        animateIn(closestId);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Trigger once on load

    return () => window.removeEventListener("scroll", handleScroll);
  }, [activeId]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-20 md:py-40 px-4 sm:px-6 md:px-10 lg:px-20 bg-transparent">
      {/* Header */}
      <div className="max-w-6xl mx-auto my-20 md:my-40">
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[110px] font-space-poppins text-center leading-[1.1] md:leading-[110px] tracking-tighter text-gray-900">
          Brand-led, Strategically built, Engineered for Impact.
        </h1>
      </div>

      {/* Steps */}
      <div className="w-full mx-auto px-4 sm:px-6 md:px-10 lg:px-16">
        <ul>
          {steps.map((step) => (
            <li
              key={step.id}
              data-id={step.id}
              ref={(el) => (containerRefs.current[step.id] = el)}
              className="relative flex flex-col lg:flex-row items-start lg:items-center justify-between h-auto lg:h-[400px] p-6 lg:p-10 border-b border-gray-300 overflow-visible"
              onMouseMove={(e) => handleMouseMove(e, step.id)}
            >
              {/* Number */}
              <div className="absolute top-4 left-4 lg:top-6 lg:left-6 z-30">
                <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-mono text-gray-600">
                  {step.number}
                </p>
              </div>

              {/* Title */}
              <div
                ref={(el) => (titleRefs.current[step.id] = el)}
                className="flex-1 mt-12 lg:mt-0 lg:max-w-2xl xl:max-w-3xl z-20"
              >
                <h2 className="text-4xl mb-2 sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-[120px] font-medium text-black opacity-70 hover:opacity-100 tracking-tighter font-space-poppins">
                  {step.title}
                </h2>
              </div>

              {/* Floating Image */}
              {/* <div
                ref={(el) => (imgRefs.current[step.id] = el)}
                className="absolute top-1/2 left-1/2 z-10 opacity-0 scale-95 pointer-events-none w-[200px] h-[200px] sm:w-[250px] sm:h-[250px] md:w-[300px] md:h-[300px] lg:h-[500px] lg:w-[500px]"
                style={{ transform: "translate(-50%, -50%)" }}
              >
                <img
                  src={step.img}
                  alt="creative"
                  className="w-full h-full object-cover shadow-2xl rounded-lg"
                />
              </div> */}
              <div
                ref={(el) => (imgRefs.current[step.id] = el)}
                //               className="
                //   md:absolute
                //   md:top-1/2
                //   md:left-1/2
                //   md:transform
                //   md:-translate-x-1/2
                //   md:-translate-y-1/2
                //   z-10
                //   opacity-0
                //   scale-95
                //   pointer-events-none
                //   w-full
                //   md:w-[300px]
                //   md:h-[300px]
                //   lg:w-[400px]
                //   lg:h-[400px]
                //   h-auto
                //   mb-6
                // "
                className="md:absolute md:top-1/2 md:left-1/2 z-10 opacity-0 scale-95 pointer-events-none w-auto h-auto sm:w-[250px] sm:h-[250px] md:w-[300px] md:h-[300px] lg:h-[500px] lg:w-[500px]"
              >
                <img
                  src={step.img}
                  alt="creative"
                  className="w-full h-full object-cover shadow-2xl rounded-lg"
                />
              </div>

              {/* Description */}
              <div
                ref={(el) => (descRefs.current[step.id] = el)}
                className="mt-6 lg:mt-0 lg:max-w-md opacity-0 translate-y-4 z-20"
              >
                <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-medium leading-tight tracking-tight text-black">
                  {step.description}
                </p>
              </div>

              {/* Border */}
              <div
                ref={(el) => (borderRefs.current[step.id] = el)}
                className="absolute bottom-0 left-0 h-0.5 w-full bg-black z-0"
              ></div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Strategically;
