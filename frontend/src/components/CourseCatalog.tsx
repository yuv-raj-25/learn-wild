import React, { useState, useEffect } from 'react';
import { Search, Filter, Star, Clock, Users, ChevronDown, Grid, List, SlidersHorizontal } from 'lucide-react';

const CourseCatalog = ({ onNavigate, onAddToCart }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [priceRange, setPriceRange] = useState([0, 500]);
  const [sortBy, setSortBy] = useState('popular');
  const [viewMode, setViewMode] = useState('grid');
  const [showFilters, setShowFilters] = useState(false);

  const courses = [
    {
      id: 1,
      title: "Advanced React Mastery",
      instructor: "Sarah Chen",
      price: 199,
      originalPrice: 299,
      rating: 4.9,
      students: 15420,
      duration: "12 hours",
      image: "https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?auto=compress&cs=tinysrgb&w=600",
      category: "development",
      tags: ["React", "JavaScript", "Frontend"],
      difficulty: "Advanced",
      description: "Master advanced React concepts and build scalable applications"
    },
    {
      id: 2,
      title: "AI & Machine Learning Fundamentals",
      instructor: "Dr. Marcus Johnson",
      price: 299,
      originalPrice: 399,
      rating: 4.8,
      students: 8330,
      duration: "18 hours",
      image: "https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=600",
      category: "data-science",
      tags: ["AI", "Python", "Data Science"],
      difficulty: "Intermediate",
      description: "Learn the fundamentals of AI and machine learning with hands-on projects"
    },
    {
      id: 3,
      title: "Creative Design Systems",
      instructor: "Luna Rodriguez",
      price: 149,
      originalPrice: 199,
      rating: 4.9,
      students: 12100,
      duration: "8 hours",
      image: "https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=600",
      category: "design",
      tags: ["Design", "UI/UX", "Figma"],
      difficulty: "Beginner",
      description: "Create cohesive and scalable design systems from scratch"
    },
    {
      id: 4,
      title: "Node.js Backend Development",
      instructor: "Alex Thompson",
      price: 249,
      originalPrice: 349,
      rating: 4.7,
      students: 9580,
      duration: "15 hours",
      image: "https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg?auto=compress&cs=tinysrgb&w=600",
      category: "development",
      tags: ["Node.js", "Backend", "API"],
      difficulty: "Intermediate",
      description: "Build robust backend applications with Node.js and Express"
    },
    {
      id: 5,
      title: "Digital Marketing Mastery",
      instructor: "Emma Wilson",
      price: 179,
      originalPrice: 259,
      rating: 4.6,
      students: 18500,
      duration: "10 hours",
      image: "https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=600",
      category: "marketing",
      tags: ["Marketing", "SEO", "Social Media"],
      difficulty: "Beginner",
      description: "Master digital marketing strategies and grow your online presence"
    },
    {
      id: 6,
      title: "3D Modeling with Blender",
      instructor: "David Park",
      price: 199,
      originalPrice: 299,
      rating: 4.8,
      students: 7200,
      duration: "20 hours",
      image: "https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg?auto=compress&cs=tinysrgb&w=600",
      category: "design",
      tags: ["3D", "Blender", "Modeling"],
      difficulty: "Advanced",
      description: "Create stunning 3D models and animations using Blender"
    }
  ];

  const categories = [
    { id: 'all', label: 'All Categories' },
    { id: 'development', label: 'Development' },
    { id: 'design', label: 'Design' },
    { id: 'marketing', label: 'Marketing' },
    { id: 'data-science', label: 'Data Science' },
  ];

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.instructor.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || course.category === selectedCategory;
    const matchesPrice = course.price >= priceRange[0] && course.price <= priceRange[1];
    
    return matchesSearch && matchesCategory && matchesPrice;
  });

  const sortedCourses = [...filteredCourses].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'rating':
        return b.rating - a.rating;
      case 'newest':
        return b.id - a.id;
      default: // popular
        return b.students - a.students;
    }
  });

  return (
    <div className="min-h-screen pt-20 pb-10 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            Discover Your Next Skill
          </h1>
          <p className="text-xl text-gray-400">
            {sortedCourses.length} courses available
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 space-y-6">
          {/* Search Bar */}
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search courses, instructors, or skills..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white placeholder-gray-400 focus:outline-none focus:border-white/40 focus:bg-white/20 transition-all"
            />
          </div>

          {/* Filter Toggle and View Mode */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-6 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white hover:bg-white/20 transition-all"
            >
              <SlidersHorizontal className="w-5 h-5" />
              Filters
              <ChevronDown className={`w-4 h-4 transform transition-transform ${showFilters ? 'rotate-180' : ''}`} />
            </button>

            <div className="flex items-center gap-4">
              {/* Sort Dropdown */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-white focus:outline-none focus:border-white/40"
              >
                <option value="popular">Most Popular</option>
                <option value="rating">Highest Rated</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="newest">Newest</option>
              </select>

              {/* View Mode Toggle */}
              <div className="flex bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg overflow-hidden">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 ${viewMode === 'grid' ? 'bg-white/20' : ''} transition-colors`}
                >
                  <Grid className="w-5 h-5 text-white" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 ${viewMode === 'list' ? 'bg-white/20' : ''} transition-colors`}
                >
                  <List className="w-5 h-5 text-white" />
                </button>
              </div>
            </div>
          </div>

          {/* Expanded Filters */}
          {showFilters && (
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Category Filter */}
                <div>
                  <label className="block text-white font-semibold mb-3">Category</label>
                  <div className="space-y-2">
                    {categories.map(category => (
                      <button
                        key={category.id}
                        onClick={() => setSelectedCategory(category.id)}
                        className={`block w-full text-left px-3 py-2 rounded-lg transition-colors ${
                          selectedCategory === category.id
                            ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
                            : 'text-gray-300 hover:bg-white/10'
                        }`}
                      >
                        {category.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Price Range */}
                <div>
                  <label className="block text-white font-semibold mb-3">
                    Price Range: ${priceRange[0]} - ${priceRange[1]}
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="500"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                    className="w-full"
                  />
                </div>

                {/* Difficulty Level */}
                <div>
                  <label className="block text-white font-semibold mb-3">Difficulty</label>
                  <div className="flex flex-wrap gap-2">
                    {['Beginner', 'Intermediate', 'Advanced'].map(level => (
                      <button
                        key={level}
                        className="px-3 py-1 bg-white/10 border border-white/20 rounded-full text-white hover:bg-white/20 transition-colors"
                      >
                        {level}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Courses Grid */}
        <div className={`${
          viewMode === 'grid' 
            ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8' 
            : 'space-y-6'
        }`}>
          {sortedCourses.map((course, index) => (
            <div
              key={course.id}
              className={`group bg-white/10 backdrop-blur-sm border border-white/20 rounded-3xl overflow-hidden transform transition-all duration-500 hover:scale-105 hover:bg-white/20 ${
                viewMode === 'list' ? 'flex' : ''
              }`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Course Image */}
              <div className={`relative overflow-hidden ${viewMode === 'list' ? 'w-64 h-48' : 'h-48'}`}>
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                
                {/* Sale Badge */}
                {course.originalPrice > course.price && (
                  <div className="absolute top-4 left-4 bg-red-500 text-white px-2 py-1 rounded-full text-sm font-bold">
                    {Math.round((1 - course.price / course.originalPrice) * 100)}% OFF
                  </div>
                )}
                
                {/* Difficulty Badge */}
                <div className="absolute top-4 right-4">
                  <span className={`px-3 py-1 rounded-full text-sm font-bold ${
                    course.difficulty === 'Beginner' ? 'bg-green-500' :
                    course.difficulty === 'Intermediate' ? 'bg-yellow-500' : 'bg-red-500'
                  } text-white`}>
                    {course.difficulty}
                  </span>
                </div>
                
                {/* Tags */}
                <div className="absolute bottom-4 left-4 flex gap-2">
                  {course.tags.slice(0, 2).map(tag => (
                    <span key={tag} className="px-2 py-1 bg-black/50 rounded-full text-xs text-white">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Course Content */}
              <div className={`p-6 ${viewMode === 'list' ? 'flex-1' : ''}`}>
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-bold text-white group-hover:text-yellow-400 transition-colors">
                    {course.title}
                  </h3>
                </div>
                
                <p className="text-gray-400 mb-2">by {course.instructor}</p>
                <p className="text-gray-300 text-sm mb-4">{course.description}</p>
                
                {/* Course Stats */}
                <div className="flex items-center gap-4 mb-4 text-sm text-gray-300">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span>{course.rating}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    <span>{course.students.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{course.duration}</span>
                  </div>
                </div>

                {/* Price and Actions */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-bold text-white">
                      ${course.price}
                    </span>
                    {course.originalPrice > course.price && (
                      <span className="text-gray-400 line-through text-lg">
                        ${course.originalPrice}
                      </span>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => onNavigate('course', course)}
                      className="px-4 py-2 bg-white/20 rounded-lg text-white hover:bg-white/30 transition-colors"
                    >
                      Details
                    </button>
                    <button
                      onClick={() => onAddToCart(course)}
                      className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg text-white hover:from-pink-600 hover:to-orange-600 transition-all transform hover:scale-105"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {sortedCourses.length === 0 && (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-bold text-white mb-2">No courses found</h3>
            <p className="text-gray-400">Try adjusting your filters or search terms</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CourseCatalog;