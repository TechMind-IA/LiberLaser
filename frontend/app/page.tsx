import PublicHeader from "@/components/public-header";
import HeroSection from "@/components/hero-section";
import SobreSection from "@/components/sobre-section";
import ServicosSection from "@/components/servicos-section";
import DiferencialSection from "@/components/diferencial-section";
import ParaQuemSection from "@/components/paraquem-section";
import PlanosSection from "@/components/planos-section";
import FaqSection from "@/components/faq-section";
import CtaSection from "@/components/cta-section";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <main>
      <PublicHeader />
      <HeroSection />
      <SobreSection />
      <ServicosSection />
      <DiferencialSection />
      <ParaQuemSection />
      <PlanosSection />
      <FaqSection />
      <CtaSection />
      <Footer />
    </main>
  );
}
