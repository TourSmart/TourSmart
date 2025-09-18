import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);
  const location = useLocation();
  const isItineraryPage = location.pathname === '/itinerary';

  // Handle scroll to hide/show navbar
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      const isVisible = prevScrollPos > currentScrollPos || currentScrollPos < 10;
      
      setVisible(isVisible);
      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [prevScrollPos, visible]);

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Tourist Destinations', href: '/destinations' },
    { name: 'Itinerary Planner', href: '/itinerary' },
    { name: 'Interactive Maps', href: '/maps' },
    { name: 'Chatbot', href: '/chatbot' },
    { name: 'Marketplace', href: '/marketplace' },
    { name: 'AR/VR Preview', href: '/ar-vr' },
    { name: 'Transport Info', href: '/transport' },
    { name: 'Feedback', href: '/feedback' },
    { name: 'Admin Dashboard', href: '/admin' },
  ];


  return (
    <nav 
      className={`fixed w-full z-50 transition-all duration-500 ${
        visible ? 'translate-y-0' : '-translate-y-full'
      } ${isItineraryPage ? 'bg-transparent text-white' : 'bg-gray-900/90 backdrop-blur-md text-white'}`}
      style={{
        boxShadow: isItineraryPage ? 'none' : '0 4px 30px rgba(0, 0, 0, 0.1)'
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link 
              to="/" 
              className="flex items-center space-x-3 group relative p-2 rounded-2xl transition-all duration-300 hover:bg-white/10"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
              <div className="flex items-center justify-center bg-white/20 backdrop-blur-sm p-2 rounded-xl">
                <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                  TS
                </span>
              </div>
              <div className="text-left">
                <span className="text-xl font-bold text-white">
                  TourSmart
                </span>
                <span className="block text-xs text-blue-100 font-medium opacity-80">
                  Explore Jharkhand
                </span>
              </div>
            </Link>
            
            <div className="hidden md:ml-6 md:flex items-center space-x-1 bg-white/5 backdrop-blur-lg rounded-2xl p-1.5 border border-white/10">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`px-4 py-2 text-sm font-medium rounded-xl transition-all duration-300 ${
                    location.pathname === item.href
                      ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg shadow-blue-500/20'
                      : 'text-blue-100 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden inline-flex items-center justify-center p-2.5 rounded-xl bg-white/5 backdrop-blur-lg text-blue-100 hover:bg-white/10 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/30 transition-all duration-300"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <XMarkIcon className="block h-5 w-5" aria-hidden="true" />
              ) : (
                <Bars3Icon className="block h-5 w-5" aria-hidden="true" />
              )}
            </button>
            
            <button className="hidden md:flex items-center justify-center p-2.5 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:shadow-lg hover:shadow-blue-500/30 transition-all duration-300">
              <span className="text-sm font-medium">Sign In</span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="md:hidden absolute top-16 left-4 right-4 bg-white/5 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/10 overflow-hidden z-50"
          >
            <div className="p-2 space-y-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`block px-4 py-3 rounded-xl text-base font-medium transition-colors duration-200 ${
                    location.pathname === item.href
                      ? 'bg-gradient-to-r from-blue-500/20 to-purple-600/20 text-white'
                      : 'text-blue-100 hover:bg-white/5 hover:text-white'
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="p-2">
                <button className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 text-white text-sm font-medium hover:shadow-lg hover:shadow-blue-500/30 transition-all duration-300">
                  Sign In
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
