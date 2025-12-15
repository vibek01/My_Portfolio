import React, { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ArrowUpRight } from "lucide-react"; 
import styles from "./styles.module.css";

gsap.registerPlugin(ScrollTrigger);

const experiences = [
  {
    id: 1,
    year: "2025",
    role: "Backend Developer",
    company: "NIC Tripura",
    desc: "Architecting scalable backend systems for government applications.",
    items: [
      "Developed cross-platform mobile apps using React Native.",
      "Optimized database queries reducing load times by 40%.",
      "Implemented secure authentication protocols (OAuth2)."
    ]
  },
  {
    id: 2,
    year: "2024",
    role: "Collab Developer",
    company: "ICFAICOLLAB",
    desc: "Leading a team to build real-time collaboration tools for developers.",
    items: [
      "Integrated Socket.io for live chat and document editing.",
      "Designed a modular component library for consistent UI.",
      "Managed deployment pipelines using Docker and AWS."
    ]
  },
  {
    id: 3,
    year: "2023",
    role: "Junior Developer",
    company: "Diligently Innovative",
    desc: "Assisted in frontend development and UI implementation.",
    items: [
      "Built pixel-perfect interfaces using React and Tailwind.",
      "Collaborated with UX designers to improve accessibility.",
      "Debugged and fixed critical production issues."
    ]
  }
];

const PHRASE = "MY EXPERIENCE";

const ExperienceSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textLayerRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  useGSAP(() => {
    const container = containerRef.current;
    const textLayer = textLayerRef.current;
    const list = listRef.current;

    if (!container || !textLayer || !list) return;

    // Calculate movement distance for parallax
    const textScrollAmount = -(textLayer.scrollWidth - window.innerWidth) * 0.8;

    // --- ANIMATION 1: Background Text Parallax ---
    // We only move the text position. The shine is now handled by CSS loop.
    gsap.to(textLayer, {
      x: textScrollAmount,
      ease: "none",
      scrollTrigger: {
        trigger: container,
        start: "top bottom", 
        end: "bottom top",   
        scrub: 1,            
      }
    });

    // --- ANIMATION 2: List Entrance (Delayed) ---
    gsap.fromTo(list, 
      {
        y: 150,      
        opacity: 0, 
      },
      {
        y: 0,
        opacity: 1,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: container,
          start: "top 40%", 
          toggleActions: "play none none reverse"
        }
      }
    );

  }, { scope: containerRef });

  return (
    <section ref={containerRef} className={styles.experienceSection} id="experience">
      
      {/* --- LAYER 1: Background Text --- */}
      <div ref={textLayerRef} className={styles.textLayer}>
        <h1 className={styles.bigText}>
          {PHRASE.split("").map((char, index) => (
            <span 
              key={index} 
              className={styles.char}
              data-char={char === " " ? "\u00A0" : char}
            >
              {char === " " ? "\u00A0" : char}
            </span>
          ))}
        </h1>
      </div>

      {/* --- LAYER 2: Foreground Content (Accordion List) --- */}
      <div ref={listRef} className={`${styles.contentWrapper} max-w-6xl mx-auto px-6`}>
        
        {/* Section Header */}
        <div className="mb-16 border-b border-white/20 pb-4 flex justify-between items-end">
          <h3 className="text-sm text-gray-400 tracking-[0.3em] uppercase">
            Career History
          </h3>
          <span className="text-xs text-gray-600">
            {experiences.length} ROLES
          </span>
        </div>

        {/* The List */}
        <div className="flex flex-col">
          {experiences.map((exp) => (
            <div 
              key={exp.id}
              className={styles.rowContainer}
              onMouseEnter={() => setHoveredId(exp.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              {/* --- ROW HEADER --- */}
              <div className="py-8 flex flex-col md:flex-row md:items-center justify-between gap-4 md:gap-0">
                
                {/* Left: Year & Role */}
                <div className="flex items-baseline gap-6 md:gap-12">
                  <span className={`text-lg font-mono transition-colors duration-300 ${
                    hoveredId === exp.id ? "text-purple-400" : "text-gray-500"
                  }`}>
                    {exp.year}
                  </span>
                  <h4 className={`text-3xl md:text-5xl font-bold transition-colors duration-300 ${
                    hoveredId === exp.id ? "text-white" : "text-gray-400"
                  }`}>
                    {exp.role}
                  </h4>
                </div>

                {/* Right: Company & Arrow */}
                <div className="flex items-center gap-4 md:gap-8">
                  <span className="text-sm tracking-widest uppercase text-gray-500">
                    {exp.company}
                  </span>
                  <ArrowUpRight 
                    className={`${styles.arrowIcon} text-gray-600`} 
                    size={28} 
                  />
                </div>
              </div>

              {/* --- ROW DETAILS --- */}
              <div className={`${styles.detailsWrapper} ${hoveredId === exp.id ? styles.open : ""}`}>
                <div className={styles.detailsInner}>
                  <div className="pb-8 pl-0 md:pl-[140px] grid grid-cols-1 md:grid-cols-2 gap-8">
                    
                    {/* Description */}
                    <p className="text-lg text-gray-300 leading-relaxed max-w-md">
                      {exp.desc}
                    </p>

                    {/* Bullet Points */}
                    <ul className="space-y-2">
                      {exp.items.map((item, i) => (
                        <li key={i} className="flex items-start gap-2 text-gray-400 text-sm font-light">
                          <span className="mt-1.5 w-1 h-1 rounded-full bg-purple-500 shrink-0"></span>
                          {item}
                        </li>
                      ))}
                    </ul>

                  </div>
                </div>
              </div>
              
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;