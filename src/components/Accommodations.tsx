import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { UserGroupIcon } from "@heroicons/react/24/outline";
import { supabase } from "@/integrations/supabase/client";
import RoomGalleryModal from "./RoomGalleryModal";
import AmenityIcon from "./AmenityIcon";

interface Room {
  id: string;
  name: string;
  capacity: string;
  price_low_season: number;
  price_high_season: number;
  description: string;
  amenities: string[];
  featured: boolean;
  image_name: string | null;
}

interface Amenity {
  id: string;
  name: string;
  icon: string;
  type: 'suite' | 'common';
  display_order: number;
}

const Accommodations = () => {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [amenities, setAmenities] = useState<Amenity[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedRoom, setSelectedRoom] = useState<{ id: string; name: string; imageUrl: string } | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [roomsResponse, amenitiesResponse] = await Promise.all([
        supabase.from("room_types").select("*").order("display_order"),
        supabase.from("amenities").select("*").order("display_order")
      ]);

      if (roomsResponse.data) setRooms(roomsResponse.data);
      if (amenitiesResponse.data) setAmenities(amenitiesResponse.data as Amenity[]);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const getImageUrl = (imageName: string | null) => {
    if (!imageName) return "/placeholder.svg";
    
    const { data } = supabase.storage
      .from("pousada-images")
      .getPublicUrl(imageName);
    
    return data.publicUrl;
  };

  const suiteAmenities = amenities.filter(a => a.type === 'suite');
  const commonAmenities = amenities.filter(a => a.type === 'common');

  if (loading) {
    return (
      <section id="accommodations" className="py-20 px-6 bg-secondary/30">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-lg text-muted-foreground">Carregando acomodações...</p>
        </div>
      </section>
    );
  }


  return (
    <section id="accommodations" className="py-20 px-6 bg-secondary/30">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Seu refúgio na Guarda
          </h2>
        </div>

        {/* Important Notice */}
        <div className="bg-primary/5 border-l-4 border-primary p-6 rounded-lg mb-12">
          <p className="text-foreground font-semibold mb-2">⚠️ Informação Importante</p>
          <p className="text-muted-foreground">
            Todas as suítes estão localizadas no primeiro andar. É necessário subir um lance de escada para acessá-las.
          </p>
        </div>

        {/* Rooms Grid */}
        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {rooms.map((room, index) => (
            <Card key={room.id} className="overflow-hidden hover:shadow-xl transition-all-smooth animate-fade-in" style={{animationDelay: `${index * 0.2}s`}}>
              {room.featured && (
                <div className="relative">
                  <Badge className="absolute top-4 left-4 z-10 bg-accent text-accent-foreground">
                    Mais Espaçosa
                  </Badge>
                </div>
              )}
              
              <div 
                className="relative h-64 overflow-hidden cursor-pointer"
                onClick={() => setSelectedRoom({ 
                  id: room.id, 
                  name: room.name, 
                  imageUrl: getImageUrl(room.image_name) 
                })}
              >
                <img 
                  src={getImageUrl(room.image_name)}
                  alt={room.name}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
              
              <div className="p-6">
                <div className="mb-4">
                  <h3 className="text-xl font-bold text-foreground mb-2">{room.name}</h3>
                  <div className="flex items-center gap-2 text-muted-foreground text-sm">
                    <UserGroupIcon className="w-4 h-4 text-primary" />
                    <span>{room.capacity}</span>
                  </div>
                </div>
                
                <p className="text-muted-foreground mb-4 leading-relaxed">{room.description}</p>
                
                <div className="space-y-2 mb-6">
                  {room.amenities.map((amenity, amenityIndex) => (
                    <div key={amenityIndex} className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                      <span className="text-sm text-muted-foreground">{amenity}</span>
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-between gap-4 pt-4 border-t">
                  <div className="space-y-1">
                    <p className="text-xs text-muted-foreground">Valores a partir de</p>
                    <p className="text-2xl font-bold text-primary">
                      R$ {room.price_low_season}
                      <span className="text-sm font-normal text-muted-foreground">/noite</span>
                    </p>
                  </div>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-2"
                    onClick={() => setSelectedRoom({ 
                      id: room.id, 
                      name: room.name, 
                      imageUrl: getImageUrl(room.image_name) 
                    })}
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    Ver Fotos
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Suite Amenities */}
        <div className="bg-white rounded-2xl p-8 md:p-12 shadow-lg mb-8">
          <h3 className="text-2xl md:text-3xl font-bold text-foreground text-center mb-12">
            Comodidades das Suítes
          </h3>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
            {suiteAmenities.map((amenity, index) => (
              <div key={amenity.id} className="text-center animate-fade-in" style={{animationDelay: `${index * 0.1}s`}}>
                <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
                  <AmenityIcon iconName={amenity.icon} className="w-8 h-8 text-primary" />
                </div>
                <p className="text-sm font-medium text-foreground">{amenity.name}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Common Amenities */}
        {commonAmenities.length > 0 && (
          <div className="bg-white rounded-2xl p-8 md:p-12 shadow-lg mb-8">
            <h3 className="text-2xl md:text-3xl font-bold text-foreground text-center mb-12">
              Comodidades Comuns da Pousada
            </h3>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
              {commonAmenities.map((amenity, index) => (
                <div key={amenity.id} className="text-center animate-fade-in" style={{animationDelay: `${index * 0.1}s`}}>
                  <div className="w-16 h-16 mx-auto mb-4 bg-accent/10 rounded-full flex items-center justify-center">
                    <AmenityIcon iconName={amenity.icon} className="w-8 h-8 text-accent" />
                  </div>
                  <p className="text-sm font-medium text-foreground">{amenity.name}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Additional Information */}
        <div className="bg-white rounded-2xl p-8 md:p-12 shadow-lg">
          <h4 className="text-lg font-semibold text-foreground mb-4 text-center">Informações Adicionais</h4>
          <div className="grid md:grid-cols-2 gap-4 max-w-3xl mx-auto mb-6">
            <div className="flex items-start gap-3 p-4 bg-secondary/20 rounded-lg">
              <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
              <p className="text-sm text-muted-foreground">Varandas individuais com rede, mesinha e cadeiras</p>
            </div>
            <div className="flex items-start gap-3 p-4 bg-secondary/20 rounded-lg">
              <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
              <p className="text-sm text-muted-foreground">Roupa de cama e toalha de banho (troca a cada 5 diárias)</p>
            </div>
          </div>
          
          <h4 className="text-lg font-semibold text-foreground mb-4 text-center">Observações</h4>
          <div className="grid md:grid-cols-3 gap-4 max-w-4xl mx-auto">
            <div className="flex items-start gap-3 p-4 bg-amber-50 rounded-lg border border-amber-200">
              <div className="w-2 h-2 bg-amber-500 rounded-full mt-2 flex-shrink-0"></div>
              <p className="text-sm text-amber-900">Não temos serviço de camareira diária</p>
            </div>
            <div className="flex items-start gap-3 p-4 bg-amber-50 rounded-lg border border-amber-200">
              <div className="w-2 h-2 bg-amber-500 rounded-full mt-2 flex-shrink-0"></div>
              <p className="text-sm text-amber-900">Não fornecemos café da manhã pronto</p>
            </div>
            <div className="flex items-start gap-3 p-4 bg-amber-50 rounded-lg border border-amber-200">
              <div className="w-2 h-2 bg-amber-500 rounded-full mt-2 flex-shrink-0"></div>
              <p className="text-sm text-amber-900">Não aceitamos pets</p>
            </div>
          </div>
        </div>
      </div>

      <RoomGalleryModal
        roomId={selectedRoom?.id || null}
        roomName={selectedRoom?.name || ""}
        mainImageUrl={selectedRoom?.imageUrl || ""}
        open={!!selectedRoom}
        onClose={() => setSelectedRoom(null)}
      />
    </section>
  );
};

export default Accommodations;