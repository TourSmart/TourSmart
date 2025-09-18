import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaMapMarkerAlt, FaClock, FaArrowLeft, FaPlay, FaMobileAlt } from 'react-icons/fa';
import fallbackData from '../data/fallbackARVRData';

const ARVRExperience = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Find the experience from local data
  const experience = fallbackData.find(exp => exp.id === parseInt(id));
  const loading = false;
  const error = experience ? null : 'Experience not found';

  // Get related experiences (same type, excluding current)
  const relatedExperiences = experience 
    ? fallbackData
        .filter(exp => 
          exp.media.type === experience.media.type && 
          exp.id !== experience.id
        )
        .slice(0, 3)
    : [];

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
    </div>
  );

  if (!experience) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-red-600 mb-4">Experience Not Found</h2>
        <button
          onClick={() => navigate('/ar-vr')}
          className="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700"
        >
          <FaArrowLeft className="inline mr-2" />
          Back to All Experiences
        </button>
      </div>
    </div>
  );

  const renderMedia = () => (
    <div className="relative w-full h-96 bg-gray-100 rounded-xl overflow-hidden">
      <img 
        src={experience.image} 
        alt={experience.title} 
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30">
        <button className="bg-white bg-opacity-90 rounded-full p-4">
          <FaPlay className="w-8 h-8 text-primary-600" />
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-gray-600 hover:text-gray-900 mb-6"
        >
          <FaArrowLeft className="mr-2" />
          Back
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              {renderMedia()}
              <div className="p-6">
                <h1 className="text-3xl font-bold mb-2">{experience.title}</h1>
                <div className="flex items-center text-gray-600 mb-4">
                  <FaMapMarkerAlt className="mr-2" />
                  <span>{experience.location?.name || 'Jharkhand'}</span>
                  <span className="mx-2">•</span>
                  <FaClock className="mr-2" />
                  <span>{experience.duration}</span>
                </div>
                <p className="text-gray-700 mb-6">{experience.description}</p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {experience.tags?.map((tag, i) => (
                    <span key={i} className="bg-gray-100 text-gray-800 text-xs px-3 py-1 rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-4">Related Experiences</h2>
            <div className="space-y-4">
              {related.map((item) => (
                <div 
                  key={item.id}
                  onClick={() => navigate(`/ar-vr/${item.id}`)}
                  className="bg-white rounded-lg shadow-sm p-4 flex items-center space-x-4 cursor-pointer hover:shadow-md transition-shadow"
                >
                  <div className="flex-shrink-0 w-20 h-20 bg-gray-200 rounded-lg overflow-hidden">
                    <img 
                      src={item.image} 
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-medium">{item.title}</h3>
                    <p className="text-sm text-gray-500">{item.type}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ARVRExperience;
