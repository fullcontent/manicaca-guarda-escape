import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, CreditCard, DollarSign, CheckCircle } from "lucide-react";

const Pricing = () => {
  const whatsappNumber = "554199913301";
  const whatsappLink = `https://wa.me/${whatsappNumber}`;
  const bookingLink = "https://www.booking.com"; // Substituir pelo link real

  return (
    <section id="pricing" className="py-20 px-6 bg-secondary/30">
      <div className="max-w-6xl mx-auto">
        
        {/* Pricing Table */}
        <div className="bg-white rounded-2xl p-8 md:p-12 shadow-lg mb-12">
          <h3 className="text-2xl md:text-3xl font-bold text-foreground text-center mb-8">
            Valores para 2 Pessoas (Mínimo 2 Diárias)
          </h3>
          
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            {/* Suíte Premium */}
            <Card className="p-6 border-2 border-primary/20">
              <h4 className="text-xl font-bold text-foreground mb-4">Suíte Premium</h4>
              <div className="space-y-3 mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Abr - Nov</span>
                  <span className="text-2xl font-bold text-primary">R$ 250</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Dez - Mar (exceto feriados)</span>
                  <span className="text-2xl font-bold text-primary">R$ 290</span>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">Por noite</p>
            </Card>

            {/* Demais Suítes */}
            <Card className="p-6 border-2 border-accent/20">
              <h4 className="text-xl font-bold text-foreground mb-4">Demais Suítes</h4>
              <div className="space-y-3 mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Abr - Nov</span>
                  <span className="text-2xl font-bold text-accent">R$ 240</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Dez - Mar (exceto feriados)</span>
                  <span className="text-2xl font-bold text-accent">R$ 275</span>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">Por noite</p>
            </Card>
          </div>

          {/* Regras */}
          <div className="border-t pt-8">
            <h4 className="text-lg font-semibold text-foreground mb-6 text-center">Informações de Reserva</h4>
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="flex items-start gap-3 p-4 bg-secondary/20 rounded-lg">
                <Clock className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h5 className="font-semibold text-foreground mb-1">Check-in / Check-out</h5>
                  <p className="text-sm text-muted-foreground">Check-in: 14h</p>
                  <p className="text-sm text-muted-foreground">Check-out: Meio-dia</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 bg-secondary/20 rounded-lg">
                <DollarSign className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h5 className="font-semibold text-foreground mb-1">Preferência de Pagamento</h5>
                  <p className="text-sm text-muted-foreground">PIX ou Dinheiro</p>
                  <p className="text-sm text-muted-foreground">Melhor custo-benefício</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 bg-secondary/20 rounded-lg">
                <CreditCard className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h5 className="font-semibold text-foreground mb-1">Cartão de Crédito</h5>
                  <p className="text-sm text-muted-foreground">Reserve via Booking.com</p>
                  <p className="text-sm text-muted-foreground">Flexibilidade de pagamento</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            size="lg" 
            asChild
            className="bg-green-600 hover:bg-green-700 text-white px-8"
          >
            <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
              <CheckCircle className="w-5 h-5 mr-2" />
              Reservar via WhatsApp
            </a>
          </Button>
          
          <Button 
            size="lg" 
            variant="outline" 
            asChild
            className="px-8"
          >
            <a href={bookingLink} target="_blank" rel="noopener noreferrer">
              <CreditCard className="w-5 h-5 mr-2" />
              Reservar via Booking.com
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
