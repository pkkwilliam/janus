'use client'

import { motion } from 'framer-motion'
import { Shield, Eye, Lock, Users, Database, Cookie, Mail, Calendar } from 'lucide-react'

const sections = [
  {
    id: 'information-we-collect',
    title: 'Information We Collect',
    icon: Database,
    content: [
      {
        subtitle: 'Personal Information',
        text: 'We collect information you provide directly to us, such as your name, email address, birth date, birth time, and location when you create an account or generate readings.'
      },
      {
        subtitle: 'Usage Data',
        text: 'We automatically collect information about your use of our services, including your IP address, device information, browser type, and pages visited.'
      },
      {
        subtitle: 'Payment Information',
        text: 'When you make a purchase, we collect payment information through our secure payment processor (Stripe). We do not store your complete payment card information.'
      }
    ]
  },
  {
    id: 'how-we-use',
    title: 'How We Use Your Information',
    icon: Eye,
    content: [
      {
        subtitle: 'Service Provision',
        text: 'We use your birth information to generate personalized readings, insights, and forecasts tailored to your unique astrological profile.'
      },
      {
        subtitle: 'Account Management',
        text: 'We use your contact information to manage your account, process payments, and provide customer support.'
      },
      {
        subtitle: 'Service Improvement',
        text: 'We analyze usage patterns to improve our services, develop new features, and enhance user experience while maintaining anonymity.'
      },
      {
        subtitle: 'Communications',
        text: 'We may send you service-related emails, updates about your readings, and promotional content (which you can opt out of at any time).'
      }
    ]
  },
  {
    id: 'information-sharing',
    title: 'Information Sharing and Disclosure',
    icon: Users,
    content: [
      {
        subtitle: 'Third-Party Service Providers',
        text: 'We share information with trusted service providers who help us operate our services, such as payment processors, email services, and analytics providers.'
      },
      {
        subtitle: 'Legal Requirements',
        text: 'We may disclose your information if required by law, to protect our rights, or to prevent fraud or other illegal activities.'
      },
      {
        subtitle: 'Business Transfers',
        text: 'In the event of a merger, acquisition, or sale of assets, your information may be transferred as part of that transaction.'
      },
      {
        subtitle: 'No Sale of Personal Data',
        text: 'We do not sell, rent, or share your personal information with third parties for their marketing purposes.'
      }
    ]
  },
  {
    id: 'data-security',
    title: 'Data Security',
    icon: Lock,
    content: [
      {
        subtitle: 'Encryption',
        text: 'All sensitive data is encrypted both in transit and at rest using industry-standard encryption protocols.'
      },
      {
        subtitle: 'Access Controls',
        text: 'We implement strict access controls to ensure that only authorized personnel can access your personal information.'
      },
      {
        subtitle: 'Regular Security Audits',
        text: 'We conduct regular security assessments and audits to identify and address potential vulnerabilities.'
      },
      {
        subtitle: 'Secure Infrastructure',
        text: 'Our services are hosted on secure cloud infrastructure with robust security measures and monitoring.'
      }
    ]
  },
  {
    id: 'your-rights',
    title: 'Your Rights and Choices',
    icon: Shield,
    content: [
      {
        subtitle: 'Access and Correction',
        text: 'You have the right to access, update, or correct your personal information at any time through your account settings.'
      },
      {
        subtitle: 'Data Portability',
        text: 'You can request a copy of your personal data in a portable format by contacting our support team.'
      },
      {
        subtitle: 'Deletion',
        text: 'You can request deletion of your account and personal data. Some information may be retained for legal or business purposes.'
      },
      {
        subtitle: 'Marketing Opt-out',
        text: 'You can unsubscribe from marketing communications at any time by using the unsubscribe link in our emails.'
      }
    ]
  },
  {
    id: 'cookies',
    title: 'Cookies and Tracking',
    icon: Cookie,
    content: [
      {
        subtitle: 'Essential Cookies',
        text: 'We use essential cookies to enable core functionality, such as user authentication and secure access to your account.'
      },
      {
        subtitle: 'Analytics Cookies',
        text: 'We use analytics cookies to understand how users interact with our services and improve user experience.'
      },
      {
        subtitle: 'Cookie Management',
        text: 'You can manage cookie preferences through your browser settings. Disabling certain cookies may affect service functionality.'
      }
    ]
  }
]

