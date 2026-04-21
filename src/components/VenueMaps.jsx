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
      <div className="border border-gold/30 rounded-2xl p-6 bg-paper shadow-lg relative overflow-hidden">
        
        {/* Subtle Decorative Corners */}
        <div className="absolute top-2 left-2 w-6 h-6 border-t border-l border-gold/40"></div>
        <div className="absolute top-2 right-2 w-6 h-6 border-t border-r border-gold/40"></div>
        <div className="absolute bottom-2 left-2 w-6 h-6 border-b border-l border-gold/40"></div>
        <div className="absolute bottom-2 right-2 w-6 h-6 border-b border-r border-gold/40"></div>

        <h2 className="font-serif text-3xl text-textDark mb-2 italic">Venue & Directions</h2>
        <div className="w-12 h-px bg-gold/50 mx-auto mb-6"></div>
        
        <div className="mb-4">
          <p className="font-sans text-[10px] uppercase tracking-widest text-sage mb-1">Location</p>
          <p className="font-serif text-lg text-textDark/90">Alankar Auditorium</p>
          <p className="font-serif text-sm text-textDark/70 mb-2">Mathottam, Kozhikode (Calicut)</p>
        </div>

        {/* Live Embedded Map */}
        <div className="relative w-full aspect-square sm:aspect-video rounded-xl overflow-hidden border-2 border-gold/20 shadow-inner group">
          {/* A slight sepia overlay */}
          <div className="absolute inset-0 pointer-events-none mix-blend-color z-10 bg-[#e8dcc4] opacity-40"></div>
          
          <iframe 
            src="https://maps.google.com/maps?q=Alankar%20Auditorium,%20Mathottam,%20Kozhikode,%20Kerala&t=&z=15&ie=UTF8&iwloc=&output=embed" 
            width="100%" 
            height="100%" 
            style={{ border: 0 }} 
            allowFullScreen="" 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
            className="w-full h-full relative z-0"
          ></iframe>
        </div>
        
        <a 
          href="https://maps.app.goo.gl/RwKWoFTofJcUiRMF9"
          target="_blank"
          rel="noopener noreferrer"
          className="relative inline-block mt-6 px-8 py-3 bg-envelope border border-gold/50 text-gold font-sans text-[10px] font-bold uppercase tracking-widest rounded-full shadow-md hover:bg-gold hover:text-white transition-all duration-300 z-20"
        >
          Open in Maps
        </a>
      </div>
    </motion.section>
  );
};

export default VenueMaps;
