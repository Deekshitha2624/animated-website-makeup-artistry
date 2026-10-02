import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

export const Hero: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  // Customize this value (in seconds) to match the exact start of the bridal photo transitions
  // (Logo plays once from 0s to 4s, then loops photos only from 4s to 10s)
  const PHOTO_LOOP_START = 4.0; 

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleLoop = () => {
      // Reset back to the photo transitions instead of the logo intro
      video.currentTime = PHOTO_LOOP_START;
      video.play().catch((err) => console.log('Video loop play interrupted:', err));
    };

    const handleTimeUpdate = () => {
      // Check if video is nearing its end (e.g. within 0.15s of ending)
      if (!isNaN(video.duration) && video.currentTime >= video.duration - 0.15) {
        handleLoop();
      }
    };

    const handleEnded = () => {
      handleLoop();
    };

    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('ended', handleEnded);

    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('ended', handleEnded);
    };
  }, []);

  return (
    <section id="home" className="relative mt-[64px] lg:mt-0 h-auto aspect-video sm:h-screen w-full overflow-hidden flex items-center justify-center bg-luxury-black">
      
      <video
        ref={videoRef}
        autoPlay
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover"
      >
        <source src="/hero.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Elegant dark vignette gradient overlay to blend video with page background */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-luxury-black z-10" />

      {/* Eva Gher Custom Minimal Bouncing SVG Arrow at the bottom center */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ delay: 1.4, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 hidden sm:flex flex-col items-center cursor-pointer hover:opacity-85 transition-opacity"
        onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
      >
        <div className="animate-bounce duration-[1500ms]">
          <svg
            viewBox="0 0 30 18"
            className="w-7 h-4 fill-none stroke-gold-400 stroke-[1.5]"
          >
            <path d="M27.81 2.84a1 1 0 0 0-1.32-.52c-.21.09-5 2.29-11.6 11.23C8.3 4.61 3.5 2.41 3.3 2.32a1 1 0 0 0-.81 1.83s5 2.3 11.59 11.67c0 0 .07 0 .1.08a.66.66 0 0 0 .14.15h.07l.11.06a1.1 1.1 0 0 0 .39.09 1.1 1.1 0 0 0 .39-.09l.1-.06h.08a1 1 0 0 0 .14-.15s.08-.05.1-.08C22.34 6.47 27.24 4.18 27.3 4.15a1 1 0 0 0 .51-1.31z" />
          </svg>
        </div>
      </motion.div>

    </section>
  );
};
