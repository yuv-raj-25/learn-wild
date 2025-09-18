import React from 'react';
import { Home, BookOpen, ShoppingCart, User, Search } from 'lucide-react';

const CircularNavigation = ({ show, onNavigate, currentPage }) => {
  const navigationItems = [
    { id: 'home', icon: Home, label: 'Home', color: 'from-purple-500 to-pink-500' },
    { id: 'catalog', icon: BookOpen, label: 'Courses', color: 'from-blue-500 to-cyan-500' },
    { id: 'cart', icon: ShoppingCart, label: 'Cart', color: 'from-green-500 to-emerald-500' },
    { id: 'dashboard', icon: User, label: 'Dashboard', color: 'from-orange-500 to-red-500' },
  ];

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center pointer-events-none">
      {/* Background Overlay */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm animate-fade-in pointer-events-auto" />
      
      {/* Circular Navigation */}
      <div className="relative w-80 h-80 pointer-events-auto">
        {navigationItems.map((item, index) => {
          const angle = (index * 90) - 45; // Distribute items in a circle
          const radian = (angle * Math.PI) / 180;
          const radius = 120;
          const x = Math.cos(radian) * radius;
          const y = Math.sin(radian) * radius;
          
          const Icon = item.icon;
          const isActive = currentPage === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`absolute w-16 h-16 rounded-full shadow-2xl flex items-center justify-center transform transition-all duration-300 hover:scale-125 group ${
                isActive ? 'scale-110' : ''
              }`}
              style={{
                left: `calc(50% + ${x}px - 32px)`,
                top: `calc(50% + ${y}px - 32px)`,
                animationDelay: `${index * 100}ms`
              }}
              aria-label={item.label}
            >
              <div className={`absolute inset-0 bg-gradient-to-r ${item.color} rounded-full ${
                isActive ? 'animate-pulse' : ''
              }`} />
              <Icon className="w-7 h-7 text-white relative z-10" />
              
              {/* Tooltip */}
              <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <div className="bg-black/80 text-white px-3 py-1 rounded-full text-sm whitespace-nowrap">
                  {item.label}
                </div>
              </div>
            </button>
          );
        })}
        
        {/* Center Circle */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-gradient-to-r from-gray-800 to-gray-900 rounded-full shadow-2xl flex items-center justify-center border-4 border-white/20">
          <div className="w-3 h-3 bg-white rounded-full animate-pulse" />
        </div>
        
        {/* Connecting Lines */}
        {navigationItems.map((_, index) => {
          const angle = (index * 90) - 45;
          const radian = (angle * Math.PI) / 180;
          const startRadius = 40;
          const endRadius = 100;
          const startX = Math.cos(radian) * startRadius;
          const startY = Math.sin(radian) * startRadius;
          const endX = Math.cos(radian) * endRadius;
          const endY = Math.sin(radian) * endRadius;
          
          return (
            <div
              key={index}
              className="absolute w-0.5 bg-gradient-to-r from-transparent via-white/30 to-transparent transform origin-center"
              style={{
                left: `calc(50% + ${startX}px)`,
                top: `calc(50% + ${startY}px)`,
                width: `${endRadius - startRadius}px`,
                height: '1px',
                transform: `rotate(${angle}deg)`,
                animationDelay: `${index * 150}ms`
              }}
            />
          );
        })}
      </div>
    </div>
  );
};

export default CircularNavigation;