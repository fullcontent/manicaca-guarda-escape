import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Phone, Mail, MapPin, Instagram } from "lucide-react";

const Contact = () => {
  const whatsappNumber = "554199133301"; // +55 41 9991-3301
  const whatsappLink = `https://wa.me/${whatsappNumber}`;
  const googleMapsLink = "https://maps.app.goo.gl/XrPk3p9qYSTXJZnz8";

  return (
    <section className="py-20 px-6 bg-gradient-sand">
      <div className="max-w-6xl mx-auto">
        <div id="contact" className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Reserve Agora!
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
            <p className="text-muted-foreground text-sm mb-1">+55 41 99991-3301</p>
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

              
      </div>
    </section>
  );
};

export default Contact;