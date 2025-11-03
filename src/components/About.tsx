import { GraduationCap, Users, Gamepad2, Trophy } from "lucide-react";

const About = () => {
  const features = [
    {
      icon: Users,
      title: "Turmas Pequenas",
      description: "Apenas 4 alunos por turma para mais chances de praticar o idioma",
    },
    {
      icon: GraduationCap,
      title: "Metodologia Worlitz",
      description: "Material didático coerente, prático e com sequência lógica",
    },
    {
      icon: Gamepad2,
      title: "Aprendizado Lúdico",
      description: "Jogos, vídeos e dramatizações para vivenciar o idioma",
    },
    {
      icon: Trophy,
      title: "Sala Equipada",
      description: "Tecnologia para tornar a aula atrativa para todas as idades",
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
              className="group p-6 rounded-2xl bg-card border border-border hover:border-primary transition-all hover:shadow-lg"
            >
              <div className="w-16 h-16 rounded-full bg-gradient-primary flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <feature.icon className="w-8 h-8 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-foreground">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
