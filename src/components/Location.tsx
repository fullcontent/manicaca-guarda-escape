import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Clock, Car, Waves } from "lucide-react";

const Location = () => {
  const attractions = [
    {
      name: "Praia da Guarda",
      distance: "Poucos passos",
      description: "Acesso direto à praia principal para surf e banho de mar"
    },
    {
      name: "Rio da Madre",
      distance: "Caminhada curta",
      description: "Rio cristalino perfeito para stand up paddle e relaxamento"
    },
    {
      name: "Centrinho",
      distance: "Poucos minutos",
      description: "Restaurantes com culinária local, lojinhas e comércio"
    },
    {
      name: "Pedra do Urubu",
      distance: "Caminhada",
      description: "Vista cinematográfica de tirar o fôlego"
    },
    {
      name: "Vale da Utopia",
      distance: "Caminhada",
      description: "Trilhas em meio à natureza exuberante"
    }
  ];

  return (
    <section className="py-20 px-6 bg-background">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Estacione a Rotina. Viva a Guarda a Pé.
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Localização estratégica em rua tranquila, a poucos passos da praia, do rio e das principais aventuras da região
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* Map Placeholder */}
          <div className="relative">
            <div className="aspect-square bg-gradient-ocean rounded-2xl shadow-lg overflow-hidden">
              <div className="w-full h-full bg-primary/10 flex items-center justify-center">
                <div className="text-center text-primary">
                  <MapPin className="w-16 h-16 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold">Pousada Manicaca</h3>
                  <p className="text-sm opacity-80">Guarda do Embaú, SC</p>
                </div>
              </div>
            </div>
            <Button 
              asChild
              className="absolute bottom-4 right-4 bg-white text-primary hover:bg-secondary"
            >
              <a 
                href="https://www.google.com/maps/place/Pousada+Manicaca/@-27.9055,-48.5970513,17z/data=!4m9!3m8!1s0x9526d7d20f7d3dbf:0x1ccc08415a2a330d!5m2!4m1!1i2!8m2!3d-27.9055!4d-48.594471!16s%2Fg%2F1yfh_jqkt?entry=ttu&g_ep=EgoyMDI1MDkyNC4wIKXMDSoASAFQAw%3D%3D"
                target="_blank"
                rel="noopener noreferrer"
              >
                Ver no Google Maps
              </a>
            </Button>
          </div>

          {/* Attractions List */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-foreground mb-8">
              Aventuras Acessíveis a Pé
            </h3>
            {attractions.map((attraction, index) => (
              <Card key={index} className="p-6 hover:shadow-md transition-all-smooth animate-slide-in" style={{animationDelay: `${index * 0.1}s`}}>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Waves className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h4 className="font-semibold text-foreground">{attraction.name}</h4>
                      <span className="text-sm text-accent font-medium">{attraction.distance}</span>
                    </div>
                    <p className="text-muted-foreground text-sm">{attraction.description}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Transportation Info */}
        <div className="grid md:grid-cols-3 gap-6">
          <Card className="p-6 text-center">
            <Car className="w-12 h-12 mx-auto mb-4 text-primary" />
            <h4 className="font-semibold text-foreground mb-2">De Carro</h4>
            <p className="text-muted-foreground text-sm">1h30 de Florianópolis</p>
            <p className="text-muted-foreground text-sm">2h30 de Curitiba</p>
          </Card>
          
          <Card className="p-6 text-center">
            <Clock className="w-12 h-12 mx-auto mb-4 text-accent" />
            <h4 className="font-semibold text-foreground mb-2">Check-in / Check-out</h4>
            <p className="text-muted-foreground text-sm">Check-in: 14h</p>
            <p className="text-muted-foreground text-sm">Check-out: Meio-dia</p>
          </Card>
          
          <Card className="p-6 text-center">
            <MapPin className="w-12 h-12 mx-auto mb-4 text-earth" />
            <h4 className="font-semibold text-foreground mb-2">Endereço</h4>
            <p className="text-muted-foreground text-sm">R. Trinta e Dois, S/N</p>
            <p className="text-muted-foreground text-sm">Enseada de Brito, Palhoça - SC</p>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Location;