import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';

interface Testimonial {
  id: number;
  quote: string;
  author: string;
  event: string;
  date: string;
  image?: string;
}

export const Testimonials: React.FC = () => {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0); // -1 for left, 1 for right

  const testimonials: Testimonial[] = [
    {
      id: 1,
      quote: "Priya is a true visionary. My makeup felt completely weightless, looked radiant in photographs, and lasted the entire night. I felt like the most elevated version of myself.",
      author: "Katherine & Marcus",
      event: "Lake Como Wedding",
      date: "September 2025",
      image: '/review1.png',
    },
    {
      id: 2,
      quote: "Booking Aura Makeup was the single best decision I made for my wedding. The makeup was not only jaw-droppingly beautiful, but the team's professional, calming presence transformed my morning prep into an absolute dream. I felt radiant, confident, and completely myself.",
      author: "Isabella & Christian",
      event: "Amalfi Coast Villa",
      date: "August 2025",
      image: '/review2.png',
    },
    {
      id: 3,
      quote: "From the initial trial to the final touch-up, Priya brought a calming, luxury presence to my wedding morning. Her attention to detail and skin-prep is simply unmatched.",
      author: "Sophia & Julian",
      event: "Ritz-Carlton Paris Celebration",
      date: "June 2025",
      image: '/review3.png',
    },
    {
      id: 4,
      quote: "For our luxury bridal editorial campaign, Priya delivered pristine, camera-ready skin with high-fashion sophistication. Her ability to translate moodboards to reality is outstanding.",
      author: "Charlotte B.",
      event: "Editorial Director at Velvet Magazine",
      date: "October 2025",
      image: '/review4.png',
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      handleNext();
    }, 8000);
    return () => clearInterval(timer);
  }, [index]);

  const handlePrev = () => {
    setDirection(-1);
    setIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setDirection(1);
    setIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 100 : -100,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (dir: number) => ({
      x: dir < 0 ? 100 : -100,
      opacity: 0,
    }),
  };

  return (
    <section id="reviews" className="py-24 md:py-36 bg-luxury-dark text-gold-50 border-t border-gold-400/5 relative overflow-hidden">
      {/* Background Subtle Line Pattern */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-gold-400/10 to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-gold-400/10 to-transparent" />

      <div className="max-w-5xl mx-auto px-6 md:px-12 relative z-10 flex flex-col items-center">
        {/* Quote Icon */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 0.2, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="text-gold-400 mb-8"
        >
          <Quote size={48} className="fill-gold-400/10" />
        </motion.div>

        {/* Carousel Content */}
        <div className="w-full relative min-h-[380px] md:min-h-[280px] flex items-center justify-center">
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={index}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="w-full"
            >
              {testimonials[index].image ? (
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center text-center md:text-left max-w-4xl mx-auto">
                  {/* Left: Review Image */}
                  <div className="md:col-span-4 flex justify-center">
                    <div className="relative aspect-[3/4] w-[180px] md:w-[220px] overflow-hidden bg-luxury-black border border-gold-400/10 shadow-2xl">
                      {/* Decorative Frame */}
                      <div className="absolute inset-1 border border-gold-400/5" />
                      <img
                        src={testimonials[index].image}
                        alt={testimonials[index].author}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  {/* Right: Review Quote Details */}
                  <div className="md:col-span-8">
                    <h3 className="font-serif text-xl md:text-2xl lg:text-3xl italic text-gold-100/95 leading-relaxed font-light">
                      “{testimonials[index].quote}”
                    </h3>
                    <div className="mt-6 md:mt-8">
                      <span className="block font-sans text-xs tracking-[0.25em] text-gold-400 uppercase font-medium">
                        {testimonials[index].author}
                      </span>
                      <span className="block font-sans text-[10px] tracking-widest text-gold-100/40 uppercase mt-1">
                        {testimonials[index].event} — {testimonials[index].date}
                      </span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center max-w-3xl mx-auto">
                  <h3 className="font-serif text-2xl md:text-3xl lg:text-4xl italic text-gold-100/95 leading-relaxed font-light">
                    “{testimonials[index].quote}”
                  </h3>
                  <div className="mt-8 md:mt-10">
                    <span className="block font-sans text-xs tracking-[0.25em] text-gold-400 uppercase font-medium">
                      {testimonials[index].author}
                    </span>
                    <span className="block font-sans text-[10px] tracking-widest text-gold-100/40 uppercase mt-1">
                      {testimonials[index].event} — {testimonials[index].date}
                    </span>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation Buttons */}
        <div className="flex items-center gap-6 mt-12">
          <button
            onClick={handlePrev}
            className="w-10 h-10 rounded-full border border-gold-400/20 hover:border-gold-400 text-gold-400 hover:text-gold-300 flex items-center justify-center transition-all duration-300 hover-luxury cursor-pointer"
            aria-label="Previous Testimonial"
          >
            <ChevronLeft size={18} />
          </button>
          
          {/* Indicators */}
          <div className="flex gap-2.5">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  setDirection(i > index ? 1 : -1);
                  setIndex(i);
                }}
                className={`h-[3px] rounded-full transition-all duration-500 cursor-pointer ${
                  i === index ? 'w-6 bg-gold-400' : 'w-2 bg-gold-400/20 hover:bg-gold-400/40'
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>

          <button
            onClick={handleNext}
            className="w-10 h-10 rounded-full border border-gold-400/20 hover:border-gold-400 text-gold-400 hover:text-gold-300 flex items-center justify-center transition-all duration-300 hover-luxury cursor-pointer"
            aria-label="Next Testimonial"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </section>
  );
};
