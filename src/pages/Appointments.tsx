import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ChevronLeft, ChevronRight, Clock } from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { toast } from "@/hooks/use-toast";

const Appointments = () => {
  const [selectedDate, setSelectedDate] = useState("05");
  const [selectedTime, setSelectedTime] = useState("09:30 Am");
  const [selectedSpecialist, setSelectedSpecialist] = useState<string | null>(
    null
  );

  const { data: specialistsData } = useQuery({
    queryKey: ["specialists"],
    queryFn: api.getSpecialists,
  });
  const specialists = (specialistsData?.items ?? []).map((s) => ({
    id: s.id,
    name: s.name,
    available: s.available,
  }));

  const qc = useQueryClient();
  const createMutation = useMutation({
    mutationFn: (payload: any) => api.createAppointment(payload),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["appointments"] });
      toast({
        title: "Prenotazione creata",
        description: "Il tuo appuntamento è stato confermato.",
      });
    },
    onError: () => {
      toast({
        title: "Errore",
        description: "Non è stato possibile creare l'appuntamento.",
        variant: "destructive",
      });
    },
  });

  const weekDays = [
    { day: "Dom", date: "02" },
    { day: "Lun", date: "03" },
    { day: "Mar", date: "04" },
    { day: "Mer", date: "05" },
    { day: "Gio", date: "06" },
    { day: "Ven", date: "07" },
    { day: "Sab", date: "08" },
  ];

  const morningTimes = ["09:00 Am", "09:30 Am", "10:00 Am", "10:30 Am"];
  const afternoonTimes = ["14:00 Pm", "14:30 Pm", "15:00 Pm", "15:30 Pm"];

  return (
    <div className="mobile-screen px-4 pt-8 pb-20">
      {/* Header */}
      <div className="flex items-center justify-between mb-6 animate-fade-in">
        <div>
          <p className="text-sm text-muted-foreground">Scegli Data e Ora</p>
          <h1 className="text-2xl font-bold">Appuntamenti</h1>
        </div>
        <Button variant="ghost" size="icon">
          <div className="flex flex-col space-y-1">
            <div className="w-1 h-1 bg-current rounded-full"></div>
            <div className="w-1 h-1 bg-current rounded-full"></div>
            <div className="w-1 h-1 bg-current rounded-full"></div>
          </div>
        </Button>
      </div>

      {/* Calendario */}
      <div className="mb-8 animate-slide-up">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Ottobre</h2>
          <div className="flex space-x-2">
            <Button variant="ghost" size="icon">
              <ChevronLeft className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-7 gap-2">
          {weekDays.map((day) => (
            <button
              key={day.date}
              onClick={() => setSelectedDate(day.date)}
              className={`flex flex-col items-center p-3 rounded-2xl transition-all duration-300 ${
                selectedDate === day.date
                  ? "bg-primary text-primary-foreground neon-glow scale-105"
                  : "hover:bg-secondary"
              }`}
            >
              <span className="text-xs mb-1">{day.day}</span>
              <span className="font-semibold">{day.date}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Orari Mattina */}
      <div className="mb-6 animate-slide-up" style={{ animationDelay: "0.1s" }}>
        <h3 className="font-semibold mb-3">Mattina</h3>
        <div className="grid grid-cols-4 gap-2">
          {morningTimes.map((time) => (
            <button
              key={time}
              onClick={() => setSelectedTime(time)}
              className={`py-2 px-3 rounded-xl text-sm font-medium transition-all duration-300 ${
                selectedTime === time
                  ? "bg-primary text-primary-foreground neon-glow"
                  : "bg-secondary hover:bg-secondary/80 text-secondary-foreground"
              }`}
            >
              {time}
            </button>
          ))}
        </div>
      </div>

      {/* Orari Pomeriggio */}
      <div className="mb-8 animate-slide-up" style={{ animationDelay: "0.2s" }}>
        <h3 className="font-semibold mb-3">Pomeriggio</h3>
        <div className="grid grid-cols-4 gap-2">
          {afternoonTimes.map((time) => (
            <button
              key={time}
              className="py-2 px-3 rounded-xl text-sm font-medium bg-secondary/50 text-muted-foreground cursor-not-allowed"
              disabled
            >
              {time}
            </button>
          ))}
        </div>
      </div>

      {/* Selezione Specialista */}
      <div className="mb-8 animate-slide-up" style={{ animationDelay: "0.3s" }}>
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold">Scegli Specialista</h3>
        </div>

        <div className="flex space-x-3 overflow-x-auto pb-2">
          {specialists.map((specialist) => (
            <button
              key={specialist.id}
              onClick={() =>
                specialist.available && setSelectedSpecialist(specialist.name)
              }
              className={`flex-shrink-0 flex flex-col items-center p-3 transition-all duration-300 ${
                !specialist.available ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              <div
                className={`relative w-16 h-16 rounded-full mb-2 ${
                  selectedSpecialist === specialist.name && specialist.available
                    ? "ring-2 ring-primary neon-glow"
                    : ""
                }`}
              >
                <img
                  src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${specialist.name}`}
                  alt={specialist.name}
                  className="w-full h-full rounded-full object-cover"
                />
                {specialist.available && (
                  <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-primary rounded-full border-2 border-background flex items-center justify-center">
                    <div className="w-2 h-2 bg-primary-foreground rounded-full"></div>
                  </div>
                )}
              </div>
              <span className="text-xs font-medium text-center">
                {specialist.name}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Riepilogo */}
      <Card
        className="glass-card p-4 mb-6 animate-slide-up"
        style={{ animationDelay: "0.4s" }}
      >
        <div className="flex items-center mb-3">
          <Clock className="w-5 h-5 text-primary mr-2" />
          <span className="font-semibold">02 Ott, Domenica</span>
          <span className="ml-auto font-semibold">{selectedTime}</span>
        </div>

        <p className="text-sm text-muted-foreground text-center mb-4">
          Conferma i Dettagli della Prenotazione e Preparati
          <br />
          per un'Esperienza Salone Perfetta.
        </p>

        <Button
          className="w-full h-12 bg-gradient-primary text-primary-foreground font-semibold neon-glow hover:scale-105 transition-all duration-300"
          onClick={() => {
            if (!selectedSpecialist) {
              toast({
                title: "Seleziona uno specialista",
                variant: "destructive",
              });
              return;
            }
            createMutation.mutate({
              specialist_id: selectedSpecialist,
              service_id: "service-demo",
              date_iso: "2025-10-02",
              time_label: selectedTime,
            });
          }}
        >
          <Clock className="w-4 h-4 mr-2" />
          Prenota Ora
        </Button>
      </Card>
    </div>
  );
};

export default Appointments;
