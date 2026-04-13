import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import HeroSection from '../sections/home/HeroSection';
import TrustBarSection from '../sections/home/TrustBarSection';
import FeatureCardSection from '../sections/home/FeatureCardSection';
import AdaptiveSection from '../sections/home/AdaptiveSection';
import HumanCenteredSection from '../sections/home/HumanCenteredSection';
import EthicalSection from '../sections/home/EthicalSection';
import DeploySection from '../sections/home/DeploySection';
import CapabilitiesSection from '../sections/home/CapabilitiesSection';
import BlogSection from '../sections/home/BlogSection';
import CTASection from '../sections/home/CTASection';

gsap.registerPlugin(ScrollTrigger);

const Home = () => {
  useEffect(() => {
    // Wait for all sections to mount and create their ScrollTriggers
    const timer = setTimeout(() => {
      const pinned = ScrollTrigger.getAll()
        .filter(st => st.vars.pin)
        .sort((a, b) => a.start - b.start);

      const maxScroll = ScrollTrigger.maxScroll(window);

      if (!maxScroll || pinned.length === 0) return;

      // Build pinned ranges and snap targets from actual ScrollTrigger positions
      const pinnedRanges = pinned.map(st => ({
        start: st.start / maxScroll,
        end: (st.end ?? st.start) / maxScroll,
        center: (st.start + ((st.end ?? st.start) - st.start) * 0.5) / maxScroll,
      }));

      // Create global snap
      ScrollTrigger.create({
        snap: {
          snapTo: (value: number) => {
            // Check if within any pinned range (with buffer)
            const inPinned = pinnedRanges.some(
              r => value >= r.start - 0.02 && value <= r.end + 0.02
            );

            if (!inPinned) return value; // Flowing section: free scroll

            // Find nearest pinned center
            const target = pinnedRanges.reduce((closest, r) =>
              Math.abs(r.center - value) < Math.abs(closest - value) ? r.center : closest,
              pinnedRanges[0]?.center ?? 0
            );

            return target;
          },
          duration: { min: 0.15, max: 0.35 },
          delay: 0,
          ease: 'power2.out'
        }
      });
    }, 100);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <main className="relative">
      {/* Ambient Orb */}
      <div className="ambient-orb" />

      {/* Pinned Sections */}
      <HeroSection />
      <TrustBarSection />
      <FeatureCardSection />
      <AdaptiveSection />
      <HumanCenteredSection />
      <EthicalSection />
      <DeploySection />

      {/* Flowing Sections */}
      <CapabilitiesSection />
      <BlogSection />
      <CTASection />
    </main>
  );
};

export default Home;
