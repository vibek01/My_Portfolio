import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import WorkImage from "./WorkImage";
import styles from "./styles.module.css";

// Register ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// Define the Project Interface
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
    tools: "Next.js, OpenAI API, WebRTC",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=2832&auto=format&fit=crop",
    link: "#"
  },
  { 
    name: "ICFAICOLALB", 
    cat: "Dev Platform", 
    desc: "A collaborative platform for developers to share resources, track hackathons, and manage team projects efficiently.",
    tools: "MERN Stack, Socket.io",
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
];

const WorkSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const container = containerRef.current;
    const wrapper = wrapperRef.current;
    
    if (!container || !wrapper) return;

    // Calculate the total scrollable width
    // (Total width of strip) - (Viewport width)
    const getScrollAmount = () => {
      return -(wrapper.scrollWidth - window.innerWidth);
    };

    const tween = gsap.to(wrapper, {
      x: getScrollAmount,
      ease: "none",
      scrollTrigger: {
        trigger: container,
        start: "top top",
        end: () => `+=${wrapper.scrollWidth - window.innerWidth}`,
        pin: true,
        scrub: 1,
        invalidateOnRefresh: true,
      },
    });

    return () => {
      tween.kill();
    };
  }, { scope: containerRef });

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

                <div className={styles.techStack}>
                  <h4>Tech Stack</h4>
                  <p>{project.tools}</p>
                </div>
              </div>
              
              <div style={{ marginTop: '30px' }}>
                <WorkImage 
                  image={project.image} 
                  alt={project.name}
                  link={project.link}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WorkSection;