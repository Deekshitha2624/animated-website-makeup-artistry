import React from 'react';
import { motion } from 'framer-motion';

interface ServiceItem {
  id: string;
  name: string;
  description: string;
  features: string[];
  image?: string;
}

export const Services: React.FC = () => {
  const servicesList: ServiceItem[] = [
    {
      id: 'bridal',
      name: 'Bridal Makeup',
      description: 'Look flawless on your wedding day with customized HD and Airbrush bridal makeup designed to enhance your natural beauty while lasting throughout every ceremony.',
      features: [
        'HD/Airbrush Makeup',
        'Hairstyling',
        'Saree Draping',
        'Accessories Setting'
      ],
      image: '/bridal.png'
    },
    {
      id: 'engagement',
      name: 'Engagement Makeup',
      description: 'Celebrate your engagement with a fresh, radiant look tailored to your outfit, theme, and personal style.',
      features: [
        'Soft Glam Makeup',
        'Hairstyling',
        'Touch-up Kit'
      ],
      image: '/engagement.png'
    },
    {
      id: 'reception',
      name: 'Reception Makeup',
      description: 'Create a glamorous evening look with elegant makeup, stunning hairstyles, and premium finishing touches for your grand reception.',
      features: [
        'Luxury Makeup',
        'Hair Styling',
        'Eyelashes',
        'Jewelry Setting'
      ],
      image: '/reception.png'
    },
    {
      id: 'party',
      name: 'Party & Guest Makeup',
      description: 'Perfect for bridesmaids, family members, and special occasions, ensuring everyone looks camera-ready.',
      features: [
        'HD & Soft Glam Makeup',
        'Elegant Hairstyling',
        'Lash Application'
      ],
      image: '/party.png'
    },
    {
      id: 'hd-airbrush',
      name: 'HD & Airbrush Makeup',
      description: 'Choose between HD or Airbrush makeup depending on your skin type and event for a flawless, long-lasting finish.',
      features: [
        'Skin Type Analysis',
        'Airbrush Fine Mist Coating',
        'HD Camera-Ready Finish'
      ],
      image: '/hd-airbrush.png'
    },
    {
      id: 'workshops',
      name: 'Makeup Workshops',
      description: 'Learn professional makeup techniques through personalized training sessions for aspiring makeup artists and beauty enthusiasts.',
      features: [
        'Hands-on Practical Training',
        'Product & Kit Consulting',
        'Certified Artistry Course'
      ],
      image: '/workshops.jpg'
    }
  ];

  return (
    <section id="services" className="py-24 md:py-36 bg-luxury-dark text-gold-50 border-t border-gold-400/5 relative overflow-hidden">
      {/* Background Muted Gold Radial Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gold-400/2 blur-[180px] pointer-events-none rounded-full" />

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
            Artistry & Services
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2 }}
            className="font-serif text-4xl md:text-6xl tracking-wide uppercase font-light"
          >
            Our Services
          </motion.h2>
          <div className="w-12 h-[1px] bg-gold-400 mx-auto mt-6" />
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 xl:gap-10">
          {servicesList.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.8, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="group flex flex-col bg-luxury-black/30 border border-gold-400/5 hover:border-gold-400/20 transition-all duration-500 p-6 relative overflow-hidden"
            >
              
              {/* Photo Container */}
              <div className="relative aspect-[3/4] w-full overflow-hidden bg-luxury-black border border-gold-400/5 mb-6 flex items-center justify-center">
                {service.image ? (
                  <motion.img
                    initial={{ scale: 1.1, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                    src={service.image}
                    alt={service.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                ) : (
                  <>
                    {/* Thin inner gold frame */}
                    <div className="absolute inset-2 border border-gold-400/5 group-hover:border-gold-400/15 transition-all duration-500" />
                    
                    {/* Animated soft gold glow behind text */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-gold-400/0 via-gold-400/1 to-gold-400/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                    <span className="font-sans text-[9px] tracking-[0.25em] text-gold-400/30 group-hover:text-gold-400/60 uppercase transition-colors duration-500 select-none">
                      [ Image Placeholder ]
                    </span>
                  </>
                )}
              </div>

              {/* Service Details */}
              <div className="flex-grow flex flex-col">
                <h3 className="font-serif text-xl sm:text-2xl text-gold-50 group-hover:text-gold-300 transition-colors duration-500 uppercase tracking-wider font-light mb-3">
                  {service.name}
                </h3>
                
                <p className="font-sans text-xs text-gold-100/60 leading-relaxed font-light mb-6 flex-grow">
                  {service.description}
                </p>

                <div className="w-full h-[1px] bg-gold-400/10 mb-6" />

                {/* Features list */}
                <div className="flex flex-col gap-2.5">
                  <span className="text-[9px] font-sans tracking-[0.2em] text-gold-200/40 uppercase mb-1">Includes:</span>
                  {service.features.map((feat, i) => (
                    <div key={i} className="flex items-center gap-3 text-xs font-sans font-light text-gold-100/80">
                      <span className="w-1.5 h-1.5 rounded-full bg-gold-400/30 group-hover:bg-gold-400/60 transition-colors shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
