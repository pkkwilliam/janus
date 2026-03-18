'use client'

import { motion } from 'framer-motion'
import { Search, HelpCircle, Book, Users, Settings, CreditCard, Shield, MessageCircle } from 'lucide-react'
import { useState } from 'react'

const faqCategories = [
  {
    id: 'getting-started',
    title: 'Getting Started',
    icon: Book,
    questions: [
      {
        q: 'How do I create an account?',
        a: 'Click "Sign Up" in the top right corner, provide your email and create a secure password. You\'ll receive a verification email to activate your account.'
      },
      {
        q: 'What information do I need for my first reading?',
        a: 'For the most accurate reading, provide your birth date, time, and location. However, you can still get meaningful insights with just your birth date.'
      },
      {
        q: 'How long does it take to generate a reading?',
        a: 'Most readings are generated instantly. Complex yearly reports may take up to 1 minute to complete.'
      }
    ]
  },
  {
    id: 'readings',
    title: 'Readings & Reports',
    icon: HelpCircle,
    questions: [
      {
        q: 'How accurate are your readings?',
        a: 'Our AI combines traditional divination methods with sophisticated algorithms and your personal data for highly accurate insights. Accuracy improves with more complete profile information.'
      },
      {
        q: 'Can I get multiple readings per day?',
        a: 'Yes, but we recommend spacing readings apart for the most meaningful insights. Daily readings work best when focused on different life areas.'
      },
      {
        q: 'What types of readings do you offer?',
        a: 'We offer daily insights, weekly forecasts, monthly reports, yearly overviews, and specialized readings for love, career, and spiritual growth.'
      },
      {
        q: 'Can I save or print my readings?',
        a: 'Yes, all readings are automatically saved to your account. You can view your reading history anytime and print them from your browser.'
      }
    ]
  },
  {
    id: 'billing',
    title: 'Billing & Subscriptions',
    icon: CreditCard,
    questions: [
      {
        q: 'What payment methods do you accept?',
        a: 'We accept all major credit cards, debit cards, and digital wallets through Stripe. Your payment information is securely encrypted.'
      },
      {
        q: 'Can I cancel my subscription anytime?',
        a: 'Yes, you can cancel your subscription at any time from your account settings. You\'ll continue to have access until the end of your current billing period.'
      },
      {
        q: 'Do you offer refunds?',
        a: 'We offer a 30-day satisfaction guarantee. If you\'re not happy with our service, contact us for a full refund within 30 days of purchase.'
      },
      {
        q: 'What\'s the difference between monthly and yearly plans?',
        a: 'Yearly plans offer 80% savings compared to monthly billing. Both plans include unlimited readings and priority support.'
      }
    ]
  },
  {
    id: 'account',
    title: 'Account & Settings',
    icon: Settings,
    questions: [
      {
        q: 'How do I update my profile information?',
        a: 'Go to Settings > Profile to update your birth details, preferences, and notification settings. More accurate information leads to better readings.'
      },
      {
        q: 'I forgot my password. How do I reset it?',
        a: 'Click "Forgot Password" on the login page and enter your email. You\'ll receive a secure reset link within a few minutes.'
      },
      {
        q: 'How do I delete my account?',
        a: 'Contact our support team to request account deletion. All your data will be permanently removed within 30 days.'
      }
    ]
  },
  {
    id: 'privacy',
    title: 'Privacy & Security',
    icon: Shield,
    questions: [
      {
        q: 'How do you protect my personal information?',
        a: 'We use industry-standard encryption and never share your personal data with third parties. Your readings and profile are completely private.'
      },
      {
        q: 'Who can see my readings?',
        a: 'Only you can access your readings. Our AI generates personalized content without human intervention, ensuring complete privacy.'
      },
      {
        q: 'Do you store my birth information?',
        a: 'Yes, we securely store your birth details to provide consistent, accurate readings. This data is encrypted and never shared.'
      }
    ]
  }
]

