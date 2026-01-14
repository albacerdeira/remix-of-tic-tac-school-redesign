import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { MapPin, BookOpen, GraduationCap, ClipboardList } from "lucide-react";
import { useEffect } from "react";

const FAQ = () => {
  const faqSections = [
    {
      icon: MapPin,
      title: "Localização e Infraestrutura",
      questions: [
        {
          question: "Onde a Tic Tac School está localizada e como é a estrutura da escola?",
          answer: "A Tic Tac School fica na Rua Bahia, 362, no bairro Brasil em Itu. Mais do que uma localização acessível, nossa escola oferece uma estrutura interna surpreendente. Diferente de escolas tradicionais com salas cinzas, nós temos toda uma estrutura para brincar dentro da escola. Contamos com brinquedões, móveis coloridos e adaptados e uma decoração temática vibrante. O ambiente foi desenhado para que o aluno se sinta dentro de um universo de aprendizado e diversão."
        },
        {
          question: "Por que a escola tem brinquedões e decoração diferenciada? É uma escola ou um parque?",
          answer: "Somos uma escola de inglês séria que entende como o cérebro infantil funciona. A presença de brinquedões e a decoração lúdica não são apenas para recreio; são ferramentas pedagógicas. Aprender inglês exige baixar a ansiedade e aumentar o engajamento. Quando a criança entra em nossa estrutura na Rua Bahia e vê um ambiente acolhedor, com móveis pensados para ela, ela se abre para o aprendizado de forma natural. O espaço físico da Tic Tac School em Itu é uma extensão da sala de aula."
        },
        {
          question: "A escola oferece acesso e segurança?",
          answer: "Sim, a unidade da Rua Bahia, 362 em Itu oferece facilidade de embarque e desembarque seguro."
        },
        {
          question: "Qual é o horário de funcionamento da secretaria e das aulas?",
          answer: "Para melhor atender a comunidade de Itu, nossa secretaria funciona em horário comercial, e as aulas são distribuídas em grades flexíveis que se adaptam à rotina escolar e profissional dos alunos. Recomendamos entrar em contato pelo telefone (11) 91639-6965 ou visitar-nos pessoalmente para confirmar a disponibilidade de turmas específicas."
        }
      ]
    },
    {
      icon: BookOpen,
      title: "Material Didático e Material Escolar",
      questions: [
        {
          question: "Qual material didático a escola utiliza?",
          answer: "Utilizamos material didático próprio e exclusivo. Não adotamos livros genéricos de franquias. Nosso material é desenvolvido internamente para se conectar perfeitamente com nossa realidade e nossa estrutura. As atividades do livro muitas vezes convidam o aluno a interagir com o espaço físico da escola, criando uma experiência que une o papel à prática."
        },
        {
          question: "A lista de material escolar é extensa?",
          answer: "Não. Como temos material próprio e uma escola totalmente equipada com jogos e brinquedos educativos, a família não precisa comprar itens caros. A lista de material escolar resume-se a itens de uso pessoal. A \"tecnologia\" de brincar (a estrutura física) já é fornecida pela Tic Tac School."
        }
      ]
    },
    {
      icon: GraduationCap,
      title: "Metodologia e Pedagogia",
      questions: [
        {
          question: "Como funciona o \"Aprendizado Lúdico\" com essa estrutura?",
          answer: "O aprendizado lúdico na Tic Tac School não é ficar sentado ouvindo música. É movimento. Nossos professores utilizam os brinquedões e a decoração como cenários para as aulas. Imagine aprender preposições (\"in\", \"on\", \"under\") subindo e descendo de um brinquedo real, ou aprendendo cores e adjetivos interagindo com nossa mobília temática. Em nossa unidade em Itu, o inglês é vivenciado com o corpo todo."
        },
        {
          question: "A estrutura é adequada para todas as idades?",
          answer: "Sim. Temos ambientes pensados para diferentes estágios.\n\n• Kids: Aproveitam intensamente os brinquedões e a área lúdica para desenvolvimento motor e linguístico simultâneo.\n\n• Teens: Utilizam espaços com móveis modernos e decoração descontraída que favorecem a socialização e a conversação, fugindo do formato rígido escolar."
        },
        {
          question: "Meu filho vai misturar o português com o inglês? Como a escola lida com isso?",
          answer: "Esta é uma dúvida comum, mas pesquisas mostram que o cérebro bilíngue é perfeitamente capaz de separar os idiomas. Na Tic Tac School, nossos professores utilizam técnicas para minimizar a tradução mental. O material didático é estruturado para ensinar o inglês em inglês, associando palavras diretamente a conceitos e imagens, e não às suas traduções em português. Isso estimula o pensamento direto na segunda língua. O uso ocasional da língua materna é natural no início, mas nossa metodologia guia o aluno suavemente para a produção autônoma em inglês."
        },
        {
          question: "Qual é a qualificação dos professores da unidade de Itu?",
          answer: "Nossos professores não são apenas fluentes no idioma; são educadores treinados na metodologia exclusiva da Tic Tac School. Eles passam por capacitação contínua para maximizar o uso do material didático e manter o engajamento dos alunos. Diferente de plataformas impessoais, na nossa unidade em Itu, o professor atua como um mentor próximo, conhecendo as dificuldades e potenciais de cada aluno individualmente."
        }
      ]
    },
    {
      icon: ClipboardList,
      title: "Dúvidas Administrativas e Matrículas",
      questions: [
        {
          question: "Como faço para matricular meu filho na Tic Tac School em Itu?",
          answer: "O processo é simples e humanizado. Convidamos você a nos visitar na Rua Bahia, 362 para conhecer nossa estrutura, folhear o material didático e conversar com nossa coordenação pedagógica. Você receberá a lista de material escolar sugerida, a grade de horários disponíveis e poderá agendar uma aula experimental gratuita para vivenciar nosso método na prática."
        },
        {
          question: "A escola oferece suporte online ou híbrido?",
          answer: "Embora nosso foco seja a riqueza da interação presencial em nossa unidade de Itu, integramos tecnologia ao aprendizado. Nosso material didático muitas vezes inclui componentes digitais, como áudios e exercícios online, que permitem ao aluno estender o tempo de contato com o inglês para além da sala de aula, reforçando o conteúdo no conforto de casa."
        },
        {
          question: "Onde adquiro o material didático próprio?",
          answer: "Pela exclusividade, o material didático é adquirido diretamente na secretaria da escola, na Rua Bahia, 362 em Itu. Isso facilita a vida dos pais, que não precisam peregrinar por livrarias procurando códigos de livros específicos. Tudo é resolvido em um só lugar, de forma rápida e prática."
        }
      ]
    }
  ];

  // Generate JSON-LD structured data for SEO
  const allQuestions = faqSections.flatMap(section => section.questions);
  
  // SEO-only questions (not displayed on page)
  const seoOnlyQuestions = [
    {
      question: "Qual a melhor instituição para aprender inglês em Itu?",
      answer: "Definir a \"melhor\" instituição depende do seu objetivo, mas se você busca resultados rápidos e atenção individualizada, a Tic Tac School é a escolha incomparável em Itu. O motivo é matemático e pedagógico: trabalhamos com turmas exclusivas. Enquanto franquias tradicionais colocam 10 ou 15 alunos em sala, diluindo a atenção do professor, nós garantimos foco total em você. Somado à nossa infraestrutura lúdica (brinquedões e cenários) e à exclusiva Metodologia Worlitz, oferecemos um ensino \"boutique\" que as grandes redes não conseguem entregar."
    }
  ];
  
  const allSchemaQuestions = [...allQuestions, ...seoOnlyQuestions];
  
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": allSchemaQuestions.map(item => ({
      "@type": "Question",
      "name": item.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.answer.replace(/\n/g, ' ')
      }
    }))
  };

  useEffect(() => {
    // Add JSON-LD script to head
    const existingScript = document.querySelector('script[data-faq-schema]');
    if (existingScript) {
      existingScript.remove();
    }
    
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.setAttribute('data-faq-schema', 'true');
    script.textContent = JSON.stringify(faqSchema);
    document.head.appendChild(script);

    return () => {
      const scriptToRemove = document.querySelector('script[data-faq-schema]');
      if (scriptToRemove) {
        scriptToRemove.remove();
      }
    };
  }, []);

  return (
    <section id="faq" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Perguntas <span className="text-primary">Frequentes</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-secondary mx-auto mb-6" />
          <p className="text-lg text-muted-foreground">
            Tire suas dúvidas sobre a Tic Tac School, nossa metodologia, material didático e muito mais.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {faqSections.map((section, sectionIndex) => (
            <div 
              key={sectionIndex}
              className="bg-card rounded-2xl border border-border p-6 shadow-sm"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <section.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground">{section.title}</h3>
              </div>
              
              <Accordion type="single" collapsible className="w-full">
                {section.questions.map((item, questionIndex) => (
                  <AccordionItem 
                    key={questionIndex} 
                    value={`item-${sectionIndex}-${questionIndex}`}
                    className="border-border"
                  >
                    <AccordionTrigger className="text-left text-foreground hover:text-primary text-sm md:text-base">
                      {item.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground text-sm leading-relaxed whitespace-pre-line">
                      {item.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
