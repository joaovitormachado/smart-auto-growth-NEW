import { useEffect } from "react";
import { useTracking } from "@/hooks/useTracking";
import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";

const VSL = () => {
  const { trackEvent } = useTracking();

  useEffect(() => {
    // Rola para o topo ao carregar a página
    window.scrollTo(0, 0);
    trackEvent("view_vsl_page");
  }, []);

  const handleVideoPlay = () => {
    trackEvent("vsl_video_play");
  };

  const handleCtaClick = () => {
    trackEvent("vsl_cta_click");
  };

  const whatsappMessage = encodeURIComponent("Olá, preenchi o formulário e quero adiantar minha consultoria personalizada.");
  const whatsappLink = `https://wa.me/5548988289797?text=${whatsappMessage}`;

  return (
    <main className="min-h-screen bg-zinc-950 text-white flex flex-col items-center py-10 px-4 sm:px-8">
      <div className="max-w-4xl w-full text-center mt-4">
        <h1 className="font-display text-3xl font-black sm:text-5xl lg:text-6xl text-white leading-tight">
          Parabéns! Assista o vídeo explicando nossa reunião...
        </h1>
        <h2 className="mt-4 text-xl font-bold text-red-500 uppercase tracking-widest bg-red-500/10 inline-block px-4 py-1 rounded-full">
          APENAS 2 MINUTOS!
        </h2>

        {/* ÁREA DO VÍDEO VSL */}
        <div className="mt-8 relative aspect-video w-full rounded-2xl overflow-hidden border-2 border-white/10 shadow-premium bg-black">
          {/* Suporte para Iframe, Cloudinary, YouTube ou Local */}
          {/* Substitua o src pelo link final do seu vídeo */}
          <video 
            src="" 
            controls 
            className="w-full h-full object-cover"
            onPlay={handleVideoPlay}
            poster="/video-placeholder.jpg" // Opcional
          />
          {/* Exemplo de iFrame (se usar vimeo/youtube): */}
          {/* <iframe src="URL_AQUI" className="w-full h-full absolute top-0 left-0" allow="autoplay; fullscreen" /> */}
          <div className="absolute inset-0 flex items-center justify-center -z-10 text-zinc-600">
            [Área do Vídeo VSL]
          </div>
        </div>

        {/* CTA */}
        <div className="mt-10 mb-8 flex justify-center">
          <Button 
            variant="cta" 
            size="hero" 
            asChild 
            onClick={handleCtaClick} 
            className="w-full sm:w-auto shadow-cta animate-pulse text-lg"
          >
            <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
              <MessageCircle className="mr-2 h-6 w-6" />
              Adiantar consultoria personalizada
            </a>
          </Button>
        </div>
      </div>
    </main>
  );
};

export default VSL;
