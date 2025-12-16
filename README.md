# Vibek Prasad Bin | 3D Interactive Portfolio

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Three.js](https://img.shields.io/badge/Three.js-black?style=for-the-badge&logo=three.js&logoColor=white)
![GSAP](https://img.shields.io/badge/GSAP-88CE02?style=for-the-badge&logo=greensock&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E)

> A high-performance, immersive developer portfolio featuring 3D particle systems, physics-based animations, and smooth scroll interactions. Built to showcase Full Stack capabilities with a focus on UI/UX and rendering performance.

<!-- ![Portfolio Preview](./public/images/banner.png) -->
<!-- Add a screenshot of your site here if you like -->

## 🚀 Live Demo
[**Visit Portfolio**](https://vibek-portfolio.vercel.app/)

---

##  Tech Stack

*   **Core:** React.js (Vite), TypeScript
*   **Styling:** Tailwind CSS, CSS Modules
*   **3D & Graphics:** Three.js, React Three Fiber, React Post-processing (Bloom)
*   **Animations:** GSAP (ScrollTrigger), Custom Physics (Magnetic Hover)
*   **Routing:** React Router DOM
*   **Icons:** Lucide React

---

## Key Features

### 1. Immersive 3D Hero Section
*   Interactive particle system forming the text "VIBEK".
*   Mouse-repulsion physics and click-based shockwave effects.
*   Post-processing Bloom effect for a glowing, premium aesthetic.
*   **Optimization:** Uses `IntersectionObserver` to pause the 3D render loop (`frameloop="never"`) when the section is out of view, saving GPU resources.

### 2. Advanced Animations
*   **Magnetic Navigation:** Buttons and links physically pull towards the mouse cursor.
*   **Horizontal Scroll Gallery:** A pinned section for "Selected Works" that transforms vertical scroll into horizontal movement (Desktop & Mobile optimized).
*   **Parallax Typography:** Massive background text in the Experience section that moves at a different speed than the foreground content.

### 3. Interactive UI Components
*   **Custom Preloader:** A "Pill-to-Fullscreen" reveal animation with a smooth 0-100% counter.
*   **Glassmorphism:** Frosted glass effects on cards, forms, and navigation using `backdrop-filter` and semi-transparent borders.
*   **Accordion Experience:** An interactive list that expands to reveal job details, GitHub links, and tech stacks.

### 4. Fully Responsive
*   **Mobile-First:** Custom layouts for mobile devices (e.g., resized 3D particles, adapted horizontal scroll, full-screen mobile menu overlay).
*   **Touch Optimized:** Animations and interactions are tuned to work smoothly on touch screens.

---

## Performance Optimizations

This portfolio is built with performance as a priority:

*   **GPU Hardware Acceleration:** Forced `transform: translate3d(0,0,0)` on heavy scroll sections to prevent layout thrashing.
*   **Render Loop Management:** The Three.js canvas stops rendering completely when the user scrolls past the Hero section.
*   **Layout Thrashing Prevention:** Strategic use of `margin-top` buffers between pinned sections (Work/Experience) to prevent frame drops during unpinning.
*   **CSS Optimization:** Removed heavy `backdrop-filter: blur` effects on moving elements to maintain 60FPS during scrolling.
*   **Asset Management:** Lazy loading for images and optimized font usage.

## Running Locally

* Clone the repository
```bash
git clone https://github.com/vibek01/portfolio.git
cd portfolio
```

* Install dependencies

```bash
npm install
```
* Start the development server
```bash
npm run dev
```
* Build for production
```bash
npm run build
```
## Contact
* Email: vibekbin305@gmail.com
* LinkedIn: Vibek Prasad Bin
* GitHub: vibek01

© 2025 Vibek Prasad Bin. Built with passion and code.

---