import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-beach.jpg";
import LogoPousada from "@/assets/LogoPousada.svg";
import { supabase } from "@/integrations/supabase/client";

const Hero = () => {
  const [customHeroImages, setCustomHeroImages] = useState<string[]>([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    fetchHeroImages();
  }, []);

  useEffect(() => {
    if (customHeroImages.length > 1) {
      const interval = setInterval(() => {
        setCurrentImageIndex((prev) => (prev + 1) % customHeroImages.length);
      }, 5000); // Change image every 5 seconds

      return () => clearInterval(interval);
    }
  }, [customHeroImages]);

  const fetchHeroImages = async () => {
    try {
      const { data: files } = await supabase.storage
        .from("pousada-images")
        .list("hero", { limit: 10 });

      if (files && files.length > 0) {
        const imageUrls = files.map(file => {
          const { data } = supabase.storage
            .from("pousada-images")
            .getPublicUrl(`hero/${file.name}`);
          return data.publicUrl;
        });
        setCustomHeroImages(imageUrls);
      }
    } catch (error) {
      console.error("Error fetching hero images:", error);
    }
  };

  const currentImage = customHeroImages.length > 0 
    ? customHeroImages[currentImageIndex] 
    : heroImage;

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with transition */}
      <div className="absolute inset-0 z-0">
        <div className="relative w-full h-full">
          {customHeroImages.length > 0 ? (
            customHeroImages.map((image, index) => (
              <img 
                key={index}
                src={image} 
                alt={`Pousada Manicaca - Image ${index + 1}`}
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
                  index === currentImageIndex ? 'opacity-100' : 'opacity-0'
                }`}
              />
            ))
          ) : (
            <img 
              src={heroImage} 
              alt="Pousada Manicaca - Guarda do Embaú Beach" 
              className="w-full h-full object-cover"
            />
          )}
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/10 to-black/40"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center text-white px-6 max-w-4xl mx-auto">
        {/* Logo with fade animation */}
        <div className="mb-4 animate-fade-in">
          <img 
            src={LogoPousada} 
            alt="Pousada Manicaca Logo" 
            className="w-full max-w-xl mx-auto logo-hero"
          />
        </div>
        
        <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in [animation-delay:0.3s]">
          <span className="block text-6xl md:text-8xl bg-gradient-to-r from-accent-light to-accent bg-clip-text text-transparent">
            Bem vindos a 9° reserva mundial do surf!
          </span>
        </h1>
       
        
        
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in [animation-delay:0.9s]">
          <Button 
            size="lg" 
            className="bg-primary hover:bg-primary-dark text-white px-8 py-4 text-lg font-semibold transition-all-smooth"
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Fale Conosco
          </Button>
          <Button 
            size="lg" 
            variant="outline" 
            className="border-2 border-white bg-white/10 backdrop-blur-sm text-white px-8 py-4 text-lg font-semibold"
            onClick={() => document.getElementById('accommodations')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Ver Acomodações
          </Button>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 animate-float">
        <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;