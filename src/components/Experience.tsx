import { Card } from "@/components/ui/card";
import { Heart, Home, MapPin } from "lucide-react";

const Experience = () => {
  const features = [
    {
      icon: Heart,
      title: "Equipe de Anfitriões Atenciosa",
      description: "Nossa equipe está sempre pronta para receber você com carinho e oferecer dicas exclusivas da região."
    },
    {
      icon: Home,
      title: "Ambiente Familiar e Tranquilo",
      description: "Um espaço acolhedor onde você pode relaxar completamente e se sentir em casa longe de casa."
    },
    {
      icon: MapPin,
      title: "Infraestrutura Completa",
      description: "Piscina para refrescar, quiosque com churrasqueira e estacionamento para sua comodidade."
    }
  ];

  return (
    <section className="py-20 px-6 bg-gradient-sand">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            O Seu Ponto de Paz Após a Jornada
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Acolhimento, infraestrutura completa e tranquilidade para recarregar suas energias
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <Card key={index} className="p-8 text-center hover:shadow-lg transition-all-smooth animate-fade-in" style={{animationDelay: `${index * 0.2}s`}}>
              <div className="w-16 h-16 mx-auto mb-6 bg-primary/10 rounded-full flex items-center justify-center">
                <feature.icon className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-foreground">{feature.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
            </Card>
          ))}
        </div>

        <div className="bg-white rounded-2xl p-8 md:p-12 shadow-lg">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-3xl font-bold text-foreground mb-6">
                Conforto e Liberdade
              </h3>
              <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                Na Pousada Manicaca, você encontra o equilíbrio perfeito entre conforto e autonomia. 
                Nossa estrutura oferece tudo que você precisa para relaxar após um dia de aventuras.
              </p>
              <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                Aproveite a liberdade para explorar a autêntica culinária local da Guarda do Embaú. 
                Nossa área de café da manhã está equipada com utensílios, cafeteira, sanduicheira e 
                microondas para você preparar suas refeições no seu próprio ritmo.
              </p>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Da piscina refrescante ao quiosque com churrasqueira, criamos o ambiente 
                perfeito para você recarregar as energias e criar memórias inesquecíveis.
              </p>
            </div>
            <div className="space-y-6">
              <div className="bg-primary/5 p-6 rounded-xl">
                <h4 className="font-semibold text-primary mb-2">Piscina e Lazer</h4>
                <p className="text-muted-foreground">Piscina para refrescar e quiosque com churrasqueira</p>
              </div>
              <div className="bg-accent/5 p-6 rounded-xl">
                <h4 className="font-semibold text-accent mb-2">Cozinha Equipada</h4>
                <p className="text-muted-foreground">Cafeteira, sanduicheira, microondas e utensílios</p>
              </div>
              <div className="bg-earth/20 p-6 rounded-xl">
                <h4 className="font-semibold text-earth-dark mb-2">Estacionamento Incluso</h4>
                <p className="text-muted-foreground">Estacione e explore a Guarda a pé</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;