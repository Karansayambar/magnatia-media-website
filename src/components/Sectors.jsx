import React, { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import placeholderImg from "../assets/creative-web-design.webp";

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
      title: "ISI GLOBAL",
      stat: "104.9%",
      description: "Increase in organic visits after 1 month",
      color: "bg-purple-700",
      textColor: "text-purple-600",
      img: placeholderImg,
    },
    {
      title: "DIGITAL MARKETING",
      stat: "87.3%",
      description: "Increase in conversion rates",
      color: "bg-blue-700",
      textColor: "text-blue-600",
      img: placeholderImg,
    },
    {
      title: "BRANDING SOLUTIONS",
      stat: "62.5%",
      description: "Higher brand recognition",
      color: "bg-emerald-700",
      textColor: "text-emerald-600",
      img: placeholderImg,
    },
    {
      title: "WEB DEVELOPMENT",
      stat: "95.2%",
      description: "Client satisfaction rate",
      color: "bg-orange-700",
      textColor: "text-orange-600",
      img: placeholderImg,
    },
  ];

  const hasInitialized = useRef(false);

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
    <div className="bg-black min-h-screen py-16 px-4 sm:px-6 md:px-8 lg:px-16 text-white">
      <div className="mx-auto max-w-6xl text-center mb-12 lg:w-[80%]">
        <h1 className="text-[clamp(2rem,6vw,5rem)] font-bold mb-4">Sectors</h1>
        <p className="uppercase tracking-widest text-gray-400 text-[clamp(0.8rem,2vw,1.2rem)]">
          To whom we provide creative solutions!
        </p>
      </div>

      <div
        ref={containerRef}
        className="relative mx-auto max-w-4xl lg:max-w-[1600px] lg:w-[80%] h-[420px] sm:h-[480px] md:h-[540px] lg:h-[600px] cursor-grab active:cursor-grabbing"
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
            className={`absolute inset-0 rounded-2xl md:rounded-3xl rounded-tr-[120px] border border-gray-700 overflow-hidden ${card.color}`}
            style={{ transformStyle: "preserve-3d" }}
          >
            <div className="flex flex-col sm:flex-row h-full">
              <div className="flex-1 p-6 md:p-10 flex flex-col justify-between">
                <h3 className="text-[clamp(1.2rem,2vw,2rem)] font-bold mb-2">
                  {card.title}
                </h3>
                <div>
                  <div
                    className={`text-[clamp(2rem,5vw,5rem)] font-bold ${card.textColor} mb-2`}
                  >
                    {card.stat}
                  </div>
                  <p className="text-gray-300 text-[clamp(0.9rem,1.5vw,1.1rem)]">
                    {card.description}
                  </p>
                </div>
              </div>
              <div className="w-full sm:w-1/2 h-40 sm:h-full">
                <img
                  src={card.img}
                  alt={card.title}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Buttons */}
      <div className="flex justify-center gap-4 mt-10 lg:w-[80%] mx-auto">
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
