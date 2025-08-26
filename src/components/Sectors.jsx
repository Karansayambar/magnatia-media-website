import React, { useState, useRef, useEffect, useLayoutEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import healthCare from "../assets/healthcare.webp";
import fitness from "../assets/fitness.webp";
import education from "../assets/education.webp";
import entertainment from "../assets/entertainment.webp";
import hospitality from "../assets/hospitality.webp";
import ecommerce from "../assets/ecommerce.webp";
import transportation from "../assets/transportation.webp";
import other from "../assets/other.webp";

gsap.registerPlugin(ScrollTrigger);

const SwipeCardCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });
  const [isAnimating, setIsAnimating] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const containerRef = useRef(null);
  const cardsRef = useRef([]);
  const dragTween = useRef(null);

  const cards = [
    {
      title: "HEALTHCARE",
      stat: "11%",
      description:
        "Healthcare systems can unlock an 11% compound annual growth rate in revenue from 2023 to 2027 by leveraging social media for enhanced patient engagement and efficient communication.",
      leftColor: "bg-gradient-to-br from-purple-600 to-purple-900",
      rightColor: "bg-black",
      textColor: "text-purple-300",
      img: healthCare,
    },
    {
      title: "FITNESS",
      stat: "81%",
      description:
        "of Millennials exercise, compared to only 61% of Boomers. Similarly, 86% of Gen Z either exercise regularly. These demographics are highly active on social media, making it a crucial platform for fitness brands to engage with them.",
      leftColor: "bg-gradient-to-br from-blue-600 to-blue-900",
      rightColor: "bg-black",
      textColor: "text-blue-300",
      img: fitness,
    },
    {
      title: "EDUCATION",
      stat: "97%",
      description:
        "of teens online daily, spending an average of 147 minutes on YouTube, TikTok, Instagram, and Snapchat, education must meet students where they are most active and engaged.",
      leftColor: "bg-gradient-to-br from-emerald-600 to-emerald-900",
      rightColor: "bg-black",
      textColor: "text-emerald-300",
      img: education,
    },
    {
      title: "ENTERTAINMENT",
      stat: "47%",
      description:
        "Nearly half of Gen Z and a third of millennials prefer social media videos over traditional media, making platforms like YouTube, with over 2.5 billion users, essential for engaging younger audiences.",
      leftColor: "bg-gradient-to-br from-orange-600 to-orange-900",
      rightColor: "bg-black",
      textColor: "text-orange-300",
      img: entertainment,
    },
    {
      title: "HOSPITALITY",
      stat: "60%",
      description:
        "With over 60% of travelers using social media to plan trips and posts with location tags seeing 79% more engagement, social media boosts visibility and engagement for the hospitality industry.",
      leftColor: "bg-gradient-to-br from-pink-600 to-pink-900",
      rightColor: "bg-black",
      textColor: "text-pink-300",
      img: hospitality,
    },
    {
      title: "ECOMMERCE",
      stat: "11%",
      description:
        "With social media driving 11% of e-commerce sales and significantly reducing marketing costs, e-commerce businesses must leverage these platforms to maximize growth and customer engagement.",
      leftColor: "bg-gradient-to-br from-red-600 to-red-900",
      rightColor: "bg-black",
      textColor: "text-red-300",
      img: ecommerce,
    },
    {
      title: "TRANSPORTATION",
      stat: "32%",
      description:
        "With social media driving a 32% increase in sales leads and significantly enhancing customer engagement, the transportation industry must leverage these platforms to boost growth and stay competitive.",
      leftColor: "bg-gradient-to-br from-amber-600 to-amber-900",
      rightColor: "bg-black",
      textColor: "text-amber-300",
      img: transportation,
    },
    {
      title: "OTHER BUSINESSES",
      stat: "11%",
      description:
        "With social media driving 11% of e-commerce sales and significantly reducing marketing costs, e-commerce businesses must leverage these platforms to maximize growth and customer engagement.",
      leftColor: "bg-gradient-to-br from-indigo-600 to-indigo-900",
      rightColor: "bg-black",
      textColor: "text-indigo-300",
      img: other,
    },
  ];

  const hasInitialized = useRef(false);
  const sectionRef = useRef(null);
  const sectorRef = useRef(null);
  const arrowRef = useRef(null);

  // Check if mobile on mount and resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // Desktop animations (768px and up)
      mm.add("(min-width: 768px)", () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "+=3500",
            scrub: 1,
            pin: true,
            anticipatePin: 1,
          },
        });

        gsap.set(containerRef.current, { yPercent: 50, opacity: 0 });
        gsap.set(sectorRef.current, { yPercent: 0, opacity: 1 });
        gsap.set(arrowRef.current, { rotate: 0 });

        tl.to(
          sectorRef.current,
          {
            yPercent: -50,
            duration: 1,
            opacity: 0,
            ease: "power2.inOut",
          },
          "start"
        )
          .to(
            arrowRef.current,
            {
              rotate: -90,
              duration: 1,
              ease: "power2.inOut",
            },
            "start"
          )
          .to(
            containerRef.current,
            {
              yPercent: 0,
              opacity: 1,
              duration: 1.2,
              ease: "power3.out",
            },
            "+=0.3"
          );
      });

      // Mobile/Tablet animations (767px and below)
      mm.add("(max-width: 767px)", () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "+=2000",
            scrub: 0.8,
            pin: true,
            anticipatePin: 1,
          },
        });

        gsap.set(containerRef.current, { y: 150, opacity: 0 });
        gsap.set(sectorRef.current, { y: 0, opacity: 1 });

        tl.to(
          sectorRef.current,
          {
            y: -100,
            opacity: 0,
            duration: 1,
            ease: "power2.inOut",
          },
          "start"
        ).to(
          containerRef.current,
          {
            y: 0,
            opacity: 1,
            duration: 1.2,
            ease: "power3.out",
          },
          "+=0.2"
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
        const stackOffset = isMobile ? 4 : 12;
        const scaleOffset = isMobile ? 0.03 : 0.05;

        gsap.set(card, {
          zIndex: cards.length - index,
          scale: 1 - index * scaleOffset,
          y: index * stackOffset,
          x: 0,
          rotation: 0,
        });
      }
    });

    if (!hasInitialized.current) {
      gsap.from(cardsRef.current, {
        duration: 1.2,
        scale: 0.8,
        opacity: 0,
        y: isMobile ? 60 : 100,
        stagger: 0.15,
        ease: "back.out(1.7)",
        delay: 0.3,
      });
      hasInitialized.current = true;
    }
  }, [currentIndex, isMobile]);

  const handleStart = (e) => {
    if (isAnimating) return;
    setIsDragging(true);
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    setStartPos({ x: clientX, y: clientY });
    if (dragTween.current) dragTween.current.kill();

    // Add haptic feedback for mobile
    if (e.touches && window.navigator.vibrate) {
      window.navigator.vibrate(10);
    }
  };

  const handleMove = (e) => {
    if (!isDragging || isAnimating || !cardsRef.current[0]) return;
    e.preventDefault();

    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;

    const deltaX = clientX - startPos.x;
    const deltaY = clientY - startPos.y;

    const maxDrag = isMobile ? 100 : 200;
    const limitedDeltaX = Math.max(-maxDrag, Math.min(maxDrag, deltaX));
    const limitedDeltaY = Math.max(-maxDrag, Math.min(maxDrag, deltaY));

    const dragProgress = Math.abs(limitedDeltaX) / maxDrag;
    const topCard = cardsRef.current[0];

    gsap.set(topCard, {
      x: limitedDeltaX * (isMobile ? 0.9 : 0.8),
      y: limitedDeltaY * (isMobile ? 0.4 : 0.3),
      rotation: limitedDeltaX * (isMobile ? 0.08 : 0.05),
      rotationX: -limitedDeltaY * (isMobile ? 0.15 : 0.1),
      scale: 1 - dragProgress * (isMobile ? 0.1 : 0.15),
    });
  };

  const handleEnd = () => {
    if (!isDragging || isAnimating || !cardsRef.current[0]) return;
    setIsDragging(false);

    const topCard = cardsRef.current[0];
    const currentX = gsap.getProperty(topCard, "x");
    const threshold = isMobile ? 50 : 80;

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
    const exitDistance = window.innerWidth * 1.2;

    // Haptic feedback for successful swipe
    if (window.navigator.vibrate) {
      window.navigator.vibrate(50);
    }

    gsap.to(topCard, {
      duration: isMobile ? 0.5 : 0.6,
      x: direction * exitDistance,
      rotation: direction * (isMobile ? 20 : 25),
      rotationY: direction * (isMobile ? 35 : 45),
      opacity: 0,
      scale: 0.8,
      ease: "power3.out",
      onComplete: () => {
        setCurrentIndex((prev) => (prev + 1) % cards.length);
        gsap.set(topCard, {
          x: 0,
          y: 0,
          rotation: 0,
          rotationY: 0,
          opacity: 1,
          scale: 1,
        });
        setIsAnimating(false);
      },
    });

    // Animate remaining cards
    const stackOffset = isMobile ? 4 : 12;
    const scaleOffset = isMobile ? 0.03 : 0.05;

    cardsRef.current.slice(1, 3).forEach((card, index) => {
      if (card) {
        gsap.to(card, {
          duration: isMobile ? 0.4 : 0.5,
          scale: 1 - index * scaleOffset,
          y: index * stackOffset,
          ease: "power2.out",
        });
      }
    });
  };

  const animateReturn = () => {
    const topCard = cardsRef.current[0];
    dragTween.current = gsap.to(topCard, {
      duration: isMobile ? 0.5 : 0.6,
      x: 0,
      y: 0,
      rotation: 0,
      rotationX: 0,
      scale: 1,
      ease: "elastic.out(1, 0.6)",
    });
  };

  const goToPrevious = () => {
    if (isAnimating) return;
    setIsAnimating(true);

    const stackOffset = isMobile ? 4 : 12;
    const scaleOffset = isMobile ? 0.03 : 0.05;

    gsap.to(cardsRef.current, {
      duration: 0.4,
      y: (i) => i * stackOffset + (isMobile ? 20 : 40),
      scale: (i) => (1 - i * scaleOffset) * 0.9,
      ease: "power2.inOut",
      onComplete: () => {
        setCurrentIndex((prev) => (prev - 1 + cards.length) % cards.length);
        setTimeout(() => {
          gsap.to(cardsRef.current, {
            duration: 0.5,
            y: (i) => i * stackOffset,
            scale: (i) => 1 - i * scaleOffset,
            ease: "back.out(1.8)",
            onComplete: () => setIsAnimating(false),
          });
        }, 80);
      },
    });
  };

  const goToNext = () => {
    if (isAnimating) return;
    animateSwipeAway(isMobile ? 100 : 200);
  };

  const getVisibleCards = () => {
    return Array.from({ length: Math.min(3, cards.length) }).map((_, i) => {
      const cardIndex = (currentIndex + i) % cards.length;
      return { ...cards[cardIndex], originalIndex: cardIndex, stackIndex: i };
    });
  };

  return (
    <div
      className="bg-black min-h-screen text-white overflow-hidden relative"
      ref={sectionRef}
    >
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-900"></div>
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      {/* Header Section */}
      <div
        className="relative z-10 flex flex-col lg:flex-row items-center lg:items-end justify-between px-4 sm:px-6 lg:px-20 pt-16 lg:pt-20 pb-8 lg:pb-0"
        ref={sectorRef}
      >
        <div className="text-center lg:text-left">
          <h1 className="text-4xl sm:text-6xl lg:text-8xl xl:text-[10rem] uppercase font-bold leading-tight lg:text-right mb-2 lg:mb-0">
            Sectors
          </h1>
          <p className="uppercase tracking-wider text-gray-400 text-sm sm:text-lg lg:text-xl max-w-md mx-auto lg:mx-0">
            To whom we provide creative solutions!
          </p>
        </div>

        <div ref={arrowRef} className="hidden lg:block mt-4 lg:mt-0">
          <svg
            width="120"
            height="120"
            viewBox="0 0 24 24"
            fill="none"
            className="text-white lg:w-32 lg:h-32 xl:w-40 xl:h-40"
          >
            <path
              d="M20 12H4M4 12L10 18M4 12L10 6"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>

      {/* Cards Container */}
      <div
        ref={containerRef}
        className={`
          relative mx-auto px-4 sm:px-6 lg:px-8 z-10
          ${
            isMobile
              ? "max-w-sm h-[500px] touch-pan-y"
              : "max-w-3xl lg:max-w-[70%] xl:max-w-[70%] h-[400px] sm:h-[500px] lg:h-[700px] xl:h-[800px]"
          }
          cursor-grab active:cursor-grabbing select-none
        `}
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
            className={`
              absolute inset-0 border border-gray-700 overflow-hidden shadow-2xl
              ${
                isMobile
                  ? "rounded-xl"
                  : "rounded-2xl lg:rounded-tr-[100px] xl:rounded-tr-[200px]"
              }
            `}
            style={{ transformStyle: "preserve-3d" }}
          >
            <div
              className={`
                h-full ${card.leftColor}
                ${
                  isMobile
                    ? "flex flex-col rounded-xl"
                    : "flex flex-col sm:flex-row rounded-2xl lg:rounded-tr-[100px] xl:rounded-tr-[200px]"
                }
              `}
            >
              {/* Content Section */}
              <div
                className={`
                flex flex-col justify-between p-4 sm:p-6 lg:p-8 xl:p-10
                ${isMobile ? "flex-1 min-h-0" : "flex-1"}
              `}
              >
                <div>
                  <h3
                    className={`
                    font-bold mb-2 lg:mb-4 text-white
                    ${
                      isMobile
                        ? "text-lg sm:text-3xl"
                        : "text-xl sm:text-2xl lg:text-3xl xl:text-4xl"
                    }
                  `}
                  >
                    {card.title}
                  </h3>
                </div>
                <div>
                  <div
                    className={`
                    font-bold ${card.textColor} mb-2 lg:mb-4
                    ${
                      isMobile
                        ? "text-2xl sm:text-3xl"
                        : "text-3xl sm:text-4xl lg:text-5xl xl:text-6xl"
                    }
                  `}
                  >
                    {card.stat}
                  </div>
                  <p
                    className={`
                  text-gray-200 leading-relaxed
                  ${
                    isMobile
                      ? "text-sm line-clamp-4"
                      : "text-sm sm:text-base lg:text-3xl line-clamp-5 lg:line-clamp-none"
                  }
                `}
                  >
                    {card.description}
                  </p>
                </div>
              </div>

              {/* Image Section */}
              <div
                className={`
                ${card.rightColor}
                ${
                  isMobile
                    ? "h-70 flex-shrink-0"
                    : "w-full sm:w-1/2 h-48 sm:h-full"
                }
              `}
              >
                <img
                  src={card.img}
                  alt={card.title}
                  className={`
                    w-full h-full object-cover
                    ${
                      isMobile
                        ? "rounded-b-xl"
                        : "rounded-b-2xl sm:rounded-b-none sm:rounded-r-2xl lg:rounded-tr-[100px] xl:rounded-tr-[200px]"
                    }
                  `}
                  draggable={false}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Buttons */}
      <div
        className={`
        flex justify-center gap-3 sm:gap-4 mt-12 sm:mt-16 lg:mt-20 px-4
        ${isMobile ? "mb-6" : "mb-8 lg:mb-0"}
      `}
      >
        <button
          onClick={goToPrevious}
          disabled={isAnimating}
          className={`
            px-4 py-2 sm:px-6 sm:py-3 rounded-full 
            bg-gray-800/80 backdrop-blur-sm hover:bg-gray-700/80 
            border border-gray-600/50 transition-all duration-300 
            hover:scale-105 active:scale-95 text-white font-medium
            disabled:opacity-50 disabled:cursor-not-allowed
            ${isMobile ? "text-sm" : "text-base"}
          `}
        >
          <span className="mr-2">←</span>
          <span className={isMobile ? "hidden" : "inline"}>Previous</span>
          <span className={isMobile ? "inline" : "hidden"}>Prev</span>
        </button>
        <button
          onClick={goToNext}
          disabled={isAnimating}
          className={`
            px-4 py-2 sm:px-6 sm:py-3 rounded-full 
            bg-gray-800/80 backdrop-blur-sm hover:bg-gray-700/80 
            border border-gray-600/50 transition-all duration-300 
            hover:scale-105 active:scale-95 text-white font-medium
            disabled:opacity-50 disabled:cursor-not-allowed
            ${isMobile ? "text-sm" : "text-base"}
          `}
        >
          <span className={isMobile ? "hidden" : "inline"}>Next</span>
          <span className={isMobile ? "inline" : "hidden"}>Next</span>
          <span className="ml-2">→</span>
        </button>
      </div>

      {/* Indicators */}
      <div
        className={`
        flex justify-center gap-2 px-4
        ${isMobile ? "mt-4 mb-8" : "mt-6 mb-12"}
      `}
      >
        {cards.map((_, idx) => (
          <button
            key={idx}
            onClick={() => {
              if (!isAnimating) {
                setCurrentIndex(idx);
              }
            }}
            className={`
              ${isMobile ? "w-2 h-2" : "w-3 h-3"} 
              rounded-full transition-all duration-300 
              ${
                idx === currentIndex
                  ? "bg-white scale-125"
                  : "bg-gray-600 hover:bg-gray-400"
              }
            `}
          />
        ))}
      </div>

      {/* Swipe Instruction (Mobile Only) */}
      {isMobile && (
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-20">
          <div className="bg-gray-800/90 backdrop-blur-sm px-3 py-2 rounded-full text-xs text-gray-300 flex items-center space-x-2 animate-bounce">
            <span>👆</span>
            <span>Swipe cards to explore</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default SwipeCardCarousel;
