import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Phone, Mail, MapPin, Instagram } from "lucide-react";

const Contact = () => {
  const whatsappNumber = "5541999133301"; // +55 41 9991-3301
  const whatsappLink = `https://wa.me/${whatsappNumber}`;
  const googleMapsLink = "https://www.google.com/maps/place/Pousada+Manicaca/@-27.9055,-48.5970513,17z/data=!4m9!3m8!1s0x9526d7d20f7d3dbf:0x1ccc08415a2a330d!5m2!4m1!1i2!8m2!3d-27.9055!4d-48.594471!16s%2Fg%2F1yfh_jqkt?entry=ttu&g_ep=EgoyMDI1MDkyNC4wIKXMDSoASAFQAw%3D%3D";

  return (
    <section className="py-20 px-6 bg-gradient-sand">
      <div className="max-w-6xl mx-auto">
        <div id="contact" className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Reserve Sua Aventura
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Entre em contato e garanta sua data na Guarda do Embaú
          </p>
        </div>

        {/* Contact Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {/* WhatsApp */}
          <Card className="p-8 text-center hover:shadow-lg transition-all-smooth">
            <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Phone className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="font-bold text-foreground mb-2">WhatsApp</h3>
            <p className="text-muted-foreground text-sm mb-1">+55 41 9991-3301</p>
            <p className="text-muted-foreground text-xs mb-4">Atendimento 24h</p>
            <Button 
              asChild
              className="w-full bg-green-600 hover:bg-green-700 text-white"
            >
              <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
                Conversar Agora
              </a>
            </Button>
          </Card>

          {/* Email */}
          <Card className="p-8 text-center hover:shadow-lg transition-all-smooth">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Mail className="w-8 h-8 text-primary" />
            </div>
            <h3 className="font-bold text-foreground mb-2">E-mail</h3>
            <p className="text-muted-foreground text-sm mb-1">contato@pousadamanicaca.com.br</p>
            <p className="text-muted-foreground text-xs mb-4">Resposta em até 24h</p>
            <Button 
              asChild
              variant="outline"
              className="w-full"
            >
              <a href="mailto:contato@pousadamanicaca.com.br">
                Enviar E-mail
              </a>
            </Button>
          </Card>

          {/* Localização */}
          <Card className="p-8 text-center hover:shadow-lg transition-all-smooth">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <MapPin className="w-8 h-8 text-primary" />
            </div>
            <h3 className="font-bold text-foreground mb-2">Localização</h3>
            <p className="text-muted-foreground text-sm mb-1">R. Trinta e Dois, S/N</p>
            <p className="text-muted-foreground text-xs mb-4">Enseada de Brito, Palhoça - SC</p>
            <Button 
              asChild
              variant="outline"
              className="w-full"
            >
              <a href={googleMapsLink} target="_blank" rel="noopener noreferrer">
                Abrir no Maps
              </a>
            </Button>
          </Card>
        </div>

        {/* Social Media */}
        <div className="text-center mb-16">
          <h3 className="text-xl font-semibold text-foreground mb-6">Siga-nos nas Redes Sociais</h3>
          <div className="flex justify-center gap-4">
            <Button size="lg" className="bg-gradient-to-r from-pink-500 to-purple-600 text-white hover:shadow-lg">
              <Instagram className="w-5 h-5 mr-2" />
              Instagram
            </Button>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="bg-white rounded-2xl p-8 shadow-lg">
          <h3 className="text-center text-xl font-semibold text-foreground mb-8">
            Recomendado Por
          </h3>
          <div className="flex flex-col md:flex-row items-center justify-center gap-8">
            <div className="flex flex-col items-center">
              <div className="bg-[#003580] text-white px-8 py-4 rounded-lg font-bold text-2xl mb-2">
                Booking.com
              </div>
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                  </svg>
                ))}
              </div>
              <p className="text-sm text-muted-foreground mt-1">Avaliação Excepcional</p>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="bg-[#00AF87] text-white px-8 py-4 rounded-lg font-bold text-2xl mb-2">
                TripAdvisor
              </div>
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-green-600 fill-current" viewBox="0 0 20 20">
                    <circle cx="10" cy="10" r="10" />
                  </svg>
                ))}
              </div>
              <p className="text-sm text-muted-foreground mt-1">Certificado de Excelência</p>
            </div>
          </div>
        </div>

        {/* Admin Link */}
        <div className="text-center mt-8">
          <a 
            href="/auth" 
            className="text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            Acesso Administrativo
          </a>
        </div>
      </div>
    </section>
  );
};

export default Contact;