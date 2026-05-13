'use client';

import React, { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, FileText } from 'lucide-react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import ShapeGrid from './ShapeGrid';
import StarBorder from './StarBorder';



interface TrueFocusProps {
  sentence?: string;
  separator?: string;
  manualMode?: boolean;
  blurAmount?: number;
  borderColor?: string;
  glowColor?: string;
  animationDuration?: number;
  pauseBetweenAnimations?: number;
}

interface FocusRect {
  x: number;
  y: number;
  width: number;
  height: number;
}

const TrueFocus: React.FC<TrueFocusProps> = ({
  sentence = 'True Focus',
  separator = ' ',
  manualMode = false,
  blurAmount = 5,
  borderColor = '#000',
  glowColor = 'rgba(0, 0, 0, 0.6)',
  animationDuration = 0.5,
  pauseBetweenAnimations = 1
}) => {
  const words = sentence.split(separator);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [lastActiveIndex, setLastActiveIndex] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const wordRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const [focusRect, setFocusRect] = useState<FocusRect>({ x: 0, y: 0, width: 0, height: 0 });

  useEffect(() => {
    if (!manualMode) {
      const interval = setInterval(
        () => {
          setCurrentIndex(prev => (prev + 1) % words.length);
        },
        (animationDuration + pauseBetweenAnimations) * 1000
      );

      return () => clearInterval(interval);
    }
  }, [manualMode, animationDuration, pauseBetweenAnimations, words.length]);

  useEffect(() => {
    if (currentIndex === null || currentIndex === -1) return;
    if (!wordRefs.current[currentIndex] || !containerRef.current) return;

    const parentRect = containerRef.current.getBoundingClientRect();
    const activeRect = wordRefs.current[currentIndex]!.getBoundingClientRect();

    setFocusRect({
      x: activeRect.left - parentRect.left,
      y: activeRect.top - parentRect.top,
      width: activeRect.width,
      height: activeRect.height
    });
  }, [currentIndex, words.length]);

  const handleMouseEnter = (index: number) => {
    if (manualMode) {
      setLastActiveIndex(index);
      setCurrentIndex(index);
    }
  };

  const handleMouseLeave = () => {
    if (manualMode) {
      setCurrentIndex(lastActiveIndex!);
    }
  };

  return (
    <div
      className="relative flex gap-4 justify-center items-center flex-wrap"
      ref={containerRef}
      style={{ outline: 'none', userSelect: 'none' }}
    >
      {words.map((word, index) => {
        const isActive = index === currentIndex;
        return (
          <span
            key={index}
            ref={el => {
              wordRefs.current[index] = el;
            }}
            className="relative text-[4rem] md:text-[5rem] lg:text-[7rem] font-black cursor-pointer text-black leading-tight"
            style={
              {
                filter: isActive
                    ? `blur(0px)`
                    : `blur(${blurAmount}px)`,
                transition: `filter ${animationDuration}s ease`,
                outline: 'none',
                userSelect: 'none'
              } as React.CSSProperties
            }
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={handleMouseLeave}
          >
            {word}
          </span>
        );
      })}

      <motion.div
        className="absolute top-0 left-0 pointer-events-none box-border border-0"
        animate={{
          x: focusRect.x,
          y: focusRect.y,
          width: focusRect.width,
          height: focusRect.height,
          opacity: currentIndex >= 0 ? 1 : 0
        }}
        transition={{
          duration: animationDuration
        }}
        style={
          {
            '--border-color': borderColor,
            '--glow-color': glowColor
          } as React.CSSProperties
        }
      >
        <span
          className="absolute w-4 h-4 md:w-6 md:h-6 border-[3px] md:border-[4px] rounded-[3px] top-[-10px] md:top-[-15px] left-[-10px] md:left-[-15px] border-r-0 border-b-0"
          style={{
            borderColor: 'var(--border-color)',
            filter: 'drop-shadow(0 0 4px var(--border-color))'
          }}
        ></span>
        <span
          className="absolute w-4 h-4 md:w-6 md:h-6 border-[3px] md:border-[4px] rounded-[3px] top-[-10px] md:top-[-15px] right-[-10px] md:right-[-15px] border-l-0 border-b-0"
          style={{
            borderColor: 'var(--border-color)',
            filter: 'drop-shadow(0 0 4px var(--border-color))'
          }}
        ></span>
        <span
          className="absolute w-4 h-4 md:w-6 md:h-6 border-[3px] md:border-[4px] rounded-[3px] bottom-[-10px] md:bottom-[-15px] left-[-10px] md:left-[-15px] border-r-0 border-t-0"
          style={{
            borderColor: 'var(--border-color)',
            filter: 'drop-shadow(0 0 4px var(--border-color))'
          }}
        ></span>
        <span
          className="absolute w-4 h-4 md:w-6 md:h-6 border-[3px] md:border-[4px] rounded-[3px] bottom-[-10px] md:bottom-[-15px] right-[-10px] md:right-[-15px] border-l-0 border-t-0"
          style={{
            borderColor: 'var(--border-color)',
            filter: 'drop-shadow(0 0 4px var(--border-color))'
          }}
        ></span>
      </motion.div>
    </div>
  );
};

