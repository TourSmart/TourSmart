const ARVRPreview = () => {
  const experiences = [
    {
      id: 1,
      title: 'Netarhat - The Queen of Chotanagpur',
      description: 'Experience the breathtaking views and pleasant climate of Netarhat through our immersive 360° virtual tour.',
      image: 'https://via.placeholder.com/800x450?text=Netarhat+360',
      type: '360° Virtual Tour',
      duration: '5-10 min',
    },
    {
      id: 2,
      title: 'Betla National Park Safari',
      description: 'Get up close with wildlife in this augmented reality safari experience through Betla National Park.',
      image: 'https://via.placeholder.com/800x450?text=Betla+Safari',
      type: 'AR Experience',
      duration: '8-12 min',
    },
    {
      id: 3,
      title: 'Jagannath Temple, Ranchi',
      description: 'Explore the architectural marvel of Jagannath Temple in Ranchi through our detailed 3D model.',
      image: 'https://via.placeholder.com/800x450?text=Jagannath+Temple',
      type: '3D Model',
      duration: '3-5 min',
    },
    {
      id: 4,
      title: 'Hundru Falls',
      description: 'Experience the majestic Hundru Falls through our virtual reality experience that makes you feel like you\'re really there.',
      image: 'https://via.placeholder.com/800x450?text=Hundru+Falls',
      type: 'VR Experience',
      duration: '7-10 min',
    },
  ];

  return (
    <div className="min-h-screen-main py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">AR/VR Previews</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Experience the beauty of Jharkhand's top destinations through immersive augmented and virtual reality previews
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="relative h-64 bg-gray-200">
              <img 
                src="https://via.placeholder.com/800x450?text=VR+Headset+Demo" 
                alt="VR Experience"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                <div className="bg-white bg-opacity-90 rounded-full p-4">
                  <svg className="w-12 h-12 text-primary-600" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            </div>
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-2">Virtual Reality Experiences</h2>
              <p className="text-gray-600 mb-4">
                Put on your VR headset and be transported to Jharkhand's most beautiful locations from the comfort of your home.
              </p>
              <button className="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition-colors">
                View All VR Tours
              </button>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="relative h-64 bg-gray-200">
              <img 
                src="https://via.placeholder.com/800x450?text=AR+Phone+Demo" 
                alt="AR Experience"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                <div className="bg-white bg-opacity-90 rounded-full p-4">
                  <svg className="w-12 h-12 text-primary-600" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm3 1a1 1 0 000 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            </div>
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-2">Augmented Reality Previews</h2>
              <p className="text-gray-600 mb-4">
                Use your smartphone to bring Jharkhand's landmarks into your space with our AR technology.
              </p>
              <button className="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition-colors">
                Try AR Now
              </button>
            </div>
          </div>
        </div>

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
