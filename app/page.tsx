import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import MilestonesSection from '@/components/MilestonesSection';
import WorksSection from '@/components/WorksSection';
import CareerSection from '@/components/CareerSection';
import SkillsSection from '@/components/SkillsSection';

import NextStepSection from '@/components/NextStepSection';
import FAQSection from '@/components/FAQSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';
import FadeIn from '@/components/FadeIn';

export default function Home() {
  return (
    <>
      <HeroSection />
      <div className="section-divider" />
      <FadeIn>
        <AboutSection />
      </FadeIn>
      <div className="section-divider" />
      <FadeIn>
        <CareerSection />
      </FadeIn>
      <div className="section-divider" />
      <FadeIn>
        <WorksSection />
      </FadeIn>
      <FadeIn>
        <SkillsSection />
      </FadeIn>
      <FadeIn>
        <MilestonesSection />
      </FadeIn>
      <FadeIn>
        <NextStepSection />
      </FadeIn>
      <FadeIn>
        <FAQSection />
      </FadeIn>
      <FadeIn>
        <ContactSection />
      </FadeIn>
      <Footer />
    </>
  );
}
