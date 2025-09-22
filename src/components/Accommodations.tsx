import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Users, Wifi, Coffee, AirVent, Car, Waves } from "lucide-react";
import roomImage from "@/assets/room-interior.jpg";
import terraceImage from "@/assets/terrace-view.jpg";

const Accommodations = () => {
  const rooms = [
    {
      id: 1,
      name: "Quarto Vista Mar",
      image: roomImage,
      capacity: "2 pessoas",
      price: "R$ 280",
      description: "Quarto amplo com vista direta para o mar, cama queen size e varanda privativa.",
      amenities: ["Vista para o mar", "Varanda privativa", "Ar condicionado", "Wi-Fi gratuito", "Café da manhã"],
      featured: true
    },
    {
      id: 2,
      name: "Quarto Jardim",
      image: terraceImage,
      capacity: "2 pessoas", 
      price: "R$ 220",
      description: "Quarto aconchegante com vista para o jardim tropical da pousada.",
      amenities: ["Vista jardim", "Cama queen size", "Ar condicionado", "Wi-Fi gratuito", "Café da manhã"],
      featured: false
    },
    {
      id: 3,
      name: "Suíte Família",
      image: roomImage,
      capacity: "4 pessoas",
      price: "R$ 420",
      description: "Suíte espaçosa perfeita para famílias, com área de estar e duas camas.",
      amenities: ["Área de estar", "2 camas queen", "Frigobar", "Ar condicionado", "Wi-Fi gratuito", "Café da manhã"],
      featured: false
    }
  ];

  const allAmenities = [
    { icon: Wifi, name: "Wi-Fi Gratuito" },
    { icon: Coffee, name: "Café da Manhã" },
    { icon: AirVent, name: "Ar Condicionado" },
    { icon: Car, name: "Estacionamento" },
    { icon: Waves, name: "Próximo à Praia" },
    { icon: Users, name: "Área Comum" }
  ];

  return (
    <section className="py-20 px-6 bg-secondary/30">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Nossos Quartos
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Acomodações pensadas para seu conforto e relaxamento, 
            cada uma com sua personalidade única
          </p>
        </div>

        {/* Rooms Grid */}
        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {rooms.map((room, index) => (
            <Card key={room.id} className="overflow-hidden hover:shadow-xl transition-all-smooth animate-fade-in" style={{animationDelay: `${index * 0.2}s`}}>
              {room.featured && (
                <div className="relative">
                  <Badge className="absolute top-4 left-4 z-10 bg-accent text-accent-foreground">
                    Mais Procurado
                  </Badge>
                </div>
              )}
              
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={room.image} 
                  alt={room.name}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
              
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-bold text-foreground">{room.name}</h3>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-primary">{room.price}</p>
                    <p className="text-sm text-muted-foreground">por noite</p>
                  </div>
                </div>
                
                <p className="text-muted-foreground mb-4 leading-relaxed">{room.description}</p>
                
                <div className="flex items-center gap-2 mb-4">
                  <Users className="w-4 h-4 text-primary" />
                  <span className="text-sm text-muted-foreground">{room.capacity}</span>
                </div>
                
                <div className="space-y-2 mb-6">
                  {room.amenities.map((amenity, amenityIndex) => (
                    <div key={amenityIndex} className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                      <span className="text-sm text-muted-foreground">{amenity}</span>
                    </div>
                  ))}
                </div>
                
                <Button className="w-full bg-primary hover:bg-primary-dark text-white">
                  Reservar Agora
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {/* All Amenities */}
        <div className="bg-white rounded-2xl p-8 md:p-12 shadow-lg">
          <h3 className="text-2xl md:text-3xl font-bold text-foreground text-center mb-12">
            Todas as Comodidades Incluídas
          </h3>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
            {allAmenities.map((amenity, index) => (
              <div key={index} className="text-center animate-fade-in" style={{animationDelay: `${index * 0.1}s`}}>
                <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
                  <amenity.icon className="w-8 h-8 text-primary" />
                </div>
                <p className="text-sm font-medium text-foreground">{amenity.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Accommodations;