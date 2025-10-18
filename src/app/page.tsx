'use client'

import Layout from '@/components/Layout'
import { motion } from 'framer-motion'
import { 
  Plus, 
  Heart, 
  Star, 
  Calendar,
  Camera,
  Shirt,
  Utensils,
  Palette
} from 'lucide-react'

export default function HomePage() {
  const stats = [
    { label: 'Restaurants', count: 12, icon: Utensils, color: 'bg-blue-500' },
    { label: 'Dresses', count: 8, icon: Shirt, color: 'bg-purple-500' },
    { label: 'Photos', count: 45, icon: Camera, color: 'bg-green-500' },
    { label: 'Designs', count: 15, icon: Palette, color: 'bg-orange-500' },
  ]

  const quickActions = [
    { label: 'Add Restaurant', href: '/restaurant', icon: Utensils },
    { label: 'Add Dress', href: '/dresses', icon: Shirt },
    { label: 'Upload Photo', href: '/photographs', icon: Camera },
    { label: 'Create Design', href: '/designs', icon: Palette },
  ]

  return (
    <Layout>
      <div className="space-y-8">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-center"
        >
          <h1 className="text-4xl font-bold text-red-700 mb-4">
            Welcome to Your Wedding Planning Dashboard
          </h1>
          <p className="text-lg text-red-600 max-w-2xl mx-auto">
            Plan every detail of your special day with our comprehensive wedding planning tools.
            From venues to dresses, capture and organize everything in one place.
          </p>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {stats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                    <p className="text-3xl font-bold text-red-700">{stat.count}</p>
                  </div>
                  <div className={`${stat.color} p-3 rounded-lg`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                </div>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-xl shadow-lg p-6"
        >
          <h2 className="text-2xl font-bold text-red-700 mb-6">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickActions.map((action, index) => {
              const Icon = action.icon
              return (
                <motion.a
                  key={action.label}
                  href={action.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center space-x-3 p-4 bg-red-50 rounded-lg hover:bg-red-100 transition-colors duration-200 group"
                >
                  <div className="p-2 bg-red-500 rounded-lg group-hover:bg-red-600 transition-colors duration-200">
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <span className="font-medium text-red-700">{action.label}</span>
                </motion.a>
              )
            })}
          </div>
        </motion.div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white rounded-xl shadow-lg p-6"
        >
          <h2 className="text-2xl font-bold text-red-700 mb-6">Recent Activity</h2>
          <div className="space-y-4">
            {[
              { action: 'Added new restaurant', item: 'Garden Venue', time: '2 hours ago' },
              { action: 'Uploaded dress photo', item: 'Elegant Gown', time: '1 day ago' },
              { action: 'Created design board', item: 'Floral Arrangements', time: '2 days ago' },
              { action: 'Added photographer', item: 'John Smith Photography', time: '3 days ago' },
            ].map((activity, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 + index * 0.1 }}
                className="flex items-center space-x-4 p-3 bg-red-50 rounded-lg"
              >
                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-700">
                    {activity.action}: <span className="text-red-600">{activity.item}</span>
                  </p>
                  <p className="text-xs text-gray-500">{activity.time}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Progress Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="bg-white rounded-xl shadow-lg p-6"
        >
          <h2 className="text-2xl font-bold text-red-700 mb-6">Planning Progress</h2>
          <div className="space-y-4">
            {[
              { task: 'Venue Selection', progress: 80, color: 'bg-blue-500' },
              { task: 'Dress Shopping', progress: 60, color: 'bg-purple-500' },
              { task: 'Photography', progress: 40, color: 'bg-green-500' },
              { task: 'Design Planning', progress: 30, color: 'bg-orange-500' },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.9 + index * 0.1 }}
                className="space-y-2"
              >
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-700">{item.task}</span>
                  <span className="text-sm text-gray-500">{item.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${item.progress}%` }}
                    transition={{ delay: 1 + index * 0.1, duration: 0.8 }}
                    className={`h-2 rounded-full ${item.color}`}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </Layout>
  )
}