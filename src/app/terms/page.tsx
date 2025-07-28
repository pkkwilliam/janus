'use client'

import { motion } from 'framer-motion'
import { FileText, Scale, Users, Shield, CreditCard, Ban, AlertTriangle, Calendar } from 'lucide-react'

const sections = [
  {
    id: 'acceptance',
    title: 'Acceptance of Terms',
    icon: FileText,
    content: [
      'By accessing and using Mystical Fortune ("Service", "Platform", "we", "us"), you accept and agree to be bound by these Terms of Service.',
      'If you do not agree to these terms, please do not use our services.',
      'These terms apply to all visitors, users, and others who access or use the service.'
    ]
  },
  {
    id: 'description',
    title: 'Description of Service',
    icon: Users,
    content: [
      'Mystical Fortune provides personalized divination readings, including but not limited to astrology, tarot, numerology, and other mystical insights.',
      'Our AI-powered platform generates personalized content based on information you provide, such as birth details and personal preferences.',
      'The service includes subscription plans that provide unlimited access to readings and premium features.',
      'We may modify, suspend, or discontinue any part of the service at any time with reasonable notice.'
    ]
  },
  {
    id: 'user-accounts',
    title: 'User Accounts and Responsibilities',
    icon: Shield,
    content: [
      'You must create an account to access most features of our service.',
      'You are responsible for maintaining the security of your account and password.',
      'You must provide accurate and complete information when creating your account.',
      'You are responsible for all activities that occur under your account.',
      'You must immediately notify us of any unauthorized use of your account.',
      'You may not share your account credentials or allow others to use your account.'
    ]
  },
  {
    id: 'subscription',
    title: 'Subscription and Payment Terms',
    icon: CreditCard,
    content: [
      'Subscription fees are billed in advance on a monthly or yearly basis, depending on your chosen plan.',
      'All payments are processed through our secure payment provider (Stripe).',
      'Subscription fees are non-refundable except as required by law or as specified in our refund policy.',
      'We offer a 30-day satisfaction guarantee for new subscribers.',
      'Prices may change with 30 days\' written notice to existing subscribers.',
      'You can cancel your subscription at any time, and cancellation will take effect at the end of your current billing period.'
    ]
  },
  {
    id: 'content-accuracy',
    title: 'Content and Accuracy Disclaimer',
    icon: AlertTriangle,
    content: [
      'Our readings are for entertainment and guidance purposes only and should not be considered as professional advice.',
      'While we strive for accuracy, we cannot guarantee the precision of all readings or predictions.',
      'You should not make important life decisions based solely on our readings.',
      'Our service should not replace professional medical, legal, financial, or psychological advice.',
      'Individual results may vary, and we make no guarantees about specific outcomes.',
      'You acknowledge that divination and fortune-telling are interpretive arts with inherent limitations.'
    ]
  },
  {
    id: 'prohibited-use',
    title: 'Prohibited Uses',
    icon: Ban,
    content: [
      'You may not use our service for any unlawful or fraudulent purpose.',
      'You may not attempt to circumvent any security measures or access restrictions.',
      'You may not reverse engineer, decompile, or disassemble any part of our service.',
      'You may not share, distribute, or resell your account access or readings.',
      'You may not use automated systems to access our service without permission.',
      'You may not use our service to harass, threaten, or harm others.',
      'You may not create multiple accounts to circumvent limitations or restrictions.'
    ]
  },
  {
    id: 'intellectual-property',
    title: 'Intellectual Property Rights',
    icon: Scale,
    content: [
      'All content, features, and functionality of our service are owned by Mystical Fortune and protected by copyright, trademark, and other laws.',
      'Your readings are generated specifically for you and are for your personal use only.',
      'You may not reproduce, distribute, or create derivative works from our content without permission.',
      'User-generated content remains your property, but you grant us a license to use it in connection with our service.',
      'We respect intellectual property rights and expect users to do the same.'
    ]
  },
  {
    id: 'limitation-liability',
    title: 'Limitation of Liability',
    icon: Shield,
    content: [
      'Our service is provided "as is" without warranties of any kind, either express or implied.',
      'We are not liable for any direct, indirect, incidental, or consequential damages arising from your use of the service.',
      'Our total liability to you shall not exceed the amount you paid for the service in the 12 months preceding the claim.',
      'Some jurisdictions do not allow limitation of liability, so these limitations may not apply to you.',
      'You agree to indemnify and hold us harmless from any claims arising from your use of the service.'
    ]
  }
]

