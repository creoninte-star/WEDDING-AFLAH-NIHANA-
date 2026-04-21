import React, { useState, useEffect, useRef } from 'react';
import { Music, Music2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const MusicPlayer = ({ isOpened }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    // Create audio object
    const audio = new Audio('/song.mp3');
    audio.loop = true;
    audioRef.current = audio;

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (isOpened && audioRef.current && !isPlaying) {
      // The open action in HeroEnvelope (click) counts as user interaction
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(error => {
        console.error("Audio playback failed:", error);
      });
    }
  }, [isOpened]);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden && audioRef.current && isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [isPlaying]);

  const togglePlay = (e) => {
    e.stopPropagation();
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(console.error);
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <AnimatePresence>
      {isOpened && (
        <motion.button
          initial={{ scale: 0, opacity: 0, x: 50 }}
          animate={{ scale: 1, opacity: 1, x: 0 }}
          exit={{ scale: 0, opacity: 0, x: 50 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={togglePlay}
          className="fixed bottom-6 right-6 z-[100] w-12 h-12 rounded-full bg-gold text-paper flex items-center justify-center shadow-xl border border-paper/30 backdrop-blur-sm"
          style={{ 
            boxShadow: '0 4px 15px rgba(182, 130, 34, 0.4)',
            zIndex: 1000 
          }}
          aria-label={isPlaying ? "Pause Music" : "Play Music"}
        >
          {isPlaying ? (
            <div className="relative flex items-center justify-center">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 5, ease: "linear" }}
              >
                <Music size={22} />
              </motion.div>
              
              {/* Music Waves Animation */}
              {[...Array(3)].map((_, i) => (
                <motion.span
                  key={i}
                  className="absolute w-full h-full rounded-full border border-gold"
                  animate={{ scale: [1, 1.8], opacity: [0.5, 0] }}
                  transition={{ 
                    repeat: Infinity, 
                    duration: 1.5, 
                    delay: i * 0.5,
                    ease: "easeOut" 
                  }}
                />
              ))}
            </div>
          ) : (
            <Music2 size={22} className="opacity-80" />
          )}

          {/* Visual Indicator of sound playing */}
          {isPlaying && (
            <div className="absolute -top-1 -left-1 flex space-x-0.5">
              {[1, 2, 3].map((i) => (
                <motion.div
                  key={i}
                  className="w-0.5 bg-paper"
                  animate={{ height: [4, 8, 4] }}
                  transition={{ 
                    repeat: Infinity, 
                    duration: 0.5, 
                    delay: i * 0.1,
                    ease: "easeInOut" 
                  }}
                />
              ))}
            </div>
          )}
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default MusicPlayer;
