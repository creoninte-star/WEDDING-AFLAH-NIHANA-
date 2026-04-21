import React from 'react';
import { motion } from 'framer-motion';

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

const WelcomeParents = () => {
  return (
    <motion.section 
      className="py-16 px-6 text-center"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={fadeInUp}
    >
      <div className="mb-12">
        <h2 className="font-sans text-xs uppercase tracking-[0.3em] text-gold mb-4">Together with their families</h2>
        <h1 className="font-serif text-3xl mb-8 leading-tight">
          <span className="block italic text-sage mb-2">You are invited for our special day.</span>
        </h1>
        
        <div className="flex flex-col items-center gap-6 mb-12">
          <div className="text-center">
            <h2 className="font-serif text-4xl mb-1 mt-2">Aflah & Nihana</h2>
          </div>
        </div>
      </div>

      <div className="border border-gold/20 p-8 rounded-t-full rounded-b-sm relative paper-bg debossed">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-paper px-4">
          <span className="font-sans text-[10px] uppercase tracking-[0.2em] text-sage">The Families</span>
        </div>
        
        <div className="space-y-8 mt-4">
          <div>
            <h3 className="font-sans text-xs uppercase tracking-widest text-gold mb-1">Aflah's Parents</h3>
            <p className="font-serif text-xl">Mr. Abdul Azeez Haji & Mrs. Sakeena</p>
          </div>
          
          <div>
            <h3 className="font-sans text-xs uppercase tracking-widest text-gold mb-1">Nihana's Parents</h3>
            <p className="font-serif text-xl">Mr. Nisar & Mrs. Sajna</p>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default WelcomeParents;
