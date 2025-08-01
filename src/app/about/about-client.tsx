'use client'

import { motion } from 'framer-motion'
import { Star, Gem, Moon, Sun } from 'lucide-react'

export function AboutClient() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 text-white">
      <div className="container mx-auto px-6 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <div className="text-center mb-16">
            <motion.h1
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent mb-6"
            >
              About Mystical Fortune
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl text-purple-200"
            >
              Illuminating Your Path Through Ancient Wisdom
            </motion.p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="space-y-6"
            >
              <div className="backdrop-blur-lg bg-white/10 rounded-2xl p-8 border border-white/20">
                <div className="flex items-center mb-4">
                  <Gem className="w-8 h-8 text-purple-400 mr-3" />
                  <h2 className="text-2xl font-semibold">Our Mission</h2>
                </div>
                <p className="text-purple-100 leading-relaxed">
                  At Mystical Fortune, we bridge the ancient art of divination with modern technology to provide 
                  personalized insights that guide your journey through life's mysteries. Our mission is to make 
                  timeless wisdom accessible to everyone seeking clarity and direction.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="relative"
            >
              <div className="backdrop-blur-lg bg-white/5 rounded-3xl p-8 border border-white/10">
                <div className="flex justify-center space-x-6 mb-6">
                  <Star className="w-12 h-12 text-yellow-400 animate-pulse" />
                  <Moon className="w-12 h-12 text-blue-400 animate-pulse" style={{ animationDelay: '0.5s' }} />
                  <Sun className="w-12 h-12 text-orange-400 animate-pulse" style={{ animationDelay: '1s' }} />
                </div>
                <h3 className="text-xl font-semibold text-center mb-4">Ancient Wisdom, Modern Insight</h3>
                <p className="text-purple-200 text-center">
                  Combining traditional divination methods with cutting-edge AI to deliver accurate, 
                  meaningful readings tailored to your unique energy signature.
                </p>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="backdrop-blur-lg bg-white/10 rounded-2xl p-8 border border-white/20 mb-16"
          >
            <h2 className="text-3xl font-semibold text-center mb-8">What We Offer</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Star className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Personalized Readings</h3>
                <p className="text-purple-200">
                  Tailored fortune readings based on your unique birth details and current life circumstances.
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Gem className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Multiple Divination Methods</h3>
                <p className="text-purple-200">
                  Access to various fortune-telling techniques including tarot, numerology, and astrology.
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Moon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Continuous Guidance</h3>
                <p className="text-purple-200">
                  Regular insights and updates to help you navigate life's changes with confidence and clarity.
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="text-center"
          >
            <div className="backdrop-blur-lg bg-white/10 rounded-2xl p-8 border border-white/20">
              <h2 className="text-3xl font-semibold mb-6">Our Promise</h2>
              <p className="text-lg text-purple-100 leading-relaxed max-w-3xl mx-auto">
                We are committed to providing accurate, compassionate, and empowering readings that honor both 
                ancient traditions and your individual journey. Every reading is crafted with care, respect, 
                and deep understanding of the sacred nature of divination.
              </p>
              <div className="mt-8">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-block bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  Begin Your Journey
                </motion.div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}