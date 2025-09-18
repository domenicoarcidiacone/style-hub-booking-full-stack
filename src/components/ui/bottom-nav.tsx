import { Home, Calendar, Clock, User, Heart } from "lucide-react";
import { cn } from "@/lib/utils";

interface BottomNavProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const BottomNav = ({ activeTab, onTabChange }: BottomNavProps) => {
  const tabs = [
    { id: "home", icon: Home, label: "Home" },
    { id: "calendar", icon: Calendar, label: "Calendario" },
    { id: "appointments", icon: Clock, label: "Appuntamenti" },
    { id: "favorites", icon: Heart, label: "Preferiti" },
    { id: "profile", icon: User, label: "Profilo" },
  ];

  return (
    <div className="bottom-nav">
      <div className="py-2 px-4 h-16">
        <div className="grid grid-cols-5 gap-1">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            
            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={cn(
                  "flex flex-col items-center justify-center p-2 rounded-2xl transition-all duration-300 min-w-[60px]",
                  isActive 
                    ? "bg-primary text-primary-foreground shadow-neon scale-105" 
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                <Icon 
                  size={18} 
                  className={cn(
                    "transition-all duration-300 mb-1",
                    isActive && "scale-110"
                  )}
                />
                <span className={cn(
                  "text-xs font-medium",
                  isActive && "text-primary-foreground"
                )}>
                  {tab.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default BottomNav;