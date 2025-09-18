import { useState, useEffect } from 'react';
import { ShoppingCart, User, Star, Play, Clock, Users, Award, Menu, X, Search, Filter, ChevronDown } from 'lucide-react';
import Homepage from './components/Homepage';
import CourseCatalog from './components/CourseCatalog';
import CourseDetail from './components/CourseDetail';
import Cart from './components/Cart';
import UserDashboard from './components/UserDashboard';
import CircularNavigation from './components/CircularNavigation';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [showCircularNav, setShowCircularNav] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [scrollY, setScrollY] = useState(0);
  const [selectedCourse, setSelectedCourse] = useState(null);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const addToCart = (course: any) => {
    setCartItems(prev => [...prev, course]);
  };

  const removeFromCart = (courseId) => {
    setCartItems(prev => prev.filter(item => item.id !== courseId));
  };

  const navigateToPage = (page, course = null) => {
    setCurrentPage(page);
    if (course) setSelectedCourse(course);
    setShowCircularNav(false);
  };

  const backgroundHue = Math.min(scrollY / 10, 360);

  return (
    <div className="min-h-screen transition-all duration-1000 ease-in-out" 
         style={{ 
           background: `linear-gradient(135deg, 
             hsl(${backgroundHue}, 70%, 12%) 0%, 
             hsl(${(backgroundHue + 60) % 360}, 80%, 8%) 50%, 
             hsl(${(backgroundHue + 120) % 360}, 60%, 15%) 100%)`
         }}>
      
      {/* Floating Action Button for Circular Navigation */}
      <button
        onClick={() => setShowCircularNav(!showCircularNav)}
        className="fixed top-6 left-6 z-50 w-14 h-14 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 rounded-full shadow-2xl flex items-center justify-center transform transition-all duration-300 hover:scale-110 hover:rotate-90"
        aria-label="Open Navigation Menu"
      >
        {showCircularNav ? <X className="w-6 h-6 text-white" /> : <Menu className="w-6 h-6 text-white" />}
      </button>

      {/* Shopping Cart Badge */}
      <button
        onClick={() => navigateToPage('cart')}
        className="fixed top-6 right-6 z-50 w-14 h-14 bg-gradient-to-r from-green-500 to-blue-500 rounded-full shadow-2xl flex items-center justify-center transform transition-all duration-300 hover:scale-110 hover:rotate-12"
        aria-label={`Shopping cart with ${cartItems.length} items`}
      >
        <ShoppingCart className="w-6 h-6 text-white" />
        {cartItems.length > 0 && (
          <span className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full text-white text-xs flex items-center justify-center animate-pulse">
            {cartItems.length}
          </span>
        )}
      </button>

      {/* Circular Navigation Overlay */}
      <CircularNavigation 
        show={showCircularNav}
        onNavigate={navigateToPage}
        currentPage={currentPage}
      />

      {/* Main Content */}
      <div className="relative z-10">
        {currentPage === 'home' && (
          <Homepage 
            onNavigate={navigateToPage}
            onAddToCart={addToCart}
          />
        )}
        {currentPage === 'catalog' && (
          <CourseCatalog 
            onNavigate={navigateToPage}
            onAddToCart={addToCart}
          />
        )}
        {currentPage === 'course' && selectedCourse && (
          <CourseDetail 
            course={selectedCourse}
            onNavigate={navigateToPage}
            onAddToCart={addToCart}
          />
        )}
        {currentPage === 'cart' && (
          <Cart 
            items={cartItems}
            onRemove={removeFromCart}
            onNavigate={navigateToPage}
          />
        )}
        {currentPage === 'dashboard' && (
          <UserDashboard onNavigate={navigateToPage} />
        )}
      </div>

      {/* Background Particles */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {Array.from({ length: 50 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-white rounded-full opacity-10 animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`
            }}
          />
        ))}
      </div>
    </div>
  );
}

export default App;