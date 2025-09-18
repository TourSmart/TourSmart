import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import {
  Plane,
  MapPin,
  Clock,
  Calendar,
  DollarSign,
  Heart,
  Compass,
  Star,
  Users,
  ChevronRight,
  ChevronLeft,
  CheckCircle,
  Sparkles,
  Zap,
  Briefcase,
  Sun,
  Moon,
  Utensils,
  Camera
} from "lucide-react";

// Image for hero section
const heroImage = "https://th.bing.com/th/id/R.aec51b613a7db75efa6d8a15b896e17a?rik=AAuqhAC%2b9ZxEJQ&riu=http%3a%2f%2fimages.unsplash.com%2fphoto-1438382458652-54431bf59e01%3fixlib%3drb-1.2.1%26q%3d80%26fm%3djpg%26crop%3dentropy%26cs%3dtinysrgb%26w%3d1080%26fit%3dmax&ehk=hGgQ0hukJZYJnlr8518zb23eRtkXgZDa2azn%2fqPk980%3d&risl=&pid=ImgRaw&r=0";

// Interests data
const interests = [
  { id: "adventure", name: "Adventure Sports" },
  { id: "culture", name: "Culture & History" },
  { id: "food", name: "Food & Cuisine" },
  { id: "nature", name: "Nature & Wildlife" },
  { id: "beaches", name: "Beaches & Coast" },
  { id: "nightlife", name: "Nightlife & Entertainment" },
  { id: "shopping", name: "Shopping" },
  { id: "photography", name: "Photography" },
  { id: "wellness", name: "Wellness & Spa" },
  { id: "architecture", name: "Architecture" },
  { id: "festivals", name: "Festivals & Events" },
  { id: "museums", name: "Museums & Galleries" },
];

// Travel styles data
const travelStyles = [
  { id: "budget", name: "Budget Explorer", icon: "💰", description: "Maximum value, minimum cost" },
  { id: "balanced", name: "Smart Traveler", icon: "⚖️", description: "Best of both worlds" },
  { id: "luxury", name: "Luxury Seeker", icon: "✨", description: "Premium experiences only" },
];

// Hero Section Component
const HeroSection = ({ onGetStarted }) => {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background">
      <div
        className="fixed inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-1000 ease-out animate-zoom-in"
        style={{
          backgroundImage: `url(${heroImage})`,
          zIndex: 0
        }}
      >
        <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
      </div>

      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto transform translate-y-0 animate-fade-in">
        <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 leading-tight drop-shadow-lg">
          <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            Your
          </span>{" "}
          <span className="text-white">Perfect Journey</span>
          <br />
          <span className="text-white">Awaits.</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed animate-fade-in" style={{ animationDelay: '0.5s' }}>
          Let AI craft your personalized travel itinerary. Discover hidden gems and must-see destinations tailored just for you.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-slide-up" style={{ animationDelay: '1s' }}>
          <Button
            size="lg"
            onClick={onGetStarted}
            className="bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold px-10 py-6 text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          >
            Start Planning Your Trip
            <ChevronRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
      
      <div className="absolute top-1/4 left-1/4 text-purple-400/30 animate-float" style={{ animationDelay: '0s' }}>
        <Plane size={80} />
      </div>
      <div className="absolute bottom-1/4 right-1/4 text-blue-400/30 animate-float" style={{ animationDelay: '1s' }}>
        <MapPin size={60} />
      </div>
    </div>
  );
};

