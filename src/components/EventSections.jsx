import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, animate } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Map } from 'lucide-react';

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

const DigitCounter = ({ value, revealed }) => {
  const [displayValue, setDisplayValue] = useState(0);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (revealed && !hasAnimated.current) {
      const targetValue = parseInt(value) || 0;
      const controls = animate(0, targetValue, {
        duration: 1.2,
        ease: "easeOut",
        onUpdate: (latest) => setDisplayValue(Math.floor(latest))
      });
      hasAnimated.current = true;
      return () => controls.stop();
    } else if (revealed) {
      setDisplayValue(parseInt(value) || 0);
    } else {
      setDisplayValue(0);
      hasAnimated.current = false;
    }
  }, [revealed, value]);

  return (
    <motion.span 
      className="font-serif text-[28px] text-primary-pink mb-1 w-12 text-center inline-block"
      animate={revealed ? { 
        color: ['#D9858F', '#9A4F63'],
      } : {}}
    >
      {String(displayValue).padStart(2, '0')}
    </motion.span>
  );
};

const ScratchCardDate = ({ dateString, onReveal }) => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [isScratching, setIsScratching] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const [scratchCount, setScratchCount] = useState(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || revealed) return;
    
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    
    const ctx = canvas.getContext('2d');
    ctx.scale(dpr, dpr);
    
    // Updated to Champagne Gold Gradient to match "With Love & Duas"
    const gradient = ctx.createLinearGradient(0, 0, rect.width, rect.height);
    gradient.addColorStop(0, '#D8C2A0'); // Champagne Gold
    gradient.addColorStop(0.5, '#E5D5BC'); // Lighter Gold
    gradient.addColorStop(1, '#B6A084'); // Deeper Gold
    
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, rect.width, rect.height);
    
    // Ornate Texture Pattern
    ctx.globalAlpha = 0.15;
    ctx.strokeStyle = '#4A3728';
    ctx.lineWidth = 0.3;
    for (let i = 0; i < rect.width; i += 8) {
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i + 8, rect.height);
      ctx.stroke();
    }
    ctx.globalAlpha = 1.0;

    // Stylish Text on Foil
    ctx.fillStyle = '#4A3728';
    ctx.font = 'bold 11px Montserrat';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.letterSpacing = '3px';
    ctx.fillText('SCRATCH TO REVEAL', rect.width / 2, rect.height / 2);

    // Subtle Shine Line
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(0, rect.height);
    ctx.lineTo(rect.width, 0);
    ctx.stroke();

  }, [revealed]);

  useEffect(() => {
    if (revealed) {
      onReveal();
      if (canvasRef.current) {
        const rect = canvasRef.current.getBoundingClientRect();
        const xPos = (rect.left + rect.width / 2) / window.innerWidth;
        const yPos = (rect.top + rect.height / 2) / window.innerHeight;
        
        confetti({
          particleCount: 600,
          spread: 160,
          origin: { x: xPos, y: yPos },
          colors: ['#D9858F', '#9A4F63', '#F8EEF0', '#D8C2A0', '#6F3346'],
          disableForReducedMotion: true,
          gravity: 0.7,
          startVelocity: 55,
          scalar: 1.4,
          ticks: 400
        });
      }
    }
  }, [revealed]);

  const scratch = (e) => {
    if (revealed || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(x, y, 20, 0, Math.PI * 2);
    ctx.fill();

    setScratchCount(prev => {
      const next = prev + 1;
      if (next % 4 === 0) {
        confetti({
          particleCount: 15,
          spread: 80,
          origin: { x: clientX / window.innerWidth, y: clientY / window.innerHeight },
          colors: ['#D9858F', '#9A4F63', '#F8EEF0'],
          gravity: 2,
          startVelocity: 25,
          scalar: 0.8,
          ticks: 50
        });
      }
      if (next > 20 && !revealed) setRevealed(true);
      return next;
    });
  };

  const handleDown = e => { setIsScratching(true); scratch(e); };
  const handleUp = () => setIsScratching(false);
  const handleMove = e => { if (isScratching) { if (e.cancelable) e.preventDefault(); scratch(e); } };

  return (
    <div className="relative w-72 mx-auto my-8 group" ref={containerRef}>
      {/* Ornate Laser-Cut Border Frame */}
      <div className="absolute -inset-2 border-2 border-primary-pink/30 rounded-lg p-1">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 border-2 border-primary-pink/30 rotate-45 bg-paper"></div>
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-4 h-4 border-2 border-primary-pink/30 rotate-45 bg-paper"></div>
      </div>
      
      <div className="relative min-h-[56px] bg-white rounded border-[1.5px] border-primary-pink/20 flex items-center justify-center p-1.5 shadow-xl overflow-hidden">
         <div className="w-full h-full border border-primary-pink/10 rounded flex items-center justify-center bg-paper shadow-inner py-3">
            <p className="font-serif text-[16px] tracking-[0.2em] text-dark-accent font-bold uppercase">{dateString}</p>
         </div>

         {!revealed && (
          <motion.div 
            className="absolute inset-0 z-30 overflow-hidden"
            animate={{ 
              x: [0, -1, 1, -1, 1, 0],
              transition: { duration: 0.5, repeat: Infinity, repeatDelay: 4 }
            }}
          >
             <motion.canvas
              ref={canvasRef}
              className="w-full h-full touch-none cursor-crosshair"
              onMouseDown={handleDown}
              onMouseUp={handleUp}
              onMouseLeave={handleUp}
              onMouseMove={handleMove}
              onTouchStart={handleDown}
              onTouchEnd={handleUp}
              onTouchMove={handleMove}
            />
            {/* Shimmer Effect */}
            <motion.div 
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent w-full pointer-events-none"
              animate={{ x: ['-100%', '200%'] }}
              transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
            />
          </motion.div>
        )}
      </div>
    </div>
  );
};


