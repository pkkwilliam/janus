'use client'

import { motion } from 'framer-motion'
import { BookOpen, Heart, Sparkles, Users, Clock, Globe } from 'lucide-react'

export default function OurStory() {
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
              Our Story
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl text-purple-200"
            >
              A Journey from Ancient Wisdom to Digital Innovation
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="backdrop-blur-lg bg-white/10 rounded-2xl p-8 border border-white/20 mb-12"
          >
            <div className="flex items-center mb-6">
              <BookOpen className="w-8 h-8 text-purple-400 mr-3" />
              <h2 className="text-3xl font-semibold">The Beginning</h2>
            </div>
            <p className="text-lg text-purple-100 leading-relaxed mb-6">
              Our story began in a small mystical bookshop tucked away in the heart of an ancient city. 
              Surrounded by centuries-old texts on divination, astrology, and the esoteric arts, our founder 
              discovered a profound calling to bridge the gap between timeless wisdom and the modern world.
            </p>
            <p className="text-lg text-purple-100 leading-relaxed">
              What started as late-night sessions with tarot cards and star charts evolved into a vision: 
              to make the transformative power of mystical guidance accessible to anyone, anywhere, at any time.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="backdrop-blur-lg bg-white/10 rounded-2xl p-6 border border-white/20"
            >
              <div className="flex items-center mb-4">
                <Heart className="w-6 h-6 text-pink-400 mr-3" />
                <h3 className="text-xl font-semibold">The Inspiration</h3>
              </div>
              <p className="text-purple-200 leading-relaxed">
                We witnessed countless individuals seeking guidance during life's most challenging moments. 
                Traditional fortune-telling, while powerful, was often inaccessible due to location, cost, 
                or availability. We knew there had to be a better way.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 1 }}
              className="backdrop-blur-lg bg-white/10 rounded-2xl p-6 border border-white/20"
            >
              <div className="flex items-center mb-4">
                <Sparkles className="w-6 h-6 text-yellow-400 mr-3" />
                <h3 className="text-xl font-semibold">The Innovation</h3>
              </div>
              <p className="text-purple-200 leading-relaxed">
                By combining ancient divination techniques with advanced AI technology, we created a platform 
                that maintains the authenticity and depth of traditional readings while offering unprecedented 
                accessibility and personalization.
              </p>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="backdrop-blur-lg bg-white/10 rounded-2xl p-8 border border-white/20 mb-12"
          >
            <h2 className="text-3xl font-semibold text-center mb-8">Our Journey</h2>
            <div className="space-y-8">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <Clock className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="text-xl font-semibold mb-2">2019 - The Vision</h4>
                  <p className="text-purple-200">
                    Founded with a simple belief: everyone deserves access to spiritual guidance. 
                    We began developing our proprietary divination algorithms.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="text-xl font-semibold mb-2">2021 - Building Community</h4>
                  <p className="text-purple-200">
                    Launched our beta platform and welcomed our first thousand seekers. 
                    Their feedback shaped our understanding of what truly matters in digital divination.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <Globe className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="text-xl font-semibold mb-2">2024 - Global Reach</h4>
                  <p className="text-purple-200">
                    Today, we serve millions of users worldwide, offering personalized readings in multiple 
                    languages while continuously refining our approach to honor both tradition and innovation.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.4 }}
            className="text-center"
          >
            <div className="backdrop-blur-lg bg-white/10 rounded-2xl p-8 border border-white/20">
              <h2 className="text-3xl font-semibold mb-6">Looking Forward</h2>
              <p className="text-lg text-purple-100 leading-relaxed max-w-3xl mx-auto mb-6">
                Our story is far from over. Every day, we continue to learn from our community, 
                refine our methods, and explore new ways to bring clarity and wisdom to those who seek it. 
                We remain committed to our founding principles: authenticity, accessibility, and the 
                transformative power of ancient wisdom in modern times.
              </p>
              <p className="text-xl font-semibold text-purple-300">
                Your journey is part of our story, and our story is part of yours.
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}