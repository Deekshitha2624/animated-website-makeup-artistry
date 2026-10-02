import React from 'react';
import { motion } from 'framer-motion';

export const About: React.FC = () => {
  return (
    <section id="about" className="py-24 md:py-36 bg-luxury-black text-gold-50 border-t border-gold-400/5 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          
          {/* Left Column: Image with Luxury Overlay */}
          <div className="lg:col-span-6 order-2 lg:order-1 relative">
            {/* Decorative Gold Frame Offset */}
            <div className="absolute -top-4 -left-4 w-full h-full border border-gold-400/20 translate-x-2 translate-y-2 hidden sm:block" />

            {/* Main Image Container */}
            <div className="relative overflow-hidden bg-luxury-gray aspect-[3/4] shadow-2xl">
              <motion.img
                initial={{ scale: 1.1, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                src="/priya.png"
                alt="Priya - Founder & Lead Makeup Artist"
                className="w-full h-full object-cover"
              />
              {/* Subtle gold-hued gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
            </div>

            {/* Small Floating Detail Label */}
            <div className="absolute bottom-6 left-6 z-20 bg-luxury-black/85 backdrop-blur-md px-6 py-4 border border-gold-400/10">
              <p className="text-[10px] font-sans tracking-[0.25em] text-gold-400 uppercase">Founder & Lead Artist</p>
              <h4 className="font-serif text-lg text-gold-50 tracking-wider mt-1">Priya</h4>
            </div>
          </div>

          {/* Right Column: Editorial Bio Text */}
          <div className="lg:col-span-6 order-1 lg:order-2 flex flex-col justify-center">
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 0.6, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="text-xs font-sans tracking-[0.3em] uppercase text-gold-300 mb-3"
            >
              Meet Priya
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2 }}
              className="font-serif text-3xl md:text-4xl lg:text-5xl tracking-wide uppercase font-light mb-8 leading-snug"
            >
              Founder & Lead Makeup Artist
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, delay: 0.2 }}
              className="font-sans text-sm md:text-base text-gold-100/80 font-light leading-relaxed space-y-6"
            >
              <p className="font-serif italic text-gold-200/90 text-lg md:text-xl pl-4 border-l-2 border-gold-400/40">
                With over 15 years of experience in the beauty industry, Priya has helped hundreds of brides look and feel their absolute best on their special day.
              </p>
              <p>
                Alongside her team of highly skilled makeup artists and hairstylists, she specializes in creating timeless bridal looks tailored to every bride's unique style, skin tone, and personality.
              </p>
              <p>
                From intimate ceremonies to grand weddings, Priya and her team are committed to delivering flawless, long-lasting makeup using premium products and the latest techniques, ensuring every bride walks down the aisle with confidence and elegance.
              </p>
            </motion.div>

            {/* Highlights Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8 pt-10 mt-10 border-t border-gold-400/10">
              <div className="flex items-center gap-3">
                <div className="w-1.5 h-1.5 bg-gold-400 rounded-full shrink-0" />
                <span className="font-sans text-[11px] tracking-widest text-gold-100 uppercase font-medium">15+ Years of Experience</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-1.5 h-1.5 bg-gold-400 rounded-full shrink-0" />
                <span className="font-sans text-[11px] tracking-widest text-gold-100 uppercase font-medium">500+ Happy Brides</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-1.5 h-1.5 bg-gold-400 rounded-full shrink-0" />
                <span className="font-sans text-[11px] tracking-widest text-gold-100 uppercase font-medium">Premium HD & Airbrush Makeup</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-1.5 h-1.5 bg-gold-400 rounded-full shrink-0" />
                <span className="font-sans text-[11px] tracking-widest text-gold-100 uppercase font-medium">Certified Professional Team</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