const CountdownDisplay = ({ targetDateIso, revealed }) => {
  const calculateTimeLeft = () => {
    const difference = +new Date(targetDateIso) - +new Date();
    if (difference <= 0) return { days: '00', hours: '00', minutes: '00', seconds: '00' };

    return {
      days: String(Math.floor(difference / (1000 * 60 * 60 * 24))).padStart(2, '0'),
      hours: String(Math.floor((difference / (1000 * 60 * 60)) % 24)).padStart(2, '0'),
      minutes: String(Math.floor((difference / 1000 / 60) % 60)).padStart(2, '0'),
      seconds: String(Math.floor((difference / 1000) % 60)).padStart(2, '0'),
    };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    if (!revealed) return;
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, [targetDateIso, revealed]);

  return (
    <div className="flex justify-center gap-3 my-4">
      {['days', 'hours', 'minutes', 'seconds'].map((interval) => (
        <div key={interval} className="flex flex-col items-center">
          <DigitCounter value={timeLeft[interval]} revealed={revealed} />
          <span className="font-sans text-[7px] uppercase tracking-[0.2em] text-dark-accent/50">
            {interval}
          </span>
        </div>
      ))}
    </div>
  );
};

const EventSections = ({ onAllRevealed }) => {
  const [revealed, setRevealed] = useState(false);
  const containerRef = useRef(null);
  const innerCardRef = useRef(null);
  const [hasScrolledPast, setHasScrolledPast] = useState(false);

  useEffect(() => {
    if (revealed) {
      if (onAllRevealed) onAllRevealed();
      setTimeout(() => {
        innerCardRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 500);
    }
  }, [revealed, onAllRevealed]);

  useEffect(() => {
    if (revealed) return;

    let lastScrollY = window.scrollY;
    let isMovingValue = false;

    const handleScroll = () => {
      if (!innerCardRef.current || revealed || isMovingValue) return;

      const rect = innerCardRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const currentScrollY = window.scrollY;
      const isScrolledPast = rect.bottom < viewportHeight * 0.4;
      
      if (isScrolledPast && !hasScrolledPast && currentScrollY > lastScrollY) {
        setHasScrolledPast(true);
        isMovingValue = true;
        setTimeout(() => {
          if (!revealed) {
            innerCardRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }
          setHasScrolledPast(false); 
          isMovingValue = false;
        }, 100);
      }
      lastScrollY = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [revealed, hasScrolledPast]);

  const handleReveal = () => setRevealed(true);

  const handleLocationClick = (e) => {
    e.preventDefault();
    // Detect iOS (iPhone, iPad, iPod)
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
    
    if (isIOS) {
      window.open("https://maps.apple/p/xqtwsrs0JL2kAP", "_blank");
    } else {
      window.open("https://maps.app.goo.gl/RwKWoFTofJcUiRMF9", "_blank");
    }
  };

  const commonVenue = "Opposite Sakkina Textiles";

  return (
    <div className="pb-16 flex flex-col items-center" ref={containerRef}>
      <motion.section 
        className="min-h-[85vh] flex flex-col items-center justify-center py-10 px-6 text-center relative z-10 w-full"
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: false, margin: "-100px" }}
        transition={{ type: "spring", stiffness: 50 }}
      >
        <div 
          ref={innerCardRef}
          className="border border-primary-pink/30 rounded-t-[160px] rounded-b-xl p-8 bg-paper shadow-2xl embossed w-full max-sm relative"
        >
          <h2 className="font-serif text-3xl text-dark-accent mb-1 italic">Wedding Ceremonies</h2>
          <div className="w-12 h-px bg-primary-pink/30 mx-auto mb-4" />
          
          <ScratchCardDate 
            dateString="Mark on Calendar" 
            onReveal={handleReveal} 
          />
          
          <div className="space-y-6 mt-8 text-center overflow-hidden">
            <div className={`transition-all duration-1000 ${revealed ? 'opacity-100 scale-100' : 'opacity-20 scale-95 blur-sm'}`}>
              <h3 className="font-sans text-[9px] uppercase tracking-widest text-primary-pink mb-1 font-bold">Wedding Ceremony</h3>
              <p className="font-serif text-xs text-secondary-pink font-bold italic tracking-wide mb-1">Dhuʻl-Qiʻdah 22</p>
              <p className="font-serif text-lg text-dark-accent font-bold">Sunday, May 10</p>
              
              <div className="flex flex-col items-center gap-1 mt-2 mb-4">
                <p className="font-serif text-sm text-dark-accent/80">Btw 5:00 PM - 10:00 PM</p>
              </div>

              <CountdownDisplay targetDateIso="2026-05-10T17:00:00" revealed={revealed} />
              
              <div className="mt-4 p-2 border border-primary-pink/10 rounded-lg bg-primary-pink/5">
                <p className="font-sans text-[9px] text-secondary-pink font-bold tracking-[0.15em] uppercase italic">Lucky Draw: 10:00 PM</p>
              </div>
            </div>

            <div className="pt-6 border-t border-primary-pink/10">
              <h3 className="font-sans text-[9px] uppercase tracking-widest text-primary-pink mb-1 font-bold">Venue</h3>
              <p className="font-serif text-base text-dark-accent font-bold leading-tight">{commonVenue}</p>
              <p className="font-serif text-[10px] text-dark-accent/60">Peravoor, Kannur, Kerala</p>
            </div>

            <motion.div className="pt-6">
              <button 
                onClick={handleLocationClick}
                className="inline-flex items-center gap-3 px-8 py-3 rounded-full border-2 border-primary-pink/40 bg-white shadow-lg text-primary-pink font-serif text-[13px] tracking-widest hover:bg-primary-pink hover:text-white transition-all duration-500 uppercase italic font-bold cursor-pointer"
              >
                <Map size={16} />
                View Location
              </button>
            </motion.div>
          </div>
        </div>
      </motion.section>
    </div>
  );
};

export default EventSections;