// Travel Questionnaire Component (REDESIGNED - Light Theme)
const TravelQuestionnaire = ({ onSubmit, onBack }) => {
  const [preferences, setPreferences] = useState({
    destination: "",
    days: 5,
    budget: 1000,
    interests: [],
    travelStyle: "balanced",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Fake API call for demonstration
      await new Promise(resolve => setTimeout(resolve, 1500));
      const mockItinerary = Array.from({ length: preferences.days }, (_, i) => ({
        day: i + 1,
        date: `Day ${i+1}`,
        theme: `Exploring the best of ${preferences.destination}`,
        totalCost: Math.round(preferences.budget / preferences.days),
        items: [{activity: 'Morning Adventure', cost: '$50', location: 'Central Landmark', description: 'Start your day with an exciting activity.'}, {activity: 'Local Cuisine Lunch', cost: '$30', location: 'Famous Local Restaurant', description: 'Taste the authentic flavors of the region.'}, {activity: 'Evening Relaxation', cost: '$20', location: 'Scenic Viewpoint', description: 'Watch the sunset from a beautiful spot.'}]
      }));
      onSubmit(mockItinerary, preferences);
    } catch (err) {
      console.error("Error creating itinerary:", err);
      setError("Failed to create itinerary. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const toggleInterest = (interestId) => {
    setPreferences((prev) => {
      const isSelected = prev.interests.includes(interestId);
      const updatedInterests = isSelected
        ? prev.interests.filter((id) => id !== interestId)
        : [...prev.interests, interestId];
      return { ...prev, interests: updatedInterests };
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 text-slate-800 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10 animate-fade-in">
          <h2 className="text-4xl font-bold text-slate-900 mb-2">
            Let's Plan Your Perfect Trip <Sparkles className="inline text-yellow-400 animate-pulse" />
          </h2>
          <p className="text-slate-600 text-lg max-w-2xl mx-auto">
            Tell us about your travel dreams and we'll create a personalized itinerary just for you.
          </p>
        </div>

        <Card className="shadow-2xl animate-slide-up bg-white rounded-2xl border-gray-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-2xl font-semibold text-slate-800">
              <Heart className="text-rose-500" size={28} />
              Your Travel Preferences
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 sm:p-8">
            <form onSubmit={handleSubmit} className="space-y-10">
              <div className="space-y-4 animate-fade-in">
                <Label htmlFor="destination" className="flex items-center gap-2 text-lg font-semibold text-slate-800">
                  <MapPin className="text-purple-500" size={20} />
                  Where would you like to go?
                </Label>
                <Input
                  id="destination"
                  placeholder="e.g., Jharkhand, India"
                  value={preferences.destination}
                  onChange={(e) => setPreferences({ ...preferences, destination: e.target.value })}
                  className="text-lg p-6 border-2 border-gray-300 focus:border-purple-500 transition-colors bg-gray-50 text-slate-900 placeholder:text-gray-400 rounded-lg"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4 animate-fade-in" style={{ animationDelay: '0.2s' }}>
                  <Label className="flex items-center gap-2 text-lg font-semibold text-slate-800">
                    <Calendar className="text-cyan-500" size={20} />
                    How many days?
                  </Label>
                  <div className="flex items-center gap-4">
                    <Slider
                      value={[preferences.days]}
                      onValueChange={(value) => setPreferences({ ...preferences, days: value[0] })}
                      max={30} min={1} step={1}
                      className="w-full"
                    />
                    <div className="w-16 text-center font-bold text-xl text-cyan-600">{preferences.days}</div>
                  </div>
                </div>
                <div className="space-y-4 animate-fade-in" style={{ animationDelay: '0.3s' }}>
                  <Label className="flex items-center gap-2 text-lg font-semibold text-slate-800">
                    <DollarSign className="text-yellow-500" size={20} />
                    Budget (per person)
                  </Label>
                  <div className="flex items-center gap-4">
                    <Slider
                      value={[preferences.budget]}
                      onValueChange={(value) => setPreferences({ ...preferences, budget: value[0] })}
                      max={10000} min={100} step={100}
                      className="w-full"
                    />
                    <div className="w-20 text-center font-bold text-xl text-yellow-600">${preferences.budget}</div>
                  </div>
                </div>
              </div>

              <div className="space-y-4 animate-fade-in" style={{ animationDelay: '0.4s' }}>
                <Label className="flex items-center gap-2 text-lg font-semibold text-slate-800">
                  <Compass className="text-orange-500" size={20} />
                  What interests you?
                </Label>
                <div className="flex flex-wrap gap-3">
                  {interests.map((interest) => (
                    <button
                      key={interest.id}
                      type="button"
                      className={`px-4 py-2 text-sm font-medium border-2 rounded-full transition-all duration-200 ${preferences.interests.includes(interest.id) ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white border-transparent shadow-md' : 'bg-white text-slate-700 border-gray-300 hover:border-gray-400 hover:bg-gray-50'}`}
                      onClick={() => toggleInterest(interest.id)}
                    >
                      {interest.name}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-4 animate-fade-in" style={{ animationDelay: '0.5s' }}>
                <Label className="flex items-center gap-2 text-lg font-semibold text-slate-800">
                  <Star className="text-teal-500" size={20} />
                  What's your travel style?
                </Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {travelStyles.map((style) => (
                    <div
                      key={style.id}
                      className={`p-5 border-2 rounded-xl cursor-pointer transition-all duration-300 relative ${preferences.travelStyle === style.id ? 'border-purple-500 bg-purple-50 shadow-lg' : 'border-gray-300 bg-white hover:border-purple-300'}`}
                      onClick={() => setPreferences({ ...preferences, travelStyle: style.id })}
                    >
                      {preferences.travelStyle === style.id && (
                        <CheckCircle className="h-6 w-6 text-white bg-purple-500 rounded-full p-1 absolute top-2 right-2" />
                      )}
                      <div className="flex items-center gap-3">
                        <span className="text-3xl">{style.icon}</span>
                        <div>
                          <div className="font-semibold text-slate-800">{style.name}</div>
                          <div className="text-sm text-slate-500">{style.description}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {error && (
                <div className="text-center text-rose-500 font-semibold animate-fade-in">
                  <p>Error: {error}</p>
                </div>
              )}

              <div className="flex flex-col sm:flex-row gap-4 pt-6 animate-fade-in" style={{ animationDelay: '0.6s' }}>
                <Button
                  type="button"
                  variant="outline"
                  onClick={onBack}
                  className="flex-1 py-3 text-lg bg-white border-gray-300 text-slate-700 hover:bg-gray-100"
                >
                  <ChevronLeft className="mr-2 h-5 w-5" />
                  Back to Home
                </Button>
                <Button
                  type="submit"
                  className="flex-1 py-3 text-lg bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold hover:opacity-90 shadow-lg"
                  disabled={!preferences.destination || preferences.interests.length === 0 || loading}
                >
                  {loading ? "Creating..." : "Create My Itinerary"} 
                  {!loading && <Zap className="ml-2 h-5 w-5" />}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};


// Itinerary Display Component (REDESIGNED)
const ItineraryDisplay = ({ itinerary, preferences, onBack, onStartOver }) => {
  if (!itinerary || itinerary.length === 0) {
    return (
      <div className="min-h-screen bg-gray-100 text-gray-800 flex items-center justify-center p-4">
        <div className="text-center">
          <Zap className="h-16 w-16 mx-auto text-gray-400 mb-4" />
          <h2 className="text-2xl font-bold mb-2 text-gray-700">Could Not Generate Itinerary</h2>
          <p className="text-gray-500">The AI response could not be parsed. Please try again with different interests.</p>
          <Button onClick={onStartOver} className="mt-6">
            <ChevronLeft className="mr-2 h-4 w-4" />
            Start Over
          </Button>
        </div>
      </div>
    );
  }

  const totalBudget = itinerary.reduce((sum, day) => sum + day.totalCost, 0);

  const ActivityIcon = ({ theme }) => {
    // A simple function to return an icon based on the activity theme
    if (!theme) return <Briefcase size={20} className="text-blue-500" />;
    const lowerTheme = theme.toLowerCase();
    if (lowerTheme.includes('food') || lowerTheme.includes('cuisine')) return <Utensils size={20} className="text-orange-500" />;
    if (lowerTheme.includes('culture') || lowerTheme.includes('history')) return <Briefcase size={20} className="text-indigo-500" />;
    if (lowerTheme.includes('adventure')) return <Zap size={20} className="text-red-500" />;
    if (lowerTheme.includes('nature')) return <Sun size={20} className="text-green-500" />;
    if (lowerTheme.includes('photo')) return <Camera size={20} className="text-purple-500" />;
    return <Briefcase size={20} className="text-blue-500" />;
  };

  return (
    <div className="min-h-screen bg-gray-50 text-slate-800 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* --- HEADER --- */}
        <div className="text-center mb-12 animate-fade-in">
          <p className="text-lg font-semibold text-blue-600">Your Personalized Itinerary</p>
          <h1 className="mt-2 text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900">
            Exploring {preferences.destination}
          </h1>
          <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
            A {preferences.days}-day adventure crafted just for you.
          </p>
        </div>

        {/* --- TRIP SUMMARY CARD --- */}
        <Card className="mb-10 p-6 bg-white shadow-lg rounded-2xl border border-gray-200 animate-slide-up" style={{ animationDelay: '0.1s' }}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="flex flex-col items-center">
              <Calendar className="h-8 w-8 text-blue-500 mb-2" />
              <p className="font-semibold text-slate-800">{preferences.days} Days</p>
              <p className="text-sm text-slate-500">Duration</p>
            </div>
            <div className="flex flex-col items-center">
              <DollarSign className="h-8 w-8 text-green-500 mb-2" />
              <p className="font-semibold text-slate-800">${totalBudget}</p>
              <p className="text-sm text-slate-500">Est. Budget</p>
            </div>
            <div className="flex flex-col items-center">
              <Users className="h-8 w-8 text-purple-500 mb-2" />
              <p className="font-semibold text-slate-800 capitalize">{preferences.travelStyle}</p>
              <p className="text-sm text-slate-500">Travel Style</p>
            </div>
             <div className="flex flex-col items-center col-span-2 md:col-span-1">
              <Compass className="h-8 w-8 text-orange-500 mb-2" />
              <div className="flex flex-wrap justify-center gap-1">
                {preferences.interests.map(interest => (
                  <Badge key={interest} variant="secondary" className="capitalize">{interest}</Badge>
                ))}
              </div>
              <p className="text-sm text-slate-500 mt-1">Interests</p>
            </div>
          </div>
        </Card>

        {/* --- ITINERARY DAYS --- */}
        <div className="space-y-12">
          {itinerary.map((day, index) => (
            <div key={day.day} className="animate-slide-up" style={{ animationDelay: `${0.2 + index * 0.1}s` }}>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-2xl shadow-md">
                  {day.day}
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-slate-900">{day.date}</h2>
                  <p className="text-md text-slate-500 font-medium">{day.theme}</p>
                </div>
              </div>
              
              <div className="relative pl-8 border-l-2 border-gray-200">
                {day.items.map((item, itemIndex) => (
                  <div key={itemIndex} className="mb-8 relative">
                    <div className="absolute -left-[2.1rem] top-1 h-10 w-10 bg-white rounded-full flex items-center justify-center border-2 border-gray-200">
                       <ActivityIcon theme={day.theme}/>
                    </div>
                    <Card className="ml-6 bg-white shadow-lg rounded-xl border border-gray-200 hover:shadow-xl transition-shadow duration-300">
                       <CardContent className="p-6">
                          <div className="flex items-start justify-between mb-2">
                            <h4 className="font-bold text-lg text-slate-800">{item.activity}</h4>
                            <Badge variant="outline" className="text-sm font-semibold text-green-600 border-green-200 bg-green-50">{item.cost}</Badge>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-slate-500 mb-3">
                            <MapPin size={14} className="text-gray-400" />
                            <span>{item.location}</span>
                          </div>
                          <p className="text-slate-600 leading-relaxed">{item.description}</p>
                       </CardContent>
                    </Card>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* --- ACTION BUTTONS --- */}
        <div className="flex flex-col sm:flex-row gap-4 mt-16 animate-fade-in" style={{ animationDelay: '0.8s' }}>
          <Button
            variant="outline"
            onClick={onBack}
            className="flex-1 py-6 text-lg bg-white border-gray-300 text-slate-700 hover:bg-gray-100 hover:text-slate-900"
          >
            <ChevronLeft className="mr-2 h-5 w-5" />
            Modify Preferences
          </Button>
          <Button
            onClick={onStartOver}
            className="flex-1 py-6 text-lg bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold hover:opacity-90 shadow-lg"
          >
            Plan Another Trip
            <ChevronRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

// Main App Component
const Index = () => {
  const [currentState, setCurrentState] = useState("hero");
  const [travelPreferences, setTravelPreferences] = useState(null);
  const [itineraryData, setItineraryData] = useState(null);

  const handleGetStarted = () => {
    setCurrentState("questionnaire");
  };

  const handleQuestionnaireSubmit = (itinerary, preferences) => {
    setTravelPreferences(preferences);
    setItineraryData(itinerary);
    setCurrentState("itinerary");
  };

  const handleBackToQuestionnaire = () => {
    setCurrentState("questionnaire");
  };

  const handleStartOver = () => {
    setTravelPreferences(null);
    setItineraryData(null);
    setCurrentState("hero");
  };

  const renderCurrentView = () => {
    switch (currentState) {
      case "hero":
        return <HeroSection onGetStarted={handleGetStarted} />;
      case "questionnaire":
        return (
          <TravelQuestionnaire
            onSubmit={handleQuestionnaireSubmit}
            onBack={handleStartOver}
          />
        );
      case "itinerary":
        return itineraryData && travelPreferences ? (
          <ItineraryDisplay
            itinerary={itineraryData}
            preferences={travelPreferences}
            onBack={handleBackToQuestionnaire}
            onStartOver={handleStartOver}
          />
        ) : null;
      default:
        return <HeroSection onGetStarted={handleGetStarted} />;
    }
  };

  return <div className="min-h-screen">{renderCurrentView()}</div>;
};

export default Index;