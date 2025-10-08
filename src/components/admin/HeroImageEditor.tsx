import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Upload, Trash2 } from "lucide-react";

const HeroImageEditor = () => {
  const [heroImage, setHeroImage] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchHeroImage();
  }, []);

  const fetchHeroImage = async () => {
    try {
      const { data: files } = await supabase.storage
        .from("pousada-images")
        .list("hero", { limit: 1 });

      if (files && files.length > 0) {
        const { data } = supabase.storage
          .from("pousada-images")
          .getPublicUrl(`hero/${files[0].name}`);
        setHeroImage(data.publicUrl);
      }
    } catch (error) {
      if (import.meta.env.DEV) {
        console.error("Error fetching hero image:", error);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate MIME type
    if (!file.type.startsWith("image/")) {
      toast.error("Por favor, selecione um arquivo de imagem válido");
      return;
    }

    // Validate file extension
    const allowedExtensions = ['.jpg', '.jpeg', '.png', '.webp'];
    const extension = file.name.substring(file.name.lastIndexOf('.')).toLowerCase();
    if (!allowedExtensions.includes(extension)) {
      toast.error("Formato não permitido. Use: JPG, PNG ou WEBP");
      return;
    }

    setUploading(true);

    try {
      // Delete existing hero image if exists
      const { data: existingFiles } = await supabase.storage
        .from("pousada-images")
        .list("hero");

      if (existingFiles && existingFiles.length > 0) {
        await supabase.storage
          .from("pousada-images")
          .remove([`hero/${existingFiles[0].name}`]);
      }

      // Upload new image
      const fileName = `hero-${Date.now()}.${file.name.split('.').pop()}`;
      const { error: uploadError } = await supabase.storage
        .from("pousada-images")
        .upload(`hero/${fileName}`, file);

      if (uploadError) throw uploadError;

      toast.success("Imagem hero atualizada com sucesso!");
      fetchHeroImage();
    } catch (error) {
      if (import.meta.env.DEV) {
        console.error("Error uploading hero image:", error);
      }
      toast.error("Erro ao fazer upload da imagem");
    } finally {
      setUploading(false);
    }
  };

  const handleDeleteImage = async () => {
    if (!confirm("Tem certeza que deseja remover a imagem hero?")) return;

    try {
      const { data: files } = await supabase.storage
        .from("pousada-images")
        .list("hero");

      if (files && files.length > 0) {
        await supabase.storage
          .from("pousada-images")
          .remove([`hero/${files[0].name}`]);

        setHeroImage(null);
        toast.success("Imagem hero removida com sucesso!");
      }
    } catch (error) {
      if (import.meta.env.DEV) {
        console.error("Error deleting hero image:", error);
      }
      toast.error("Erro ao remover imagem");
    }
  };

  if (loading) {
    return <div>Carregando...</div>;
  }

  return (
    <Card className="p-6">
      <h3 className="text-xl font-semibold mb-4">Imagem Hero da Página Inicial</h3>
      
      {heroImage ? (
        <div className="space-y-4">
          <div className="relative w-full h-64 rounded-lg overflow-hidden">
            <img 
              src={heroImage} 
              alt="Hero" 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => document.getElementById("hero-upload")?.click()}
              disabled={uploading}
            >
              <Upload className="w-4 h-4 mr-2" />
              Substituir Imagem
            </Button>
            <Button
              variant="destructive"
              onClick={handleDeleteImage}
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Remover
            </Button>
          </div>
        </div>
      ) : (
        <div className="border-2 border-dashed rounded-lg p-8 text-center">
          <Upload className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
          <p className="text-muted-foreground mb-4">
            Nenhuma imagem hero configurada. A imagem padrão será exibida.
          </p>
          <Button
            onClick={() => document.getElementById("hero-upload")?.click()}
            disabled={uploading}
          >
            <Upload className="w-4 h-4 mr-2" />
            {uploading ? "Enviando..." : "Fazer Upload"}
          </Button>
        </div>
      )}

      <input
        id="hero-upload"
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleImageUpload}
      />
    </Card>
  );
};

export default HeroImageEditor;
