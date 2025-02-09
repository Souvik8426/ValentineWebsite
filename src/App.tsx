import React, { useEffect, useState, useMemo } from 'react';
import HeroSection from './components/HeroSection';
import TimelineSection from './components/TimelineSection';
import FlirtySection from './components/FlirtySection';

const App: React.FC = () => {
  // Track scroll position.
  const [scrollY, setScrollY] = useState(0);
  // Also track window dimensions so we can position hearts in pixels.
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    const handleResize = () => {
      setWindowHeight(window.innerHeight);
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Generate the hearts’ starting positions and speed only once (or when the window dimensions change).
  const hearts = useMemo(() => {
    return [...Array(30)].map((_, i) => ({
      // Random horizontal position in pixels.
      left: Math.random() * windowWidth,
      // Random starting vertical position in pixels within the viewport height.
      baseTop: Math.random() * windowHeight,
      // Each heart can move at a slightly different speed.
      speed: 0.1 + i * 0.01,
    }));
  }, [windowHeight, windowWidth]);

  return (
<main className="min-h-screen bg-gradient-to-tr from-[#fbc2eb] via-[#a6c1ee] via-[#b8c6e5] via-[#d5b8e3] to-[#f1c1e3] relative overflow-hidden">

{/* The heart background is fixed and covers the viewport */}
      <div className="fixed inset-0 pointer-events-none">
        {/* Set the container height to windowHeight */}
        <div className="heart-container" style={{ position: 'relative', width: '100%', height: windowHeight }}>
          {hearts.map((heart, i) => {
            // Calculate the heart’s effective vertical position.
            // The modulo operator makes sure the value loops between 0 and windowHeight.
            const effectiveTop = (heart.baseTop + scrollY * heart.speed) % windowHeight;

            return (
              // Render two copies of each heart: one at its computed position...
              <React.Fragment key={i}>
                <div
                  className="heart-shape"
                  style={{
                    position: 'absolute',
                    // Position from the left in pixels.
                    left: heart.left,
                    // The heart’s effective position (in pixels).
                    top: effectiveTop,
                    // Optional: add a small transition for smooth movement.
                    transition: 'top 0.1s linear',
                  }}
                >
                </div>
                {/* ...and a duplicate copy shifted upward by one full viewport height */}
                <div
                  className="heart-shape"
                  style={{
                    position: 'absolute',
                    left: heart.left,
                    top: effectiveTop - windowHeight,
                    transition: 'top 0.1s linear',
                  }}
                >
                </div>
              </React.Fragment>
            );
          })}
        </div>
      </div>
      {/* The rest of your content appears above the background */}
      <div className="relative z-10 font-sans">
        <HeroSection />
        <TimelineSection />
        <FlirtySection />
      </div>
    </main>
  );
};

export default App;
