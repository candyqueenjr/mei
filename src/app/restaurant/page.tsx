'use client'

import Layout from '@/components/Layout'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { 
  Plus, 
  Search, 
  MapPin, 
  Star, 
  Phone, 
  Users,
  DollarSign,
  Calendar,
  Heart,
  Edit,
  Trash2,
  Utensils
} from 'lucide-react'

interface Restaurant {
  id: string
  name: string
  location: string
  contact?: string
  capacity?: number
  pricing?: string
  rating?: number
  description?: string
  images: string[]
  isFavorite: boolean
  bookingStatus: string
}

export default function RestaurantPage() {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([
    {
      id: '1',
      name: 'Garden Venue',
      location: '123 Garden Street, City',
      contact: '+1 (555) 123-4567',
      capacity: 150,
      pricing: '$150 per person',
      rating: 4.8,
      description: 'Beautiful outdoor venue with garden setting',
      images: ['/api/placeholder/400/300'],
      isFavorite: true,
      bookingStatus: 'booked'
    },
    {
      id: '2',
      name: 'Grand Ballroom',
      location: '456 Grand Avenue, City',
      contact: '+1 (555) 987-6543',
      capacity: 200,
      pricing: '$200 per person',
      rating: 4.5,
      description: 'Elegant indoor ballroom with chandeliers',
      images: ['/api/placeholder/400/300'],
      isFavorite: false,
      bookingStatus: 'not_booked'
    }
  ])

  const [searchTerm, setSearchTerm] = useState('')
  const [showAddForm, setShowAddForm] = useState(false)

  const filteredRestaurants = restaurants.filter(restaurant =>
    restaurant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    restaurant.location.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const toggleFavorite = (id: string) => {
    setRestaurants(restaurants.map(restaurant =>
      restaurant.id === id 
        ? { ...restaurant, isFavorite: !restaurant.isFavorite }
        : restaurant
    ))
  }

  const deleteRestaurant = (id: string) => {
    setRestaurants(restaurants.filter(restaurant => restaurant.id !== id))
  }

  return (
    <Layout>
      <div className="space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
        >
          <div>
            <h1 className="text-3xl font-bold text-pink-700">Restaurant & Venues</h1>
            <p className="text-pink-600">Manage your wedding venues and restaurant bookings</p>
          </div>
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="flex items-center space-x-2 bg-pink-500 text-white px-6 py-3 rounded-lg hover:bg-pink-600 transition-colors duration-200"
          >
            <Plus size={20} />
            <span>Add Venue</span>
          </button>
        </motion.div>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="relative"
        >
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search restaurants and venues..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
          />
        </motion.div>

        {/* Add Form */}
        {showAddForm && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-white rounded-xl shadow-lg p-6"
          >
            <h3 className="text-xl font-bold text-pink-700 mb-4">Add New Venue</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  placeholder="Restaurant/Venue name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  placeholder="Address"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Contact</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  placeholder="Phone number"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Capacity</label>
                <input
                  type="number"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  placeholder="Guest capacity"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  rows={3}
                  placeholder="Venue description and features"
                />
              </div>
            </div>
            <div className="flex justify-end space-x-3 mt-4">
              <button
                onClick={() => setShowAddForm(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors duration-200"
              >
                Cancel
              </button>
              <button className="px-6 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-colors duration-200">
                Add Venue
              </button>
            </div>
          </motion.div>
        )}

        {/* Restaurants Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredRestaurants.map((restaurant, index) => (
            <motion.div
              key={restaurant.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              {/* Image */}
              <div className="h-48 bg-gradient-to-br from-pink-200 to-pink-300 relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <Utensils className="w-16 h-16 text-pink-500" />
                </div>
                <button
                  onClick={() => toggleFavorite(restaurant.id)}
                  className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md hover:bg-pink-50 transition-colors duration-200"
                >
                  <Heart 
                    size={20} 
                    className={restaurant.isFavorite ? 'text-pink-500 fill-current' : 'text-gray-400'} 
                  />
                </button>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-xl font-bold text-gray-800">{restaurant.name}</h3>
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-sm font-medium text-gray-600">{restaurant.rating}</span>
                  </div>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center space-x-2 text-gray-600">
                    <MapPin size={16} />
                    <span className="text-sm">{restaurant.location}</span>
                  </div>
                  {restaurant.contact && (
                    <div className="flex items-center space-x-2 text-gray-600">
                      <Phone size={16} />
                      <span className="text-sm">{restaurant.contact}</span>
                    </div>
                  )}
                  {restaurant.capacity && (
                    <div className="flex items-center space-x-2 text-gray-600">
                      <Users size={16} />
                      <span className="text-sm">Capacity: {restaurant.capacity} guests</span>
                    </div>
                  )}
                  {restaurant.pricing && (
                    <div className="flex items-center space-x-2 text-gray-600">
                      <DollarSign size={16} />
                      <span className="text-sm">{restaurant.pricing}</span>
                    </div>
                  )}
                </div>

                {restaurant.description && (
                  <p className="text-gray-600 text-sm mb-4">{restaurant.description}</p>
                )}

                <div className="flex items-center justify-between">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    restaurant.bookingStatus === 'booked' 
                      ? 'bg-green-100 text-green-800'
                      : restaurant.bookingStatus === 'confirmed'
                      ? 'bg-blue-100 text-blue-800'
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {restaurant.bookingStatus.replace('_', ' ').toUpperCase()}
                  </span>
                  
                  <div className="flex space-x-2">
                    <button className="p-2 text-gray-400 hover:text-pink-500 transition-colors duration-200">
                      <Edit size={16} />
                    </button>
                    <button 
                      onClick={() => deleteRestaurant(restaurant.id)}
                      className="p-2 text-gray-400 hover:text-red-500 transition-colors duration-200"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Empty State */}
        {filteredRestaurants.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <Utensils className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-gray-600 mb-2">No restaurants found</h3>
            <p className="text-gray-500 mb-6">Start by adding your first venue or restaurant</p>
            <button
              onClick={() => setShowAddForm(true)}
              className="flex items-center space-x-2 bg-pink-500 text-white px-6 py-3 rounded-lg hover:bg-pink-600 transition-colors duration-200 mx-auto"
            >
              <Plus size={20} />
              <span>Add Your First Venue</span>
            </button>
          </motion.div>
        )}
      </div>
    </Layout>
  )
}
