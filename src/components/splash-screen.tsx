import { useEffect, useState } from "react";
import logo from "@/assets/logo.png";

interface SplashScreenProps {
  onComplete: () => void;
}

const SplashScreen = ({ onComplete }: SplashScreenProps) => {
  const [isAnimating, setIsAnimating] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAnimating(false);
      setTimeout(onComplete, 500);
    }, 3000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className={`mobile-screen bg-gradient-bg items-center justify-center transition-opacity duration-500 ${
      isAnimating ? 'opacity-100' : 'opacity-0'
    }`}>
      <div className="flex flex-col items-center animate-fade-in">
        <div className="mb-8 animate-logo-spin">
          <img 
            src={logo} 
            alt="Style Hub Logo" 
            className="w-32 h-32 rounded-full neon-glow"
          />
        </div>
        
        <h1 className="text-4xl font-bold text-foreground mb-2 animate-slide-up">
          Style Hub
        </h1>
        
        <p className="text-muted-foreground text-center px-8 animate-slide-up" style={{animationDelay: "0.2s"}}>
          Il tuo barbiere di fiducia
        </p>
        
        <div className="mt-16 animate-glow-pulse" style={{animationDelay: "1s"}}>
          <div className="w-2 h-2 bg-primary rounded-full"></div>
        </div>
      </div>
    </div>
  );
};

export default SplashScreen;