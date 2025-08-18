import React, { useRef, useLayoutEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { BiRightArrowAlt } from "react-icons/bi";
import { HiOutlineArrowSmallLeft } from "react-icons/hi2";
import video from "../assets/homepage.mp4";
import "../index.css";

gsap.registerPlugin(ScrollTrigger);

const cardsData = [
  {
    title: "Web design & development",
    services: [
      "Creative Web Design",
      "Web Development",
      "E-Commerce",
      "WordPress",
    ],
    desc: "Crafting digital experiences where beauty meets ROI, turning heads and unlocking revenue potential with every click.",
    video: video,
  },
  {
    title: "Mobile App Development",
    services: ["iOS Apps", "Android Apps", "Cross-Platform", "UI/UX Design"],
    desc: "Building mobile solutions that captivate, engage, and convert your audience on the go.",
    video: video,
  },
  {
    title: "Branding",
    services: [
      "Logo Design",
      "Brand Identity",
      "Marketing Strategy",
      "Content Creation",
    ],
    desc: "We craft brands that stand out, resonate, and build loyalty through meaningful connections.",
    video: video,
  },
];

const Services = () => {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);
  const servicesRef = useRef(null);
  const arrowRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add("(min-width: 768px)", () => {
        // Desktop animations
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "+=3500",
            scrub: true,
            pin: true,
            anticipatePin: 1,
          },
        });

        gsap.set(cardsRef.current, { yPercent: 50, opacity: 0 });
        gsap.set(servicesRef.current, { yPercent: 0, opacity: 1 });
        gsap.set(arrowRef.current, { rotate: 0 });

        tl.to(
          servicesRef.current,
          {
            yPercent: 50,
            duration: 1,
            opacity: 0,
            display: "none",
            ease: "power1.inOut",
          },
          "start"
        );

        tl.to(
          arrowRef.current,
          {
            rotate: -90,
            duration: 1,
            ease: "power1.inOut",
          },
          "start"
        );

        cardsRef.current.forEach((card, i) => {
          tl.to(
            card,
            {
              yPercent: 0,
              opacity: 1,
              zIndex: i + 2,
              duration: 1,
            },
            "+=0.2"
          );

          if (i < cardsRef.current.length - 1) {
            tl.to(card, {
              opacity: 1,
              duration: 1,
            });
          }
        });
      });

      mm.add("(max-width: 767px)", () => {
        // Mobile animations (simplified)
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "+=2500",
            scrub: 0.5,
            pin: true,
          },
        });

        gsap.set(cardsRef.current, { y: 100, opacity: 0 });
        gsap.set(servicesRef.current, { y: 0, opacity: 1 });

        tl.to(
          servicesRef.current,
          {
            y: 100,
            opacity: 0,
            duration: 0.8,
            ease: "power2.inOut",
          },
          "start"
        );

        cardsRef.current.forEach((card, i) => {
          tl.to(
            card,
            {
              y: 0,
              opacity: 1,
              duration: 0.8,
              ease: "power2.out",
            },
            i === 0 ? "start+=0.5" : `+=${i * 0.3}`
          );
        });
      });

      return () => mm.revert();
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative h-[150vh] md:h-screen bg-transparent overflow-hidden px-4 sm:px-6 md:px-10 lg:px-20 py-10 md:py-20"
    >
      {/* Header Row */}
      <div
        className="flex flex-col md:flex-row items-center md:items-end justify-between mb-8 md:mb-0"
        ref={servicesRef}
      >
        <div className="w-full md:w-auto text-center md:text-left">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[5rem] xl:text-[10rem] uppercase font-space-poppins leading-tight">
            our
          </h1>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[5rem] xl:text-[10rem] uppercase font-space-poppins leading-tight md:text-right">
            services
          </h1>
        </div>

        <HiOutlineArrowSmallLeft
          size={60}
          className="mt-4 md:mt-0 md:size-[120px] lg:size-[180px] hidden md:block"
          ref={arrowRef}
        />
      </div>

      {/* Cards Container */}
      <div className="relative w-full h-[70%] md:h-full mt-10 md:mt-0">
        {cardsData.map((card, index) => (
          <div
            key={index}
            ref={(el) => (cardsRef.current[index] = el)}
            className="absolute flex flex-col lg:flex-row top-0 left-1/2 transform -translate-x-1/2 w-full md:w-[90%] h-auto md:min-h-[40px] bg-gray-100 
            rounded-2xl md:rounded-3xl lg:rounded-[3.5rem] overflow-hidden z-10 shadow-lg"
          >
            {/* Text Section */}
            <div className="flex-1 p-6 sm:p-8 md:p-10 lg:p-20 order-2 lg:order-1">
              <p className="text-2xl sm:text-3xl md:text-4xl lg:text-[3.5rem] xl:text-[110px] mb-4 sm:mb-6 md:mb-8 font-space-montserrat font-light leading-tight">
                {card.title}
              </p>
              <div className="flex gap-2 sm:gap-3 md:gap-4 flex-wrap mb-4 md:mb-6">
                {card.services.map((srv, i) => (
                  <span
                    key={i}
                    className="border border-gray-400 px-2 py-1 sm:px-3 sm:py-1 md:p-2 rounded-lg md:rounded-xl text-xs sm:text-sm md:text-md"
                  >
                    {srv}
                  </span>
                ))}
              </div>
              <p className="mb-4 text-sm sm:text-base md:text-xl py-2 sm:py-3 md:py-5">
                {card.desc}
              </p>
              <button className="text-black px-3 py-1 sm:px-4 sm:py-2 border rounded-xl md:rounded-2xl flex items-center gap-1 sm:gap-2 hover:bg-gray-900 hover:text-white transition-colors duration-300 text-sm sm:text-base">
                <span>Find out more</span>
                <BiRightArrowAlt size={20} className="hidden sm:block" />
              </button>
            </div>

            {/* Video Section */}
            <div className="flex-1 flex items-center justify-center p-4 sm:p-6 md:p-10 order-1 lg:order-2">
              <video
                src={card.video}
                autoPlay
                loop
                muted
                playsInline
                className="rounded-lg md:rounded-xl lg:rounded-tr-[5rem] xl:rounded-tr-[10rem] object-cover w-full h-[200px] sm:h-[250px] md:h-[300px] lg:h-full"
              ></video>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Services;
