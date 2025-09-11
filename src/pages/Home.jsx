import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="min-h-screen-main flex flex-col">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-800 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Discover the Unexplored Beauty of Jharkhand
          </h1>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Experience the rich culture, breathtaking landscapes, and vibrant traditions of Jharkhand with our AI-powered tourism platform.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to="/destinations"
              className="bg-white text-primary-700 hover:bg-gray-100 px-6 py-3 rounded-lg font-medium transition duration-300"
            >
              Explore Destinations
            </Link>
            <Link
              to="/itinerary"
              className="bg-transparent border-2 border-white text-white hover:bg-white hover:bg-opacity-10 px-6 py-3 rounded-lg font-medium transition duration-300"
            >
              Plan Your Trip
            </Link>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose TourSmart Jharkhand?</h2>
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
              <div key={index} className="bg-gray-50 p-6 rounded-xl text-center">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-gray-100 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Explore Jharkhand?</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Start planning your perfect trip with our AI-powered tools and discover the hidden gems of Jharkhand.
          </p>
          <Link
            to="/itinerary"
            className="bg-primary-600 hover:bg-primary-700 text-white px-8 py-3 rounded-lg font-medium inline-block transition duration-300"
          >
            Create Your Itinerary
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
