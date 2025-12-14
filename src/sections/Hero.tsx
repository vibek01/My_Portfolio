import { Canvas } from '@react-three/fiber';
import { Github, Linkedin, Mail } from 'lucide-react'; // Make sure lucide-react is installed
import { useLoader } from '../components/ui/Loader/LoaderContext';
import ParticleScene from '../components/canvas/ParticleScene';

const Hero = () => {
  const { isLoading } = useLoader();

  return (
    // Changed h-screen to min-h-screen to allow scrolling flow
    <section className="relative w-full h-screen">
      
      {/* 
        1. BACKGROUND CANVAS (Fixed Position)
        It stays put while you scroll, but the Particles inside it will move via the useFrame logic.
      */}
      <div 
        className={`fixed inset-0 bg-black transition-opacity duration-[2000ms] ease-in-out ${
          isLoading ? 'opacity-0' : 'opacity-100'
        }`}
      >
        <Canvas camera={{ position: [0, 0, 35], fov: 45 }}>
          <color attach="background" args={['#000000']} />
          <ambientLight intensity={0.5} />
          <ParticleScene isExpanded={!isLoading} text="VIBEK" />
        </Canvas>
      </div>

      {/* 
        2. FOREGROUND CONTENT (Absolute/Scrollable)
        This text will scroll UP naturally with the page.
      */}
      <div 
        className={`relative z-10 w-full h-full flex flex-col items-center justify-center pointer-events-none transition-opacity duration-1000 delay-500 ${
          isLoading ? 'opacity-0' : 'opacity-100'
        }`}
      >
        <span className="text-gray-400 tracking-[0.3em] text-sm font-light mb-[12vh]">
          HI, I AM
        </span>

        <div className="h-[15vh]"></div>

        <h2 className="mt-[12vh] text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-white text-xl md:text-2xl font-light tracking-[0.2em] uppercase">
          Full Stack Developer
        </h2>
      </div>

      {/* 
        3. SOCIAL LINKS (Fixed Bottom Left)
      */}
      <div className={`fixed bottom-12 left-12 z-20 flex flex-col gap-6 transition-all duration-1000 delay-[1500ms] ${
        isLoading ? 'opacity-0 translate-y-10' : 'opacity-100 translate-y-0'
      }`}>
        <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
          <Github size={20} />
        </a>
        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
          <Linkedin size={20} />
        </a>
        <a href="mailto:email@example.com" className="text-gray-400 hover:text-white transition-colors">
          <Mail size={20} />
        </a>
        {/* Vertical Line Decoration */}
        <div className="w-[1px] h-12 bg-gray-700 mx-auto mt-2"></div>
      </div>

      {/* Scroll Indicator */}
      <div className={`absolute bottom-10 left-0 right-0 flex justify-center pointer-events-none transition-opacity duration-1000 delay-[2000ms] ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
        <p className="text-gray-600 text-[10px] tracking-[0.4em] uppercase animate-pulse">
          Scroll to Explore
        </p>
      </div>
    </section>
  );
};

export default Hero;