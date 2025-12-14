import * as THREE from 'three';

export const calculateSpherePositions = (count: number, radius: number) => {
  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const phi = Math.acos(-1 + (2 * i) / count);
    const theta = Math.sqrt(count * Math.PI) * phi;
    
    positions[i * 3] = radius * Math.cos(theta) * Math.sin(phi);
    positions[i * 3 + 1] = radius * Math.sin(theta) * Math.sin(phi);
    positions[i * 3 + 2] = radius * Math.cos(phi);
  }
  return positions;
};

export const calculateTextPositions = (text: string, count: number, fontSize: number = 100) => {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  if (!ctx) return new Float32Array(count * 3);

  // Canvas setup
  canvas.width = 2000;
  canvas.height = 1000;
  ctx.font = `bold ${fontSize}px Inter, sans-serif`;
  ctx.fillStyle = 'white';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(text, canvas.width / 2, canvas.height / 2);

  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const data = imageData.data;
  const textCoordinates: {x: number, y: number}[] = [];

  // Sampling pixels
  for (let y = 0; y < canvas.height; y += 4) {
    for (let x = 0; x < canvas.width; x += 4) {
      const index = (y * canvas.width + x) * 4;
      if (data[index + 3] > 128) {
        textCoordinates.push({
          x: (x - canvas.width / 2) / 20,
          y: -(y - canvas.height / 2) / 20
        });
      }
    }
  }

  const positions = new Float32Array(count * 3);
  
  for (let i = 0; i < count; i++) {
    if (i < textCoordinates.length) {
      // 1. Particle is part of the text "VIBEK"
      positions[i * 3] = textCoordinates[i].x;
      positions[i * 3 + 1] = textCoordinates[i].y;
      positions[i * 3 + 2] = 0;
    } else {
      // 2. Unused Particles Logic
      const isBackgroundParticle = Math.random() < 0.05; // Keep 5% as stars

      if (isBackgroundParticle) {
        // Scatter these nearby to form the "Starfield"
        positions[i * 3] = (Math.random() - 0.5) * 80;
        positions[i * 3 + 1] = (Math.random() - 0.5) * 80;
        positions[i * 3 + 2] = (Math.random() - 0.5) * 80; 
      } else {
        // 3. THE FIX: Symmetrical Explosion
        // Instead of sending them to (10000, 10000, 10000) which looks like a top-right fly-off,
        // we send them in random directions very far away.
        
        const radius = 10000; // Very far away (hidden)
        const theta = 2 * Math.PI * Math.random(); // Random angle around Y
        const phi = Math.acos(2 * Math.random() - 1); // Random angle from Z
        
        positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
        positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
        positions[i * 3 + 2] = radius * Math.cos(phi);
      }
    }
  }
  
  return positions;
};