export default function HeroSection() {
  const { data: session } = useSession();

  return (
    <section className="relative w-full min-h-screen overflow-hidden bg-white flex flex-col items-center justify-center py-20 font-sans">
      {/* Background ShapeGrid */}
      <div className="absolute inset-0 z-0">
        <ShapeGrid 
          squareSize={100} 
          borderColor="rgba(0,0,0,0.08)" 
          hoverFillColor="rgba(0,0,0,0.7)"
          hoverTrailAmount={6}
          speed={1.5}
        />
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center px-6 md:px-12 text-center w-full max-w-5xl mx-auto pointer-events-none">
        
        {/* Animated Title */}
        <div className="mb-8 md:mb-12 pointer-events-auto -mt-10 md:-mt-20">
          <TrueFocus 
            sentence="Resume Forge" 
            manualMode={false} 
            blurAmount={4} 
            borderColor="#000" 
            glowColor="rgba(0,0,0,0.3)" 
            animationDuration={0.8}
            pauseBetweenAnimations={1.5}
          />
        </div>

        {/* Subtitles & Descriptions */}
        <div className="flex flex-col gap-4 mb-12 pointer-events-auto">
          <h2 className="text-2xl md:text-3xl font-semibold text-black tracking-tight">
            The Ultimate Resume Maker
          </h2>
          <p className="text-lg md:text-xl text-gray-700 max-w-2xl mx-auto leading-relaxed">
            Craft your professional story with our executive templates, intuitive editing section, and built-in ATS checker. Land your dream job faster.
          </p>
        </div>

        {/* Premium CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-5 pointer-events-auto w-full sm:w-auto items-center">
          {session ? (
            <StarBorder as={Link} href="/dashboard" color="#000" thickness={2} innerClassName="bg-white border-2 border-black text-black flex items-center justify-center">
              <span className="mr-2 text-lg font-semibold">Dashboard</span>
              <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
            </StarBorder>
          ) : null}

          <StarBorder as={Link} href="/editor/new" color="#fff" thickness={2} className="hover:scale-105 transition-transform">
            <div className="flex items-center">
              <span className="mr-2 text-lg font-semibold">Get Started</span>
              <ArrowRight className="w-5 h-5" />
            </div>
          </StarBorder>

          <StarBorder as={Link} href="/ats-checker" color="#000" thickness={2} innerClassName="bg-white border-2 border-black text-black flex items-center justify-center">
            <FileText className="w-5 h-5 mr-2" />
            <span className="text-lg font-semibold">ATS Checker</span>
          </StarBorder>

          <StarBorder 
            as={Link} 
            href="/templates" 
            color="#000" 
            thickness={2} 
            innerClassName="bg-transparent border-2 border-black text-black hover:bg-black/5 transition-colors flex items-center justify-center"
          >
            <span className="text-lg font-semibold">View Templates</span>
          </StarBorder>
        </div>
      </div>
    </section>
  );
}
