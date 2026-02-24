import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import MilestonesSection from '@/components/MilestonesSection';
import WorksSection from '@/components/WorksSection';
import CareerSection from '@/components/CareerSection';
import SkillsSection from '@/components/SkillsSection';
import ServicesSection from '@/components/ServicesSection';
import DevStyleSection from '@/components/DevStyleSection';
import VisionSection from '@/components/VisionSection';
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
        <WorksSection />
      </FadeIn>
      <FadeIn>
        <CareerSection />
      </FadeIn>
      <FadeIn>
        <SkillsSection />
      </FadeIn>
      <FadeIn>
        <ServicesSection />
      </FadeIn>
      <FadeIn>
        <DevStyleSection />
      </FadeIn>
      <FadeIn>
        <MilestonesSection />
      </FadeIn>
      <FadeIn>
        <VisionSection />
      </FadeIn>
      <FadeIn>
        <ContactSection />
      </FadeIn>
      <Footer />
    </>
  );
}
