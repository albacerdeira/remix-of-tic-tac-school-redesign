import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const PoliticaDePrivacidade = () => {
  const currentDate = new Date().toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="min-h-screen bg-muted/30">
      <div className="container mx-auto px-4 py-12 max-w-3xl">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-primary hover:text-primary-dark transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Voltar ao início
        </Link>

        <article className="bg-background rounded-2xl shadow-lg p-8 md:p-12">
          <header className="mb-8 border-b border-border pb-6">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
              Política de Privacidade
            </h1>
            <p className="text-muted-foreground text-sm">
              Última atualização: {currentDate}
            </p>
          </header>

          <div className="prose prose-lg max-w-none text-foreground/90 space-y-6">
            <p className="text-lg leading-relaxed">
              Nós levamos sua privacidade a sério. Esta política descreve como
              coletamos, usamos e protegemos suas informações ao visitar nosso
              site.
            </p>

            <section>
              <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">
                Coleta de Dados e Cookies
              </h2>
              <p className="leading-relaxed">
                Utilizamos tecnologias de rastreamento, como cookies e pixels,
                para melhorar a funcionalidade do site, analisar o tráfego e
                personalizar conteúdos e anúncios. Essas ferramentas podem
                coletar informações como seu endereço IP, tipo de navegador,
                páginas visitadas e tempo de permanência.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">
                Uso de Serviços de Terceiros
              </h2>
              <p className="leading-relaxed">
                Para operar nosso site e realizar campanhas de marketing,
                compartilhamos dados de navegação estritamente necessários com
                parceiros de análise e publicidade. Estes serviços nos ajudam a
                entender o comportamento do usuário (analítica) e a medir a
                eficácia de nossas campanhas publicitárias. Não vendemos seus
                dados pessoais diretamente identificáveis.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">
                Seus Direitos
              </h2>
              <p className="leading-relaxed">
                Você pode configurar seu navegador para recusar cookies ou
                utilizar nosso banner de consentimento para gerenciar suas
                preferências. A continuação do uso do site implica na aceitação
                destas práticas.
              </p>
            </section>
          </div>
        </article>
      </div>
    </div>
  );
};

export default PoliticaDePrivacidade;
