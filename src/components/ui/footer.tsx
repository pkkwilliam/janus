"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { LogoSvg } from "./logo";
import {
  Mail,
  MessageCircle,
  Shield,
  Heart,
  Star,
  Moon,
  Sparkles,
} from "lucide-react";
import { useState, useEffect } from "react";
import { authAPI } from "@/lib/api/auth";
import { userAPI } from "@/lib/api/user";

interface FooterLink {
  name: string;
  href: string;
  external?: boolean;
}

interface FooterSection {
  title: string;
  links: FooterLink[];
}

const footerSections: FooterSection[] = [
  {
    title: "Product",
    links: [
      { name: "Features", href: "#features" },
      { name: "Readings", href: "/dashboard" },
      // { name: 'Pricing', href: '/pricing' },
      { name: "How it Works", href: "#how-it-works" },
    ],
  },
  {
    title: "Company",
    links: [
      { name: "About Us", href: "/about" },
      { name: "Our Story", href: "/our-story" },
      { name: "Contact", href: "/contact" },
      { name: "Feedback", href: "/contact" },
    ],
  },
  {
    title: "Support",
    links: [
      { name: "Help Center", href: "/help" },
      { name: "Getting Started", href: "/getting-started" },
      { name: "Community", href: "/community" },
      { name: "Status", href: "/status" },
    ],
  },
  {
    title: "Legal",
    links: [
      { name: "Privacy Policy", href: "/privacy" },
      { name: "Terms of Service", href: "/terms" },
      { name: "Cookie Policy", href: "/cookies" },
      { name: "Disclaimer", href: "/disclaimer" },
    ],
  },
];

const socialLinks = [
  { name: "Email", href: "mailto:hello@fortune-cookie.me", icon: Mail },
  { name: "Contact", href: "#contact", icon: MessageCircle },
];

export function Footer() {
  const [hasActiveSubscription, setHasActiveSubscription] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check authentication state and user subscription status
  useEffect(() => {
    const checkAuthState = async () => {
      if (typeof window !== "undefined") {
        const token = localStorage.getItem("authToken");
        const loggedIn = !!token;
        setIsLoggedIn(loggedIn);

        // If logged in, fetch plan data to check subscription status
        if (loggedIn) {
          try {
            const planResponse = await userAPI.getPlan();
            setHasActiveSubscription(
              planResponse.data?.hasActiveSubscription || false
            );
          } catch (error) {
            console.error("Failed to load user plan in footer:", error);
            setHasActiveSubscription(false);
          }
        } else {
          setHasActiveSubscription(false);
        }
      }
    };

    checkAuthState();
  }, []);

  // Filter footer sections based on subscription status
  const filteredFooterSections = footerSections.map((section) => ({
    ...section,
    links: section.links.filter(
      (link) => !(link.name === "Pricing" && hasActiveSubscription)
    ),
  }));

  return (
    <footer className="relative bg-gradient-to-b from-gray-50 to-gray-100 mt-20">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-24 left-1/4 w-96 h-96 bg-gradient-radial from-blue-100/20 to-transparent rounded-full blur-3xl" />
        <div className="absolute -top-12 right-1/4 w-64 h-64 bg-gradient-radial from-purple-100/20 to-transparent rounded-full blur-2xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content - Mobile Optimized */}
        <div className="py-8 md:py-16">
          <div className="flex flex-col md:grid md:grid-cols-2 lg:grid-cols-6 gap-6 md:gap-8">
            {/* Brand Section */}
            <div className="lg:col-span-2 text-center md:text-left">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div className="flex justify-center md:justify-start">
                  <LogoSvg size="md" className="mb-4" />
                </div>
                <p className="text-gray-600 text-sm leading-relaxed mb-4 max-w-sm mx-auto md:mx-0">
                  Discover your fortune with personalized readings and ancient wisdom.
                </p>

                {/* Social Links */}
                <div className="flex items-center justify-center md:justify-start gap-3">
                  {socialLinks.map((social) => {
                    const Icon = social.icon;
                    return (
                      <motion.a
                        key={social.name}
                        href={social.href}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        className="p-2 rounded-lg text-gray-600 hover:text-indigo-600 transition-colors bg-white/60"
                        title={social.name}
                      >
                        <Icon className="w-4 h-4" />
                      </motion.a>
                    );
                  })}
                </div>
              </motion.div>
            </div>

            {/* Footer Links - Mobile: 2 columns */}
            <div className="grid grid-cols-2 gap-4 md:contents">
              {filteredFooterSections.map((section, sectionIndex) => (
                <motion.div
                  key={section.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: sectionIndex * 0.1 }}
                  className="space-y-2"
                >
                  <h3 className="text-xs font-semibold text-gray-900 tracking-wider uppercase">
                    {section.title}
                  </h3>
                  <ul className="space-y-1.5">
                    {section.links.slice(0, 3).map((link) => (
                      <li key={link.name}>
                        <Link
                          href={link.href}
                          className="text-xs text-gray-600 hover:text-indigo-600 transition-colors"
                          {...(link.external && {
                            target: "_blank",
                            rel: "noopener noreferrer",
                          })}
                        >
                          {link.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Trust Badges - Mobile Compact */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="py-4 md:py-8 border-t border-gray-200"
        >
          <div className="flex flex-row items-center justify-center gap-4 md:gap-8">
            <div className="flex items-center gap-1.5 text-xs md:text-sm text-gray-600">
              <Shield className="w-3 h-3 md:w-4 md:h-4 text-green-500" />
              <span>Secure</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs md:text-sm text-gray-600">
              <Heart className="w-3 h-3 md:w-4 md:h-4 text-red-500" />
              <span>Made with Love</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs md:text-sm text-gray-600">
              <Star className="w-3 h-3 md:w-4 md:h-4 text-yellow-500" />
              <span>5-Star</span>
            </div>
          </div>
        </motion.div>

        {/* Bottom Bar - Mobile Compact */}
        <div className="py-4 md:py-8 border-t border-gray-200">
          <div className="flex flex-col md:flex-row items-center justify-between gap-2 md:gap-4">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="text-xs md:text-sm text-gray-600"
            >
              <p>&copy; 2024 Fortune-Cookie.me</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex items-center gap-1 text-xs text-gray-500"
            >
              <Moon className="w-3 h-3" />
              <span>Fortune insights</span>
              <Sparkles className="w-3 h-3" />
            </motion.div>
          </div>
        </div>
      </div>

      {/* Floating Elements */}
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 rounded-full bg-gradient-to-r from-blue-400/20 to-purple-400/20"
          style={{
            top: `${20 + Math.random() * 60}%`,
            left: `${10 + Math.random() * 80}%`,
          }}
          animate={{
            y: [0, -10, 0],
            opacity: [0.2, 0.6, 0.2],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
        />
      ))}
    </footer>
  );
}
