'use client'

import { motion } from 'framer-motion'
import { Users, MessageCircle, Star, Heart, Sparkles, Calendar, TrendingUp, Award } from 'lucide-react'

const communityStats = [
  { label: 'Active Members', value: '50,000+', icon: Users },
  { label: 'Readings Shared', value: '2.5M+', icon: Star },
  { label: 'Monthly Discussions', value: '15,000+', icon: MessageCircle },
  { label: 'Success Stories', value: '8,500+', icon: Heart }
]

const featuredMembers = [
  {
    name: 'Luna Starweaver',
    title: 'Astrology Expert',
    avatar: '🌙',
    contributions: 'Shared 500+ insights on planetary influences',
    badge: 'Mystic Guide'
  },
  {
    name: 'Phoenix Rising',
    title: 'Tarot Enthusiast',
    avatar: '🔮',
    contributions: 'Helped 200+ members interpret their readings',
    badge: 'Wisdom Keeper'
  },
  {
    name: 'Cosmic Journey',
    title: 'Numerology Specialist',
    avatar: '✨',
    contributions: 'Created the popular "Numbers & Destiny" series',
    badge: 'Community Star'
  }
]

const upcomingEvents = [
  {
    title: 'New Moon Meditation Circle',
    date: 'July 30, 2024',
    time: '8:00 PM EST',
    type: 'Virtual Event',
    participants: 250
  },
  {
    title: 'Tarot Reading Workshop',
    date: 'August 5, 2024',
    time: '3:00 PM EST',
    type: 'Interactive Session',
    participants: 100
  },
  {
    title: 'Mercury Retrograde Support Group',
    date: 'August 12, 2024',
    time: '7:00 PM EST',
    type: 'Discussion Group',
    participants: 180
  }
]

const discussionTopics = [
  {
    title: 'Understanding Your Birth Chart Basics',
    replies: 127,
    participants: 45,
    lastActivity: '2 hours ago',
    tag: 'Astrology'
  },
  {
    title: 'Interpreting Reversed Tarot Cards',
    replies: 89,
    participants: 32,
    lastActivity: '4 hours ago',
    tag: 'Tarot'
  },
  {
    title: 'Manifestation Success Stories',
    replies: 156,
    participants: 67,
    lastActivity: '1 hour ago',
    tag: 'Manifestation'
  },
  {
    title: 'Crystal Healing for Beginners',
    replies: 73,
    participants: 28,
    lastActivity: '6 hours ago',
    tag: 'Crystals'
  }
]

export default function Community() {
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
              Community
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl text-purple-200 max-w-3xl mx-auto"
            >
              Connect with fellow seekers, share your journey, and grow together 
              in our vibrant mystical community
            </motion.p>
          </div>

          {/* Community Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="grid md:grid-cols-4 gap-6 mb-16"
          >
            {communityStats.map((stat, index) => {
              const Icon = stat.icon
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                  className="backdrop-blur-lg bg-white/10 rounded-2xl p-6 border border-white/20 text-center"
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-2xl font-bold text-purple-300 mb-2">{stat.value}</div>
                  <div className="text-purple-200 text-sm">{stat.label}</div>
                </motion.div>
              )
            })}
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 mb-16">
            {/* Featured Members */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 1 }}
            >
              <div className="backdrop-blur-lg bg-white/10 rounded-2xl p-8 border border-white/20">
                <div className="flex items-center mb-6">
                  <Award className="w-8 h-8 text-yellow-400 mr-3" />
                  <h2 className="text-3xl font-semibold">Featured Members</h2>
                </div>
                <div className="space-y-6">
                  {featuredMembers.map((member, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 1.2 + index * 0.1 }}
                      className="flex items-start space-x-4 p-4 rounded-xl bg-white/5 border border-white/10"
                    >
                      <div className="text-3xl">{member.avatar}</div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <h3 className="font-semibold text-purple-300">{member.name}</h3>
                          <span className="px-2 py-1 rounded-full bg-purple-600/30 text-purple-300 text-xs font-medium">
                            {member.badge}
                          </span>
                        </div>
                        <p className="text-purple-400 text-sm mb-2">{member.title}</p>
                        <p className="text-purple-200 text-xs">{member.contributions}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Upcoming Events */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 1.2 }}
            >
              <div className="backdrop-blur-lg bg-white/10 rounded-2xl p-8 border border-white/20">
                <div className="flex items-center mb-6">
                  <Calendar className="w-8 h-8 text-cyan-400 mr-3" />
                  <h2 className="text-3xl font-semibold">Upcoming Events</h2>
                </div>
                <div className="space-y-4">
                  {upcomingEvents.map((event, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 1.4 + index * 0.1 }}
                      className="p-4 rounded-xl bg-white/5 border border-white/10"
                    >
                      <h3 className="font-semibold text-purple-300 mb-2">{event.title}</h3>
                      <div className="text-purple-200 text-sm space-y-1">
                        <div className="flex items-center justify-between">
                          <span>{event.date} at {event.time}</span>
                          <span className="text-cyan-400">{event.type}</span>
                        </div>
                        <div className="flex items-center text-purple-400">
                          <Users className="w-4 h-4 mr-1" />
                          {event.participants} participants
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full mt-6 bg-gradient-to-r from-cyan-600 to-blue-600 text-white px-6 py-3 rounded-xl font-medium transition-all hover:shadow-lg"
                >
                  View All Events
                </motion.button>
              </div>
            </motion.div>
          </div>

          {/* Active Discussions */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.6 }}
            className="backdrop-blur-lg bg-white/10 rounded-2xl p-8 border border-white/20 mb-16"
          >
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center">
                <TrendingUp className="w-8 h-8 text-green-400 mr-3" />
                <h2 className="text-3xl font-semibold">Trending Discussions</h2>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-2 rounded-lg font-medium transition-all hover:shadow-lg"
              >
                Start New Topic
              </motion.button>
            </div>
            
            <div className="space-y-4">
              {discussionTopics.map((topic, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 1.8 + index * 0.1 }}
                  className="p-6 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all cursor-pointer"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="font-semibold text-purple-300">{topic.title}</h3>
                        <span className="px-2 py-1 rounded-full bg-indigo-600/30 text-indigo-300 text-xs font-medium">
                          {topic.tag}
                        </span>
                      </div>
                      <div className="flex items-center space-x-6 text-purple-400 text-sm">
                        <div className="flex items-center">
                          <MessageCircle className="w-4 h-4 mr-1" />
                          {topic.replies} replies
                        </div>
                        <div className="flex items-center">
                          <Users className="w-4 h-4 mr-1" />
                          {topic.participants} participants
                        </div>
                        <span>Last activity: {topic.lastActivity}</span>
                      </div>
                    </div>
                    <Sparkles className="w-5 h-5 text-purple-400 mt-1" />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Join Community CTA */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 2.2 }}
            className="text-center"
          >
            <div className="backdrop-blur-lg bg-white/10 rounded-2xl p-8 border border-white/20">
              <h2 className="text-3xl font-semibold mb-4">Join Our Community</h2>
              <p className="text-purple-200 mb-6 max-w-2xl mx-auto">
                Connect with thousands of like-minded seekers, share your insights, 
                and learn from experienced practitioners in our welcoming community.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  Join Discussion
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white/10 text-white border border-white/20 px-8 py-3 rounded-full font-semibold hover:bg-white/20 transition-all duration-300"
                >
                  Browse Topics
                </motion.button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}