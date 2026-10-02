import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const Preloader: React.FC = () => {
  const [phase, setPhase] = useState<'logo-in' | 'logo-out' | 'slide-out' | 'hidden'>('logo-in');

  useEffect(() => {
    // Elegant luxury transition timings
    const logoOutTimer = setTimeout(() => setPhase('logo-out'), 1800); // Frame and vertical line draw for 1.8s
    const slideOutTimer = setTimeout(() => setPhase('slide-out'), 2300); // Logo and frame fade out in 500ms, then doors split
    const hiddenTimer = setTimeout(() => setPhase('hidden'), 3200); // Doors slide open in 900ms, then unmount

    // Disable scrolling during load
    document.documentElement.classList.add('lenis-stopped');
    document.body.style.overflow = 'hidden';

    return () => {
      clearTimeout(logoOutTimer);
      clearTimeout(slideOutTimer);
      clearTimeout(hiddenTimer);
      document.documentElement.classList.remove('lenis-stopped');
      document.body.style.overflow = '';
    };
  }, []);

  useEffect(() => {
    if (phase === 'slide-out') {
      document.documentElement.classList.remove('lenis-stopped');
      document.body.style.overflow = '';
    }
  }, [phase]);

  if (phase === 'hidden') return null;

  return (
    <div className="fixed inset-0 z-50 pointer-events-none">
      <AnimatePresence>
        {phase !== 'slide-out' && (
          <>
            {/* Left Door - Slides left, carrying the gold border edge off-screen */}
            <motion.div
              initial={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
              className="absolute left-0 top-0 w-1/2 h-full bg-luxury-black border-r border-gold-400/80 pointer-events-auto"
            />
            {/* Right Door - Slides right, carrying the gold border edge off-screen */}
            <motion.div
              initial={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
              className="absolute right-0 top-0 w-1/2 h-full bg-luxury-black border-l border-gold-400/80 pointer-events-auto"
            />

            {/* Central Vertical Gold Line - Draws from top to bottom at start */}
            {phase !== 'logo-out' && (
              <motion.div
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.5, ease: [0.25, 1, 0.5, 1] }}
                className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-[1.5px] bg-gold-400/90 z-20 origin-top pointer-events-none"
              />
            )}

            {/* Content Container (Logo + SVG Outline Frame) */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
              <motion.div
                initial={{ opacity: 1 }}
                animate={
                  phase === 'logo-in'
                    ? { opacity: 1 }
                    : { opacity: 0, scale: 0.96 }
                }
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="relative flex items-center justify-center w-[340px] h-[210px] sm:w-[540px] sm:h-[320px]"
              >
                {/* SVG Outline Box Frame - Self-drawing border around the logo */}
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 540 320">
                  <motion.rect
                    x="10"
                    y="10"
                    width="520"
                    height="300"
                    rx="1"
                    fill="none"
                    stroke="#c5a059"
                    strokeWidth="1.2"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ duration: 1.6, ease: "easeInOut" }}
                  />
                  {/* Delicate top horizontal accent line inside frame */}
                  <motion.line
                    x1="60"
                    y1="50"
                    x2="480"
                    y2="50"
                    stroke="#c5a059"
                    strokeWidth="0.5"
                    opacity="0.2"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 1.2, delay: 0.4, ease: "easeInOut" }}
                  />
                  {/* Delicate bottom horizontal accent line inside frame */}
                  <motion.line
                    x1="60"
                    y1="270"
                    x2="480"
                    y2="270"
                    stroke="#c5a059"
                    strokeWidth="0.5"
                    opacity="0.2"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 1.2, delay: 0.4, ease: "easeInOut" }}
                  />
                </svg>

                {/* Massive Brand Logo Image fading in inside the self-drawing frame */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 1.2, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="w-full max-w-[280px] sm:max-w-[440px] px-4"
                >
                  <img
                    src="/IMG2.png"
                    alt="Aura Makeup Logo"
                    className="w-full h-auto object-contain"
                  />
                </motion.div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};
