import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Code2, Database, Cloud, Terminal, Cpu, Globe } from "lucide-react";
import styles from "./styles.module.css";
import Footer from "../../components/layout/Footer"; // Reusing your footer

const About: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const container = containerRef.current;
    if (!container) return;

    // Staggered Entrance
    gsap.fromTo(
      ".about-reveal",
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.1,
        ease: "power3.out",
      }
    );
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="bg-black min-h-screen">
      <section className={styles.aboutSection}>
        <div className={styles.glowBg}></div>
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          
          {/* HEADER SECTION */}
          <div className="flex flex-col md:flex-row gap-16 items-start mb-32">
            
            {/* Left: Image (Placeholder) */}
            <div className="about-reveal w-full md:w-1/3">
              <div className={styles.imageWrapper}>
                {/* Replace with your actual photo */}
                <img 
                  src="https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=2055&auto=format&fit=crop" 
                  alt="Vibek Prasad Bin" 
                />
                <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-black to-transparent">
                  <div className="flex items-center gap-2 text-purple-400">
                    <Terminal size={16} />
                    <span className="text-xs font-mono uppercase tracking-widest">Full Stack Dev</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Biography */}
            <div className="about-reveal w-full md:w-2/3 flex flex-col gap-8">
              <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
                About <span className="text-purple-500">Me.</span>
              </h1>
              
              <div className="text-xl text-gray-300 leading-relaxed flex flex-col gap-6">
                <p>
                  I am <strong className="text-white">Vibek Prasad Bin</strong>, a software engineer driven by the art of crafting scalable digital architectures. Currently in my 6th semester of <span className="text-white">B.Tech CSE at ICFAI University, Tripura</span>, I bridge the gap between academic theory and production-grade engineering.
                </p>
                <p>
                  With over <strong className="text-white">3 years of hands-on experience</strong> in Full Stack Development, I have moved beyond simple coding to understanding system design. My journey started with the basics of the web and evolved into architecting complex server-side logic and interactive frontends.
                </p>
                <p>
                  I don't just write code; I build solutions. Whether it's optimizing database queries, deploying on the edge with Cloudflare, or designing pixel-perfect interfaces, I am obsessed with performance and user experience.
                </p>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-4 border-t border-white/10 pt-8">
                <div>
                  <h3 className="text-3xl font-bold text-white">3+</h3>
                  <p className="text-sm text-gray-500 uppercase tracking-wider">Years Exp.</p>
                </div>
                <div>
                  <h3 className="text-3xl font-bold text-white">20+</h3>
                  <p className="text-sm text-gray-500 uppercase tracking-wider">Projects</p>
                </div>
                <div>
                  <h3 className="text-3xl font-bold text-white">06</h3>
                  <p className="text-sm text-gray-500 uppercase tracking-wider">Semester</p>
                </div>
              </div>
            </div>
          </div>

          {/* SKILLS SECTION */}
          <div className="about-reveal">
            <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
              <Cpu className="text-purple-500" /> Technical Arsenal
            </h2>
            
            <div className={styles.techGrid}>
              
              {/* Card 1: Frontend */}
              <div className={styles.techCard}>
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 rounded-lg bg-purple-500/10 text-purple-400">
                    <Code2 size={24} />
                  </div>
                  <h3 className="text-xl font-bold">Frontend Ecosystem</h3>
                </div>
                <div className="flex flex-wrap">
                  {["HTML5", "CSS3", "JavaScript (ES6+)", "TypeScript", "React.js", "Next.js", "Tailwind CSS", "GSAP", "Three.js"].map(skill => (
                    <span key={skill} className={styles.skillPill}>{skill}</span>
                  ))}
                </div>
              </div>

              {/* Card 2: Backend */}
              <div className={styles.techCard}>
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 rounded-lg bg-blue-500/10 text-blue-400">
                    <Database size={24} />
                  </div>
                  <h3 className="text-xl font-bold">Backend & Data</h3>
                </div>
                <div className="flex flex-wrap">
                  {["Node.js", "Express.js", "MongoDB", "Mongoose", "REST APIs", "WebSockets", "Auth (JWT/OAuth)"].map(skill => (
                    <span key={skill} className={styles.skillPill}>{skill}</span>
                  ))}
                </div>
              </div>

              {/* Card 3: Cloud & Tools */}
              <div className={styles.techCard}>
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 rounded-lg bg-green-500/10 text-green-400">
                    <Cloud size={24} />
                  </div>
                  <h3 className="text-xl font-bold">Cloud & DevOps</h3>
                </div>
                <div className="flex flex-wrap">
                  {["AWS", "Vercel", "Cloudflare", "Cloudinary", "Git & GitHub", "Docker", "Postman"].map(skill => (
                    <span key={skill} className={styles.skillPill}>{skill}</span>
                  ))}
                </div>
              </div>

              {/* Card 4: Soft Skills / Others */}
              <div className={styles.techCard}>
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 rounded-lg bg-orange-500/10 text-orange-400">
                    <Globe size={24} />
                  </div>
                  <h3 className="text-xl font-bold">Professional</h3>
                </div>
                <div className="flex flex-wrap">
                  {["System Design", "Agile Methodology", "UI/UX Collaboration", "Technical Writing", "Problem Solving"].map(skill => (
                    <span key={skill} className={styles.skillPill}>{skill}</span>
                  ))}
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>
      
      {/* Footer is included here so the page feels complete */}
      <Footer />
    </div>
  );
};

export default About;