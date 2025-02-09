import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Heart from './Heart';
import BrokenHeart from './BrokenHeart';
import img1 from '../assets/img1.png';
import img2 from '../assets/img2.png';
import img3 from '../assets/img3.png';
import img4 from '../assets/img4.png';
import img5 from '../assets/img5.png';
import img6 from '../assets/img6.png';

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

const images = {
  default: img1 ,
  yes: img2,
  no: [ img3, img4, img5, img6]
};

const FlirtySection: React.FC = () => {
  const [line, setLine] = useState<string>(
    flirtyLines[Math.floor(Math.random() * flirtyLines.length)]
  );
  const [noCount, setNoCount] = useState(0);
  const [yesPressed, setYesPressed] = useState(false);
  const [yesButtonSize, setYesButtonSize] = useState(1);
  const [noButtonPosition, setNoButtonPosition] = useState({ x: 0, y: 0 });

  const questions = [
    "So let me ask you again, will you be my valentine?",
    "Are you sure you dont want to be my valentine?",
    "I mean you can still reconsider your answer",
    "But we look soo good together😭",
    "okay now just click the yes already"
  ];

  const getCurrentImage = (yesPressed: boolean, noCount: number) => {
    if (yesPressed) return images.yes;
    if (noCount > 0) {
      return images.no[Math.min(noCount - 1, images.no.length - 1)];
    }
    return images.default;
  };

  const handleNoClick = () => {
    setNoCount(prev => prev + 1);
    if (noCount < 4) {
      setYesButtonSize(prev => Math.min(prev * 1.5, 3));
    }

    if (noCount >= 4) {
      const newX = Math.random() * (window.innerWidth - 100);
      const newY = Math.random() * (window.innerHeight - 100);
      setNoButtonPosition({ x: newX, y: newY });
    }
  };

  const handleYesClick = () => {
    setYesPressed(true);
  };

  return (
    <section className="min-h-screen py-20 relative flex flex-col justify-center items-center">
      <div className="container mx-auto px-4 text-center relative z-10 flex-1 flex flex-col justify-center">
        <motion.div
          className="bg-white/10 backdrop-blur-md p-12 rounded-3xl inline-block border border-white/20 shadow-xl w-full max-w-3xl mx-auto"
          whileHover={{ scale: 1.02 }}
        >


          <AnimatePresence mode="wait">
            <motion.p
              key={line}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="font-dancing text-4xl md:text-4xl font-bold text-white drop-shadow-4xl"            >
              {line}
            </motion.p>
          </AnimatePresence>
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
                    left: noButtonPosition.x,
                    top: noButtonPosition.y,
                    background: 'none'
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
        <motion.div
          className="absolute top-10 left-10 w-4 h-4 bg-white rounded-full opacity-50"
          animate={{
            y: [0, 20, 0],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
          }}
        />
        <motion.div
          className="absolute bottom-20 right-20 w-6 h-6 bg-white rounded-full opacity-30"
          animate={{
            y: [0, -30, 0],
            opacity: [0.3, 0.8, 0.3],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
          }}
        />
      </div>
    </section>
  );
};

export default FlirtySection;
