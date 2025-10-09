import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { ScrollArea } from "@/components/ui/scroll-area";

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

const EMOJI_OPTIONS = [
  "🏖️", "🏊", "🌊", "☀️", "🌴", "🥥",
  "📶", "📺", "🔌", "💡", "🌡️", "❄️",
  "🚿", "🛁", "🧴", "🧻", "🪥", "🧹",
  "🍳", "☕", "🍽️", "🥤", "🧊", "🍺",
  "🚗", "🅿️", "🔒", "🗝️", "🛏️", "🪑",
  "🧺", "👕", "🧽", "🪟", "🚪", "🪜",
  "🎵", "📚", "🎮", "🏋️", "🧘", "🎨",
  "🐕", "🐈", "🦜", "🌺", "🌸", "🌻",
  "✨", "⭐", "🌟", "💫", "🔥", "💧"
];

const AmenityEditorModal = ({ amenity, open, onClose, onSave }: AmenityEditorModalProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState<Amenity>({
    name: "",
    icon: "✨",
    display_order: 0,
  });

  useEffect(() => {
    if (amenity) {
      setFormData(amenity);
    } else {
      setFormData({
        name: "",
        icon: "✨",
        display_order: 0,
      });
    }
  }, [amenity, open]);

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
            <Label>Ícone (Emoji) *</Label>
            <div className="mt-2 p-4 border rounded-md bg-background">
              <div className="text-center mb-3">
                <div className="text-5xl">{formData.icon}</div>
                <p className="text-xs text-muted-foreground mt-1">Selecionado</p>
              </div>
              <ScrollArea className="h-40">
                <div className="grid grid-cols-8 gap-2">
                  {EMOJI_OPTIONS.map((emoji) => (
                    <button
                      key={emoji}
                      type="button"
                      onClick={() => handleInputChange("icon", emoji)}
                      className={`text-2xl p-2 rounded hover:bg-accent transition-colors ${
                        formData.icon === emoji ? "bg-primary/20 ring-2 ring-primary" : ""
                      }`}
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
              </ScrollArea>
            </div>
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
