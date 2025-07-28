'use client'

import { motion } from 'framer-motion'
import { Mail, MessageCircle, Phone, MapPin, Clock } from 'lucide-react'
import { ContactForm } from '@/components/ui/contact-form'

export default function Contact() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 text-white">
      <div className="container mx-auto px-6 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-6xl mx-auto"
        >
          <div className="text-center mb-16">
            <motion.h1
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent mb-6"
            >
              Contact Us
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl text-purple-200 max-w-3xl mx-auto"
            >
              Have a question about your reading? Need help with your account? 
              We're here to guide you on your mystical journey.
            </motion.p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <div className="mb-8">
                <h2 className="text-3xl font-semibold mb-4">Send us a Message</h2>
                <p className="text-purple-200">
                  Fill out the form below and we'll get back to you as soon as possible. 
                  We typically respond within 24 hours.
                </p>
              </div>
              
              <ContactForm className="w-full" />
            </motion.div>

            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="space-y-8"
            >
              <div>
                <h2 className="text-3xl font-semibold mb-6">Get in Touch</h2>
                <p className="text-purple-200 mb-8">
                  We're always here to help you navigate your spiritual journey. 
                  Choose the method that works best for you.
                </p>
              </div>

              <div className="space-y-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 1 }}
                  className="backdrop-blur-lg bg-white/10 rounded-2xl p-6 border border-white/20"
                >
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mr-4">
                      <Mail className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold">Email Support</h3>
                      <p className="text-purple-300">support@mysticalfortune.com</p>
                    </div>
                  </div>
                  <p className="text-purple-200 text-sm">
                    For general inquiries, technical support, and account assistance.
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 1.2 }}
                  className="backdrop-blur-lg bg-white/10 rounded-2xl p-6 border border-white/20"
                >
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mr-4">
                      <MessageCircle className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold">Live Chat</h3>
                      <p className="text-purple-300">Available 24/7</p>
                    </div>
                  </div>
                  <p className="text-purple-200 text-sm">
                    Get instant help with our AI-powered chat assistant, available around the clock.
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 1.4 }}
                  className="backdrop-blur-lg bg-white/10 rounded-2xl p-6 border border-white/20"
                >
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full flex items-center justify-center mr-4">
                      <Clock className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold">Response Time</h3>
                      <p className="text-purple-300">Within 24 hours</p>
                    </div>
                  </div>
                  <p className="text-purple-200 text-sm">
                    We aim to respond to all inquiries within 24 hours, usually much sooner.
                  </p>
                </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.6 }}
                className="backdrop-blur-lg bg-white/10 rounded-2xl p-6 border border-white/20"
              >
                <h3 className="text-xl font-semibold mb-4">Frequently Asked Questions</h3>
                <div className="space-y-3 text-sm">
                  <div>
                    <p className="font-medium text-purple-300">How accurate are the readings?</p>
                    <p className="text-purple-200">Our AI combines traditional divination methods with personalized data analysis for highly accurate insights.</p>
                  </div>
                  <div>
                    <p className="font-medium text-purple-300">Can I get a refund?</p>
                    <p className="text-purple-200">Yes, we offer a 30-day satisfaction guarantee for all our services.</p>
                  </div>
                  <div>
                    <p className="font-medium text-purple-300">How often should I get readings?</p>
                    <p className="text-purple-200">This depends on your personal journey. Monthly readings are popular for ongoing guidance.</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}