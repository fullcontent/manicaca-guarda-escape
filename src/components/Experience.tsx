import { Card } from "@/components/ui/card";
import { Heart, Home, MapPin } from "lucide-react";

const Experience = () => {
  const features = [
    {
      icon: Heart,
      title: "Hospitalidade Calorosa",
      description: "Nossa equipe dedica-se a fazer você se sentir em casa, oferecendo um atendimento personalizado e acolhedor."
    },
    {
      icon: Home,
      title: "Ambiente Familiar",
      description: "Desfrute de um espaço íntimo e confortável, perfeito para relaxar e criar memórias especiais."
    },
    {
      icon: MapPin,
      title: "Localização Privilegiada",
      description: "A apenas poucos metros da praia, você terá acesso direto ao paraíso natural de Guarda do Embaú."
    }
  ];

  return (
    <section className="py-20 px-6 bg-gradient-sand">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            A Experiência Manicaca
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Mais que uma hospedagem, oferecemos uma experiência autêntica 
            que conecta você com a essência da costa brasileira
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
                Sua Segunda Casa no Paraíso
              </h3>
              <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                Na Pousada Manicaca, acreditamos que cada hóspede merece se sentir especial. 
                Nossa paixão por hospitalidade e amor por Guarda do Embaú se refletem em 
                cada detalhe do seu cuidado.
              </p>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Da infraestrutura completa com piscina e churrasqueira às dicas 
                exclusivas dos melhores spots da região, estamos aqui para tornar 
                sua estadia verdadeiramente memorável.
              </p>
            </div>
            <div className="space-y-6">
              <div className="bg-primary/5 p-6 rounded-xl">
                <h4 className="font-semibold text-primary mb-2">Infraestrutura Completa</h4>
                <p className="text-muted-foreground">Piscina, churrasqueira e área de convivência</p>
              </div>
              <div className="bg-accent/5 p-6 rounded-xl">
                <h4 className="font-semibold text-accent mb-2">Atendimento Personalizado</h4>
                <p className="text-muted-foreground">Dicas exclusivas dos melhores lugares da região</p>
              </div>
              <div className="bg-earth/20 p-6 rounded-xl">
                <h4 className="font-semibold text-earth-dark mb-2">Localização Privilegiada</h4>
                <p className="text-muted-foreground">Próximo à praia e principais atrações</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;