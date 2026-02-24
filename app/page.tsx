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

export default function Home() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <MilestonesSection />
      <WorksSection />
      <CareerSection />
      <SkillsSection />
      <ServicesSection />
      <DevStyleSection />
      <VisionSection />
      <ContactSection />
      <Footer />
    </>
  );
}
