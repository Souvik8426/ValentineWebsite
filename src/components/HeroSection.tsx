import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
import { FaHeart, FaChevronDown } from 'react-icons/fa';
import HeartAnimation from './HeartAnimation';


const HeroSection: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <>
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400;700&family=Playfair+Display:ital,wght@0,400;0,700;1,400&display=swap"
          rel="stylesheet"
        />
      </Head>

      <section
        className="relative flex items-center justify-center min-h-screen bg-cover bg-center overflow-hidden"
      >
        <div className="absolute inset-0 opacity-0">
        </div>

        <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 w-full max-w-2xl">
          <HeartAnimation />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="relative z-10 text-center px-4"
        >
          <motion.div
            initial={{ scale: 0.5 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.8, type: "spring" }}
            className="flex flex-col items-center"
          >
            <h1 className="font-dancing text-6xl md:text-8xl font-bold text-white drop-shadow-2xl">
              Be My Valentine
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="mt-6 text-xl md:text-2xl text-white font-playfair italic"
          >
            Let's write our love story together...
          </motion.p>
        </motion.div>

        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{
            y: [0, 10, 0],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <FaChevronDown className="text-white text-3xl animate-bounce" />
        </motion.div>
      </section>
    </>
  );

};

export default HeroSection;
