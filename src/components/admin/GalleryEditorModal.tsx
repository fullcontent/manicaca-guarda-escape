import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Upload, X, Loader2 } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface GalleryImage {
  id: string;
  image_url: string;
  category: "pousada" | "praia";
  display_order: number;
}

interface GalleryEditorModalProps {
  open: boolean;
  onClose: () => void;
}

const GalleryEditorModal = ({ open, onClose }: GalleryEditorModalProps) => {
  const { toast } = useToast();
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (open) {
      fetchImages();
    }
  }, [open]);

  const fetchImages = async () => {
    try {
      const { data, error } = await supabase
        .from("gallery_images")
        .select("*")
        .order("display_order");

      if (error) throw error;
      setImages((data || []) as GalleryImage[]);
    } catch (error: any) {
      toast({
        title: "Erro ao carregar imagens",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, category: "pousada" | "praia") => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);
    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        
        // Validate MIME type
        if (!file.type.startsWith("image/")) {
          toast({
            title: "Erro",
            description: `${file.name} não é uma imagem válida`,
            variant: "destructive",
          });
          continue;
        }

        // Validate file extension
        const allowedExtensions = ['.jpg', '.jpeg', '.png', '.webp'];
        const extension = file.name.substring(file.name.lastIndexOf('.')).toLowerCase();
        if (!allowedExtensions.includes(extension)) {
          toast({
            title: "Erro",
            description: `${file.name} tem formato não permitido. Use: JPG, PNG ou WEBP`,
            variant: "destructive",
          });
          continue;
        }

        const fileExt = file.name.split(".").pop();
        const fileName = `${category}/${Math.random().toString(36).substring(2)}.${fileExt}`;

        const { error: uploadError } = await supabase.storage
          .from("pousada-images")
          .upload(fileName, file);

        if (uploadError) throw uploadError;

        const { data: { publicUrl } } = supabase.storage
          .from("pousada-images")
          .getPublicUrl(fileName);

        const { error: dbError } = await supabase
          .from("gallery_images")
          .insert([{
            image_url: fileName,
            category,
            display_order: images.filter(img => img.category === category).length,
          }]);

        if (dbError) throw dbError;
      }

      toast({
        title: "Sucesso",
        description: "Imagens enviadas com sucesso",
      });

      fetchImages();
    } catch (error: any) {
      if (import.meta.env.DEV) {
        console.error("Error uploading images:", error);
      }
      toast({
        title: "Erro ao enviar imagens",
        description: "Ocorreu um erro ao processar as imagens",
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  };

  const handleDeleteImage = async (image: GalleryImage) => {
    if (!confirm("Tem certeza que deseja deletar esta imagem?")) return;

    try {
      const { error: storageError } = await supabase.storage
        .from("pousada-images")
        .remove([image.image_url]);

      if (storageError) throw storageError;

      const { error: dbError } = await supabase
        .from("gallery_images")
        .delete()
        .eq("id", image.id);

      if (dbError) throw dbError;

      toast({
        title: "Sucesso",
        description: "Imagem deletada",
      });

      fetchImages();
    } catch (error: any) {
      if (import.meta.env.DEV) {
        console.error("Error deleting image:", error);
      }
      toast({
        title: "Erro ao deletar",
        description: "Ocorreu um erro ao deletar a imagem",
        variant: "destructive",
      });
    }
  };

  const renderImageGrid = (category: "pousada" | "praia") => {
    const categoryImages = images.filter(img => img.category === category);

    return (
      <div className="space-y-4">
        <div>
          <Button
            type="button"
            variant="outline"
            className="w-full"
            disabled={uploading}
            onClick={() => document.getElementById(`gallery-upload-${category}`)?.click()}
          >
            {uploading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Enviando...
              </>
            ) : (
              <>
                <Upload className="w-4 h-4 mr-2" />
                Adicionar Imagens
              </>
            )}
          </Button>
          <input
            id={`gallery-upload-${category}`}
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={(e) => handleImageUpload(e, category)}
          />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {categoryImages.map((image) => (
            <div key={image.id} className="relative group">
              <div className="aspect-video rounded overflow-hidden border">
                <img
                  src={supabase.storage.from("pousada-images").getPublicUrl(image.image_url).data.publicUrl}
                  alt="Gallery"
                  className="w-full h-full object-cover"
                />
              </div>
              <Button
                size="sm"
                variant="destructive"
                className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={() => handleDeleteImage(image)}
              >
                <X className="w-3 h-3" />
              </Button>
            </div>
          ))}
          {categoryImages.length === 0 && (
            <div className="col-span-full text-center text-muted-foreground py-8">
              Nenhuma imagem adicionada ainda
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Galeria de Fotos</DialogTitle>
        </DialogHeader>

        {loading ? (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="w-8 h-8 animate-spin" />
          </div>
        ) : (
          <Tabs defaultValue="pousada" className="space-y-4">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="pousada">Fotos da Pousada</TabsTrigger>
              <TabsTrigger value="praia">Fotos da Praia</TabsTrigger>
            </TabsList>

            <TabsContent value="pousada">
              {renderImageGrid("pousada")}
            </TabsContent>

            <TabsContent value="praia">
              {renderImageGrid("praia")}
            </TabsContent>
          </Tabs>
        )}

        <div className="flex justify-end pt-4">
          <Button variant="outline" onClick={onClose}>
            Fechar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default GalleryEditorModal;
