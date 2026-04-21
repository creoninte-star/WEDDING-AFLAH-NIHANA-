import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const PhotoSlideshow = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!images || images.length <= 1) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [images]);

  if (!images || images.length === 0) {
    return (
      <div className="w-full h-full bg-gold/5 flex items-center justify-center border border-gold/10 rounded-2xl overflow-hidden">
        <span className="font-serif text-[10px] text-gold/40 italic">Gallery Empty</span>
      </div>
    );
  }

  return (
    <div className="w-full h-full relative group rounded-2xl overflow-hidden">
      {/* Premium Border Overlay */}
      <div className="absolute inset-0 border-[8px] border-white/40 z-20 pointer-events-none rounded-2xl shadow-[inset_0_0_20px_rgba(0,0,0,0.1)]"></div>
      <div className="absolute inset-2 border border-gold/20 z-20 pointer-events-none rounded-xl"></div>
      
      <AnimatePresence mode="wait">
        <motion.div
           key={currentIndex}
           className="absolute inset-0 w-full h-full"
           initial={{ opacity: 0, scale: 1.15 }}
           animate={{ opacity: 1, scale: 1.05 }}
           exit={{ opacity: 0, scale: 1 }}
           transition={{ duration: 2.5, ease: [0.43, 0.13, 0.23, 0.96] }}
        >
          <img
            src={images[currentIndex]}
            className="w-full h-full object-cover"
            alt="Wedding Moment"
            loading="lazy"
          />
          {/* Gentle cinematic overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-black/10 mix-blend-overlay"></div>
        </motion.div>
      </AnimatePresence>
      
      {/* Decorative Corner Accents */}
      <div className="absolute top-4 left-4 w-4 h-4 border-t-2 border-l-2 border-gold/40 z-30"></div>
      <div className="absolute top-4 right-4 w-4 h-4 border-t-2 border-r-2 border-gold/40 z-30"></div>
      <div className="absolute bottom-4 left-4 w-4 h-4 border-b-2 border-l-2 border-gold/40 z-30"></div>
      <div className="absolute bottom-4 right-4 w-4 h-4 border-b-2 border-r-2 border-gold/40 z-30"></div>

      {/* Elegant minimalist progress dots */}
      {images.length > 1 && (
        <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-2 z-30">
          {images.map((_, idx) => (
            <motion.div 
              key={idx} 
              className={`h-[2px] rounded-full bg-gold/80`}
              initial={false}
              animate={{ 
                width: idx === currentIndex ? 24 : 8,
                opacity: idx === currentIndex ? 1 : 0.4
              }}
              transition={{ duration: 0.8 }}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default PhotoSlideshow;
