import React, { useState, useEffect } from 'react';
import { Play, Star, Users, Clock, ArrowRight, Zap, Target, TrendingUp } from 'lucide-react';

const Homepage = ({ onNavigate, onAddToCart }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [activeFeature, setActiveFeature] = useState(0);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const featuredCourses = [
    {
      id: 1,
      title: "Advanced React Mastery",
      instructor: "Sarah Chen",
      price: 199,
      rating: 4.9,
      students: 15420,
      duration: "12 hours",
      image: "https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?auto=compress&cs=tinysrgb&w=600",
      tags: ["React", "JavaScript", "Frontend"],
      difficulty: "Advanced"
    },
    {
      id: 2,
      title: "AI & Machine Learning Fundamentals",
      instructor: "Dr. Marcus Johnson",
      price: 299,
      rating: 4.8,
      students: 8330,
      duration: "18 hours",
      image: "https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=600",
      tags: ["AI", "Python", "Data Science"],
      difficulty: "Intermediate"
    },
    {
      id: 3,
      title: "Creative Design Systems",
      instructor: "Luna Rodriguez",
      price: 149,
      rating: 4.9,
      students: 12100,
      duration: "8 hours",
      image: "https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=600",
      tags: ["Design", "UI/UX", "Figma"],
      difficulty: "Beginner"
    }
  ];

  const features = [
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Lightning Fast Learning",
      description: "Accelerated learning paths with AI-powered personalization"
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: "Goal-Oriented Curriculum",
      description: "Every course designed with clear outcomes and project-based learning"
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: "Career Advancement",
      description: "Industry-recognized certifications that boost your professional growth"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % features.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Hero Section with Morphing Background */}
      <section className="relative h-screen flex items-center justify-center">
        {/* Dynamic Gradient Overlay */}
        <div 
          className="absolute inset-0 opacity-30 transition-all duration-1000"
          style={{
            background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, 
              rgba(139, 92, 246, 0.3) 0%, 
              rgba(236, 72, 153, 0.2) 30%, 
              rgba(59, 130, 246, 0.1) 70%, 
              transparent 100%)`
          }}
        />

        <div className="relative z-10 text-center max-w-6xl mx-auto px-6">
          {/* Animated Title */}
          <h1 className="text-7xl md:text-9xl font-black mb-8 leading-none">
            <span className="inline-block transform hover:scale-110 transition-transform duration-300 bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 bg-clip-text text-transparent">
              LEARN
            </span>
            <br />
            <span className="inline-block transform hover:scale-110 transition-transform duration-300 delay-100 bg-gradient-to-r from-blue-400 via-green-400 to-yellow-400 bg-clip-text text-transparent">
              BEYOND
            </span>
            <br />
            <span className="inline-block transform hover:scale-110 transition-transform duration-300 delay-200 bg-gradient-to-r from-red-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              LIMITS
            </span>
          </h1>

          {/* Tagline with Typewriter Effect */}
          <p className="text-2xl md:text-3xl text-gray-300 mb-12 font-light tracking-wide">
            Where Innovation Meets Education
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <button
              onClick={() => onNavigate('catalog')}
              className="group relative px-12 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full text-white font-bold text-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-2xl"
            >
              <span className="relative z-10">Explore Courses</span>
              <div className="absolute inset-0 bg-gradient-to-r from-pink-600 to-orange-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
              <ArrowRight className="inline-block ml-2 w-5 h-5 transform group-hover:translate-x-2 transition-transform duration-300" />
            </button>
            
            <button className="group px-12 py-4 border-2 border-white/30 rounded-full text-white font-bold text-lg backdrop-blur-sm transform transition-all duration-300 hover:scale-105 hover:border-white/60 hover:bg-white/10">
              <Play className="inline-block mr-2 w-5 h-5" />
              Watch Demo
            </button>
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-1/4 left-10 animate-bounce delay-1000">
          <div className="w-20 h-20 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full blur-xl opacity-60" />
        </div>
        <div className="absolute bottom-1/4 right-10 animate-bounce delay-2000">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-green-400 rounded-full blur-xl opacity-60" />
        </div>
      </section>

      {/* Features Section with Rotating Cards */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-5xl font-bold text-center mb-16 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            Why Choose Our Platform?
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className={`relative p-8 rounded-3xl backdrop-blur-sm border transition-all duration-500 transform ${
                  activeFeature === index
                    ? 'bg-white/20 border-white/40 scale-105 shadow-2xl'
                    : 'bg-white/10 border-white/20 hover:bg-white/15'
                }`}
              >
                <div className={`text-center transition-all duration-500 ${
                  activeFeature === index ? 'text-yellow-400' : 'text-white'
                }`}>
                  <div className="mb-6 flex justify-center">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-4">{feature.title}</h3>
                  <p className="text-gray-300">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Courses Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Featured Courses
            </h2>
            <p className="text-xl text-gray-400">
              Hand-picked courses from industry experts
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredCourses.map((course, index) => (
              <div
                key={course.id}
                className="group relative bg-white/10 backdrop-blur-sm rounded-3xl overflow-hidden border border-white/20 transform transition-all duration-500 hover:scale-105 hover:bg-white/20"
                style={{
                  animationDelay: `${index * 200}ms`
                }}
              >
                {/* Course Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={course.image}
                    alt={course.title}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute top-4 left-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-bold ${
                      course.difficulty === 'Beginner' ? 'bg-green-500' :
                      course.difficulty === 'Intermediate' ? 'bg-yellow-500' : 'bg-red-500'
                    } text-white`}>
                      {course.difficulty}
                    </span>
                  </div>
                  <div className="absolute bottom-4 right-4 flex gap-2">
                    {course.tags.slice(0, 2).map(tag => (
                      <span key={tag} className="px-2 py-1 bg-black/50 rounded-full text-xs text-white">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Course Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-yellow-400 transition-colors">
                    {course.title}
                  </h3>
                  <p className="text-gray-400 mb-4">by {course.instructor}</p>
                  
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
                    <span className="text-2xl font-bold text-white">
                      ${course.price}
                    </span>
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

          <div className="text-center mt-12">
            <button
              onClick={() => onNavigate('catalog')}
              className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full text-white font-bold hover:from-purple-600 hover:to-pink-600 transition-all transform hover:scale-105"
            >
              View All Courses
            </button>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 px-6 relative">
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-4xl font-bold text-white mb-6">
            Stay Ahead of the Curve
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Get notified about new courses, exclusive discounts, and industry insights.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-6 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white placeholder-gray-400 focus:outline-none focus:border-white/40"
            />
            <button className="px-8 py-3 bg-gradient-to-r from-green-600 to-blue-600 rounded-full text-white font-bold hover:from-blue-600 hover:to-purple-600 transition-all">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Homepage;