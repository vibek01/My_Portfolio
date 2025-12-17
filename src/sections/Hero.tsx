import { useState, useEffect, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { EffectComposer, Bloom } from '@react-three/postprocessing'; 
import { Github, Linkedin, Mail, Eye } from 'lucide-react';
import { useLoader } from '../components/ui/Loader/LoaderContext';
import ParticleScene from '../components/canvas/ParticleScene';

const Hero = () => {
  const { isLoading } = useLoader();
  const sectionRef = useRef<HTMLElement>(null);
  const [isHeroVisible, setIsHeroVisible] = useState(true);

  // Performance Optimization: Pause 3D Render when out of view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsHeroVisible(entry.isIntersecting);
      },
      {
        root: null,
        threshold: 0,
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full h-screen">
      
      {/* 
        1. BACKGROUND CANVAS (Fixed Position)
      */}
      <div 
        className={`fixed inset-0 bg-black transition-opacity duration-[2000ms] ease-in-out ${
          isLoading ? 'opacity-0' : 'opacity-100'
        }`}
      >
        <Canvas 
          camera={{ position: [0, 0, 35], fov: 45 }}
          frameloop={isHeroVisible ? "always" : "never"}
          dpr={[1, 2]}
        >
          <color attach="background" args={['#000000']} />
          <ambientLight intensity={0.5} />
          
          <ParticleScene isExpanded={!isLoading} text="VIBEK" />
          
          <EffectComposer>
            <Bloom 
              luminanceThreshold={0.2} 
              luminanceSmoothing={0.9} 
              height={300}             
              intensity={1.5}          
            />
          </EffectComposer>
        </Canvas>
      </div>

      {/* 
        2. FOREGROUND CONTENT
      */}
      <div 
        className={`relative z-10 w-full h-full flex flex-col items-center justify-center pointer-events-none transition-opacity duration-1000 delay-500 ${
          isLoading ? 'opacity-0' : 'opacity-100'
        }`}
      >
        <span className="text-gray-400 tracking-[0.3em] text-sm font-light mb-[12vh]">
          HI, I AM
        </span>

        {/* Spacer to push content below the 3D text */}
        <div className="h-[15vh]"></div>

        <h2 className="mt-[12vh] text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-white text-xl md:text-2xl font-light tracking-[0.2em] uppercase text-center px-4">
          Full Stack Developer
        </h2>

        {/* 
           === VIEW RESUME BUTTON === 
        */}
        <a 
          href="/resume.pdf" 
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 pointer-events-auto group flex items-center gap-3 px-6 py-3 rounded-full bg-white/5 border border-white/10 backdrop-blur-md hover:bg-white/10 hover:border-purple-500/50 transition-all duration-300 cursor-pointer"
        >
          <span className="text-sm font-medium text-gray-300 group-hover:text-white tracking-widest uppercase">
            View Resume
          </span>
          <Eye size={16} className="text-gray-400 group-hover:text-purple-400 transition-colors" />
        </a>
      </div>

      {/* 
        3. SOCIAL LINKS (Fixed Bottom Left)
      */}
      <div className={`fixed bottom-6 left-6 md:bottom-12 md:left-12 z-20 flex flex-col gap-6 transition-all duration-1000 delay-[1500ms] ${
        isLoading ? 'opacity-0 translate-y-10' : 'opacity-100 translate-y-0'
      }`}>
        <a 
          href="https://github.com/vibek01/" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="text-gray-400 hover:text-white transition-colors"
        >
          <Github size={20} />
        </a>
        <a 
          href="https://www.linkedin.com/in/vibek-prasad-bin-840ba72b0?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="text-gray-400 hover:text-white transition-colors"
        >
          <Linkedin size={20} />
        </a>
        <a 
          href="mailto:vibekbin305@gmail.com" 
          className="text-gray-400 hover:text-white transition-colors"
        >
          <Mail size={20} />
        </a>
        
        {/* Vertical Line Decoration */}
        <div className="w-[1px] h-12 bg-gray-700 mx-auto mt-2"></div>
      </div>

      {/* 
        4. SCROLL INDICATOR
      */}
      <div className={`absolute bottom-10 left-0 right-0 flex justify-center pointer-events-none transition-opacity duration-1000 delay-[2000ms] ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
        <p className="text-gray-600 text-[10px] tracking-[0.4em] uppercase animate-pulse">
          Scroll to Explore
        </p>
      </div>
    </section>
  );
};

export default Hero;