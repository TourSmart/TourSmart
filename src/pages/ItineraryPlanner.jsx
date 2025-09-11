const ItineraryPlanner = () => {
  return (
    <div className="min-h-screen-main flex items-center justify-center bg-gray-50 py-12 px-4">
      <div className="max-w-3xl w-full bg-white p-8 rounded-xl shadow-md text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">AI-Powered Itinerary Planner</h1>
        <p className="text-xl text-gray-600 mb-8">
          Let us create a personalized travel plan for your Jharkhand adventure.
        </p>
        
        <div className="bg-blue-50 border border-blue-100 rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-semibold text-blue-800 mb-4">Coming Soon</h2>
          <p className="text-blue-700 mb-4">
            Our AI is learning the best of Jharkhand to create your perfect itinerary.
          </p>
          <p className="text-blue-600">
            This feature will help you plan your trip based on your interests, duration, and preferences.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
          {[
            {
              icon: '🗓️',
              title: 'Personalized Plans',
              description: 'Customized daily schedules based on your interests'
            },
            {
              icon: '📍',
              title: 'Smart Routing',
              description: 'Optimized routes to save time and maximize experiences'
            },
            {
              icon: '⚡',
              title: 'Real-time Updates',
              description: 'Adjust plans on the go with live recommendations'
            }
          ].map((feature, index) => (
            <div key={index} className="bg-gray-50 p-6 rounded-lg">
              <div className="text-3xl mb-3">{feature.icon}</div>
              <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ItineraryPlanner;
