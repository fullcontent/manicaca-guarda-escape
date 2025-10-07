import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface Amenity {
  id?: string;
  name: string;
  icon: string;
  display_order: number;
}

interface AmenityEditorModalProps {
  amenity: Amenity | null;
  open: boolean;
  onClose: () => void;
  onSave: () => void;
}

const AmenityEditorModal = ({ amenity, open, onClose, onSave }: AmenityEditorModalProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState<Amenity>(
    amenity || {
      name: "",
      icon: "✨",
      display_order: 0,
    }
  );

  const handleInputChange = (field: keyof Amenity, value: any) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSave = async () => {
    if (!formData.name || !formData.icon) {
      toast({
        title: "Erro",
        description: "Preencha todos os campos",
        variant: "destructive",
      });
      return;
    }

    try {
      if (formData.id) {
        const { error } = await supabase
          .from("amenities")
          .update({ name: formData.name, icon: formData.icon, display_order: formData.display_order })
          .eq("id", formData.id);

        if (error) throw error;
      } else {
        const { error } = await supabase
          .from("amenities")
          .insert([formData]);

        if (error) throw error;
      }

      toast({
        title: "Sucesso",
        description: formData.id ? "Comodidade atualizada" : "Comodidade criada",
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

  const handleDelete = async () => {
    if (!formData.id) return;

    if (!confirm("Tem certeza que deseja deletar esta comodidade?")) return;

    try {
      const { error } = await supabase
        .from("amenities")
        .delete()
        .eq("id", formData.id);

      if (error) throw error;

      toast({
        title: "Sucesso",
        description: "Comodidade deletada",
      });

      onSave();
      onClose();
    } catch (error: any) {
      toast({
        title: "Erro ao deletar",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>
            {formData.id ? "Editar Comodidade" : "Nova Comodidade"}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <Label htmlFor="name">Nome da Comodidade *</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              placeholder="Ex: Wi-Fi Grátis"
            />
          </div>

          <div>
            <Label htmlFor="icon">Ícone (Emoji) *</Label>
            <Input
              id="icon"
              value={formData.icon}
              onChange={(e) => handleInputChange("icon", e.target.value)}
              placeholder="Ex: 📶"
              maxLength={2}
            />
            <p className="text-xs text-muted-foreground mt-1">
              Use um emoji que represente a comodidade
            </p>
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

          <div className="flex gap-2 justify-between pt-4">
            {formData.id && (
              <Button variant="destructive" onClick={handleDelete}>
                Deletar
              </Button>
            )}
            <div className="flex gap-2 ml-auto">
              <Button variant="outline" onClick={onClose}>
                Cancelar
              </Button>
              <Button onClick={handleSave}>
                Salvar
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AmenityEditorModal;
