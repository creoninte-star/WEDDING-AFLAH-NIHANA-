import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const PhotoSlideshow = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!images || images.length <= 1) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 4000);
    
    return () => clearInterval(interval);
  }, [images]);

  if (!images || images.length === 0) {
    return (
      <div className="w-full h-full bg-gold/5 flex items-center justify-center">
        <span className="font-serif text-[10px] text-gold/40 italic">Gallery Empty</span>
      </div>
    );
  }

  return (
    <div className="w-full h-full relative group">
      <AnimatePresence mode="wait">
        <motion.img
          key={currentIndex}
          src={images[currentIndex]}
          initial={{ opacity: 0, scale: 1.1, filter: 'blur(10px)' }}
          animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
          exit={{ opacity: 0, scale: 0.95, filter: 'blur(5px)' }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          className="absolute inset-0 w-full h-full object-cover"
          alt="Wedding Moment"
          loading="lazy"
        />
      </AnimatePresence>
      
      {/* Soft Vignette overlay inside the circle */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-60"></div>
      
      {/* Progress dots */}
      {images.length > 1 && (
        <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1.5 z-10">
          {images.map((_, idx) => (
            <div 
              key={idx} 
              className={`w-1 h-1 rounded-full transition-all duration-500 ${idx === currentIndex ? 'bg-gold w-3' : 'bg-gold/30'}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default PhotoSlideshow;
