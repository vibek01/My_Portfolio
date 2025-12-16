import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Code2, Database, Cloud, Globe, Terminal, Cpu } from "lucide-react";
import styles from "./styles.module.css";
import Footer from "../../components/layout/Footer";

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
            
            {/* Left: Image */}
            <div className="about-reveal w-full md:w-1/3">
              <div className={styles.imageWrapper}>
                {/* Replace with your actual photo */}
                <img 
                  src="images/MYPIC.jpg" 
                  alt="Vibek Prasad Bin" 
                />
                <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-black to-transparent">
                  <div className="flex items-center gap-2 text-purple-400">
                    <Terminal size={16} />
                    <span className="text-xs font-mono uppercase tracking-widest">Software Engineer</span>
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
                  I’m <strong className="text-white">Vibek Prasad Bin</strong>, a software engineer focused on building reliable, scalable web systems. I work across the stack, from designing RESTful backends to crafting clean, performant user interfaces.
                </p>
                <p>
                  I’ve built real-world applications involving multi-user workflows, role-based systems, and production-style backend architectures using <span className="text-white">Java, Spring Boot, React, and React Native</span>. My work emphasizes clarity, performance, and maintainability over shortcuts.
                </p>
                <p>
                  I enjoy turning complex requirements into practical solutions and continuously improving how systems are designed, deployed, and experienced by users.
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
                {/* Replaced Semester with Focus/Domain */}
                <div>
                  <h3 className="text-3xl font-bold text-white">Web/App</h3>
                  <p className="text-sm text-gray-500 uppercase tracking-wider">Focus</p>
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
              
              {/* Card 1: Frontend (Added React Native) */}
              <div className={styles.techCard}>
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 rounded-lg bg-purple-500/10 text-purple-400">
                    <Code2 size={24} />
                  </div>
                  <h3 className="text-xl font-bold">Frontend & Mobile</h3>
                </div>
                <div className="flex flex-wrap">
                  {["React.js", "React Native", "Next.js", "TypeScript", "Tailwind CSS", "JavaScript (ES6+)", "GSAP", "HTML5/CSS3"].map(skill => (
                    <span key={skill} className={styles.skillPill}>{skill}</span>
                  ))}
                </div>
              </div>

              {/* Card 2: Backend (Added Java & Spring Boot) */}
              <div className={styles.techCard}>
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 rounded-lg bg-blue-500/10 text-blue-400">
                    <Database size={24} />
                  </div>
                  <h3 className="text-xl font-bold">Backend & Data</h3>
                </div>
                <div className="flex flex-wrap">
                  {["Java", "Spring Boot", "Node.js", "Express.js", "MySQL", "MongoDB", "REST APIs", "Microservices"].map(skill => (
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
                  {["AWS", "Docker", "Git & GitHub", "Cloudflare", "Postman", "Vercel", "CI/CD Pipelines"].map(skill => (
                    <span key={skill} className={styles.skillPill}>{skill}</span>
                  ))}
                </div>
              </div>

              {/* Card 4: Professional */}
              <div className={styles.techCard}>
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 rounded-lg bg-orange-500/10 text-orange-400">
                    <Globe size={24} />
                  </div>
                  <h3 className="text-xl font-bold">Professional</h3>
                </div>
                <div className="flex flex-wrap">
                  {["System Design", "Scalable Architecture", "Agile Methodology", "Clean Code", "Problem Solving"].map(skill => (
                    <span key={skill} className={styles.skillPill}>{skill}</span>
                  ))}
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default About;