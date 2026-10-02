import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

export const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs: FAQItem[] = [
    {
      question: 'How far in advance should I book my wedding day?',
      answer: 'We recommend booking 6 to 12 months in advance, especially for high-season dates (May through October). Our bookings operate strictly on a first-come, first-served basis, and are secured only with a signed contract and a 30% non-refundable booking deposit.',
    },
    {
      question: 'What brands of makeup do you carry in your luxury kit?',
      answer: 'Our professional kit consists exclusively of premium, high-performance, and camera-ready brands. We select products from luxury houses such as Chanel, Tom Ford, Charlotte Tilbury, Dior Beauty, Hourglass, Giorgio Armani, and Natasha Denona, ensuring flawless wear under high-definition photography and long days.',
    },
    {
      question: 'Is a bridal preview (trial) required?',
      answer: 'While not mandatory, we highly recommend scheduling a bridal preview 8 to 12 weeks before your wedding. This allows us to assess your skin texture, experiment with different styles (from natural radiance to editorial glam), and customize the lash selection so your wedding morning runs perfectly on schedule.',
    },
    {
      question: 'Do you travel on-location and for destination weddings?',
      answer: 'Yes, we are fully mobile and provide luxury styling services on-location worldwide. Custom travel packages, including flights and lodging, can be arranged for destination weddings. Local travel within a 20-mile radius is included in all premium packages.',
    },
    {
      question: 'How long does makeup application take on the wedding day?',
      answer: 'We allocate 90 minutes of dedicated, uninterrupted time for the bride to ensure a relaxing experience. Each additional member of the bridal party requires approximately 45 minutes. A detailed schedule will be sent to you and your planner 30 days prior to the wedding.',
    },
  ];

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-24 md:py-36 bg-luxury-black text-gold-50 border-t border-gold-400/5 relative overflow-hidden">
      
      {/* Background Graphic Lines */}
      <div className="absolute right-0 top-0 w-1/3 h-full border-l border-gold-400/5 pointer-events-none hidden md:block" />

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-16 md:mb-24">
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 0.6, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="text-xs font-sans tracking-[0.3em] uppercase text-gold-300 mb-3"
          >
            Inquiries
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2 }}
            className="font-serif text-4xl md:text-6xl tracking-wide uppercase font-light"
          >
            Common Questions
          </motion.h2>
          <div className="w-12 h-[1px] bg-gold-400 mx-auto mt-6" />
        </div>

        {/* Accordions */}
        <div className="space-y-6">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="border-b border-gold-400/10 pb-6"
              >
                <button
                  onClick={() => handleToggle(index)}
                  className="w-full flex justify-between items-center text-left py-4 group cursor-pointer focus:outline-none"
                >
                  <span className="font-serif text-lg md:text-xl text-gold-100 hover:text-gold-400 transition-colors duration-300 tracking-wide font-light pr-4">
                    {faq.question}
                  </span>
                  <div className="w-8 h-8 rounded-full border border-gold-400/20 flex items-center justify-center text-gold-400 group-hover:border-gold-400/50 transition-colors duration-300 shrink-0">
                    {isOpen ? <Minus size={14} /> : <Plus size={14} />}
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="font-sans text-xs text-gold-100/60 leading-relaxed font-light mt-2 pr-6">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
