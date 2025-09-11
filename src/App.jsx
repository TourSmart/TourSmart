import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import Home from './pages/Home';
import Destinations from './pages/Destinations';
import ItineraryPlanner from './pages/ItineraryPlanner';
import Chatbot from './pages/Chatbot';
import Marketplace from './pages/Marketplace';
import ARVRPreview from './pages/ARVRPreview';
import TransportInfo from './pages/TransportInfo';
import Feedback from './pages/Feedback';
import AdminDashboard from './pages/AdminDashboard';

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/destinations" element={<Destinations />} />
          <Route path="/itinerary" element={<ItineraryPlanner />} />
          <Route path="/chatbot" element={<Chatbot />} />
          <Route path="/marketplace" element={<Marketplace />} />
          <Route path="/ar-vr" element={<ARVRPreview />} />
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