import { Card } from "@/components/ui/card";
import { Award } from "lucide-react";
import surfReserveImage from "@/assets/surf-reserve.jpg";

const Experience = () => {
  return (
    <section className="py-20 px-6 bg-gradient-sand">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            9ª Reserva Mundial de Surf
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Um dos poucos lugares do mundo com reconhecimento internacional pela qualidade de suas ondas e preservação ambiental
          </p>
        </div>

        <div className="bg-white rounded-2xl overflow-hidden shadow-lg">
          <div className="grid md:grid-cols-2 gap-0 items-center">
            <div className="h-full">
              <img 
                src={surfReserveImage} 
                alt="Guarda do Embaú - 9ª Reserva Mundial de Surf" 
                className="w-full h-full object-cover min-h-[400px]"
              />
            </div>
            <div className="p-8 md:p-12">
              <div className="w-16 h-16 mb-6 bg-primary/10 rounded-full flex items-center justify-center">
                <Award className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-3xl font-bold text-foreground mb-6">
                Reconhecimento Mundial
              </h3>
              <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                Em 2017, a Guarda do Embaú foi reconhecida como a 9ª Reserva Mundial de Surf pela Save The Waves Coalition, 
                um título que celebra não apenas a excelência das ondas, mas também o compromisso com a preservação ambiental 
                e cultural da região.
              </p>
              <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                Este reconhecimento internacional atrai surfistas e amantes da natureza de todo o mundo, 
                que buscam experimentar ondas de classe mundial em um ambiente preservado e autêntico.
              </p>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Na Pousada Manicaca, você está a poucos passos deste paraíso reconhecido mundialmente, 
                com fácil acesso às praias e ao estilo de vida único da Guarda do Embaú.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;