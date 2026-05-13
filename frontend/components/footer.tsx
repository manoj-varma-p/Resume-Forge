'use client';

import React from 'react';
import { motion } from 'motion/react';
import Link from 'next/link';
import { Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="relative w-full h-[40vh] md:h-[50vh] bg-[#f1f3f5] overflow-hidden flex flex-col justify-end">
      
      {/* Background Scrolling Text */}
      <div className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none select-none">
        <motion.div 
          className="whitespace-nowrap flex items-center"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            repeat: Infinity,
            ease: "linear",
            duration: 50 // Slow motion
          }}
        >
          <span className="text-[20vw] font-serif tracking-tighter text-[#dde2e5] leading-none">
            Resume Forge &nbsp;&nbsp; Resume Forge &nbsp;&nbsp; Resume Forge &nbsp;&nbsp; Resume Forge &nbsp;&nbsp;
          </span>
        </motion.div>
      </div>

      {/* Main Footer Content Grid */}
      <div className="relative z-10 w-full max-w-[90rem] mx-auto px-8 md:px-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 pb-10 items-end">
        
        {/* Left Side: Info & Contact */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2 mb-2">
             <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
                <div className="w-4 h-4 border-2 border-white rotate-45" />
             </div>
             <h2 className="text-2xl font-black tracking-tighter text-black">RESUME FORGE</h2>
          </div>
          <p className="text-sm text-gray-500 max-w-xs font-medium leading-relaxed">
            The world's most intuitive AI resume builder. Craft your professional story with precision and style.
          </p>
          <div className="flex flex-col gap-2 mt-2">
            <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Contact Us</h4>
            <a href="mailto:resumeforge20@gmail.com" className="flex items-center gap-2 text-sm font-bold text-gray-800 hover:text-black transition-colors">
              <Mail className="w-4 h-4" />
              resumeforge20@gmail.com
            </a>
          </div>
        </div>

        {/* Center: CTA (Hidden on mobile to avoid clutter, or moved) */}
        <div className="hidden lg:flex flex-col items-center justify-center pb-8">
           <Link 
            href="/login" 
            className="bg-[#111] text-white px-8 py-4 rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-black transition-transform hover:scale-105 active:scale-95 flex items-center gap-3 shadow-xl"
          >
            GET STARTED? <span className="text-xl leading-none mb-0.5">↗</span>
          </Link>
        </div>

        {/* Right Side: Developers */}
        <div className="flex flex-col md:items-end text-left md:text-right gap-4">
          <div>
            <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-3">Developed By</h4>
            <div className="flex flex-col gap-2">
              <span className="text-lg font-black text-black">RAI PRAVEEN</span>
              <Link 
                href="https://www.linkedin.com/in/manoj-varma-9b229b281/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-lg font-black text-black hover:text-blue-600 transition-colors flex items-center md:justify-end gap-2"
              >
                P.MANOJ VARMA
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Legal Bar */}
      <div className="w-full border-t border-[#d1d5db] px-8 py-6 relative z-20 flex flex-col md:flex-row justify-between items-center text-[10px] md:text-xs font-bold uppercase tracking-widest text-[#555] gap-6 bg-[#f1f3f5]">
        <div>
          <p>© COPYRIGHT RESUME FORGE {new Date().getFullYear()} ALL RIGHTS RESERVED.</p>
        </div>

        <div className="flex justify-center gap-12">
          <Link href="#" className="hover:text-black transition-colors">TERMS AND CONDITIONS</Link>
          <span className="cursor-pointer hover:text-black transition-colors">ENGLISH ⌄</span>
        </div>

        <div className="hidden md:block">
           <p>EMPOWERING CAREERS WORLDWIDE</p>
        </div>
      </div>
    </footer>
  );
}