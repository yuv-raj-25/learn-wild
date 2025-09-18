import React, { useState } from 'react';
import { Play, Star, Clock, Users, Award, Download, Lock, CheckCircle, ArrowLeft } from 'lucide-react';

const CourseDetail = ({ course, onNavigate, onAddToCart }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [expandedModule, setExpandedModule] = useState(null);

  const courseModules = [
    {
      id: 1,
      title: "Getting Started",
      duration: "2 hours",
      lessons: [
        { id: 1, title: "Introduction to the Course", duration: "10 min", type: "video", free: true },
        { id: 2, title: "Setting Up Your Environment", duration: "15 min", type: "video", free: true },
        { id: 3, title: "Course Resources", duration: "5 min", type: "text", free: false },
      ]
    },
    {
      id: 2,
      title: "Core Concepts",
      duration: "4 hours",
      lessons: [
        { id: 4, title: "Understanding the Fundamentals", duration: "25 min", type: "video", free: false },
        { id: 5, title: "Practical Examples", duration: "30 min", type: "video", free: false },
        { id: 6, title: "Best Practices", duration: "20 min", type: "video", free: false },
        { id: 7, title: "Exercise: Build Your First Project", duration: "45 min", type: "exercise", free: false },
      ]
    },
    {
      id: 3,
      title: "Advanced Techniques",
      duration: "3 hours",
      lessons: [
        { id: 8, title: "Advanced Patterns", duration: "35 min", type: "video", free: false },
        { id: 9, title: "Performance Optimization", duration: "25 min", type: "video", free: false },
        { id: 10, title: "Real-world Case Studies", duration: "40 min", type: "video", free: false },
      ]
    }
  ];

  const reviews = [
    {
      id: 1,
      name: "Michael Chen",
      rating: 5,
      comment: "Excellent course! The instructor explains complex concepts in a very understandable way.",
      date: "2 weeks ago",
      avatar: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150"
    },
    {
      id: 2,
      name: "Sarah Johnson",
      rating: 5,
      comment: "This course completely changed my approach to development. Highly recommended!",
      date: "1 month ago",
      avatar: "https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=150"
    },
    {
      id: 3,
      name: "David Rodriguez",
      rating: 4,
      comment: "Great content and practical examples. The projects really helped solidify my understanding.",
      date: "3 weeks ago",
      avatar: "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=150"
    }
  ];

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'curriculum', label: 'Curriculum' },
    { id: 'instructor', label: 'Instructor' },
    { id: 'reviews', label: 'Reviews' },
  ];

  const getModuleProgress = () => Math.floor(Math.random() * 100);

  return (
    <div className="min-h-screen pt-20 pb-10">
      {/* Back Button */}
      <div className="px-6 mb-6">
        <button
          onClick={() => onNavigate('catalog')}
          className="flex items-center gap-2 text-white hover:text-yellow-400 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Courses
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Course Header */}
            <div className="relative">
              <div className="relative h-96 rounded-3xl overflow-hidden">
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                
                {/* Play Button Overlay */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <button className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border-4 border-white/30 hover:bg-white/30 transition-all transform hover:scale-110">
                    <Play className="w-8 h-8 text-white ml-1" />
                  </button>
                </div>
                
                {/* Course Info Overlay */}
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="flex flex-wrap gap-2 mb-4">
                    {course.tags.map(tag => (
                      <span key={tag} className="px-3 py-1 bg-black/50 backdrop-blur-sm rounded-full text-sm text-white">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h1 className="text-4xl font-bold text-white mb-2">{course.title}</h1>
                  <p className="text-xl text-gray-200">by {course.instructor}</p>
                </div>
              </div>
            </div>

            {/* Course Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { icon: Star, label: 'Rating', value: course.rating, color: 'text-yellow-400' },
                { icon: Users, label: 'Students', value: course.students.toLocaleString(), color: 'text-blue-400' },
                { icon: Clock, label: 'Duration', value: course.duration, color: 'text-green-400' },
                { icon: Award, label: 'Level', value: course.difficulty, color: 'text-purple-400' },
              ].map((stat, index) => (
                <div key={index} className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 text-center">
                  <stat.icon className={`w-8 h-8 ${stat.color} mx-auto mb-2`} />
                  <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                  <div className="text-gray-400 text-sm">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Tabs */}
            <div className="border-b border-white/20">
              <div className="flex space-x-8">
                {tabs.map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`py-4 px-2 border-b-2 font-medium transition-colors ${
                      activeTab === tab.id
                        ? 'border-purple-500 text-purple-400'
                        : 'border-transparent text-gray-400 hover:text-white'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Tab Content */}
            <div className="space-y-6">
              {activeTab === 'overview' && (
                <div className="space-y-6">
                  <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8">
                    <h3 className="text-2xl font-bold text-white mb-4">What You'll Learn</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {[
                        "Master advanced concepts and best practices",
                        "Build real-world projects from scratch",
                        "Understand performance optimization techniques",
                        "Learn industry-standard tools and workflows",
                        "Develop problem-solving skills",
                        "Get hands-on experience with practical exercises"
                      ].map((item, index) => (
                        <div key={index} className="flex items-start gap-3">
                          <CheckCircle className="w-6 h-6 text-green-400 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-300">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8">
                    <h3 className="text-2xl font-bold text-white mb-4">Description</h3>
                    <div className="text-gray-300 space-y-4">
                      <p>
                        This comprehensive course is designed to take you from beginner to expert level. 
                        You'll learn through hands-on projects, real-world examples, and practical exercises 
                        that will prepare you for professional work.
                      </p>
                      <p>
                        Our instructor has years of industry experience and will guide you through each 
                        concept step by step. By the end of this course, you'll have the skills and 
                        confidence to tackle complex projects independently.
                      </p>
                      <p>
                        The course includes lifetime access to all materials, project files, and future 
                        updates. You'll also get access to our exclusive community where you can network 
                        with other students and get support.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'curriculum' && (
                <div className="space-y-4">
                  {courseModules.map(module => (
                    <div key={module.id} className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl overflow-hidden">
                      <button
                        onClick={() => setExpandedModule(expandedModule === module.id ? null : module.id)}
                        className="w-full p-6 text-left flex items-center justify-between hover:bg-white/5 transition-colors"
                      >
                        <div>
                          <h4 className="text-xl font-bold text-white mb-2">{module.title}</h4>
                          <p className="text-gray-400">{module.lessons.length} lessons • {module.duration}</p>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="w-16 h-2 bg-gray-700 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full transition-all duration-300"
                              style={{ width: `${getModuleProgress()}%` }}
                            />
                          </div>
                          <ChevronDown className={`w-5 h-5 text-gray-400 transform transition-transform ${
                            expandedModule === module.id ? 'rotate-180' : ''
                          }`} />
                        </div>
                      </button>
                      
                      {expandedModule === module.id && (
                        <div className="px-6 pb-6 space-y-3">
                          {module.lessons.map(lesson => (
                            <div key={lesson.id} className="flex items-center gap-4 py-3 px-4 bg-white/5 rounded-lg">
                              <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center">
                                {lesson.free ? (
                                  <Play className="w-4 h-4 text-green-400" />
                                ) : (
                                  <Lock className="w-4 h-4 text-gray-400" />
                                )}
                              </div>
                              <div className="flex-1">
                                <h5 className="text-white font-medium">{lesson.title}</h5>
                                <p className="text-sm text-gray-400">{lesson.type} • {lesson.duration}</p>
                              </div>
                              {lesson.free && (
                                <span className="px-2 py-1 bg-green-500/20 text-green-400 text-xs rounded-full">
                                  Free
                                </span>
                              )}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'instructor' && (
                <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8">
                  <div className="flex items-start gap-6 mb-6">
                    <img
                      src="https://images.pexels.com/photos/2381069/pexels-photo-2381069.jpeg?auto=compress&cs=tinysrgb&w=150"
                      alt={course.instructor}
                      className="w-24 h-24 rounded-full object-cover"
                    />
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-2">{course.instructor}</h3>
                      <p className="text-purple-400 mb-4">Senior Developer & Course Creator</p>
                      <div className="flex items-center gap-6 text-sm text-gray-300">
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-yellow-400 fill-current" />
                          <span>4.8 Rating</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="w-4 h-4" />
                          <span>50,000+ Students</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Award className="w-4 h-4" />
                          <span>15 Courses</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="text-gray-300 space-y-4">
                    <p>
                      With over 10 years of experience in software development and 5 years in education, 
                      {course.instructor} has helped thousands of students master their skills and advance their careers.
                    </p>
                    <p>
                      Currently working as a Senior Developer at a Fortune 500 company, they bring real-world 
                      experience and industry best practices to every course they create.
                    </p>
                  </div>
                </div>
              )}

              {activeTab === 'reviews' && (
                <div className="space-y-6">
                  {reviews.map(review => (
                    <div key={review.id} className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6">
                      <div className="flex items-start gap-4">
                        <img
                          src={review.avatar}
                          alt={review.name}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <h5 className="font-bold text-white">{review.name}</h5>
                            <span className="text-sm text-gray-400">{review.date}</span>
                          </div>
                          <div className="flex items-center gap-1 mb-3">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Star
                                key={i}
                                className={`w-4 h-4 ${
                                  i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-600'
                                }`}
                              />
                            ))}
                          </div>
                          <p className="text-gray-300">{review.comment}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              {/* Purchase Card */}
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-3xl p-8">
                <div className="text-center mb-6">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <span className="text-4xl font-bold text-white">${course.price}</span>
                    {course.originalPrice && (
                      <span className="text-xl text-gray-400 line-through">${course.originalPrice}</span>
                    )}
                  </div>
                  {course.originalPrice && (
                    <div className="text-green-400 font-semibold">
                      Save ${course.originalPrice - course.price}!
                    </div>
                  )}
                </div>

                <div className="space-y-4">
                  <button
                    onClick={() => onAddToCart(course)}
                    className="w-full py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl text-white font-bold text-lg hover:from-pink-600 hover:to-orange-600 transition-all transform hover:scale-105"
                  >
                    Add to Cart
                  </button>
                  <button className="w-full py-4 bg-gradient-to-r from-green-600 to-blue-600 rounded-xl text-white font-bold text-lg hover:from-blue-600 hover:to-purple-600 transition-all">
                    Buy Now
                  </button>
                </div>

                <div className="text-center mt-6 text-sm text-gray-400">
                  30-Day Money-Back Guarantee
                </div>
              </div>

              {/* Course Includes */}
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-3xl p-8">
                <h4 className="text-xl font-bold text-white mb-6">This course includes:</h4>
                <div className="space-y-4">
                  {[
                    { icon: Play, text: "12 hours on-demand video" },
                    { icon: Download, text: "Downloadable resources" },
                    { icon: Award, text: "Certificate of completion" },
                    { icon: Users, text: "Access to student community" },
                  ].map((item, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <item.icon className="w-5 h-5 text-purple-400" />
                      <span className="text-gray-300">{item.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;