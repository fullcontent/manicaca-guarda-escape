import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

interface GalleryImage {
  id: string;
  image_url: string;
  category: string;
  display_order: number;
}

const BeachGallery = () => {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchGalleryImages();
  }, []);

  const fetchGalleryImages = async () => {
    try {
      const { data, error } = await supabase
        .from("gallery_images")
        .select("*")
        .eq("category", "praia")
        .order("display_order");

      if (error) {
        if (import.meta.env.DEV) {
          console.error("Error fetching gallery images:", error);
        }
        return;
      }

      setImages((data || []) as GalleryImage[]);
    } catch (error) {
      if (import.meta.env.DEV) {
        console.error("Error in fetchGalleryImages:", error);
      }
    } finally {
      setLoading(false);
    }
  };

  const getImageUrl = (imagePath: string) => {
    const { data } = supabase.storage
      .from("pousada-images")
      .getPublicUrl(imagePath);
    return data.publicUrl;
  };

  if (loading) {
    return null;
  }

  if (images.length === 0) {
    return null;
  }

  return (
    <section className="py-20 px-6 bg-gradient-sand">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Paraíso Natural
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            A beleza da Guarda do Embaú em imagens que inspiram sua próxima aventura
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {images.map((image, index) => (
            <div 
              key={image.id} 
              className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-all-smooth animate-fade-in cursor-pointer"
              style={{animationDelay: `${index * 0.1}s`}}
            >
              <div className="aspect-square">
                <img 
                  src={getImageUrl(image.image_url)}
                  alt={image.category}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
              </div>
              
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BeachGallery;
