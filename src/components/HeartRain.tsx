// rainRain.jsx
import React, { useEffect, useRef } from 'react';

const Rain = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const createRain = () => {
      const rain = document.createElement('div');
      rain.classList.add('rain');
      // Use '%' so that the position is relative to the container's width
      rain.style.left = Math.random() * 100 + '%';
      rain.style.animationDuration = Math.random() * 2 + 3 + 's';
      rain.innerText = '💗';
      container.appendChild(rain);

      // Remove the rain element after its animation ends
      setTimeout(() => {
        rain.remove();
      }, 5000);
    };

    const interval = setInterval(createRain, 300);
    return () => clearInterval(interval); // Clean up the interval on unmount
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        position: 'absolute', // Ensures this container is positioned relative to its parent
        inset: 0,             // Fills the entire parent container
        pointerEvents: 'none',// Allow clicks to pass through
        overflow: 'hidden'    // Clip any overflowing rain elements
      }}
    />
  );
};

export default Rain;
