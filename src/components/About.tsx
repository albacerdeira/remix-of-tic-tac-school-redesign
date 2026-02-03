import { GraduationCap, Users, Gamepad2, Trophy } from "lucide-react";
import classroomSmall from "@/assets/classroom-small.jpg";
import classroomChairs from "@/assets/classroom-chairs.jpg";
import kidsClassroom from "@/assets/kids-classroom.jpg";
import classroomTech from "@/assets/classroom-tech.jpg";

const About = () => {
  const features = [
    {
      icon: Users,
      title: "Turmas Pequenas",
      description: "Apenas 4 alunos por turma para mais chances de praticar o idioma",
      image: classroomChairs,
    },
    {
      icon: GraduationCap,
      title: "Metodologia Worlitz",
      description: "Material didático coerente, prático e com sequência lógica",
      image: classroomSmall,
    },
    {
      icon: Gamepad2,
      title: "Aprendizado Lúdico",
      description: "Jogos, vídeos e dramatizações para vivenciar o idioma",
      image: kidsClassroom,
    },
    {
      icon: Trophy,
      title: "Sala Equipada",
      description: "Tecnologia para tornar a aula atrativa para todas as idades",
      image: classroomTech,
    },
  ];

  return (
    <section id="quemsomos" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Welcome to <span className="text-primary">Tic Tac School</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-secondary mx-auto mb-6" />
          <p className="text-lg text-muted-foreground">
            A Tic Tac é uma escola de inglês que visa fornecer conhecimento com qualidade. 
            Nosso objetivo principal é auxiliar o aluno a aprender estratégias de comunicação orais 
            e escritas eficazes, capacitando para diversos objetivos como testes, viagens, trabalhos e etc.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="group rounded-2xl bg-card border border-border hover:border-primary transition-all hover:shadow-lg overflow-hidden"
            >
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={feature.image} 
                  alt={feature.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  loading="lazy"
                  width={300}
                  height={192}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent" />
                <div className="absolute bottom-4 left-4 w-12 h-12 rounded-full bg-secondary flex items-center justify-center">
                  <feature.icon className="w-6 h-6 text-secondary-foreground" />
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2 text-foreground">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
