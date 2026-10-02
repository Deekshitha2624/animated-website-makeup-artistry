import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

interface Package {
  id: string;
  name: string;
  price: string;
  tagline: string;
  features: string[];
  isPopular?: boolean;
}

export const Packages: React.FC = () => {
  const packagesList: Package[] = [
    {
      id: 'classic',
      name: 'Classic Elegance',
      price: '$550',
      tagline: 'Ideal for the minimalist bride desiring a clean, glowing, and timeless aesthetic.',
      features: [
        'Bridal day makeup application (90 mins)',
        'Custom skincare base prep & priming',
        'Signature premium lash styling',
        'Bridal day touch-up mini kit',
        'On-location service (travel fees apply)',
      ],
    },
    {
      id: 'diamond',
      name: 'Couture Diamond',
      price: '$950',
      tagline: 'Our signature package offering full trial consultation and premium VIP styling.',
      isPopular: true,
      features: [
        'Bespoke bridal preview & trial (2 hrs)',
        'Wedding day makeup application',
        'Advanced HD camera-ready contouring',
        'Luxury collagen skin mask prep',
        'Styling for 1 guest (Mother or Bridesmaid)',
        'Premium bridal day keepsakes touch-up kit',
      ],
    },
    {
      id: 'royal',
      name: 'Editorial Royal',
      price: '$1,650',
      tagline: 'For the bride who wants a high-fashion lookbook aesthetic and full-day standby styling.',
      features: [
        'Bespoke bridal preview & trial (2 hrs)',
        'Wedding day makeup application',
        'Full-day on-set touch-up standby (6 hrs)',
        'Couture look transition (Day to Reception)',
        'Styling for 3 guests (Bridal Party)',
        'Ultimate luxury touch-up case (Full sizes)',
      ],
    },
  ];

  return (
    <section id="packages" className="py-24 md:py-36 bg-luxury-black text-gold-50 border-t border-gold-400/5 relative overflow-hidden">
      
      {/* Decorative Blur Glows */}
      <div className="absolute top-10 left-10 w-[300px] h-[300px] bg-gold-400/2 blur-[100px] pointer-events-none rounded-full" />
      <div className="absolute bottom-10 right-10 w-[300px] h-[300px] bg-gold-400/2 blur-[100px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-20 md:mb-28">
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 0.6, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="text-xs font-sans tracking-[0.3em] uppercase text-gold-300 mb-3"
          >
            Invest in your memories
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2 }}
            className="font-serif text-4xl md:text-6xl tracking-wide uppercase font-light"
          >
            Luxury Packages
          </motion.h2>
          <div className="w-12 h-[1px] bg-gold-400 mx-auto mt-6" />
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {packagesList.map((pkg, index) => (
            <motion.div
              key={pkg.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className={`flex flex-col p-8 md:p-10 border transition-all duration-500 relative ${
                pkg.isPopular
                  ? 'border-gold-400/60 bg-luxury-dark shadow-xl shadow-gold-400/2'
                  : 'border-gold-400/10 bg-luxury-dark/40 hover:border-gold-400/30'
              }`}
            >
              {/* Popular Badge */}
              {pkg.isPopular && (
                <span className="absolute top-0 right-1/2 translate-x-1/2 -translate-y-1/2 bg-gold-400 text-luxury-black font-sans text-[8px] tracking-[0.25em] font-medium px-4 py-1.5 uppercase">
                  Most Requested
                </span>
              )}

              {/* Package Header */}
              <div className="mb-8">
                <h3 className="font-serif text-2xl text-gold-50 uppercase tracking-wider font-light mb-3">
                  {pkg.name}
                </h3>
                <span className="block font-serif text-4xl md:text-5xl text-gold-400 font-light mb-4">
                  {pkg.price}
                </span>
                <p className="font-sans text-xs text-gold-100/50 leading-relaxed font-light">
                  {pkg.tagline}
                </p>
              </div>

              <div className="w-full h-[1px] bg-gold-400/10 mb-8" />

              {/* Features List */}
              <ul className="space-y-4 mb-10 flex-grow">
                {pkg.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3.5 text-xs font-sans font-light text-gold-100/80 leading-relaxed">
                    <Check size={14} className="text-gold-400 mt-0.5 shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              {/* CTA Button */}
              <button
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                className={`w-full font-sans text-[9px] tracking-[0.25em] font-medium py-4 transition-all duration-500 uppercase rounded-none cursor-pointer ${
                  pkg.isPopular
                    ? 'bg-gold-400 text-luxury-black hover:bg-gold-300 hover-luxury shadow-lg shadow-gold-400/10'
                    : 'border border-gold-400/30 text-gold-400 hover:bg-gold-400 hover:text-luxury-black hover-luxury'
                }`}
              >
                Inquire & Reserve
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
