import { useState } from 'react';
import { 
  ChartBarIcon, 
  UserGroupIcon, 
  CurrencyRupeeIcon, 
  MapPinIcon, 
  ClockIcon, 
  StarIcon,
  ArrowUpIcon,
  MagnifyingGlassIcon,
  Bars3Icon,
  XMarkIcon
} from '@heroicons/react/24/outline';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Mock data
  const stats = [
    { name: 'Total Visitors', value: '24,541', change: '+12%', changeType: 'increase', icon: UserGroupIcon },
    { name: 'Revenue', value: '₹1,245,678', change: '+8.2%', changeType: 'increase', icon: CurrencyRupeeIcon },
    { name: 'Popular Destination', value: 'Netarhat', change: '15%', changeType: 'increase', icon: MapPinIcon },
    { name: 'Avg. Stay', value: '3.2 days', change: '+0.5', changeType: 'increase', icon: ClockIcon },
    { name: 'Avg. Rating', value: '4.6/5', change: '+0.2', changeType: 'increase', icon: StarIcon },
  ];

  const recentBookings = [
    { id: 1, name: 'Aarav Sharma', destination: 'Netarhat', type: 'Homestay', amount: '₹4,500', status: 'Confirmed' },
    { id: 2, name: 'Priya Patel', destination: 'Betla', type: 'Safari', amount: '₹2,300', status: 'Pending' },
    { id: 3, name: 'Rahul Kumar', destination: 'Deoghar', type: 'Hotel', amount: '₹6,200', status: 'Completed' },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Mobile sidebar toggle */}
      <div className="lg:hidden bg-white shadow-sm">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center">
            <button
              type="button"
              className="text-gray-500 hover:text-gray-600"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              <span className="sr-only">Open sidebar</span>
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <h1 className="ml-4 text-xl font-semibold text-gray-900">Dashboard</h1>
          </div>
        </div>
      </div>

      <div className="flex overflow-hidden bg-gray-100">
        {/* Sidebar */}
        <div className={`${sidebarOpen ? 'block' : 'hidden'} fixed inset-0 z-40 lg:relative lg:block lg:flex-shrink-0`}>
          <div className="fixed inset-0 bg-gray-600 bg-opacity-75 lg:hidden" onClick={() => setSidebarOpen(false)}></div>
          <div className="relative flex-1 flex flex-col w-64 h-full bg-white border-r border-gray-200 lg:static lg:translate-x-0 transform transition-transform duration-200 ease-in-out">
            <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
              <div className="flex items-center flex-shrink-0 px-6">
                <h1 className="text-xl font-bold text-gray-900">TourSmart Admin</h1>
              </div>
              <nav className="mt-6 flex-1 px-3 space-y-1">
                <button
                  onClick={() => {
                    setActiveTab('overview');
                    setSidebarOpen(false);
                  }}
                  className={`${
                    activeTab === 'overview' ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  } group flex items-center w-full px-3 py-3 text-sm font-medium rounded-md`}
                >
                  <ChartBarIcon className="mr-3 h-6 w-6" />
                  Overview
                </button>
                <button
                  onClick={() => {
                    setActiveTab('analytics');
                    setSidebarOpen(false);
                  }}
                  className={`${
                    activeTab === 'analytics' ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  } group flex items-center w-full px-3 py-3 text-sm font-medium rounded-md`}
                >
                  <ChartBarIcon className="mr-3 h-6 w-6" />
                  Analytics
                </button>
              </nav>
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1 overflow-auto focus:outline-none">
          <main className="flex-1 relative pb-8 z-0">
            {/* Page header */}
            <div className="bg-white shadow">
              <div className="px-4 sm:px-6 lg:max-w-7xl lg:mx-auto lg:px-8">
                <div className="py-6 md:flex md:items-center md:justify-between">
                  <div className="flex-1 min-w-0">
                    <h1 className="text-2xl font-semibold text-gray-900">
                      {activeTab === 'overview' ? 'Dashboard' : 'Analytics'}
                    </h1>
                  </div>
                  <div className="mt-4 flex md:mt-0 md:ml-4">
                    <div className="relative rounded-md shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <MagnifyingGlassIcon className="h-6 w-6 text-gray-500" />

                      </div>
                      <input
                        type="text"
                        className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md py-2"
                        placeholder="Search..."
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="mt-8">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-5">
                  {stats.map((stat, statIdx) => (
                    <div key={statIdx} className="bg-white overflow-hidden shadow rounded-lg">
                      <div className="p-5">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 bg-blue-500 rounded-md p-3">
                            <stat.icon className="h-6 w-6 text-white" />
                          </div>
                          <div className="ml-5 w-0 flex-1">
                            <dl>
                              <dt className="text-sm font-medium text-gray-500 truncate">{stat.name}</dt>
                              <dd className="flex items-baseline">
                                <div className="text-2xl font-semibold text-gray-900">{stat.value}</div>
                                <div className="ml-2 flex items-baseline text-sm font-semibold text-green-600">
                                  <ArrowUpIcon className="self-center flex-shrink-0 h-5 w-5 text-green-500" />
                                  <span className="sr-only">Increased by</span>
                                  {stat.change}
                                </div>
                              </dd>
                            </dl>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Recent Bookings */}
            <div className="mt-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                <div className="px-4 py-5 sm:px-6">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">Recent Bookings</h3>
                </div>
                <div className="border-t border-gray-200">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Name
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Destination
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Type
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Amount
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {recentBookings.map((booking) => (
                        <tr key={booking.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {booking.name}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{booking.destination}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{booking.type}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{booking.amount}</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              booking.status === 'Confirmed' ? 'bg-green-100 text-green-800' :
                              booking.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-blue-100 text-blue-800'
                            }`}>
                              {booking.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
