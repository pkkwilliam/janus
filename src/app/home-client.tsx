"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  ArrowRight,
  Clock,
  Users,
  Shield,
  ChevronRight,
  Star,
  Zap,
  Gift,
  TrendingUp,
  Moon,
  Sun,
} from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, Suspense } from "react";
import { useAppInit } from "@/hooks/useAppInit";
import { Footer } from "@/components/ui/footer";
import { Zodiac, ZODIAC_CONFIG, ZODIAC_ORDER, ZODIAC_INFO } from "@/types/zodiac";

function OAuthRedirectHandler() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const code = searchParams.get("code");
    const error = searchParams.get("error");

    if (code || error) {
      const params = new URLSearchParams();
      searchParams.forEach((value, key) => params.set(key, value));
      if (code) params.set("provider", "google");
      router.replace(`/auth/callback?${params.toString()}`);
    }
  }, [searchParams, router]);

  return null;
}

// Floating background elements
function FloatingElements() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Floating orbs */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full blur-3xl"
          style={{
            width: 100 + Math.random() * 200,
            height: 100 + Math.random() * 200,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            background: i % 2 === 0 
              ? 'radial-gradient(circle, rgba(99,102,241,0.15) 0%, transparent 70%)' 
              : 'radial-gradient(circle, rgba(168,85,247,0.15) 0%, transparent 70%)',
          }}
          animate={{
            x: [0, 30, -20, 0],
            y: [0, -40, 20, 0],
            scale: [1, 1.1, 0.9, 1],
          }}
          transition={{
            duration: 15 + Math.random() * 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: Math.random() * 5,
          }}
        />
      ))}

      {/* Floating bubbles - gentle floating motion */}
      {[...Array(12)].map((_, i) => {
        const size = 20 + Math.random() * 30;
        const startX = Math.random() * 100;
        const startY = Math.random() * 100;
        
        return (
          <motion.div
            key={`bubble-${i}`}
            className="absolute rounded-full"
            style={{
              width: size,
              height: size,
              left: `${startX}%`,
              top: `${startY}%`,
              background: 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.8), rgba(255,255,255,0.1))',
              boxShadow: 'inset -2px -2px 6px rgba(0,0,0,0.1), 0 0 20px rgba(255,255,255,0.3)',
            }}
            animate={{
              y: [0, -30 - Math.random() * 40, 0],
              x: [0, (Math.random() - 0.5) * 60, 0],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 10 + Math.random() * 8,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 5,
            }}
          />
        );
      })}

      {/* Floating icons */}
      {[Sparkles, Moon, Sun, Star].map((Icon, i) => (
        <motion.div
          key={`icon-${i}`}
          className="absolute text-indigo-200/30"
          style={{
            left: `${10 + i * 25}%`,
            top: `${20 + (i % 2) * 50}%`,
          }}
          animate={{
            y: [0, -30, 0],
            rotate: [0, 10, -10, 0],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 8 + i * 2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 1.5,
          }}
        >
          <Icon className="w-8 h-8" />
        </motion.div>
      ))}

      {/* Shooting stars */}
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={`shooting-${i}`}
          className="absolute h-0.5 bg-gradient-to-r from-transparent via-indigo-300 to-transparent"
          style={{
            width: 100,
            top: `${20 + i * 30}%`,
            left: -100,
          }}
          animate={{
            x: ['0vw', '120vw'],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            repeatDelay: 7 + i * 3,
            ease: "easeOut",
          }}
        />
      ))}
    </div>
  );
}

