import { useRef, useMemo, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import gsap from 'gsap';
import { calculateSpherePositions, calculateTextPositions } from '../../utils/particleUtils';

interface ParticleSceneProps {
  text?: string;
  isExpanded: boolean;
}

const ParticleScene = ({ text = "VIBEK", isExpanded }: ParticleSceneProps) => {
  const pointsRef = useRef<THREE.Points>(null);
  const count = 12000; 
  
  // Memoize positions
  const spherePositions = useMemo(() => calculateSpherePositions(count, 12), []);
  const textPositions = useMemo(() => calculateTextPositions(text, count, 150), [text]);
  
  // Animation State
  const animState = useRef({ progress: 0 }); 

  useEffect(() => {
    if (isExpanded && pointsRef.current) {
      // 1. Morph Animation (Sphere -> Text + Explosion)
      gsap.to(animState.current, {
        progress: 1,
        duration: 2.5,
        ease: "power3.inOut",
        delay: 0.5 
      });

      // 2. Reset Rotation to face camera
      gsap.to(pointsRef.current.rotation, {
        x: 0,
        y: 0,
        z: 0,
        duration: 2,
        ease: "power3.out"
      });
    }
  }, [isExpanded]);

  useFrame((state) => {
    if (!pointsRef.current) return;

    const positions = pointsRef.current.geometry.attributes.position.array as Float32Array;
    const progress = animState.current.progress;

    // Rotate only while it is a sphere
    if (progress < 0.1) {
      pointsRef.current.rotation.y += 0.002;
    }
    
    // Interpolate positions
    for (let i = 0; i < count; i++) {
      const ix = i * 3;
      const iy = i * 3 + 1;
      const iz = i * 3 + 2;

      // Linear interpolation
      // Because the "hidden" textPositions are now scattered symmetrically in 360 degrees,
      // this will look like the sphere is expanding/evaporating in all directions.
      positions[ix] = spherePositions[ix] + (textPositions[ix] - spherePositions[ix]) * progress;
      positions[iy] = spherePositions[iy] + (textPositions[iy] - spherePositions[iy]) * progress;
      positions[iz] = spherePositions[iz] + (textPositions[iz] - spherePositions[iz]) * progress;
      
      // Add subtle noise/wave movement to the stars and text
      if (progress > 0.8) {
         // Gentle float for the final state
         positions[ix] += Math.sin(state.clock.elapsedTime * 0.5 + positions[iy]) * 0.005;
      } else {
         // More active movement during transition
         positions[ix] += Math.sin(state.clock.elapsedTime + positions[iy]) * 0.02;
      }
    }

    pointsRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={new Float32Array(count * 3)}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={count}
          array={new Float32Array(count * 3).map(() => 1)} 
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.12} 
        color="#d8b4fe" 
        transparent
        opacity={1.0} 
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
};

export default ParticleScene;