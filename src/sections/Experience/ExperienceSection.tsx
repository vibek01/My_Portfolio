import React, { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ArrowUpRight, Github, Code2 } from "lucide-react"; 
import styles from "./styles.module.css";

gsap.registerPlugin(ScrollTrigger);

const experiences = [
  {
    id: 1,
    year: "2025",
    role: "Backend Developer",
    company: "NIC Tripura",
    github: "https://github.com/vibek01/NIC_BACKEND",
    desc: "Developed a Spring Boot–based backend system for a child marriage prevention platform, coordinating multi-department response teams (SDM, DM, Police).",
    items: [
      "Designed RESTful APIs for React web and React Native mobile applications.",
      "Implemented team formation workflows with accept/reject logic for officials.",
      "Architected supervised report merging for consolidated case reporting.",
      "Managed secure authentication and core government business workflows."
    ]
  },
  {
    id: 2,
    year: "2024",
    role: "Collab Developer",
    company: "ICFAICOLLAB",
    github: "https://github.com/vibek01/ICFAICOLLAB",
    desc: "Led the development of a university-wide collaborative platform for students to showcase projects and form teams.",
    items: [
      "Built personal profile sections for peer-to-peer networking.",
      "Developed a 'Team Recruitment' system with real-time reactions.",
      "Integrated project showcase features to increase campus-wide visibility.",
      "Managed the end-to-end development lifecycle and team coordination."
    ]
  },
  {
    id: 3,
    year: "2023",
    role: "Junior Developer",
    company: "Diligently Innovative",
    desc: "Assisted in frontend development and UI implementation for client-facing applications.",
    items: [
      "Built pixel-perfect interfaces using React and Tailwind CSS.",
      "Collaborated with UX designers to improve accessibility standards.",
      "Debugged and fixed critical production issues in legacy codebases."
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

    const textScrollAmount = -(textLayer.scrollWidth - window.innerWidth) * 0.8;

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

      <div ref={listRef} className={`${styles.contentWrapper} max-w-6xl mx-auto px-6`}>
        
        <div className="mb-16 border-b border-white/20 pb-4 flex justify-between items-end">
          <h3 className="text-sm text-gray-400 tracking-[0.3em] uppercase">
            Career History
          </h3>
          <span className="text-xs text-gray-600">
            {experiences.length} ROLES
          </span>
        </div>

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
                  <div className="pb-12 pl-0 md:pl-[140px] grid grid-cols-1 md:grid-cols-2 gap-12">
                    
                    {/* Left Side: Description & GitHub */}
                    <div className="flex flex-col gap-6">
                      <p className="text-lg text-gray-300 leading-relaxed">
                        {exp.desc}
                      </p>
                      
                      {exp.github && (
                        <a 
                          href={exp.github} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="flex items-center gap-3 w-fit px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-gray-300 hover:bg-white/10 hover:text-white hover:border-purple-500/50 transition-all duration-300"
                        >
                          <Github size={16} />
                          <span>View Source Code</span>
                          <Code2 size={14} className="text-purple-400" />
                        </a>
                      )}
                    </div>

                    {/* Right Side: Bullet Points */}
                    <ul className="space-y-4">
                      {exp.items.map((item, i) => (
                        <li key={i} className="flex items-start gap-3 text-gray-400 text-[15px] leading-snug font-light">
                          <span className="mt-2 w-1.5 h-1.5 rounded-full bg-purple-500 shrink-0 shadow-[0_0_8px_rgba(168,85,247,0.6)]"></span>
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