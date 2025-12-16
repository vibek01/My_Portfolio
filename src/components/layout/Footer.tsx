import React, { useState, useEffect } from "react";
import { ArrowUp, Github, Linkedin, Twitter, Mail } from "lucide-react";
import Magnetic from "../ui/Magnetic"; // Reusing your existing Magnetic component
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
        timeZone: "Asia/Kolkata", // Set to your timezone
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
      <div className="max-w-7xl mx-auto px-6 w-full flex flex-col justify-between h-full">
        
        {/* TOP SECTION: CTA & SOCIALS */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-10 md:gap-0">
          
          {/* Left: Big CTA */}
          <div className="flex flex-col gap-4">
            <h2 className="text-6xl md:text-8xl font-bold tracking-tighter text-white">
              Let's work <br />
              <span className="text-purple-400">together.</span>
            </h2>
            <a 
              href="mailto:vibekprasad@example.com" 
              className="text-gray-400 hover:text-white transition-colors text-lg mt-4 border-b border-gray-700 w-fit pb-1 hover:border-white"
            >
              vibekprasad@example.com
            </a>
          </div>

          {/* Right: Social Links (Magnetic) */}
          <div className="flex gap-4">
            <Magnetic>
              <a href="https://github.com" target="_blank" rel="noreferrer" className={styles.socialBtn}>
                <Github size={20} />
              </a>
            </Magnetic>
            <Magnetic>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" className={styles.socialBtn}>
                <Linkedin size={20} />
              </a>
            </Magnetic>
            <Magnetic>
              <a href="https://twitter.com" target="_blank" rel="noreferrer" className={styles.socialBtn}>
                <Twitter size={20} />
              </a>
            </Magnetic>
            <Magnetic>
              <a href="mailto:vibekprasad@example.com" className={styles.socialBtn}>
                <Mail size={20} />
              </a>
            </Magnetic>
          </div>
        </div>

        {/* BOTTOM SECTION: INFO & COPYRIGHT */}
        <div className="flex flex-col-reverse md:flex-row justify-between items-center gap-6 md:gap-0 border-t border-white/10 pt-8 mt-12 md:mt-0">
          
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