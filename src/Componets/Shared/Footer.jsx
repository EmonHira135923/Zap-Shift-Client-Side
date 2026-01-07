import React from "react";
import {
  Facebook,
  Linkedin,
  Twitter,
  Instagram,
  Mail,
  Phone,
  MapPin,
  Zap,
  ArrowRight,
  Heart,
} from "lucide-react";
import { NavLink } from "react-router";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: "Services", path: "/services" },
    { name: "Coverage", path: "/coverage" },
    { name: "About Us", path: "/about" },
    { name: "Pricing", path: "/pricing" },
    { name: "Be a Rider", path: "/rider" },
    { name: "Careers", path: "/careers" },
  ];

  const resources = [
    { name: "Blog", path: "/blog" },
    { name: "Help Center", path: "/help" },
    { name: "Privacy Policy", path: "/privacy" },
    { name: "Terms of Service", path: "/terms" },
    { name: "FAQ", path: "/faq" },
    { name: "Contact Us", path: "/contact" },
  ];

  const contactInfo = [
    { icon: <Phone className="w-4 h-4" />, text: "+880 1234 567890" },
    { icon: <Mail className="w-4 h-4" />, text: "support@zapshift.com" },
    { icon: <MapPin className="w-4 h-4" />, text: "Dhaka, Bangladesh" },
  ];

  const socialLinks = [
    {
      icon: <Facebook className="w-5 h-5" />,
      url: "https://facebook.com",
      label: "Facebook",
    },
    {
      icon: <Twitter className="w-5 h-5" />,
      url: "https://twitter.com",
      label: "Twitter",
    },
    {
      icon: <Instagram className="w-5 h-5" />,
      url: "https://instagram.com",
      label: "Instagram",
    },
    {
      icon: <Linkedin className="w-5 h-5" />,
      url: "https://linkedin.com",
      label: "LinkedIn",
    },
  ];

  return (
    <footer className="bg-gradient-to-b from-gray-900 to-gray-950 text-white">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand Column */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 flex items-center justify-center">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
                  ZapShift
                </h2>
                <p className="text-sm text-gray-400">
                  Fast & Reliable Deliveries
                </p>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Revolutionizing logistics with cutting-edge technology and
              unparalleled delivery services across Bangladesh.
            </p>

            {/* Newsletter Subscription */}
            <div className="space-y-3">
              <h4 className="text-sm font-semibold text-gray-200">
                Stay Updated
              </h4>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 px-4 py-2 bg-gray-800 border border-gray-700 rounded-l-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button className="px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-r-lg hover:opacity-90 transition-opacity">
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-gray-100 border-l-4 border-blue-500 pl-3">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <NavLink
                    to={link.path}
                    className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors group text-sm"
                  >
                    <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    {link.name}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-gray-100 border-l-4 border-cyan-500 pl-3">
              Resources
            </h3>
            <ul className="space-y-3">
              {resources.map((link) => (
                <li key={link.name}>
                  <NavLink
                    to={link.path}
                    className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors group text-sm"
                  >
                    <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    {link.name}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Social */}
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-6 text-gray-100 border-l-4 border-emerald-500 pl-3">
                Contact Us
              </h3>
              <ul className="space-y-3">
                {contactInfo.map((info, index) => (
                  <li
                    key={index}
                    className="flex items-center gap-3 text-gray-400 text-sm"
                  >
                    <div className="w-8 h-8 rounded-lg bg-gray-800 flex items-center justify-center">
                      {info.icon}
                    </div>
                    {info.text}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-semibold mb-4 text-gray-200">
                Follow Us
              </h4>
              <div className="flex gap-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-lg bg-gray-800 hover:bg-gradient-to-r hover:from-blue-600 hover:to-cyan-500 flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg"
                    aria-label={social.label}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="mt-12 pt-8 border-t border-gray-800 grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { value: "5000+", label: "Daily Deliveries" },
            { value: "64+", label: "Cities Covered" },
            { value: "50K+", label: "Happy Customers" },
            { value: "99.9%", label: "Success Rate" },
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
                {stat.value}
              </div>
              <div className="text-sm text-gray-400 mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-center md:text-left">
              <p className="text-gray-400 text-sm">
                © {currentYear} ZapShift. All rights reserved.
              </p>
              <p className="text-gray-500 text-xs mt-1">
                Made with <Heart className="w-3 h-3 inline text-red-500" /> in
                Bangladesh
              </p>
            </div>

            <div className="flex items-center gap-6">
              <div className="flex items-center gap-4 text-xs text-gray-400">
                <NavLink
                  to="/privacy"
                  className="hover:text-white transition-colors"
                >
                  Privacy Policy
                </NavLink>
                <span className="text-gray-600">•</span>
                <NavLink
                  to="/terms"
                  className="hover:text-white transition-colors"
                >
                  Terms of Service
                </NavLink>
                <span className="text-gray-600">•</span>
                <NavLink
                  to="/cookies"
                  className="hover:text-white transition-colors"
                >
                  Cookie Policy
                </NavLink>
              </div>

              {/* App Badges */}
              <div className="flex gap-3">
                <div className="px-3 py-1.5 bg-gray-800 rounded-lg text-xs flex items-center gap-1.5">
                  <div className="w-6 h-6 bg-gradient-to-r from-blue-600 to-cyan-500 rounded flex items-center justify-center">
                    <Zap className="w-3 h-3 text-white" />
                  </div>
                  <span>Available on</span>
                  <span className="font-semibold">Play Store</span>
                </div>
                <div className="px-3 py-1.5 bg-gray-800 rounded-lg text-xs flex items-center gap-1.5">
                  <div className="w-6 h-6 bg-gradient-to-r from-blue-600 to-cyan-500 rounded flex items-center justify-center">
                    <Zap className="w-3 h-3 text-white" />
                  </div>
                  <span>Available on</span>
                  <span className="font-semibold">App Store</span>
                </div>
              </div>
            </div>
          </div>

          {/* Trust Seals */}
          <div className="flex flex-wrap justify-center gap-6 mt-6 pt-6 border-t border-gray-800">
            {[
              { text: "SSL Secured", color: "text-green-500" },
              { text: "PCI Compliant", color: "text-blue-400" },
              { text: "ISO 27001", color: "text-purple-400" },
              { text: "24/7 Support", color: "text-amber-400" },
            ].map((seal, index) => (
              <div key={index} className="flex items-center gap-2">
                <div
                  className={`w-2 h-2 rounded-full ${seal.color} animate-pulse`}
                ></div>
                <span className="text-xs text-gray-400">{seal.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Back to Top Button */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="fixed bottom-6 right-6 w-10 h-10 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 z-50 flex items-center justify-center"
        aria-label="Back to top"
      >
        <ArrowRight className="w-5 h-5 transform -rotate-90" />
      </button>
    </footer>
  );
};

export default Footer;
