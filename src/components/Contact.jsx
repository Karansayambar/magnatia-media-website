import React, { useState } from "react";
import { BsFacebook, BsThreads, BsArrowRight } from "react-icons/bs";
import { ImInstagram } from "react-icons/im";
import { LiaLinkedin } from "react-icons/lia";

// Contact Component
const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    project: "",
    message: "",
    budget: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [focusedField, setFocusedField] = useState(null);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setIsSubmitting(false);
    alert("Message sent successfully!");
    setFormData({
      name: "",
      email: "",
      company: "",
      project: "",
      message: "",
      budget: "",
    });
  };

  const contactInfo = [
    {
      icon: "📧",
      title: "Email",
      content: "kunal@magnatiamedia.com , ganesh@magnatiamedia.com",
      subtitle: "We respond within 24 hours",
    },
    {
      icon: "📱",
      title: "Phone",
      content: "+91 738 7333 401",
      subtitle: "Mon-Sat, 9AM-6PM EST",
    },
    {
      icon: "📍",
      title: "Office",
      content: "Mumbai | Pune | Ahmedabad | Vadodara | Nagpur",
      subtitle: "Visit us for a coffee chat",
    },
  ];

  return (
    <div
      id="contact"
      className="bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white py-20 px-8 relative overflow-hidden"
    >
      {/* Enhanced Background Elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-full blur-3xl animate-pulse-slow"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-r from-blue-600/20 to-cyan-600/20 rounded-full blur-3xl animate-pulse-medium"></div>
      <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-gradient-to-r from-emerald-500/15 to-teal-500/15 rounded-full blur-3xl animate-pulse-slow"></div>

      {/* Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:50px_50px] animate-grid-move"></div>

      {/* Floating Particles */}
      {[...Array(8)].map((_, i) => (
        <div
          key={i}
          className={`particle absolute w-1.5 h-1.5 rounded-full floating-${
            (i % 3) + 1
          }`}
          style={{
            top: `${20 + ((i * 10) % 60)}%`,
            left: `${10 + ((i * 15) % 80)}%`,
            backgroundColor: `rgba(${
              i % 3 === 0
                ? "139 92 246"
                : i % 3 === 1
                ? "14 165 233"
                : "236 72 153"
            } / 0.7)`,
          }}
        ></div>
      ))}

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Enhanced Header */}
        <div className="text-center mb-20">
          <h2 className="text-6xl md:text-8xl font-bold mb-6">
            <span className="bg-gradient-to-r from-white via-gray-300 to-gray-400 bg-clip-text text-transparent">
              LET'S
            </span>
            <br />
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent animate-text-shimmer">
              TALK
            </span>
          </h2>
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Ready to transform your digital presence? Let's create something
            extraordinary together.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Enhanced Contact Form */}
          <div className="relative">
            <div className="bg-gradient-to-br from-gray-900/70 to-gray-800/50 backdrop-blur-md rounded-3xl border border-gray-700/30 p-8 md:p-12 shadow-2xl shadow-purple-500/10">
              <h3 className="text-3xl font-bold mb-8 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                Start Your Project
              </h3>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="relative">
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      onFocus={() => setFocusedField("name")}
                      onBlur={() => setFocusedField(null)}
                      required
                      className="w-full bg-gray-800/30 border border-gray-600/50 rounded-xl px-4 py-4 text-white placeholder-gray-400 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300"
                      placeholder="Your Name"
                    />
                    {focusedField === "name" && (
                      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-500/20 to-pink-500/20 -z-10 blur-sm animate-pulse-fast"></div>
                    )}
                  </div>

                  <div className="relative">
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      onFocus={() => setFocusedField("email")}
                      onBlur={() => setFocusedField(null)}
                      required
                      className="w-full bg-gray-800/30 border border-gray-600/50 rounded-xl px-4 py-4 text-white placeholder-gray-400 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300"
                      placeholder="Email Address"
                    />
                    {focusedField === "email" && (
                      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-500/20 to-pink-500/20 -z-10 blur-sm animate-pulse-fast"></div>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="relative">
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      className="w-full bg-gray-800/30 border border-gray-600/50 rounded-xl px-4 py-4 text-white placeholder-gray-400 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300"
                      placeholder="Company (Optional)"
                    />
                  </div>

                  <div className="relative">
                    <select
                      name="project"
                      value={formData.project}
                      onChange={handleInputChange}
                      className="w-full bg-gray-800/30 border border-gray-600/50 rounded-xl px-4 py-4 text-white focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 appearance-none"
                    >
                      <option value="">Select Project Type</option>
                      <option value="digital-marketing">
                        Digital Marketing
                      </option>
                      <option value="web-design">Web Design</option>
                      <option value="mobile-app">Mobile App</option>
                      <option value="branding">Branding</option>
                      <option value="ecommerce">E-commerce</option>
                      <option value="telecalling">Telecalling</option>
                      <option value="end-to-end-handling">
                        End-to-End Project Handling
                      </option>
                      <option value="other">Other</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                      <svg
                        className="w-4 h-4 fill-current text-gray-400"
                        viewBox="0 0 20 20"
                      >
                        <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                      </svg>
                    </div>
                  </div>
                </div>

                <div className="relative">
                  <select
                    name="budget"
                    value={formData.budget}
                    onChange={handleInputChange}
                    className="w-full bg-gray-800/30 border border-gray-600/50 rounded-xl px-4 py-4 text-white focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 appearance-none"
                  >
                    <option value="">Select Budget Range</option>
                    <option value="below-40k">Below ₹40K</option>
                    <option value="40k-1lakh">₹40K – ₹1 Lakh</option>
                    <option value="1lakh-3lakh">₹1 Lakh – ₹3 Lakh</option>
                    <option value="above-3lakh">Above ₹3 Lakh</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                    <svg
                      className="w-4 h-4 fill-current text-gray-400"
                      viewBox="0 0 20 20"
                    >
                      <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                    </svg>
                  </div>
                </div>

                <div className="relative">
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows="6"
                    required
                    className="w-full bg-gray-800/30 border border-gray-600/50 rounded-xl px-4 py-4 text-white placeholder-gray-400 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 resize-none"
                    placeholder="Tell us about your project..."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden group"
                >
                  {isSubmitting ? (
                    <div className="flex items-center justify-center space-x-2">
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      <span>Sending...</span>
                    </div>
                  ) : (
                    <>
                      <span>Send Message</span>
                      <BsArrowRight className="absolute right-4 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* Enhanced Contact Information */}
          <div className="space-y-8">
            {contactInfo.map((info, index) => (
              <div key={index} className="group relative">
                <div className="bg-gradient-to-br from-gray-900/70 to-gray-800/50 backdrop-blur-md rounded-2xl border border-gray-700/30 p-8 transition-all duration-300 hover:border-gray-600/50 hover:scale-[1.02] hover:shadow-lg hover:shadow-purple-500/10">
                  <div className="flex items-start space-x-4">
                    <div className="text-3xl transform group-hover:scale-110 transition-transform duration-300">
                      {info.icon}
                    </div>
                    <div className="flex-1">
                      <h4 className="text-xl font-bold text-white mb-2">
                        {info.title}
                      </h4>
                      <p className="text-lg text-purple-300 font-medium mb-1">
                        {info.content}
                      </p>
                      <p className="text-gray-400">{info.subtitle}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Enhanced Social Links */}
            <div className="bg-gradient-to-br from-gray-900/70 to-gray-800/50 backdrop-blur-md rounded-2xl border border-gray-700/30 p-8">
              <h4 className="text-xl font-bold text-white mb-6">Follow Us</h4>
              <div className="flex space-x-4">
                {[
                  {
                    name: "LinkedIn",
                    color:
                      "hover:bg-blue-500/20 hover:text-blue-400 hover:border-blue-500/50",
                    icon: <LiaLinkedin className="text-lg" />,
                    link: "https://www.linkedin.com/company/magnatiamedia/",
                  },
                  {
                    name: "Facebook",
                    color:
                      "hover:bg-sky-500/20 hover:text-sky-400 hover:border-sky-500/50",
                    icon: <BsFacebook className="text-lg" />,
                    link: "https://www.facebook.com/people/Magnatia-Media-Pvt-Ltd/61572407098443/",
                  },
                  {
                    name: "Instagram",
                    color:
                      "hover:bg-pink-500/20 hover:text-pink-400 hover:border-pink-500/50",
                    icon: <ImInstagram className="text-lg" />,
                    link: "https://www.instagram.com/magnatiamedia/?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw%3D%3D#",
                  },
                  {
                    name: "Threads",
                    color:
                      "hover:bg-purple-500/20 hover:text-purple-400 hover:border-purple-500/50",
                    icon: <BsThreads className="text-lg" />,
                    link: "https://www.threads.com/web/?waterfall_id=e186dbc9-43a3-4c96-93aa-8a8856a5f077",
                  },
                ].map((social) => (
                  <a
                    key={social.name}
                    href={social.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-12 h-12 rounded-xl border border-gray-600/50 transition-all duration-300 hover:scale-110 flex items-center justify-center text-gray-400 ${social.color}`}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add custom styles for animations */}
      <style jsx>{`
        @keyframes gridMove {
          0% {
            background-position: 0 0;
          }
          100% {
            background-position: 50px 50px;
          }
        }
        @keyframes textShimmer {
          0% {
            background-position: -100% 0;
          }
          100% {
            background-position: 200% 0;
          }
        }
        @keyframes pulseSlow {
          0%,
          100% {
            opacity: 0.2;
          }
          50% {
            opacity: 0.3;
          }
        }
        @keyframes pulseMedium {
          0%,
          100% {
            opacity: 0.15;
          }
          50% {
            opacity: 0.25;
          }
        }
        @keyframes pulseFast {
          0%,
          100% {
            opacity: 0.3;
          }
          50% {
            opacity: 0.5;
          }
        }
        .animate-grid-move {
          animation: gridMove 20s linear infinite;
        }
        .animate-text-shimmer {
          background-size: 200% auto;
          animation: textShimmer 3s linear infinite;
        }
        .animate-pulse-slow {
          animation: pulseSlow 6s ease-in-out infinite;
        }
        .animate-pulse-medium {
          animation: pulseMedium 4s ease-in-out infinite;
        }
        .animate-pulse-fast {
          animation: pulseFast 2s ease-in-out infinite;
        }
        .floating-1 {
          animation: float 8s ease-in-out infinite;
        }
        .floating-2 {
          animation: float 10s ease-in-out infinite;
        }
        .floating-3 {
          animation: float 12s ease-in-out infinite;
        }
        @keyframes float {
          0%,
          100% {
            transform: translateY(0) translateX(0);
          }
          50% {
            transform: translateY(-15px) translateX(10px);
          }
        }
      `}</style>
    </div>
  );
};

export default Contact;
