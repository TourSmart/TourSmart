const Marketplace = () => {
  const categories = [
    {
      id: 1,
      name: 'Handicrafts',
      description: 'Traditional Jharkhandi crafts and artifacts',
      items: [
        { id: 1, name: 'Bamboo Crafts', price: '₹500 - ₹5000', image: 'https://via.placeholder.com/300x200?text=Bamboo+Crafts' },
        { id: 2, name: 'Stone Carvings', price: '₹1000 - ₹10000', image: 'https://via.placeholder.com/300x200?text=Stone+Carvings' },
        { id: 3, name: 'Paitkar Paintings', price: '₹2000 - ₹15000', image: 'https://via.placeholder.com/300x200?text=Paitkar+Paintings' },
      ],
    },
    {
      id: 2,
      name: 'Homestays',
      description: 'Experience local hospitality',
      items: [
        { id: 4, name: 'Netarhat Homestay', price: '₹1500/night', image: 'https://via.placeholder.com/300x200?text=Netarhat+Homestay' },
        { id: 5, name: 'Ranchi Heritage Stay', price: '₹2500/night', image: 'https://via.placeholder.com/300x200?text=Ranchi+Heritage' },
      ],
    },
    {
      id: 3,
      name: 'Experiences',
      description: 'Unique local experiences',
      items: [
        { id: 6, name: 'Tribal Village Tour', price: '₹2000/person', image: 'https://via.placeholder.com/300x200?text=Tribal+Village' },
        { id: 7, name: 'Jungle Safari', price: '₹1500/person', image: 'https://via.placeholder.com/300x200?text=Jungle+Safari' },
      ],
    },
  ];

  return (
    <div className="min-h-screen-main py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-4">Marketplace</h1>
        <p className="text-xl text-gray-600 text-center mb-12">Discover and book authentic Jharkhand experiences</p>
        
        {categories.map((category) => (
          <div key={category.id} className="mb-16">
            <div className="mb-6">
              <h2 className="text-2xl font-bold">{category.name}</h2>
              <p className="text-gray-600">{category.description}</p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {category.items.map((item) => (
                <div key={item.id} className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
                  <div className="h-48 bg-gray-200">
                    <img 
                      src={item.image} 
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-lg mb-1">{item.name}</h3>
                    <p className="text-primary-600 font-medium mb-3">{item.price}</p>
                    <button className="w-full bg-primary-600 text-white py-2 rounded-lg hover:bg-primary-700 transition-colors">
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
        
        <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-r-lg mt-12">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-blue-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-blue-700">
                Looking to sell your products or experiences? <a href="#" className="font-medium underline text-blue-700 hover:text-blue-600">Register as a seller</a> and join our marketplace.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Marketplace;
