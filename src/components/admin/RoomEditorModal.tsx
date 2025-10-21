import { useState, useEffect } from "react";
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
  suite_specific_amenities: string[];
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
  const [formData, setFormData] = useState<Room>({
    name: "",
    capacity: "",
    price_low_season: 0,
    price_high_season: 0,
    description: "",
    amenities: [],
    suite_specific_amenities: [],
    featured: false,
    display_order: 0,
  });
  const [newAmenity, setNewAmenity] = useState("");
  const [uploading, setUploading] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [additionalImages, setAdditionalImages] = useState<Array<{ id?: string; url: string; description: string; display_order: number }>>([]);
  const [uploadingAdditional, setUploadingAdditional] = useState(false);

  useEffect(() => {
    if (room) {
      setFormData(room);
      setImagePreview(null);
      if (room.id) {
        fetchAdditionalImages(room.id);
      }
    } else {
      setFormData({
        name: "",
        capacity: "",
        price_low_season: 0,
        price_high_season: 0,
        description: "",
        amenities: [],
        suite_specific_amenities: [],
        featured: false,
        display_order: 0,
      });
      setImagePreview(null);
      setAdditionalImages([]);
    }
    setNewAmenity("");
  }, [room, open]);

  const fetchAdditionalImages = async (roomId: string) => {
    try {
      const { data, error } = await supabase
        .from("room_images")
        .select("*")
        .eq("room_id", roomId)
        .order("display_order");

      if (error) throw error;

      const images = data?.map(img => ({
        id: img.id,
        url: supabase.storage.from("pousada-images").getPublicUrl(img.image_url).data.publicUrl,
        description: img.description || "",
        display_order: img.display_order
      })) || [];

      setAdditionalImages(images);
    } catch (error) {
      console.error("Error fetching additional images:", error);
    }
  };

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

  const handleAdditionalImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
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

    if (!formData.id) {
      toast({
        title: "Atenção",
        description: "Salve a suíte primeiro antes de adicionar fotos adicionais",
        variant: "destructive",
      });
      return;
    }

    setUploadingAdditional(true);
    try {
      const fileExt = file.name.split(".").pop();
      const fileName = `${Math.random().toString(36).substring(2)}.${fileExt}`;
      const filePath = `rooms/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from("pousada-images")
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: insertData, error: insertError } = await supabase
        .from("room_images")
        .insert([{
          room_id: formData.id,
          image_url: filePath,
          description: "",
          display_order: additionalImages.length
        }])
        .select()
        .single();

      if (insertError) throw insertError;

      const publicUrl = supabase.storage.from("pousada-images").getPublicUrl(filePath).data.publicUrl;
      
      setAdditionalImages([...additionalImages, {
        id: insertData.id,
        url: publicUrl,
        description: "",
        display_order: additionalImages.length
      }]);

      toast({
        title: "Sucesso",
        description: "Foto adicional enviada com sucesso",
      });
    } catch (error: any) {
      toast({
        title: "Erro ao enviar imagem",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setUploadingAdditional(false);
    }
  };

  const handleUpdateImageDescription = async (imageId: string, description: string) => {
    try {
      const { error } = await supabase
        .from("room_images")
        .update({ description })
        .eq("id", imageId);

      if (error) throw error;

      setAdditionalImages(additionalImages.map(img => 
        img.id === imageId ? { ...img, description } : img
      ));

      toast({
        title: "Sucesso",
        description: "Descrição atualizada",
      });
    } catch (error: any) {
      toast({
        title: "Erro",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleDeleteAdditionalImage = async (imageId: string, imageUrl: string) => {
    try {
      // Extract file path from URL
      const urlParts = imageUrl.split("/pousada-images/");
      const filePath = urlParts[1]?.split("?")[0];

      if (filePath) {
        await supabase.storage.from("pousada-images").remove([filePath]);
      }

      const { error } = await supabase
        .from("room_images")
        .delete()
        .eq("id", imageId);

      if (error) throw error;

      setAdditionalImages(additionalImages.filter(img => img.id !== imageId));

      toast({
        title: "Sucesso",
        description: "Foto removida",
      });
    } catch (error: any) {
      toast({
        title: "Erro",
        description: error.message,
        variant: "destructive",
      });
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
        const { data, error } = await supabase
          .from("room_types")
          .insert([formData])
          .select()
          .single();

        if (error) throw error;
        if (data) {
          setFormData({ ...formData, id: data.id });
        }
      }

      toast({
        title: "Sucesso",
        description: formData.id ? "Suíte atualizada" : "Suíte criada",
      });

      onSave();
      if (!formData.id) {
        // Don't close if it's a new room, so user can add photos
        toast({
          title: "Dica",
          description: "Agora você pode adicionar fotos adicionais!",
        });
      } else {
        onClose();
      }
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

          <div className="border-t pt-4">
            <Label>Comodidades Extras desta Suíte</Label>
            <p className="text-sm text-muted-foreground mb-3">
              Adicione comodidades específicas que só esta suíte possui
            </p>
            
            <div className="space-y-3">
              {formData.suite_specific_amenities.map((amenity, index) => (
                <div key={index} className="flex items-center gap-2 bg-secondary/20 p-2 rounded">
                  <span className="flex-1 text-sm">{amenity}</span>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      const newAmenities = formData.suite_specific_amenities.filter((_, i) => i !== index);
                      setFormData({ ...formData, suite_specific_amenities: newAmenities });
                    }}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              ))}
              
              <div className="flex gap-2">
                <Input
                  placeholder="Ex: Vista para o mar, Banheira..."
                  value={newAmenity}
                  onChange={(e) => setNewAmenity(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && newAmenity.trim()) {
                      e.preventDefault();
                      setFormData({
                        ...formData,
                        suite_specific_amenities: [...formData.suite_specific_amenities, newAmenity.trim()]
                      });
                      setNewAmenity("");
                    }
                  }}
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    if (newAmenity.trim()) {
                      setFormData({
                        ...formData,
                        suite_specific_amenities: [...formData.suite_specific_amenities, newAmenity.trim()]
                      });
                      setNewAmenity("");
                    }
                  }}
                >
                  Adicionar
                </Button>
              </div>
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

          {formData.id && (
            <div className="border-t pt-4">
              <Label>Fotos Adicionais da Suíte</Label>
              <p className="text-sm text-muted-foreground mb-4">
                Adicione mais fotos para a galeria desta suíte
              </p>
              
              <div className="space-y-4">
                {additionalImages.map((image) => (
                  <div key={image.id} className="border rounded-lg p-4">
                    <div className="flex gap-4">
                      <img
                        src={image.url}
                        alt="Foto adicional"
                        className="w-24 h-24 object-cover rounded"
                      />
                      <div className="flex-1 space-y-2">
                        <Input
                          placeholder="Descrição da foto..."
                          value={image.description}
                          onChange={(e) => {
                            const newImages = additionalImages.map(img =>
                              img.id === image.id ? { ...img, description: e.target.value } : img
                            );
                            setAdditionalImages(newImages);
                          }}
                          onBlur={() => image.id && handleUpdateImageDescription(image.id, image.description)}
                        />
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => image.id && handleDeleteAdditionalImage(image.id, image.url)}
                        >
                          <X className="w-4 h-4 mr-2" />
                          Remover
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}

                <Button
                  type="button"
                  variant="outline"
                  className="w-full"
                  disabled={uploadingAdditional}
                  onClick={() => document.getElementById("additional-images-upload")?.click()}
                >
                  <Upload className="w-4 h-4 mr-2" />
                  {uploadingAdditional ? "Enviando..." : "Adicionar Foto"}
                </Button>
                <input
                  id="additional-images-upload"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleAdditionalImageUpload}
                />
              </div>
            </div>
          )}

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
