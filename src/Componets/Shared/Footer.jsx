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
      <div className="container mx-auto px-4 py-8 md:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand Column - Full width on mobile */}
          <div className="space-y-4 col-span-1 sm:col-span-2 lg:col-span-1">
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
            <div className="space-y-3 pt-2">
              <h4 className="text-sm font-semibold text-gray-200">
                Stay Updated
              </h4>
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 px-4 py-3 sm:py-2 bg-gray-800 border border-gray-700 rounded-lg sm:rounded-l-lg sm:rounded-r-none text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button className="px-4 py-3 sm:py-2 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-lg sm:rounded-r-lg hover:opacity-90 transition-opacity flex items-center justify-center gap-2">
                  <span className="sm:hidden">Subscribe</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Quick Links - 2 columns on mobile */}
          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-4 text-gray-100 border-l-4 border-blue-500 pl-3">
              Quick Links
            </h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <NavLink
                    to={link.path}
                    className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors group text-sm py-1"
                  >
                    <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    {link.name}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources - 2 columns on mobile */}
          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-4 text-gray-100 border-l-4 border-cyan-500 pl-3">
              Resources
            </h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-2">
              {resources.map((link) => (
                <li key={link.name}>
                  <NavLink
                    to={link.path}
                    className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors group text-sm py-1"
                  >
                    <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    {link.name}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Social - Full width on mobile */}
          <div className="space-y-6 col-span-1 sm:col-span-2 lg:col-span-1">
            <div>
              <h3 className="text-lg font-semibold mb-4 text-gray-100 border-l-4 border-emerald-500 pl-3">
                Contact Us
              </h3>
              <ul className="space-y-3">
                {contactInfo.map((info, index) => (
                  <li
                    key={index}
                    className="flex items-center gap-3 text-gray-400 text-sm"
                  >
                    <div className="w-8 h-8 rounded-lg bg-gray-800 flex items-center justify-center flex-shrink-0">
                      {info.icon}
                    </div>
                    <span className="break-words">{info.text}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-semibold mb-4 text-gray-200">
                Follow Us
              </h4>
              <div className="flex gap-3 flex-wrap">
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

        {/* Stats Section - 2 columns on mobile, 4 on desktop */}
        <div className="mt-8 pt-8 border-t border-gray-800 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {[
            { value: "5000+", label: "Daily Deliveries" },
            { value: "64+", label: "Cities Covered" },
            { value: "50K+", label: "Happy Customers" },
            { value: "99.9%", label: "Success Rate" },
          ].map((stat, index) => (
            <div key={index} className="text-center px-2">
              <div className="text-xl md:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
                {stat.value}
              </div>
              <div className="text-xs md:text-sm text-gray-400 mt-1">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col gap-6 md:flex-row justify-between items-center">
            {/* Copyright Section */}
            <div className="text-center md:text-left order-2 md:order-1">
              <p className="text-gray-400 text-sm">
                © {currentYear} ZapShift. All rights reserved.
              </p>
              <p className="text-gray-500 text-xs mt-1">
                Made with <Heart className="w-3 h-3 inline text-red-500" /> in
                Bangladesh
              </p>
            </div>

            {/* Links and App Badges */}
            <div className="flex flex-col gap-4 items-center md:items-end order-1 md:order-2 w-full md:w-auto">
              {/* Links - Stack on mobile, row on desktop */}
              <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-xs text-gray-400">
                <NavLink
                  to="/privacy"
                  className="hover:text-white transition-colors px-2 py-1"
                >
                  Privacy Policy
                </NavLink>
                <span className="hidden sm:inline text-gray-600">•</span>
                <NavLink
                  to="/terms"
                  className="hover:text-white transition-colors px-2 py-1"
                >
                  Terms of Service
                </NavLink>
                <span className="hidden sm:inline text-gray-600">•</span>
                <NavLink
                  to="/cookies"
                  className="hover:text-white transition-colors px-2 py-1"
                >
                  Cookie Policy
                </NavLink>
              </div>

              {/* App Badges - Stack on mobile, side by side on desktop */}
              <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                <div className="px-3 py-2 bg-gray-800 rounded-lg text-xs flex items-center justify-center gap-1.5 w-full sm:w-auto">
                  <div className="w-6 h-6 bg-gradient-to-r from-blue-600 to-cyan-500 rounded flex items-center justify-center">
                    <Zap className="w-3 h-3 text-white" />
                  </div>
                  <span>Available on</span>
                  <span className="font-semibold">Play Store</span>
                </div>
                <div className="px-3 py-2 bg-gray-800 rounded-lg text-xs flex items-center justify-center gap-1.5 w-full sm:w-auto">
                  <div className="w-6 h-6 bg-gradient-to-r from-blue-600 to-cyan-500 rounded flex items-center justify-center">
                    <Zap className="w-3 h-3 text-white" />
                  </div>
                  <span>Available on</span>
                  <span className="font-semibold">App Store</span>
                </div>
              </div>
            </div>
          </div>

          {/* Trust Seals - 2 columns on mobile, 4 on desktop */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 pt-6 border-t border-gray-800">
            {[
              { text: "SSL Secured", color: "text-green-500" },
              { text: "PCI Compliant", color: "text-blue-400" },
              { text: "ISO 27001", color: "text-purple-400" },
              { text: "24/7 Support", color: "text-amber-400" },
            ].map((seal, index) => (
              <div
                key={index}
                className="flex items-center gap-2 justify-center md:justify-start"
              >
                <div
                  className={`w-2 h-2 rounded-full ${seal.color} animate-pulse flex-shrink-0`}
                ></div>
                <span className="text-xs text-gray-400">{seal.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Back to Top Button - Smaller on mobile */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="fixed bottom-4 right-4 w-10 h-10 md:w-12 md:h-12 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 z-50 flex items-center justify-center"
        aria-label="Back to top"
      >
        <ArrowRight className="w-5 h-5 transform -rotate-90" />
      </button>
    </footer>
  );
};

export default Footer;
