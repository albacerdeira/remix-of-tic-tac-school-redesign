import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import kidsImage from "@/assets/kids-learning.jpg";
import teensImage from "@/assets/teens-learning.jpg";
import adultsImage from "@/assets/adults-learning.jpg";

const Courses = () => {
  const scrollToContact = () => {
    const element = document.getElementById('contato');
    element?.scrollIntoView({ behavior: "smooth" });
  };

  const courses = [
    {
      title: "English Fun",
      subtitle: "3 a 8 anos",
      description: "De forma lúdica e divertida, as crianças vivenciam o idioma e fixam o vocabulário contextualizado com a idade.",
      image: kidsImage,
      color: "secondary",
    },
    {
      title: "Happy Teens",
      subtitle: "9 a 15 anos",
      description: "Estágios: Básico (Teens 1 e 2), Intermediário (Book 2 e 3), Avançado (Book 4, 5 e 6)",
      image: teensImage,
      color: "primary",
    },
    {
      title: "Happy Dreams",
      subtitle: "Adultos",
      description: "Estágios: Básico (Book 1 e 2), Intermediário (Book 3 e 4), Avançado (Book 5 e 6)",
      image: adultsImage,
      color: "secondary",
    },
  ];

  return (
    <section id="cursos" className="py-20 bg-muted">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Nossos <span className="text-primary">Cursos</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-secondary mx-auto mb-6" />
          <p className="text-lg text-muted-foreground">
            Programas desenvolvidos para cada faixa etária com metodologia adequada
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course, index) => (
            <Card 
              key={index}
              className="overflow-hidden group hover:shadow-xl transition-all border-2 hover:border-primary"
            >
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={course.image} 
                  alt={course.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className={`absolute inset-0 bg-gradient-to-t ${
                  course.color === 'primary' ? 'from-primary/80' : 'from-secondary/80'
                } to-transparent`} />
                <div className="absolute bottom-4 left-4">
                  <h3 className="text-3xl font-bold text-white mb-1">{course.title}</h3>
                  <div className={`w-16 h-1 ${
                    course.color === 'primary' ? 'bg-secondary' : 'bg-primary'
                  }`} />
                </div>
              </div>
              
              <div className="p-6 space-y-4">
                <p className="text-lg font-semibold text-primary">{course.subtitle}</p>
                <p className="text-muted-foreground">{course.description}</p>
                <Button 
                  onClick={scrollToContact}
                  variant={course.color === 'primary' ? 'default' : 'accent'}
                  className="w-full"
                >
                  Entrar em Contato
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Courses;