export default function HomeClient() {
  const { isLoading, isAuthenticated } = useAppInit({ requireAuth: false });
  const router = useRouter();
  const [activeZodiac, setActiveZodiac] = useState<Zodiac>(Zodiac.DRAGON);
  
  // Config: Number of birth years to display (change this to show more/less)
  const BIRTH_YEARS_COUNT = 5;

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      router.push("/dashboard");
    }
  }, [isAuthenticated, isLoading, router]);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveZodiac((prev) => {
        const currentIndex = ZODIAC_ORDER.indexOf(prev);
        return ZODIAC_ORDER[(currentIndex + 1) % 12];
      });
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Get preview text from zodiac info
  const getZodiacPreview = (zodiac: Zodiac) => {
    const info = ZODIAC_INFO[zodiac];
    const firstReading = info.sections[0]?.readings[0] || '';
    return firstReading.length > 120 ? firstReading.substring(0, 120) + '...' : firstReading;
  };

  // Get birth years for a zodiac
  const getBirthYears = (zodiac: Zodiac) => {
    const zodiacIndex = ZODIAC_ORDER.indexOf(zodiac);
    // Find the base year for this zodiac (1924 is Rat = index 0)
    const baseYear = 1924 + zodiacIndex;
    const years: number[] = [];
    // Generate years from 2024 backwards
    for (let year = 2024; year >= 1930; year--) {
      if ((year - baseYear) % 12 === 0) {
        years.push(year);
      }
    }
    return years.slice(0, BIRTH_YEARS_COUNT);
  };

  return (
    <div className="relative min-h-screen bg-white">
      <Suspense fallback={null}>
        <OAuthRedirectHandler />
      </Suspense>

      {/* Hero Section */}
      <div className="relative min-h-screen flex flex-col items-center justify-center px-4 overflow-hidden">
        <FloatingElements />

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 text-indigo-700 text-sm font-medium mb-8"
          >
            <Sparkles className="w-4 h-4" />
            Trusted by 10,000+ Fortune Seekers
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight"
          >
            Discover Your
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
              Cosmic Destiny
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl md:text-2xl text-gray-600 mb-8 max-w-2xl mx-auto"
          >
            Your Chinese Zodiac holds the key to your career, love life, and fortune. 
            Get personalized insights that actually make sense.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Link href="/auth/login" className="w-full sm:w-auto">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full sm:w-auto px-8 py-4 bg-indigo-600 text-white rounded-2xl font-semibold text-lg shadow-xl shadow-indigo-200 flex items-center justify-center gap-2"
              >
                Get Your Free Reading
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="flex items-center justify-center gap-6 mt-8 text-sm text-gray-500"
          >
            <span className="flex items-center gap-1"><Shield className="w-4 h-4" /> Private & Secure</span>
            <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> Takes 2 Minutes</span>
            <span className="flex items-center gap-1"><Users className="w-4 h-4" /> 10,000+ Users</span>
          </motion.div>
        </div>
      </div>

      {/* Zodiac Showcase */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Which Zodiac Are You?</h2>
            <p className="text-gray-600">Click to explore your sign</p>
          </div>

          <div className="flex justify-start md:justify-center gap-3 overflow-x-auto pb-4 px-4 scrollbar-hide" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
            {ZODIAC_ORDER.map((z) => {
              const config = ZODIAC_CONFIG[z];
              const isActive = z === activeZodiac;
              return (
                <motion.div
                  key={z}
                  onClick={() => setActiveZodiac(z)}
                  className={`flex-shrink-0 cursor-pointer ${isActive ? 'scale-110' : 'opacity-60 hover:opacity-100'}`}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className={`w-16 h-20 rounded-2xl flex flex-col items-center justify-center gap-1 ${isActive ? `bg-gradient-to-br ${config.gradient} text-white` : 'bg-white text-gray-700'}`}>
                    <span className="text-2xl">{config.emoji}</span>
                    <span className="text-xs font-medium">{config.english}</span>
                  </div>
                </motion.div>
              );
            })}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeZodiac}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="max-w-2xl mx-auto mt-8"
            >
              <div className={`p-8 rounded-3xl bg-gradient-to-br ${ZODIAC_CONFIG[activeZodiac].bgGradient}`}>
                <div className="text-center">
                  <div className="text-6xl mb-4">{ZODIAC_CONFIG[activeZodiac].emoji}</div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    Year of the {ZODIAC_CONFIG[activeZodiac].english}
                  </h3>
                  <p className="text-gray-600 mb-4">{ZODIAC_CONFIG[activeZodiac].character} • {ZODIAC_CONFIG[activeZodiac].element} • {ZODIAC_CONFIG[activeZodiac].yinYang}</p>
                  
                  {/* Preview text from zodiac info */}
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-gray-700 text-sm leading-relaxed mb-4 max-w-lg mx-auto"
                  >
                    &ldquo;{getZodiacPreview(activeZodiac)}&rdquo;
                  </motion.p>

                  {/* Birth years */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="mb-6"
                  >
                    <p className="text-xs text-gray-500 mb-2">Born in these years:</p>
                    <div className="flex flex-wrap justify-center gap-2">
                      {getBirthYears(activeZodiac).map((year) => (
                        <span
                          key={year}
                          className="px-3 py-1 bg-white/60 rounded-full text-sm font-medium text-gray-700"
                        >
                          {year}
                        </span>
                      ))}
                    </div>
                  </motion.div>

                  <Link href="/auth/login">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-6 py-3 bg-gray-900 text-white rounded-xl font-medium flex items-center gap-2 mx-auto"
                    >
                      Read Full {ZODIAC_CONFIG[activeZodiac].english} Fortune
                      <ChevronRight className="w-4 h-4" />
                    </motion.button>
                  </Link>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* Benefits - Mobile Optimized */}
      <section className="py-12 md:py-20 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2 md:mb-4">Why 10,000+ People Trust Us</h2>
          </div>

          <div className="flex flex-col md:grid md:grid-cols-3 gap-4 md:gap-8">
            {[
              { icon: Zap, title: "Instant Insights", desc: "Get your personalized reading in under 2 minutes" },
              { icon: TrendingUp, title: "Proven Accuracy", desc: "92% of users say our predictions helped them" },
              { icon: Gift, title: "Completely Free", desc: "Your first reading is on us, no credit card needed" },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl md:flex-col md:text-center md:p-6 md:bg-transparent"
              >
                <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <item.icon className="w-6 h-6 text-indigo-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1 md:mb-2">{item.title}</h3>
                  <p className="text-gray-600 text-sm">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">What People Are Saying</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { name: "Sarah L.", text: "Predicted my promotion 3 months before it happened. Spooky accurate!", stars: 5 },
              { name: "Mike T.", text: "Helped me navigate a tough career decision. The monthly updates are gold.", stars: 5 },
              { name: "Emily R.", text: "Finally understood why certain patterns kept happening in my life.", stars: 5 },
            ].map((review, i) => (
              <motion.div
                key={review.name}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
                className="bg-white p-6 rounded-2xl shadow-sm"
              >
                <div className="flex gap-1 mb-3">
                  {[...Array(review.stars)].map((_, j) => (
                    <Star key={j} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-gray-700 mb-4 text-sm">&ldquo;{review.text}&rdquo;</p>
                <p className="font-medium text-gray-900">{review.name}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-indigo-600">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="max-w-2xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Unlock Your Fortune?
            </h2>
            <p className="text-indigo-100 text-lg mb-8">
              Join thousands who&apos;ve discovered their cosmic path. Your first reading is free.
            </p>
            <Link href="/auth/login">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-white text-indigo-600 rounded-2xl font-semibold text-lg shadow-xl"
              >
                Start Your Free Reading
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
