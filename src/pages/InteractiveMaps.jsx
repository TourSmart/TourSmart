import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap, ZoomControl } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaMapMarkerAlt, 
  FaSearch, 
  FaUtensils, 
  FaHotel, 
  FaBus, 
  FaHospital, 
  FaMoneyBillWave, 
  FaMapPin, 
  FaCompass, 
  FaFilter, 
  FaTimes,
  FaDirections,
  FaInfoCircle,
  FaStar,
  FaWalking,
  FaCar,
  FaBicycle,
  FaUmbrellaBeach
} from 'react-icons/fa';
import { MdLocationOn, MdMyLocation, MdRestaurant, MdHotel, MdDirectionsWalk, MdDirectionsCar, MdDirectionsBike } from 'react-icons/md';
import { GiPositionMarker } from 'react-icons/gi';
import { BsFillGeoAltFill } from 'react-icons/bs';

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: 'spring', stiffness: 100 }
  }
};

const cardVariants = {
  hidden: { scale: 0.9, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: { type: 'spring', stiffness: 300, damping: 24 }
  },
  exit: { scale: 0.9, opacity: 0 }
};

// Custom marker icons
const createCustomIcon = (icon, color) => {
  return L.divIcon({
    html: `<div class="relative">
      <div class="absolute -left-1/2 -top-1/2 w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center">
        <div class="text-2xl" style="color: ${color}">${icon}</div>
      </div>
      <div class="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0 
        border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent" 
        style="border-top-color: ${color}">
      </div>
    </div>`,
    className: 'custom-marker',
    iconSize: [40, 40],
    iconAnchor: [20, 40],
    popupAnchor: [0, -40]
  });
};

// Fix for default marker icons in Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

// Sample data for Jharkhand locations with additional details and images
const locations = [
  {
    id: 1,
    name: 'Patratu Valley',
    type: 'tourist',
    position: [23.6625, 85.2839],
    description: 'Scenic valley with a serpentine road and beautiful dam, often called the Switzerland of Jharkhand.',
    address: 'Patratu, Ramgarh District',
    rating: 4.7,
    reviews: 1284,
    price: 'Free',
    openNow: true,
    hours: '6:00 AM - 6:00 PM',
    features: ['Scenic Views', 'Photography', 'Nature Walks', 'Boating'],
    images: [
      'https://images.unsplash.com/photo-1602002414679-efb4b1c77dca?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80',
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80'
    ]
  },
  {
    id: 2,
    name: 'Ranchi Railway Station',
    type: 'transport',
    position: [23.3700, 85.3331],
    description: 'Main railway station in Ranchi with connectivity to major cities across India.',
    address: 'Station Road, Ranchi, Jharkhand 834001',
    rating: 4.1,
    reviews: 842,
    openNow: true,
    hours: 'Open 24 hours',
    features: ['Ticket Counter', 'Waiting Lounge', 'Food Court', 'Parking'],
    platforms: 6,
    contact: '131',
    stationCode: 'RNC'
  },
  {
    id: 3,
    name: 'Radisson Blu Ranchi',
    type: 'hotel',
    position: [23.3752, 85.3287],
    description: 'Luxurious 5-star hotel with modern amenities and excellent service in the heart of Ranchi.',
    address: 'The Nexus I.A.S. Annexe, South Office Para, Main Road, Ranchi, Jharkhand 834001',
    rating: 4.5,
    reviews: 1896,
    price: '₹6,500/night',
    openNow: true,
    hours: 'Check-in: 2:00 PM, Check-out: 12:00 PM',
    features: ['Free WiFi', 'Swimming Pool', 'Spa', 'Restaurant', 'Fitness Center', 'Parking'],
    amenities: ['Air Conditioning', 'Room Service', '24/7 Front Desk', 'Laundry Service'],
    contact: '0651 711 4000',
    website: 'www.radissonhotels.com',
    images: [
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
      'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80'
    ]
  },
  {
    id: 4,
    name: 'Punjab Dhaba',
    type: 'restaurant',
    position: [23.3789, 85.3312],
    description: 'Popular restaurant serving authentic North Indian and Chinese cuisine in a casual setting.',
    address: 'Main Road, Ranchi, Jharkhand 834001',
    rating: 4.3,
    reviews: 1245,
    price: '₹500 for two',
    openNow: true,
    hours: '11:00 AM - 11:00 PM',
    cuisine: ['North Indian', 'Chinese', 'Mughlai', 'Tandoor'],
    features: ['Dine-in', 'Takeaway', 'Home Delivery', 'Full Bar Available'],
    popularDishes: ['Butter Chicken', 'Paneer Tikka', 'Dal Makhani', 'Chilli Potato'],
    contact: '0651 220 1234',
    images: [
      'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80',
      'https://images.unsplash.com/photo-1513104890138-7c749659a591?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80'
    ]
  },
  {
    id: 5,
    name: 'Rajendra Institute of Medical Sciences',
    type: 'hospital',
    position: [23.3541, 85.3339],
    description: 'Premier government medical college and hospital providing comprehensive healthcare services.',
    address: 'Bariatu, Ranchi, Jharkhand 834009',
    rating: 4.2,
    reviews: 876,
    openNow: true,
    hours: '24/7 Emergency',
    emergency: '0651-2545401',
    contact: '0651-2545401',
    specialties: ['Cardiology', 'Neurology', 'Orthopedics', 'Pediatrics', 'General Medicine'],
    facilities: ['Emergency', 'ICU', 'Pharmacy', 'Diagnostics', 'Ambulance'],
    website: 'www.rimsranchi.org',
    images: [
      'https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
      'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80'
    ]
  },
  {
    id: 6,
    name: 'SBI ATM',
    type: 'atm',
    position: [23.3755, 85.3298],
    description: '24/7 ATM with cash withdrawal and other banking services',
    address: 'Main Road, Ranchi, Jharkhand 834001',
    openNow: true,
    hours: '24/7',
    features: ['Cash Withdrawal', 'Balance Inquiry', 'Mini Statement', 'Cardless Cash Withdrawal'],
    contact: '1800 1234',
    bank: 'State Bank of India',
    services: ['ATM', 'Cash Deposit', 'Passbook Update'],
    accessibility: ['Wheelchair Accessible']
  }
];

