import { Star, Quote } from "lucide-react";
import { Card } from "@/components/ui/card";

const Reviews = () => {
  const reviews = [
    {
      name: "Lobo Planejados",
      rating: 5,
      text: "Ótima escola de Inglês. Estou muito feliz com a evolução do meu filho. Ele  tem 12 anos e já conversa e lê lindamente em inglês. Muito orgulho dele e muita gratidão a escola Tic Tac.",
      date: "há 3 anos",
    },
    {
      name: "João Santos",
      rating: 5,
      text: "Excelente escola! Professores qualificados e dedicados. O ambiente é acolhedor e a metodologia realmente funciona.",
      date: "há 3 meses",
    },
    {
      name: "Ana Paula",
      rating: 5,
      text: "Melhor escola de inglês de Itu! Meu filho evoluiu muito desde que começou. Super recomendo!",
      date: "há 1 mês",
    },
    {
      name: "Carlos Oliveira",
      rating: 5,
      text: "Estrutura impecável, professores atenciosos e aulas muito bem planejadas. Vale cada centavo investido!",
      date: "há 4 meses",
    },
    {
      name: "Patricia Costa",
      rating: 5,
      text: "Ambiente acolhedor e propício ao aprendizado. As crianças se sentem à vontade e aprendem brincando.",
      date: "há 2 meses",
    },
    {
      name: "Roberto Almeida",
      rating: 5,
      text: "Excelente custo-benefício! Turmas pequenas que permitem um atendimento personalizado. Muito satisfeito!",
      date: "há 5 meses",
    },
  ];

  return (
    <section id="avaliacoes" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            O que dizem <span className="text-primary">nossos alunos</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-secondary mx-auto mb-6" />
          <p className="text-lg text-muted-foreground">
            Avaliações reais de pais e alunos que confiam na Tic Tac School
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {reviews.map((review, index) => (
            <Card key={index} className="p-6 hover:shadow-lg transition-all hover:border-primary group">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="font-semibold text-lg text-foreground mb-1">{review.name}</h3>
                  <p className="text-sm text-muted-foreground">{review.date}</p>
                </div>
                <Quote className="w-8 h-8 text-primary/20 group-hover:text-primary/40 transition-colors" />
              </div>

              <div className="flex gap-1 mb-4">
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-secondary text-secondary" />
                ))}
              </div>

              <p className="text-muted-foreground leading-relaxed">{review.text}</p>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <a
            href="https://www.google.com/search?q=Tic+Tac+School"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-semibold"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
            </svg>
            Ver mais avaliações no Google
          </a>
        </div>
      </div>
    </section>
  );
};

export default Reviews;
