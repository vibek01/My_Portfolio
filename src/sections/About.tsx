import React, { useEffect, useRef } from 'react';
import BentoCard from '../components/ui/BentoCard';
import { Code2, Globe, Cpu, Terminal, Coffee, Database } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate cards staggering in
      gsap.from(".bento-item", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 60%", // Starts when top of section hits 60% of viewport
          toggleActions: "play none none reverse"
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out"
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="about" className="relative z-10 w-full min-h-screen bg-black py-24 px-4 md:px-8 flex flex-col items-center">
      
      {/* Section Header */}
      <div className="max-w-7xl w-full mb-16 bento-item">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
          Beyond the <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-purple-200">Code</span>
        </h2>
        <p className="text-gray-400 text-lg max-w-2xl leading-relaxed">
          I'm Vibek, a Full Stack Developer who bridges the gap between creative design and robust engineering. 
          Currently building scalable applications on the M4 silicon.
        </p>
      </div>

      {/* The Bento Grid */}
      <div className="max-w-7xl w-full grid grid-cols-1 md:grid-cols-3 md:grid-rows-2 gap-4 md:gap-6 auto-rows-[minmax(180px,auto)]">
        
        {/* 1. The "Terminal" / Tech Stack (Large - Spans 2 cols) */}
        <BentoCard className="md:col-span-2 md:row-span-1 bento-item" title="Technical Arsenal">
          <div className="flex flex-col justify-between h-full">
            <div className="font-mono text-sm text-gray-300 bg-black/40 p-4 rounded-lg border border-white/5 mb-4">
              <div className="flex gap-2 mb-3 border-b border-white/10 pb-2">
                <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
              </div>
              <p className="mb-1"><span className="text-green-400">➜</span> <span className="text-purple-300">~</span> brew install full-stack</p>
              <p className="text-gray-500 animate-pulse">Installing dependencies...</p>
            </div>
            
            <div className="flex flex-wrap gap-3">
              {['React 18', 'TypeScript', 'Next.js', 'Node.js', 'Tailwind', 'MongoDB', 'AWS', 'Three.js'].map((tech) => (
                <span key={tech} className="px-3 py-1.5 text-xs font-medium rounded-full bg-white/5 border border-white/10 text-gray-300 hover:bg-white/10 hover:text-white transition-colors cursor-default">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </BentoCard>

        {/* 2. Location (Small) */}
        <BentoCard className="md:col-span-1 bento-item" title="Base of Operations">
          <div className="flex flex-col items-center justify-center h-full text-center">
            <div className="relative w-20 h-20 mb-4 rounded-full bg-purple-500/10 flex items-center justify-center border border-purple-500/20">
              <Globe className="text-purple-400 w-10 h-10 animate-[spin_10s_linear_infinite]" />
              <div className="absolute w-2 h-2 bg-purple-400 rounded-full top-3 right-5 animate-ping"></div>
            </div>
            <h4 className="text-xl font-bold text-white">India</h4>
            <p className="text-sm text-gray-500">IST (UTC+05:30)</p>
          </div>
        </BentoCard>

        {/* 3. Current Focus (Small) */}
        <BentoCard className="md:col-span-1 bento-item" title="Current Focus">
          <div className="flex flex-col justify-center h-full gap-4">
            <div className="flex items-center gap-4 p-3 rounded-xl bg-white/5 border border-white/5">
              <Cpu className="text-blue-400" />
              <div>
                <p className="text-white font-medium">System Design</p>
                <p className="text-xs text-gray-500">Scalable Architecture</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-3 rounded-xl bg-white/5 border border-white/5">
              <Database className="text-green-400" />
              <div>
                <p className="text-white font-medium">Cloud Native</p>
                <p className="text-xs text-gray-500">AWS & Serverless</p>
              </div>
            </div>
          </div>
        </BentoCard>

        {/* 4. Stats / Experience (Medium - Spans 2 cols) */}
        <BentoCard className="md:col-span-2 bento-item" title="Development Philosophy">
          <div className="flex flex-col md:flex-row gap-6 h-full items-center">
            <div className="flex-1">
              <p className="text-gray-300 leading-relaxed mb-4">
                I don't just write code; I engineer solutions. My workflow on the <span className="text-white font-semibold">MacBook Air M4</span> is optimized for speed and efficiency, leveraging tools like Homebrew and Docker to maintain clean environments.
              </p>
              <div className="flex items-center gap-2 text-sm text-purple-400 font-medium">
                <Terminal size={16} />
                <span>Clean Code Enthusiast</span>
              </div>
            </div>
            
            {/* Divider */}
            <div className="w-full h-px md:w-px md:h-full bg-white/10"></div>
            
            <div className="flex-1 grid grid-cols-2 gap-4 w-full">
              <div className="p-4 rounded-2xl bg-black/20 text-center">
                <h4 className="text-3xl font-bold text-white mb-1">10+</h4>
                <p className="text-xs text-gray-500 uppercase tracking-wider">Projects</p>
              </div>
              <div className="p-4 rounded-2xl bg-black/20 text-center">
                <h4 className="text-3xl font-bold text-white mb-1">100%</h4>
                <p className="text-xs text-gray-500 uppercase tracking-wider">Commitment</p>
              </div>
            </div>
          </div>
        </BentoCard>

      </div>
    </section>
  );
};

export default About;