const additionalTerms = [
  {
    title: 'Privacy and Data Protection',
    content: 'Your privacy is important to us. Please review our Privacy Policy to understand how we collect, use, and protect your personal information. By using our service, you consent to our data practices as described in our Privacy Policy.'
  },
  {
    title: 'Age Requirements',
    content: 'You must be at least 13 years old to use our service. If you are between 13 and 18, you must have parental or guardian consent to use our service.'
  },
  {
    title: 'Termination',
    content: 'We may terminate or suspend your account and access to the service immediately, without prior notice, if you breach these Terms of Service. Upon termination, your right to use the service will cease immediately.'
  },
  {
    title: 'Governing Law',
    content: 'These Terms shall be governed by and construed in accordance with the laws of [Jurisdiction], without regard to its conflict of law provisions. Any disputes shall be resolved in the courts of [Jurisdiction].'
  },
  {
    title: 'Changes to Terms',
    content: 'We reserve the right to modify these Terms of Service at any time. We will notify users of any material changes via email or through our service. Continued use of the service after changes constitutes acceptance of the new terms.'
  },
  {
    title: 'Severability',
    content: 'If any provision of these Terms is found to be unenforceable or invalid, the remaining provisions will remain in full force and effect. The unenforceable provision will be replaced with an enforceable provision that most closely reflects our intent.'
  }
]

export default function Terms() {
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
              Terms of Service
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl text-purple-200 max-w-3xl mx-auto mb-6"
            >
              Please read these terms carefully before using our mystical guidance services.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex items-center justify-center space-x-2 text-purple-300"
            >
              <Calendar className="w-5 h-5" />
              <span>Effective Date: July 25, 2024</span>
            </motion.div>
          </div>

          {/* Important Notice */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="backdrop-blur-lg bg-yellow-500/10 rounded-2xl p-6 border border-yellow-500/30 mb-12"
          >
            <div className="flex items-start space-x-4">
              <AlertTriangle className="w-8 h-8 text-yellow-400 flex-shrink-0 mt-1" />
              <div>
                <h2 className="text-xl font-semibold text-yellow-300 mb-2">Important Notice</h2>
                <p className="text-yellow-200 leading-relaxed">
                  Our mystical readings are provided for entertainment and guidance purposes only. 
                  They should not be considered as professional medical, legal, financial, or psychological advice. 
                  Please use your own judgment and consult appropriate professionals for important life decisions.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Main Terms Sections */}
          <div className="space-y-8 mb-12">
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
                  
                  <div className="space-y-4">
                    {section.content.map((paragraph, paragraphIndex) => (
                      <p key={paragraphIndex} className="text-purple-200 leading-relaxed">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </motion.div>
              )
            })}
          </div>

          {/* Additional Terms */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.8 }}
            className="backdrop-blur-lg bg-white/10 rounded-2xl p-8 border border-white/20 mb-12"
          >
            <h2 className="text-2xl font-semibold mb-6">Additional Terms</h2>
            <div className="space-y-6">
              {additionalTerms.map((term, index) => (
                <div key={index}>
                  <h3 className="text-lg font-medium text-purple-300 mb-3">{term.title}</h3>
                  <p className="text-purple-200 leading-relaxed">{term.content}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 2 }}
            className="text-center"
          >
            <div className="backdrop-blur-lg bg-white/10 rounded-2xl p-8 border border-white/20">
              <h2 className="text-2xl font-semibold mb-4">Questions About These Terms?</h2>
              <p className="text-purple-200 mb-6 max-w-2xl mx-auto">
                If you have any questions about these Terms of Service, please contact us. 
                We're here to help clarify any concerns you may have.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.a
                  href="/contact"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  Contact Support
                </motion.a>
                <motion.a
                  href="/privacy"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white/10 text-white border border-white/20 px-8 py-3 rounded-full font-semibold hover:bg-white/20 transition-all duration-300"
                >
                  View Privacy Policy
                </motion.a>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}