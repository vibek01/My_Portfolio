import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import styles from "./styles.module.css";

gsap.registerPlugin(ScrollTrigger);

interface Project {
  name: string;
  cat: string;
  desc: string;
  tools: string;
  image: string;
  link: string;
}

const projects: Project[] = [
  { 
    name: "Win Scale", 
    cat: "Creative Agency", 
    desc: "A high-performance website for a creative agency featuring smooth scroll animations and a modern grid layout.",
    tools: "React, GSAP, Tailwind",
    image: "https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=2700&auto=format&fit=crop", 
    link: "#"
  },
  { 
    name: "AI Interview Coach", 
    cat: "EdTech SaaS", 
    desc: "An AI-powered platform that simulates real job interviews, providing real-time feedback on speech and body language.",
    tools: "Next.js, OpenAI, WebRTC",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=2832&auto=format&fit=crop",
    link: "#"
  },
  { 
    name: "ICFAICOLALB", 
    cat: "Dev Platform", 
    desc: "A collaborative platform for developers to share resources, track hackathons, and manage team projects efficiently.",
    tools: "MongoDB, Express, React, Node.js",
    image: "https://images.unsplash.com/photo-1555099962-4199c345e5dd?q=80&w=2940&auto=format&fit=crop",
    link: "#"
  },
  { 
    name: "Tweet Generator", 
    cat: "AI Tool", 
    desc: "A viral content generator that uses NLP to craft engaging tweets based on trending topics and user inputs.",
    tools: "TypeScript, GPT-4, Vercel",
    image: "https://images.unsplash.com/photo-1611605698323-b1e99cfd37ea?q=80&w=2874&auto=format&fit=crop",
    link: "#"
  },
  { 
    name: "Student Hub", 
    cat: "Educational", 
    desc: "A centralized resource hub for students containing lecture notes, past papers, and a peer discussion forum.",
    tools: "React, Firebase, Material UI",
    image: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?q=80&w=2946&auto=format&fit=crop",
    link: "#"
  },
  { 
    name: "Portfolio V1", 
    cat: "Personal", 
    desc: "My previous portfolio showcasing early works and experiments with 3D web technologies.",
    tools: "Three.js, Cannon.js, GSAP",
    image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=2855&auto=format&fit=crop",
    link: "#"
  },
];

const WorkSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!containerRef.current || !wrapperRef.current) return;

    const getScrollAmount = () => {
      const wrapperWidth = wrapperRef.current?.scrollWidth || 0;
      const containerWidth = containerRef.current?.offsetWidth || 0;
      return -(wrapperWidth - containerWidth);
    };

    const tween = gsap.to(wrapperRef.current, {
      x: getScrollAmount,
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: () => `+=${Math.abs(getScrollAmount())}`, 
        pin: true,
        scrub: 1,
        invalidateOnRefresh: true,
      },
    });

    return () => {
      tween.kill();
    };
  }, { scope: containerRef, dependencies: [projects] });

  return (
    <div ref={containerRef} className={styles.workSection} id="projects">
      <div className={styles.workContainer}>
        <h2 className={styles.sectionTitle}>
          Selected <span>Works</span>
        </h2>
        
        <div ref={wrapperRef} className={styles.workFlex}>
          {projects.map((project, index) => (
            <div className={styles.workBox} key={index}>
              <div className={styles.workInfo}>
                <div className={styles.workTitle}>
                  <h3>0{index + 1}</h3>
                  <div>
                    <h4>{project.name}</h4>
                    <p>{project.cat}</p>
                  </div>
                </div>
                
                <p className={styles.description}>
                  {project.desc}
                </p>

                {/* Tech Stack Pills */}
                <div className={styles.techStack}>
                  {project.tools.split(",").map((tool, i) => (
                    <span key={i} className={styles.techPill}>
                      {tool.trim()}
                    </span>
                  ))}
                </div>
              </div>
              
              {/* Image with Hover Overlay Button */}
              <div className={styles.workImageWrapper}>
                <a 
                  href={project.link} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className={styles.workImageLink}
                >
                  <img 
                    src={project.image} 
                    alt={project.name} 
                    loading={index > 0 ? "lazy" : "eager"}
                  />
                  
                  {/* The Visit Button */}
                  <div className={styles.visitButton} aria-hidden="true">
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      width="24" 
                      height="24" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="2.5" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                    >
                      <line x1="7" y1="17" x2="17" y2="7"></line>
                      <polyline points="7 7 17 7 17 17"></polyline>
                    </svg>
                  </div>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WorkSection;