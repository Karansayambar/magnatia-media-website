import React, { useState, useRef, useEffect, useLayoutEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger"; // ✅ add
import placeholderImg from "../assets/creative-web-design.webp";
import { HiOutlineArrowSmallLeft } from "react-icons/hi2";
import healthCare from "../assets/healthcare.webp";
import fitness from "../assets/fitness.webp";
import education from "../assets/education.webp";
import entertainment from "../assets/entertainment.webp";
import ecommerce from "../assets/ecommerce.webp";
import transportation from "../assets/transportation.webp";
import hospitality from "../assets/hospitality.webp";
import other from "../assets/other.webp";

gsap.registerPlugin(ScrollTrigger); // ✅ add

const SwipeCardCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });
  const [isAnimating, setIsAnimating] = useState(false);
  const containerRef = useRef(null);
  const cardsRef = useRef([]);
  const dragTween = useRef(null);

  const cards = [
    {
      title: "HEALTHCARE",
      stat: "11%",
      description:
        "Healthcare systems can unlock an 11% compound annual growth rate in revenue from 2023 to 2027 by leveraging social media for enhanced patient engagement and efficient communication.",
      leftColor: "bg-purple-900",
      rightColor: "bg-black",
      textColor: "text-purple-300",
      img: healthCare,
    },
    {
      title: "FITNESS",
      stat: "81%",
      description:
        "of Millennials exercise, compared to only 61% of Boomers. Similarly, 86% of Gen Z either exercise regularly. These demographics are highly active on social media, making it a crucial platform for fitness brands to engage with them.",
      leftColor: "bg-blue-900",
      rightColor: "bg-black",
      textColor: "text-blue-300",
      img: fitness,
    },
    {
      title: "EDUCATION",
      stat: "97%",
      description:
        "of teens online daily, spending an average of 147 minutes on YouTube, TikTok, Instagram, and Snapchat, education must meet students where they are most active and engaged.",
      leftColor: "bg-emerald-900",
      rightColor: "bg-black",
      textColor: "text-emerald-300",
      img: education,
    },
    {
      title: "ENTERTAINMENT",
      stat: "47%",
      description:
        "Nearly half of Gen Z and a third of millennials prefer social media videos over traditional media, making platforms like YouTube, with over 2.5 billion users, essential for engaging younger audiences.",
      leftColor: "bg-orange-900",
      rightColor: "bg-black",
      textColor: "text-orange-300",
      img: entertainment,
    },
    {
      title: "HOSPITALITY",
      stat: "60%",
      description:
        "With over 60% of travelers using social media to plan trips and posts with location tags seeing 79% more engagement, social media boosts visibility and engagement for the hospitality industry ",
      leftColor: "bg-orange-900",
      rightColor: "bg-black",
      textColor: "text-orange-300",
      img: hospitality,
    },
    {
      title: "ECOMMERCE",
      stat: "11%",
      description:
        "With social media driving 11% of e-commerce sales and significantly reducing marketing costs, e-commerce businesses must leverage these platforms to maximize growth and customer engagement.",
      leftColor: "bg-red-900",
      rightColor: "bg-black",
      textColor: "text-red-300",
      img: ecommerce,
    },
    {
      title: "TRANSPORTATION",
      stat: "32%",
      description:
        "With social media driving a 32% increase in sales leads and significantly enhancing customer engagement, the transportation industry must leverage these platforms to boost growth and stay competitive.",
      leftColor: "bg-amber-900",
      rightColor: "bg-black",
      textColor: "text-amber-300",
      img: transportation,
    },
    {
      title: "OTHER BUSINESSES",
      stat: "11%",
      description:
        "With social media driving 11% of e-commerce sales and significantly reducing marketing costs, e-commerce businesses must leverage these platforms to maximize growth and customer engagement.",
      leftColor: "bg-amber-900",
      rightColor: "bg-black",
      textColor: "text-amber-300",
      img: other,
    },
  ];

  const hasInitialized = useRef(false);
  const sectionRef = useRef(null);
  const sectorRef = useRef(null);
  const arrowRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // mm.add("(min-width: 768px)", () => {
      //   const tl = gsap.timeline({
      //     scrollTrigger: {
      //       trigger: sectionRef.current,
      //       start: "top top",
      //       end: "+=3500",
      //       scrub: true,
      //       pin: true,
      //       anticipatePin: 1,
      //     },
      //   });

      //   gsap.set(containerRef.current, { y: 50, opacity: 0 });
      //   gsap.set(sectorRef.current, { y: 0, opacity: 1 });
      //   gsap.set(arrowRef.current, { rotate: 0 });

      //   tl.to(
      //     sectorRef.current,
      //     {
      //       y: 50,
      //       duration: 1,
      //       opacity: 0,
      //       display: "none",
      //       ease: "power1.inOut",
      //     },
      //     "start"
      //   );

      //   tl.to(
      //     arrowRef.current,
      //     {
      //       rotate: -90,
      //       duration: 1,
      //       ease: "power1.inOut",
      //     },
      //     "start"
      //   );

      //   tl.to(
      //     containerRef.current,
      //     {
      //       y: 0,
      //       opacity: 1,
      //       duration: 1,
      //       ease: "power2.out",
      //     },
      //     "+=0.2"
      //   );
      // });

      mm.add("(max-width: 767px)", () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "+=2000",
            scrub: true, // ✅ smoother than 0.5
            pin: true,
            anticipatePin: 1, // ✅ reduces pin-jump
          },
        });

        gsap.set(containerRef.current, { y: 100, opacity: 0 });
        gsap.set(sectorRef.current, { y: 0, opacity: 1 });

        tl.to(
          sectorRef.current,
          {
            y: 100,
            opacity: 0,
            duration: 0.8,
            ease: "power2.inOut",
          },
          "start"
        );

        tl.to(
          containerRef.current,
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power2.out",
          },
          "+=0.2"
        );
      });

      return () => mm.revert();
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // ✅ Pre-position & stack cards BEFORE paint; stable each index change
  useLayoutEffect(() => {
    const cardsEls = cardsRef.current.filter(Boolean);

    // ensure 3D looks stable
    gsap.set(cardsEls, {
      transformOrigin: "center center",
      willChange: "transform",
    });

    cardsEls.forEach((card, i) => {
      gsap.set(card, {
        zIndex: 3 - i, // top-most card highest z-index
        scale: 1 - i * 0.05,
        x: 0,
        y: i * (window.innerWidth < 768 ? 8 : 18),
        rotation: 0,
        rotationX: 0,
        rotationY: 0,
        opacity: 1,
      });
    });

    if (!hasInitialized.current) {
      gsap.from(cardsEls, {
        duration: 0.8,
        scale: 0.92,
        opacity: 0,
        y: 80,
        stagger: 0.1,
        ease: "back.out(1.6)",
        delay: 0.05,
      });
      hasInitialized.current = true;
    }
  }, [currentIndex]);

  const handleStart = (e) => {
    if (isAnimating) return;
    setIsDragging(true);
    const touch = e.touches ? e.touches[0] : e;
    setStartPos({ x: touch.clientX, y: touch.clientY });
    if (dragTween.current) dragTween.current.kill();
  };

  const handleMove = (e) => {
    if (!isDragging || isAnimating || !cardsRef.current[0]) return;
    e.preventDefault();

    const touch = e.touches ? e.touches[0] : e;
    const deltaX = touch.clientX - startPos.x;
    const deltaY = touch.clientY - startPos.y;

    const maxDrag = window.innerWidth < 768 ? 140 : 260;
    const limitedDeltaX = Math.max(-maxDrag, Math.min(maxDrag, deltaX));
    const limitedDeltaY = Math.max(-maxDrag, Math.min(maxDrag, deltaY));

    const dragProgress = Math.abs(limitedDeltaX) / maxDrag;
    const topCard = cardsRef.current[0];

    gsap.set(topCard, {
      x: limitedDeltaX * 0.8,
      y: limitedDeltaY * 0.3,
      rotation: limitedDeltaX * 0.05,
      rotationX: -limitedDeltaY * 0.1,
      scale: 1 - dragProgress * 0.15,
      force3D: true,
    });
  };

  const handleEnd = () => {
    if (!isDragging || isAnimating || !cardsRef.current[0]) return;
    setIsDragging(false);

    const topCard = cardsRef.current[0];
    const currentX = gsap.getProperty(topCard, "x");
    const threshold = window.innerWidth < 768 ? 60 : 120;

    if (Math.abs(currentX) > threshold) {
      animateSwipeAway(currentX);
    } else {
      animateReturn();
    }
  };

  const animateSwipeAway = (currentX) => {
    if (!cardsRef.current[0]) return;
    setIsAnimating(true);

    const topCard = cardsRef.current[0];
    const direction = currentX > 0 ? 1 : -1;

    gsap.to(topCard, {
      duration: 0.55,
      x: direction * window.innerWidth,
      rotation: direction * 25,
      rotationY: direction * 45,
      opacity: 0,
      ease: "power4.out",
      onComplete: () => {
        // React will render new third card; we reset the old DOM node safely
        gsap.set(topCard, {
          x: 0,
          y: 0,
          rotation: 0,
          rotationY: 0,
          opacity: 1,
          scale: 1,
        });
        setCurrentIndex((prev) => (prev + 1) % cards.length);
        setIsAnimating(false);
      },
    });

    // bring next cards up slightly
    cardsRef.current.slice(1, 3).forEach((card, index) => {
      if (card) {
        gsap.to(card, {
          duration: 0.45,
          scale: 1 - index * 0.05,
          y: index * (window.innerWidth < 768 ? 8 : 18),
          ease: "power2.out",
        });
      }
    });
  };

  const animateReturn = () => {
    const topCard = cardsRef.current[0];
    dragTween.current = gsap.to(topCard, {
      duration: 0.55,
      x: 0,
      y: 0,
      rotation: 0,
      rotationX: 0,
      rotationY: 0,
      scale: 1,
      ease: "elastic.out(1, 0.5)",
      force3D: true,
    });
  };

  const goToPrevious = () => {
    if (isAnimating) return;
    setIsAnimating(true);

    gsap.to(cardsRef.current.filter(Boolean), {
      duration: 0.4,
      y: (i) => i * (window.innerWidth < 768 ? 8 : 18) + 40,
      scale: (i) => (1 - i * 0.05) * 0.9,
      ease: "power2.inOut",
      onComplete: () => {
        setCurrentIndex((prev) => (prev - 1 + cards.length) % cards.length);
        setTimeout(() => {
          gsap.to(cardsRef.current.filter(Boolean), {
            duration: 0.5,
            y: (i) => i * (window.innerWidth < 768 ? 8 : 18),
            scale: (i) => 1 - i * 0.05,
            ease: "back.out(1.8)",
            onComplete: () => setIsAnimating(false),
          });
        }, 80);
      },
    });
  };

  const goToNext = () => {
    if (isAnimating) return;
    animateSwipeAway(window.innerWidth < 768 ? 140 : 260);
  };

  const getVisibleCards = () => {
    return Array.from({ length: Math.min(3, cards.length) }).map((_, i) => {
      const cardIndex = (currentIndex + i) % cards.length;
      return { ...cards[cardIndex], originalIndex: cardIndex, stackIndex: i };
    });
  };

  return (
    <div
      className="bg-black min-h-screen py-26 md:py-10 px-4 sm:px-6 md:px-8 lg:px-16 text-white overflow-hidden "
      ref={sectionRef}
    >
      {/* Header Row */}
      <div
        className="flex flex-col md:flex-row items-center md:items-end justify-between mb-8 md:mb-0 py-10 lg:p-20"
        ref={sectorRef}
      >
        <div className="w-full md:w-auto text-center md:text-left">
          <h1 className="text-6xl sm:text-6xl md:text-6xl lg:text-[5rem] xl:text-[10rem] uppercase font-space-poppins leading-tight md:text-right">
            Sectors
          </h1>
          <p className="uppercase tracking-widest text-gray-400 text-[clamp(0.8rem,2vw,1.4rem)] md:px-4">
            To whom we provide creative solutions!
          </p>
        </div>

        <HiOutlineArrowSmallLeft
          size={60}
          className="mt-4 md:mt-0 md:size-[120px] lg:size-[180px] hidden md:block"
          ref={arrowRef}
        />
      </div>

      <div
        ref={containerRef}
        className="relative mx-auto max-w-5xl h-[500px] cursor-grab active:cursor-grabbing"
        style={{ perspective: 1200 }}
        onMouseDown={handleStart}
        onMouseMove={handleMove}
        onMouseUp={handleEnd}
        onMouseLeave={handleEnd}
        onTouchStart={handleStart}
        onTouchMove={handleMove}
        onTouchEnd={handleEnd}
      >
        {getVisibleCards().map((card, i) => (
          <div
            key={card.key}
            ref={(el) => (cardsRef.current[i] = el)}
            className="absolute inset-0 rounded-tr-[100px] border border-gray-700 overflow-hidden"
            style={{ transformStyle: "preserve-3d" }}
          >
            <div
              className={`flex flex-col sm:flex-row h-full ${card.leftColor}`}
            >
              <div className="flex-1 p-6 flex flex-col justify-between">
                <h3 className="text-2xl md:text-4xl font-bold">{card.title}</h3>
                <div>
                  <div className={`text-5xl font-bold ${card.textColor}`}>
                    {card.stat}
                  </div>
                  <p className="text-gray-300">{card.description}</p>
                </div>
              </div>
              <div className="sm:w-1/2 bg-black flex items-center justify-center">
                <img
                  src={card.img}
                  alt={card.title}
                  className="h-60 w-60 md:w-full md:h-full object-cover rounded-tr-[100px]"
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Buttons */}
      <div className="flex justify-center gap-4 mt-20 lg:w-[80%] mx-auto">
        <button
          onClick={goToPrevious}
          disabled={isAnimating}
          className="px-6 py-3 rounded-full bg-gray-800 hover:bg-gray-700 border border-gray-600 transition-all duration-300 hover:scale-105"
        >
          ← Previous
        </button>
        <button
          onClick={goToNext}
          disabled={isAnimating}
          className="px-6 py-3 rounded-full bg-gray-800 hover:bg-gray-700 border border-gray-600 transition-all duration-300 hover:scale-105"
        >
          Next →
        </button>
      </div>

      {/* Indicators */}
      <div className="flex justify-center mt-6 gap-2 lg:w-[80%] mx-auto">
        {cards.map((_, idx) => (
          <span
            key={idx}
            className={`w-3 h-3 rounded-full transition-all ${
              idx === currentIndex ? "bg-white" : "bg-gray-600"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default SwipeCardCarousel;
