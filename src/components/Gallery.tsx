import React, { useState } from 'react';
import { motion, AnimatePresence, useScroll, useVelocity, useTransform, useSpring } from 'framer-motion';
import { X, ArrowUpRight } from 'lucide-react';

interface Album {
  id: string;
  src: string;
  title: string;
  tag: string;
  date: string;
  description: string;
  position: 'left' | 'right';
}

// Single Album Row component that handles scroll skewing dynamically
const AlbumRow: React.FC<{ album: Album; onSelect: () => void }> = ({ album, onSelect }) => {
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);

  // Map scroll velocity to skewY degrees (-4 to 4 degrees)
  const skewYVal = useTransform(scrollVelocity, [-1500, 0, 1500], [-3, 0, 3]);
  const skewY = useSpring(skewYVal, { damping: 50, stiffness: 400 });

  const isLeft = album.position === 'left';

  return (
    <motion.div
      style={{ skewY }}
      className={`flex flex-col md:flex-row items-center gap-10 md:gap-16 py-12 md:py-20 border-b border-gold-400/5 ${
        isLeft ? 'md:flex-row' : 'md:flex-row-reverse'
      }`}
    >
      {/* Thumbnail Container */}
      <div className="w-full md:w-1/2 overflow-hidden bg-luxury-gray relative group cursor-pointer" onClick={onSelect}>
        <motion.div
          initial={{ scale: 1.05 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="aspect-[4/3] w-full h-full overflow-hidden"
        >
          <img
            src={album.src}
            alt={album.title}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-[1500ms] group-hover:scale-105"
          />
        </motion.div>
        {/* Subtle border outline reveal on hover */}
        <div className="absolute inset-4 border border-gold-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
      </div>

      {/* Info Content Container */}
      <div className="w-full md:w-1/2 flex flex-col justify-center">
        <div className="max-w-md">
          {/* Subtitle tag + Date bracket */}
          <div className="flex items-center gap-4 text-[10px] font-sans tracking-[0.25em] text-gold-300 uppercase mb-3 font-light">
            <span>{album.tag}</span>
            <span className="text-gold-400/35">
              {'{'} {album.date} {'}'}
            </span>
          </div>

          {/* Title with sliding underline animation */}
          <button
            onClick={onSelect}
            className="font-serif text-3xl sm:text-4xl text-gold-50 hover:text-gold-400 transition-colors uppercase tracking-wider text-left font-light mb-4 relative cursor-pointer group/title"
          >
            {album.title}
            <span className="absolute bottom-0 left-0 w-full h-[1px] bg-gold-400 origin-right scale-x-0 group-hover/title:scale-x-100 group-hover/title:origin-left transition-transform duration-500" />
          </button>

          {/* Description */}
          <p className="font-sans text-sm text-gold-100/60 leading-relaxed font-light mb-6">
            {album.description}
          </p>

          {/* View Album CTA (inspired by circular arrow svg) */}
          <button
            onClick={onSelect}
            className="flex items-center gap-2 font-sans text-[10px] tracking-[0.2em] uppercase text-gold-400 hover:text-gold-300 transition-colors duration-300 cursor-pointer"
          >
            <span>View Album</span>
            <ArrowUpRight size={14} />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export const Gallery: React.FC = () => {
  const [selectedAlbum, setSelectedAlbum] = useState<Album | null>(null);

  const albums: Album[] = [
    {
      id: 'mittu',
      src: '/IMG1.png',
      title: 'Mittu Bridal',
      tag: 'Bespoke Bridal',
      date: '24/09/2025',
      description: 'Luminous dewiness and minimalist bone structures tailored for a luxury modern bridal look in Barcelona.',
      position: 'left',
    },
    {
      id: 'scarves',
      src: '/IMG3.png',
      title: 'Wind & Scarves',
      tag: 'Fashion Editorial',
      date: '12/11/2025',
      description: 'Adaptable creative campaign makeup exploring fine light-reflecting pigmentations and bold color contrasts.',
      position: 'right',
    },
    {
      id: 'mondays',
      src: '/IMG4.png',
      title: 'Silk Sundays',
      tag: 'Personal Collection',
      date: '10/01/2026',
      description: 'A study in glass-like complexions, soft velvet contour highlights, and structural eye liner definition.',
      position: 'left',
    },
    {
      id: 'evagher',
      src: '/IMG5.png',
      title: 'Couture Radiance',
      tag: 'Classic Bridal',
      date: '18/02/2026',
      description: 'Flawless camera-ready traditional bridal glam utilizing premium long-wear setting techniques.',
      position: 'right',
    },
  ];

  return (
    <section id="gallery" className="py-24 md:py-36 bg-luxury-black text-gold-50 border-t border-gold-400/5 relative overflow-hidden">
      
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Parallax Header Section (Eva Gher "Latest & Greatest" look) */}
        <div className="mb-20">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 0.15, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="select-none pointer-events-none"
          >
            <span className="font-serif text-6xl sm:text-8xl md:text-9xl lg:text-[11rem] tracking-wider uppercase font-light text-gold-200">
              Latest &
            </span>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col md:flex-row md:items-end justify-between -mt-4 md:-mt-10 pl-6 md:pl-20"
          >
            <h2 className="font-serif text-4xl sm:text-6xl md:text-7xl tracking-wide uppercase font-light text-gold-400 select-none">
              Greatest
            </h2>
            <p className="text-xs font-sans text-gold-100/50 tracking-widest uppercase font-light max-w-xs mt-4 md:mt-0 leading-relaxed pl-2 border-l border-gold-400/20">
              Selected recent works, highlighting the natural synergy of editorial fashion and luxury bridal beauty.
            </p>
          </motion.div>
        </div>

        {/* Alternating Rows Grid */}
        <div className="flex flex-col mt-12">
          {albums.map((album) => (
            <AlbumRow
              key={album.id}
              album={album}
              onSelect={() => setSelectedAlbum(album)}
            />
          ))}
        </div>

      </div>

      {/* Lightbox Modal overlay view */}
      <AnimatePresence>
        {selectedAlbum && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedAlbum(null)}
            className="fixed inset-0 bg-luxury-black/96 z-50 flex items-center justify-center p-4 md:p-8 cursor-zoom-out"
          >
            <button
              onClick={() => setSelectedAlbum(null)}
              className="absolute top-6 right-6 text-gold-50 hover:text-gold-400 transition-colors p-2 z-50 cursor-pointer"
            >
              <X size={28} />
            </button>

            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="max-w-5xl w-full max-h-[85vh] flex flex-col md:flex-row bg-luxury-dark border border-gold-400/10 overflow-hidden shadow-2xl relative"
            >
              {/* Media Block */}
              <div className="md:w-3/5 bg-luxury-black flex justify-center items-center overflow-hidden">
                <img
                  src={selectedAlbum.src}
                  alt={selectedAlbum.title}
                  className="max-h-[50vh] md:max-h-[80vh] w-full object-contain"
                />
              </div>

              {/* Text details side-pane */}
              <div className="md:w-2/5 p-8 md:p-12 flex flex-col justify-center bg-luxury-gray/30 border-t md:border-t-0 md:border-l border-gold-400/10">
                <span className="text-[10px] font-sans tracking-[0.3em] uppercase text-gold-400 mb-3 block">
                  {selectedAlbum.tag} Collection
                </span>
                <h3 className="font-serif text-3xl md:text-4xl text-gold-50 tracking-wide uppercase font-light mb-4">
                  {selectedAlbum.title}
                </h3>
                <div className="w-8 h-[1px] bg-gold-400 mb-6" />
                <p className="text-xs md:text-sm font-sans text-gold-100/70 font-light leading-relaxed mb-8">
                  This signature series was designed using advanced blending, light-reflective pigmentations, and long-lasting couture formulations to highlight raw, natural elegance under camera flashes and candlelight.
                </p>
                <div className="pt-6 border-t border-gold-400/10 flex flex-col gap-2 mt-auto">
                  <span className="text-[9px] font-sans tracking-widest text-gold-200/40 uppercase">Publication Date:</span>
                  <span className="text-xs font-sans font-light text-gold-100/80">{selectedAlbum.date}</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
};
