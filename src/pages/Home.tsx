import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import HeroSection from '../sections/home/HeroSection';
import TrustBarSection from '../sections/home/TrustBarSection';
import ValuePropsSection from '../sections/home/ValuePropsSection';
import CapabilitiesSection from '../sections/home/CapabilitiesSection';
import BlogSection from '../sections/home/BlogSection';
import CTASection from '../sections/home/CTASection';

gsap.registerPlugin(ScrollTrigger);

const Home = () => {
  useEffect(() => {
    ScrollTrigger.refresh();
  }, []);

  return (
    <main className="relative">
      {/* Ambient Orb */}
      <div className="ambient-orb" />

      <HeroSection />
      <TrustBarSection />
      <ValuePropsSection />
      <CapabilitiesSection />
      <BlogSection />
      <CTASection />
    </main>
  );
};

export default Home;
