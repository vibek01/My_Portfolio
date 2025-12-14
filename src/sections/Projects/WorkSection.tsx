import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import WorkImage from "./WorkImage";
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
  { 
    name: "Portfolio V1", 
    cat: "Personal", 
    desc: "My previous portfolio showcasing early works and experiments with 3D web technologies.",
    tools: "HTML, CSS, Vanilla JS",
    image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=2855&auto=format&fit=crop",
    link: "#"
  },
];

const WorkSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    let translateX: number = 0;

    function setTranslateX() {
      // Select elements using the class names from CSS Modules
      // Note: Since we use CSS modules, we need to target the DOM elements carefully.
      // However, since we have refs, we can use them directly or fallback to querySelector if needed.
      
      if (!containerRef.current || !wrapperRef.current) return;

      const box = wrapperRef.current.children[0] as HTMLElement; // First work-box
      if (!box) return;

      const rectLeft = containerRef.current.getBoundingClientRect().left;
      const rect = box.getBoundingClientRect();
      const parentWidth = containerRef.current.getBoundingClientRect().width;
      
      // Calculate padding (fallback to 0 if NaN)
      const computedStyle = window.getComputedStyle(box);
      const padding = parseFloat(computedStyle.paddingLeft) || 0;

      // The Exact Formula from your reference
      translateX = (rect.width * projects.length) - (rectLeft + parentWidth) + padding + 300; // Added buffer
    }

    setTranslateX();

    // Recalculate on resize
    window.addEventListener("resize", setTranslateX);

    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: () => `+=${translateX}`, // Use the calculated X
        scrub: true,
        pin: true,
        invalidateOnRefresh: true,
      },
    });

    timeline.to(wrapperRef.current, {
      x: () => -translateX,
      ease: "none",
    });

    return () => {
      window.removeEventListener("resize", setTranslateX);
      timeline.kill();
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

                <div className={styles.workInfo}>
                  <h4>Tools & Features</h4>
                  <p>{project.tools}</p>
                </div>
              </div>
              
              <WorkImage 
                image={project.image} 
                alt={project.name}
                link={project.link}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WorkSection;