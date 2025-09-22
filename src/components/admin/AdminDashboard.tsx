import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LogOut, Bed, Images, Edit, Star, Users, DollarSign } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useContentData } from "@/hooks/useContentData";
import RoomEditor from "./RoomEditor";
import GalleryManager from "./GalleryManager";
import logoManicaca from "@/assets/logo-manicaca.png";

const AdminDashboard = () => {
  const { logout } = useAuth();
  const { data, getImageUrl } = useContentData();
  const [selectedRoom, setSelectedRoom] = useState(null);

  const stats = {
    totalRooms: data.rooms.length,
    featuredRooms: data.rooms.filter(room => room.featured).length,
    galleryImages: data.gallery.length,
    avgPrice: Math.round(data.rooms.reduce((sum, room) => sum + parseFloat(room.price), 0) / data.rooms.length)
  };

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
            onClick={logout}
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
              <div className="p-3 bg-earth/20 rounded-full">
                <Images className="w-6 h-6 text-earth-dark" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Imagens Galeria</p>
                <p className="text-2xl font-bold text-foreground">{stats.galleryImages}</p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-primary/10 rounded-full">
                <DollarSign className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Preço Médio</p>
                <p className="text-2xl font-bold text-foreground">R$ {stats.avgPrice}</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="rooms" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="rooms" className="flex items-center gap-2">
              <Bed className="w-4 h-4" />
              Gerenciar Quartos
            </TabsTrigger>
            <TabsTrigger value="gallery" className="flex items-center gap-2">
              <Images className="w-4 h-4" />
              Galeria de Fotos
            </TabsTrigger>
          </TabsList>

          <TabsContent value="rooms" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-foreground">
                Quartos da Pousada
              </h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {data.rooms.map((room) => (
                <Card key={room.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  {room.featured && (
                    <Badge className="absolute top-4 left-4 z-10 bg-accent text-accent-foreground">
                      Destaque
                    </Badge>
                  )}
                  
                  <div className="relative h-48">
                    <img 
                      src={getImageUrl(room.images[0])}
                      alt={room.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-lg font-semibold text-foreground">
                        {room.name}
                      </h3>
                      <div className="text-right">
                        <p className="text-xl font-bold text-primary">
                          R$ {room.price}
                        </p>
                        <p className="text-xs text-muted-foreground">por noite</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2 mb-4">
                      <Users className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">
                        {room.capacity}
                      </span>
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

          <TabsContent value="gallery">
            <GalleryManager />
          </TabsContent>
        </Tabs>
      </div>

      {/* Room Editor Modal */}
      {selectedRoom && (
        <RoomEditor
          room={selectedRoom}
          onClose={() => setSelectedRoom(null)}
        />
      )}
    </div>
  );
};

export default AdminDashboard;