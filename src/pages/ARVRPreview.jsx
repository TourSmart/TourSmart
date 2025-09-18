import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaPlay, FaMobileAlt, FaSearch, FaMapMarkerAlt, FaClock } from 'react-icons/fa';
import fallbackData from '../data/fallbackARVRData';

const ARVRPreview = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('all');
  const navigate = useNavigate();
  
  // Use local data directly
  const experiences = fallbackData;
  const loading = false;

  const handleSearch = (e) => {
    e.preventDefault();
    // Search is handled in the filteredExperiences calculation
  };

  const filterByType = (type) => {
    setFilterType(type);
    // Filtering is handled in the filteredExperiences calculation
  };

  // Filter experiences based on search query and type
  const filteredExperiences = experiences.filter(exp => {
    const matchesSearch = exp.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         exp.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = filterType === 'all' || exp.media.type === filterType;
    return matchesSearch && matchesType;
  });

  const getTypeBadgeClass = (type) => {
    switch(type.toLowerCase()) {
      case 'ar':
        return 'bg-blue-100 text-blue-800';
      case 'vr':
        return 'bg-purple-100 text-purple-800';
      case '360':
        return 'bg-green-100 text-green-800';
      case '3d':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <FaSpinner className="animate-spin text-4xl text-primary-600 mx-auto mb-4" />
          <p className="text-lg text-gray-600">Loading experiences...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen-main py-12 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 text-gray-900">AR/VR Previews</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Experience the beauty of Jharkhand's top destinations through immersive augmented and virtual reality previews
          </p>
          
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mt-8">
            <form onSubmit={handleSearch} className="flex gap-2">
              <div className="relative flex-1">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaSearch className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="Search experiences..."
                />
              </div>
              <button
                type="submit"
                className="px-6 py-3 bg-primary-600 text-white font-medium rounded-lg hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors"
              >
                Search
              </button>
            </form>
          </div>
          
          {/* Filter Buttons */}
          <div className="flex flex-wrap justify-center gap-3 mt-6">
            <button
              onClick={() => filterByType('all')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                filterType === 'all' 
                  ? 'bg-primary-600 text-white' 
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              All Experiences
            </button>
            <button
              onClick={() => filterByType('360')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                filterType === '360' 
                  ? 'bg-green-100 text-green-800 border border-green-200' 
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              360° Tours
            </button>
            <button
              onClick={() => filterByType('ar')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                filterType === 'ar' 
                  ? 'bg-blue-100 text-blue-800 border border-blue-200' 
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              AR Experiences
            </button>
            <button
              onClick={() => filterByType('vr')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                filterType === 'vr' 
                  ? 'bg-purple-100 text-purple-800 border border-purple-200' 
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              VR Experiences
            </button>
            <button
              onClick={() => filterByType('3d')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                filterType === '3d' 
                  ? 'bg-yellow-100 text-yellow-800 border border-yellow-200' 
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              3D Models
            </button>
          </div>
        </div>

        {/* Experience Grid */}
        {experiences.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {experiences.map((experience) => (
              <div 
                key={experience.id} 
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col h-full"
                onClick={() => navigate(`/ar-vr/${experience.id}`)}
              >
                <div className="relative h-48 bg-gray-200 overflow-hidden group">
                  <img 
                    src={experience.image} 
                    alt={experience.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = 'https://via.placeholder.com/800x450?text=Image+Not+Available';
                    }}
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="bg-white bg-opacity-90 rounded-full p-3 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                      {experience.media.type === 'ar' ? (
                        <FaMobileAlt className="w-8 h-8 text-blue-600" />
                      ) : (
                        <FaPlay className="w-8 h-8 text-primary-600" />
                      )}
                    </div>
                  </div>
                  <div className="absolute top-3 right-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getTypeBadgeClass(experience.media.type)}`}>
                      {experience.type}
                    </span>
                  </div>
                </div>
                <div className="p-5 flex-1 flex flex-col">
                  <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">{experience.title}</h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">{experience.description}</p>
                  
                  <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between">
                    <div className="flex items-center text-sm text-gray-500">
                      <FaMapMarkerAlt className="mr-1" />
                      <span>{experience.location?.name || 'Jharkhand'}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <FaClock className="mr-1" />
                      <span>{experience.duration}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <h3 className="text-xl font-medium text-gray-700 mb-2">No experiences found</h3>
            <p className="text-gray-500">Try adjusting your search or filter criteria</p>
            <button 
              onClick={() => {
                setSearchQuery('');
                setFilterType('all');
                filterByType('all');
              }}
              className="mt-4 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
            >
              Clear Filters
            </button>
          </div>
        )}

        <h2 className="text-2xl font-bold mb-6">Featured Experiences</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {experiences.map((experience) => (
            <div key={experience.id} className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow">
              <div className="h-48 bg-gray-200 relative">
                <img 
                  src={experience.image} 
                  alt={experience.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 right-2 bg-primary-600 text-white text-xs font-bold px-2 py-1 rounded">
                  {experience.type}
                </div>
              </div>
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-lg">{experience.title}</h3>
                  <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">{experience.duration}</span>
                </div>
                <p className="text-gray-600 text-sm mb-4">{experience.description}</p>
                <button className="w-full bg-primary-600 text-white py-2 rounded-lg hover:bg-primary-700 transition-colors text-sm">
                  Start Experience
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-gradient-to-r from-primary-600 to-primary-800 text-white rounded-2xl p-8 md:p-12">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Experience Jharkhand Like Never Before</h2>
            <p className="text-lg mb-8 opacity-90">
              Our AR/VR previews give you a taste of what awaits in Jharkhand. Perfect for planning your trip or experiencing the beauty of the region from anywhere in the world.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button className="bg-white text-primary-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors">
                Download Mobile App
              </button>
              <button className="border-2 border-white text-white px-6 py-3 rounded-lg font-medium hover:bg-white hover:bg-opacity-10 transition-colors">
                Learn How It Works
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ARVRPreview;
