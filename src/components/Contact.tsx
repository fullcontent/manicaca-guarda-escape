import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Phone, Mail, MapPin, Clock, MessageCircle, Instagram } from "lucide-react";

const Contact = () => {
  const contactInfo = [
    {
      icon: Phone,
      title: "Telefone & WhatsApp",
      details: ["+55 (48) 99999-9999", "Disponível 24h"],
      action: "Chamar no WhatsApp"
    },
    {
      icon: Mail,
      title: "E-mail",
      details: ["contato@pousadamanicaca.com.br", "Resposta em até 2h"],
      action: "Enviar E-mail"
    },
    {
      icon: MapPin,
      title: "Endereço",
      details: ["Rua das Palmeiras, 123", "Guarda do Embaú, SC"],
      action: "Ver no Mapa"
    },
    {
      icon: Clock,
      title: "Horário de Atendimento",
      details: ["Recepção: 7h às 22h", "Emergências: 24h"],
      action: null
    }
  ];

  return (
    <section className="py-20 px-6 bg-gradient-sand">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Fale Conosco
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Estamos aqui para tornar sua experiência inesquecível. 
            Entre em contato e tire todas suas dúvidas
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-foreground mb-8">
              Como nos encontrar
            </h3>
            
            {contactInfo.map((info, index) => (
              <Card key={index} className="p-6 hover:shadow-md transition-all-smooth animate-slide-in" style={{animationDelay: `${index * 0.1}s`}}>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <info.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-foreground mb-2">{info.title}</h4>
                    {info.details.map((detail, detailIndex) => (
                      <p key={detailIndex} className="text-muted-foreground text-sm mb-1">{detail}</p>
                    ))}
                    {info.action && (
                      <Button variant="link" className="px-0 h-auto text-primary hover:text-primary-dark">
                        {info.action}
                      </Button>
                    )}
                  </div>
                </div>
              </Card>
            ))}

            {/* Social Media */}
            <Card className="p-6">
              <h4 className="font-semibold text-foreground mb-4">Redes Sociais</h4>
              <div className="flex gap-4">
                <Button size="sm" className="bg-gradient-to-r from-pink-500 to-purple-600 text-white hover:shadow-lg">
                  <Instagram className="w-4 h-4 mr-2" />
                  Instagram
                </Button>
                <Button size="sm" variant="outline" className="hover:bg-primary hover:text-white">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Facebook
                </Button>
              </div>
            </Card>
          </div>

          {/* Contact Form */}
          <Card className="p-8">
            <h3 className="text-2xl font-bold text-foreground mb-6">
              Envie uma Mensagem
            </h3>
            
            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Nome
                  </label>
                  <Input placeholder="Seu nome completo" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    E-mail
                  </label>
                  <Input type="email" placeholder="seu@email.com" />
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Telefone
                  </label>
                  <Input placeholder="(48) 99999-9999" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Check-in
                  </label>
                  <Input type="date" />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Mensagem
                </label>
                <Textarea 
                  placeholder="Conte-nos sobre sua viagem, dúvidas ou pedidos especiais..."
                  rows={4}
                />
              </div>
              
              <Button className="w-full bg-primary hover:bg-primary-dark text-white font-semibold py-3">
                Enviar Mensagem
              </Button>
            </form>
          </Card>
        </div>

        {/* Booking CTA */}
        <div className="mt-16 text-center">
          <div className="inline-block p-8 bg-white rounded-2xl shadow-lg">
            <h3 className="text-2xl font-bold text-foreground mb-4">
              Pronto para Reservar?
            </h3>
            <p className="text-muted-foreground mb-6 max-w-md">
              Garante já sua estadia no paraíso. Vagas limitadas para uma experiência exclusiva.
            </p>
            <Button size="lg" className="bg-accent hover:bg-accent/80 text-accent-foreground px-8 py-4 text-lg font-semibold">
              Fazer Reserva Agora
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;