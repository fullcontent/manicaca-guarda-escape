import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Users, Wifi, AirVent, Car, Waves, Tv, Utensils, Snowflake, Sun } from "lucide-react";
import { useContentData } from "@/hooks/useContentData";

const Accommodations = () => {
  const { data, getImageUrl } = useContentData();

  const allAmenities = [
    { icon: Waves, name: "Piscina com Quiosque" },
    { icon: Utensils, name: "Churrasqueira" },
    { icon: Car, name: "Estacionamento" },
    { icon: AirVent, name: "Ar Condicionado" },
    { icon: Tv, name: "TV a Cabo" },
    { icon: Wifi, name: "Internet" },
    { icon: Utensils, name: "Área de Café da Manhã" },
    { icon: Snowflake, name: "Frigobar nas Suítes" },
    { icon: Sun, name: "Sacada Individual" }
  ];

  const additionalInfo = [
    "Roupa de cama e toalha de banho (troca a cada 5 diárias)",
    "Não temos serviço de camareira diária",
    "Não fornecemos café da manhã",
    "Não aceitamos pets"
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
          {data.rooms.map((room, index) => (
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
                  src={getImageUrl(room.images[0])}
                  alt={room.name}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
              
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-bold text-foreground">{room.name}</h3>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-primary">R$ {room.price}</p>
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
        <div className="bg-white rounded-2xl p-8 md:p-12 shadow-lg mb-8">
          <h3 className="text-2xl md:text-3xl font-bold text-foreground text-center mb-12">
            Comodidades da Pousada
          </h3>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 mb-12">
            {allAmenities.map((amenity, index) => (
              <div key={index} className="text-center animate-fade-in" style={{animationDelay: `${index * 0.1}s`}}>
                <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
                  <amenity.icon className="w-8 h-8 text-primary" />
                </div>
                <p className="text-sm font-medium text-foreground">{amenity.name}</p>
              </div>
            ))}
          </div>

          {/* Additional Information */}
          <div className="border-t pt-8">
            <h4 className="text-lg font-semibold text-foreground mb-4 text-center">Informações Importantes</h4>
            <div className="grid md:grid-cols-2 gap-4 max-w-3xl mx-auto">
              {additionalInfo.map((info, index) => (
                <div key={index} className="flex items-start gap-3 p-4 bg-secondary/20 rounded-lg">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-sm text-muted-foreground">{info}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Accommodations;