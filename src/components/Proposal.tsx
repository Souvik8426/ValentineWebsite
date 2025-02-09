import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Heart from './Heart';
import BrokenHeart from './BrokenHeart';
import img1 from '../assets/img1.png';
import img2 from '../assets/img2.png';
import img3 from '../assets/img3.png';
import img4 from '../assets/img4.png';
import img5 from '../assets/img5.png';
import Heartrain from './HeartRain';
import img6 from '../assets/img6.png';

const images = {
  default: img1,
  yes: img2,
  no: [img3, img4, img5, img6],
};

const questions = [
  "So let me ask you again, will you be my valentine?",
  "Are you sure you don't want to be my valentine?",
  "I mean you can still reconsider your answer",
  "But we look sooo good together😭",
  "Okay now just click the yes already"
];

const FlirtySection = () => {
  const [noCount, setNoCount] = useState(0);
  const [yesPressed, setYesPressed] = useState(false);
  const [yesButtonSize, setYesButtonSize] = useState(1);
  const [noButtonPosition, setNoButtonPosition] = useState({ x: 0, y: 0 });

  // If you're using TypeScript, you can add a return type (string) for this function.
  const getCurrentImage = (yesPressed: boolean, noCount: number): string => {
    if (yesPressed) return images.yes;
    if (noCount > 0) {
      return images.no[Math.min(noCount - 1, images.no.length - 1)];
    }
    return images.default;
  };


  const handleNoClick = () => {
    // Use the functional update form so we work with the latest state.
    setNoCount((prev) => {
      const newCount = prev + 1;
      // If the previous count is less than 4, increase the "yes" button size.
      if (prev < 4) {
        setYesButtonSize((prevSize) => Math.min(prevSize * 1.5, 3));
      }
      // Once we've reached 4 or more "no" clicks, reposition the "no" button.
      if (prev >= 4) {
        const newX = Math.random() * (window.innerWidth - 100);
        const newY = Math.random() * (window.innerHeight - 100);
        setNoButtonPosition({ x: newX, y: newY });
      }
      return newCount;
    });
  };

  const handleYesClick = () => {
    setYesPressed(true);
  };

  return (
    <section className="min-h-screen py-20 relative flex flex-col justify-center items-center">
      <div className="container mx-auto px-4 text-center relative z-10 flex-1 flex flex-col justify-center">
        <motion.div
          // Added 'relative' and 'overflow-hidden' to create a clipping context.
          className="relative overflow-hidden bg-white/10 backdrop-blur-md p-12 rounded-3xl inline-block border border-white/20 shadow-xl w-full max-w-3xl mx-auto"
          whileHover={{ scale: 1.02 }}
        >
          {/* Heartrain effect confined within the card */}
          <div className="absolute inset-0 pointer-events-none">
            <Heartrain />
          </div>

          <motion.div
            className="mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <motion.img
              key={getCurrentImage(yesPressed, noCount)}
              src={getCurrentImage(yesPressed, noCount)}
              alt="Valentine Image"
              className="w-64 h-64 object-cover rounded-full mx-auto border-4 border-white/30"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            />
          </motion.div>

          {!yesPressed ? (
            <div className="mt-12 flex flex-col items-center">
              <motion.p
                className="font-dancing text-4xl md:text-4xl font-bold text-white drop-shadow-4xl mb-12"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                {questions[Math.min(noCount, questions.length - 1)]}
              </motion.p>

              <div className="flex justify-center items-center gap-12 min-h-[250px]">
                <motion.div
                  className="p-8"
                  style={{ scale: yesButtonSize }}
                  whileHover={{ scale: yesButtonSize * 1.1 }}
                  onClick={handleYesClick}
                >
                  <Heart />
                </motion.div>

                <motion.button
                  className="p-8 rounded-full"
                  style={{
                    position: noCount >= 3 ? 'absolute' : 'relative',
                    left: noCount >= 3 ? `${Math.random() * 80}%` : undefined,
                    top: noCount >= 3 ? `${Math.random() * 80}%` : undefined,
                    background: 'none',
                    transform: 'translate(-50%, -50%)'
                  }}
                  whileHover={{ scale: 1.1 }}
                  onClick={handleNoClick}
                >
                  <BrokenHeart />
                </motion.button>
              </div>
            </div>
          ) : (
            <motion.p
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-3xl text-white font-dancing"
            >
              I knew you would say yes! Let's be together forever ❤️
            </motion.p>
          )}
        </motion.div>
      </div>

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="stars absolute w-full h-full"></div>
      </div>
      <div class="credits text-white text-center mt-4">
        <p>
          Credits: <a href="https://github.com/souvik8426" target="_blank" rel="noopener noreferrer">Souvik Ruhidas</a>
        </p>
      </div>
    </section>
  );

};

export default FlirtySection;
