import { Canvas } from '@react-three/fiber';
import { useLoader } from '../components/ui/Loader/LoaderContext';
import ParticleScene from '../components/canvas/ParticleScene';

const Hero = () => {
  const { isLoading } = useLoader();

  return (
    <section className="relative w-full h-screen bg-black overflow-hidden flex flex-col items-center justify-center">
      
      {/* 1. TEXT OVERLAY */}
      <div 
        className={`absolute inset-0 z-10 flex flex-col items-center justify-center pointer-events-none transition-opacity duration-1000 delay-500 ${
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

      {/* 2. 3D SCENE */}
      <div 
        className={`absolute inset-0 transition-opacity duration-[2000ms] ease-in-out ${
          isLoading ? 'opacity-0' : 'opacity-100'
        }`}
      >
        <Canvas camera={{ position: [0, 0, 35], fov: 45 }}>
          <color attach="background" args={['#000000']} />
          <ambientLight intensity={0.5} />
          <ParticleScene isExpanded={!isLoading} text="VIBEK" />
        </Canvas>
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