// Get appropriate icon and color for location type
const getLocationTypeInfo = (type) => {
  switch(type) {
    case 'tourist':
      return { 
        icon: <FaMapMarkerAlt className="text-2xl" />, 
        color: '#3B82F6',
        bgColor: 'bg-blue-100',
        textColor: 'text-blue-600',
        label: 'Tourist Spot'
      };
    case 'restaurant':
      return { 
        icon: <FaUtensils className="text-xl" />, 
        color: '#10B981',
        bgColor: 'bg-green-100',
        textColor: 'text-green-600',
        label: 'Restaurant'
      };
    case 'hotel':
      return { 
        icon: <FaHotel className="text-xl" />, 
        color: '#8B5CF6',
        bgColor: 'bg-purple-100',
        textColor: 'text-purple-600',
        label: 'Hotel'
      };
    case 'transport':
      return { 
        icon: <FaBus className="text-xl" />, 
        color: '#F59E0B',
        bgColor: 'bg-yellow-100',
        textColor: 'text-yellow-600',
        label: 'Transport'
      };
    case 'hospital':
      return { 
        icon: <FaHospital className="text-xl" />, 
        color: '#EF4444',
        bgColor: 'bg-red-100',
        textColor: 'text-red-600',
        label: 'Hospital'
      };
    case 'atm':
      return { 
        icon: <FaMoneyBillWave className="text-xl" />, 
        color: '#047857',
        bgColor: 'bg-emerald-100',
        textColor: 'text-emerald-600',
        label: 'ATM'
      };
    default:
      return { 
        icon: <FaMapMarkerAlt className="text-xl" />, 
        color: '#6B7280',
        bgColor: 'bg-gray-100',
        textColor: 'text-gray-600',
        label: 'Location'
      };
  }
};

// Get appropriate icon component for location type
const getLocationIcon = (type) => {
  switch(type) {
    case 'tourist': return <FaMapMarkerAlt />;
    case 'restaurant': return <FaUtensils />;
    case 'hotel': return <FaHotel />;
    case 'transport': return <FaBus />;
    case 'hospital': return <FaHospital />;
    case 'atm': return <FaMoneyBillWave />;
    default: return <FaMapMarkerAlt />;
  }
};

// Format distance in meters to readable format
const formatDistance = (meters) => {
  if (meters < 1000) return `${Math.round(meters)}m`;
  return `${(meters / 1000).toFixed(1)}km`;
};

// Calculate distance between two coordinates in meters
const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371e3; // Earth's radius in meters
  const φ1 = lat1 * Math.PI/180;
  const φ2 = lat2 * Math.PI/180;
  const Δφ = (lat2-lat1) * Math.PI/180;
  const Δλ = (lon2-lon1) * Math.PI/180;

  const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
            Math.cos(φ1) * Math.cos(φ2) *
            Math.sin(Δλ/2) * Math.sin(Δλ/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

  return R * c; // Distance in meters
};

