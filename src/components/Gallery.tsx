import { useContentData } from "@/hooks/useContentData";

const Gallery = () => {
  const { data, getImageUrl } = useContentData();

  return (
    <section className="py-20 px-6 bg-background">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Galeria de Momentos
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Cada imagem conta uma história, cada momento é uma memória esperando para ser vivida
          </p>
        </div>

        {/* Image Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.gallery.map((image, index) => (
            <div 
              key={index} 
              className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-all-smooth animate-fade-in cursor-pointer"
              style={{animationDelay: `${index * 0.1}s`}}
            >
              <div className="aspect-square">
                <img 
                  src={getImageUrl(image.src)}
                  alt={image.alt}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
              </div>
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-6 left-6 right-6">
                  <span className="inline-block px-3 py-1 bg-accent text-accent-foreground text-xs font-semibold rounded-full mb-2">
                    {image.category}
                  </span>
                  <p className="text-white font-medium">{image.alt}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="inline-block p-8 bg-gradient-sand rounded-2xl">
            <h3 className="text-2xl font-bold text-foreground mb-4">
              Quer ver mais?
            </h3>
            <p className="text-muted-foreground mb-6">
              Siga-nos nas redes sociais para acompanhar o dia a dia da pousada
            </p>
            <div className="flex justify-center gap-4">
              <a href="#" className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors">
                Instagram
              </a>
              <a href="#" className="px-6 py-3 bg-accent text-accent-foreground rounded-lg hover:bg-accent/80 transition-colors">
                Facebook
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Gallery;