import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import styles from "./styles.module.css";

gsap.registerPlugin(ScrollTrigger);

const experiences = [
  {
    year: "2025",
    role: "Backend & App Developer",
    company: "NIC Tripura",
    items: [
      "Architected scalable backend systems for government applications.",
      "Developed cross-platform mobile apps using React Native.",
      "Optimized database queries reducing load times by 40%.",
      "Implemented secure authentication protocols for sensitive data."
    ]
  },
  {
    year: "2024",
    role: "Collaborative Developer",
    company: "ICFAICOLLAB Project",
    items: [
      "Led a team of 4 developers to build a real-time collaboration tool.",
      "Integrated Socket.io for live chat and document editing.",
      "Designed a modular component library for consistent UI.",
      "Managed CI/CD pipelines for automated deployment."
    ]
  },
  {
    year: "2023",
    role: "Junior Developer",
    company: "Diligently Innovative",
    items: [
      "Assisted in frontend development using React and Tailwind CSS.",
      "Collaborated with UX designers to implement pixel-perfect interfaces.",
      "Debugged and fixed critical production issues.",
      "Participated in daily stand-ups and agile sprint planning."
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

    const cardsScrollAmount = -(cardsLayer.scrollWidth + window.innerWidth);
    const textScrollAmount = -(textLayer.scrollWidth - window.innerWidth) * 0.5;

    // --- ANIMATION 1: The "Curvy" Entrance ---
    // This runs automatically when the section enters the viewport
    gsap.fromTo(chars, 
      { 
        y: 200, 
        opacity: 0, 
        rotateX: -90, // This creates the curve effect
        transformOrigin: "bottom center" // Pivot from bottom
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

    // --- ANIMATION 2: The Parallax Scroll ---
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: "top top",
        end: "+=5000", 
        pin: true,
        scrub: 1,
        invalidateOnRefresh: true,
      }
    });

    // Move Text Left
    tl.to(textLayer, {
      x: textScrollAmount,
      ease: "none",
      duration: 10
    }, "start");

    // Move Cards Left (Faster)
    tl.to(cardsLayer, {
      x: cardsScrollAmount,
      ease: "none",
      duration: 10
    }, "start");

  }, { scope: containerRef });

  return (
    <div ref={containerRef} className={styles.experienceSection} id="experience">
      <div className={styles.pinContainer}>
        
        {/* LAYER 1: Background Text */}
        <div ref={textLayerRef} className={styles.textLayer}>
          <h1 className={styles.bigText}>
            {PHRASE.split("").map((char, index) => (
              <span 
                key={index} 
                className={styles.char}
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
              <div className={styles.cardHeader}>
                <span className={styles.year}>{exp.year}</span>
                <h3 className={styles.cardTitle}>{exp.role}</h3>
                <p className={styles.company}>{exp.company}</p>
              </div>
              <ul className={styles.cardList}>
                {exp.items.map((item, i) => (
                  <li key={i} className={styles.cardItem}>
                    <div className={styles.checkIcon}></div>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default ScrollTypography;