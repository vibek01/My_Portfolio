import React, { useState, useEffect } from "react";
import { ArrowUp, Github, Linkedin, Mail, Phone, MapPin } from "lucide-react";
import Magnetic from "../ui/Magnetic"; 
import styles from "./Footer.module.css";

const Footer: React.FC = () => {
  const [time, setTime] = useState<string>("");

  // Update time every minute
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      // Format: "10:45 PM IST"
      const timeString = now.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
        timeZone: "Asia/Kolkata", 
      });
      setTime(timeString);
    };

    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className={styles.footer}>
      <div className="max-w-7xl mx-auto px-6 w-full flex flex-col justify-between h-full relative z-10">
        
        {/* TOP SECTION: CTA & DETAILS */}
        <div className="flex flex-col md:flex-row justify-between items-start gap-12 md:gap-0 pt-10">
          
          {/* Left: Big CTA & Contact Info */}
          <div className="flex flex-col gap-8">
            <h2 className="text-6xl md:text-8xl font-bold tracking-tighter text-white leading-[0.9]">
              Let's work <br />
              <span className="text-purple-400">together.</span>
            </h2>
            
            {/* Contact Details Grid */}
            <div className="flex flex-col md:flex-row gap-6 md:gap-12 mt-4">
              
              {/* Email */}
              <a 
                href="mailto:vibekbin305@gmail.com" 
                className="group flex items-center gap-3 text-gray-400 hover:text-white transition-colors"
              >
                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-purple-500/20 transition-colors">
                  <Mail size={18} />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs text-gray-500 uppercase tracking-wider font-medium">Email</span>
                  <span className="text-base">vibekbin305@gmail.com</span>
                </div>
              </a>

              {/* Phone */}
              <a 
                href="tel:+919366420315" 
                className="group flex items-center gap-3 text-gray-400 hover:text-white transition-colors"
              >
                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-purple-500/20 transition-colors">
                  <Phone size={18} />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs text-gray-500 uppercase tracking-wider font-medium">Phone</span>
                  <span className="text-base">+91 93664 20315</span>
                </div>
              </a>

              {/* Location */}
              <div className="group flex items-center gap-3 text-gray-400 hover:text-white transition-colors cursor-default">
                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-purple-500/20 transition-colors">
                  <MapPin size={18} />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs text-gray-500 uppercase tracking-wider font-medium">Location</span>
                  <span className="text-base">Tripura, India</span>
                </div>
              </div>

            </div>
          </div>

          {/* Right: Social Links (Magnetic) */}
          <div className="flex gap-4 self-start md:self-end mb-2">
            <Magnetic>
              <a 
                href="https://github.com/vibek01/" 
                target="_blank" 
                rel="noreferrer" 
                className={styles.socialBtn}
                aria-label="GitHub"
              >
                <Github size={20} />
              </a>
            </Magnetic>
            <Magnetic>
              <a 
                href="https://www.linkedin.com/in/vibek-prasad-bin-840ba72b0" 
                target="_blank" 
                rel="noreferrer" 
                className={styles.socialBtn}
                aria-label="LinkedIn"
              >
                <Linkedin size={20} />
              </a>
            </Magnetic>
            <Magnetic>
              <a 
                href="mailto:vibekbin305@gmail.com" 
                className={styles.socialBtn}
                aria-label="Email"
              >
                <Mail size={20} />
              </a>
            </Magnetic>
          </div>
        </div>

        {/* BOTTOM SECTION: INFO & COPYRIGHT */}
        <div className="flex flex-col-reverse md:flex-row justify-between items-center gap-6 md:gap-0 border-t border-white/10 pt-8 mt-16 md:mt-20 pb-8">
          
          {/* Copyright */}
          <div className="flex flex-col md:flex-row gap-2 md:gap-8 items-center md:items-start text-center md:text-left">
            <p className="text-gray-500 text-sm">
              © {new Date().getFullYear()} Vibek Prasad Bin.
            </p>
            <p className="text-gray-600 text-sm hidden md:block">
              Designed & Built with passion.
            </p>
          </div>

          {/* Time & Back to Top */}
          <div className="flex items-center gap-6">
            <div className="flex flex-col items-end hidden md:flex">
              <span className="text-xs text-gray-500 uppercase tracking-widest">Local time</span>
              <span className="text-sm text-white font-mono">{time} IST</span>
            </div>

            <Magnetic>
              <button onClick={scrollToTop} className={styles.backToTop}>
                <ArrowUp size={20} />
              </button>
            </Magnetic>
          </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;