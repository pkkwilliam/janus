'use client'

import { motion } from 'framer-motion'
import { CheckCircle, AlertTriangle, Clock, Server, Database, Zap, Globe, Shield } from 'lucide-react'

const systemStatus = [
  {
    name: 'Reading Generation API',
    status: 'operational',
    uptime: '99.9%',
    responseTime: '120ms',
    icon: Zap,
    description: 'Core reading generation service'
  },
  {
    name: 'User Authentication',
    status: 'operational',
    uptime: '99.95%',
    responseTime: '85ms',
    icon: Shield,
    description: 'Login and account management'
  },
  {
    name: 'Payment Processing',
    status: 'operational',
    uptime: '99.8%',
    responseTime: '200ms',
    icon: Database,
    description: 'Stripe payment gateway'
  },
  {
    name: 'Web Application',
    status: 'operational',
    uptime: '99.9%',
    responseTime: '45ms',
    icon: Globe,
    description: 'Main website and dashboard'
  },
  {
    name: 'Data Analytics',
    status: 'maintenance',
    uptime: '98.5%',
    responseTime: '180ms',
    icon: Server,
    description: 'User insights and reporting'
  }
]

const recentIncidents = [
  {
    id: 1,
    title: 'Scheduled Maintenance - Data Analytics',
    status: 'ongoing',
    severity: 'low',
    startTime: '2024-07-25 02:00 UTC',
    description: 'Routine database optimization for improved performance',
    updates: [
      {
        time: '2024-07-25 02:00 UTC',
        message: 'Maintenance started - Analytics temporarily unavailable'
      },
      {
        time: '2024-07-25 01:45 UTC',
        message: 'Scheduled maintenance window begins in 15 minutes'
      }
    ]
  },
  {
    id: 2,
    title: 'Reading Generation Slowdown',
    status: 'resolved',
    severity: 'medium',
    startTime: '2024-07-24 14:30 UTC',
    endTime: '2024-07-24 15:15 UTC',
    description: 'Temporary performance degradation in reading generation',
    updates: [
      {
        time: '2024-07-24 15:15 UTC',
        message: 'Issue resolved - All services operating normally'
      },
      {
        time: '2024-07-24 14:45 UTC',
        message: 'Investigating increased response times'
      },
      {
        time: '2024-07-24 14:30 UTC',
        message: 'Reports of slower reading generation received'
      }
    ]
  }
]

const metrics = [
  { label: 'Overall Uptime', value: '99.8%', period: 'Last 30 days' },
  { label: 'Average Response', value: '126ms', period: 'Last 24 hours' },
  { label: 'Active Users', value: '12,450', period: 'Currently online' },
  { label: 'Readings Generated', value: '45,230', period: 'Today' }
]

const getStatusColor = (status: string) => {
  switch (status) {
    case 'operational': return 'text-green-400'
    case 'maintenance': return 'text-yellow-400'
    case 'degraded': return 'text-orange-400'
    case 'outage': return 'text-red-400'
    default: return 'text-gray-400'
  }
}

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'operational': return CheckCircle
    case 'maintenance': return Clock
    case 'degraded': case 'outage': return AlertTriangle
    default: return Clock
  }
}

const getSeverityColor = (severity: string) => {
  switch (severity) {
    case 'low': return 'bg-blue-500/20 text-blue-400 border-blue-500/30'
    case 'medium': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
    case 'high': return 'bg-red-500/20 text-red-400 border-red-500/30'
    default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30'
  }
}

export default function Status() {
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
              System Status
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl text-purple-200 max-w-3xl mx-auto"
            >
              Real-time status of our services and infrastructure
            </motion.p>
          </div>

          {/* Overall Status */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="backdrop-blur-lg bg-white/10 rounded-2xl p-8 border border-white/20 mb-12"
          >
            <div className="flex items-center justify-center mb-6">
              <CheckCircle className="w-12 h-12 text-green-400 mr-4" />
              <div className="text-center">
                <h2 className="text-3xl font-semibold text-green-400 mb-2">All Systems Operational</h2>
                <p className="text-purple-200">Most services are running smoothly</p>
              </div>
            </div>
            <div className="grid md:grid-cols-4 gap-6">
              {metrics.map((metric, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                  className="text-center"
                >
                  <div className="text-2xl font-bold text-purple-300 mb-1">{metric.value}</div>
                  <div className="font-medium text-white mb-1">{metric.label}</div>
                  <div className="text-purple-400 text-sm">{metric.period}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Service Status */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="backdrop-blur-lg bg-white/10 rounded-2xl p-8 border border-white/20 mb-12"
          >
            <h2 className="text-3xl font-semibold mb-8">Service Status</h2>
            <div className="space-y-4">
              {systemStatus.map((service, index) => {
                const StatusIcon = getStatusIcon(service.status)
                const ServiceIcon = service.icon
                
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 1.2 + index * 0.1 }}
                    className="flex items-center justify-between p-6 rounded-xl bg-white/5 border border-white/10"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                        <ServiceIcon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">{service.name}</h3>
                        <p className="text-purple-300 text-sm">{service.description}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-6 text-right">
                      <div>
                        <div className="text-purple-300 text-sm">Uptime</div>
                        <div className="font-semibold">{service.uptime}</div>
                      </div>
                      <div>
                        <div className="text-purple-300 text-sm">Response</div>
                        <div className="font-semibold">{service.responseTime}</div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <StatusIcon className={`w-6 h-6 ${getStatusColor(service.status)}`} />
                        <span className={`font-medium capitalize ${getStatusColor(service.status)}`}>
                          {service.status}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </motion.div>

          {/* Recent Incidents */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.4 }}
            className="backdrop-blur-lg bg-white/10 rounded-2xl p-8 border border-white/20"
          >
            <h2 className="text-3xl font-semibold mb-8">Recent Incidents</h2>
            <div className="space-y-8">
              {recentIncidents.map((incident, index) => (
                <motion.div
                  key={incident.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 1.6 + index * 0.2 }}
                  className="border border-white/10 rounded-xl overflow-hidden"
                >
                  <div className="p-6 bg-white/5">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-semibold mb-2">{incident.title}</h3>
                        <p className="text-purple-200 mb-3">{incident.description}</p>
                        <div className="flex items-center space-x-4 text-sm text-purple-300">
                          <span>Started: {incident.startTime}</span>
                          {incident.endTime && <span>Ended: {incident.endTime}</span>}
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getSeverityColor(incident.severity)}`}>
                          {incident.severity.toUpperCase()}
                        </span>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium border ${
                          incident.status === 'resolved' 
                            ? 'bg-green-500/20 text-green-400 border-green-500/30'
                            : 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
                        }`}>
                          {incident.status.toUpperCase()}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-6 space-y-3">
                    <h4 className="font-medium text-purple-300 mb-3">Updates</h4>
                    {incident.updates.map((update, updateIndex) => (
                      <div key={updateIndex} className="flex items-start space-x-3 text-sm">
                        <div className="w-2 h-2 rounded-full bg-purple-400 mt-2 flex-shrink-0" />
                        <div>
                          <div className="text-purple-300">{update.time}</div>
                          <div className="text-purple-200">{update.message}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Subscribe to Updates */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 2 }}
            className="text-center mt-12"
          >
            <div className="backdrop-blur-lg bg-white/10 rounded-2xl p-8 border border-white/20">
              <h2 className="text-3xl font-semibold mb-4">Stay Updated</h2>
              <p className="text-purple-200 mb-6 max-w-2xl mx-auto">
                Subscribe to status updates and be the first to know about any service changes or maintenance windows.
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Subscribe to Updates
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}