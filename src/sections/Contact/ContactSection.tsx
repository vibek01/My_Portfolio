import React, { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useForm, ValidationError } from "@formspree/react";
import confetti from "canvas-confetti";
import { Send, Terminal, CheckCircle, Sparkles, ArrowRight, User } from "lucide-react";
import styles from "./styles.module.css";

gsap.registerPlugin(ScrollTrigger);

const ContactSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  // === FORM 1: MAIN CONTACT FORM (Right Side) ===
  const [contactState, handleContactSubmit] = useForm("xdkqqvbr");

  // === FORM 2: RATING SLIDER FORM (Left Side) ===
  const [ratingState, handleRatingSubmit] = useForm("mykggaeb");

  // === SLIDER LOGIC ===
  const [rating, setRating] = useState<number>(5);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [feedback, setFeedback] = useState({ 
    text: "It's looking clean ✨", 
    color: "text-purple-300",
    emoji: "✨" 
  });

  // Update text based on slider value
  useEffect(() => {
    if (rating <= 2) setFeedback({ text: "Needs work 😐", color: "text-gray-400", emoji: "😐" });
    else if (rating <= 4) setFeedback({ text: "Decent start 🔨", color: "text-blue-300", emoji: "🔨" });
    else if (rating <= 6) setFeedback({ text: "It's looking clean ✨", color: "text-purple-300", emoji: "✨" });
    else if (rating <= 8) setFeedback({ text: "Super impressive! 🚀", color: "text-pink-300", emoji: "🚀" });
    else setFeedback({ text: "Absolute Masterpiece! 🤯", color: "text-yellow-300", emoji: "🤯" });
  }, [rating]);

  // Trigger Confetti on Successful Rating Submission
  useEffect(() => {
    if (ratingState.succeeded) {
      const scalar = 2;
      const triangle = confetti.shapeFromPath({ path: 'M0 10 L5 0 L10 10z' });
      const square = confetti.shapeFromPath({ path: 'M0 0 L10 0 L10 10 L0 10z' });
      const coin = confetti.shapeFromPath({ path: 'M0 5 A5 5 0 1 0 10 5 A5 5 0 1 0 0 5z' });

      confetti({
        shapes: [triangle, square, coin],
        scalar,
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6, x: 0.25 },
        colors: ['#a855f7', '#ec4899', '#ffffff']
      });
    }
  }, [ratingState.succeeded]);

  useGSAP(() => {
    const container = containerRef.current;
    if (!container) return;

    gsap.fromTo(
      ".contact-reveal",
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: container,
          start: "top 70%",
        },
      }
    );
  }, { scope: containerRef });

  const getBackgroundSize = () => {
    return { backgroundSize: `${(rating * 10)}% 100%` };
  };

  return (
    <section ref={containerRef} className={styles.contactSection} id="contact">
      
      {/* Background Elements */}
      <div className={styles.glowBlob}></div>
      <div className={styles.bgTextContainer}>
        <h2 className={styles.bgText}>CONTACT</h2>
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start pt-20">
        
        {/* === LEFT COLUMN: RATING EXPERIENCE === */}
        <div className="flex flex-col gap-8 justify-center h-full">
          
          <div className="contact-reveal flex flex-col gap-6">
            <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 w-fit backdrop-blur-md">
              <Terminal size={14} className="text-purple-400" />
              <span className="text-xs font-medium tracking-widest uppercase text-gray-300">
                Feedback Loop
              </span>
            </div>

            <h2 className="text-5xl md:text-6xl font-bold text-white tracking-tight">
              What's the <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                Vibe Check?
              </span>
            </h2>
            <p className="text-gray-400 text-lg max-w-md leading-relaxed">
              Before you reach out, how does this portfolio make you feel? 
              Slide to rate the experience.
            </p>
          </div>

          {/* === THE INTERACTIVE SLIDER FORM === */}
          <div className="contact-reveal w-full max-w-md">
            {ratingState.succeeded ? (
              <div className={`${styles.glassCard} p-6 rounded-2xl flex items-center gap-4 border-l-4 border-green-500 animate-fade-in`}>
                <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center shrink-0">
                  <Sparkles size={24} className="text-green-400" />
                </div>
                <div>
                  <h3 className="text-white font-bold text-lg">Thanks for the vibe!</h3>
                  <p className="text-gray-400 text-sm">Your feedback helps me improve.</p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleRatingSubmit} className={`${styles.glassCard} p-8 rounded-3xl flex flex-col gap-6 relative overflow-hidden transition-all duration-300 hover:border-purple-500/30`}>
                
                <input type="hidden" name="subject" value="New Portfolio Rating Submission" />
                <input type="hidden" name="rating_value" value={`${rating}/10`} />
                <input type="hidden" name="rating_feedback" value={feedback.text} />

                {/* Header & Score */}
                <div className="flex justify-between items-end relative z-10">
                  <div className="flex flex-col gap-1">
                    <span className="text-xs font-bold uppercase tracking-wider text-gray-500">Current Mood</span>
                    <h3 className={`text-xl font-bold transition-colors duration-300 ${feedback.color} flex items-center gap-2`}>
                      {feedback.text}
                    </h3>
                  </div>
                  <span className="text-6xl font-black text-white/20 select-none absolute -top-2 right-0 pointer-events-none transition-all duration-300">
                    {rating}
                  </span>
                </div>

                {/* The Slider */}
                <div className={styles.sliderContainer}>
                  <input 
                    type="range" 
                    min="0" 
                    max="10" 
                    value={rating} 
                    onChange={(e) => {
                      setRating(Number(e.target.value));
                      setHasInteracted(true);
                    }}
                    className={styles.customRange}
                    style={getBackgroundSize()}
                  />
                  <div className="flex justify-between mt-2 px-1">
                    <span className="text-[10px] uppercase font-bold text-gray-600">Nope</span>
                    <span className="text-[10px] uppercase font-bold text-gray-600">Dope</span>
                  </div>
                </div>

                {/* Reveal Section: Name Input & Submit Button */}
                {/* We use max-h-40 (approx 160px) to accommodate both input and button */}
                <div className={`flex flex-col gap-3 transition-all duration-500 ease-in-out overflow-hidden ${hasInteracted ? 'max-h-48 opacity-100 pt-2' : 'max-h-0 opacity-0'}`}>
                  
                  {/* Optional Name Field */}
                  <div className="relative">
                    <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                      <User size={16} className="text-gray-500" />
                    </div>
                    <input 
                      type="text" 
                      name="rater_name"
                      placeholder="Your Name (Optional)" 
                      className={`${styles.glassInput} w-full py-3 pl-10 pr-4 rounded-xl placeholder:text-gray-500 text-sm bg-white/5 border-white/10 focus:border-purple-500/50`}
                    />
                  </div>

                  {/* Submit Button */}
                  <button 
                    type="submit" 
                    disabled={ratingState.submitting}
                    className="w-full bg-white/5 hover:bg-purple-500 hover:text-white border border-white/10 text-white p-3 rounded-xl flex items-center justify-center gap-3 transition-all group"
                  >
                    {ratingState.submitting ? (
                      <span className="text-sm font-medium">Sending...</span>
                    ) : (
                      <>
                        <span className="text-sm font-medium">Send Rating</span>
                        <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </button>
                </div>

              </form>
            )}
          </div>
        </div>

        {/* === RIGHT COLUMN: MAIN CONTACT FORM === */}
        <div className="contact-reveal w-full">
          {contactState.succeeded ? (
            <div className={`${styles.glassCard} w-full p-8 rounded-2xl flex flex-col items-center justify-center text-center gap-4 min-h-[400px] animate-fade-in`}>
              <div className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center mb-2">
                <CheckCircle size={40} className="text-green-400" />
              </div>
              <h3 className="text-3xl font-bold text-white">Message Sent!</h3>
              <p className="text-gray-400 max-w-xs">
                I've received your details. I'll get back to you as soon as possible.
              </p>
            </div>
          ) : (
            <form onSubmit={handleContactSubmit} className="flex flex-col gap-6 pt-4 lg:pt-0">
              
              <div className="flex flex-col gap-2">
                <label htmlFor="name" className="text-sm font-medium text-gray-400 ml-1">Name</label>
                <input 
                  type="text" 
                  id="name" 
                  name="name" 
                  placeholder="John Doe" 
                  className={`${styles.glassInput} w-full p-4 rounded-xl placeholder:text-gray-600`}
                  required
                />
                <ValidationError prefix="Name" field="name" errors={contactState.errors} className="text-red-400 text-sm ml-1" />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="email" className="text-sm font-medium text-gray-400 ml-1">Email</label>
                <input 
                  type="email" 
                  id="email" 
                  name="email" 
                  placeholder="john@example.com" 
                  className={`${styles.glassInput} w-full p-4 rounded-xl placeholder:text-gray-600`}
                  required
                />
                <ValidationError prefix="Email" field="email" errors={contactState.errors} className="text-red-400 text-sm ml-1" />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="message" className="text-sm font-medium text-gray-400 ml-1">Message</label>
                <textarea 
                  id="message" 
                  name="message" 
                  rows={5}
                  placeholder="Tell me about your project..." 
                  className={`${styles.glassInput} w-full p-4 rounded-xl placeholder:text-gray-600 resize-none`}
                  required
                ></textarea>
                <ValidationError prefix="Message" field="message" errors={contactState.errors} className="text-red-400 text-sm ml-1" />
              </div>

              <button 
                type="submit" 
                disabled={contactState.submitting}
                className="mt-4 w-full bg-white text-black font-bold text-lg p-4 rounded-xl hover:bg-purple-400 hover:text-white hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-purple-500/10 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {contactState.submitting ? "Sending..." : "Submit"} 
                {!contactState.submitting && <Send size={18} />}
              </button>

            </form>
          )}
        </div>

      </div>
    </section>
  );
};

export default ContactSection;