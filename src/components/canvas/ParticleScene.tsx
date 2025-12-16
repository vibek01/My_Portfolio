import { useRef, useMemo, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import gsap from 'gsap';
import { calculateSpherePositions, calculateTextPositions } from '../../utils/particleUtils';

interface ParticleSceneProps {
  text?: string;
  isExpanded: boolean;
}

const ParticleScene = ({ text = "VIBEK", isExpanded }: ParticleSceneProps) => {
  const pointsRef = useRef<THREE.Points>(null);
  
  // Get camera and screen size to handle responsiveness
  const { camera, size } = useThree(); 
  
  // === RESPONSIVE LOGIC ===
  // If screen width is less than 768px (Mobile), scale down to 0.55 (55%)
  // Otherwise keep it at 1 (100%)
  const isMobile = size.width < 768;
  const meshScale = isMobile ? 0.55 : 1;

  const count = 12000; 
  
  // Memoize positions
  const spherePositions = useMemo(() => calculateSpherePositions(count, 12), []);
  const textPositions = useMemo(() => calculateTextPositions(text, count, 150), [text]);
  
  // Physics State
  const hoverOffsets = useRef(new Float32Array(count * 3));
  const colorArray = useMemo(() => new Float32Array(count * 3).fill(1), [count]); // RGB values
  
  // Mouse & Interaction State
  const tempMousePos = useMemo(() => new THREE.Vector3(10000, 10000, 10000), []);
  const tempVec = useMemo(() => new THREE.Vector3(), []);
  const tempDir = useMemo(() => new THREE.Vector3(), []);
  
  // Click Shockwave State
  const shockwaveRef = useRef(0); 

  const animState = useRef({ progress: 0 }); 

  // Handle Click
  useEffect(() => {
    const handleClick = () => {
      // Trigger shockwave
      gsap.fromTo(shockwaveRef, { current: 1 }, { current: 0, duration: 1.5, ease: "power2.out" });
    };
    window.addEventListener('click', handleClick);
    return () => window.removeEventListener('click', handleClick);
  }, []);

  useEffect(() => {
    if (isExpanded && pointsRef.current) {
      gsap.to(animState.current, {
        progress: 1,
        duration: 2.5,
        ease: "power3.inOut",
        delay: 0.5 
      });
      gsap.to(pointsRef.current.rotation, { x: 0, y: 0, z: 0, duration: 2, ease: "power3.out" });
    }
  }, [isExpanded]);

  useFrame((state) => {
    if (!pointsRef.current) return;

    const positions = pointsRef.current.geometry.attributes.position.array as Float32Array;
    const colors = pointsRef.current.geometry.attributes.color.array as Float32Array;
    const progress = animState.current.progress;
    
    // --- SCROLL LOGIC ---
    const scrollY = window.scrollY;
    const targetZ = scrollY * 0.05; 
    pointsRef.current.position.z = THREE.MathUtils.lerp(pointsRef.current.position.z, targetZ, 0.1);
    const material = pointsRef.current.material as THREE.PointsMaterial;
    material.opacity = Math.max(0, 1 - Math.max(0, scrollY - 200) / 600);

    // --- MOUSE CALC ---
    if (progress > 0.8) {
      const isDefaultPointer = state.pointer.x === 0 && state.pointer.y === 0;
      if (!isDefaultPointer) {
        tempVec.set(state.pointer.x, state.pointer.y, 0.5);
        tempVec.unproject(camera);
        tempDir.copy(tempVec).sub(camera.position).normalize();
        const distance = (pointsRef.current.position.z - camera.position.z) / tempDir.z;
        tempMousePos.copy(camera.position).add(tempDir.multiplyScalar(distance));
      }
    }

    // Rotation phase
    if (progress < 0.1) pointsRef.current.rotation.y += 0.002;
    
    // Base Colors
    const baseColor = new THREE.Color("#d8b4fe"); // Purple
    const hoverColor = new THREE.Color("#ffffff"); // White Hot

    // --- LOOP ---
    for (let i = 0; i < count; i++) {
      const ix = i * 3;
      const iy = i * 3 + 1;
      const iz = i * 3 + 2;

      // 1. Morph Base
      const baseX = spherePositions[ix] + (textPositions[ix] - spherePositions[ix]) * progress;
      const baseY = spherePositions[iy] + (textPositions[iy] - spherePositions[iy]) * progress;
      const baseZ = spherePositions[iz] + (textPositions[iz] - spherePositions[iz]) * progress;

      // 2. Physics Calculation
      let targetOffsetX = 0;
      let targetOffsetY = 0;
      let targetOffsetZ = 0;
      let colorMix = 0; // 0 = base, 1 = hover

      if (progress > 0.8) {
        // IMPORTANT: We must adjust mouse interaction for scale if we scale the mesh
        // But for visual simplicity, we keep physics relative to world space
        const dx = baseX - tempMousePos.x;
        const dy = baseY - tempMousePos.y;
        const distSq = dx * dx + dy * dy;
        const dist = Math.sqrt(distSq);

        // A. Mouse Hover Effect
        const hoverRadius = 12;
        if (dist < hoverRadius) {
          const force = Math.pow((hoverRadius - dist) / hoverRadius, 2); 
          const strength = 6; 
          const angle = Math.atan2(dy, dx);
          
          targetOffsetX += Math.cos(angle) * force * strength;
          targetOffsetY += Math.sin(angle) * force * strength;
          targetOffsetZ += force * 4.0;
          colorMix = force; 
        }

        // B. Click Shockwave Effect
        if (shockwaveRef.current > 0.01) {
           const waveRadius = (1 - shockwaveRef.current) * 50; 
           const waveWidth = 5;
           const diff = Math.abs(dist - waveRadius);
           
           if (diff < waveWidth) {
              const waveForce = (1 - diff / waveWidth) * shockwaveRef.current * 10;
              const angle = Math.atan2(dy, dx);
              
              targetOffsetX += Math.cos(angle) * waveForce;
              targetOffsetY += Math.sin(angle) * waveForce;
              targetOffsetZ += waveForce * 0.5;
              
              colorMix = Math.max(colorMix, waveForce * 0.5); 
           }
        }
      }

      // 3. Apply Physics (Lerp)
      hoverOffsets.current[ix] += (targetOffsetX - hoverOffsets.current[ix]) * 0.1;
      hoverOffsets.current[iy] += (targetOffsetY - hoverOffsets.current[iy]) * 0.1;
      hoverOffsets.current[iz] += (targetOffsetZ - hoverOffsets.current[iz]) * 0.1;

      positions[ix] = baseX + hoverOffsets.current[ix];
      positions[iy] = baseY + hoverOffsets.current[iy];
      positions[iz] = baseZ + hoverOffsets.current[iz];

      // 4. Update Color
      const r = baseColor.r + (hoverColor.r - baseColor.r) * colorMix;
      const g = baseColor.g + (hoverColor.g - baseColor.g) * colorMix;
      const b = baseColor.b + (hoverColor.b - baseColor.b) * colorMix;

      colors[ix] = r;
      colors[iy] = g;
      colors[iz] = b;
      
      // Noise
      if (progress > 0.8) {
         positions[ix] += Math.sin(state.clock.elapsedTime * 0.5 + positions[iy]) * 0.005;
         positions[iz] += Math.cos(state.clock.elapsedTime * 0.3 + positions[ix]) * 0.005;
      } else {
         positions[ix] += Math.sin(state.clock.elapsedTime + positions[iy]) * 0.02;
      }
    }

    pointsRef.current.geometry.attributes.position.needsUpdate = true;
    pointsRef.current.geometry.attributes.color.needsUpdate = true;
  });

  return (
    // Apply the responsive scale here
    <points ref={pointsRef} scale={[meshScale, meshScale, meshScale]}>
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
          array={colorArray} 
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.12} 
        vertexColors={true}
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