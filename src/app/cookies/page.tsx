'use client'

import { motion } from 'framer-motion'
import { Cookie, Settings, BarChart3, Shield, Eye, Trash2, Calendar, CheckCircle } from 'lucide-react'
import { useState } from 'react'

const cookieCategories = [
  {
    id: 'essential',
    title: 'Essential Cookies',
    icon: Shield,
    required: true,
    description: 'These cookies are necessary for the website to function and cannot be switched off.',
    examples: [
      'Authentication tokens to keep you logged in',
      'Security cookies to prevent fraud',
      'Shopping cart and session management',
      'Language and region preferences'
    ],
    retention: 'Session or up to 1 year'
  },
  {
    id: 'analytics',
    title: 'Analytics Cookies',
    icon: BarChart3,
    required: false,
    description: 'These cookies help us understand how visitors interact with our website.',
    examples: [
      'Page views and user journeys',
      'Popular content and features',
      'Performance metrics and load times',
      'Error tracking and debugging'
    ],
    retention: 'Up to 2 years'
  },
  {
    id: 'functional',
    title: 'Functional Cookies',
    icon: Settings,
    required: false,
    description: 'These cookies enable enhanced functionality and personalization.',
    examples: [
      'Reading preferences and settings',
      'Dashboard layout customization',
      'Notification preferences',
      'Theme and display options'
    ],
    retention: 'Up to 1 year'
  },
  {
    id: 'marketing',
    title: 'Marketing Cookies',
    icon: Eye,
    required: false,
    description: 'These cookies track your activity to provide relevant advertisements.',
    examples: [
      'Ad personalization and targeting',
      'Campaign effectiveness tracking',
      'Social media integration',
      'Third-party advertising services'
    ],
    retention: 'Up to 13 months'
  }
]

const cookieManagement = [
  {
    title: 'Browser Settings',
    description: 'Most browsers allow you to control cookies through their settings.',
    steps: [
      'Access your browser\'s settings or preferences',
      'Look for "Privacy" or "Security" options',
      'Find the "Cookies" or "Site Data" section',
      'Choose your preferred cookie settings'
    ]
  },
  {
    title: 'Our Cookie Preferences',
    description: 'Use our cookie preference center to customize your settings.',
    steps: [
      'Click the "Cookie Settings" button below',
      'Toggle categories on or off as desired',
      'Essential cookies cannot be disabled',
      'Save your preferences'
    ]
  }
]

