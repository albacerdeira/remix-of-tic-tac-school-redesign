const InstitutionalVideo = () => {
  return (
    <section className="py-20 bg-gradient-hero">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Conheça a <span className="text-primary">Tic Tac School</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-secondary mx-auto mb-6" />
          <p className="text-lg text-muted-foreground">
            Veja um pouco mais sobre nossa escola e metodologia de ensino
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="relative w-full rounded-2xl overflow-hidden shadow-2xl" style={{ paddingBottom: '56.25%' }}>
            <iframe
              src="https://www.youtube.com/embed/U0OYlZaFV9c"
              title="Vídeo Institucional Tic Tac School"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="absolute top-0 left-0 w-full h-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default InstitutionalVideo;
