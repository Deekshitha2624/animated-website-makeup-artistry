import { useEffect } from 'react';
import Lenis from 'lenis';
import { Preloader } from './components/Preloader';
import { ScrollProgress } from './components/ScrollProgress';
import { CustomCursor } from './components/CustomCursor';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Services } from './components/Services';
import { Packages } from './components/Packages';
import { About } from './components/About';
import { Testimonials } from './components/Testimonials';
import { FAQ } from './components/FAQ';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { AIChatbot } from './components/AIChatbot';

function App() {
  // Initialize Lenis Smooth Scroll
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Apple-like smooth scroll easing
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.95,
      touchMultiplier: 1.5,
    });

    // Request Animation Frame loop for Lenis
    let rafId: number;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    // Clean up
    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  // Handle smooth scroll to section on navigation click
  const handleNavClick = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const isMobile = window.innerWidth < 768;
      element.scrollIntoView({
        behavior: isMobile ? 'smooth' : 'auto', // Lenis handles desktop scroll smoothly; mobile fallbacks
        block: 'start',
      });
    }
  };

  return (
    <div className="bg-luxury-black text-gold-50 min-h-screen relative selection:bg-gold-400 selection:text-luxury-black">
      {/* Cinematic Split-Door Preloader */}
      <Preloader />

      {/* Trailing Circular Custom Cursor */}
      <CustomCursor />

      {/* Circular Scroll Progress Back-To-Top indicator */}
      <ScrollProgress />

      {/* Transparent Sticky Navigation Header */}
      <Navbar onNavClick={handleNavClick} />

      {/* Main Page Layout */}
      <main>
        {/* Fullscreen Video Hero Section */}
        <Hero />

        {/* Editorial Artist Biography */}
        <About />

        {/* Services Overview */}
        <Services />

        {/* Pricing Packages */}
        <Packages />

        {/* Cinematic Testimonial reviews */}
        <Testimonials />

        {/* Common Questions Accordions */}
        <FAQ />

        {/* Custom Booking Form */}
        <Contact />
      </main>

      {/* Signature Footer */}
      <Footer />

      {/* Floating AI Concierge Chat Agent */}
      <AIChatbot />
    </div>
  );
}

export default App;
