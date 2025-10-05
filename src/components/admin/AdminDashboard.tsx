import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LogOut, Bed, Images, Edit, Star, DollarSign, Plus } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import logoManicaca from "@/assets/logo-manicaca.png";

interface AdminDashboardProps {
  onSignOut: () => Promise<void>;
}

const AdminDashboard = ({ onSignOut }: AdminDashboardProps) => {
  const { toast } = useToast();
  const [rooms, setRooms] = useState<any[]>([]);
  const [amenities, setAmenities] = useState<any[]>([]);
  const [selectedRoom, setSelectedRoom] = useState<any>(null);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [roomsRes, amenitiesRes] = await Promise.all([
        supabase.from("room_types").select("*").order("display_order"),
        supabase.from("amenities").select("*").order("display_order"),
      ]);

      if (roomsRes.error) throw roomsRes.error;
      if (amenitiesRes.error) throw amenitiesRes.error;

      setRooms(roomsRes.data || []);
      setAmenities(amenitiesRes.data || []);
    } catch (error: any) {
      toast({
        title: "Erro ao carregar dados",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const stats = {
    totalRooms: rooms.length,
    featuredRooms: rooms.filter(room => room.featured).length,
    avgPriceLow: rooms.length > 0 ? Math.round(rooms.reduce((sum, room) => sum + room.price_low_season, 0) / rooms.length) : 0,
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-sand">
        <p className="text-lg">Carregando dados...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-secondary/30">
      {/* Header */}
      <div className="bg-white border-b border-border p-4">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-4">
            <img 
              src={logoManicaca} 
              alt="Pousada Manicaca" 
              className="h-12"
            />
            <div>
              <h1 className="text-xl font-bold text-foreground">
                Painel Administrativo
              </h1>
              <p className="text-sm text-muted-foreground">
                Pousada Manicaca - Gerenciamento de Conteúdo
              </p>
            </div>
          </div>
          
          <Button 
            variant="outline" 
            onClick={onSignOut}
            className="flex items-center gap-2"
          >
            <LogOut className="w-4 h-4" />
            Sair
          </Button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-primary/10 rounded-full">
                <Bed className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total de Quartos</p>
                <p className="text-2xl font-bold text-foreground">{stats.totalRooms}</p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-accent/10 rounded-full">
                <Star className="w-6 h-6 text-accent" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Quartos Destaque</p>
                <p className="text-2xl font-bold text-foreground">{stats.featuredRooms}</p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-primary/10 rounded-full">
                <DollarSign className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Preço Médio (Baixa)</p>
                <p className="text-2xl font-bold text-foreground">R$ {stats.avgPriceLow}</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="rooms" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="rooms" className="flex items-center gap-2">
              <Bed className="w-4 h-4" />
              Suítes
            </TabsTrigger>
            <TabsTrigger value="amenities" className="flex items-center gap-2">
              <Star className="w-4 h-4" />
              Comodidades
            </TabsTrigger>
            <TabsTrigger value="pricing" className="flex items-center gap-2">
              <DollarSign className="w-4 h-4" />
              Preços
            </TabsTrigger>
          </TabsList>

          <TabsContent value="rooms" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-foreground">
                Suítes da Pousada
              </h2>
              <Button className="flex items-center gap-2">
                <Plus className="w-4 h-4" />
                Nova Suíte
              </Button>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {rooms.map((room) => (
                <Card key={room.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  {room.featured && (
                    <Badge className="absolute top-4 left-4 z-10 bg-accent text-accent-foreground">
                      Mais Espaçosa
                    </Badge>
                  )}
                  
                  <div className="p-6">
                    <div className="mb-4">
                      <h3 className="text-lg font-semibold text-foreground mb-2">
                        {room.name}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-2">{room.capacity}</p>
                      <div className="flex gap-4 text-sm">
                        <div>
                          <span className="text-muted-foreground">Baixa: </span>
                          <span className="font-bold text-primary">R$ {room.price_low_season}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Alta: </span>
                          <span className="font-bold text-accent">R$ {room.price_high_season}</span>
                        </div>
                      </div>
                    </div>
                    
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                      {room.description}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">
                        {room.amenities.length} comodidades
                      </span>
                      <Button 
                        size="sm"
                        onClick={() => setSelectedRoom(room)}
                        className="flex items-center gap-2"
                      >
                        <Edit className="w-3 h-3" />
                        Editar
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="amenities" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-foreground">
                Comodidades da Pousada
              </h2>
              <Button className="flex items-center gap-2">
                <Plus className="w-4 h-4" />
                Nova Comodidade
              </Button>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {amenities.map((amenity) => (
                <Card key={amenity.id} className="p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                      <span className="text-xl">{amenity.icon}</span>
                    </div>
                    <span className="font-medium text-foreground">{amenity.name}</span>
                  </div>
                  <Button size="sm" variant="outline">
                    <Edit className="w-3 h-3" />
                  </Button>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="pricing">
            <Card className="p-6">
              <h2 className="text-2xl font-bold text-foreground mb-6">
                Tabela de Preços
              </h2>
              <p className="text-muted-foreground">
                Edite os preços diretamente nas suítes ou use esta seção para ajustes em massa.
              </p>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Room Editor Modal - TODO: Implement */}
      {selectedRoom && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="max-w-2xl w-full p-6">
            <h3 className="text-xl font-bold mb-4">Editar: {selectedRoom.name}</h3>
            <p className="text-muted-foreground mb-4">Editor em desenvolvimento...</p>
            <Button onClick={() => setSelectedRoom(null)}>Fechar</Button>
          </Card>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;