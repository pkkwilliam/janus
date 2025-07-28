'use client'

import { motion } from 'framer-motion'
import { AlertTriangle, Heart, Brain, Scale, Star, Eye, MessageCircle, Calendar } from 'lucide-react'

const disclaimerSections = [
  {
    id: 'entertainment-purpose',
    title: 'Entertainment and Guidance Purpose Only',
    icon: Star,
    content: [
      'All readings, predictions, and mystical insights provided by Mystical Fortune are intended for entertainment, spiritual guidance, and personal reflection purposes only.',
      'Our services should not be considered as professional advice of any kind, including but not limited to medical, legal, financial, psychological, or relationship counseling.',
      'While we strive to provide meaningful and insightful content, our readings are interpretive in nature and should be approached with an open but discerning mind.'
    ]
  },
  {
    id: 'no-guarantees',
    title: 'No Guarantees of Accuracy or Outcomes',
    icon: AlertTriangle,
    content: [
      'We make no representations or warranties regarding the accuracy, completeness, or reliability of any readings or predictions provided through our platform.',
      'Future events are inherently uncertain, and we cannot guarantee that any predictions or forecasts will come to pass.',
      'Individual experiences and results may vary significantly, and past performance or accuracy does not indicate future results.',
      'The mystical arts are subjective by nature, and interpretations may differ between practitioners and individuals.'
    ]
  },
  {
    id: 'professional-advice',
    title: 'Not a Substitute for Professional Advice',
    icon: Brain,
    content: [
      'Our readings and services are not intended to replace professional medical, psychiatric, psychological, legal, or financial advice.',
      'If you are experiencing serious physical or mental health issues, please consult with qualified healthcare professionals.',
      'For legal matters, financial decisions, or other professional concerns, always seek advice from licensed professionals in the relevant field.',
      'Do not make important life decisions based solely on mystical readings or predictions without considering other factors and professional guidance.'
    ]
  },
  {
    id: 'personal-responsibility',
    title: 'Personal Responsibility and Free Will',
    icon: Scale,
    content: [
      'You acknowledge that you have free will and personal responsibility for your choices and actions.',
      'Any decisions you make based on our readings or guidance are your own responsibility.',
      'We encourage you to use your own judgment, intuition, and critical thinking when interpreting any mystical content.',
      'Our readings are meant to provide perspective and insight, not to dictate your life choices or decisions.'
    ]
  },
  {
    id: 'age-restrictions',
    title: 'Age Requirements and Restrictions',
    icon: Eye,
    content: [
      'Our services are intended for individuals aged 18 and above. Users between 13-17 require parental consent.',
      'Certain content may not be suitable for all audiences, and parental discretion is advised for younger users.',
      'We reserve the right to restrict access to certain features or content based on age verification.',
      'Parents and guardians are responsible for monitoring and controlling their children\'s use of our services.'
    ]
  },
  {
    id: 'emotional-wellbeing',
    title: 'Emotional Well-being and Mental Health',
    icon: Heart,
    content: [
      'While our readings aim to provide comfort and guidance, they may sometimes contain challenging or difficult themes.',
      'If you are struggling with mental health issues, depression, anxiety, or suicidal thoughts, please seek professional help immediately.',
      'Our services are not designed to provide therapy or mental health treatment.',
      'We encourage users to approach mystical content with emotional stability and to discontinue use if it causes distress.'
    ]
  },
  {
    id: 'cultural-sensitivity',
    title: 'Cultural and Religious Considerations',
    icon: MessageCircle,
    content: [
      'We respect all cultural backgrounds, religious beliefs, and spiritual practices.',
      'Our interpretations may not align with your personal beliefs, cultural traditions, or religious teachings.',
      'We encourage users to consider how our content fits within their own belief systems and value frameworks.',
      'If our services conflict with your religious or cultural beliefs, please use your discretion in engagement.'
    ]
  }
]

