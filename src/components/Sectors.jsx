import React, { useState, useRef, useEffect, useLayoutEffect } from "react";
import { gsap } from "gsap";
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

        // Initial states
        gsap.set(containerRef.current, { yPercent: 50, opacity: 0 });
        gsap.set(sectorRef.current, { yPercent: 0, opacity: 1 });
        gsap.set(arrowRef.current, { rotate: 0 });

        // Animate sector header and arrow out
        tl.to(
          sectorRef.current,
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

        // Animate container in AFTER sector animation completes
        tl.to(
          containerRef.current,
          {
            yPercent: 10,
            opacity: 1,
            duration: 1,
            ease: "power2.out",
          },
          "+=0.2" // This adds a delay after the previous animations complete
        );
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

        // Initial states
        gsap.set(containerRef.current, { y: 100, opacity: 0 });
        gsap.set(sectorRef.current, { y: 0, opacity: 1 });

        // Animate sector header out
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

        // Animate container in AFTER sector animation completes
        tl.to(
          containerRef.current,
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power2.out",
          },
          "+=0.2" // This adds a delay after the previous animation completes
        );
      });

      return () => mm.revert();
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    gsap.set(cardsRef.current, { transformOrigin: "center center" });

    cardsRef.current.forEach((card, index) => {
      if (card) {
        gsap.set(card, {
          zIndex: cards.length - index,
          scale: 1 - index * 0.05,
          y: index * (window.innerWidth < 768 ? 8 : 18),
          rotation: 0,
        });
      }
    });

    if (!hasInitialized.current) {
      gsap.from(cardsRef.current, {
        duration: 1,
        scale: 0.85,
        opacity: 0,
        y: 100,
        stagger: 0.12,
        ease: "back.out(1.8)",
        delay: 0.2,
      });
      hasInitialized.current = true;
    }
  }, [currentIndex]);

  const handleStart = (e) => {
    if (isAnimating) return;
    setIsDragging(true);
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    setStartPos({ x: clientX, y: clientY });
    if (dragTween.current) dragTween.current.kill();
  };

  const handleMove = (e) => {
    if (!isDragging || isAnimating || !cardsRef.current[0]) return;
    e.preventDefault();

    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;

    const deltaX = clientX - startPos.x;
    const deltaY = clientY - startPos.y;

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
      duration: 0.6,
      x: direction * window.innerWidth,
      rotation: direction * 25,
      rotationY: direction * 45,
      opacity: 0,
      ease: "power4.out",
      onComplete: () => {
        setCurrentIndex((prev) => (prev + 1) % cards.length);
        gsap.set(topCard, {
          x: 0,
          y: 0,
          rotation: 0,
          rotationY: 0,
          opacity: 1,
        });
        setIsAnimating(false);
      },
    });

    cardsRef.current.slice(1, 3).forEach((card, index) => {
      if (card) {
        gsap.to(card, {
          duration: 0.5,
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
      duration: 0.6,
      x: 0,
      y: 0,
      rotation: 0,
      scale: 1,
      ease: "elastic.out(1, 0.5)",
    });
  };

  const goToPrevious = () => {
    if (isAnimating) return;
    setIsAnimating(true);

    gsap.to(cardsRef.current, {
      duration: 0.4,
      y: (i) => i * (window.innerWidth < 768 ? 8 : 18) + 40,
      scale: (i) => (1 - i * 0.05) * 0.9,
      ease: "power2.inOut",
      onComplete: () => {
        setCurrentIndex((prev) => (prev - 1 + cards.length) % cards.length);
        setTimeout(() => {
          gsap.to(cardsRef.current, {
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
      className="bg-black min-h-screen py-26 px-4 sm:px-6 md:px-8 lg:px-16  text-white overflow-hidden"
      ref={sectionRef}
    >
      {/* Header Row */}
      <div
        className="flex flex-col md:flex-row items-center md:items-end justify-between mb-8 md:mb-0 p-20"
        ref={sectorRef}
      >
        <div className="w-full md:w-auto text-center md:text-left">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[5rem] xl:text-[10rem] uppercase font-space-poppins leading-tight md:text-right">
            Sectors
          </h1>
          <p className="uppercase tracking-widest text-gray-400 text-[clamp(0.8rem,2vw,1.2rem)]">
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
        className="relative mx-auto max-w-4xl lg:max-w-[1600px] lg:w-[80%] h-[420px] sm:h-[480px] md:h-[540px] lg:h-[700px] cursor-grab active:cursor-grabbing "
        onMouseDown={handleStart}
        onMouseMove={handleMove}
        onMouseUp={handleEnd}
        onMouseLeave={handleEnd}
        onTouchStart={handleStart}
        onTouchMove={handleMove}
        onTouchEnd={handleEnd}
      >
        {getVisibleCards().map((card, index) => (
          <div
            key={`${card.originalIndex}-${currentIndex}`}
            ref={(el) => (cardsRef.current[index] = el)}
            className={`absolute inset-0 rounded-2xl md:rounded-tr-[200px] max-w-400 border border-gray-700 overflow-hidden  `}
            style={{ transformStyle: "preserve-3d" }}
          >
            <div
              className={`flex flex-col sm:flex-row h-full rounded-tr-[120px] ${card.leftColor}`}
            >
              <div className="flex-1 p-6 md:p-10 flex flex-col justify-between">
                <h3 className="text-[clamp(1.2rem,2vw,3rem)] font-bold mb-2 font-space-Libertinus">
                  {card.title}
                </h3>
                <div>
                  <div
                    className={`text-[clamp(2rem,5vw,5rem)] font-bold ${card.textColor} mb-2`}
                  >
                    {card.stat}
                  </div>
                  <p className="text-gray-300 text-[clamp(0.9rem,1.5vw,1.8rem)]">
                    {card.description}
                  </p>
                </div>
              </div>
              <div
                className={`w-full sm:w-1/2 h-40 sm:h-full ${card.rightColor}`}
              >
                <img
                  src={card.img}
                  alt={card.title}
                  className={` object-cover rounded-tr-[200px] ${
                    card.title === "OTHER BUSINESSES"
                      ? "h-[100%]"
                      : "w-full h-full"
                  }`}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Buttons */}
      <div className="flex justify-center gap-4 mt-40 lg:w-[80%] mx-auto">
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
