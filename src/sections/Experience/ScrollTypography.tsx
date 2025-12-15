import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import styles from "./styles.module.css";

gsap.registerPlugin(ScrollTrigger);

const experiences = [
  {
    year: "2025",
    role: "Backend Developer",
    company: "NIC Tripura",
    items: [
      "Architected scalable backend systems for government applications.",
      "Developed cross-platform mobile apps using React Native.",
      "Optimized database queries reducing load times by 40%."
    ]
  },
  {
    year: "2024",
    role: "Collab Developer",
    company: "ICFAICOLLAB",
    items: [
      "Led a team of 4 developers to build a real-time collaboration tool.",
      "Integrated Socket.io for live chat and document editing.",
      "Designed a modular component library for consistent UI."
    ]
  },
  {
    year: "2023",
    role: "Junior Developer",
    company: "Diligently Innovative",
    items: [
      "Assisted in frontend development using React and Tailwind CSS.",
      "Collaborated with UX designers to implement pixel-perfect interfaces.",
      "Debugged and fixed critical production issues."
    ]
  }
];

const PHRASE = "MY EXPERIENCE";

const ScrollTypography: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textLayerRef = useRef<HTMLDivElement>(null);
  const cardsLayerRef = useRef<HTMLDivElement>(null);
  const charRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useGSAP(() => {
    const container = containerRef.current;
    const textLayer = textLayerRef.current;
    const cardsLayer = cardsLayerRef.current;
    const chars = charRefs.current;
    
    if (!container || !textLayer || !cardsLayer) return;

    const cardsScrollAmount = -(cardsLayer.scrollWidth - window.innerWidth + 200);
    const textScrollAmount = -(textLayer.scrollWidth - window.innerWidth) * 0.5;

    // --- ANIMATION 1: Text Entrance ---
    gsap.fromTo(chars, 
      { 
        y: 200, 
        opacity: 0, 
        rotateX: -90, 
        transformOrigin: "bottom center" 
      },
      { 
        y: 0, 
        opacity: 1, 
        rotateX: 0,
        stagger: 0.05, 
        duration: 1.2,
        ease: "back.out(1.5)",
        scrollTrigger: {
          trigger: container,
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      }
    );

    // --- ANIMATION 2: Horizontal Scroll & Shine ---
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container, // Pinning the wrapper
        start: "top top",
        end: "+=3000",
        pin: true,
        scrub: 1,
        invalidateOnRefresh: true,
      }
    });

    // 1. Move Text Left
    tl.to(textLayer, {
      x: textScrollAmount,
      ease: "none",
      duration: 10
    }, "start");

    // 2. Move Cards Left (Faster)
    tl.to(cardsLayer, {
      x: cardsScrollAmount,
      ease: "none",
      duration: 10
    }, "start");

    // 3. Animate the Text Shine (Scroll Linked)
    tl.to(chars, {
      "--mask-pos": "-100% 0", 
      ease: "none",
      duration: 10
    }, "start");

  }, { scope: containerRef });

  return (
    <div className={styles.experienceSection} id="experience">
      {/* Structural Pin Wrapper */}
      <div ref={containerRef} className={styles.pinWrapper}>
        <div className={styles.pinContainer}>
          
          {/* LAYER 1: Background Text */}
          <div ref={textLayerRef} className={styles.textLayer}>
            <h1 className={styles.bigText}>
              {PHRASE.split("").map((char, index) => (
                <span 
                  key={index} 
                  className={styles.char}
                  data-char={char === " " ? "\u00A0" : char}
                  ref={(el) => { charRefs.current[index] = el }}
                >
                  {char === " " ? "\u00A0" : char}
                </span>
              ))}
            </h1>
          </div>

          {/* LAYER 2: Foreground Cards */}
          <div ref={cardsLayerRef} className={styles.cardsLayer}>
            {experiences.map((exp, index) => (
              <div key={index} className={styles.card}>
                
                {/* Inner Content Wrapper */}
                <div className={styles.cardContent}>
                  
                  <div className={styles.bgYear}>{exp.year}</div>

                  <div className={styles.cardHeader}>
                    <div className={styles.companyLabel}>
                       {exp.company}
                    </div>
                    <h3 className={styles.roleTitle}>{exp.role}</h3>
                  </div>

                  <ul className={styles.cardList}>
                    {exp.items.map((item, i) => (
                      <li key={i} className={styles.cardItem}>
                        <span className={styles.arrowIcon}>➔</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScrollTypography;