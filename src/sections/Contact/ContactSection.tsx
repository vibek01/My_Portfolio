import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Mail, Phone, MapPin, ArrowUpRight, Send, Terminal } from "lucide-react";
import styles from "./styles.module.css";

gsap.registerPlugin(ScrollTrigger);

const ContactSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  useGSAP(() => {
    const container = containerRef.current;
    if (!container) return;

    // Simple Entrance Animation
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

  return (
    <section ref={containerRef} className={styles.contactSection} id="contact">
      
      {/* 1. BACKGROUND GLOW & TEXT */}
      <div className={styles.glowBlob}></div>
      
      <div className={styles.bgTextContainer}>
        <h2 className={styles.bgText}>CONTACT</h2>
      </div>

      {/* 2. MAIN CONTENT GRID */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start pt-20">
        
        {/* === LEFT COLUMN: INFO === */}
        <div className="flex flex-col gap-10">
          
          {/* Header Group */}
          <div className="contact-reveal flex flex-col gap-6">
            {/* Pill Badge */}
            <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 w-fit backdrop-blur-md">
              <Terminal size={14} className="text-purple-400" />
              <span className="text-xs font-medium tracking-widest uppercase text-gray-300">
                Contact
              </span>
            </div>

            <h2 className="text-5xl md:text-6xl font-bold text-white tracking-tight">
              Get in touch
            </h2>
            <p className="text-gray-400 text-lg max-w-md leading-relaxed">
              Have a project in mind or want to discuss the latest tech? 
              I'm always open to new opportunities and interesting conversations.
            </p>
          </div>

          {/* Contact Cards */}
          <div className="flex flex-col gap-4">
            
            {/* Card 1: Email */}
            <a href="mailto:vibekbin305@gmail.com" className={`contact-reveal ${styles.glassCard} group p-5 rounded-2xl flex items-center justify-between cursor-pointer`}>
              <div className="flex items-center gap-5">
                <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center border border-white/10 group-hover:border-purple-500/50 transition-colors">
                  <Mail size={20} className="text-gray-300 group-hover:text-purple-400 transition-colors" />
                </div>
                <div className="flex flex-col">
                  <span className="text-sm text-gray-400 font-medium">Email us</span>
                  <span className="text-white font-semibold tracking-wide">vibekbin305@gmail.com</span>
                </div>
              </div>
              <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-purple-500 group-hover:text-white transition-all duration-300">
                <ArrowUpRight size={18} />
              </div>
            </a>

            {/* Card 2: Phone */}
            <a href="tel:+919366420315" className={`contact-reveal ${styles.glassCard} group p-5 rounded-2xl flex items-center justify-between cursor-pointer`}>
              <div className="flex items-center gap-5">
                <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center border border-white/10 group-hover:border-purple-500/50 transition-colors">
                  <Phone size={20} className="text-gray-300 group-hover:text-purple-400 transition-colors" />
                </div>
                <div className="flex flex-col">
                  <span className="text-sm text-gray-400 font-medium">Call us</span>
                  <span className="text-white font-semibold tracking-wide">+91 93664 20315</span>
                </div>
              </div>
              <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-purple-500 group-hover:text-white transition-all duration-300">
                <ArrowUpRight size={18} />
              </div>
            </a>

            {/* Card 3: Location */}
            <div className={`contact-reveal ${styles.glassCard} group p-5 rounded-2xl flex items-center justify-between`}>
              <div className="flex items-center gap-5">
                <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center border border-white/10 group-hover:border-purple-500/50 transition-colors">
                  <MapPin size={20} className="text-gray-300 group-hover:text-purple-400 transition-colors" />
                </div>
                <div className="flex flex-col">
                  <span className="text-sm text-gray-400 font-medium">Location</span>
                  <span className="text-white font-semibold tracking-wide">Tripura, India</span>
                </div>
              </div>
              <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-purple-500 group-hover:text-white transition-all duration-300">
                <ArrowUpRight size={18} />
              </div>
            </div>

          </div>
        </div>

        {/* === RIGHT COLUMN: FORM === */}
        <div className="contact-reveal w-full">
          <form ref={formRef} className="flex flex-col gap-6">
            
            {/* Name Input */}
            <div className="flex flex-col gap-2">
              <label htmlFor="name" className="text-sm font-medium text-gray-400 ml-1">Name</label>
              <input 
                type="text" 
                id="name" 
                placeholder="John Doe" 
                className={`${styles.glassInput} w-full p-4 rounded-xl placeholder:text-gray-600`}
              />
            </div>

            {/* Email Input */}
            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="text-sm font-medium text-gray-400 ml-1">Email</label>
              <input 
                type="email" 
                id="email" 
                placeholder="john@example.com" 
                className={`${styles.glassInput} w-full p-4 rounded-xl placeholder:text-gray-600`}
              />
            </div>

            {/* Message Input */}
            <div className="flex flex-col gap-2">
              <label htmlFor="message" className="text-sm font-medium text-gray-400 ml-1">Message</label>
              <textarea 
                id="message" 
                rows={5}
                placeholder="Tell me about your project..." 
                className={`${styles.glassInput} w-full p-4 rounded-xl placeholder:text-gray-600 resize-none`}
              ></textarea>
            </div>

            {/* Submit Button - Fixed Typo and Styling */}
            <button 
              type="submit" 
              className="mt-4 w-full bg-white text-black font-bold text-lg p-4 rounded-xl hover:bg-purple-400 hover:text-white hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-purple-500/10"
            >
              Submit <Send size={18} />
            </button>

          </form>
        </div>

      </div>
    </section>
  );
};

export default ContactSection;