import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMapPin, FiArrowRight, FiSearch, FiFilter } from 'react-icons/fi';

const Destinations = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All' },
    { id: 'hills', name: 'Hills' },
    { id: 'waterfalls', name: 'Waterfalls' },
    { id: 'wildlife', name: 'Wildlife' },
    { id: 'religious', name: 'Religious' },
  ];

  const destinations = [
    {
      id: 1,
      name: 'Netarhat',
      description: 'Queen of Chotanagpur Plateau, known for its scenic beauty and pleasant climate.',
      image: 'https://images.unsplash.com/photo-1602002418814-235c67b49e15?w=800&h=600&fit=crop',
      location: 'Netarhat, Jharkhand',
      category: 'hills',
      rating: 4.8,
      reviews: 124,
    },
    {
      id: 2,
      name: 'Patratu',
      description: 'Scenic valley with winding roads, perfect for road trips and photography.',
      image: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=800&h=600&fit=crop',
      location: 'Ramgarh, Jharkhand',
      category: 'hills',
      rating: 4.6,
      reviews: 98,
    },
    {
      id: 3,
      name: 'Betla National Park',
      description: 'Famous for its rich biodiversity, tigers, elephants, and ancient forts.',
      image: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&h=600&fit=crop',
      location: 'Latehar, Jharkhand',
      category: 'wildlife',
      rating: 4.7,
      reviews: 156,
    },
    {
      id: 4,
      name: 'Hundru Falls',
      description: 'Majestic waterfall on the Subarnarekha River, surrounded by lush green forests.',
      image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&h=600&fit=crop',
      location: 'Ranchi, Jharkhand',
      category: 'waterfalls',
      rating: 4.5,
      reviews: 210,
    },
    {
      id: 5,
      name: 'Baidyanath Dham',
      description: 'One of the twelve Jyotirlingas, a major pilgrimage site for Hindus.',
      image: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&h=600&fit=crop',
      location: 'Deoghar, Jharkhand',
      category: 'religious',
      rating: 4.9,
      reviews: 342,
    },
    {
      id: 6,
      name: 'Jonha Falls',
      description: 'Also known as Gautamdhara, a beautiful waterfall surrounded by lush greenery.',
      image: 'https://images.unsplash.com/photo-1604537466573-5e94508fd9dc?w=800&h=600&fit=crop',
      location: 'Ranchi, Jharkhand',
      category: 'waterfalls',
      rating: 4.4,
      reviews: 187,
    },
  ];

  const filteredDestinations = destinations.filter(destination => {
    const matchesSearch = destination.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         destination.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || destination.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="relative z-10 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto pt-20">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Explore Jharkhand</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover the hidden gems and breathtaking landscapes of Jharkhand
          </p>
        </motion.div>

        {/* Search and Filter */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="mb-12"
        >
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search destinations..."
                className="w-full pl-12 pr-6 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 shadow-sm"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="relative">
              <FiFilter className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <select
                className="appearance-none pl-12 pr-10 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 shadow-sm bg-white"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  selectedCategory === category.id
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Destinations Grid */}
        {filteredDestinations.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence>
              {filteredDestinations.map((destination, index) => (
                <motion.div
                  key={destination.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
                >
                  <div className="relative h-60 overflow-hidden">
                    <img
                      src={destination.image}
                      alt={destination.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                      <div>
                        <div className="flex items-center text-white text-sm mb-1">
                          <FiMapPin className="mr-1" />
                          <span>{destination.location}</span>
                        </div>
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <svg
                              key={i}
                              className={`w-4 h-4 ${i < Math.floor(destination.rating) ? 'text-yellow-400' : 'text-gray-300'}`}
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                          <span className="ml-1 text-white text-sm">
                            {destination.rating} ({destination.reviews} reviews)
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-1">{destination.name}</h3>
                        <p className="text-gray-600 mb-4 line-clamp-2">{destination.description}</p>
                      </div>
                    </div>
                    <button className="flex items-center text-blue-600 font-medium hover:text-blue-800 transition-colors duration-300">
                      Explore more <FiArrowRight className="ml-1" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        ) : (
          <div className="text-center py-12">
            <h3 className="text-lg font-medium text-gray-700">No destinations found</h3>
            <p className="text-gray-500 mt-1">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>
      </div>
    </div>
  );
};

export default Destinations;
