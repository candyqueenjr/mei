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
  Camera,
  MapPin,
  Calendar,
  User,
  Tag,
  Upload,
  Grid,
  List
} from 'lucide-react'

interface Photo {
  id: string
  title: string
  category: string
  description?: string
  imageUrl: string
  tags: string[]
  isFavorite: boolean
  photographer?: string
  location?: string
  date?: string
}

export default function PhotographsPage() {
  const [photos, setPhotos] = useState<Photo[]>([
    {
      id: '1',
      title: 'Engagement Ring',
      category: 'engagement',
      description: 'Beautiful engagement ring shot',
      imageUrl: '/api/placeholder/400/300',
      tags: ['ring', 'engagement', 'close-up'],
      isFavorite: true,
      photographer: 'John Smith',
      location: 'Central Park',
      date: '2024-01-15'
    },
    {
      id: '2',
      title: 'Venue Preview',
      category: 'venue',
      description: 'Garden venue during golden hour',
      imageUrl: '/api/placeholder/400/300',
      tags: ['venue', 'garden', 'golden-hour'],
      isFavorite: false,
      photographer: 'Sarah Johnson',
      location: 'Garden Venue',
      date: '2024-01-20'
    }
  ])

  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [showAddForm, setShowAddForm] = useState(false)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')

  const categories = [
    { value: 'all', label: 'All Photos' },
    { value: 'engagement', label: 'Engagement' },
    { value: 'wedding', label: 'Wedding Day' },
    { value: 'family', label: 'Family' },
    { value: 'venue', label: 'Venue' }
  ]

  const filteredPhotos = photos.filter(photo => {
    const matchesSearch = photo.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         photo.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         photo.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    
    const matchesCategory = selectedCategory === 'all' || photo.category === selectedCategory
    
    return matchesSearch && matchesCategory
  })

  const toggleFavorite = (id: string) => {
    setPhotos(photos.map(photo =>
      photo.id === id 
        ? { ...photo, isFavorite: !photo.isFavorite }
        : photo
    ))
  }

  const deletePhoto = (id: string) => {
    setPhotos(photos.filter(photo => photo.id !== id))
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
            <h1 className="text-3xl font-bold text-pink-700">Photographs</h1>
            <p className="text-pink-600">Manage your wedding photo collection and photographer contacts</p>
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
              className="p-2 bg-pink-100 text-pink-700 rounded-lg hover:bg-pink-200 transition-colors duration-200"
            >
              {viewMode === 'grid' ? <List size={20} /> : <Grid size={20} />}
            </button>
            <button
              onClick={() => setShowAddForm(!showAddForm)}
              className="flex items-center space-x-2 bg-pink-500 text-white px-6 py-3 rounded-lg hover:bg-pink-600 transition-colors duration-200"
            >
              <Plus size={20} />
              <span>Add Photo</span>
            </button>
          </div>
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
              placeholder="Search photos by title, description, or tags..."
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
            <h3 className="text-xl font-bold text-pink-700 mb-4">Add New Photo</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  placeholder="Photo title"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent">
                  <option value="">Select category</option>
                  <option value="engagement">Engagement</option>
                  <option value="wedding">Wedding Day</option>
                  <option value="family">Family</option>
                  <option value="venue">Venue</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Photographer</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  placeholder="Photographer name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  placeholder="Photo location"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
                <input
                  type="date"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Tags</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  placeholder="Tags separated by commas"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  rows={3}
                  placeholder="Photo description"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Upload Photo</label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-pink-400 transition-colors duration-200">
                  <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-500">Click to upload or drag and drop</p>
                  <p className="text-sm text-gray-400">PNG, JPG, GIF up to 10MB</p>
                </div>
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
                Add Photo
              </button>
            </div>
          </motion.div>
        )}

        {/* Photos Display */}
        {viewMode === 'grid' ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {filteredPhotos.map((photo, index) => (
              <motion.div
                key={photo.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                {/* Image */}
                <div className="h-48 bg-gradient-to-br from-pink-200 to-pink-300 relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Camera className="w-12 h-12 text-pink-500" />
                  </div>
                  <button
                    onClick={() => toggleFavorite(photo.id)}
                    className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md hover:bg-pink-50 transition-colors duration-200"
                  >
                    <Heart 
                      size={16} 
                      className={photo.isFavorite ? 'text-pink-500 fill-current' : 'text-gray-400'} 
                    />
                  </button>
                </div>

                {/* Content */}
                <div className="p-4">
                  <h3 className="font-bold text-gray-800 mb-2">{photo.title}</h3>
                  <div className="space-y-1 mb-3">
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <Tag size={14} />
                      <span className="capitalize">{photo.category}</span>
                    </div>
                    {photo.photographer && (
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <User size={14} />
                        <span>{photo.photographer}</span>
                      </div>
                    )}
                    {photo.location && (
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <MapPin size={14} />
                        <span>{photo.location}</span>
                      </div>
                    )}
                    {photo.date && (
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <Calendar size={14} />
                        <span>{new Date(photo.date).toLocaleDateString()}</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex flex-wrap gap-1">
                      {photo.tags.slice(0, 2).map((tag, idx) => (
                        <span key={idx} className="px-2 py-1 bg-pink-100 text-pink-700 text-xs rounded-full">
                          {tag}
                        </span>
                      ))}
                      {photo.tags.length > 2 && (
                        <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                          +{photo.tags.length - 2}
                        </span>
                      )}
                    </div>
                    
                    <div className="flex space-x-1">
                      <button className="p-1 text-gray-400 hover:text-pink-500 transition-colors duration-200">
                        <Edit size={14} />
                      </button>
                      <button 
                        onClick={() => deletePhoto(photo.id)}
                        className="p-1 text-gray-400 hover:text-red-500 transition-colors duration-200"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="space-y-4"
          >
            {filteredPhotos.map((photo, index) => (
              <motion.div
                key={photo.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-20 h-20 bg-gradient-to-br from-pink-200 to-pink-300 rounded-lg flex items-center justify-center">
                    <Camera className="w-8 h-8 text-pink-500" />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-lg font-bold text-gray-800">{photo.title}</h3>
                      <button
                        onClick={() => toggleFavorite(photo.id)}
                        className="p-1 hover:bg-pink-50 rounded transition-colors duration-200"
                      >
                        <Heart 
                          size={16} 
                          className={photo.isFavorite ? 'text-pink-500 fill-current' : 'text-gray-400'} 
                        />
                      </button>
                    </div>
                    
                    <div className="flex items-center space-x-4 text-sm text-gray-600 mb-2">
                      <span className="capitalize bg-pink-100 text-pink-700 px-2 py-1 rounded-full">
                        {photo.category}
                      </span>
                      {photo.photographer && <span>by {photo.photographer}</span>}
                      {photo.location && <span>at {photo.location}</span>}
                      {photo.date && <span>{new Date(photo.date).toLocaleDateString()}</span>}
                    </div>
                    
                    {photo.description && (
                      <p className="text-gray-600 text-sm mb-2">{photo.description}</p>
                    )}
                    
                    <div className="flex items-center justify-between">
                      <div className="flex flex-wrap gap-1">
                        {photo.tags.map((tag, idx) => (
                          <span key={idx} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                            {tag}
                          </span>
                        ))}
                      </div>
                      
                      <div className="flex space-x-2">
                        <button className="p-2 text-gray-400 hover:text-pink-500 transition-colors duration-200">
                          <Edit size={16} />
                        </button>
                        <button 
                          onClick={() => deletePhoto(photo.id)}
                          className="p-2 text-gray-400 hover:text-red-500 transition-colors duration-200"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Empty State */}
        {filteredPhotos.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <Camera className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-gray-600 mb-2">No photos found</h3>
            <p className="text-gray-500 mb-6">Start building your wedding photo collection</p>
            <button
              onClick={() => setShowAddForm(true)}
              className="flex items-center space-x-2 bg-pink-500 text-white px-6 py-3 rounded-lg hover:bg-pink-600 transition-colors duration-200 mx-auto"
            >
              <Plus size={20} />
              <span>Add Your First Photo</span>
            </button>
          </motion.div>
        )}
      </div>
    </Layout>
  )
}
