import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Heart, Star, Clock, Scissors } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";

const Favorites = () => {
  const { data } = useQuery({
    queryKey: ["favorites"],
    queryFn: api.getFavorites,
  });
  const favoriteServices =
    data?.items ??
    ([] as Array<{
      id: string;
      name: string;
      price: string;
      duration: string;
      rating: number;
      description?: string;
      lastBooked?: string;
    }>);

  return (
    <div className="mobile-screen px-4 pt-8 pb-20">
      {/* Header */}
      <div className="mb-8 animate-fade-in">
        <h1 className="text-2xl font-bold text-foreground mb-2 flex items-center">
          <Heart className="w-6 h-6 mr-3 text-primary" />I Tuoi Preferiti
        </h1>
        <p className="text-muted-foreground">
          Prenota rapidamente i tuoi servizi preferiti
        </p>
      </div>

      {/* Servizi Preferiti */}
      <div className="space-y-4 mb-6">
        {favoriteServices.map((service, index) => (
          <Card
            key={service.id}
            className="glass-card p-4 hover:shadow-elevated transition-all duration-300 animate-slide-up"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <h3 className="font-semibold text-lg mb-1">{service.name}</h3>
                <p className="text-sm text-muted-foreground mb-2">
                  {service.description}
                </p>

                <div className="flex items-center text-xs text-muted-foreground mb-3">
                  <Clock className="w-3 h-3 mr-1" />
                  <span className="mr-4">{service.duration}</span>
                  <Star className="w-3 h-3 mr-1 fill-yellow-400 text-yellow-400" />
                  <span>{service.rating}</span>
                </div>

                <p className="text-xs text-muted-foreground">
                  Ultima prenotazione: {service.lastBooked ?? "-"}
                </p>
              </div>

              <div className="flex flex-col items-end ml-4">
                <span className="text-xl font-bold text-primary mb-2">
                  {service.price}
                </span>
                <Button variant="neon" size="sm" className="h-8 px-4">
                  <Scissors className="w-3 h-3 mr-1" />
                  Prenota
                </Button>
              </div>
            </div>

            <div className="border-t border-card-border pt-3">
              <Button
                variant="ghost"
                size="sm"
                className="w-full justify-center text-muted-foreground hover:text-foreground"
              >
                <Heart className="w-4 h-4 mr-2 fill-primary text-primary" />
                Rimuovi dai preferiti
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {/* CTA per aggiungere più preferiti */}
      <Card
        className="glass-card p-6 text-center animate-slide-up"
        style={{ animationDelay: "0.3s" }}
      >
        <div className="mb-4">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
            <Scissors className="w-8 h-8 text-primary" />
          </div>
          <h3 className="font-semibold mb-2">Esplora Altri Servizi</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Scopri nuovi trattamenti e aggiungili ai tuoi preferiti
          </p>
        </div>

        <Button variant="outline" className="w-full">
          Vedi Tutti i Servizi
        </Button>
      </Card>
    </div>
  );
};

export default Favorites;
