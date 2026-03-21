import PublicHeader from "@/components/public-header";
import HeroSection from "@/components/hero-section";
import DividerBar from "@/components/divider-bar";
import SobreSection from "@/components/sobre-section";
import ServicosSection from "@/components/servicos-section";
import DiferenciaisSection from "@/components/diferenciais-section";
import PlanosSection from "@/components/planos-section";
import CtaSection from "@/components/cta-section";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <main>
      <PublicHeader />
      <HeroSection />
      <DividerBar />
      <SobreSection />
      <ServicosSection />
      <DiferenciaisSection />
      <PlanosSection />
      <CtaSection />
      <Footer />
    </main>
  );
}