import { BsDribbble, BsFacebook, BsThreads, BsTwitter } from "react-icons/bs";
import { ImInstagram } from "react-icons/im";
import { LiaLinkedin } from "react-icons/lia";

// Footer Component
const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    Services: [
      "Web Design",
      "Mobile Apps",
      "Branding",
      "E-commerce",
      "SEO Optimization",
      "Digital Marketing",
    ],
    Company: [
      "About Us",
      "Our Team",
      "Careers",
      "Blog",
      "Case Studies",
      "Testimonials",
    ],
    Resources: [
      "Documentation",
      "Help Center",
      "Community",
      "Tutorials",
      "API Reference",
      "Status Page",
    ],
    Legal: [
      "Privacy Policy",
      "Terms of Service",
      "Cookie Policy",
      "GDPR",
      "Accessibility",
      "Licenses",
    ],
  };

  return (
    <footer className="bg-gradient-to-br from-gray-900 to-black text-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-r from-purple-600/5 to-pink-600/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-gradient-to-r from-blue-600/5 to-cyan-600/5 rounded-full blur-3xl"></div>

      <div className="relative z-10">
        {/* Main Footer */}
        <div className="max-w-7xl mx-auto px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-12">
            {/* Brand Section */}
            <div className="lg:col-span-2 space-y-6">
              <h3 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Magnatia Media Pvt. Ltd.
              </h3>
              <p className="text-gray-300 text-lg leading-relaxed">
                Creating digital experiences that inspire, engage, and drive
                results. Let's build something amazing together.
              </p>

              {/* Newsletter Signup */}
              <div className="space-y-4">
                <h4 className="text-xl font-semibold">Stay Updated</h4>
                <div className="flex space-x-2">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="flex-1 bg-gray-800/50 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300"
                  />
                  <button className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-lg font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg">
                    Subscribe
                  </button>
                </div>
              </div>
            </div>

            {/* Footer Links */}
            {Object.entries(footerLinks).map(([category, links]) => (
              <div key={category} className="space-y-4">
                <h4 className="text-xl font-semibold text-white">{category}</h4>
                <ul className="space-y-3">
                  {links.map((link) => (
                    <li key={link}>
                      <a
                        href="#"
                        className="text-gray-400 hover:text-white transition-colors duration-300 hover:translate-x-1 transform inline-block"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800">
          <div className="max-w-7xl mx-auto px-8 py-8">
            <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
              <div className="flex items-center space-x-8">
                <p className="text-gray-400">
                  © {currentYear} YourBrand. All rights reserved.
                </p>
                <div className="flex items-center space-x-4">
                  <span className="text-gray-400">Made with</span>
                  <span className="text-red-500 animate-pulse">❤️</span>
                  <span className="text-gray-400">in Design City</span>
                </div>
              </div>

              {/* Social Links */}
              <div className="flex items-center space-x-4">
                <span className="text-gray-400 text-sm">Follow us:</span>
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

        {/* Back to Top Button */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-8 right-8 w-14 h-14 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full shadow-2xl transition-all duration-300 hover:scale-110 hover:shadow-purple-500/25 flex items-center justify-center z-50"
        >
          ↑
        </button>
      </div>
    </footer>
  );
};

export default Footer;