const importantNotices = [
  {
    title: 'Emergency Situations',
    content: 'If you are in immediate danger or experiencing a medical emergency, please contact emergency services (911 in the US) or your local emergency number immediately. Do not rely on mystical readings for emergency guidance.'
  },
  {
    title: 'Financial Decisions',
    content: 'Never make significant financial investments, business decisions, or monetary commitments based solely on mystical readings. Always consult with qualified financial advisors for important financial matters.'
  },
  {
    title: 'Relationship and Life Changes',
    content: 'Major life decisions such as marriage, divorce, career changes, or relocations should involve careful consideration of multiple factors beyond mystical guidance. Consider the practical, emotional, and financial implications of any major life changes.'
  },
  {
    title: 'Health and Medical Decisions',
    content: 'Never delay, avoid, or discontinue medical treatment based on mystical readings. Our services are not a substitute for professional medical diagnosis, treatment, or advice. Always consult healthcare professionals for medical concerns.'
  }
]

export default function Disclaimer() {
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
              Disclaimer
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl text-purple-200 max-w-3xl mx-auto mb-6"
            >
              Important information about the nature and limitations of our mystical services.
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

          {/* Critical Notice */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="backdrop-blur-lg bg-red-500/10 rounded-2xl p-8 border border-red-500/30 mb-12"
          >
            <div className="flex items-start space-x-4">
              <AlertTriangle className="w-12 h-12 text-red-400 flex-shrink-0 mt-1" />
              <div>
                <h2 className="text-2xl font-semibold text-red-300 mb-4">Important Notice</h2>
                <div className="space-y-3 text-red-200 leading-relaxed">
                  <p>
                    <strong>Please read this disclaimer carefully before using our services.</strong> By accessing 
                    or using Mystical Fortune, you acknowledge that you have read, understood, and agree to be 
                    bound by this disclaimer.
                  </p>
                  <p>
                    Our mystical services are provided for entertainment and spiritual guidance purposes only. 
                    They are not intended to replace professional advice or services of any kind.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Main Disclaimer Sections */}
          <div className="space-y-8 mb-12">
            {disclaimerSections.map((section, index) => {
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

          {/* Important Notices */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.8 }}
            className="backdrop-blur-lg bg-white/10 rounded-2xl p-8 border border-white/20 mb-12"
          >
            <h2 className="text-3xl font-semibold mb-8">Critical Reminders</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {importantNotices.map((notice, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 2 + index * 0.1 }}
                  className="bg-yellow-500/10 rounded-xl p-6 border border-yellow-500/20"
                >
                  <h3 className="text-lg font-semibold text-yellow-300 mb-3">{notice.title}</h3>
                  <p className="text-yellow-200 text-sm leading-relaxed">{notice.content}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Limitation of Liability */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 2.4 }}
            className="backdrop-blur-lg bg-white/10 rounded-2xl p-8 border border-white/20 mb-12"
          >
            <h2 className="text-3xl font-semibold mb-6">Limitation of Liability</h2>
            <div className="space-y-4 text-purple-200 leading-relaxed">
              <p>
                To the fullest extent permitted by law, Mystical Fortune, its owners, operators, employees, 
                and affiliates shall not be liable for any direct, indirect, incidental, special, consequential, 
                or punitive damages arising out of or in connection with your use of our services.
              </p>
              <p>
                This includes, but is not limited to, damages for loss of profits, data, or other intangible 
                losses resulting from decisions made based on our readings or content, regardless of whether 
                we have been advised of the possibility of such damages.
              </p>
              <p>
                You acknowledge and agree that your use of our services is at your own risk and that you 
                assume full responsibility for any consequences of your reliance on our mystical content.
              </p>
            </div>
          </motion.div>

          {/* Acknowledgment */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 2.6 }}
            className="text-center"
          >
            <div className="backdrop-blur-lg bg-white/10 rounded-2xl p-8 border border-white/20">
              <h2 className="text-3xl font-semibold mb-6">Your Acknowledgment</h2>
              <div className="space-y-4 text-purple-200 leading-relaxed mb-8">
                <p>
                  By using Mystical Fortune, you acknowledge that you have read and understood this disclaimer 
                  in its entirety. You agree that you are using our services voluntarily and with full awareness 
                  of their entertainment nature and limitations.
                </p>
                <p>
                  You confirm that you will not hold us responsible for any decisions you make based on our content 
                  and that you will seek appropriate professional advice when needed.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.a
                  href="/terms"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  View Terms of Service
                </motion.a>
                <motion.a
                  href="/contact"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white/10 text-white border border-white/20 px-8 py-3 rounded-full font-semibold hover:bg-white/20 transition-all duration-300"
                >
                  Contact Us
                </motion.a>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}