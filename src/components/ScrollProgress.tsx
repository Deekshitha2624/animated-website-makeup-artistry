import React, { useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import { ArrowUp } from 'lucide-react';

export const ScrollProgress: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const [isVisible, setIsVisible] = useState(false);

  // Smooth out progress updates
  const smoothProgress = useSpring(scrollYProgress, { damping: 40, stiffness: 300 });
  const strokeDashoffset = useTransform(smoothProgress, [0, 1], [252, 0]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-40 w-12 h-12 rounded-full bg-luxury-black/90 border border-gold-400/10 flex items-center justify-center text-gold-400 cursor-pointer shadow-lg shadow-black/50 hover:border-gold-400/40 hover:text-gold-300 transition-colors pointer-events-auto hover-luxury"
          aria-label="Back to Top"
        >
          {/* Circular Scroll Progress Outline */}
          <svg className="absolute inset-0 w-full h-full transform -rotate-90" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="40"
              className="stroke-luxury-gray fill-none"
              strokeWidth="2"
            />
            <motion.circle
              cx="50"
              cy="50"
              r="40"
              className="stroke-gold-400 fill-none"
              strokeWidth="2.5"
              strokeLinecap="round"
              style={{
                strokeDasharray: 252,
                strokeDashoffset,
              }}
            />
          </svg>

          {/* Up Arrow Icon */}
          <ArrowUp size={16} className="relative z-10" />
        </motion.button>
      )}
    </AnimatePresence>
  );
};
