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
      // Particle is part of the text
      positions[i * 3] = textCoordinates[i].x;
      positions[i * 3 + 1] = textCoordinates[i].y;
      positions[i * 3 + 2] = 0;
    } else {
      // Particle is "excess" (background)
      // LOGIC CHANGE: We hide 95% of excess particles to reduce clutter
      const isBackgroundParticle = Math.random() < 0.05; // Only keep 5% visible

      if (isBackgroundParticle) {
        // Scatter these few particles widely for a starfield effect
        positions[i * 3] = (Math.random() - 0.5) * 80;
        positions[i * 3 + 1] = (Math.random() - 0.5) * 80;
        positions[i * 3 + 2] = (Math.random() - 0.5) * 80; 
      } else {
        // Hide the rest far away behind the camera
        positions[i * 3] = 10000;
        positions[i * 3 + 1] = 10000;
        positions[i * 3 + 2] = 10000;
      }
    }
  }
  
  return positions;
};