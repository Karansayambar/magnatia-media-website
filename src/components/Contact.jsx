import React, { useState } from "react";
import { BsFacebook, BsThreads } from "react-icons/bs";
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
      className="bg-black text-white py-20 px-8 relative overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-purple-600/10 to-pink-600/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-r from-blue-600/10 to-cyan-600/10 rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-20">
          <h2 className="text-7xl md:text-9xl font-bold mb-6">
            <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              LET'S
            </span>
            <br />
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              TALK
            </span>
          </h2>
          <p className="text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Ready to transform your digital presence? Let's create something
            extraordinary together.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Form */}
          <div className="relative">
            <div className="bg-gradient-to-br from-gray-900/50 to-gray-800/30 backdrop-blur-sm rounded-3xl border border-gray-700/50 p-8 md:p-12">
              <h3 className="text-3xl font-bold mb-8 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                Start Your Project
              </h3>

              <div className="space-y-6">
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
                      className="w-full bg-gray-800/50 border border-gray-600 rounded-xl px-4 py-4 text-white placeholder-gray-400 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300"
                      placeholder="Your Name"
                    />
                    {focusedField === "name" && (
                      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-500/20 to-pink-500/20 -z-10 blur-sm"></div>
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
                      className="w-full bg-gray-800/50 border border-gray-600 rounded-xl px-4 py-4 text-white placeholder-gray-400 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300"
                      placeholder="Email Address"
                    />
                    {focusedField === "email" && (
                      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-500/20 to-pink-500/20 -z-10 blur-sm"></div>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    className="w-full bg-gray-800/50 border border-gray-600 rounded-xl px-4 py-4 text-white placeholder-gray-400 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300"
                    placeholder="Company (Optional)"
                  />

                  <select
                    name="project"
                    value={formData.project}
                    onChange={handleInputChange}
                    className="w-full bg-gray-800/50 border border-gray-600 rounded-xl px-4 py-4 text-white focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300"
                  >
                    <option value="">Project Type</option>
                    <option value="web-design">Web Design</option>
                    <option value="mobile-app">Mobile App</option>
                    <option value="branding">Branding</option>
                    <option value="ecommerce">E-commerce</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <select
                  name="budget"
                  value={formData.budget}
                  onChange={handleInputChange}
                  className="w-full bg-gray-800/50 border border-gray-600 rounded-xl px-4 py-4 text-white focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300"
                >
                  <option value="">Budget Range</option>
                  <option value="5k-10k">$5K - $10K</option>
                  <option value="10k-25k">$10K - $25K</option>
                  <option value="25k-50k">$25K - $50K</option>
                  <option value="50k+">$50K+</option>
                </select>

                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows="6"
                  required
                  className="w-full bg-gray-800/50 border border-gray-600 rounded-xl px-4 py-4 text-white placeholder-gray-400 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 resize-none"
                  placeholder="Tell us about your project..."
                ></textarea>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden"
                >
                  {isSubmitting ? (
                    <div className="flex items-center justify-center space-x-2">
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      <span>Sending...</span>
                    </div>
                  ) : (
                    "Send Message"
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            {contactInfo.map((info, index) => (
              <div key={index} className="group relative">
                <div className="bg-gradient-to-br from-gray-900/50 to-gray-800/30 backdrop-blur-sm rounded-2xl border border-gray-700/50 p-8 transition-all duration-300 hover:border-gray-600 hover:scale-105">
                  <div className="flex items-start space-x-4">
                    <div className="text-4xl mb-4">{info.icon}</div>
                    <div className="flex-1">
                      <h4 className="text-xl font-bold text-white mb-2">
                        {info.title}
                      </h4>
                      <p className="text-lg text-purple-400 font-medium mb-1">
                        {info.content}
                      </p>
                      <p className="text-gray-400">{info.subtitle}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Social Links */}
            <div className="bg-gradient-to-br from-gray-900/50 to-gray-800/30 backdrop-blur-sm rounded-2xl border border-gray-700/50 p-8">
              <h4 className="text-xl font-bold text-white mb-6">Follow Us</h4>
              <div className="flex space-x-4">
                {[
                  {
                    name: "LinkedIn",
                    color: "hover:text-blue-400",
                    icon: <LiaLinkedin />,
                    link: "https://www.linkedin.com/company/magnatiamedia/",
                  },
                  {
                    name: "Facebook",
                    color: "hover:text-sky-400",
                    icon: <BsFacebook />,
                    link: "https://www.facebook.com/people/Magnatia-Media-Pvt-Ltd/61572407098443/",
                  },
                  {
                    name: "Instagram",
                    color: "hover:text-pink-400",
                    icon: <ImInstagram />,
                    link: "https://www.instagram.com/magnatiamedia/?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw%3D%3D#",
                  },
                  {
                    name: "Threads",
                    color: "hover:text-purple-400",
                    icon: <BsThreads />,
                    link: "https://www.threads.com/web/?waterfall_id=e186dbc9-43a3-4c96-93aa-8a8856a5f077",
                  },
                ].map((social) => (
                  <a
                    key={social.name}
                    href={social.link}
                    className={`w-10 h-10 rounded-full border border-gray-600 hover:border-gray-400 transition-all duration-300 hover:scale-110 flex items-center justify-center text-gray-400 ${social.color}`}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
