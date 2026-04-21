import React from 'react';
import { motion } from 'framer-motion';

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

const VenueMaps = () => {
  return (
    <motion.section 
      className="py-12 px-6 text-center relative z-10 w-full mb-16"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={fadeInUp}
    >
      <div className="border border-primary-pink/30 rounded-3xl p-8 bg-paper shadow-lg relative overflow-hidden">
        
        {/* Subtle Decorative Corners */}
        <div className="absolute top-2 left-2 w-6 h-6 border-t border-l border-primary-pink/40"></div>
        <div className="absolute top-2 right-2 w-6 h-6 border-t border-r border-primary-pink/40"></div>
        <div className="absolute bottom-2 left-2 w-6 h-6 border-b border-l border-primary-pink/40"></div>
        <div className="absolute bottom-2 right-2 w-6 h-6 border-b border-r border-primary-pink/40"></div>

        <h2 className="font-serif text-3xl text-dark-accent mb-2 italic">Venue & Directions</h2>
        <div className="w-12 h-px bg-primary-pink/50 mx-auto mb-6"></div>
        
        <div className="mb-6">
          <p className="font-sans text-[10px] uppercase tracking-widest text-secondary-pink mb-1">Location</p>
          <p className="font-serif text-lg text-dark-accent/90 leading-tight">Opposite Sakkina Textiles</p>
          <p className="font-serif text-sm text-dark-accent/70 mb-2">Peravoor, Kannur, Kerala</p>
        </div>

        {/* Live Embedded Map */}
        <div className="relative w-full aspect-square sm:aspect-video rounded-2xl overflow-hidden border-2 border-primary-pink/10 shadow-inner group">
          {/* A slight blush overlay to match theme */}
          <div className="absolute inset-0 pointer-events-none mix-blend-color z-10 bg-primary-pink/20 opacity-30"></div>
          
          <iframe 
            src="https://maps.google.com/maps?q=Opposite%20Sakkina%20Textiles,%20Peravoor,%20Kannur,%20Kerala&t=&z=15&ie=UTF8&iwloc=&output=embed" 
            width="100%" 
            height="100%" 
            style={{ border: 0 }} 
            allowFullScreen="" 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
            className="w-full h-full relative z-0 grayscale-[0.2] contrast-[0.9]"
          ></iframe>
        </div>
        
        <a 
          href="https://maps.app.goo.gl/RwKWoFTofJcUiRMF9"
          target="_blank"
          rel="noopener noreferrer"
          className="relative inline-block mt-8 px-10 py-4 bg-primary-pink text-white font-sans text-[11px] font-bold uppercase tracking-widest rounded-full shadow-lg hover:bg-secondary-pink transition-all duration-300 z-20"
        >
          Open in Maps
        </a>
      </div>
    </motion.section>
  );
};

export default VenueMaps;
