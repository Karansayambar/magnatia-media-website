import { useEffect, useRef, useState } from "react";
import { articles } from "../utils/articles";
import { useParams } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const BlogDetails = () => {
  // For demo purposes, we'll use the first article
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const { articleId } = useParams();

  const heroRef = useRef(null);
  const imageRef = useRef(null);
  const titleRef = useRef(null);
  const metaRef = useRef(null);
  const contentRef = useRef(null);
  const authorRef = useRef(null);
  const navRef = useRef(null);

  useEffect(() => {
    // Simulate API call
    console.log("id", articleId);
    const fetchBlogDetails = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 800));
        const foundBlog = articles.find(
          (article) => article.id === parseInt(articleId)
        );
        console.log(foundBlog);
        setBlog(foundBlog || null);
      } catch (error) {
        console.error("Error fetching blog details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogDetails();
  }, [articleId]);

  useEffect(() => {
    if (!loading && blog) {
      const ctx = gsap.context(() => {
        // Initial setup
        gsap.set([imageRef.current, titleRef.current, metaRef.current], {
          opacity: 0,
          y: 60,
        });
        gsap.set([contentRef.current, authorRef.current, navRef.current], {
          opacity: 0,
          y: 40,
        });

        // Hero animation timeline
        const heroTl = gsap.timeline({ delay: 0.2 });

        heroTl
          .to(imageRef.current, {
            opacity: 1,
            y: 0,
            duration: 1.2,
            ease: "power3.out",
          })
          .to(
            titleRef.current,
            {
              opacity: 1,
              y: 0,
              duration: 1,
              ease: "power3.out",
            },
            "-=0.8"
          )
          .to(
            metaRef.current,
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              ease: "power2.out",
            },
            "-=0.6"
          );

        // Content animation with ScrollTrigger
        gsap.to(contentRef.current, {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: contentRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          },
        });

        // Author section animation
        gsap.to(authorRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: authorRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        });

        // Navigation animation
        gsap.to(navRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: navRef.current,
            start: "top 90%",
            toggleActions: "play none none reverse",
          },
        });
      }, heroRef);

      return () => ctx.revert();
    }
  }, [loading, blog]);

  const handleNavigation = (action) => {
    gsap.to(heroRef.current, {
      opacity: 0,
      y: -20,
      duration: 0.5,
      ease: "power2.in",
      onComplete: () => {
        if (action === "back") {
          console.log("Navigate back");
          // navigate(-1);
        } else if (action === "home") {
          console.log("Navigate to home");
          // navigate('/');
        }
      },
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-blue-50">
        <div className="text-center">
          <div className="relative">
            <div className="w-16 h-16 border-4 border-blue-200 rounded-full animate-spin"></div>
            <div
              className="w-16 h-16 border-4 border-blue-600 rounded-full animate-spin absolute top-0 left-0"
              style={{ clipPath: "polygon(0% 0%, 50% 0%, 50% 100%, 0% 100%)" }}
            ></div>
          </div>
          <p className="mt-4 text-slate-600 font-medium">Loading article...</p>
        </div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-blue-50">
        <div className="text-center max-w-md mx-auto px-6">
          <div className="mb-8">
            <svg
              className="w-24 h-24 mx-auto text-slate-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
          </div>
          <h2 className="text-3xl font-bold text-slate-900 mb-4">
            Article Not Found
          </h2>
          <p className="text-slate-600 mb-8 text-lg">
            The article you're looking for doesn't exist or has been moved.
          </p>
          <button
            onClick={() => handleNavigation("home")}
            className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-full hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 shadow-lg"
          >
            Return Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={heroRef}
      className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50"
    >
      {/* Background decorations */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-100 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-100 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse delay-1000"></div>
      </div>

      <div className="relative">
        {/* Back Button */}
        <div className="container mx-auto px-6 lg:px-12 pt-8">
          <button
            onClick={() => handleNavigation("back")}
            className="group flex items-center text-slate-600 hover:text-blue-600 transition-all duration-300 font-medium"
          >
            <div className="w-8 h-8 rounded-full bg-white shadow-md flex items-center justify-center mr-3 group-hover:shadow-lg transition-all duration-300">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
            </div>
            Back to Articles
          </button>
        </div>

        {/* Hero Section */}
        <div className="container mx-auto px-6 lg:px-12 py-12">
          <div className="max-w-8xl mx-auto">
            {/* Hero Image */}
            <div
              ref={imageRef}
              className="relative mb-12 rounded-2xl overflow-hidden shadow-2xl"
            >
              <img
                src={blog.image}
                alt={blog.title}
                className="w-full h-[400px] lg:h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>
              <div className="absolute bottom-6 left-6">
                <span className="px-4 py-2 bg-blue-600 text-white text-sm font-semibold rounded-full">
                  {blog.category}
                </span>
              </div>
            </div>

            {/* Article Header */}
            <header className="mb-12">
              <h1
                ref={titleRef}
                className="text-4xl lg:text-6xl font-bold bg-gradient-to-r from-slate-900 via-blue-900 to-slate-900 bg-clip-text text-transparent leading-tight mb-6"
              >
                {blog.title}
              </h1>

              <div
                ref={metaRef}
                className="flex flex-wrap items-center gap-6 text-slate-600 text-lg"
              >
                <div className="flex items-center">
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {blog.date}
                </div>
                <div className="flex items-center">
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {blog.readTime}
                </div>
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold text-sm mr-2">
                    {blog.author
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                  By {blog.author}
                </div>
              </div>
            </header>
          </div>
        </div>

        {/* Article Content */}
        <div className="bg-white/80 backdrop-blur-sm">
          <div className="container mx-auto px-6 lg:px-12 py-16">
            <div className="max-w-8xl mx-auto">
              <article
                ref={contentRef}
                className="bg-white rounded-2xl shadow-xl p-8 lg:p-12"
              >
                {/* Excerpt */}
                <div className="border-l-4 border-blue-500 pl-6 mb-12">
                  <p className="text-xl lg:text-4xl text-slate-700 leading-relaxed font-light italic">
                    {blog.excerpt}
                  </p>
                </div>

                {/* Main Content */}
                <div
                  className="prose prose-lg max-w-none prose-headings:text-slate-900 prose-headings:font-bold text-xl prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6 prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-4 prose-p:text-slate-700 prose-p:leading-relaxed prose-p:text-lg prose-blockquote:border-l-4 prose-blockquote:border-blue-500 prose-blockquote:bg-blue-50 prose-blockquote:p-4 prose-blockquote:rounded-r-lg prose-blockquote:not-italic prose-blockquote:text-blue-900"
                  dangerouslySetInnerHTML={{ __html: blog.content }}
                />

                {/* Tags */}
                <div className="mt-12 pt-8 border-t border-slate-200">
                  {/* <div className="flex flex-wrap gap-3">
                    {blog.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-4 py-2 bg-slate-100 text-slate-700 text-sm font-medium rounded-full hover:bg-blue-100 hover:text-blue-700 transition-colors duration-300 cursor-pointer"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div> */}
                </div>
              </article>

              {/* Author Section */}
              <div
                ref={authorRef}
                className="mt-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white"
              >
                <h3 className="text-2xl font-bold mb-6">About the Author</h3>
                <div className="flex items-start space-x-6">
                  <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-2xl font-bold">
                      {blog.author
                        .split(" ")
                        .map((name) => name[0])
                        .join("")}
                    </span>
                  </div>
                  <div className="flex-1">
                    <h4 className="text-xl font-semibold mb-2">
                      {blog.author}
                    </h4>
                    <p className="text-blue-100 mb-4">
                      Digital Marketing Specialist & Content Strategist
                    </p>
                    <p className="text-white/90 leading-relaxed">
                      Passionate about leveraging cutting-edge technology to
                      drive meaningful marketing results. With over 8 years of
                      experience in digital marketing, I specialize in AI-driven
                      strategies and data-driven decision making.
                    </p>
                  </div>
                </div>
              </div>

              {/* Navigation */}
              <div
                ref={navRef}
                className="mt-12 flex flex-col sm:flex-row justify-between items-center gap-4"
              >
                <button
                  onClick={() => handleNavigation("back")}
                  className="group px-6 py-3 bg-white border-2 border-slate-200 text-slate-700 font-semibold rounded-full hover:border-blue-500 hover:text-blue-600 transition-all duration-300 flex items-center space-x-2"
                >
                  <svg
                    className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 19l-7-7m0 0l7-7m-7 7h18"
                    />
                  </svg>
                  <span>Previous Article</span>
                </button>
                <button
                  onClick={() => handleNavigation("home")}
                  className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-full hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  Back to Home
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetails;
