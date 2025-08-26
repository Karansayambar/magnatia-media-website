import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useNavigate } from "react-router-dom";
import { articles } from "../utils/articles";

gsap.registerPlugin(ScrollTrigger);

const Blogs = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const cardsRef = useRef([]);
  const [articleData, setArticleData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setArticleData(articles);
    const ctx = gsap.context(() => {
      // Initial setup - hide elements
      gsap.set([titleRef.current, subtitleRef.current], {
        opacity: 0,
        y: 60,
      });
      gsap.set(cardsRef.current, {
        opacity: 0,
        y: 80,
        scale: 0.9,
      });

      // Create timeline for section entrance
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 100%",
          end: "bottom 0%",
          toggleActions: "play none none reverse",
        },
      });

      // Animate title
      tl.to(titleRef.current, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
      })
        // Animate subtitle
        .to(
          subtitleRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
          },
          "-=0.5"
        )
        // Stagger card animations
        .to(
          cardsRef.current,
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            stagger: 0.2,
            ease: "back.out(1.7)",
          },
          "-=0.3"
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleCardHover = (index, isEntering) => {
    const card = cardsRef.current[index];
    const image = card.querySelector(".blog-image");
    const readMoreBtn = card.querySelector(".read-more-btn");
    const category = card.querySelector(".category-badge");

    if (isEntering) {
      gsap.to(card, {
        y: -10,
        duration: 0.4,
        ease: "power2.out",
      });
      gsap.to(image, {
        scale: 1.05,
        duration: 0.6,
        ease: "power2.out",
      });
      gsap.to(readMoreBtn, {
        backgroundColor: "#1e40af",
        scale: 1.05,
        duration: 0.3,
      });
      gsap.to(category, {
        backgroundColor: "#3b82f6",
        duration: 0.3,
      });
    } else {
      gsap.to(card, {
        y: 0,
        duration: 0.4,
        ease: "power2.out",
      });
      gsap.to(image, {
        scale: 1,
        duration: 0.6,
        ease: "power2.out",
      });
      gsap.to(readMoreBtn, {
        backgroundColor: "#2563eb",
        scale: 1,
        duration: 0.3,
      });
      gsap.to(category, {
        backgroundColor: "#6366f1",
        duration: 0.3,
      });
    }
  };

  const handleReadMore = (articleId) => {
    console.log(`Navigate to article ${articleId}`);
    // Replace with your navigation logic
    navigate(`/blog-details/${articleId}`);
  };

  return (
    <section
      ref={sectionRef}
      className="relative py-12 sm:py-16 lg:py-24 bg-gradient-to-br h-full from-slate-50 via-white to-blue-50 overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute inset-0">
        <div className="absolute top-10 sm:top-20 left-5 sm:left-10 w-40 sm:w-72 h-40 sm:h-72 bg-blue-100 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
        <div className="absolute bottom-10 sm:bottom-20 right-5 sm:right-10 w-56 sm:w-96 h-56 sm:h-96 bg-purple-100 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse delay-1000"></div>
      </div>

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-12 lg:max-w-[80%]">
        {/* Header */}
        <div className="text-center mb-10 sm:mb-16">
          <h2
            ref={titleRef}
            className="text-5xl lg:text-9xl font-bold bg-gradient-to-r from-slate-900 via-blue-900 to-slate-900 bg-clip-text text-transparent mb-4 sm:mb-6 leading-tight break-words"
          >
            Latest Insights
          </h2>
          <p
            ref={subtitleRef}
            className="text-base sm:text-lg lg:text-2xl text-slate-600 max-w-3xl mx-auto leading-relaxed font-light"
          >
            Discover cutting-edge strategies, industry insights, and expert
            perspectives that drive digital transformation
          </p>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12">
          {articleData.map((article, index) => (
            <article
              key={article.id}
              ref={(el) => (cardsRef.current[index] = el)}
              className="group bg-white rounded-xl sm:rounded-2xl shadow-lg overflow-hidden cursor-pointer transition-all duration-300 w-full"
              onMouseEnter={() => handleCardHover(index, true)}
              onMouseLeave={() => handleCardHover(index, false)}
              onClick={() => handleReadMore(article.id)}
            >
              {/* Image Container */}
              <div className="relative h-48 sm:h-64 lg:h-72 overflow-hidden">
                <img
                  src={article.image}
                  alt={article.title}
                  className="blog-image w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                <span className="category-badge absolute top-3 sm:top-4 left-3 sm:left-4 px-2 sm:px-3 py-1 bg-indigo-500 text-white text-xs sm:text-sm font-medium rounded-full">
                  {article.category}
                </span>
              </div>

              {/* Content */}
              <div className="p-5 sm:p-8">
                {/* Meta Info */}
                <div className="flex flex-wrap items-center text-xs sm:text-sm text-slate-500 mb-3 sm:mb-4 space-x-4">
                  <time className="flex items-center">
                    <svg
                      className="w-3 h-3 sm:w-4 sm:h-4 mr-1"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {article.date}
                  </time>
                  <span className="flex items-center">
                    <svg
                      className="w-3 h-3 sm:w-4 sm:h-4 mr-1"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {article.readTime}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-lg sm:text-2xl lg:text-3xl font-bold text-slate-900 mb-3 sm:mb-4 leading-tight group-hover:text-blue-600 transition-colors duration-300">
                  {article.title}
                </h3>

                {/* Excerpt */}
                <p className="text-slate-600 text-sm sm:text-lg leading-relaxed mb-5 sm:mb-6 line-clamp-3">
                  {article.excerpt}
                </p>

                {/* Footer */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold mr-2 sm:mr-3 text-xs sm:text-base">
                      {article.author
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </div>
                    <span className="text-slate-700 text-sm sm:text-base font-medium">
                      {article.author}
                    </span>
                  </div>

                  <button className="read-more-btn px-4 sm:px-6 py-2 sm:py-3 bg-blue-600 text-white text-sm sm:text-base font-semibold rounded-lg flex items-center space-x-2 hover:shadow-lg transition-all duration-300">
                    <span>Read More</span>
                    <svg
                      className="w-3 h-3 sm:w-4 sm:h-4"
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
              </div>
            </article>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12 sm:mt-16">
          <button className="px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold text-base sm:text-lg rounded-full hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl">
            View All Articles
            <svg
              className="w-4 h-4 sm:w-5 sm:h-5 inline-block ml-2"
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
      </div>
    </section>
  );
};

export default Blogs;
