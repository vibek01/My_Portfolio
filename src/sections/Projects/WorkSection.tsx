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
    image: "/images/WINSCALE.png", 
    link: "https://www.winscale.space/"
  },
  { 
    name: "Gyanashree", 
    cat: "NGO Website", 
    desc: "A dedicated platform for a social society, facilitating donations, event management, and community outreach.",
    tools: "React, Tailwind, Framer Motion",
    image: "/images/GYANASHREE.png",
    link: "https://gyanashree-social-society.vercel.app/"
  },
  { 
    name: "ICFAICOLLAB", 
    cat: "Dev Platform", 
    desc: "A collaborative platform for developers to share resources, track hackathons, and manage team projects efficiently.",
    tools: "MongoDB, Express, React, Node.js",
    image: "/images/ICFAICOLLAB.png",
    link: "https://icfaicollab.vercel.app/"
  },
  { 
    name: "AI Interview Coach", 
    cat: "EdTech SaaS", 
    desc: "An AI-powered platform that simulates real job interviews, providing real-time feedback on speech and body language.",
    tools: "Next.js, OpenAI, WebRTC",
    image: "/images/INTERVIEW.png",
    link: "https://ai-interview-coach-sable.vercel.app/"
  },
  { 
    name: "Yupcha AI", 
    cat: "AI Chatbot", 
    desc: "An intelligent chatbot interface capable of natural language processing and automated customer support responses.",
    tools: "TypeScript, AI Integration, Vercel",
    image: "/images/TWEETGENERATOR.png",
    link: "https://yupcha-chatbot-website.pages.dev/"
  },
  { 
    name: "Student Hub", 
    cat: "Educational", 
    desc: "A centralized resource hub for students containing lecture notes, past papers, and a peer discussion forum.",
    tools: "React, Firebase, Material UI",
    image: "/images/RESOURCEHUB.png",
    link: "https://student-resource-hub-two.vercel.app/"
  },
];

const WorkSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!containerRef.current || !wrapperRef.current) return;

    // Logic now runs on ALL screens (Mobile + Desktop)
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