import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-beach.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src={heroImage} 
          alt="Pousada Manicaca - Guarda do Embaú Beach" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/10 to-black/40"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center text-white px-6 max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in">
          <span className="block text-6xl md:text-8xl bg-gradient-to-r from-accent-light to-accent bg-clip-text text-transparent">
            Guarda do Embaú:
          </span>
          Natureza e Refúgio
        </h1>
        
        <p className="text-xl md:text-2xl mb-8 opacity-90 animate-fade-in [animation-delay:0.3s]">
          Escape da rotina. Estacione o carro. Viva a aventura a pé.
        </p>
        
        <p className="text-lg md:text-xl mb-12 max-w-2xl mx-auto opacity-80 animate-fade-in [animation-delay:0.6s]">
          Sua base estratégica no coração da Guarda do Embaú, a poucos passos da praia, do rio e das trilhas
        </p>

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
            className="border-white text-white hover:bg-white hover:text-primary px-8 py-4 text-lg font-semibold transition-all-smooth"
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