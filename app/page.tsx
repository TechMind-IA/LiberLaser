import { PublicHeader } from '@/components/public-header'
import { HeroSection } from '@/components/hero-section'
import { BenefitsSection } from '@/components/benefits-section'
import { CoursesSection } from '@/components/courses-section'
import { CTASection } from '@/components/cta-section'
import { Footer } from '@/components/footer'

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <PublicHeader />
      <HeroSection />
      <BenefitsSection />
      <CoursesSection />
      <CTASection />
      <Footer />
    </main>
  )
}
