import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

// Heroicons available
import { 
  WifiIcon, TvIcon, SunIcon, HomeIcon,
  SparklesIcon, FireIcon, UserGroupIcon, BeakerIcon,
  CubeIcon, GlobeAltIcon, HeartIcon, StarIcon
} from "@heroicons/react/24/outline";

interface Amenity {
  id?: string;
  name: string;
  icon: string;
  type: 'suite' | 'common';
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
  const [formData, setFormData] = useState<Amenity>({
    name: "",
    icon: "WifiIcon",
    type: "suite",
    display_order: 0,
  });

  useEffect(() => {
    if (amenity) {
      setFormData(amenity);
    } else {
      setFormData({
        name: "",
        icon: "WifiIcon",
        type: "suite",
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
          .update({ 
            name: formData.name, 
            icon: formData.icon, 
            type: formData.type,
            display_order: formData.display_order 
          })
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

  const availableIcons = [
    { value: "WifiIcon", label: "Wi-Fi", Icon: WifiIcon },
    { value: "TvIcon", label: "TV", Icon: TvIcon },
    { value: "SunIcon", label: "Sol/Praia", Icon: SunIcon },
    { value: "HomeIcon", label: "Casa", Icon: HomeIcon },
    { value: "SparklesIcon", label: "Limpeza", Icon: SparklesIcon },
    { value: "FireIcon", label: "Churrasqueira", Icon: FireIcon },
    { value: "UserGroupIcon", label: "Pessoas", Icon: UserGroupIcon },
    { value: "BeakerIcon", label: "Cozinha", Icon: BeakerIcon },
    { value: "CubeIcon", label: "Utensílios", Icon: CubeIcon },
    { value: "GlobeAltIcon", label: "Internet", Icon: GlobeAltIcon },
    { value: "HeartIcon", label: "Conforto", Icon: HeartIcon },
    { value: "StarIcon", label: "Premium", Icon: StarIcon },
  ];

  const SelectedIcon = availableIcons.find(i => i.value === formData.icon)?.Icon || WifiIcon;

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
            <Label htmlFor="name">Nome *</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              placeholder="Ex: Wi-Fi Grátis"
            />
          </div>

          <div>
            <Label htmlFor="type">Tipo de Comodidade *</Label>
            <Select
              value={formData.type}
              onValueChange={(value) => handleInputChange("type", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecione o tipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="suite">Específica da Suíte</SelectItem>
                <SelectItem value="common">Comodidade Comum</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-xs text-muted-foreground mt-1">
              {formData.type === 'suite' 
                ? 'Aparecerá apenas nas suítes selecionadas' 
                : 'Aparecerá na área de comodidades comuns da pousada'}
            </p>
          </div>

          <div>
            <Label htmlFor="icon">Ícone *</Label>
            <Select
              value={formData.icon}
              onValueChange={(value) => handleInputChange("icon", value)}
            >
              <SelectTrigger>
                <SelectValue>
                  <div className="flex items-center gap-2">
                    <SelectedIcon className="w-4 h-4" />
                    <span>{availableIcons.find(i => i.value === formData.icon)?.label || "Selecione"}</span>
                  </div>
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                {availableIcons.map((icon) => (
                  <SelectItem key={icon.value} value={icon.value}>
                    <div className="flex items-center gap-2">
                      <icon.Icon className="w-4 h-4" />
                      <span>{icon.label}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
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
