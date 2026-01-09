import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { MapPin, BookOpen, GraduationCap, ClipboardList } from "lucide-react";

const FAQ = () => {
  const faqSections = [
    {
      icon: MapPin,
      title: "Localização e Infraestrutura",
      questions: [
        {
          question: "Onde a Tic Tac School está localizada e como é a estrutura da escola?",
          answer: "A Tic Tac School fica na Rua Bahia, 362, no bairro Vila Nova em Itu. Mais do que uma localização acessível, nossa escola oferece uma estrutura interna surpreendente. Diferente de escolas tradicionais com salas cinzas, nós temos toda uma estrutura para brincar dentro da escola. Contamos com brinquedões, móveis coloridos e adaptados e uma decoração temática vibrante. O ambiente foi desenhado para que o aluno se sinta dentro de um universo de aprendizado e diversão."
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
          question: "Qual é a diferença da localização da Tic Tac School em relação a outras escolas de inglês em Itu?",
          answer: "Enquanto muitas franquias se concentram em avenidas comerciais de alto fluxo, a Tic Tac School prioriza um ambiente acolhedor. Nossa unidade na Rua Bahia, 362 foi projetada para ser uma extensão da casa do aluno. Estamos próximos ao centro, mas reservados o suficiente para garantir o silêncio necessário para as atividades de listening and conversation e concentração que nossa metodologia exige."
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
          question: "Qual material didático a escola utiliza? Tenho que comprar livros importados caros?",
          answer: "Este é um dos nossos maiores diferenciais: a Tic Tac School utiliza material didático próprio e exclusivo. Diferente de franquias que obrigam a compra de kits padronizados e caríssimos, ou escolas que utilizam livros importados genéricos, nós desenvolvemos nosso próprio conteúdo. Isso significa que o material didático é 100% alinhado com a nossa metodologia e com a realidade dos alunos de Itu, garantindo que cada página da apostila seja relevante e utilizada em aula."
        },
        {
          question: "É necessário comprar uma lista de material escolar extensa além do material didático?",
          answer: "Não. Na Tic Tac School, o material escolar deve ser um facilitador, não um fardo financeiro. Como nosso material didático é próprio, ele já engloba a maior parte das atividades necessárias. A lista complementar de material escolar é simples, focada apenas em itens de uso pessoal para as dinâmicas lúdicas (como lápis de cor, tesoura e caderno de anotações), evitando desperdícios comuns em listas genéricas."
        },
        {
          question: "O material didático próprio possui a mesma qualidade de editoras internacionais?",
          answer: "Sim, e com a vantagem da personalização. Nosso material didático foi desenvolvido por especialistas em ensino de língua inglesa, seguindo as diretrizes do Quadro Europeu Comum de Referência para Línguas (CEFR). Ele combina o rigor acadêmico internacional com a flexibilidade que só um material autoral permite. Ele é constantemente atualizado pela nossa equipe pedagógica, sem a burocracia das grandes editoras, garantindo que o aluno sempre tenha acesso a textos e exercícios modernos."
        },
        {
          question: "Existe confusão entre o material da escola e os livros \"Tic Tac\" da Editora do Brasil?",
          answer: "É fundamental esclarecer: o nosso material didático é próprio e exclusivo da Tic Tac School de Itu. Não temos vínculo com a coleção infantil \"Tic Tac\" da Editora do Brasil que você encontra em livrarias comuns. Você não encontrará nosso material à venda em papelarias externas ou na internet, pois ele é uma ferramenta exclusiva dos nossos alunos matriculados, desenhada especificamente para o nosso método de ensino."
        },
        {
          question: "Posso reutilizar o material didático de um irmão ou amigo que já estudou na escola?",
          answer: "Como nosso material didático é focado na interatividade, ele funciona como um registro do aprendizado do aluno (workbook), onde são feitos exercícios, anotações e autoavaliações. Por isso, ele é de uso individual. No entanto, por ser um material próprio, conseguimos oferecer condições comerciais muito mais justas e acessíveis para as famílias de Itu do que as escolas que dependem de livros importados cotados em dólar."
        }
      ]
    },
    {
      icon: GraduationCap,
      title: "Metodologia e Pedagogia",
      questions: [
        {
          question: "Como funciona o \"Aprendizado Lúdico\" mencionado pela escola? É só brincadeira?",
          answer: "O aprendizado lúdico é o pilar central da Tic Tac School, mas é fundamentado em ciência cognitiva séria. Não acreditamos na memorização mecânica descontextualizada. Nossa metodologia utiliza jogos, vídeos, músicas e dramatizações para criar um ambiente de imersão onde o aluno vivencia o idioma. Em nossa unidade em Itu, as salas de aula funcionam como laboratórios de interação. O \"brincar\" é uma estratégia para baixar o filtro afetivo do aluno, reduzindo a ansiedade e facilitando a absorção natural da gramática e do vocabulário, conforme preconizam as mais modernas teorias de aquisição de linguagem."
        },
        {
          question: "Como o material próprio apoia o \"Aprendizado Lúdico\"?",
          answer: "A grande vantagem de ter material didático próprio é que ele foi criado para \"conversar\" com nossas aulas. Se a aula da semana envolve uma dramatização ou um jogo, a apostila traz o suporte exato para essa atividade. Não precisamos adaptar um livro rígido para ser divertido; nosso material já nasce lúdico. Isso cria uma conexão fluida entre o que está no papel e a vivência em sala de aula na nossa unidade em Itu."
        },
        {
          question: "A escola aceita alunos de quais idades? Existe material didático específico para crianças pequenas?",
          answer: "Atendemos diversas faixas etárias, desde a primeira infância até adultos. Compreendemos que o cérebro aprende de formas diferentes em cada estágio da vida, e por isso cada grupo possui um material didático desenhado especificamente para seu desenvolvimento cognitivo:\n\n• Kids: O material escolar é rico em estímulos visuais, tátil e focado na oralidade. As aulas envolvem storytelling (contação de histórias) e jogos de movimento.\n\n• Teens e Adults: O material didático foca em temas contemporâneos, pensamento crítico, gramática contextualizada e situações reais de uso da língua (viagens, trabalho, exames), preparando o aluno para o mundo globalizado."
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
