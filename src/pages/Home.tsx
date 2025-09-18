import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Calendar, Clock, User, Scissors, Star } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";

const Home = () => {
  const { data: servicesData } = useQuery({
    queryKey: ["services"],
    queryFn: api.getServices,
  });
  const services =
    servicesData?.items ??
    ([] as Array<{
      id: string;
      name: string;
      price_eur: number;
      duration_min: number;
    }>);

  return (
    <div className="mobile-screen px-4 pt-8 pb-20">
      {/* Header */}
      <div className="mb-8 animate-fade-in">
        <h1 className="text-2xl font-bold text-foreground mb-2">
          Ciao, Marco! 👋
        </h1>
        <p className="text-muted-foreground">
          Pronto per il tuo prossimo taglio?
        </p>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-4 mb-8 animate-slide-up">
        <Card className="glass-card p-4 hover:shadow-elevated transition-all duration-300">
          <div className="flex flex-col items-center text-center">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-3">
              <Calendar className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-semibold text-sm mb-1">Prenota Ora</h3>
            <p className="text-xs text-muted-foreground">Nuovo appuntamento</p>
          </div>
        </Card>

        <Card className="glass-card p-4 hover:shadow-elevated transition-all duration-300">
          <div className="flex flex-col items-center text-center">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-3">
              <Clock className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-semibold text-sm mb-1">I Miei Appuntamenti</h3>
            <p className="text-xs text-muted-foreground">Visualizza tutto</p>
          </div>
        </Card>
      </div>

      {/* Prossimo Appuntamento */}
      <div className="mb-8 animate-slide-up" style={{ animationDelay: "0.1s" }}>
        <h2 className="text-lg font-semibold mb-4 flex items-center">
          <Clock className="w-5 h-5 mr-2 text-primary" />
          Prossimo Appuntamento
        </h2>

        <Card className="glass-card p-4 border-l-4 border-l-primary">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mr-4">
                <User className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold">Mario Rossi</h3>
                <p className="text-sm text-muted-foreground">Taglio + Barba</p>
                <p className="text-xs text-primary">Oggi, 15:30</p>
              </div>
            </div>
            <Button variant="outline" size="sm">
              Dettagli
            </Button>
          </div>
        </Card>
      </div>

      {/* Servizi Popolari */}
      <div className="mb-8 animate-slide-up" style={{ animationDelay: "0.2s" }}>
        <h2 className="text-lg font-semibold mb-4 flex items-center">
          <Scissors className="w-5 h-5 mr-2 text-primary" />
          Servizi Popolari
        </h2>

        <div className="space-y-3">
          {services.map((service, index) => (
            <Card
              key={service.id ?? index}
              className="glass-card p-4 hover:shadow-elevated transition-all duration-300"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold">{service.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {service.duration_min} min
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-primary">€{service.price_eur}</p>
                  <div className="flex items-center text-xs text-muted-foreground mt-1">
                    <Star className="w-3 h-3 mr-1 fill-yellow-400 text-yellow-400" />
                    4.9
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* CTA Principale */}
      <div className="animate-slide-up" style={{ animationDelay: "0.3s" }}>
        <Button className="w-full h-14 bg-gradient-primary text-primary-foreground font-semibold text-lg neon-glow hover:scale-105 transition-all duration-300">
          <Calendar className="w-5 h-5 mr-2" />
          Prenota Subito
        </Button>
      </div>
    </div>
  );
};

export default Home;
