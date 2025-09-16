import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Tourist Destinations', href: '/destinations' },
    { name: 'Itinerary Planner', href: '/itinerary' },
    { name: 'Chatbot', href: '/chatbot' },
    { name: 'Marketplace', href: '/marketplace' },
    { name: 'AR/VR Preview', href: '/ar-vr' },
    { name: 'Transport Info', href: '/transport' },
    { name: 'Feedback', href: '/feedback' },
    { name: 'Admin Dashboard', href: '/admin' },
  ];

  return (
    <nav className="bg-gradient-to-r from-indigo-900 via-purple-900 to-blue-900 shadow-xl sticky top-0 z-50 backdrop-blur-sm bg-opacity-90">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Link to="/" className="flex items-center space-x-3 group">
                <div className="flex items-center justify-center bg-transparent">
                  {/* <img 
                    src="/public/logo.svg" 
                    alt="TourSmart Logo" 
                    className="h-12 w-auto transform group-hover:scale-105 transition-transform duration-300"
                  /> */}
                </div>
                <div>
                  <span className="text-2xl font-extrabold text-white">
                    TourSmart
                  </span>
                  <span className="block text-sm text-purple-200 font-medium -mt-1">
                    Explore Jharkhand
                  </span>
                </div>
              </Link>
            </div>
            <div className="hidden md:ml-10 md:flex items-center space-x-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    location.pathname === item.href
                      ? 'bg-white/10 text-white shadow-lg backdrop-blur-sm'
                      : 'text-purple-100 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
          <div className="-mr-2 flex items-center md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-purple-200 hover:text-white hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-pink-400 transition-all"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className={`${isOpen ? 'block' : 'hidden'} md:hidden absolute top-20 left-0 right-0 bg-gradient-to-b from-indigo-900 to-blue-900 shadow-2xl rounded-b-xl py-2 z-50 backdrop-blur-lg`}>
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`block px-4 py-3 rounded-lg mx-2 text-base font-medium ${
                  location.pathname === item.href
                    ? 'bg-white/10 text-white backdrop-blur-sm'
                    : 'text-purple-100 hover:bg-white/5 hover:text-white'
                }`}
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
