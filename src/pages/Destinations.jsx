const Destinations = () => {
  const destinations = [
    {
      id: 1,
      name: 'Netarhat',
      description: 'Queen of Chotanagpur Plateau',
      image: 'https://via.placeholder.com/400x300?text=Netarhat',
    },
    {
      id: 2,
      name: 'Patratu',
      description: 'Scenic valley with winding roads',
      image: 'https://via.placeholder.com/400x300?text=Patratu',
    },
    {
      id: 3,
      name: 'Betla',
      description: 'Famous for its national park and wildlife',
      image: 'https://via.placeholder.com/400x300?text=Betla',
    },
    {
      id: 4,
      name: 'Hundru',
      description: 'Home to the majestic Hundru Falls',
      image: 'https://via.placeholder.com/400x300?text=Hundru',
    },
    {
      id: 5,
      name: 'Deoghar',
      description: 'Spiritual city with the famous Baidyanath Temple',
      image: 'https://via.placeholder.com/400x300?text=Deoghar',
    },
  ];

  return (
    <div className="min-h-screen-main py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-12">Tourist Destinations</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {destinations.map((destination) => (
            <div key={destination.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <div className="h-48 bg-gray-200">
                <img 
                  src={destination.image} 
                  alt={destination.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-2">{destination.name}</h2>
                <p className="text-gray-600 mb-4">{destination.description}</p>
                <button className="text-primary-600 hover:text-primary-800 font-medium">
                  Explore More →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Destinations;
