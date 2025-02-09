// Inspired by Yaroslav Kosinets' CodePen: https://codepen.io/ykosinets/pen/XJrQYbp
// Heart SVGs created using https://www.svgviewer.dev/

import React, { useEffect, useRef } from 'react';

const AnjaliFigure: React.FC = () => {
  const figureRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          } else {
            entry.target.classList.remove('visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    if (figureRef.current) {
      observer.observe(figureRef.current);
    }

    return () => {
      if (figureRef.current) {
        observer.unobserve(figureRef.current);
      }
    };
  }, []);

  return (
    <div className="anjali" ref={figureRef}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 831 509">
        <path 
          className="heart heart--is-small" 
          d="M444.44,386.14c1.63-56.83,22.45-110.89,42.05-120.77,19.6-9.88,44.18.53,40.96,36.43,28.54-14.75,68.81-13.58,72.18,16.2,2.82,24.86-27.91,34.7-62.9,37.01-34.98,2.31-67.64,12.11-92.3,31.13Z"
        />
        <path 
          className="heart heart--is-large" 
          d="M441,401.62c-10.03-35.56-29.5-70.5-43-113s-8.18-96.55,20-98c18.22-.94,27.5,15.4,30,42,51.67-71.77,131.93-55.64,145.5-33.5,22.26,36.34-23.06,66.74-59.5,85.5-54.49,28.06-75.94,72.67-93,117Z"
        />
        <path 
          className="line" 
          d="M53.5,319.12c104.85-75.98,214.82-13.62,266,17,49.53,29.64,72.22,56.76,92,50,30.52-10.43-48.19-89.59-55-141-4.55-34.38,12.5-57.5,41-54s34.96,28.4,32,63c13.71-42.57,60.57-69.96,88-68,33.48,2.39,46.34,37.12,0,68-59.6,39.72-81.13,107.21-80,126-23.44-57.19-32.08-99.35-6.5-114.5,32.51-19.25,63.84,2.79,55,41,22.64-35.77,51.42-38.85,65-25,18.95,19.33-2.51,41.08-33,53-26.82,10.49-46.45,19.63-59,34,48.29-70.94,94.69-86.65,172-93,65.87-5.41,112.71,26.72,187,17"
        />
      </svg>
      <div className="overlay"></div>
    </div>
  );
};

export default AnjaliFigure;
