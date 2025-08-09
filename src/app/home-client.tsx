"use client";

import { motion } from "framer-motion";
import { Sparkles, Moon, Stars, Heart, ArrowRight, Clock, Users, Shield, Play, Quote } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, Suspense } from "react";
import { useAppInit } from "@/hooks/useAppInit";
import { ContactForm } from "@/components/ui/contact-form";
import { Footer } from "@/components/ui/footer";

// Component to handle OAuth redirect logic
function OAuthRedirectHandler() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [oauthProcessing, setOauthProcessing] = useState(false);

  // Handle OAuth redirect on homepage
  useEffect(() => {
    const handleOAuthRedirect = async () => {
      // Check if we have OAuth parameters from Google
      const code = searchParams.get('code');
      const error = searchParams.get('error');
      
      if (code || error) {
        setOauthProcessing(true);
        
        // Redirect to callback page with all OAuth parameters
        const params = new URLSearchParams();
        searchParams.forEach((value, key) => {
          params.set(key, value);
        });
        
        // Add provider parameter for Google since backend response indicates Google OAuth
        if (code) {
          params.set('provider', 'google');
        }
        
        router.replace(`/auth/callback?${params.toString()}`);
      }
    };

    handleOAuthRedirect();
  }, [searchParams, router]);

  return null; // This component doesn't render anything
}

