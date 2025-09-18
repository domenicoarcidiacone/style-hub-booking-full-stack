import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ChevronLeft, ChevronRight, Heart, CreditCard, MapPin, Bell, Info, User, Search, Calendar } from "lucide-react";

const Profile = () => {
  const menuItems = [
    {
      icon: Heart,
      title: "I Tuoi Preferiti",
      subtitle: "Riordina il tuo servizio preferito con un click",
      hasArrow: true,
    },
    {
      icon: CreditCard,
      title: "Pagamenti",
      subtitle: "Metodi di pagamento, Cronologia transazioni",
      hasArrow: true,
    },
    {
      icon: MapPin,
      title: "Gestisci Indirizzo",
      subtitle: "Riordina il tuo servizio preferito con un click",
      hasArrow: true,
    },
    {
      icon: Bell,
      title: "Notifiche",
      subtitle: "Gestisci le tue notifiche e promemoria",
      hasArrow: true,
    },
    {
      icon: Info,
      title: "Informazioni",
      subtitle: "Informazioni su Style Hub e supporto",
      hasArrow: true,
    },
  ];

  return (
    <div className="mobile-screen px-4 pt-8 pb-20">
      {/* Header */}
      <div className="flex items-center justify-between mb-8 animate-fade-in">
        <Button variant="ghost" size="icon">
          <ChevronLeft className="w-6 h-6" />
        </Button>
        <h1 className="text-xl font-bold">Profilo</h1>
        <Button variant="ghost" size="icon">
          <div className="flex flex-col space-y-1">
            <div className="w-1 h-1 bg-current rounded-full"></div>
            <div className="w-1 h-1 bg-current rounded-full"></div>
            <div className="w-1 h-1 bg-current rounded-full"></div>
          </div>
        </Button>
      </div>

      {/* Profilo Utente */}
      <div className="flex flex-col items-center mb-8 animate-slide-up">
        <div className="relative mb-4">
          <img
            src="https://api.dicebear.com/7.x/avataaars/svg?seed=John"
            alt="Profilo"
            className="w-24 h-24 rounded-full border-4 border-primary neon-glow"
          />
        </div>
        
        <h2 className="text-2xl font-bold text-foreground mb-1">John Doe</h2>
        <p className="text-muted-foreground mb-4">johndoe00@gmail.com</p>
        
        <Button variant="outline" className="rounded-full">
          Modifica Profilo
        </Button>
      </div>

      {/* Menu Items */}
      <div className="space-y-4 animate-slide-up" style={{animationDelay: "0.1s"}}>
        {menuItems.map((item, index) => {
          const Icon = item.icon;
          
          return (
            <Card key={index} className="glass-card hover:shadow-elevated transition-all duration-300">
              <button className="w-full p-4 flex items-center text-left">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                  <Icon className="w-5 h-5 text-primary" />
                </div>
                
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-foreground mb-1">{item.title}</h3>
                  <p className="text-sm text-muted-foreground truncate">{item.subtitle}</p>
                </div>
                
                {item.hasArrow && (
                  <ChevronRight className="w-5 h-5 text-muted-foreground flex-shrink-0 ml-2" />
                )}
              </button>
            </Card>
          );
        })}
      </div>

      {/* Bottom Action Buttons (Duplicate navigation visible in profile) */}
      <div className="mt-8 animate-slide-up" style={{animationDelay: "0.2s"}}>
        <div className="grid grid-cols-4 gap-2 bg-card rounded-2xl p-2 border border-card-border">
          <Button 
            variant="ghost" 
            size="sm" 
            className="flex flex-col items-center py-3 h-auto"
          >
            <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center mb-1">
              <div className="w-4 h-4 bg-muted-foreground rounded-sm"></div>
            </div>
            <span className="text-xs">Riordina il tuo servizio preferito con un click</span>
          </Button>
          
          <Button 
            variant="ghost" 
            size="sm" 
            className="flex flex-col items-center py-3 h-auto"
          >
            <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center mb-1">
              <Search className="w-4 h-4 text-muted-foreground" />
            </div>
          </Button>
          
          <Button 
            variant="ghost" 
            size="sm" 
            className="flex flex-col items-center py-3 h-auto"
          >
            <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center mb-1">
              <Calendar className="w-4 h-4 text-muted-foreground" />
            </div>
          </Button>
          
          <Button 
            variant="ghost" 
            size="sm" 
            className="flex flex-col items-center py-3 h-auto"
          >
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center mb-1 neon-glow">
              <User className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="text-xs font-medium text-primary">Profilo</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Profile;