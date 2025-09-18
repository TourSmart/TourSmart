import { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import Home from './pages/Home';
import Destinations from './pages/Destinations';
import ItineraryPlanner from './pages/ItineraryPlanner';
import Chatbot from './pages/Chatbot';
import Marketplace from './pages/Marketplace';
import ARVRPreview from './pages/ARVRPreview';
import ARVRExperience from './pages/ARVRExperience';
import InteractiveMaps from './pages/InteractiveMaps';
import TransportInfo from './pages/TransportInfo';
import Feedback from './pages/Feedback';
import AdminDashboard from './pages/AdminDashboard';

function App() {
  const [showNavbar, setShowNavbar] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  // Reset navbar visibility when navigating away from home
  useEffect(() => {
    if (!isHomePage) {
      setShowNavbar(true);
    }
  }, [isHomePage]);

  const handleSlideshowComplete = () => {
    setShowNavbar(true);
  };

  const isFormPage = location.pathname === '/itinerary' || location.pathname === '/feedback' || location.pathname === '/admin';
  const isHomeOrDestinations = location.pathname === '/' || location.pathname === '/destinations';
  const needsPadding = !isFormPage && !isHomeOrDestinations;

  return (
    <div className="flex flex-col min-h-screen">
      {showNavbar && <Navbar />}
      <main className={`flex-grow ${isFormPage ? 'pt-16' : ''} ${needsPadding ? 'pt-20' : ''}`}>
        <Routes>
          <Route path="/" element={<Home onSlideshowComplete={handleSlideshowComplete} />} />
          <Route path="/destinations" element={<Destinations />} />
          <Route path="/itinerary" element={<ItineraryPlanner />} />
          <Route path="/chatbot" element={<Chatbot />} />
          <Route path="/marketplace" element={<Marketplace />} />
          <Route path="/ar-vr" element={<ARVRPreview />} />
          <Route path="/ar-vr/:id" element={<ARVRExperience />} />
          <Route path="/maps" element={<InteractiveMaps />} />
          <Route path="/transport" element={<TransportInfo />} />
          <Route path="/feedback" element={<Feedback />} />
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;