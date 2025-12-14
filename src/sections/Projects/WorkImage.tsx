import React from "react";
import { MdArrowOutward } from "react-icons/md";
import styles from "./styles.module.css";

interface WorkImageProps {
  image: string;
  alt?: string;
  link?: string;
}

const WorkImage: React.FC<WorkImageProps> = ({ image, alt, link }) => {
  return (
    <div className={styles.workImageWrapper}>
      <a
        className={styles.workImageLink}
        href={link || "#"}
        target="_blank"
        rel="noopener noreferrer"
      >
        <div className={styles.workLinkIcon}>
          <MdArrowOutward />
        </div>
        
        <img src={image} alt={alt || "Project Preview"} loading="lazy" />
      </a>
    </div>
  );
};

export default WorkImage;