export default function HelpCenter() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('getting-started')
  const [expandedQuestion, setExpandedQuestion] = useState<string | null>(null)

  const filteredQuestions = faqCategories
    .find(cat => cat.id === selectedCategory)
    ?.questions.filter(q => 
      q.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.a.toLowerCase().includes(searchQuery.toLowerCase())
    ) || []

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
              Help Center
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl text-purple-200 max-w-3xl mx-auto"
            >
              Find answers to your questions and get the most out of your mystical journey
            </motion.p>
          </div>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mb-12"
          >
            <div className="relative max-w-2xl mx-auto">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-purple-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search for help..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 rounded-2xl backdrop-blur-lg bg-white/10 border border-white/20 text-white placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
              />
            </div>
          </motion.div>

          <div className="grid lg:grid-cols-4 gap-8">
            {/* Category Navigation */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="lg:col-span-1"
            >
              <h2 className="text-2xl font-semibold mb-6">Categories</h2>
              <div className="space-y-3">
                {faqCategories.map((category) => {
                  const Icon = category.icon
                  return (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`w-full flex items-center space-x-3 p-4 rounded-xl transition-all ${
                        selectedCategory === category.id
                          ? 'bg-purple-600/30 border border-purple-500/50'
                          : 'bg-white/5 border border-white/10 hover:bg-white/10'
                      }`}
                    >
                      <Icon className="w-5 h-5 text-purple-400" />
                      <span className="font-medium">{category.title}</span>
                    </button>
                  )
                })}
              </div>

              <div className="mt-8 p-6 rounded-xl bg-white/5 border border-white/10">
                <div className="flex items-center mb-4">
                  <MessageCircle className="w-6 h-6 text-purple-400 mr-3" />
                  <h3 className="text-lg font-semibold">Still Need Help?</h3>
                </div>
                <p className="text-purple-200 text-sm mb-4">
                  Can't find what you're looking for? Our support team is here to help.
                </p>
                <motion.a
                  href="/contact"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-block w-full text-center bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-lg font-medium transition-all hover:shadow-lg"
                >
                  Contact Support
                </motion.a>
              </div>
            </motion.div>

            {/* FAQ Content */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 1 }}
              className="lg:col-span-3"
            >
              <div className="backdrop-blur-lg bg-white/10 rounded-2xl p-8 border border-white/20">
                <h2 className="text-3xl font-semibold mb-8">
                  {faqCategories.find(cat => cat.id === selectedCategory)?.title}
                </h2>
                
                <div className="space-y-4">
                  {filteredQuestions.map((faq, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="border border-white/10 rounded-xl overflow-hidden"
                    >
                      <button
                        onClick={() => setExpandedQuestion(
                          expandedQuestion === `${selectedCategory}-${index}` 
                            ? null 
                            : `${selectedCategory}-${index}`
                        )}
                        className="w-full flex items-center justify-between p-6 text-left hover:bg-white/5 transition-all"
                      >
                        <span className="font-medium text-lg">{faq.q}</span>
                        <motion.div
                          animate={{ rotate: expandedQuestion === `${selectedCategory}-${index}` ? 180 : 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <HelpCircle className="w-5 h-5 text-purple-400" />
                        </motion.div>
                      </button>
                      
                      <motion.div
                        initial={false}
                        animate={{
                          height: expandedQuestion === `${selectedCategory}-${index}` ? 'auto' : 0,
                          opacity: expandedQuestion === `${selectedCategory}-${index}` ? 1 : 0
                        }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="p-6 pt-0 text-purple-200 leading-relaxed">
                          {faq.a}
                        </div>
                      </motion.div>
                    </motion.div>
                  ))}
                </div>

                {filteredQuestions.length === 0 && searchQuery && (
                  <div className="text-center py-12">
                    <p className="text-purple-300 text-lg">
                      No results found for "{searchQuery}"
                    </p>
                    <p className="text-purple-400 mt-2">
                      Try a different search term or browse categories
                    </p>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}