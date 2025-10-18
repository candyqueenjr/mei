'use client'

import Layout from '@/components/Layout'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { 
  Plus, 
  Search, 
  Heart, 
  Edit, 
  Trash2,
  Shirt,
  Star,
  DollarSign,
  Calendar,
  Tag
} from 'lucide-react'

interface Dress {
  id: string
  designer?: string
  style?: string
  color?: string
  size?: string
  price?: number
  availability?: string
  description?: string
  images: string[]
  isFavorite: boolean
  tryOnDate?: string
}

export default function DressesPage() {
  const [dresses, setDresses] = useState<Dress[]>([
    {
      id: '1',
      designer: 'Vera Wang',
      style: 'A-line',
      color: 'Ivory',
      size: '8',
      price: 3500,
      availability: 'Available',
      description: 'Elegant A-line dress with intricate beading',
      images: ['/api/placeholder/400/600'],
      isFavorite: true,
      tryOnDate: '2024-02-15'
    },
    {
      id: '2',
      designer: 'Pronovias',
      style: 'Mermaid',
      color: 'White',
      size: '6',
      price: 2800,
      availability: 'On Hold',
      description: 'Stunning mermaid silhouette with lace details',
      images: ['/api/placeholder/400/600'],
      isFavorite: false,
      tryOnDate: '2024-02-20'
    }
  ])

  const [searchTerm, setSearchTerm] = useState('')
  const [showAddForm, setShowAddForm] = useState(false)

  const filteredDresses = dresses.filter(dress =>
    dress.designer?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    dress.style?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    dress.color?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const toggleFavorite = (id: string) => {
    setDresses(dresses.map(dress =>
      dress.id === id 
        ? { ...dress, isFavorite: !dress.isFavorite }
        : dress
    ))
  }

  const deleteDress = (id: string) => {
    setDresses(dresses.filter(dress => dress.id !== id))
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
            <h1 className="text-3xl font-bold text-pink-700">Wedding Dresses</h1>
            <p className="text-pink-600">Discover and manage your dream wedding dress collection</p>
          </div>
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="flex items-center space-x-2 bg-pink-500 text-white px-6 py-3 rounded-lg hover:bg-pink-600 transition-colors duration-200"
          >
            <Plus size={20} />
            <span>Add Dress</span>
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
            placeholder="Search by designer, style, or color..."
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
            <h3 className="text-xl font-bold text-pink-700 mb-4">Add New Dress</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Designer</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  placeholder="Designer name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Style</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent">
                  <option value="">Select style</option>
                  <option value="A-line">A-line</option>
                  <option value="Mermaid">Mermaid</option>
                  <option value="Ballgown">Ballgown</option>
                  <option value="Sheath">Sheath</option>
                  <option value="Trumpet">Trumpet</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Color</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  placeholder="Dress color"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Size</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent">
                  <option value="">Select size</option>
                  <option value="0">0</option>
                  <option value="2">2</option>
                  <option value="4">4</option>
                  <option value="6">6</option>
                  <option value="8">8</option>
                  <option value="10">10</option>
                  <option value="12">12</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Price</label>
                <input
                  type="number"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  placeholder="Price"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Try-on Date</label>
                <input
                  type="date"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  rows={3}
                  placeholder="Dress description and details"
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
                Add Dress
              </button>
            </div>
          </motion.div>
        )}

        {/* Dresses Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredDresses.map((dress, index) => (
            <motion.div
              key={dress.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              {/* Image */}
              <div className="h-80 bg-gradient-to-br from-pink-200 to-pink-300 relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <Shirt className="w-16 h-16 text-pink-500" />
                </div>
                <button
                  onClick={() => toggleFavorite(dress.id)}
                  className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md hover:bg-pink-50 transition-colors duration-200"
                >
                  <Heart 
                    size={20} 
                    className={dress.isFavorite ? 'text-pink-500 fill-current' : 'text-gray-400'} 
                  />
                </button>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-xl font-bold text-gray-800">{dress.designer}</h3>
                  {dress.price && (
                    <div className="flex items-center space-x-1 text-green-600">
                      <DollarSign size={16} />
                      <span className="font-bold">{dress.price.toLocaleString()}</span>
                    </div>
                  )}
                </div>

                <div className="space-y-2 mb-4">
                  {dress.style && (
                    <div className="flex items-center space-x-2 text-gray-600">
                      <Tag size={16} />
                      <span className="text-sm">{dress.style}</span>
                    </div>
                  )}
                  {dress.color && (
                    <div className="flex items-center space-x-2 text-gray-600">
                      <div className="w-4 h-4 rounded-full bg-gray-300"></div>
                      <span className="text-sm">{dress.color}</span>
                    </div>
                  )}
                  {dress.size && (
                    <div className="flex items-center space-x-2 text-gray-600">
                      <Shirt size={16} />
                      <span className="text-sm">Size {dress.size}</span>
                    </div>
                  )}
                  {dress.tryOnDate && (
                    <div className="flex items-center space-x-2 text-gray-600">
                      <Calendar size={16} />
                      <span className="text-sm">Try-on: {new Date(dress.tryOnDate).toLocaleDateString()}</span>
                    </div>
                  )}
                </div>

                {dress.description && (
                  <p className="text-gray-600 text-sm mb-4">{dress.description}</p>
                )}

                <div className="flex items-center justify-between">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    dress.availability === 'Available' 
                      ? 'bg-green-100 text-green-800'
                      : dress.availability === 'On Hold'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {dress.availability}
                  </span>
                  
                  <div className="flex space-x-2">
                    <button className="p-2 text-gray-400 hover:text-pink-500 transition-colors duration-200">
                      <Edit size={16} />
                    </button>
                    <button 
                      onClick={() => deleteDress(dress.id)}
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
        {filteredDresses.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <Shirt className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-gray-600 mb-2">No dresses found</h3>
            <p className="text-gray-500 mb-6">Start building your dream dress collection</p>
            <button
              onClick={() => setShowAddForm(true)}
              className="flex items-center space-x-2 bg-pink-500 text-white px-6 py-3 rounded-lg hover:bg-pink-600 transition-colors duration-200 mx-auto"
            >
              <Plus size={20} />
              <span>Add Your First Dress</span>
            </button>
          </motion.div>
        )}
      </div>
    </Layout>
  )
}
