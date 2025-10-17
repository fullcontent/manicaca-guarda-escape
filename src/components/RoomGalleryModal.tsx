import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface RoomImage {
  id: string;
  image_url: string;
  description: string | null;
  display_order: number;
}

interface RoomGalleryModalProps {
  roomId: string | null;
  roomName: string;
  mainImageUrl: string;
  open: boolean;
  onClose: () => void;
}

const RoomGalleryModal = ({ roomId, roomName, mainImageUrl, open, onClose }: RoomGalleryModalProps) => {
  const [images, setImages] = useState<RoomImage[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (open && roomId) {
      fetchImages();
    }
  }, [open, roomId]);

  const fetchImages = async () => {
    if (!roomId) return;
    
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("room_images")
        .select("*")
        .eq("room_id", roomId)
        .order("display_order");

      if (error) throw error;
      setImages(data || []);
    } catch (error) {
      console.error("Error fetching room images:", error);
    } finally {
      setLoading(false);
    }
  };

  const getImageUrl = (imageUrl: string) => {
    const { data } = supabase.storage
      .from("pousada-images")
      .getPublicUrl(imageUrl);
    return data.publicUrl;
  };

  const allImages = [
    { url: mainImageUrl, description: "Foto principal" },
    ...images.map(img => ({ url: getImageUrl(img.image_url), description: img.description }))
  ];

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % allImages.length);
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + allImages.length) % allImages.length);
  };

  if (!open) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl p-0">
        <DialogHeader className="p-6 pb-0">
          <DialogTitle>{roomName} - Galeria de Fotos</DialogTitle>
        </DialogHeader>
        
        {loading ? (
          <div className="p-12 text-center text-muted-foreground">
            Carregando fotos...
          </div>
        ) : allImages.length === 0 ? (
          <div className="p-12 text-center text-muted-foreground">
            Nenhuma foto adicional disponível
          </div>
        ) : (
          <div className="relative">
            <div className="relative aspect-[4/3] bg-black">
              <img 
                src={allImages[currentIndex].url}
                alt={allImages[currentIndex].description || roomName}
                className="w-full h-full object-contain"
              />
              
              {allImages.length > 1 && (
                <>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white"
                    onClick={prevImage}
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </Button>
                  
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white"
                    onClick={nextImage}
                  >
                    <ChevronRight className="w-6 h-6" />
                  </Button>
                </>
              )}
            </div>
            
            {allImages[currentIndex].description && (
              <div className="p-4 bg-secondary/50">
                <p className="text-sm text-foreground text-center">
                  {allImages[currentIndex].description}
                </p>
              </div>
            )}
            
            <div className="p-4 flex justify-center gap-2">
              {allImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === currentIndex ? 'bg-primary w-8' : 'bg-muted-foreground/30'
                  }`}
                />
              ))}
            </div>
            
            <div className="px-6 pb-6 text-center text-sm text-muted-foreground">
              {currentIndex + 1} / {allImages.length}
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default RoomGalleryModal;