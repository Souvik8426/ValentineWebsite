import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Heartrain from './HeartRain';

const flirtyLines: string[] = [
  "Every glance from you is a spark that ignites my soul.",
  "Your laughter is my favorite melody of delight.",
  "In your eyes, I see a universe of enchanting secrets.",
  "Every whispered word from you sends shivers of joy down my spine.",
  "You are the playful mystery that makes my heart skip a beat.",
  "With you, every moment feels like a beautiful dream.",
  "Your smile lights up my world like a thousand stars.",
  "My heart dances to the rhythm of your love.",
  "In the story of my life, you're my favorite chapter.",
  "Time stands still when I'm lost in your eyes.",
];

const FlirtySection: React.FC = () => {
  // Pick an initial random flirty line
  const [line, setLine] = useState<string>(
    flirtyLines[Math.floor(Math.random() * flirtyLines.length)]
  );

  // Handler to update the line with a new random one (ensuring it's different)
  const handleNewLine = () => {
    let newLine = line;
    while (newLine === line) {
      newLine = flirtyLines[Math.floor(Math.random() * flirtyLines.length)];
    }
    setLine(newLine);
  };

  return (
    <section className="min-h-screen py-20 relative flex flex-col justify-center items-center">
      <div className="container mx-auto px-4 text-center relative z-10 flex flex-col justify-center items-center">
        <motion.div
          className="relative bg-white/10 backdrop-blur-md p-12 rounded-3xl border border-white/20 shadow-xl w-full max-w-3xl mx-auto overflow-hidden"
          whileHover={{ scale: 1.02 }}
        >
          {/* Ensure the Heartrain effect is confined within this card */}
          <div className="absolute inset-0 pointer-events-none">
            <Heartrain />
          </div>

          {/* Content rendered above the heart rain (using z-10) */}
          <div className="relative flex flex-col items-center z-10">
            <AnimatePresence>
              <motion.p
                key={line}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="font-dancing text-4xl md:text-4xl font-bold text-white drop-shadow-4xl"
              >
                {line}
              </motion.p>
            </AnimatePresence>

            <motion.button
              onClick={handleNewLine}
              whileHover={{ scale: 1.1 }}
              className="mt-8 px-4 py-2 bg-pink-500 text-white rounded-full"
            >
              Next
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FlirtySection;
