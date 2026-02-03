import { useState } from "react";
import { Play } from "lucide-react";

const InstitutionalVideo = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const videoId = "U0OYlZaFV9c";
  const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;

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
          <div 
            className="relative w-full rounded-2xl overflow-hidden shadow-2xl bg-foreground/10" 
            style={{ paddingBottom: '56.25%' }}
          >
            {!isLoaded ? (
              <button
                onClick={() => setIsLoaded(true)}
                className="absolute inset-0 w-full h-full cursor-pointer group"
                aria-label="Reproduzir vídeo institucional"
              >
                <img
                  src={thumbnailUrl}
                  alt="Thumbnail do vídeo institucional Tic Tac School"
                  className="absolute inset-0 w-full h-full object-cover"
                  loading="lazy"
                  width={1280}
                  height={720}
                />
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                    <Play className="w-10 h-10 text-primary-foreground ml-1" />
                  </div>
                </div>
              </button>
            ) : (
              <iframe
                src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1&hd=1`}
                title="Vídeo Institucional Tic Tac School"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="absolute top-0 left-0 w-full h-full"
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default InstitutionalVideo;
