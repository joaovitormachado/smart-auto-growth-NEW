import { ArrowRight, Bot, Camera, Megaphone, MonitorPlay, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import useEmblaCarousel from "embla-carousel-react";
import { useTracking } from "@/hooks/useTracking";

const flow = [
  { icon: Megaphone, title: "Geramos demanda qualificada com mídia paga" },
  { icon: Bot, title: "CRM + IA + automação" },
  { icon: Users, title: "Treinamento e acompanhamento dos vendedores" },
  { icon: Camera, title: "Consultoria para criação de vídeos e fotos que vendem" },
];

const faqs = [
  {
    question: "Qualquer loja pode participar?",
    answer: "Nosso modelo foi desenvolvido para atender lojas que possam investir a partir de R$ 3.000,00 por mês.",
  },
  {
    question: "É só tráfego pago?",
    answer: "Não! É um funil completo exclusivo para lojas de carro, totalmente personalizado para cada negócio.",
  },
];

const Index = () => {
  const { getUtmLink, trackEvent } = useTracking();
  const [emblaRef] = useEmblaCarousel({ loop: true, align: "center" });

  const handleCtaClick = () => {
    trackEvent("landing_cta_click");
  };

  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* HEADER EXCLUSIVO */}
      <div className="fixed inset-x-0 top-0 z-50 border-b border-white/5 bg-black py-2 text-center text-[0.68rem] font-extrabold uppercase tracking-[0.16em] text-white sm:text-xs">
        EXCLUSIVO PARA LOJAS DE CARROS E CONCESSIONÁRIAS
      </div>

      {/* HERO SECTION */}
      <section className="bg-gradient-hero pt-10 text-white">
        <div className="mx-auto flex min-h-[80vh] max-w-4xl flex-col items-center justify-center px-5 py-10 text-center sm:px-8">
          <h1 className="max-w-3xl font-display text-[1.75rem] font-black leading-[1.15] sm:text-4xl lg:text-5xl text-white">
            Venda de 5 a 10 carros<br className="hidden sm:block" /> nos primeiros 30 dias<br />
            <span className="text-primary">— ou devolvemos o seu dinheiro</span>
          </h1>

          <p className="mt-5 max-w-2xl text-base font-medium leading-relaxed text-zinc-300 sm:text-lg">
            Clientes novos todos os dias + vídeos e fotos que vendem + CRM + treinamento comercial
          </p>

          <div className="mt-8 flex flex-col items-center gap-4 w-full sm:w-auto">
            <Button
              variant="cta"
              size="hero"
              asChild
              onClick={handleCtaClick}
              className="shadow-cta hover:scale-105 transition-transform duration-300 w-full sm:w-auto"
            >
              <Link to={getUtmLink("/formulario")}>
                Solicitar Análise da Minha Loja <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <p className="text-xs text-zinc-500 mt-1">Vagas limitadas por região</p>
          </div>
        </div>
      </section>

      {/* PROVAS SOCIAIS (CARROSSEL) */}
      <section className="px-5 py-14 sm:px-8 bg-zinc-950">
        <div className="mx-auto max-w-6xl text-center">
          <p className="text-sm font-extrabold uppercase tracking-[0.18em] text-primary">Resultados Reais</p>
          <h2 className="mx-auto mt-3 max-w-2xl font-display text-2xl font-black leading-tight text-white sm:text-4xl">
            Lojas que aplicaram o nosso sistema
          </h2>

          <div className="mt-8 overflow-hidden" ref={emblaRef}>
            <div className="flex gap-4 cursor-grab active:cursor-grabbing">
              {/* VIDEO 1 */}
              <div className="flex-[0_0_80%] sm:flex-[0_0_40%] lg:flex-[0_0_28%]">
                <div className="relative aspect-[9/16] w-full overflow-hidden rounded-xl border border-white/10 shadow-premium">
                  <video
                    src="https://res.cloudinary.com/dcivb9z0w/video/upload/v1777939539/Prova_social_2_ijtzzo.mp4"
                    controls
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
              {/* VIDEO 2 */}
              <div className="flex-[0_0_80%] sm:flex-[0_0_40%] lg:flex-[0_0_28%]">
                <div className="relative aspect-[9/16] w-full overflow-hidden rounded-xl border border-white/10 shadow-premium">
                  <video
                    src="https://res.cloudinary.com/dcivb9z0w/video/upload/v1777939544/Prova_social_1_t0pjqk.mp4"
                    controls
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
              {/* IMAGEM 1 */}
              <div className="flex-[0_0_80%] sm:flex-[0_0_40%] lg:flex-[0_0_28%]">
                <div className="relative aspect-[9/16] w-full overflow-hidden rounded-xl border border-white/10 shadow-premium">
                  <img
                    src="https://res.cloudinary.com/dcivb9z0w/image/upload/v1777939355/1_dordca.png"
                    alt="Prova Social"
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                </div>
              </div>
              {/* IMAGEM 2 */}
              <div className="flex-[0_0_80%] sm:flex-[0_0_40%] lg:flex-[0_0_28%]">
                <div className="relative aspect-[9/16] w-full overflow-hidden rounded-xl border border-white/10 shadow-premium">
                  <img
                    src="https://res.cloudinary.com/dcivb9z0w/image/upload/v1777939356/3_m4koje.png"
                    alt="Prova Social"
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                </div>
              </div>
              {/* IMAGEM 3 */}
              <div className="flex-[0_0_80%] sm:flex-[0_0_40%] lg:flex-[0_0_28%]">
                <div className="relative aspect-[9/16] w-full overflow-hidden rounded-xl border border-white/10 shadow-premium">
                  <img
                    src="https://res.cloudinary.com/dcivb9z0w/image/upload/v1777939355/2_fea7iy.png"
                    alt="Prova Social"
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="mt-10">
            <Button variant="cta" size="hero" asChild onClick={handleCtaClick}>
              <Link to={getUtmLink("/formulario")}>
                Quero Resultados Assim <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* O QUE ENTREGAMOS */}
      <section className="bg-zinc-900 px-5 py-14 sm:px-8">
        <div className="mx-auto max-w-6xl text-center">
          <p className="text-sm font-extrabold uppercase tracking-[0.18em] text-primary">O que entregamos</p>
          <h2 className="mx-auto mt-3 max-w-2xl font-display text-2xl font-black leading-tight text-white sm:text-4xl">
            Um sistema simples para<br className="hidden sm:block" /> marcar visitas na loja
          </h2>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {flow.map((step, index) => {
              const Icon = step.icon;
              return (
                <div
                  key={step.title}
                  className="rounded-xl border border-white/5 bg-black/40 p-5 text-left backdrop-blur transition-transform duration-300 hover:-translate-y-1"
                >
                  <Icon className="mb-4 h-7 w-7 text-primary" />
                  <span className="text-xs font-extrabold uppercase tracking-[0.16em] text-zinc-500">
                    Passo 0{index + 1}
                  </span>
                  <h3 className="mt-2 font-display text-base font-bold text-white">{step.title}</h3>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="px-5 py-14 sm:px-8 bg-black">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-center font-display text-2xl font-black text-white sm:text-4xl">
            Dúvidas Frequentes
          </h2>
          <div className="mt-8 grid gap-4">
            {faqs.map((item) => (
              <article
                key={item.question}
                className="rounded-xl border border-white/10 bg-zinc-900/50 p-5 shadow-premium backdrop-blur"
              >
                <h3 className="font-display text-lg font-bold text-white">{item.question}</h3>
                <p className="mt-2 text-base leading-relaxed text-zinc-400">{item.answer}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ESCASSEZ / DISCLAIMER */}
      <section className="bg-gradient-to-t from-zinc-900 to-black px-5 py-16 text-center sm:px-8 border-t border-white/5">
        <div className="mx-auto max-w-2xl">
          <MonitorPlay className="mx-auto mb-5 h-10 w-10 text-primary" />
          <h2 className="font-display text-2xl font-black text-white sm:text-4xl mb-3">
            Atenção! Oportunidade única na região.
          </h2>
          <h3 className="text-lg font-semibold text-primary mb-4">Esse anúncio sairá do ar em breve.</h3>
          <p className="text-base text-zinc-400 mb-8">
            A seleção de parcerias é feita priorizando empresas que estejam alinhadas com nossos critérios e padrão de atendimento.
          </p>

          <Button
            variant="cta"
            size="hero"
            asChild
            onClick={handleCtaClick}
            className="w-full sm:w-auto shadow-cta"
          >
            <Link to={getUtmLink("/formulario")}>
              Verificar Disponibilidade <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>
    </main>
  );
};

export default Index;