export default function Cookies() {
  const [cookiePreferences, setCookiePreferences] = useState({
    essential: true,
    analytics: true,
    functional: true,
    marketing: false
  })

  const [showPreferences, setShowPreferences] = useState(false)

  const handlePreferenceChange = (category: string, enabled: boolean) => {
    if (category === 'essential') return // Cannot disable essential cookies
    
    setCookiePreferences(prev => ({
      ...prev,
      [category]: enabled
    }))
  }

  const savePreferences = () => {
    // In a real app, this would save to localStorage or send to server
    console.log('Saving cookie preferences:', cookiePreferences)
    setShowPreferences(false)
    // Show success message or toast
  }

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
              Cookie Policy
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl text-purple-200 max-w-3xl mx-auto mb-6"
            >
              Learn about how we use cookies to improve your experience and how you can control them.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex items-center justify-center space-x-2 text-purple-300"
            >
              <Calendar className="w-5 h-5" />
              <span>Last updated: July 25, 2024</span>
            </motion.div>
          </div>

          {/* What are Cookies */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="backdrop-blur-lg bg-white/10 rounded-2xl p-8 border border-white/20 mb-12"
          >
            <div className="flex items-center mb-6">
              <Cookie className="w-8 h-8 text-purple-400 mr-3" />
              <h2 className="text-3xl font-semibold">What are Cookies?</h2>
            </div>
            <div className="space-y-4 text-purple-200 leading-relaxed">
              <p>
                Cookies are small text files that are placed on your device when you visit our website. 
                They help us provide you with a better, faster, and safer experience by remembering your 
                preferences and improving our services.
              </p>
              <p>
                We use different types of cookies for various purposes, from essential functionality 
                to analytics and personalization. You have control over which cookies you accept, 
                except for those that are strictly necessary for the website to function.
              </p>
            </div>
          </motion.div>

          {/* Cookie Categories */}
          <div className="space-y-8 mb-12">
            {cookieCategories.map((category, index) => {
              const Icon = category.icon
              const isEnabled = cookiePreferences[category.id as keyof typeof cookiePreferences]
              
              return (
                <motion.div
                  key={category.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 1 + index * 0.1 }}
                  className="backdrop-blur-lg bg-white/10 rounded-2xl p-8 border border-white/20"
                >
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex items-center">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center mr-4 ${
                        category.required 
                          ? 'bg-gradient-to-br from-green-500 to-emerald-500'
                          : 'bg-gradient-to-br from-purple-500 to-pink-500'
                      }`}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-semibold">{category.title}</h3>
                        {category.required && (
                          <span className="inline-block px-3 py-1 rounded-full bg-green-500/20 text-green-400 text-sm font-medium mt-2">
                            Required
                          </span>
                        )}
                      </div>
                    </div>
                    
                    {!category.required && (
                      <label className="flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={isEnabled}
                          onChange={(e) => handlePreferenceChange(category.id, e.target.checked)}
                          className="sr-only"
                        />
                        <div className={`w-12 h-6 rounded-full transition-all ${
                          isEnabled ? 'bg-purple-600' : 'bg-gray-600'
                        }`}>
                          <div className={`w-5 h-5 bg-white rounded-full transition-all transform ${
                            isEnabled ? 'translate-x-6' : 'translate-x-0.5'
                          } mt-0.5`} />
                        </div>
                      </label>
                    )}
                  </div>
                  
                  <p className="text-purple-200 leading-relaxed mb-6">{category.description}</p>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-medium text-purple-300 mb-3">Examples:</h4>
                      <ul className="space-y-2">
                        {category.examples.map((example, idx) => (
                          <li key={idx} className="flex items-start space-x-2 text-purple-200 text-sm">
                            <div className="w-2 h-2 rounded-full bg-purple-400 mt-2 flex-shrink-0" />
                            <span>{example}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-medium text-purple-300 mb-3">Data Retention:</h4>
                      <p className="text-purple-200 text-sm">{category.retention}</p>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>

          {/* Cookie Management */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.6 }}
            className="backdrop-blur-lg bg-white/10 rounded-2xl p-8 border border-white/20 mb-12"
          >
            <div className="flex items-center mb-6">
              <Settings className="w-8 h-8 text-cyan-400 mr-3" />
              <h2 className="text-3xl font-semibold">Managing Your Cookie Preferences</h2>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              {cookieManagement.map((method, index) => (
                <div key={index} className="bg-white/5 rounded-xl p-6 border border-white/10">
                  <h3 className="text-xl font-semibold mb-4 text-purple-300">{method.title}</h3>
                  <p className="text-purple-200 mb-4 text-sm">{method.description}</p>
                  <ol className="space-y-2">
                    {method.steps.map((step, stepIndex) => (
                      <li key={stepIndex} className="flex items-start space-x-3 text-purple-200 text-sm">
                        <span className="w-6 h-6 bg-purple-600 rounded-full flex items-center justify-center text-white text-xs font-medium flex-shrink-0">
                          {stepIndex + 1}
                        </span>
                        <span>{step}</span>
                      </li>
                    ))}
                  </ol>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Third-Party Cookies */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.8 }}
            className="backdrop-blur-lg bg-white/10 rounded-2xl p-8 border border-white/20 mb-12"
          >
            <h2 className="text-3xl font-semibold mb-6">Third-Party Cookies</h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-purple-300 mb-3">Analytics Services</h3>
                <p className="text-purple-200 leading-relaxed mb-2">
                  We use Google Analytics to understand how users interact with our website. 
                  These cookies help us improve our services and user experience.
                </p>
                <p className="text-purple-400 text-sm">
                  You can opt out of Google Analytics tracking by visiting: 
                  <a href="https://tools.google.com/dlpage/gaoptout" className="text-cyan-400 hover:underline ml-1">
                    Google Analytics Opt-out
                  </a>
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-medium text-purple-300 mb-3">Payment Processing</h3>
                <p className="text-purple-200 leading-relaxed">
                  Stripe, our payment processor, may set cookies to prevent fraud and ensure secure transactions. 
                  These cookies are essential for payment processing and cannot be disabled if you wish to make purchases.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-medium text-purple-300 mb-3">Social Media</h3>
                <p className="text-purple-200 leading-relaxed">
                  If you interact with social media features on our site, those platforms may set their own cookies. 
                  Please refer to their respective privacy policies for more information.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Cookie Preferences Panel */}
          {showPreferences && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-6"
            >
              <div className="backdrop-blur-lg bg-white/10 rounded-2xl p-8 border border-white/20 max-w-2xl w-full max-h-[80vh] overflow-y-auto">
                <h3 className="text-2xl font-semibold mb-6">Cookie Preferences</h3>
                <div className="space-y-4 mb-8">
                  {cookieCategories.map((category) => {
                    const isEnabled = cookiePreferences[category.id as keyof typeof cookiePreferences]
                    
                    return (
                      <div key={category.id} className="flex items-center justify-between p-4 rounded-xl bg-white/5">
                        <div>
                          <h4 className="font-medium">{category.title}</h4>
                          <p className="text-purple-300 text-sm">{category.description}</p>
                        </div>
                        <label className="flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={isEnabled}
                            disabled={category.required}
                            onChange={(e) => handlePreferenceChange(category.id, e.target.checked)}
                            className="sr-only"
                          />
                          <div className={`w-12 h-6 rounded-full transition-all ${
                            isEnabled ? 'bg-purple-600' : 'bg-gray-600'
                          } ${category.required ? 'opacity-50' : ''}`}>
                            <div className={`w-5 h-5 bg-white rounded-full transition-all transform ${
                              isEnabled ? 'translate-x-6' : 'translate-x-0.5'
                            } mt-0.5`} />
                          </div>
                        </label>
                      </div>
                    )
                  })}
                </div>
                <div className="flex space-x-4">
                  <motion.button
                    onClick={savePreferences}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-xl font-medium transition-all hover:shadow-lg"
                  >
                    Save Preferences
                  </motion.button>
                  <motion.button
                    onClick={() => setShowPreferences(false)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-6 py-3 rounded-xl border border-white/20 text-white hover:bg-white/10 transition-all"
                  >
                    Cancel
                  </motion.button>
                </div>
              </div>
            </motion.div>
          )}

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 2 }}
            className="text-center"
          >
            <div className="backdrop-blur-lg bg-white/10 rounded-2xl p-8 border border-white/20">
              <h2 className="text-2xl font-semibold mb-4">Manage Your Cookie Settings</h2>
              <p className="text-purple-200 mb-6 max-w-2xl mx-auto">
                You can customize your cookie preferences at any time. Remember that disabling certain 
                cookies may affect the functionality of our website.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.button
                  onClick={() => setShowPreferences(true)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  Cookie Settings
                </motion.button>
                <motion.a
                  href="/privacy"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white/10 text-white border border-white/20 px-8 py-3 rounded-full font-semibold hover:bg-white/20 transition-all duration-300"
                >
                  Privacy Policy
                </motion.a>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}