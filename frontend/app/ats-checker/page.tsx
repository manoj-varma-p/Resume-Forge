'use client';

import React, { useState, useRef } from 'react';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Upload, 
  FileText, 
  CheckCircle2, 
  AlertCircle, 
  ArrowRight, 
  Loader2, 
  TrendingUp, 
  Target, 
  ShieldCheck,
  Zap
} from 'lucide-react';
import Link from 'next/link';

type AnalysisState = 'idle' | 'uploading' | 'analyzing' | 'result';

interface ImprovementSuggestion {
  category: string;
  score: number;
  status: 'good' | 'average' | 'poor';
  feedback: string;
  tips: string[];
}

export default function ATSCheckerPage() {
  const [state, setState] = useState<AnalysisState>('idle');
  const [file, setFile] = useState<File | null>(null);
  const [score, setScore] = useState(0);
  const [suggestions, setSuggestions] = useState<ImprovementSuggestion[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      startAnalysis();
    }
  };

  const startAnalysis = () => {
    setState('uploading');
    
    // Simulate upload and analysis
    setTimeout(() => {
      setState('analyzing');
      
      setTimeout(() => {
        generateResults();
        setState('result');
      }, 3000);
    }, 1500);
  };

  const generateResults = () => {
    // In a real app, we would send the file to a backend
    // Here we generate a realistic but simulated report
    const randomScore = Math.floor(Math.random() * (85 - 45 + 1)) + 45;
    setScore(randomScore);

    const mockupSuggestions: ImprovementSuggestion[] = [
      {
        category: "Contact Information",
        score: 90,
        status: 'good',
        feedback: "Your contact details are clearly presented and easy for recruiters to find.",
        tips: ["Ensure your LinkedIn URL is customized.", "Use a professional email address."]
      },
      {
        category: "Quantifiable Impact",
        score: 40,
        status: 'poor',
        feedback: "Your experience lacks measurable results and data-driven achievements.",
        tips: ["Add percentages, dollar amounts, or time-saved metrics.", "Use 'Action Verb + Metric + Result' formula."]
      },
      {
        category: "Keywords & Skills",
        score: 65,
        status: 'average',
        feedback: "You have some relevant skills, but are missing key industry keywords.",
        tips: ["Match your skills precisely to the job description.", "Include both hard and soft skills in a dedicated section."]
      },
      {
        category: "Formatting & Structure",
        score: 55,
        status: 'average',
        feedback: "Your resume structure is mostly fine, but some sections might be confusing for ATS bots.",
        tips: ["Use standard section headings (e.g., 'Work Experience').", "Avoid complex tables or graphics in the main content."]
      }
    ];
    setSuggestions(mockupSuggestions);
  };

  const reset = () => {
    setState('idle');
    setFile(null);
    setScore(0);
    setSuggestions([]);
  };

  return (
    <main className="min-h-screen bg-white flex flex-col font-sans">
      <Navbar />
      
      <div className="flex-1 w-full max-w-6xl mx-auto px-6 py-24 md:py-32">
        
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 text-blue-600 text-sm font-bold mb-6"
          >
            <ShieldCheck className="w-4 h-4" />
            AI-POWERED ATS ANALYSIS
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-black text-black tracking-tighter mb-6"
          >
            Scan Your Resume <br /> <span className="text-gray-400">Beat the Bots.</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-gray-500 max-w-2xl mx-auto"
          >
            Upload your resume and get an instant ATS compatibility score with detailed suggestions to improve your hiring chances.
          </motion.p>
        </div>

        <div className="max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            {state === 'idle' && (
              <motion.div
                key="idle"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="relative"
              >
                <div 
                  onClick={() => fileInputRef.current?.click()}
                  className="group relative h-80 border-4 border-dashed border-gray-100 rounded-[2.5rem] bg-gray-50 flex flex-col items-center justify-center cursor-pointer transition-all hover:bg-white hover:border-black/10"
                >
                  <div className="w-20 h-20 rounded-3xl bg-white shadow-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <Upload className="w-8 h-8 text-black" />
                  </div>
                  <h3 className="text-xl font-bold text-black mb-2">Drop your resume here</h3>
                  <p className="text-gray-400 font-medium">Supports PDF, DOCX (Max 5MB)</p>
                  
                  <input 
                    type="file" 
                    ref={fileInputRef} 
                    onChange={handleFileChange}
                    className="hidden" 
                    accept=".pdf,.docx"
                  />
                </div>
                
                {/* Feature Pills */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
                  <div className="p-4 rounded-2xl bg-white border border-gray-100 flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-green-50 text-green-600 flex items-center justify-center">
                      <Target className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-black">Keyword Match</h4>
                      <p className="text-[10px] text-gray-400 font-medium">Industry specific analysis</p>
                    </div>
                  </div>
                  <div className="p-4 rounded-2xl bg-white border border-gray-100 flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
                      <TrendingUp className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-black">Impact Score</h4>
                      <p className="text-[10px] text-gray-400 font-medium">Achievement quantification</p>
                    </div>
                  </div>
                  <div className="p-4 rounded-2xl bg-white border border-gray-100 flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center">
                      <Zap className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-black">Instant Feedback</h4>
                      <p className="text-[10px] text-gray-400 font-medium">Real-time improvements</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {(state === 'uploading' || state === 'analyzing') && (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="h-80 flex flex-col items-center justify-center text-center"
              >
                <div className="relative mb-8">
                  <Loader2 className="w-20 h-20 text-black animate-spin" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg">
                       <FileText className="w-5 h-5 text-gray-400" />
                    </div>
                  </div>
                </div>
                <h3 className="text-2xl font-black text-black mb-2 tracking-tight">
                  {state === 'uploading' ? 'Uploading Resume...' : 'Analyzing with AI...'}
                </h3>
                <p className="text-gray-400 font-medium max-w-xs mx-auto">
                  {state === 'uploading' 
                    ? `Preparing ${file?.name} for processing.` 
                    : 'Searching for keywords and evaluating section impact.'}
                </p>
              </motion.div>
            )}

            {state === 'result' && (
              <motion.div
                key="result"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-12"
              >
                {/* Result Header */}
                <div className="bg-black text-white rounded-[2.5rem] p-10 md:p-16 flex flex-col md:flex-row items-center gap-12 overflow-hidden relative isolate">
                   <div className="relative z-10 text-center md:text-left flex-1">
                      <h2 className="text-3xl md:text-5xl font-black mb-6 tracking-tighter leading-tight">
                        Your ATS Score is <br /> {score < 60 ? 'Needs Improvement' : 'Looking Solid!'}
                      </h2>
                      <div className="flex gap-4 flex-wrap justify-center md:justify-start">
                         <button onClick={reset} className="px-6 py-3 rounded-full bg-white text-black text-sm font-bold hover:bg-gray-100 transition">
                            Re-scan Resume
                         </button>
                         <Link href="/editor/new" className="px-6 py-3 rounded-full bg-blue-600 text-white text-sm font-bold hover:bg-blue-700 transition flex items-center gap-2">
                            Fix in Editor <ArrowRight className="w-4 h-4" />
                         </Link>
                      </div>
                   </div>
                   
                   {/* Big Circular Score */}
                   <div className="relative w-48 h-48 md:w-64 md:h-64 flex items-center justify-center">
                      <svg className="w-full h-full -rotate-90">
                         <circle 
                            cx="50%" cy="50%" r="45%" 
                            className="fill-none stroke-white/10 stroke-[10]"
                         />
                         <motion.circle 
                            initial={{ strokeDasharray: "0 1000" }}
                            animate={{ strokeDasharray: `${(score * 2.82).toFixed(0)} 1000` }}
                            transition={{ duration: 2, ease: "easeOut" }}
                            cx="50%" cy="50%" r="45%" 
                            className={`fill-none stroke-[12] ${score < 60 ? 'stroke-red-500' : 'stroke-blue-500'}`}
                            strokeLinecap="round"
                         />
                      </svg>
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                         <span className="text-5xl md:text-7xl font-black leading-none">{score}</span>
                         <span className="text-xs font-bold text-white/50 uppercase tracking-widest mt-2">ATS SCORE</span>
                      </div>
                   </div>
                </div>

                {/* Suggestions Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                   {suggestions.map((item, idx) => (
                     <motion.div 
                        key={idx}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 * idx }}
                        className="p-8 rounded-[2rem] bg-white border border-gray-100 shadow-sm flex flex-col h-full"
                     >
                        <div className="flex justify-between items-start mb-6">
                           <div className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${
                              item.status === 'good' ? 'bg-green-50 text-green-600' :
                              item.status === 'average' ? 'bg-orange-50 text-orange-600' :
                              'bg-red-50 text-red-600'
                           }`}>
                              {item.category}
                           </div>
                           <span className="text-lg font-black text-gray-800">{item.score}%</span>
                        </div>
                        
                        <p className="text-sm text-gray-600 font-medium mb-6 leading-relaxed">
                           {item.feedback}
                        </p>
                        
                        <div className="mt-auto space-y-3">
                           <h5 className="text-[10px] font-black uppercase tracking-widest text-gray-400">Action Items</h5>
                           {item.tips.map((tip, tIdx) => (
                             <div key={tIdx} className="flex items-start gap-3 text-xs font-bold text-black group">
                                <CheckCircle2 className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                                <span>{tip}</span>
                             </div>
                           ))}
                        </div>
                     </motion.div>
                   ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>

      <Footer />
    </main>
  );
}
