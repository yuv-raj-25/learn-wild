import React, { useState, useEffect } from 'react';
import { Play, Award, Clock, TrendingUp, BookOpen, Target, Calendar, BarChart } from 'lucide-react';

const UserDashboard = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [streakCount, setStreakCount] = useState(7);
  const [xpPoints, setXpPoints] = useState(1250);
  const [nextLevelXP, setNextLevelXP] = useState(1500);

  const enrolledCourses = [
    {
      id: 1,
      title: "Advanced React Mastery",
      instructor: "Sarah Chen",
      progress: 65,
      nextLesson: "State Management Patterns",
      image: "https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?auto=compress&cs=tinysrgb&w=300",
      timeSpent: "8.5 hours",
      estimatedTime: "4.5 hours left"
    },
    {
      id: 2,
      title: "Creative Design Systems",
      instructor: "Luna Rodriguez",
      progress: 90,
      nextLesson: "Final Project Review",
      image: "https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=300",
      timeSpent: "7.2 hours",
      estimatedTime: "48 minutes left"
    },
    {
      id: 3,
      title: "AI & Machine Learning",
      instructor: "Dr. Marcus Johnson",
      progress: 25,
      nextLesson: "Neural Networks Basics",
      image: "https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=300",
      timeSpent: "4.5 hours",
      estimatedTime: "13.5 hours left"
    }
  ];

  const achievements = [
    { id: 1, title: "First Course Completed", icon: Award, unlocked: true, date: "2 weeks ago" },
    { id: 2, title: "7-Day Learning Streak", icon: TrendingUp, unlocked: true, date: "Today" },
    { id: 3, title: "Early Bird Learner", icon: Calendar, unlocked: true, date: "1 month ago" },
    { id: 4, title: "Knowledge Seeker", icon: BookOpen, unlocked: false, progress: 75 },
    { id: 5, title: "Master Learner", icon: Target, unlocked: false, progress: 30 },
  ];

  const weeklyStats = [
    { day: 'Mon', hours: 2.5 },
    { day: 'Tue', hours: 1.8 },
    { day: 'Wed', hours: 3.2 },
    { day: 'Thu', hours: 2.1 },
    { day: 'Fri', hours: 1.5 },
    { day: 'Sat', hours: 4.0 },
    { day: 'Sun', hours: 2.8 }
  ];

  const progressPercentage = (xpPoints / nextLevelXP) * 100;

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'courses', label: 'My Courses' },
    { id: 'achievements', label: 'Achievements' },
    { id: 'analytics', label: 'Analytics' },
  ];

  return (
    <div className="min-h-screen pt-20 pb-10 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Welcome Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            Welcome Back, Alex! 👋
          </h1>
          <p className="text-xl text-gray-400">Ready to continue your learning journey?</p>
        </div>

        {/* XP Progress Bar */}
        <div className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 border border-purple-500/30 rounded-3xl p-6 mb-12">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-2xl font-bold text-white mb-1">Level 8 Learner</h3>
              <p className="text-purple-300">{xpPoints} / {nextLevelXP} XP to next level</p>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-yellow-400">{streakCount}</div>
              <div className="text-sm text-gray-300">Day Streak 🔥</div>
            </div>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-4 overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full transition-all duration-1000"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
          <div className="flex justify-between mt-2 text-sm text-gray-400">
            <span>Level 8</span>
            <span>{Math.round(progressPercentage)}% complete</span>
            <span>Level 9</span>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="border-b border-white/20 mb-8">
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
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Quick Stats */}
            <div className="lg:col-span-2 space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { label: 'Courses Enrolled', value: '3', icon: BookOpen, color: 'text-blue-400' },
                  { label: 'Hours Learned', value: '24.2', icon: Clock, color: 'text-green-400' },
                  { label: 'Certificates Earned', value: '2', icon: Award, color: 'text-yellow-400' },
                ].map((stat, index) => (
                  <div key={index} className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 text-center">
                    <stat.icon className={`w-8 h-8 ${stat.color} mx-auto mb-2`} />
                    <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
                    <div className="text-gray-400 text-sm">{stat.label}</div>
                  </div>
                ))}
              </div>

              {/* Continue Learning */}
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-3xl p-8">
                <h3 className="text-2xl font-bold text-white mb-6">Continue Learning</h3>
                <div className="space-y-4">
                  {enrolledCourses.slice(0, 2).map(course => (
                    <div key={course.id} className="flex items-center gap-6 p-4 bg-white/5 rounded-2xl hover:bg-white/10 transition-colors cursor-pointer">
                      <img
                        src={course.image}
                        alt={course.title}
                        className="w-16 h-12 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h4 className="font-bold text-white mb-1">{course.title}</h4>
                        <p className="text-gray-400 text-sm mb-2">Next: {course.nextLesson}</p>
                        <div className="flex items-center gap-4">
                          <div className="flex-1 bg-gray-700 rounded-full h-2">
                            <div 
                              className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-300"
                              style={{ width: `${course.progress}%` }}
                            />
                          </div>
                          <span className="text-sm text-gray-400">{course.progress}%</span>
                        </div>
                      </div>
                      <button className="p-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full hover:from-pink-600 hover:to-orange-600 transition-all">
                        <Play className="w-5 h-5 text-white" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Recent Achievements */}
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-3xl p-6">
                <h4 className="text-xl font-bold text-white mb-4">Recent Achievements</h4>
                <div className="space-y-3">
                  {achievements.filter(a => a.unlocked).slice(0, 3).map(achievement => (
                    <div key={achievement.id} className="flex items-center gap-3 p-3 bg-yellow-500/20 border border-yellow-500/30 rounded-lg">
                      <achievement.icon className="w-6 h-6 text-yellow-400" />
                      <div>
                        <div className="text-white font-medium text-sm">{achievement.title}</div>
                        <div className="text-gray-400 text-xs">{achievement.date}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Learning Goal */}
              <div className="bg-gradient-to-br from-green-600/20 to-blue-600/20 border border-green-500/30 rounded-3xl p-6">
                <h4 className="text-xl font-bold text-white mb-4">Weekly Goal</h4>
                <div className="text-center">
                  <div className="relative w-20 h-20 mx-auto mb-4">
                    <svg className="w-20 h-20 transform -rotate-90" viewBox="0 0 100 100">
                      <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-gray-600"/>
                      <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="8" fill="transparent" strokeDasharray={`${2.51 * 75} ${2.51 * 100}`} className="text-green-400"/>
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-lg font-bold text-white">75%</span>
                    </div>
                  </div>
                  <p className="text-gray-300 text-sm">7.5 / 10 hours this week</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'courses' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {enrolledCourses.map(course => (
              <div key={course.id} className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-3xl overflow-hidden hover:bg-white/20 transition-all">
                <img src={course.image} alt={course.title} className="w-full h-48 object-cover" />
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-2">{course.title}</h3>
                  <p className="text-gray-400 mb-4">by {course.instructor}</p>
                  
                  <div className="mb-4">
                    <div className="flex justify-between text-sm text-gray-300 mb-1">
                      <span>Progress</span>
                      <span>{course.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full"
                        style={{ width: `${course.progress}%` }}
                      />
                    </div>
                  </div>

                  <div className="flex justify-between text-sm text-gray-400 mb-6">
                    <span>⏱️ {course.timeSpent}</span>
                    <span>📚 {course.estimatedTime}</span>
                  </div>

                  <button className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg text-white font-medium hover:from-pink-600 hover:to-orange-600 transition-all">
                    Continue Learning
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'achievements' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {achievements.map(achievement => (
              <div key={achievement.id} className={`p-6 rounded-3xl border-2 transition-all ${
                achievement.unlocked 
                  ? 'bg-gradient-to-br from-yellow-500/20 to-orange-500/20 border-yellow-500/50' 
                  : 'bg-white/10 border-white/20'
              }`}>
                <div className="text-center">
                  <div className={`w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center ${
                    achievement.unlocked ? 'bg-yellow-500' : 'bg-gray-600'
                  }`}>
                    <achievement.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">{achievement.title}</h3>
                  {achievement.unlocked ? (
                    <p className="text-yellow-400 text-sm">Unlocked {achievement.date}</p>
                  ) : (
                    <div>
                      <div className="w-full bg-gray-700 rounded-full h-2 mb-2">
                        <div 
                          className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full"
                          style={{ width: `${achievement.progress}%` }}
                        />
                      </div>
                      <p className="text-gray-400 text-sm">{achievement.progress}% complete</p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'analytics' && (
          <div className="space-y-8">
            {/* Weekly Learning Chart */}
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-3xl p-8">
              <h3 className="text-2xl font-bold text-white mb-6">Weekly Learning Activity</h3>
              <div className="flex items-end justify-between h-64 gap-4">
                {weeklyStats.map((stat, index) => (
                  <div key={stat.day} className="flex-1 flex flex-col items-center">
                    <div 
                      className="w-full bg-gradient-to-t from-purple-600 to-pink-600 rounded-t-lg mb-2 min-h-[20px] transition-all duration-500"
                      style={{ height: `${(stat.hours / 4) * 200}px` }}
                    />
                    <div className="text-white font-medium text-sm mb-1">{stat.hours}h</div>
                    <div className="text-gray-400 text-sm">{stat.day}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Learning Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { label: 'Avg. Daily Study Time', value: '2.3 hours', trend: '+12%', color: 'green' },
                { label: 'Completion Rate', value: '87%', trend: '+5%', color: 'blue' },
                { label: 'Streak Record', value: '15 days', trend: 'Best ever!', color: 'yellow' },
                { label: 'Knowledge Points', value: '1,250 XP', trend: '+180', color: 'purple' },
              ].map((stat, index) => (
                <div key={index} className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6">
                  <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
                  <div className="text-gray-400 text-sm mb-2">{stat.label}</div>
                  <div className={`text-sm font-medium ${
                    stat.color === 'green' ? 'text-green-400' :
                    stat.color === 'blue' ? 'text-blue-400' :
                    stat.color === 'yellow' ? 'text-yellow-400' : 'text-purple-400'
                  }`}>
                    {stat.trend}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserDashboard;