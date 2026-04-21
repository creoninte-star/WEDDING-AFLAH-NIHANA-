import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import PhotoSlideshow from './PhotoSlideshow';

const couplePhotos = [
  "/aflah and nihana/WhatsApp Image 2026-04-21 at 6.13.42 PM.jpeg",
  "/aflah and nihana/WhatsApp Image 2026-04-21 at 6.13.43 PM.jpeg"
];

const MandalaBackdrop = ({ scrollYProgress }) => {
  const rotation1 = useTransform(scrollYProgress, [0, 1], [0, 180]);
  const rotation2 = useTransform(scrollYProgress, [0, 1], [0, -180]);
  const opacity = useTransform(scrollYProgress, [0.1, 0.3], [0, 0.1]);

  return (
    <div className="absolute inset-0 pointer-events-none flex flex-col justify-between items-center overflow-hidden z-0">
      <motion.div 
        className="w-[150vw] h-[150vw] sm:w-[800px] sm:h-[800px] -mt-[75vw] sm:-mt-[400px] rounded-full border border-soft-pink/20 flex items-center justify-center"
        style={{ rotate: rotation1, opacity, willChange: 'transform' }}
      >
         <div className="w-[85%] h-[85%] rounded-full border border-primary-pink/10" />
      </motion.div>
      <motion.div 
        className="w-[150vw] h-[150vw] sm:w-[800px] sm:h-[800px] -mb-[75vw] sm:-mb-[400px] rounded-full border border-soft-pink/20 flex items-center justify-center"
        style={{ rotate: rotation2, opacity, willChange: 'transform' }}
      >
         <div className="w-[85%] h-[85%] rounded-full border border-primary-pink/10" />
      </motion.div>
    </div>
  );
};

const OrnateSingleCard = ({ pathDraw }) => (
  <div className="w-full h-full relative p-6 flex flex-col items-center z-10 paper-bg bg-paper shadow-2xl rounded-t-[160px] rounded-b-xl border-[3px] border-white/60 overflow-hidden transform-gpu">
    {/* Border Frame */}
    <div className="absolute inset-0 rounded-t-[156px] rounded-b-lg border border-primary-pink/20 pointer-events-none z-10"></div>

    <svg className="absolute inset-2 w-[calc(100%-16px)] h-[calc(100%-16px)] rounded-t-[140px] rounded-b-md pointer-events-none z-10" preserveAspectRatio="none">
      <motion.rect 
        width="100%" height="100%" rx="8" 
        stroke="#D9858F" strokeWidth="1" fill="none" opacity="0.3"
        style={{ pathLength: pathDraw }}
      />
    </svg>

    <div className="z-20 w-full flex flex-col items-center px-4 text-center mt-4">
      
      {/* Original Bismillah Design with English Translation */}
      <motion.div 
        className="mb-8"
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5 }}
      >
        <span className="font-serif text-4xl text-primary-pink italic drop-shadow-sm block mb-2">﷽</span>
        <p className="font-serif text-[18px] sm:text-[20px] font-bold tracking-[0.05em] text-dark-accent italic leading-tight px-4">
          In the Name of Allah,<br /> the Most Gracious, the Most Merciful
        </p>
        <div className="w-16 h-px bg-gold/50 mx-auto mt-4"></div>
      </motion.div>

      {/* Main Couple Names */}
      <div className="flex items-center justify-center gap-4 w-full px-2 mb-8 mt-4">
        <div className="flex-1 text-center">
          <h2 className="font-serif text-3xl sm:text-5xl text-dark-accent italic leading-tight drop-shadow-sm">
            Aflah
          </h2>
        </div>
        
        <div className="shrink-0 flex items-center justify-center">
          <div className="text-primary-pink text-3xl drop-shadow-sm opacity-60">♥</div>
        </div>

        <div className="flex-1 text-center">
          <h2 className="font-serif text-3xl sm:text-5xl text-dark-accent italic leading-tight drop-shadow-sm">
            Nihana
          </h2>
        </div>
      </div>

      <p className="font-sans text-[10px] uppercase tracking-[0.3em] text-secondary-pink mb-6 font-bold">Together with their families</p>
      
      {/* Parents Section */}
      <div className="space-y-6 mb-10 w-full">
         <div className="flex flex-col items-center">
            <h3 className="font-serif text-lg text-dark-accent leading-tight">Mr. Abdul Azeez Haji & Mrs. Sakeena</h3>
            <p className="font-sans text-[8px] uppercase tracking-widest text-primary-pink font-bold">(Aflah's Parents)</p>
         </div>

         <div className="flex flex-col items-center">
            <h3 className="font-serif text-lg text-dark-accent leading-tight">Mr. Nisar & Mrs. Sajna</h3>
            <p className="font-sans text-[8px] uppercase tracking-widest text-primary-pink font-bold">(Nihana's Parents)</p>
         </div>
      </div>

      {/* Premium Photo Placeholder / Slideshow - MOVED UNDER PARENTS */}
      <motion.div 
        className="w-full aspect-[4/5] rounded-[40px] overflow-hidden shadow-2xl border-4 border-white mb-8 relative"
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2 }}
      >
        <PhotoSlideshow images={couplePhotos} />
        {/* Ornate Label Overlay */}
        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 bg-white px-6 py-2 rounded-t-xl border-t border-x border-primary-pink/20 z-30">
           <p className="font-serif text-[10px] text-primary-pink uppercase tracking-[0.3em] font-bold">The Couple</p>
        </div>
      </motion.div>

      <div className="w-full h-px bg-gold/40 mb-8 max-w-[200px]"></div>

      <motion.p 
        className="font-sans text-[10px] uppercase tracking-[0.25em] text-secondary-pink font-bold px-6 leading-relaxed"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        Request the honor of your presence <br/> to share in our joy
      </motion.p>
      
    </div>
  </div>
);

const DoubleWeddingArchitecture = () => {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
      target: containerRef,
      offset: ["start end", "end start"]
    });

    return (
      <div className="w-full pt-12 pb-16 flex flex-col items-center gap-16 relative overflow-visible" ref={containerRef}>
        
        {/* Parallax Background Elements */}
        <MandalaBackdrop scrollYProgress={scrollYProgress} />
  
        <motion.div
          className="relative w-[92%] max-w-sm min-h-[900px] z-20 pointer-events-auto"
          initial={{ opacity: 0, scale: 0.95, y: 50 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ type: "spring", stiffness: 50, damping: 20 }}
        >
           <OrnateSingleCard 
              pathDraw={useTransform(scrollYProgress, [0.2, 0.6], [0, 1])}
            />
        </motion.div>
  
      </div>
    );
};

export default DoubleWeddingArchitecture;