export default function HomeClient() {
  const { user, isLoading, isAuthenticated } = useAppInit({ requireAuth: false });
  const router = useRouter();
  const [showContactForm, setShowContactForm] = useState(false);

  // Automatically redirect logged-in users to dashboard
  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      router.push("/dashboard");
    }
  }, [isAuthenticated, isLoading, router]);

  return (
    <div className="relative min-h-screen">
      {/* OAuth Redirect Handler (wrapped in Suspense) */}
      <Suspense fallback={null}>
        <OAuthRedirectHandler />
      </Suspense>
      
      {/* Hero Section */}
      <div className="relative min-h-screen overflow-hidden">
        {/* Apple-style Background with Liquid Glass Effect */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Subtle mesh gradient background */}
          <div className="absolute inset-0 opacity-40">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-50/50 via-purple-50/30 to-pink-50/50" />
            <div className="absolute top-1/4 right-0 w-96 h-96 bg-gradient-radial from-blue-200/20 to-transparent rounded-full blur-3xl" />
            <div className="absolute bottom-1/4 left-0 w-80 h-80 bg-gradient-radial from-purple-200/20 to-transparent rounded-full blur-3xl" />
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-radial from-pink-200/15 to-transparent rounded-full blur-2xl" />
          </div>

          {/* Floating Glass Orbs */}
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute"
              style={{
                top: `${20 + Math.random() * 60}%`,
                left: `${10 + Math.random() * 80}%`,
              }}
              animate={{
                y: [0, -20, 0],
                x: [0, 10, 0],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 6 + Math.random() * 4,
                repeat: Infinity,
                delay: Math.random() * 3,
                ease: "easeInOut",
              }}
            >
              <div
                className="w-16 h-16 rounded-full"
                style={{
                  background: "rgba(255, 255, 255, 0.1)",
                  backdropFilter: "blur(20px)",
                  border: "1px solid rgba(255, 255, 255, 0.2)",
                  boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
                }}
              />
            </motion.div>
          ))}
        </div>

        {/* Hero Content */}
        <div className="relative z-10 container mx-auto px-4 py-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center space-y-12"
          >
            {/* Hero Section */}
            <div className="space-y-8 max-w-4xl mx-auto">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1, delay: 0.2 }}
                className="flex justify-center"
              >
                <div
                  className="relative p-8 rounded-3xl"
                  style={{
                    background: "rgba(255, 255, 255, 0.15)",
                    backdropFilter: "blur(20px)",
                    border: "1px solid rgba(255, 255, 255, 0.2)",
                    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
                  }}
                >
                  <motion.div
                    animate={{
                      rotate: [0, 5, -5, 0],
                      scale: [1, 1.05, 1],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    <Moon className="w-16 h-16 text-indigo-600" />
                  </motion.div>

                  {/* Subtle glow effect */}
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-blue-400/20 via-purple-400/20 to-pink-400/20 blur-xl -z-10" />
                </div>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.4 }}
                className="text-6xl md:text-8xl font-light tracking-tight text-gray-900 leading-tight"
                style={{
                  fontWeight: "200",
                  letterSpacing: "-0.02em",
                }}
              >
                Your Fortune Awaits
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.6 }}
                className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto font-light leading-relaxed"
              >
                Discover personalized insights through the ancient wisdom of fortune telling, 
                enhanced by modern technology. Unlock your potential with AI-powered readings 
                tailored to your unique spiritual journey.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.8 }}
                className="flex flex-col sm:flex-row gap-4 justify-center items-center"
              >
                {!isAuthenticated ? (
                  <>
                    <Link href="/auth/login">
                      <motion.button
                        whileHover={{ scale: 1.02, y: -2 }}
                        whileTap={{ scale: 0.98 }}
                        className="group relative px-8 py-4 rounded-2xl text-white font-medium overflow-hidden text-lg"
                        style={{
                          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                          boxShadow: "0 10px 25px rgba(102, 126, 234, 0.3)",
                        }}
                      >
                        <span className="relative z-10 flex items-center gap-2">
                          <Sparkles className="w-5 h-5" />
                          Start Your Journey
                        </span>
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </motion.button>
                    </Link>
                    <motion.button
                      whileHover={{ scale: 1.02, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      className="px-8 py-4 rounded-2xl font-medium text-gray-700 transition-all duration-300 text-lg flex items-center gap-2"
                      style={{
                        background: "rgba(255, 255, 255, 0.7)",
                        backdropFilter: "blur(20px)",
                        border: "1px solid rgba(255, 255, 255, 0.3)",
                      }}
                      onClick={() => setShowContactForm(!showContactForm)}
                    >
                      <Play className="w-5 h-5" />
                      Watch Demo
                    </motion.button>
                  </>
                ) : (
                  <Link href="/dashboard">
                    <motion.button
                      whileHover={{ scale: 1.02, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      className="group relative px-8 py-4 rounded-2xl text-white font-medium overflow-hidden text-lg"
                      style={{
                        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                        boxShadow: "0 10px 25px rgba(102, 126, 234, 0.3)",
                      }}
                    >
                      <span className="relative z-10 flex items-center gap-2">
                        <ArrowRight className="w-5 h-5" />
                        Continue Your Journey
                      </span>
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </motion.button>
                  </Link>
                )}
              </motion.div>

              {/* Trust Indicators */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 1.0 }}
                className="flex flex-col sm:flex-row items-center justify-center gap-8 pt-8"
              >
                <div className="flex items-center gap-2 text-gray-600">
                  <Users className="w-5 h-5" />
                  <span className="text-sm">10,000+ Happy Users</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Shield className="w-5 h-5" />
                  <span className="text-sm">100% Private & Secure</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Stars className="w-5 h-5" />
                  <span className="text-sm">5-Star Experience</span>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-6">
              Fortune Cookie Features for Your Journey
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover the perfect blend of ancient wisdom and cutting-edge technology
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {features.map((feature, index) => (
              <FeatureCard key={feature.title} feature={feature} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-6">
              Your Journey in Three Simple Steps
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Getting started with personalized fortune readings has never been easier
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {steps.map((step, index) => (
              <StepCard key={step.title} step={step} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-6">
              What Our Users Say
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Real stories from people who've transformed their lives with Fortune-Cookie.me
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard key={testimonial.name} testimonial={testimonial} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-6">
                Get in Touch
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Have questions about your spiritual journey? We're here to help you every step of the way.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="space-y-8"
              >
                <div>
                  <h3 className="text-2xl font-medium text-gray-900 mb-4">
                    Connect With Us
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    Whether you're seeking guidance, have technical questions, or want to share your 
                    fortune-telling experience, our team is always ready to listen and help.
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-indigo-100">
                      <Clock className="w-5 h-5 text-indigo-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Response Time</p>
                      <p className="text-gray-600">Usually within 24 hours</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-green-100">
                      <Shield className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Privacy First</p>
                      <p className="text-gray-600">Your information is always secure</p>
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <ContactForm />
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}

const features = [
  {
    icon: Sparkles,
    title: "Personalized Readings",
    description: "AI-powered fortune analysis tailored to your birth information, current circumstances, and spiritual journey.",
    color: "from-blue-500 to-indigo-600",
  },
  {
    icon: Moon,
    title: "Weekly Insights",
    description: "Regular fortune updates and cosmic guidance to help you navigate life's challenges with confidence.",
    color: "from-purple-500 to-pink-600",
  },
  {
    icon: Heart,
    title: "Spiritual Growth",
    description: "Track your personal development and spiritual evolution with beautiful, intuitive progress tools.",
    color: "from-pink-500 to-rose-500",
  },
];

const steps = [
  {
    number: "01",
    title: "Create Your Profile",
    description: "Share your birth information and personal details to create a cosmic blueprint unique to you.",
    icon: Users,
  },
  {
    number: "02", 
    title: "Get Your Reading",
    description: "Receive personalized fortune insights powered by ancient wisdom and modern AI technology.",
    icon: Stars,
  },
  {
    number: "03",
    title: "Track Your Journey",
    description: "Monitor your spiritual growth and life changes with weekly updates and progress tracking.",
    icon: Heart,
  },
];

const testimonials = [
  {
    name: "Sarah Chen",
    role: "Marketing Director",
    content: "Fortune-Cookie.me has completely transformed how I approach life decisions. The weekly readings are incredibly insightful and have helped me navigate challenging times with confidence.",
    avatar: "SC",
  },
  {
    name: "Maria Rodriguez",
    role: "Entrepreneur", 
    content: "I was skeptical at first, but the accuracy of the readings is remarkable. It's like having a wise friend who always knows exactly what to say.",
    avatar: "MR",
  },
  {
    name: "Emma Thompson",
    role: "Creative Director",
    content: "The personalized insights have helped me understand myself better and make more aligned choices. This platform is a game-changer for personal growth.",
    avatar: "ET",
  },
];

function FeatureCard({ feature, index }: { feature: (typeof features)[0]; index: number }) {
  const Icon = feature.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: index * 0.2 }}
      whileHover={{ y: -8, transition: { duration: 0.2 } }}
      className="group relative p-8 rounded-3xl cursor-pointer"
      style={{
        background: "rgba(255, 255, 255, 0.8)",
        backdropFilter: "blur(20px)",
        border: "1px solid rgba(255, 255, 255, 0.4)",
        boxShadow: "0 12px 40px rgba(0, 0, 0, 0.15)",
      }}
    >
      <div className="space-y-4">
        <div
          className="w-14 h-14 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300"
          style={{
            background: `linear-gradient(135deg, ${feature.color.split(' ')[1]}, ${feature.color.split(' ')[3]})`,
          }}
        >
          <Icon className="w-7 h-7 text-white" />
        </div>

        <h3 className="text-xl font-medium text-gray-900 group-hover:text-indigo-700 transition-colors">
          {feature.title}
        </h3>

        <p className="text-gray-600 leading-relaxed">
          {feature.description}
        </p>
      </div>

      <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-blue-400/10 via-purple-400/10 to-pink-400/10 opacity-50 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
    </motion.div>
  );
}

function StepCard({ step, index }: { step: (typeof steps)[0]; index: number }) {
  const Icon = step.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: index * 0.2 }}
      className="text-center space-y-6"
    >
      <div className="relative">
        <div
          className="w-20 h-20 rounded-full flex items-center justify-center mx-auto"
          style={{
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          }}
        >
          <Icon className="w-10 h-10 text-white" />
        </div>
        <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-white shadow-lg flex items-center justify-center text-sm font-bold text-indigo-600">
          {step.number}
        </div>
      </div>

      <h3 className="text-xl font-medium text-gray-900">{step.title}</h3>
      <p className="text-gray-600 leading-relaxed">{step.description}</p>
    </motion.div>
  );
}

function TestimonialCard({ testimonial, index }: { testimonial: (typeof testimonials)[0]; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: index * 0.2 }}
      className="p-6 rounded-3xl"
      style={{
        background: "rgba(255, 255, 255, 0.6)",
        backdropFilter: "blur(20px)",
        border: "1px solid rgba(255, 255, 255, 0.3)",
        boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Quote className="w-8 h-8 text-indigo-400 mb-4" />
      <p className="text-gray-700 leading-relaxed mb-6">{testimonial.content}</p>
      
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center text-white font-medium">
          {testimonial.avatar}
        </div>
        <div>
          <p className="font-medium text-gray-900">{testimonial.name}</p>
          <p className="text-sm text-gray-600">{testimonial.role}</p>
        </div>
      </div>
    </motion.div>
  );
}