import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Upload, X } from "lucide-react";

interface Room {
  id?: string;
  name: string;
  capacity: string;
  price_low_season: number;
  price_high_season: number;
  description: string;
  amenities: string[];
  featured: boolean;
  image_name?: string;
  display_order: number;
}

interface RoomEditorModalProps {
  room: Room | null;
  open: boolean;
  onClose: () => void;
  onSave: () => void;
  availableAmenities: Array<{ id: string; name: string }>;
}

const RoomEditorModal = ({ room, open, onClose, onSave, availableAmenities }: RoomEditorModalProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState<Room>(
    room || {
      name: "",
      capacity: "",
      price_low_season: 0,
      price_high_season: 0,
      description: "",
      amenities: [],
      featured: false,
      display_order: 0,
    }
  );
  const [uploading, setUploading] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleInputChange = (field: keyof Room, value: any) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleAmenityToggle = (amenityName: string) => {
    const amenities = formData.amenities.includes(amenityName)
      ? formData.amenities.filter(a => a !== amenityName)
      : [...formData.amenities, amenityName];
    setFormData({ ...formData, amenities });
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast({
        title: "Erro",
        description: "Por favor, selecione uma imagem válida",
        variant: "destructive",
      });
      return;
    }

    setUploading(true);
    try {
      const fileExt = file.name.split(".").pop();
      const fileName = `${Math.random().toString(36).substring(2)}.${fileExt}`;
      const filePath = `rooms/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from("pousada-images")
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from("pousada-images")
        .getPublicUrl(filePath);

      setImagePreview(publicUrl);
      setFormData({ ...formData, image_name: filePath });

      toast({
        title: "Sucesso",
        description: "Imagem enviada com sucesso",
      });
    } catch (error: any) {
      toast({
        title: "Erro ao enviar imagem",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  };

  const handleSave = async () => {
    if (!formData.name || !formData.capacity) {
      toast({
        title: "Erro",
        description: "Preencha todos os campos obrigatórios",
        variant: "destructive",
      });
      return;
    }

    try {
      if (formData.id) {
        const { error } = await supabase
          .from("room_types")
          .update(formData)
          .eq("id", formData.id);

        if (error) throw error;
      } else {
        const { error } = await supabase
          .from("room_types")
          .insert([formData]);

        if (error) throw error;
      }

      toast({
        title: "Sucesso",
        description: formData.id ? "Suíte atualizada" : "Suíte criada",
      });

      onSave();
      onClose();
    } catch (error: any) {
      toast({
        title: "Erro ao salvar",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {formData.id ? "Editar Suíte" : "Nova Suíte"}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <Label htmlFor="name">Nome da Suíte *</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              placeholder="Ex: Suíte Standard"
            />
          </div>

          <div>
            <Label htmlFor="capacity">Capacidade *</Label>
            <Input
              id="capacity"
              value={formData.capacity}
              onChange={(e) => handleInputChange("capacity", e.target.value)}
              placeholder="Ex: Até 2 pessoas"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="price_low">Preço Baixa Temporada (R$)</Label>
              <Input
                id="price_low"
                type="number"
                value={formData.price_low_season}
                onChange={(e) => handleInputChange("price_low_season", parseInt(e.target.value) || 0)}
              />
            </div>
            <div>
              <Label htmlFor="price_high">Preço Alta Temporada (R$)</Label>
              <Input
                id="price_high"
                type="number"
                value={formData.price_high_season}
                onChange={(e) => handleInputChange("price_high_season", parseInt(e.target.value) || 0)}
              />
            </div>
          </div>

          <div>
            <Label htmlFor="description">Descrição</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              placeholder="Descrição da suíte..."
              rows={4}
            />
          </div>

          <div>
            <Label>Imagem</Label>
            <div className="mt-2 space-y-2">
              {(imagePreview || formData.image_name) && (
                <div className="relative w-full h-48 border rounded overflow-hidden">
                  <img
                    src={imagePreview || `${supabase.storage.from("pousada-images").getPublicUrl(formData.image_name!).data.publicUrl}`}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <Button
                type="button"
                variant="outline"
                className="w-full"
                disabled={uploading}
                onClick={() => document.getElementById("room-image-upload")?.click()}
              >
                <Upload className="w-4 h-4 mr-2" />
                {uploading ? "Enviando..." : "Escolher Imagem"}
              </Button>
              <input
                id="room-image-upload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageUpload}
              />
            </div>
          </div>

          <div>
            <Label>Comodidades</Label>
            <div className="mt-2 grid grid-cols-2 gap-2">
              {availableAmenities.map((amenity) => (
                <div key={amenity.id} className="flex items-center gap-2">
                  <Switch
                    checked={formData.amenities.includes(amenity.name)}
                    onCheckedChange={() => handleAmenityToggle(amenity.name)}
                  />
                  <span className="text-sm">{amenity.name}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Switch
              checked={formData.featured}
              onCheckedChange={(checked) => handleInputChange("featured", checked)}
            />
            <Label>Marcar como Destaque (Mais Espaçosa)</Label>
          </div>

          <div>
            <Label htmlFor="display_order">Ordem de Exibição</Label>
            <Input
              id="display_order"
              type="number"
              value={formData.display_order}
              onChange={(e) => handleInputChange("display_order", parseInt(e.target.value) || 0)}
            />
          </div>

          <div className="flex gap-2 justify-end pt-4">
            <Button variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button onClick={handleSave}>
              Salvar
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default RoomEditorModal;
