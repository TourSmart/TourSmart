import { useState } from 'react';

const TransportInfo = () => {
  const [activeTab, setActiveTab] = useState('buses');
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [date, setDate] = useState('');

  const transportOptions = {
    buses: [
      { id: 1, name: 'Jharkhand State Bus', type: 'AC Sleeper', departure: '08:00 AM', arrival: '02:00 PM', duration: '6h', price: '₹800' },
      { id: 2, name: 'Jharkhand State Bus', type: 'Non-AC Seater', departure: '10:30 AM', arrival: '05:30 PM', duration: '7h', price: '₹450' },
      { id: 3, name: 'Private Operator', type: 'Volvo AC', departure: '11:00 PM', arrival: '05:00 AM', duration: '6h', price: '₹950' },
    ],
    trains: [
      { id: 1, name: 'Ranchi Rajdhani', number: '12345', departure: '06:00 AM', arrival: '11:30 AM', duration: '5h 30m', price: '₹1,250' },
      { id: 2, name: 'Patna Express', number: '54321', departure: '02:30 PM', arrival: '08:45 PM', duration: '6h 15m', price: '₹850' },
      { id: 3, name: 'Jharkhand Sampark Kranti', number: '67890', departure: '10:15 PM', arrival: '04:30 AM', duration: '6h 15m', price: '₹1,100' },
    ],
    flights: [
      { id: 1, name: 'Air India', number: 'AI-701', departure: '07:30 AM', arrival: '08:45 AM', duration: '1h 15m', price: '₹4,500', stops: 'Non-stop' },
      { id: 2, name: 'IndiGo', number: '6E-245', departure: '12:15 PM', arrival: '01:30 PM', duration: '1h 15m', price: '₹3,800', stops: 'Non-stop' },
      { id: 3, name: 'SpiceJet', number: 'SG-567', departure: '05:45 PM', arrival: '07:00 PM', duration: '1h 15m', price: '₹4,200', stops: 'Non-stop' },
    ],
  };

  const cities = [
    'Ranchi', 'Jamshedpur', 'Dhanbad', 'Bokaro', 'Deoghar', 'Hazaribagh', 
    'Giridih', 'Dumka', 'Chaibasa', 'Medininagar', 'Ramgarh', 'Sahibganj'
  ];

  const renderTransportList = () => {
    const items = transportOptions[activeTab];
    return (
      <div className="space-y-4">
        {items.map((item) => (
          <div key={item.id} className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
            <div className="flex flex-col md:flex-row md:items-center justify-between">
              <div className="mb-4 md:mb-0">
                <div className="font-semibold">{item.name} {item.number && `(${item.number})`}</div>
                <div className="text-sm text-gray-500">{item.type || item.stops}</div>
              </div>
              <div className="flex items-center space-x-6">
                <div className="text-center">
                  <div className="font-medium">{item.departure}</div>
                  <div className="text-xs text-gray-500">Departure</div>
                </div>
                <div className="text-center">
                  <div className="text-sm text-gray-500">{item.duration}</div>
                  <div className="w-16 h-px bg-gray-300 my-1"></div>
                </div>
                <div className="text-center">
                  <div className="font-medium">{item.arrival}</div>
                  <div className="text-xs text-gray-500">Arrival</div>
                </div>
                <div className="text-center">
                  <div className="font-bold text-lg text-primary-600">{item.price}</div>
                  <button className="text-xs text-primary-600 hover:underline">View Details</button>
                </div>
                <button className="bg-primary-600 text-white px-4 py-2 rounded hover:bg-primary-700 transition-colors">
                  Book Now
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen-main py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-2">Transport Information</h1>
        <p className="text-xl text-gray-600 text-center mb-12">Find the best way to travel across Jharkhand</p>
        
        {/* Search Form */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">From</label>
              <select 
                value={from}
                onChange={(e) => setFrom(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
              >
                <option value="">Select City</option>
                {cities.map((city, index) => (
                  <option key={index} value={city}>{city}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">To</label>
              <select 
                value={to}
                onChange={(e) => setTo(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
              >
                <option value="">Select City</option>
                {cities.filter(city => city !== from).map((city, index) => (
                  <option key={index} value={city}>{city}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
              <input 
                type="date" 
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
              />
            </div>
            <div className="flex items-end">
              <button 
                className="w-full bg-primary-600 text-white py-2 px-4 rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
              >
                Search
              </button>
            </div>
          </div>
          
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              {['buses', 'trains', 'flights'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab
                      ? 'border-primary-500 text-primary-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </nav>
          </div>
        </div>
        
        {/* Transport List */}
        {from && to && date ? (
          renderTransportList()
        ) : (
          <div className="bg-white rounded-xl shadow-sm p-12 text-center">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 mb-4">
              <svg className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-1">Search for transport options</h3>
            <p className="text-gray-500">Select your departure city, destination, and travel date to see available options.</p>
          </div>
        )}
        
        {/* Local Transport Section */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-6">Local Transport Options</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: 'Auto Rickshaws',
                description: 'Convenient for short distances within cities',
                icon: '🛺',
                tips: 'Always agree on the fare before starting your journey.'
              },
              {
                title: 'Cycle Rickshaws',
                description: 'Eco-friendly option for short distances',
                icon: '🚲',
                tips: 'Ideal for exploring local markets and narrow lanes.'
              },
              {
                title: 'City Buses',
                description: 'Most economical way to travel within cities',
                icon: '🚌',
                tips: 'Carry small change as conductors may not always have change.'
              },
              {
                title: 'Taxis & Cabs',
                description: 'Comfortable door-to-door service',
                icon: '🚕',
                tips: 'Use app-based cab services for fixed fares and safety.'
              },
              {
                title: 'Car Rentals',
                description: 'Self-drive or with driver options available',
                icon: '🚗',
                tips: 'Book in advance during peak tourist seasons.'
              },
              {
                title: 'Bike Rentals',
                description: 'Flexible way to explore at your own pace',
                icon: '🏍️',
                tips: 'Always wear a helmet and carry necessary documents.'
              },
            ].map((option, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                <div className="text-4xl mb-4">{option.icon}</div>
                <h3 className="font-semibold text-lg mb-2">{option.title}</h3>
                <p className="text-gray-600 mb-3">{option.description}</p>
                <p className="text-sm text-gray-500">
                  <span className="font-medium">Tip:</span> {option.tips}
                </p>
              </div>
            ))}
          </div>
        </div>
        
        {/* Travel Tips */}
        <div className="mt-16 bg-blue-50 rounded-xl p-8">
          <h2 className="text-2xl font-bold mb-6">Travel Tips</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="font-semibold text-lg mb-2">Best Time to Travel</h3>
              <p className="text-gray-600">
                The best time to visit Jharkhand is between October and March when the weather is pleasant. 
                Summers (April-June) can be quite hot, while monsoons (July-September) bring heavy rainfall.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="font-semibold text-lg mb-2">Booking in Advance</h3>
              <p className="text-gray-600">
                During peak tourist seasons and festivals, it's advisable to book your transport tickets 
                well in advance, especially for trains and flights.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransportInfo;
