import { useState, useEffect } from "react";
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
} from "lucide-react";

// Updated: Use the new image URL for the hero background
const heroImage = "https://images.unsplash.com/photo-1438382458652-54431bf59e01?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max";

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
  { id: "adventure", name: "Thrill Seeker", icon: "🏔️", description: "High energy activities" },
];

// Hero Section Component
const HeroSection = ({ onGetStarted }) => {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background">
      {/* Dynamic Background */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-1000 ease-out animate-zoom-in"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
      </div>

      {/* Main Content with subtle parallax */}
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

      {/* Animated Icons */}
      <div className="absolute top-1/4 left-1/4 text-purple-400/30 animate-float" style={{ animationDelay: '0s' }}>
        <Plane size={80} />
      </div>
      <div className="absolute bottom-1/4 right-1/4 text-blue-400/30 animate-float" style={{ animationDelay: '1s' }}>
        <MapPin size={60} />
      </div>
    </div>
  );
};

// Travel Questionnaire Component
const TravelQuestionnaire = ({ onSubmit, onBack }) => {
  const [preferences, setPreferences] = useState({
    destination: "",
    days: 5,
    budget: 1000,
    interests: [],
    travelStyle: "balanced",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(preferences);
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

  const selectedInterests = preferences.interests;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-gray-200 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10 animate-fade-in">
          <h2 className="text-4xl font-bold text-white mb-2">
            Let's Plan Your Perfect Trip <Sparkles className="inline text-yellow-300 animate-pulse" />
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Tell us about your travel dreams and we'll create a personalized itinerary just for you.
          </p>
        </div>

        <Card className="shadow-2xl animate-slide-up bg-gray-800/60 backdrop-blur-md border-gray-700">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-2xl font-semibold text-white">
              <Heart className="text-rose-400" size={28} />
              Your Travel Preferences
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-10">
              {/* Destination */}
              <div className="space-y-4 animate-fade-in">
                <Label htmlFor="destination" className="flex items-center gap-2 text-lg font-semibold text-white">
                  <MapPin className="text-purple-400" size={20} />
                  Where would you like to go?
                </Label>
                <Input
                  id="destination"
                  placeholder="e.g., Paris, Tokyo, Bali..."
                  value={preferences.destination}
                  onChange={(e) => setPreferences({ ...preferences, destination: e.target.value })}
                  className="text-lg p-6 border-2 focus:border-purple-500 transition-colors bg-gray-700/50 text-white placeholder:text-gray-500"
                  required
                />
              </div>

              {/* Duration & Budget */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4 animate-fade-in" style={{ animationDelay: '0.2s' }}>
                  <Label className="flex items-center gap-2 text-lg font-semibold text-white">
                    <Calendar className="text-cyan-400" size={20} />
                    How many days?
                  </Label>
                  <div className="flex items-center gap-4">
                    <Slider
                      value={[preferences.days]}
                      onValueChange={(value) => setPreferences({ ...preferences, days: value[0] })}
                      max={30}
                      min={1}
                      step={1}
                      className="w-full [&>span:first-child]:bg-purple-500"
                    />
                    <div className="w-16 text-center font-bold text-xl text-purple-400">{preferences.days}</div>
                  </div>
                </div>

                <div className="space-y-4 animate-fade-in" style={{ animationDelay: '0.3s' }}>
                  <Label className="flex items-center gap-2 text-lg font-semibold text-white">
                    <DollarSign className="text-yellow-400" size={20} />
                    Budget (per person)
                  </Label>
                  <div className="flex items-center gap-4">
                    <Slider
                      value={[preferences.budget]}
                      onValueChange={(value) => setPreferences({ ...preferences, budget: value[0] })}
                      max={10000}
                      min={100}
                      step={100}
                      className="w-full [&>span:first-child]:bg-purple-500"
                    />
                    <div className="w-20 text-center font-bold text-xl text-purple-400">${preferences.budget}</div>
                  </div>
                </div>
              </div>

              {/* Interests */}
              <div className="space-y-4 animate-fade-in" style={{ animationDelay: '0.4s' }}>
                <Label className="flex items-center gap-2 text-lg font-semibold text-white">
                  <Compass className="text-orange-400" size={20} />
                  What interests you? (Select all that apply)
                </Label>
                <div className=" grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {interests.map((interest, index) => (
                    <Badge
                      key={interest.id}
                      variant="outline"
                      className={`
                        text-white p-4 cursor-pointer transition-all duration-300 hover:scale-105 rounded-xl
                        border-2 hover:shadow-lg
                        ${selectedInterests.includes(interest.id)
                          ? 'bg-gradient-to-br from-blue-500 to-purple-600 text-white border-purple-500 shadow-xl'
                          : 'bg-gray-700/50 hover:bg-gray-700 border-gray-700'
                        }
                      `}
                      style={{ animationDelay: `${index * 0.05}s` }}
                      onClick={() => toggleInterest(interest.id)}
                    >
                      <div className="flex flex-col items-center gap-2">
          
                        <span className="text-l font-medium text-center p-2">{interest.name}</span>
                      </div>
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Travel Style */}
              <div className="space-y-4 animate-fade-in" style={{ animationDelay: '0.5s' }}>
                <Label className="flex items-center gap-2 text-lg font-semibold text-white">
                  <Star className="text-teal-400" size={20} />
                  What's your travel style?
                </Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {travelStyles.map((style) => (
                    <div
                      key={style.id}
                      className={`p-5 border-2 rounded-xl cursor-pointer transition-all duration-300 hover:shadow-xl hover:border-purple-500/50 relative ${
                        preferences.travelStyle === style.id
                          ? 'border-purple-500 bg-purple-500/10 shadow-lg'
                          : 'border-gray-700 bg-gray-700/50'
                      }`}
                      onClick={() => setPreferences({ ...preferences, travelStyle: style.id })}
                    >
                      {preferences.travelStyle === style.id && (
                        <CheckCircle className="h-6 w-6 text-purple-500 absolute top-2 right-2" />
                      )}
                      <div className="flex items-center gap-3">
                        <span className="text-3xl">{style.icon}</span>
                        <div>
                          <div className="font-semibold text-white">{style.name}</div>
                          <div className="text-sm text-gray-400">{style.description}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-6 animate-fade-in" style={{ animationDelay: '0.6s' }}>
                <Button
                  type="button"
                  variant="outline"
                  onClick={onBack}
                  className="flex-1 text-purple-400 hover:bg-purple-900 border-purple-400"
                >
                  <ChevronLeft className="mr-2 h-5 w-5" />
                  Back to Home
                </Button>
                <Button
                  type="submit"
                  className="flex-1 bg-gradient-to-br from-blue-500 to-purple-600 text-white font-bold hover:opacity-90 shadow-lg transition-all duration-300"
                  disabled={!preferences.destination || preferences.interests.length === 0}
                >
                  Create My Itinerary <Zap className="ml-2 inline h-4 w-4 animate-pulse" />
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

// Itinerary Display Component
const ItineraryDisplay = ({ preferences, onBack, onStartOver }) => {
  const [itinerary, setItinerary] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate AI generating itinerary
    const generateItinerary = () => {
      setLoading(true);

      setTimeout(() => {
        const mockItinerary = [];
        const interestMap = interests.reduce((acc, curr) => ({ ...acc, [curr.id]: curr.icon }), {});

        for (let day = 1; day <= preferences.days; day++) {
          const themes = ["Explore & Discover", "Cultural Immersion", "Adventure Day", "Relaxation", "Local Experiences"];
          const theme = themes[(day - 1) % themes.length];

          const activities = [
            {
              time: "9:00 AM",
              activity: `Morning ${preferences.interests[0] || 'exploration'} tour`,
              location: `${preferences.destination} City Center`,
              duration: "2 hrs",
              cost: "$" + Math.floor(Math.random() * 50 + 20),
              type: preferences.interests[0] || "culture",
              icon: interestMap[preferences.interests[0]] || "🚶",
              description: `Start your day with an immersive experience in ${preferences.destination}'s most iconic location.`
            },
            {
              time: "12:00 PM",
              activity: "Local cuisine lunch",
              location: "Traditional Restaurant",
              duration: "1.5 hrs",
              cost: "$" + Math.floor(Math.random() * 40 + 15),
              type: "food",
              icon: "🍜",
              description: "Savor authentic local flavors at a highly-rated traditional restaurant."
            },
            {
              time: "2:30 PM",
              activity: `${preferences.interests[1] || 'Sightseeing'} experience`,
              location: "Historic District",
              duration: "3 hrs",
              cost: "$" + Math.floor(Math.random() * 60 + 30),
              type: preferences.interests[1] || "culture",
              icon: interestMap[preferences.interests[1]] || "📸",
              description: "Dive deep into the local history and culture with expert guides."
            },
            {
              time: "6:00 PM",
              activity: "Sunset viewing",
              location: "Scenic Viewpoint",
              duration: "1 hr",
              cost: "Free",
              type: "nature",
              icon: "🌅",
              description: "End your day with breathtaking sunset views from the best vantage point."
            },
            {
              time: "8:00 PM",
              activity: "Dinner & entertainment",
              location: "Local Entertainment District",
              duration: "2 hrs",
              cost: "$" + Math.floor(Math.random() * 80 + 40),
              type: "nightlife",
              icon: "🎶",
              description: "Experience the vibrant nightlife with dinner and local entertainment."
            }
          ];

          const totalCost = activities.reduce((sum, item) => {
            const cost = item.cost === "Free" ? 0 : parseInt(item.cost.replace("$", ""));
            return sum + cost;
          }, 0);

          mockItinerary.push({
            day,
            date: `Day ${day}`,
            theme,
            items: activities,
            totalCost
          });
        }

        setItinerary(mockItinerary);
        setLoading(false);
      }, 2000);
    };

    generateItinerary();
  }, [preferences]);

  const totalBudget = itinerary.reduce((sum, day) => sum + day.totalCost, 0);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white flex items-center justify-center">
        <div className="text-center animate-pulse">
          <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <h2 className="text-2xl font-bold mb-2">Creating Your Perfect Itinerary...</h2>
          <p className="text-gray-400">Our AI is crafting personalized experiences just for you.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-gray-200 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10 animate-fade-in">
          <h1 className="text-4xl font-bold text-white mb-2">
            Your {preferences.destination} Adventure
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-4">
            A {preferences.days}-day itinerary crafted just for you, based on your interests and budget.
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <Badge variant="outline" className="flex items-center gap-1 border-purple-400 text-purple-400">
              <Calendar size={14} />
              {preferences.days} days
            </Badge>
            <Badge variant="outline" className="flex items-center gap-1 border-purple-400 text-purple-400">
              <DollarSign size={14} />
              ${totalBudget} estimated
            </Badge>
            <Badge variant="outline" className="flex items-center gap-1 border-purple-400 text-purple-400">
              <Users size={14} />
              {preferences.travelStyle}
            </Badge>
          </div>
        </div>

        {/* Daily Itineraries */}
        <div className="space-y-8">
          {itinerary.map((day, index) => (
            <Card key={day.day} className="shadow-2xl animate-slide-up bg-gray-800/60 backdrop-blur-md border-gray-700" style={{ animationDelay: `${index * 0.1}s` }}>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                      {day.day}
                    </div>
                    <div>
                      <div className="text-2xl font-semibold text-white">{day.date}</div>
                      <div className="text-sm text-gray-400 font-normal">{day.theme}</div>
                    </div>
                  </div>
                  <Badge className="text-white bg-purple-500/20 hover:bg-purple-500/30 border-purple-500">
                    ${day.totalCost} est.
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {day.items.map((item, itemIndex) => (
                    <div key={itemIndex} className="relative flex gap-4 pl-12">
                      {/* Timeline dot and line */}
                      <div className="absolute left-0 top-0 h-full w-px bg-gray-700">
                        <div className="w-4 h-4 rounded-full bg-purple-500 absolute top-0 -left-2" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-1">
                          <h4 className="font-semibold text-white text-lg">{item.activity}</h4>
                          <Badge className="ml-2 text-xs font-semibold bg-gray-700 text-gray-200">{item.cost}</Badge>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-400 mb-2">
                          <MapPin size={14} className="text-cyan-400" />
                          <span>{item.location}</span>
                          <span className="text-xs text-purple-400 font-medium ml-auto">{item.duration}</span>
                        </div>
                        <p className="text-sm text-gray-400">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mt-10 animate-fade-in">
          <Button
            variant="outline"
            onClick={onBack}
            className="flex-1 text-purple-400 hover:bg-purple-900 border-purple-400"
          >
            <ChevronLeft className="mr-2 h-5 w-5" />
            Modify Preferences
          </Button>
          <Button
            onClick={onStartOver}
            className="flex-1 bg-gradient-to-br from-blue-500 to-purple-600 text-white font-bold hover:opacity-90 shadow-lg"
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

  const handleGetStarted = () => {
    setCurrentState("questionnaire");
  };

  const handleQuestionnaireSubmit = (preferences) => {
    setTravelPreferences(preferences);
    setCurrentState("itinerary");
  };

  const handleBackToQuestionnaire = () => {
    setCurrentState("questionnaire");
  };

  const handleStartOver = () => {
    setTravelPreferences(null);
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
        return travelPreferences ? (
          <ItineraryDisplay
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