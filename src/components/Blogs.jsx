import React from "react";
import img from "../assets/creative-web-design.webp";

const Blogs = () => {
  const articles = [
    {
      title: "WhatsApp Marketing: The Game Changer for Business Growth",
      date: "06/16/2020",
      excerpt:
        "Learn the strategies to leverage WhatsApp as a powerful marketing tool for your business.",
    },
    {
      title: "Why Social Media Presence is Non-Negotiable for Businesses",
      date: "04/15/2020",
      excerpt:
        "Discover why every business needs a strong social media presence to thrive in the digital age.",
    },
  ];

  return (
    <div
      id="blog"
      className="px-4 sm:px-6 md:px-12 lg:px-20 xl:px-40 py-16 sm:py-24 lg:py-32 bg-black text-white"
    >
      {/* Heading */}
      <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl mb-12 sm:mb-20 lg:mb-32 text-center md:text-left lg:text-[150px] font-space-poppins">
        Latest Articles
      </h1>

      {/* Articles Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {articles.map((article, index) => (
          <div
            key={index}
            className="rounded-xl bg-white overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 flex flex-col"
          >
            {/* Blog Image */}
            <img
              src={img}
              alt={`blog ${index + 1}`}
              className="w-full h-52 sm:h-60 md:h-72 lg:h-80 object-cover"
            />

            {/* Blog Content */}
            <div className="p-6 flex flex-col flex-grow">
              <h2 className="text-lg sm:text-xl font-semibold mb-2 text-gray-900">
                {article.title}
              </h2>
              <p className="text-gray-500 text-xs sm:text-sm mb-4">
                {article.date} · 12:00 AM
              </p>
              <p className="text-gray-700 text-sm sm:text-base flex-grow mb-6">
                {article.excerpt}
              </p>
              <button className="mt-auto px-4 py-2 bg-blue-600 text-white text-sm sm:text-base rounded-lg hover:bg-blue-700 transition-colors duration-300">
                Read More
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blogs;
