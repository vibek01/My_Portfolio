import { useEffect, useState } from "react";
import { useProgress } from "./useProgress";
import { useLoader } from "./LoaderContext";
import "./Loader.css";

const Loader = () => {
  const progress = useProgress();
  const { setIsLoading } = useLoader();
  
  const [expanded, setExpanded] = useState(false);
  const [textVisible, setTextVisible] = useState(true);
  const [wrapperVisible, setWrapperVisible] = useState(true);

  useEffect(() => {
    if (progress === 100) {
      // 1. Fade out text
      setTextVisible(false);

      // 2. Start expansion shortly after
      setTimeout(() => {
        setExpanded(true);
        
        // 3. Wait for expansion animation (1.2s in CSS) to mostly finish
        setTimeout(() => {
          setWrapperVisible(false); // Fade out the black box
          
          // 4. Unmount loader
          setTimeout(() => {
            setIsLoading(false);
          }, 500); 
        }, 1100); 
      }, 300);
    }
  }, [progress, setIsLoading]);

  if (!wrapperVisible && !expanded) return null;

  return (
    <div 
      className="loader-wrapper" 
      style={{ opacity: wrapperVisible ? 1 : 0 }}
    >
      <div className={`loader-box ${expanded ? "expanded" : ""}`}>
        <div className={`loader-content ${!textVisible ? "hidden" : ""}`}>
          <div className="loader-label">LOADING</div>
          <div className="loader-percent">
            {progress}%
            <span className="cursor-block"></span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loader;