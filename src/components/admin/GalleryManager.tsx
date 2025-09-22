import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Upload, Trash2, Plus } from "lucide-react";
import { useContentData } from "@/hooks/useContentData";

const GalleryManager = () => {
  const { data, addImageToGallery, removeImageFromGallery, uploadImage, getImageUrl } = useContentData();
  const [isUploading, setIsUploading] = useState(false);
  const [newImageData, setNewImageData] = useState({
    alt: "",
    category: ""
  });

  const categories = [
    "Localização",
    "Quartos", 
    "Áreas Comuns",
    "Natureza",
    "Gastronomia",
    "Conforto"
  ];

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !newImageData.alt || !newImageData.category) {
      alert("Preencha a descrição e categoria antes de fazer o upload");
      return;
    }

    setIsUploading(true);
    try {
      const imageName = await uploadImage(file);
      
      addImageToGallery({
        src: imageName,
        alt: newImageData.alt,
        category: newImageData.category
      });

      setNewImageData({ alt: "", category: "" });
      
      // Reset file input
      e.target.value = "";
    } catch (error) {
      console.error("Erro ao fazer upload:", error);
    } finally {
      setIsUploading(false);
    }
  };

  const groupedImages = data.gallery.reduce((acc, image) => {
    if (!acc[image.category]) {
      acc[image.category] = [];
    }
    acc[image.category].push(image);
    return acc;
  }, {} as Record<string, typeof data.gallery>);

  return (
    <div className="space-y-8">
      {/* Upload de Nova Imagem */}
      <Card className="p-6">
        <h3 className="text-xl font-semibold text-foreground mb-6">
          Adicionar Nova Imagem à Galeria
        </h3>
        
        <div className="grid md:grid-cols-3 gap-4 mb-6">
          <div>
            <Label>Descrição da Imagem</Label>
            <Input
              placeholder="Ex: Vista do terraço ao entardecer"
              value={newImageData.alt}
              onChange={(e) => setNewImageData(prev => ({
                ...prev,
                alt: e.target.value
              }))}
            />
          </div>
          
          <div>
            <Label>Categoria</Label>
            <Select 
              value={newImageData.category} 
              onValueChange={(value) => setNewImageData(prev => ({
                ...prev,
                category: value
              }))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecione a categoria" />
              </SelectTrigger>
              <SelectContent>
                {categories.map(category => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label>Upload da Imagem</Label>
            <div className="border-2 border-dashed border-border rounded-lg p-4 text-center">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
                id="gallery-upload"
                disabled={isUploading}
              />
              <label htmlFor="gallery-upload" className="cursor-pointer block">
                <Upload className="w-6 h-6 mx-auto mb-2 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">
                  {isUploading ? "Carregando..." : "Selecionar arquivo"}
                </p>
              </label>
            </div>
          </div>
        </div>
      </Card>

      {/* Galeria Atual por Categoria */}
      <div className="space-y-6">
        <h3 className="text-xl font-semibold text-foreground">
          Imagens da Galeria ({data.gallery.length} total)
        </h3>
        
        {Object.entries(groupedImages).map(([category, images]) => (
          <Card key={category} className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h4 className="text-lg font-medium text-foreground">
                {category} ({images.length} imagens)
              </h4>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {images.map((image) => (
                <div key={image.id} className="relative group">
                  <img
                    src={getImageUrl(image.src)}
                    alt={image.alt}
                    className="w-full h-24 object-cover rounded-lg"
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => removeImageFromGallery(image.id)}
                    >
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1 truncate">
                    {image.alt}
                  </p>
                </div>
              ))}
            </div>
          </Card>
        ))}
        
        {data.gallery.length === 0 && (
          <Card className="p-12 text-center">
            <p className="text-muted-foreground">
              Nenhuma imagem na galeria ainda. Adicione a primeira imagem acima.
            </p>
          </Card>
        )}
      </div>
    </div>
  );
};

export default GalleryManager;