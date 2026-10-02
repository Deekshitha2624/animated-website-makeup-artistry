import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

interface NavbarProps {
  onNavClick: (sectionId: string) => void;
}

const NAV_ITEMS = [
  { label: 'Home', id: 'home' },
  { label: 'About', id: 'about' },
  { label: 'Services', id: 'services' },
  { label: 'Packages', id: 'packages' },
  { label: 'Reviews', id: 'reviews' },
  { label: 'FAQ', id: 'faq' },
  { label: 'Contact', id: 'contact' },
];

// Dark gold filled hover and selection link component
const AnimatedLink: React.FC<{ label: string; onClick: () => void; isSelected?: boolean }> = ({
  label,
  onClick,
  isSelected,
}) => {
  return (
    <button
      onClick={onClick}
      className={`group font-sans text-xs tracking-[0.22em] uppercase transition-all duration-500 cursor-pointer font-bold relative px-4 py-2 flex items-center select-none rounded-none border border-transparent ${
        isSelected
          ? 'bg-[#251e12] text-gold-400 border-gold-400/20 shadow-lg shadow-black/40'
          : 'text-white hover:text-gold-400 hover:bg-[#251e12]/40 hover:border-gold-400/10'
      }`}
    >
      <span className={`mr-1.5 transition-all duration-500 font-medium ${
        isSelected ? 'text-gold-400' : 'text-gold-400/30 group-hover:text-gold-400'
      }`}>
        {'{'}
      </span>
      <span className="relative">
        {label}
      </span>
      <span className={`ml-1.5 transition-all duration-500 font-medium ${
        isSelected ? 'text-gold-400' : 'text-gold-400/30 group-hover:text-gold-400'
      }`}>
        {'}'}
      </span>
    </button>
  );
};

export const Navbar: React.FC<NavbarProps> = ({ onNavClick }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  // Scroll handler for background and scroll spy
  useEffect(() => {
    const handleScroll = () => {
      // Scrolled state
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // Scroll Spy active tracking
      const scrollPosition = window.scrollY + 160; // offset for nav header height + margin
      
      const sections = NAV_ITEMS.map((item) => {
        const el = document.getElementById(item.id);
        if (el) {
          return { id: item.id, offsetTop: el.offsetTop, offsetHeight: el.offsetHeight };
        }
        return null;
      }).filter(Boolean);

      const current = sections.find((sec) => {
        if (!sec) return false;
        return scrollPosition >= sec.offsetTop && scrollPosition < sec.offsetTop + sec.offsetHeight;
      });

      if (current) {
        setActiveSection(current.id);
      }
    };

    window.addEventListener('scroll', handleScroll);
    // Initial call to set active section on mount
    setTimeout(handleScroll, 100);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleItemClick = (id: string) => {
    setIsMobileMenuOpen(false);
    onNavClick(id);
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-45 transition-all duration-500 ease-out ${
          isScrolled
            ? 'bg-luxury-black/95 backdrop-blur-md border-b border-gold-400/10 py-3.5 shadow-lg shadow-black/30'
            : 'bg-luxury-black lg:bg-transparent border-b border-gold-400/10 lg:border-transparent py-4 lg:py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
          
          {/* Brand Logo */}
          <button
            onClick={() => handleItemClick('home')}
            className="font-serif text-2xl sm:text-3xl tracking-[0.18em] text-gold-400 hover:text-gold-300 transition-colors uppercase cursor-pointer font-bold"
          >
            AURA <span className="font-normal text-white">Makeup</span>
          </button>

          {/* Right Side: Desktop Nav links & Book Now CTA */}
          <div className="hidden lg:flex items-center space-x-4 xl:space-x-6">
            {NAV_ITEMS.map((item) => (
              <AnimatedLink
                key={item.id}
                label={item.label}
                onClick={() => handleItemClick(item.id)}
                isSelected={activeSection === item.id}
              />
            ))}
            <button
              onClick={() => handleItemClick('contact')}
              className="font-sans text-[11px] tracking-[0.2em] font-bold border border-gold-400/40 hover:border-gold-400 text-gold-400 hover:text-luxury-black hover:bg-gold-400 px-5 py-2.5 transition-all duration-500 uppercase rounded-none hover-luxury"
            >
              Book Now
            </button>
          </div>

          {/* Mobile Menu Icon */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden text-gold-400 hover:text-gold-300 transition-colors flex items-center gap-2 cursor-pointer z-50"
            aria-label="Toggle Menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

        </div>
      </nav>

      {/* Fullscreen Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 bg-luxury-black/98 z-30 flex flex-col justify-center items-center lg:hidden"
          >
            {/* Grid Line Decoration */}
            <div className="absolute top-0 bottom-0 left-1/2 w-[1px] bg-gold-400/5 pointer-events-none" />
            <div className="absolute left-0 right-0 top-1/2 h-[1px] bg-gold-400/5 pointer-events-none" />

            <div className="flex flex-col space-y-7 text-center relative z-10">
              {NAV_ITEMS.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 25 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.08, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className="flex justify-center"
                >
                  <div className="scale-110">
                    <AnimatedLink
                      label={item.label}
                      onClick={() => handleItemClick(item.id)}
                      isSelected={activeSection === item.id}
                    />
                  </div>
                </motion.div>
              ))}
              <motion.button
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: NAV_ITEMS.length * 0.08, duration: 0.8 }}
                onClick={() => handleItemClick('contact')}
                className="mt-6 font-sans text-xs tracking-[0.2em] border border-gold-400 text-gold-400 px-8 py-3 uppercase hover:bg-gold-400 hover:text-luxury-black transition-colors"
              >
                Book Now
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
