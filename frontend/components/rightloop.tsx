'use client';

import React from 'react';
import { motion } from 'motion/react';

const keywords = [
  "ATS OPTIMIZED",
  "PROFESSIONAL TEMPLATES",
  "COVER LETTERS",
  "AI ASSISTANT",
  "EXPORT TO PDF",
  "REAL-TIME PREVIEW",
  "CUSTOM THEMES",
  "JOB WINNING",
  "ONE-CLICK APPLY",
  "PORTFOLIO BUILDER",
];

export default function RightLoop() {
  return (
    <div className="w-full bg-white border-y border-gray-100 overflow-hidden py-4 flex items-center relative select-none">
      <motion.div 
        className="flex whitespace-nowrap flex-nowrap"
        animate={{ x: ["-50%", "0%"] }}
        transition={{ 
          repeat: Infinity, 
          ease: "linear", 
          duration: 35 
        }}
      >
        {/* We use 4 duplicated sets. Moving from -50% to 0% smoothly loops 2 sets of the array. */}
        {[...Array(4)].map((_, arrayIndex) => (
          <div key={arrayIndex} className="flex items-center min-w-max">
            {keywords.map((word, index) => (
              <React.Fragment key={`${arrayIndex}-${index}`}>
                <span className="text-black font-bold tracking-[0.15em] px-8 text-sm md:text-base">
                  {word}
                </span>
                <span className="text-amber-500 mx-2 text-xl leading-none flex items-center justify-center">•</span>
              </React.Fragment>
            ))}
          </div>
        ))}
      </motion.div>
    </div>
  );
}