const LocationMarker = React.memo(({ location, onClick, isSelected, userLocation }) => {
  const { icon, color, bgColor, textColor } = getLocationTypeInfo(location.type);
  const [isHovered, setIsHovered] = useState(false);
  const markerRef = useRef(null);

  // Calculate distance if user location is available
  const distance = userLocation 
    ? calculateDistance(
        userLocation.lat, 
        userLocation.lng, 
        location.position[0], 
        location.position[1]
      )
    : null;

  // Handle marker click
  const handleClick = () => {
    onClick(location);
    
    // Add a bounce animation when marker is clicked
    if (markerRef.current) {
      const marker = markerRef.current;
      marker.leafletElement.setZIndexOffset(1000);
      
      // Bounce animation
      const bounce = L.DomUtil.create('div', 'bounce-marker');
      marker.leafletElement._icon.appendChild(bounce);
      
      setTimeout(() => {
        if (marker.leafletElement._icon) {
          const el = marker.leafletElement._icon.querySelector('.bounce-marker');
          if (el) el.remove();
        }
      }, 800);
    }
  };

  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ 
        scale: isSelected ? 1.2 : isHovered ? 1.1 : 1,
        opacity: 1,
        transition: { type: 'spring', stiffness: 500, damping: 30 }
      }}
      whileHover={{ scale: 1.1, zIndex: 1000 }}
      transition={{ type: 'spring', stiffness: 400, damping: 10 }}
    >
      <Marker 
        ref={markerRef}
        position={location.position}
        icon={L.divIcon({
          html: `
            <div class="relative">
              <div class="absolute -left-1/2 -top-1/2 w-12 h-12 rounded-full ${bgColor} shadow-lg flex items-center justify-center transform transition-transform duration-300 ${isSelected ? 'scale-110' : ''}">
                <div class="text-2xl" style="color: ${color}">
                  {ReactDOMServer.renderToString(icon)}
                </div>
                ${distance ? `
                  <div class="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-white text-xs font-medium px-2 py-0.5 rounded-full shadow-md whitespace-nowrap" style="color: ${color}; border: 1px solid ${color}20">
                    ${formatDistance(distance)}
                  </div>
                ` : ''}
              </div>
              <div class="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0 
                border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent" 
                style="border-top-color: ${isSelected ? color : 'transparent'}">
              </div>
            </div>
          `,
          className: 'custom-marker',
          iconSize: [40, 40],
          iconAnchor: [20, 40],
          popupAnchor: [0, -40]
        })}
        eventHandlers={{
          click: handleClick,
          mouseover: () => setIsHovered(true),
          mouseout: () => setIsHovered(false),
        }}
      >
        <Popup closeButton={false} className="custom-popup">
          <div className="p-3 w-64">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-bold text-gray-900">{location.name}</h3>
                <div className="flex items-center mt-1">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${bgColor} ${textColor}`}>
                    {getLocationTypeInfo(location.type).label}
                  </span>
                  {location.rating && (
                    <div className="ml-2 flex items-center">
                      <FaStar className="text-yellow-400 mr-1" />
                      <span className="text-sm font-medium">{location.rating}</span>
                      <span className="text-xs text-gray-500 ml-1">({location.reviews})</span>
                    </div>
                  )}
                </div>
              </div>
              {distance && (
                <div className="text-xs text-gray-500 flex items-center">
                  <FaWalking className="mr-1" />
                  {formatDistance(distance)}
                </div>
              )}
            </div>
            
            <p className="mt-2 text-sm text-gray-600 line-clamp-2">{location.description}</p>
            
            <div className="mt-2 pt-2 border-t border-gray-100">
              <div className="flex items-center text-sm text-gray-500">
                <FaMapMarkerAlt className="mr-1.5 flex-shrink-0" />
                <span className="truncate">{location.address}</span>
              </div>
              
              {location.openNow !== undefined && (
                <div className="mt-1 flex items-center text-sm">
                  <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                    location.openNow ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {location.openNow ? 'Open Now' : 'Closed'}
                  </span>
                  {location.hours && (
                    <span className="ml-2 text-xs text-gray-500">
                      {location.hours}
                    </span>
                  )}
                </div>
              )}
            </div>
            
            <button 
              className="mt-3 w-full bg-blue-600 hover:bg-blue-700 text-white py-1.5 px-3 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center justify-center"
              onClick={() => {
                // Handle view details
                onClick(location);
              }}
            >
              <FaInfoCircle className="mr-2" />
              View Details
            </button>
          </div>
        </Popup>
      </Marker>
    </motion.div>
  );
});

const MapView = ({ center, zoom, children }) => {
  const map = useMap();
  
  useEffect(() => {
    map.setView(center, zoom);
  }, [center, zoom, map]);

  return null;
};

const InteractiveMaps = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const [center, setCenter] = useState([23.3441, 85.3096]); // Default to Ranchi
  const [mapReady, setMapReady] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [transportMode, setTransportMode] = useState('walking'); // walking, driving, cycling
  const [showFilters, setShowFilters] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState({
    rating: null,
    price: null,
    features: []
  });
  const mapRef = useRef();
  const sidebarRef = useRef();
  
  // Close sidebar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target) && 
          !event.target.closest('.sidebar-toggle')) {
        setSidebarOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Get user's current location
  useEffect(() => {
    if (navigator.geolocation) {
      const options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
      };
      
      const success = (position) => {
        const { latitude, longitude } = position.coords;
        const userPos = { lat: latitude, lng: longitude };
        setUserLocation(userPos);
        
        // Only center on user location if no location is selected
        if (!selectedLocation) {
          setCenter([latitude, longitude]);
        }
      };
      
      const error = (err) => {
        console.warn(`ERROR(${err.code}): ${err.message}`);
        // Set a default location if geolocation fails
        setUserLocation({ lat: 23.3441, lng: 85.3096 });
      };
      
      // Request location with high accuracy
      const watchId = navigator.geolocation.watchPosition(success, error, options);
      
      // Clear the watch when component unmounts
      return () => navigator.geolocation.clearWatch(watchId);
    }
  }, [selectedLocation]);
  
  // Add a class to body when map is ready for smooth transitions
  useEffect(() => {
    const timer = setTimeout(() => {
      setMapReady(true);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);

  const filteredLocations = useMemo(() => {
    return locations.filter(location => {
      // Search filter
      const matchesSearch = searchQuery === '' || 
        location.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        location.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (location.features && location.features.some(feature => 
          feature.toLowerCase().includes(searchQuery.toLowerCase())
        ));
      
      // Type filter
      const matchesType = selectedType === 'all' || location.type === selectedType;
      
      // Rating filter
      const matchesRating = !selectedFilters.rating || 
        (location.rating && location.rating >= selectedFilters.rating);
      
      // Price filter (if applicable)
      let matchesPrice = true;
      if (selectedFilters.price) {
        if (selectedFilters.price === 'free' && location.price !== 'Free') {
          matchesPrice = false;
        } else if (selectedFilters.price === 'budget' && 
                  location.price && 
                  (location.price === 'Free' || location.price.includes('₹'))) {
          const price = parseInt(location.price.replace(/[^0-9]/g, ''));
          if (price > 1000) matchesPrice = false;
        } else if (selectedFilters.price === 'premium' && 
                  (!location.price || location.price === 'Free' || 
                   parseInt(location.price.replace(/[^0-9]/g, '')) <= 1000)) {
          matchesPrice = false;
        }
      }
      
      // Features filter
      const matchesFeatures = selectedFilters.features.length === 0 || 
        (location.features && selectedFilters.features.every(feature => 
          location.features.includes(feature)
        ));
      
      return matchesSearch && matchesType && matchesRating && matchesPrice && matchesFeatures;
    });
  }, [searchQuery, selectedType, selectedFilters]);

  const handleLocationSelect = useCallback((location) => {
    setSelectedLocation(prev => {
      // If clicking the same location, toggle the selection
      if (prev && prev.id === location.id) {
        return null;
      }
      return location;
    });
    
    // Center the map on the selected location
    setCenter(location.position);
    
    // Auto-close sidebar on mobile
    if (window.innerWidth < 768) {
      setSidebarOpen(false);
    }
  }, []);

  const handleLocateMe = useCallback(() => {
    if (navigator.geolocation) {
      setCenter(prev => [
        userLocation ? userLocation.lat : prev[0],
        userLocation ? userLocation.lng : prev[1]
      ]);
      
      // Add a nice animation when locating
      const locateButton = document.querySelector('.locate-button');
      if (locateButton) {
        locateButton.classList.add('animate-ping');
        setTimeout(() => {
          locateButton.classList.remove('animate-ping');
        }, 1000);
      }
    } else {
      console.warn('Geolocation is not supported by your browser');
    }
  }, [userLocation]);
  
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  
  const handleFilterChange = (filterType, value) => {
    if (filterType === 'rating') {
      setSelectedFilters(prev => ({
        ...prev,
        rating: prev.rating === value ? null : value
      }));
    } else if (filterType === 'price') {
      setSelectedFilters(prev => ({
        ...prev,
        price: prev.price === value ? null : value
      }));
    } else if (filterType === 'feature') {
      setSelectedFilters(prev => ({
        ...prev,
        features: prev.features.includes(value)
          ? prev.features.filter(f => f !== value)
          : [...prev.features, value]
      }));
    }
  };
  
  const clearFilters = () => {
    setSelectedFilters({
      rating: null,
      price: null,
      features: []
    });
  };
  
  // Get all unique features for filter options
  const allFeatures = useMemo(() => {
    const features = new Set();
    locations.forEach(location => {
      if (location.features) {
        location.features.forEach(feature => features.add(feature));
      }
    });
    return Array.from(features).sort();
  }, []);
  
  // Calculate distance to user location for sorting
  const getSortedLocations = useCallback(() => {
    if (!userLocation) return filteredLocations;
    
    return [...filteredLocations].sort((a, b) => {
      const distA = calculateDistance(
        userLocation.lat, 
        userLocation.lng, 
        a.position[0], 
        a.position[1]
      );
      const distB = calculateDistance(
        userLocation.lat, 
        userLocation.lng, 
        b.position[0], 
        b.position[1]
      );
      return distA - distB;
    });
  }, [filteredLocations, userLocation]);
  
  const sortedLocations = getSortedLocations();
  
  // Get directions URL for the selected location
  const getDirectionsUrl = useCallback((location) => {
    if (!userLocation || !location) return '#';
    
    const mode = transportMode === 'walking' ? 'walk' : 
                transportMode === 'cycling' ? 'bike' : 'car';
    
    return `https://www.google.com/maps/dir/?api=1&origin=${userLocation.lat},${userLocation.lng}&destination=${location.position[0]},${location.position[1]}&travelmode=${mode}`;
  }, [userLocation, transportMode]);
  
  // Animation variants for list items
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 15
      }
    }
  };
  
  // Format distance for display
  const formatDistance = (meters) => {
    if (meters < 1000) {
      return `${Math.round(meters)}m`;
    }
    return `${(meters / 1000).toFixed(1)}km`;
  };
  
  // Get location type info (icon, color, label)
  const getLocationTypeInfo = (type) => {
    switch(type) {
      case 'tourist':
        return {
          icon: <FaUmbrellaBeach />,
          color: '#3B82F6',
          bgColor: 'bg-blue-100',
          textColor: 'text-blue-800',
          label: 'Tourist Spot'
        };
      case 'restaurant':
        return {
          icon: <FaUtensils />,
          color: '#10B981',
          bgColor: 'bg-green-100',
          textColor: 'text-green-800',
          label: 'Restaurant'
        };
      case 'hotel':
        return {
          icon: <FaHotel />,
          color: '#8B5CF6',
          bgColor: 'bg-purple-100',
          textColor: 'text-purple-800',
          label: 'Hotel'
        };
      case 'transport':
        return {
          icon: <FaBus />,
          color: '#F59E0B',
          bgColor: 'bg-yellow-100',
          textColor: 'text-yellow-800',
          label: 'Transport'
        };
      case 'hospital':
        return {
          icon: <FaHospital />,
          color: '#EF4444',
          bgColor: 'bg-red-100',
          textColor: 'text-red-800',
          label: 'Hospital'
        };
      case 'atm':
        return {
          icon: <FaMoneyBillWave />,
          color: '#10B981',
          bgColor: 'bg-green-100',
          textColor: 'text-green-800',
          label: 'ATM'
        };
      default:
        return {
          icon: <FaMapMarkerAlt />,
          color: '#6B7280',
          bgColor: 'bg-gray-100',
          textColor: 'text-gray-800',
          label: 'Location'
        };
    }
  };
  
  return (
    <div className={`flex flex-col h-screen bg-gray-50 transition-all duration-300 ${mapReady ? 'opacity-100' : 'opacity-0'}`}>
      {/* Header with Search */}
      <header className="bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-lg">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button 
                onClick={toggleSidebar}
                className="sidebar-toggle p-2 rounded-full hover:bg-blue-700 transition-colors duration-200 md:hidden"
                aria-label="Toggle sidebar"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
              <h1 className="text-xl md:text-2xl font-bold">Explore Jharkhand</h1>
            </div>
            
            <div className="relative flex-1 max-w-2xl mx-4 hidden md:block">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaSearch className="text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-transparent rounded-lg bg-blue-500 bg-opacity-20 text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 transition-all duration-200"
                placeholder="Search locations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div className="flex items-center space-x-2">
              <button
                onClick={handleLocateMe}
                className="locate-button p-2 rounded-full bg-blue-700 hover:bg-blue-800 text-white transition-colors duration-200"
                aria-label="Locate me"
                title="Locate me"
              >
                <MdMyLocation className="w-5 h-5" />
              </button>
              
              <div className="relative">
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className={`p-2 rounded-full ${showFilters ? 'bg-blue-700' : 'bg-blue-600 hover:bg-blue-700'} text-white transition-colors duration-200 flex items-center`}
                  aria-label="Filters"
                  title="Filters"
                >
                  <FaFilter className="w-4 h-4" />
                </button>
                
                {/* Filter Dropdown */}
                {showFilters && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-xl z-50 overflow-hidden"
                  >
                    <div className="p-4 border-b border-gray-200">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium text-gray-900">Filters</h3>
                        <button 
                          onClick={clearFilters}
                          className="text-sm text-blue-600 hover:text-blue-800"
                        >
                          Clear all
                        </button>
                      </div>
                    </div>
                    
                    <div className="p-4 space-y-4">
                      <div>
                        <h4 className="text-sm font-medium text-gray-700 mb-2">Rating</h4>
                        <div className="flex space-x-2">
                          {[4, 3, 2, 1].map(rating => (
                            <button
                              key={rating}
                              onClick={() => handleFilterChange('rating', rating)}
                              className={`flex items-center px-3 py-1 rounded-full text-sm ${
                                selectedFilters.rating === rating
                                  ? 'bg-blue-100 text-blue-700'
                                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                              }`}
                            >
                              <FaStar className={`mr-1 ${rating <= 3 ? 'text-yellow-400' : 'text-yellow-500'}`} />
                              {rating}+
                            </button>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="text-sm font-medium text-gray-700 mb-2">Price</h4>
                        <div className="flex flex-wrap gap-2">
                          {['free', 'budget', 'premium'].map(price => (
                            <button
                              key={price}
                              onClick={() => handleFilterChange('price', price)}
                              className={`px-3 py-1 rounded-full text-sm capitalize ${
                                selectedFilters.price === price
                                  ? 'bg-blue-100 text-blue-700'
                                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                              }`}
                            >
                              {price}
                            </button>
                          ))}
                        </div>
                      </div>
                      
                      {allFeatures.length > 0 && (
                        <div>
                          <h4 className="text-sm font-medium text-gray-700 mb-2">Features</h4>
                          <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto">
                            {allFeatures.slice(0, 10).map(feature => (
                              <button
                                key={feature}
                                onClick={() => handleFilterChange('feature', feature)}
                                className={`px-3 py-1 rounded-full text-sm ${
                                  selectedFilters.features.includes(feature)
                                    ? 'bg-blue-100 text-blue-700'
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }`}
                              >
                                {feature}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </div>
            </div>
          </div>
          
          {/* Mobile Search */}
          <div className="mt-3 md:hidden">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaSearch className="text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-transparent rounded-lg bg-blue-500 bg-opacity-20 text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50"
                placeholder="Search locations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <motion.div
          ref={sidebarRef}
          initial={{ x: '-100%' }}
          animate={{ x: sidebarOpen ? 0 : '-100%' }}
          transition={{ type: 'spring', damping: 30, stiffness: 300 }}
          className="fixed md:relative z-40 w-80 h-full bg-white border-r border-gray-200 flex flex-col shadow-xl md:shadow-none"
        >
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">
                {selectedType === 'all' ? 'All Locations' : `${selectedType.charAt(0).toUpperCase() + selectedType.slice(1)}s`}
              </h2>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                {filteredLocations.length}
              </span>
            </div>
            
            {/* Quick Filters */}
            <div className="flex space-x-2 overflow-x-auto pb-2 -mx-1 px-1">
              <button
                onClick={() => setSelectedType('all')}
                className={`flex-shrink-0 px-3 py-1 text-sm rounded-full flex items-center ${
                  selectedType === 'all' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <span>All</span>
              </button>
              
              {['tourist', 'restaurant', 'hotel', 'transport', 'hospital', 'atm'].map(type => {
                const { icon, color, label } = getLocationTypeInfo(type);
                return (
                  <button
                    key={type}
                    onClick={() => setSelectedType(type)}
                    className={`flex-shrink-0 px-3 py-1 text-sm rounded-full flex items-center ${
                      selectedType === type 
                        ? 'bg-blue-100 text-blue-700' 
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    <span className="mr-1.5" style={{ color }}>{icon}</span>
                    <span>{label}</span>
                  </button>
                );
              })}
            </div>
          </div>
          
          {/* Location List */}
          <div className="flex-1 overflow-y-auto">
            {sortedLocations.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center p-6">
                <FaMapMarkerAlt className="w-12 h-12 text-gray-300 mb-3" />
                <h3 className="text-lg font-medium text-gray-900 mb-1">No locations found</h3>
                <p className="text-sm text-gray-500">Try adjusting your search or filters</p>
              </div>
            ) : (
              <motion.div 
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="divide-y divide-gray-100"
              >
                <AnimatePresence>
                  {sortedLocations.map((location) => {
                    const { icon, color, bgColor, textColor } = getLocationTypeInfo(location.type);
                    const distance = userLocation 
                      ? calculateDistance(
                          userLocation.lat, 
                          userLocation.lng, 
                          location.position[0], 
                          location.position[1]
                        )
                      : null;
                    
                    return (
                      <motion.div
                        key={location.id}
                        variants={itemVariants}
                        layout
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0, height: 0, padding: 0, margin: 0, overflow: 'hidden' }}
                        transition={{ duration: 0.2 }}
                        className={`p-4 hover:bg-gray-50 cursor-pointer transition-colors ${
                          selectedLocation?.id === location.id ? 'bg-blue-50' : ''
                        }`}
                        onClick={() => handleLocationSelect(location)}
                      >
                        <div className="flex items-start">
                          <div className={`flex-shrink-0 h-10 w-10 rounded-full ${bgColor} flex items-center justify-center mr-3 mt-0.5`}>
                            <div style={{ color }}>
                              {icon}
                            </div>
                          </div>
                          
                          <div className="flex-1 min-w-0">
                            <div className="flex justify-between items-start">
                              <h3 className="text-sm font-medium text-gray-900 truncate">
                                {location.name}
                              </h3>
                              {location.rating && (
                                <div className="flex items-center ml-2">
                                  <FaStar className="text-yellow-400 w-3.5 h-3.5 mr-0.5" />
                                  <span className="text-xs font-medium text-gray-900">{location.rating}</span>
                                </div>
                              )}
                            </div>
                            
                            <p className="text-xs text-gray-500 mt-0.5 line-clamp-1">
                              {location.address}
                            </p>
                            
                            <div className="mt-1.5 flex flex-wrap gap-1.5">
                              {location.features?.slice(0, 2).map((feature, idx) => (
                                <span 
                                  key={idx} 
                                  className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800"
                                >
                                  {feature}
                                </span>
                              ))}
                              {location.features?.length > 2 && (
                                <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-500">
                                  +{location.features.length - 2}
                                </span>
                              )}
                            </div>
                            
                            <div className="mt-2 flex items-center justify-between">
                              {distance && (
                                <div className="flex items-center text-xs text-gray-500">
                                  <FaWalking className="mr-1" />
                                  {formatDistance(distance)} away
                                </div>
                              )}
                              
                              {location.openNow !== undefined && (
                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                  location.openNow ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                                }`}>
                                  {location.openNow ? 'Open Now' : 'Closed'}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              </motion.div>
            )}
          </div>
        </motion.div>

        {/* Map Container */}
        <div className="flex-1 relative">
          {/* Map Loading Overlay */}
          {!mapReady && (
            <div className="absolute inset-0 bg-white bg-opacity-80 flex items-center justify-center z-10">
              <div className="text-center">
                <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
                <p className="mt-3 text-gray-700">Loading map...</p>
              </div>
            </div>
          )}
          
          {/* Map */}
          <MapContainer
            center={center}
            zoom={13}
            zoomControl={false}
            style={{ height: '100%', width: '100%' }}
            whenCreated={mapInstance => { 
              mapRef.current = mapInstance;
            }}
            className="z-0"
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            
            <MapView center={center} zoom={13} />
            
            {/* User Location Marker */}
            {userLocation && (
              <Marker 
                position={[userLocation.lat, userLocation.lng]}
                icon={L.divIcon({
                  html: `
                    <div class="relative">
                      <div class="absolute -left-1/2 -top-1/2 w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center animate-pulse">
                        <div class="w-3 h-3 rounded-full bg-blue-600"></div>
                      </div>
                      <div class="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0 
                        border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent" 
                        style="border-top-color: #2563EB">
                      </div>
                    </div>
                  `,
                  className: 'user-location-marker',
                  iconSize: [40, 40],
                  iconAnchor: [20, 40]
                })}
              >
                <Popup className="custom-popup">
                  <div className="text-center">
                    <div className="font-medium text-blue-600">You are here</div>
                    <div className="text-xs text-gray-500 mt-1">
                      {userLocation.lat.toFixed(4)}, {userLocation.lng.toFixed(4)}
                    </div>
                  </div>
                </Popup>
              </Marker>
            )}

            {/* Location Markers */}
            <AnimatePresence>
              {filteredLocations.map((location) => (
                <LocationMarker
                  key={location.id}
                  location={location}
                  onClick={handleLocationSelect}
                  isSelected={selectedLocation?.id === location.id}
                  userLocation={userLocation}
                />
              ))}
            </AnimatePresence>
            
            <ZoomControl position="bottomright" />
          </MapContainer>
          
          {/* Transport Mode Selector */}
          <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 bg-white rounded-full shadow-lg p-1.5 flex items-center z-10">
            <button
              onClick={() => setTransportMode('walking')}
              className={`p-2 rounded-full flex items-center justify-center ${
                transportMode === 'walking' ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:bg-gray-100'
              }`}
              title="Walking"
            >
              <FaWalking className="w-5 h-5" />
            </button>
            <button
              onClick={() => setTransportMode('driving')}
              className={`p-2 rounded-full flex items-center justify-center ${
                transportMode === 'driving' ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:bg-gray-100'
              }`}
              title="Driving"
            >
              <FaCar className="w-5 h-5" />
            </button>
            <button
              onClick={() => setTransportMode('cycling')}
              className={`p-2 rounded-full flex items-center justify-center ${
                transportMode === 'cycling' ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:bg-gray-100'
              }`}
              title="Cycling"
            >
              <FaBicycle className="w-5 h-5" />
            </button>
          </div>
          
          {/* Selected Location Card */}
          <AnimatePresence>
            {selectedLocation && (
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 20, opacity: 0 }}
                transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                className="absolute bottom-6 right-6 w-full max-w-sm bg-white rounded-xl shadow-2xl overflow-hidden z-10 transform transition-all duration-300"
              >
                {/* Image Slider */}
                {selectedLocation.images?.length > 0 ? (
                  <div className="relative h-48 bg-gray-100 overflow-hidden">
                    <img 
                      src={selectedLocation.images[0]} 
                      alt={selectedLocation.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black/70 to-transparent" />
                  </div>
                ) : (
                  <div className="h-32 bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center">
                    <div className="text-white text-4xl">
                      {getLocationTypeInfo(selectedLocation.type).icon}
                    </div>
                  </div>
                )}
                
                <div className="p-5">
                  <div className="flex justify-between items-start">
                    <div>
                      <h2 className="text-xl font-bold text-gray-900">{selectedLocation.name}</h2>
                      <div className="flex items-center mt-1">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          getLocationTypeInfo(selectedLocation.type).bgColor
                        } ${getLocationTypeInfo(selectedLocation.type).textColor}`}>
                          {getLocationTypeInfo(selectedLocation.type).label}
                        </span>
                        {selectedLocation.rating && (
                          <div className="ml-2 flex items-center">
                            <FaStar className="text-yellow-400 mr-1" />
                            <span className="text-sm font-medium">{selectedLocation.rating}</span>
                            <span className="text-xs text-gray-500 ml-1">({selectedLocation.reviews})</span>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <button
                      onClick={() => setSelectedLocation(null)}
                      className="ml-2 p-1 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-500 focus:outline-none"
                      aria-label="Close"
                    >
                      <FaTimes className="w-5 h-5" />
                    </button>
                  </div>
                  
                  <div className="mt-3 space-y-3">
                    {selectedLocation.description && (
                      <p className="text-sm text-gray-600">{selectedLocation.description}</p>
                    )}
                    
                    <div className="flex items-center text-sm text-gray-500">
                      <FaMapMarkerAlt className="flex-shrink-0 mr-2 text-gray-400" />
                      <span>{selectedLocation.address}</span>
                    </div>
                    
                    {selectedLocation.openNow !== undefined && (
                      <div className="flex items-center text-sm">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          selectedLocation.openNow ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {selectedLocation.openNow ? 'Open Now' : 'Closed'}
                        </span>
                        {selectedLocation.hours && (
                          <span className="ml-2 text-sm text-gray-600">
                            {selectedLocation.hours}
                          </span>
                        )}
                      </div>
                    )}
                    
                    {selectedLocation.price && (
                      <div className="text-sm text-gray-700">
                        <span className="font-medium">Price:</span> {selectedLocation.price}
                      </div>
                    )}
                    
                    {selectedLocation.contact && (
                      <div className="text-sm">
                        <span className="font-medium text-gray-700">Contact:</span>{' '}
                        <a 
                          href={`tel:${selectedLocation.contact.replace(/[^0-9+]/g, '')}`}
                          className="text-blue-600 hover:text-blue-800"
                        >
                          {selectedLocation.contact}
                        </a>
                      </div>
                    )}
                    
                    {selectedLocation.website && (
                      <div className="text-sm">
                        <a 
                          href={selectedLocation.website.startsWith('http') ? selectedLocation.website : `https://${selectedLocation.website}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-800 text-sm"
                        >
                          Visit Website
                        </a>
                      </div>
                    )}
                    
                    {selectedLocation.features && selectedLocation.features.length > 0 && (
                      <div className="pt-2">
                        <h4 className="text-sm font-medium text-gray-700 mb-1">Features:</h4>
                        <div className="flex flex-wrap gap-1.5">
                          {selectedLocation.features.slice(0, 5).map((feature, idx) => (
                            <span 
                              key={idx} 
                              className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
                            >
                              {feature}
                            </span>
                          ))}
                          {selectedLocation.features.length > 5 && (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-500">
                              +{selectedLocation.features.length - 5} more
                            </span>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <div className="mt-4 pt-3 border-t border-gray-200 flex space-x-3">
                    {userLocation && (
                      <a
                        href={getDirectionsUrl(selectedLocation)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg text-sm font-medium flex items-center justify-center transition-colors duration-200"
                      >
                        <FaDirections className="mr-2" />
                        {transportMode === 'walking' ? 'Walk there' : 
                         transportMode === 'driving' ? 'Drive there' : 'Bike there'}
                      </a>
                    )}
                    
                    <a
                      href={`https://www.google.com/maps/dir/?api=1&destination=${selectedLocation.position[0]},${selectedLocation.position[1]}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 py-2 px-4 rounded-lg text-sm font-medium flex items-center justify-center transition-colors duration-200"
                    >
                      <FaMapMarkerAlt className="mr-2" />
                      View on Map
                    </a>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          
          {/* Floating Action Button for Mobile */}
          <button
            onClick={toggleSidebar}
            className="fixed bottom-6 right-6 md:hidden z-20 w-14 h-14 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg flex items-center justify-center transition-all duration-200 transform hover:scale-105"
            aria-label="Show locations"
          >
            <FaMapMarkerAlt className="w-6 h-6" />
          </button>
          
          {/* Map Attribution */}
          <div className="absolute bottom-2 right-2 bg-white bg-opacity-80 px-2 py-1 rounded text-xs text-gray-600 z-10">
            &copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">OpenStreetMap</a> contributors
          </div>
        </div>
      </div>
    </div>
  );
};
export default InteractiveMaps;
