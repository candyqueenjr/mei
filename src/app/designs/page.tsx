'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { 
  Plus, 
  Search, 
  Heart, 
  Edit, 
  Trash2,
  Palette,
  Tag,
  DollarSign,
  User,
  Calendar,
  Star
} from 'lucide-react'

interface Design {
  id: string
  name: string
  category: string
  description?: string
  images: string[]
  colorPalette: string[]
  isFavorite: boolean
  vendor?: string
  price?: number
}

export default function DesignsPage() {
  const [designs, setDesigns] = useState<Design[]>([
    {
      id: '1',
      name: 'Romantic Rose Garden',
      category: 'floral',
      description: 'Elegant rose arrangements with soft pink and white flowers',
      images: ['/api/placeholder/400/300'],
      colorPalette: ['#F8BBD9', '#FFB6C1', '#FFC0CB', '#FFFFFF'],
      isFavorite: true,
      vendor: 'Bloom & Blossom',
      price: 2500
    },
    {
      id: '2',
      name: 'Modern Minimalist',
      category: 'decoration',
      description: 'Clean lines with white and gold accents',
      images: ['/api/placeholder/400/300'],
      colorPalette: ['#FFFFFF', '#FFD700', '#F5F5F5', '#E5E5E5'],
      isFavorite: false,
      vendor: 'Elegant Events',
      price: 1800
    }
  ])

  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [showAddForm, setShowAddForm] = useState(false)

  const categories = [
    { value: 'all', label: 'All Designs' },
    { value: 'floral', label: 'Floral Arrangements' },
    { value: 'decoration', label: 'Decorations' },
    { value: 'color_palette', label: 'Color Palette' },
    { value: 'mood_board', label: 'Mood Board' }
  ]

  const filteredDesigns = designs.filter(design => {
    const matchesSearch = design.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         design.description?.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesCategory = selectedCategory === 'all' || design.category === selectedCategory
    
    return matchesSearch && matchesCategory
  })

  const toggleFavorite = (id: string) => {
    setDesigns(designs.map(design =>
      design.id === id 
        ? { ...design, isFavorite: !design.isFavorite }
        : design
    ))
  }

  const deleteDesign = (id: string) => {
    setDesigns(designs.filter(design => design.id !== id))
  }

  return (
    <div className="space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
        >
          <div>
            <h1 className="text-3xl font-bold text-pink-700">Designs & Decorations</h1>
            <p className="text-pink-600">Create and manage your wedding design elements and decorations</p>
          </div>
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="flex items-center space-x-2 bg-pink-500 text-white px-6 py-3 rounded-lg hover:bg-pink-600 transition-colors duration-200"
          >
            <Plus size={20} />
            <span>Add Design</span>
          </button>
        </motion.div>

        {/* Filters and Search */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex flex-col md:flex-row gap-4"
        >
          {/* Search Bar */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search designs by name or description..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
            />
          </div>

          {/* Category Filter */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
          >
            {categories.map(category => (
              <option key={category.value} value={category.value}>
                {category.label}
              </option>
            ))}
          </select>
        </motion.div>

        {/* Add Form */}
        {showAddForm && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-white rounded-xl shadow-lg p-6"
          >
            <h3 className="text-xl font-bold text-pink-700 mb-4">Add New Design</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  placeholder="Design name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent">
                  <option value="">Select category</option>
                  <option value="floral">Floral Arrangements</option>
                  <option value="decoration">Decorations</option>
                  <option value="color_palette">Color Palette</option>
                  <option value="mood_board">Mood Board</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Vendor</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  placeholder="Vendor name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Price</label>
                <input
                  type="number"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  placeholder="Price"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Color Palette</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  placeholder="Enter hex colors separated by commas (e.g., #F8BBD9, #FFB6C1)"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  rows={3}
                  placeholder="Design description and details"
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
                Add Design
              </button>
            </div>
          </motion.div>
        )}

        {/* Designs Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredDesigns.map((design, index) => (
            <motion.div
              key={design.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              {/* Image */}
              <div className="h-48 bg-gradient-to-br from-pink-200 to-pink-300 relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <Palette className="w-16 h-16 text-pink-500" />
                </div>
                <button
                  onClick={() => toggleFavorite(design.id)}
                  className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md hover:bg-pink-50 transition-colors duration-200"
                >
                  <Heart 
                    size={20} 
                    className={design.isFavorite ? 'text-pink-500 fill-current' : 'text-gray-400'} 
                  />
                </button>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-xl font-bold text-gray-800">{design.name}</h3>
                  {design.price && (
                    <div className="flex items-center space-x-1 text-green-600">
                      <DollarSign size={16} />
                      <span className="font-bold">{design.price.toLocaleString()}</span>
                    </div>
                  )}
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center space-x-2 text-gray-600">
                    <Tag size={16} />
                    <span className="capitalize">{design.category.replace('_', ' ')}</span>
                  </div>
                  {design.vendor && (
                    <div className="flex items-center space-x-2 text-gray-600">
                      <User size={16} />
                      <span className="text-sm">{design.vendor}</span>
                    </div>
                  )}
                </div>

                {design.description && (
                  <p className="text-gray-600 text-sm mb-4">{design.description}</p>
                )}

                {/* Color Palette */}
                {design.colorPalette.length > 0 && (
                  <div className="mb-4">
                    <p className="text-sm font-medium text-gray-700 mb-2">Color Palette</p>
                    <div className="flex space-x-2">
                      {design.colorPalette.map((color, idx) => (
                        <div
                          key={idx}
                          className="w-8 h-8 rounded-full border-2 border-white shadow-sm"
                          style={{ backgroundColor: color }}
                          title={color}
                        />
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 bg-pink-100 text-pink-700 text-xs rounded-full font-medium">
                    {design.category.replace('_', ' ').toUpperCase()}
                  </span>
                  
                  <div className="flex space-x-2">
                    <button className="p-2 text-gray-400 hover:text-pink-500 transition-colors duration-200">
                      <Edit size={16} />
                    </button>
                    <button 
                      onClick={() => deleteDesign(design.id)}
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
        {filteredDesigns.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <Palette className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-gray-600 mb-2">No designs found</h3>
            <p className="text-gray-500 mb-6">Start creating your wedding design elements</p>
            <button
              onClick={() => setShowAddForm(true)}
              className="flex items-center space-x-2 bg-pink-500 text-white px-6 py-3 rounded-lg hover:bg-pink-600 transition-colors duration-200 mx-auto"
            >
              <Plus size={20} />
              <span>Add Your First Design</span>
            </button>
          </motion.div>
        )}
      </div>
  )
}
