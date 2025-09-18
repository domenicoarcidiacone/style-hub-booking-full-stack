import { useState } from "react";
import BottomNav from "@/components/ui/bottom-nav";
import SplashScreen from "@/components/splash-screen";
import Home from "@/pages/Home";
import Appointments from "@/pages/Appointments";
import Profile from "@/pages/Profile";
import Favorites from "@/pages/Favorites";

const StyleHubApp = () => {
  const [showSplash, setShowSplash] = useState(true);
  const [activeTab, setActiveTab] = useState("home");

  if (showSplash) {
    return <SplashScreen onComplete={() => setShowSplash(false)} />;
  }

  const renderActiveScreen = () => {
    switch (activeTab) {
      case "home":
        return <Home />;
      case "calendar":
      case "appointments":
        return <Appointments />;
      case "favorites":
        return <Favorites />;
      case "profile":
        return <Profile />;
      default:
        return <Home />;
    }
  };

  return (
    <div className="mobile-screen">
      <main className="flex-1 overflow-y-auto">
        {renderActiveScreen()}
      </main>
      
      <BottomNav 
        activeTab={activeTab} 
        onTabChange={setActiveTab}
      />
    </div>
  );
};

export default StyleHubApp;