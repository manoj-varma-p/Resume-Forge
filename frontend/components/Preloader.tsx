'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const words = [
  "Hello",
  "Hola",
  "Bonjour",
  "Hallo",
  "Ciao",
  "こんにちは",
  "नमस्ते",
  "你好",
  "Marhaba",
  "Привет",
  "Resume Forge"
];

const Preloader = () => {
  const [index, setIndex] = useState(0);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    if (index === words.length - 1) {
      const timer = setTimeout(() => {
        setIsDone(true);
      }, 1000);
      return () => clearTimeout(timer);
    }

    const timer = setTimeout(() => {
      setIndex((prev) => prev + 1);
    }, index === 0 ? 1000 : 150); // First word stays longer, others are fast

    return () => clearTimeout(timer);
  }, [index]);

  return (
    <AnimatePresence mode="wait">
      {!isDone && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#0a0a0a] text-white font-sans"
        >
          <div className="relative flex flex-col items-center">
            {/* Background Glow */}
            <div className="absolute inset-0 blur-[100px] bg-white/5 -z-10" />

            {/* Cycling Words */}
            <motion.div
              key={words[index]}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="flex items-center gap-3"
            >
              {/* Dot decoration */}
              <span className="w-2 h-2 rounded-full bg-white block mb-1" />
              <span className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tight">
                {words[index]}
              </span>
            </motion.div>

            {/* Subtle Progress Indicator */}
            <div className="absolute bottom-[-60px] left-1/2 -translate-x-1/2 overflow-hidden w-32 h-[2px] bg-white/10 rounded-full">
              <motion.div 
                className="h-full bg-white"
                initial={{ width: "0%" }}
                animate={{ width: `${((index + 1) / words.length) * 100}%` }}
                transition={{ duration: 0.2 }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Preloader;