export default function Privacy() {
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
              Privacy Policy
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl text-purple-200 max-w-3xl mx-auto mb-6"
            >
              Your privacy is important to us. This policy explains how we collect, 
              use, and protect your personal information.
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

          {/* Key Highlights */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="backdrop-blur-lg bg-white/10 rounded-2xl p-8 border border-white/20 mb-12"
          >
            <h2 className="text-2xl font-semibold mb-6 text-center">Privacy at a Glance</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-semibold mb-2">We Don't Sell Your Data</h3>
                <p className="text-purple-200 text-sm">Your personal information is never sold to third parties.</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Lock className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-semibold mb-2">Enterprise-Grade Security</h3>
                <p className="text-purple-200 text-sm">All data is encrypted and stored securely.</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Eye className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-semibold mb-2">Full Transparency</h3>
                <p className="text-purple-200 text-sm">Clear information about what we collect and why.</p>
              </div>
            </div>
          </motion.div>

          {/* Policy Sections */}
          <div className="space-y-8">
            {sections.map((section, index) => {
              const Icon = section.icon
              
              return (
                <motion.div
                  key={section.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 1 + index * 0.1 }}
                  className="backdrop-blur-lg bg-white/10 rounded-2xl p-8 border border-white/20"
                >
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mr-4">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <h2 className="text-2xl font-semibold">{section.title}</h2>
                  </div>
                  
                  <div className="space-y-6">
                    {section.content.map((item, itemIndex) => (
                      <div key={itemIndex}>
                        <h3 className="text-lg font-medium text-purple-300 mb-3">{item.subtitle}</h3>
                        <p className="text-purple-200 leading-relaxed">{item.text}</p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )
            })}
          </div>

          {/* Additional Information */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.8 }}
            className="backdrop-blur-lg bg-white/10 rounded-2xl p-8 border border-white/20 mt-12"
          >
            <h2 className="text-2xl font-semibold mb-6">Additional Information</h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-purple-300 mb-3">Children's Privacy</h3>
                <p className="text-purple-200 leading-relaxed">
                  Our services are not intended for individuals under the age of 13. We do not knowingly collect 
                  personal information from children under 13. If we become aware that we have collected such 
                  information, we will delete it promptly.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-medium text-purple-300 mb-3">International Data Transfers</h3>
                <p className="text-purple-200 leading-relaxed">
                  Your information may be processed and stored in countries other than your own. We ensure 
                  appropriate safeguards are in place to protect your data in accordance with this privacy policy.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-medium text-purple-300 mb-3">Changes to This Policy</h3>
                <p className="text-purple-200 leading-relaxed">
                  We may update this privacy policy from time to time. We will notify you of any material 
                  changes by posting the new policy on this page and updating the "last updated" date.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 2 }}
            className="text-center mt-12"
          >
            <div className="backdrop-blur-lg bg-white/10 rounded-2xl p-8 border border-white/20">
              <div className="flex items-center justify-center mb-4">
                <Mail className="w-8 h-8 text-purple-400 mr-3" />
                <h2 className="text-2xl font-semibold">Questions About Your Privacy?</h2>
              </div>
              <p className="text-purple-200 mb-6 max-w-2xl mx-auto">
                If you have any questions about this privacy policy or how we handle your personal information, 
                please don't hesitate to contact us.
              </p>
              <motion.a
                href="/contact"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-block bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Contact Privacy Team
              </motion.a>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}