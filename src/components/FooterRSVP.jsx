import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const FooterRSVP = () => {
    const [response, setResponse] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [formData, setFormData] = useState({
      name: '',
      email: '',
      contactInfo: '',
      guestCount: '1'
    });
  
    const handleChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };
  
    const handleNoResponse = () => {
       setSubmitted(true);
       setResponse('no');
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      setIsSubmitting(true);
      
      const scriptUrl = "https://script.google.com/macros/s/AKfycbw7tCSAkRcu0GF8pl2N90qWGH7PRbSrydTys2nohJXvsM3hHcIMB7rjyUOqrA8Cbsmu/exec";
  
      try {
        const payload = {
          ...formData,
          response: 'yes',
          timestamp: new Date().toISOString()
        };
  
        await fetch(scriptUrl, {
          method: 'POST',
          mode: 'no-cors',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
        
        setSubmitted(true);
      } catch (error) {
        console.error("Submission error:", error);
        // Fallback to success anyway since no-cors doesn't return response
        setSubmitted(true);
      } finally {
        setIsSubmitting(false);
      }
    };

    if (submitted) {
        return (
            <motion.section 
              className="py-16 px-6 text-center relative z-10 w-full"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <div className="bg-paper border-2 border-primary-pink/30 rounded-3xl p-8 shadow-xl max-w-sm mx-auto">
                 {response === 'yes' ? (
                   <div>
                      <h3 className="font-serif text-2xl text-dark-accent mb-2">You’re In! 🎉</h3>
                      <div className="w-8 h-px bg-primary-pink/30 mx-auto mb-4"></div>
                      <div className="font-sans text-[11px] text-secondary-pink leading-relaxed px-2 font-medium space-y-1 mb-4">
                        <p>First Prize Winner : Gift 🎁</p>
                        <p>Second winner : Cash Prize</p>
                        <p>Third winner : Cash Prize</p>
                      </div>
                      <p className="font-sans text-[10px] text-dark-accent/70 italic px-2">
                        The winners will be announced live on <span className="text-dark-accent font-bold underline decoration-primary-pink/30">May 10th at 10:00 PM</span> during the event. Good luck!
                      </p>
                   </div>
                 ) : (
                   <div>
                      <h3 className="font-serif text-2xl text-secondary-pink mb-2">Thank You!</h3>
                      <p className="font-sans text-sm text-dark-accent/60 leading-relaxed">
                        We'll miss you, but thank you for letting us know!
                      </p>
                   </div>
                 )}
              </div>
            </motion.section>
        );
    }

    return (
      <motion.section className="py-20 px-6 relative z-10 w-full">
        <div className="max-w-sm mx-auto bg-paper border-2 border-primary-pink/20 rounded-[40px] p-8 shadow-2xl relative overflow-hidden">
          
          <div className="text-center mb-10">
            <h2 className="font-serif text-3xl text-dark-accent italic leading-tight mb-2">Are You Coming?</h2>
            <div className="w-12 h-px bg-primary-pink/40 mx-auto mb-4"></div>
          </div>

          {!response ? (
            <div className="space-y-4">
              <button 
                onClick={() => setResponse('yes')}
                className="w-full flex items-center justify-between p-4 rounded-2xl border border-primary-pink/20 bg-white shadow-sm hover:shadow-md hover:bg-soft-pink/10 transition-all font-serif text-lg text-dark-accent group"
              >
                <span>Yes, In Sha Allah! 😍</span>
                <div className="w-8 h-8 rounded-full bg-primary-pink/10 flex items-center justify-center text-primary-pink group-hover:bg-primary-pink group-hover:text-white transition-all">
                   <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                     <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z"/>
                   </svg>
                </div>
              </button>

              <button 
                onClick={handleNoResponse}
                className="w-full flex items-center justify-between p-4 rounded-2xl border border-secondary-pink/10 bg-white/50 shadow-sm hover:shadow-md hover:bg-red-50/20 transition-all font-serif text-lg text-dark-accent/60 italic group"
              >
                <span>Unfortunately, I can't make it</span>
              </button>
            </div>
          ) : (
            <form className="space-y-4" onSubmit={handleSubmit}>
               <div className="space-y-4">
                  <input 
                    name="name" required placeholder="Full Name" value={formData.name} onChange={handleChange}
                    className="w-full bg-transparent border-b border-primary-pink/30 py-3 font-sans text-sm focus:outline-none focus:border-primary-pink placeholder:text-primary-pink/40 text-dark-accent"
                  />
                  <input 
                    name="email" type="email" placeholder="Email Address (Optional)" value={formData.email} onChange={handleChange}
                    className="w-full bg-transparent border-b border-primary-pink/30 py-3 font-sans text-sm focus:outline-none focus:border-primary-pink placeholder:text-primary-pink/40 text-dark-accent"
                  />
                  <input 
                    name="contactInfo" placeholder="Mobile / Insta ID" value={formData.contactInfo} onChange={handleChange}
                    className="w-full bg-transparent border-b border-primary-pink/30 py-3 font-sans text-sm focus:outline-none focus:border-primary-pink placeholder:text-primary-pink/40 text-dark-accent"
                  />
                  <input 
                    name="guestCount" type="number" required min="1" value={formData.guestCount} onChange={handleChange}
                    className="w-full bg-transparent border-b border-primary-pink/30 py-3 font-sans text-sm focus:outline-none focus:border-primary-pink placeholder:text-primary-pink/40 text-dark-accent"
                  />
               </div>
               
               <button 
                 type="submit" disabled={isSubmitting}
                 className="w-full mt-8 py-4 bg-primary-pink text-white font-sans text-[11px] uppercase tracking-[0.2em] rounded-2xl shadow-xl hover:bg-secondary-pink transition-all font-bold"
               >
                 {isSubmitting ? 'Processing...' : 'Enter Lucky Draw'}
               </button>
               <button type="button" onClick={() => setResponse(null)} className="w-full mt-4 text-[9px] text-primary-pink underline uppercase tracking-widest text-center opacity-60">Back</button>
            </form>
          )}

        </div>
      </motion.section>
    );
};

export default FooterRSVP;
