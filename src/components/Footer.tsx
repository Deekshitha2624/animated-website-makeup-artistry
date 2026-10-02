import React from 'react';

// Custom masked slide-up social link (Eva Gher motif)
const SocialLink: React.FC<{ href: string; label: string; svgPath: React.ReactNode }> = ({
  href,
  label,
  svgPath,
}) => {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="group relative overflow-hidden h-9 px-6 border border-gold-400/10 hover:border-gold-400/40 rounded-full flex items-center justify-center text-gold-400/60 hover:text-gold-400 transition-all duration-300 cursor-pointer select-none"
    >
      {/* Label sliding up and out */}
      <span className="block font-sans text-[10px] tracking-widest uppercase transition-transform duration-500 ease-[0.76,0,0.24,1] group-hover:-translate-y-8">
        {label}
      </span>
      {/* SVG Icon sliding up from below */}
      <span className="absolute inset-0 flex items-center justify-center translate-y-8 group-hover:translate-y-0 transition-transform duration-500 ease-[0.76,0,0.24,1]">
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
          {svgPath}
        </svg>
      </span>
    </a>
  );
};

export const Footer: React.FC = () => {
  return (
    <footer className="bg-luxury-black text-gold-50 border-t border-gold-400/10 py-16 md:py-24 relative overflow-hidden select-none">
      
      {/* Subtle line details */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-gold-400/15 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 flex flex-col items-center">
        
        {/* Instagram handle header with animating under-line */}
        <div className="text-center mb-16">
          <p className="text-[10px] font-sans tracking-[0.22em] text-gold-300/50 uppercase mb-4 font-light">
            wanna ask more questions and see our work?
          </p>
          <a
            href="https://instagram.com/auramakeup"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative font-serif text-3xl sm:text-5xl md:text-6xl text-gold-50 hover:text-gold-400 transition-colors duration-500 font-light select-text lowercase"
          >
            @aura<span>m</span>akeup
            <span className="absolute bottom-[-6px] left-0 w-full h-[1.5px] bg-gold-400 origin-right scale-x-0 group-hover:scale-x-100 group-hover:origin-left transition-transform duration-[600ms] ease-out" />
          </a>
        </div>

        {/* Social masked links Row */}
        <div className="flex flex-wrap justify-center gap-6 mb-16">
          <SocialLink
            href="https://instagram.com"
            label="Instagram"
            svgPath={
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
            }
          />
          <SocialLink
            href="https://pinterest.com"
            label="Pinterest"
            svgPath={
              <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.966 1.406-5.966s-.359-.72-.359-1.781c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146 1.124.347 2.317.535 3.554.535 6.622 0 11.988-5.367 11.988-11.987C23.987 5.367 18.618 0 12.017 0z" />
            }
          />
          <SocialLink
            href="https://youtube.com"
            label="YouTube"
            svgPath={
              <path d="M23.498 6.163a3.003 3.003 0 00-2.11-2.11C19.517 3.545 12 3.545 12 3.545s-7.517 0-9.388.508a3.003 3.003 0 00-2.11 2.11C0 8.033 0 12 0 12s0 3.967.502 5.837a3.003 3.003 0 002.11 2.11c1.871.508 9.388.508 9.388.508s7.517 0 9.388-.508a3.002 3.002 0 002.11-2.11c.502-1.87.502-5.837.502-5.837s0-3.967-.502-6.163zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
            }
          />
        </div>


        {/* Bottom Credits Block */}
        <div className="border-t border-gold-400/5 w-full pt-8 flex flex-col md:flex-row justify-between items-center text-center gap-4">
          <p className="font-sans text-[9px] tracking-widest text-gold-100/30 uppercase font-light">
            © {new Date().getFullYear()} Aura Makeup. All Rights Reserved.
          </p>
          <div className="flex space-x-6 font-sans text-[9px] tracking-widest text-gold-100/30 uppercase font-light">
            <a href="#privacy" className="hover:text-gold-400 transition-colors">Privacy Policy</a>
            <span className="text-gold-400/20">·</span>
            <a href="#terms" className="hover:text-gold-400 transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
