'use client'

import { motion } from 'framer-motion'
import { UserPlus, Calendar, Star, BookOpen, Settings, TrendingUp, CheckCircle, ArrowRight } from 'lucide-react'
import { useState } from 'react'

const steps = [
  {
    id: 1,
    title: 'Create Your Account',
    icon: UserPlus,
    description: 'Sign up with your email and create a secure password to begin your mystical journey.',
    details: [
      'Click "Sign Up" in the top navigation',
      'Enter your email address',
      'Create a strong password',
      'Verify your email to activate your account'
    ]
  },
  {
    id: 2,
    title: 'Complete Your Profile',
    icon: Calendar,
    description: 'Provide your birth details for the most accurate and personalized readings.',
    details: [
      'Enter your birth date (required)',
      'Add birth time if known (improves accuracy)',
      'Include birth location for astrological readings',
      'Set your reading preferences and notifications'
    ]
  },
  {
    id: 3,
    title: 'Choose Your Subscription',
    icon: Star,
    description: 'Select a plan that fits your spiritual journey and unlock unlimited readings.',
    details: [
      'Browse monthly and yearly subscription options',
      'Yearly plans offer significant savings',
      'All plans include unlimited readings',
      'Affordable pricing starting at $2/month'
    ]
  },
  {
    id: 4,
    title: 'Get Your First Reading',
    icon: BookOpen,
    description: 'Generate your first personalized reading and explore the insights waiting for you.',
    details: [
      'Visit your dashboard',
      'Click "Generate Report" for comprehensive insights',
      'Explore daily, weekly, and monthly readings',
      'Save meaningful readings for future reference'
    ]
  },
  {
    id: 5,
    title: 'Customize Your Experience',
    icon: Settings,
    description: 'Adjust settings and preferences to tailor your mystical experience.',
    details: [
      'Set notification preferences',
      'Choose your preferred reading types',
      'Customize your dashboard layout',
      'Enable reading reminders and insights'
    ]
  },
  {
    id: 6,
    title: 'Track Your Journey',
    icon: TrendingUp,
    description: 'Monitor your spiritual growth and revisit past insights as your journey unfolds.',
    details: [
      'View your reading history',
      'Track patterns and recurring themes',
      'Compare readings over time',
      'Export important insights'
    ]
  }
]

const tips = [
  {
    title: 'Best Time for Readings',
    content: 'Morning readings often provide clearer insights as your mind is fresh and receptive to spiritual guidance.'
  },
  {
    title: 'Reading Frequency',
    content: 'While you can get multiple readings daily, we recommend focusing on one major question per reading for deeper insights.'
  },
  {
    title: 'Birth Information',
    content: 'The more accurate your birth details, the more personalized your readings become. Birth time is especially important for astrological insights.'
  },
  {
    title: 'Reading Interpretation',
    content: 'Trust your intuition when interpreting readings. The guidance resonates differently for each person\'s unique situation.'
  }
]

export default function GettingStarted() {
  const [completedSteps, setCompletedSteps] = useState<number[]>([])
  const [activeStep, setActiveStep] = useState<number | null>(null)

  const toggleStep = (stepId: number) => {
    if (completedSteps.includes(stepId)) {
      setCompletedSteps(prev => prev.filter(id => id !== stepId))
    } else {
      setCompletedSteps(prev => [...prev, stepId])
    }
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
              Getting Started
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl text-purple-200 max-w-3xl mx-auto"
            >
              Welcome to your mystical journey. Follow these simple steps to unlock 
              personalized insights and spiritual guidance.
            </motion.p>
          </div>

          {/* Progress Overview */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="backdrop-blur-lg bg-white/10 rounded-2xl p-6 border border-white/20 mb-12"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-semibold">Your Progress</h2>
              <span className="text-purple-300">
                {completedSteps.length} of {steps.length} completed
              </span>
            </div>
            <div className="w-full bg-white/10 rounded-full h-3">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${(completedSteps.length / steps.length) * 100}%` }}
                transition={{ duration: 0.8 }}
                className="bg-gradient-to-r from-purple-500 to-pink-500 h-3 rounded-full"
              />
            </div>
          </motion.div>

          {/* Steps */}
          <div className="space-y-6 mb-16">
            {steps.map((step, index) => {
              const Icon = step.icon
              const isCompleted = completedSteps.includes(step.id)
              const isActive = activeStep === step.id

              return (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                  className={`backdrop-blur-lg rounded-2xl border transition-all ${
                    isCompleted
                      ? 'bg-green-500/20 border-green-500/50'
                      : 'bg-white/10 border-white/20 hover:bg-white/15'
                  }`}
                >
                  <div
                    className="p-6 cursor-pointer"
                    onClick={() => setActiveStep(isActive ? null : step.id)}
                  >
                    <div className="flex items-center space-x-4">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                        isCompleted
                          ? 'bg-green-500'
                          : 'bg-gradient-to-br from-purple-500 to-pink-500'
                      }`}>
                        {isCompleted ? (
                          <CheckCircle className="w-6 h-6 text-white" />
                        ) : (
                          <Icon className="w-6 h-6 text-white" />
                        )}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                        <p className="text-purple-200">{step.description}</p>
                      </div>
                      <motion.div
                        animate={{ rotate: isActive ? 90 : 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <ArrowRight className="w-5 h-5 text-purple-400" />
                      </motion.div>
                    </div>
                  </div>

                  <motion.div
                    initial={false}
                    animate={{
                      height: isActive ? 'auto' : 0,
                      opacity: isActive ? 1 : 0
                    }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6">
                      <div className="bg-white/5 rounded-xl p-4">
                        <ul className="space-y-2">
                          {step.details.map((detail, idx) => (
                            <li key={idx} className="flex items-center space-x-2 text-purple-200">
                              <div className="w-2 h-2 rounded-full bg-purple-400 flex-shrink-0" />
                              <span>{detail}</span>
                            </li>
                          ))}
                        </ul>
                        <motion.button
                          onClick={(e) => {
                            e.stopPropagation()
                            toggleStep(step.id)
                          }}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className={`mt-4 px-4 py-2 rounded-lg font-medium transition-all ${
                            isCompleted
                              ? 'bg-green-600 text-white'
                              : 'bg-purple-600 text-white hover:bg-purple-700'
                          }`}
                        >
                          {isCompleted ? 'Completed' : 'Mark as Complete'}
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              )
            })}
          </div>

          {/* Tips Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.4 }}
            className="backdrop-blur-lg bg-white/10 rounded-2xl p-8 border border-white/20"
          >
            <h2 className="text-3xl font-semibold mb-8">Pro Tips for Better Readings</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {tips.map((tip, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 1.6 + index * 0.1 }}
                  className="bg-white/5 rounded-xl p-6 border border-white/10"
                >
                  <h3 className="text-lg font-semibold mb-3 text-purple-300">{tip.title}</h3>
                  <p className="text-purple-200 text-sm leading-relaxed">{tip.content}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Call to Action */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.8 }}
            className="text-center mt-12"
          >
            <div className="backdrop-blur-lg bg-white/10 rounded-2xl p-8 border border-white/20">
              <h2 className="text-3xl font-semibold mb-4">Ready to Begin?</h2>
              <p className="text-purple-200 mb-6 max-w-2xl mx-auto">
                Your mystical journey awaits. Start with your first reading and discover 
                the insights the universe has in store for you.
              </p>
              <motion.a
                href="/dashboard"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-block bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Start Your Journey
              </motion.a>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}