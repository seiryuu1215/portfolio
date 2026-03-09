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
      <FadeIn>
        <AboutSection />
      </FadeIn>
      <FadeIn>
        <CareerSection />
      </FadeIn>
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
