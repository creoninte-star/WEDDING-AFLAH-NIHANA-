import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Sparkles = () => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-gold rounded-full blur-[1px]"
          initial={{ 
            opacity: 0, 
            x: Math.random() * window.innerWidth, 
            y: Math.random() * window.innerHeight 
          }}
          animate={{
            opacity: [0, 0.5, 0],
            y: [null, Math.random() * window.innerHeight - 100],
            x: [null, Math.random() * window.innerWidth + 50]
          }}
          transition={{
            duration: 5 + Math.random() * 5,
            repeat: Infinity,
            delay: Math.random() * 5,
            ease: "linear"
          }}
        />
      ))}
    </div>
  );
};

const AbstractFloral = ({ className }) => (
  <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M10,50 C20,20 80,20 90,50 C80,80 20,80 10,50 Z" fill="currentColor" opacity="0.4"/>
    <path d="M50,10 C20,20 20,80 50,90 C80,80 80,20 50,10 Z" fill="currentColor" opacity="0.3"/>
    <circle cx="50" cy="50" r="10" fill="currentColor" opacity="0.6"/>
  </svg>
);

const SealGuidePigeon = () => (
  <motion.div 
    className="absolute z-[60] pointer-events-none"
    style={{ left: '50%', top: '50%' }}
    initial={{ x: 60, y: -45, opacity: 0 }}
    animate={{ opacity: 1 }}
  >
    <div className="relative -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
      {/* Smaller, Simple Pigeon Silhouette */}
      <div className="relative w-14 h-12">
        <motion.svg 
          viewBox="0 0 100 100" 
          className="w-full h-full text-white/90 drop-shadow-md"
        >
          {/* Wings - Only Flapping Animation */}
          <motion.path 
            d="M50,55 C40,40 25,25 15,35 C5,45 15,65 50,65"
            fill="currentColor"
            animate={{ 
              d: [
                "M50,55 C40,40 25,25 15,35 C5,45 15,65 50,65", 
                "M50,55 C40,65 25,75 15,65 C5,55 15,35 50,55"
              ]
            }}
            transition={{ repeat: Infinity, duration: 0.6, ease: "easeInOut" }}
          />
          {/* Body */}
          <path d="M45,60 C55,48 75,48 85,58 C95,68 85,85 65,80 C55,75 45,70 45,60" fill="currentColor" />
          {/* Head & Beak */}
          <circle cx="85" cy="52" r="5" fill="currentColor" />
          <path d="M90,52 L96,55 L90,58 Z" fill="#D8C2A0" />
        </motion.svg>
      </div>

      {/* Tap Here Label */}
      <motion.div 
        className="mt-1 bg-white/90 px-3 py-1 rounded-full border border-primary-pink/30 shadow-md"
        animate={{ y: [0, -3, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        <div className="flex flex-col items-center">
          <p className="font-sans text-[8px] font-bold uppercase tracking-[0.2em] text-primary-pink whitespace-nowrap">Tap Here</p>
          <div className="w-px h-1.5 bg-primary-pink/40 mt-0.5"></div>
        </div>
      </motion.div>
    </div>
  </motion.div>
);

const HeroEnvelope = ({ onOpen }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    if (isOpen) return;
    setIsOpen(true);
    setTimeout(() => {
      onOpen();
    }, 1200);
  };

  return (
    <motion.div 
      className="fixed inset-0 z-40 flex flex-col items-center justify-center bg-envelope max-w-md mx-auto paper-bg overflow-hidden"
      initial={{ y: 0 }}
      animate={{ y: isOpen ? '100vh' : 0, opacity: isOpen ? 0 : 1 }}
      transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1], delay: 0.5 }}
    >
      
      {/* Background Floral/Motif Corners */}
      <div className="absolute top-0 right-0 w-64 h-64 text-primary-pink/10 translate-x-12 -translate-y-12 rotate-45 pointer-events-none">
        <AbstractFloral className="w-full h-full" />
      </div>
      <div className="absolute bottom-0 left-0 w-64 h-64 text-soft-pink/15 -translate-x-12 translate-y-12 -rotate-45 pointer-events-none">
        <AbstractFloral className="w-full h-full" />
      </div>

      <Sparkles />

      {/* Top Welcome Text */}
      <motion.div 
        className="absolute top-[12%] sm:top-[15%] w-full text-center px-4"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: isOpen ? 0 : 1, y: 0 }}
        transition={{ duration: 1, delay: 0.2 }}
      >
        <p className="font-serif text-[18px] sm:text-[22px] font-bold tracking-widest text-dark-accent italic drop-shadow-[0_2px_4px_rgba(0,0,0,0.1)] leading-relaxed">
          In the Name of Allah,<br className="sm:hidden" /> the Most Gracious, the Most Merciful
        </p>
      </motion.div>

      {/* Floating Envelope Container */}
      <div className="relative w-full max-w-[340px] aspect-[4/3] flex items-center justify-center z-10 transition-all duration-300">
        
        {/* Animated Pigeon Guide */}
        <AnimatePresence>
          {!isOpen && <SealGuidePigeon />}
        </AnimatePresence>

        <div className="relative w-full h-full bg-paper rounded-sm flex items-center justify-center cursor-pointer paper-bg shadow-[0_20px_50px_rgba(0,0,0,0.1),0_10px_20px_rgba(0,0,0,0.05)] transition-transform duration-500 hover:scale-[1.02]" onClick={handleOpen}>
          
          {/* Envelope back folds */}
          <div className="absolute inset-0">
             <svg className="w-full h-full text-secondary-pink/20" viewBox="0 0 100 100" preserveAspectRatio="none">
               <polygon fill="currentColor" points="0,0 50,50 100,0 100,100 0,100" />
             </svg>
          </div>
          
          {/* Flap */}
          <motion.div 
            className="absolute top-0 left-0 w-full h-[60%] origin-top z-20"
            initial={{ rotateX: 0 }}
            animate={{ rotateX: isOpen ? 180 : 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
          >
            <div className="w-full h-full text-envelope relative paper-bg drop-shadow-[0_4px_6px_rgba(0,0,0,0.1)] filter" style={{ clipPath: 'polygon(0 0, 100% 0, 50% 100%)' }}>
              <div className="absolute inset-0 bg-envelope paper-bg"></div>
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                 <polyline stroke="var(--tw-colors-gold)" strokeWidth="1" fill="none" points="0.5,0.5 50,99 99.5,0.5" />
              </svg>
            </div>
            
            {/* Breathing Wax Seal */}
            <motion.div 
              className="absolute left-1/2 -bottom-6 w-16 h-16 -ml-8 rounded-full bg-primary-pink shadow-md flex justify-center items-center cursor-pointer border-2 border-gold z-30"
              animate={
                isOpen ? { scale: 1.2, opacity: 0 } : { scale: [1, 1.05, 1], opacity: 1 }
              }
              transition={
                isOpen ? { duration: 0.4 } : { repeat: Infinity, duration: 2.5, ease: "easeInOut" }
              }
            >
              <div className="w-14 h-14 rounded-full border border-white/30 flex flex-col justify-center items-center text-white bg-secondary-pink/20 shadow-inner">
                <span className="font-serif text-[10px] font-bold tracking-wider leading-none">A&N</span>
                <div className="w-6 border-t border-white/30 my-[2px]"></div>
                <span className="font-serif text-[10px] font-bold tracking-wider leading-none">A&N</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Content peering through underneath */}
          <div className="absolute inset-x-4 top-4 bottom-2 bg-white flex flex-col items-center pt-8 opacity-60 pointer-events-none paper-bg border border-soft-pink/20 z-0 text-center px-4">
             <h2 className="font-serif text-xl text-dark-accent mb-2">You are invited</h2>
          </div>
        </div>
      </div>

      {/* Bottom Instructional Bounce */}
      <motion.div 
        className="absolute bottom-[10%] flex flex-col items-center text-center opacity-90 z-10"
        animate={{ y: [0, -5, 0] }}
        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
      >
        <p className="font-sans text-[10px] font-semibold uppercase tracking-[0.2em] text-dark-accent/80 mb-2">Tap the Seal to Open</p>
        <div className="w-px h-8 bg-gradient-to-b from-dark-accent to-transparent"></div>
      </motion.div>

    </motion.div>
  );
};

export default HeroEnvelope;
