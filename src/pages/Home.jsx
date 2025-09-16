import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const slides = [
  {
    text: '🌳 "Jharkhand — The heart of India\'s forests and waterfalls."',
    bgColor: 'from-green-800 to-green-900'
  },
  {
    text: '🎶 "A land where tribal rhythms echo through timeless traditions."',
    bgColor: 'from-blue-800 to-blue-900'
  },
  {
    text: '🔥 "Jharkhand — Untamed nature, living heritage."',
    bgColor: 'from-amber-800 to-amber-900'
  }
];

const Home = ({ onSlideshowComplete }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimatingOut, setIsAnimatingOut] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [isMounted, setIsMounted] = useState(true);

  // Handle slide transitions
  useEffect(() => {
    if (!isMounted) return;
    
    const slideTimer = setInterval(() => {
      setCurrentSlide(prev => {
        if (prev === slides.length - 1) {
          clearInterval(slideTimer);
          // Start exit animation
          setIsAnimatingOut(true);
          
          // Show content slightly before the animation completes
          setTimeout(() => {
            setShowContent(true);
          }, 300);
          
          // Clean up after animation completes
          setTimeout(() => {
            setIsMounted(false);
            if (onSlideshowComplete) {
              onSlideshowComplete();
            }
          }, 1000);
          
          return prev;
        }
        return prev + 1;
      });
    }, 1000);

    return () => clearInterval(slideTimer);
  }, [onSlideshowComplete, isMounted]);

  return (
    <div className="relative min-h-screen">
      {/* Slideshow Overlay */}
      {isMounted && (
        <div 
          className={`fixed inset-0 z-50 flex items-center justify-center transition-all duration-1000 ${
            isAnimatingOut ? 'transform -translate-y-full' : ''
          } bg-gradient-to-br ${slides[currentSlide]?.bgColor || 'from-gray-900 to-gray-800'}`}
        >
          <div className="text-center px-4">
            <h2 className="text-3xl md:text-5xl font-bold text-white">
              {slides[currentSlide]?.text || ''}
            </h2>
          </div>
        </div>
      )}
      
      {/* Main Content - Always present but behind the slideshow */}
      <div className={`min-h-screen transition-opacity duration-700 ${showContent ? 'opacity-100' : 'opacity-0'}`} style={{ visibility: showContent ? 'visible' : 'hidden' }}>
        <div className="relative h-full py-20 md:py-32 overflow-hidden">
          {/* Background Image with Overlay */}
          <div className="absolute inset-0 z-0">
            <img 
              src="/aryan-singh-fKkkaXSKwR8-unsplash.jpg" 
              alt="Scenic view of Jharkhand"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-50"></div>
          </div>
        
        {/* Content */}
        <div className="relative z-10 text-white text-center px-4" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>
          <div className="container mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Discover the Unexplored Beauty of Jharkhand
            </h1>
            <p className="text-xl mb-8 max-w-3xl mx-auto">
              Experience the rich culture, breathtaking landscapes, and vibrant traditions of Jharkhand with our AI-powered tourism platform.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                to="/destinations"
                className="group relative overflow-hidden bg-gradient-to-r from-teal-500 to-teal-600 text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 hover:from-teal-500 hover:to-teal-500 transform hover:-translate-y-1"
              >
                <span className="relative z-10 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  Explore Destinations
                </span>
                <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300"></span>
              </Link>
              <Link
                to="/itinerary"
                className="group relative overflow-hidden border-2 border-white/30 text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 hover:bg-white/5 hover:border-white/50 hover:shadow-lg hover:scale-105 transform hover:-translate-y-1"
              >
                <span className="relative z-10 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                  Plan Your Trip
                </span>
                <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300"></span>
              </Link>
            </div>
          </div>
        </div>
      </div>

        {/* Features Section */}
        <div className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Why Choose TourSmart Jharkhand?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: 'AI-Powered Itinerary',
                  description: 'Get personalized travel plans based on your preferences and interests.',
                  icon: '🧭',
                },
                {
                  title: 'Immersive Previews',
                  description: 'Experience destinations with our AR/VR previews before you visit.',
                  icon: '👓',
                },
                {
                  title: 'Local Marketplace',
                  description: 'Discover and book authentic local experiences and handicrafts.',
                  icon: '🛍️',
                },
              ].map((feature, index) => (
                <div key={index} className="bg-white p-6 rounded-xl text-center shadow-md hover:shadow-lg transition-shadow duration-300">
                  <div className="text-4xl mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-gray-100 py-16 border-t border-gray-200">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6 text-gray-800">Ready to Explore Jharkhand?</h2>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Start planning your perfect trip with our AI-powered tools and discover the hidden gems of Jharkhand.
            </p>
            <Link
              to="/itinerary"
              className="bg-teal-600 hover:bg-teal-700 text-white px-8 py-3 rounded-lg font-medium inline-block transition duration-300 shadow-md hover:shadow-lg"
            >
              Create Your Itinerary
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
