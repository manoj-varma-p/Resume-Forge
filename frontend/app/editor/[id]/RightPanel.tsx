'use client';

import { useResumeStore } from '@/lib/store';
import { Palette, Type, Layout, CheckCircle2, XCircle, Sparkles, AlignLeft, Rows, ToggleLeft, ToggleRight, Eye, EyeOff, Image as ImageIcon } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState } from 'react';

const COLORS = [
  { hex: '#000000', name: 'Midnight' },
  { hex: '#1a73e8', name: 'Google Blue' },
  { hex: '#E8453C', name: 'Coral Red' },
  { hex: '#10b981', name: 'Emerald' },
  { hex: '#f59e0b', name: 'Amber' },
  { hex: '#6366f1', name: 'Indigo' },
  { hex: '#8b5cf6', name: 'Violet' },
  { hex: '#ec4899', name: 'Pink' },
  { hex: '#14b8a6', name: 'Teal' },
  { hex: '#b76e79', name: 'Rose Gold' },
  { hex: '#0d1b2a', name: 'Navy' },
  { hex: '#334155', name: 'Slate' },
];

const FONTS = [
  'Inter', 'Roboto', 'Open Sans', 'Lato', 'Montserrat',
  'Playfair Display', 'Merriweather', 'Raleway', 'Nunito',
  'Work Sans', 'Fira Sans', 'Josefin Sans', 'Karla', 'Oswald',
];

const SECTION_LABELS: Record<string, string> = {
  basics: 'Basic Info',
  summary: 'Summary',
  work: 'Experience',
  education: 'Education',
  skills: 'Skills',
  projects: 'Projects',
  languages: 'Languages',
  certifications: 'Certifications',
};

type Tab = 'design' | 'ats' | 'sections';

export default function RightPanel() {
  const { theme, updateTheme, atsScore, jobDescription, setJobDescription, sectionOrder, hiddenSections, toggleSectionVisibility } = useResumeStore();
  const [tab, setTab] = useState<Tab>('design');
  const [customColor, setCustomColor] = useState(theme.color || '#000000');

  const matchedKeywords = ['React', 'TypeScript', 'Node.js', 'REST API', 'Agile'];
  const missingKeywords = ['GraphQL', 'AWS', 'Docker', 'CI/CD', 'Kubernetes'];

  const circumference = 2 * Math.PI * 36;
  const strokeDashoffset = circumference - (atsScore / 100) * circumference;
  const scoreColor = atsScore >= 80 ? '#10b981' : atsScore >= 60 ? '#f59e0b' : '#ef4444';

  const handleCustomColor = (v: string) => {
    setCustomColor(v);
    updateTheme('color', v);
  };

  return (
    <div className="w-[300px] lg:w-[320px] h-full bg-white border-l border-gray-200 flex flex-col overflow-hidden shrink-0 z-20">
      {/* Header */}
      <div className="px-4 pt-4 pb-0 border-b border-gray-100">
        <div className="flex gap-1 mb-0">
          {(['design', 'ats', 'sections'] as Tab[]).map(t => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`flex-1 py-2 text-xs font-bold rounded-t-lg capitalize transition-all ${
                tab === t
                  ? 'bg-gray-900 text-white'
                  : 'text-gray-500 hover:text-gray-800 hover:bg-gray-50'
              }`}
            >
              {t === 'ats' ? 'ATS Score' : t.charAt(0).toUpperCase() + t.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-5 space-y-6 pb-24">

        {/* ── DESIGN TAB ── */}
        {tab === 'design' && (
          <>
            {/* Accent Color */}
            <div className="space-y-3">
              <h3 className="text-xs font-black text-gray-800 uppercase tracking-widest flex items-center gap-2">
                <Palette className="w-3.5 h-3.5 text-gray-600" /> Accent Color
              </h3>
              <div className="grid grid-cols-6 gap-2">
                {COLORS.map((c) => (
                  <motion.button
                    key={c.hex}
                    whileTap={{ scale: 0.85 }}
                    whileHover={{ scale: 1.15 }}
                    onClick={() => { updateTheme('color', c.hex); setCustomColor(c.hex); }}
                    title={c.name}
                    className={`w-9 h-9 rounded-xl border-2 transition-all ${theme.color === c.hex ? 'border-gray-900 shadow-lg ring-2 ring-offset-1 ring-gray-900' : 'border-transparent hover:border-gray-300'}`}
                    style={{ backgroundColor: c.hex }}
                  />
                ))}
              </div>
              <div className="flex items-center gap-3 mt-2">
                <label className="text-xs font-bold text-gray-600">Custom</label>
                <div className="flex items-center gap-2 flex-1">
                  <input
                    type="color"
                    value={customColor}
                    onChange={(e) => handleCustomColor(e.target.value)}
                    className="w-10 h-8 rounded-lg border border-gray-200 cursor-pointer p-0.5"
                  />
                  <input
                    type="text"
                    value={customColor}
                    onChange={(e) => { if (/^#[0-9a-fA-F]{0,6}$/.test(e.target.value)) handleCustomColor(e.target.value); }}
                    className="flex-1 px-2 py-1.5 border border-gray-200 rounded-lg text-xs font-mono text-gray-800 outline-none focus:border-gray-400"
                  />
                </div>
              </div>
            </div>

            <div className="border-t border-gray-100" />

            {/* Typography */}
            <div className="space-y-3">
              <h3 className="text-xs font-black text-gray-800 uppercase tracking-widest flex items-center gap-2">
                <Type className="w-3.5 h-3.5 text-gray-600" /> Typography
              </h3>
              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-600">Font Family</label>
                <select
                  className="w-full p-2.5 border border-gray-200 rounded-xl text-sm text-gray-800 outline-none focus:border-gray-400 bg-white cursor-pointer font-medium"
                  value={theme.fontFamily}
                  onChange={(e) => updateTheme('fontFamily', e.target.value)}
                >
                  {FONTS.map(font => (
                    <option key={font} value={font}>{font}</option>
                  ))}
                </select>
              </div>
              <div className="space-y-1.5">
                <div className="flex justify-between items-center">
                  <label className="text-xs font-semibold text-gray-600">Font Size</label>
                  <span className="text-xs font-bold text-gray-800 bg-gray-100 px-2 py-0.5 rounded">{theme.fontSize}px</span>
                </div>
                <input
                  type="range" min="11" max="16"
                  value={theme.fontSize}
                  onChange={(e) => updateTheme('fontSize', Number(e.target.value))}
                  className="w-full accent-gray-900 h-1.5 rounded-full"
                />
                <div className="flex justify-between text-[10px] text-gray-400">
                  <span>Small</span><span>Medium</span><span>Large</span>
                </div>
              </div>
            </div>

            <div className="border-t border-gray-100" />

            {/* Layout */}
            <div className="space-y-3">
              <h3 className="text-xs font-black text-gray-800 uppercase tracking-widest flex items-center gap-2">
                <Layout className="w-3.5 h-3.5 text-gray-600" /> Layout
              </h3>
              <div className="space-y-1.5">
                <div className="flex justify-between items-center">
                  <label className="text-xs font-semibold text-gray-600">Sidebar Width</label>
                  <span className="text-xs font-bold text-gray-800 bg-gray-100 px-2 py-0.5 rounded">{theme.sidebarWidth}%</span>
                </div>
                <input
                  type="range" min="20" max="42"
                  value={theme.sidebarWidth}
                  onChange={(e) => updateTheme('sidebarWidth', Number(e.target.value))}
                  className="w-full accent-gray-900 h-1.5"
                />
              </div>
              <div className="space-y-1.5">
                <div className="flex justify-between items-center">
                  <label className="text-xs font-semibold text-gray-600">Line Height</label>
                  <span className="text-xs font-bold text-gray-800 bg-gray-100 px-2 py-0.5 rounded">
                    {((theme as any).lineHeight || 1.6).toFixed(1)}
                  </span>
                </div>
                <input
                  type="range" min="12" max="20" step="1"
                  value={Math.round(((theme as any).lineHeight || 1.6) * 10)}
                  onChange={(e) => updateTheme('lineHeight' as any, Number(e.target.value) / 10)}
                  className="w-full accent-gray-900 h-1.5"
                />
              </div>
              <div className="space-y-1.5">
                <div className="flex justify-between items-center">
                  <label className="text-xs font-semibold text-gray-600">Page Padding</label>
                  <span className="text-xs font-bold text-gray-800 bg-gray-100 px-2 py-0.5 rounded">
                    {(theme as any).pagePadding || 48}px
                  </span>
                </div>
                <input
                  type="range" min="24" max="72" step="4"
                  value={(theme as any).pagePadding || 48}
                  onChange={(e) => updateTheme('pagePadding' as any, Number(e.target.value))}
                  className="w-full accent-gray-900 h-1.5"
                />
              </div>
            </div>

            <div className="border-t border-gray-100" />

            {/* Profile Image Settings */}
            <div className="space-y-3">
              <h3 className="text-xs font-black text-gray-800 uppercase tracking-widest flex items-center gap-2">
                <ImageIcon className="w-3.5 h-3.5 text-gray-600" /> Profile Image
              </h3>
              
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-gray-600 mb-1 block">Image Shape</label>
                <div className="flex bg-gray-100 rounded-lg p-1">
                  {(['round', 'rounded', 'square'] as const).map(shape => (
                    <button
                      key={shape}
                      onClick={() => updateTheme('imageShape', shape)}
                      className={`flex-1 py-1 text-xs font-bold rounded-md capitalize transition-all ${
                        theme.imageShape === shape ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500 hover:text-gray-800'
                      }`}
                    >
                      {shape}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-gray-600 mb-1 block">Image Alignment</label>
                <div className="flex bg-gray-100 rounded-lg p-1">
                  {(['left', 'center', 'right'] as const).map(pos => (
                    <button
                      key={pos}
                      onClick={() => updateTheme('imagePosition', pos)}
                      className={`flex-1 py-1 text-xs font-bold rounded-md capitalize transition-all ${
                        theme.imagePosition === pos ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500 hover:text-gray-800'
                      }`}
                    >
                      {pos}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="border-t border-gray-100" />

            {/* Quick Tips */}
            <div className="bg-blue-50 border border-blue-100 rounded-xl p-4">
              <p className="text-xs font-bold text-blue-700 mb-2 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" /> Design Tips
              </p>
              <ul className="space-y-1.5">
                {['Use a single accent color for ATS clarity', 'Font size 12–14px is ideal for print', 'Keep sidebar width 25–35% for readability'].map(tip => (
                  <li key={tip} className="text-[11px] text-blue-600 flex items-start gap-1.5">
                    <span className="mt-0.5 shrink-0">•</span>{tip}
                  </li>
                ))}
              </ul>
            </div>
          </>
        )}

        {/* ── ATS TAB ── */}
        {tab === 'ats' && (
          <>
            {/* Score Ring */}
            <div className="bg-gray-50 rounded-2xl p-5 border border-gray-100 text-center">
              <h3 className="text-xs font-black text-gray-700 uppercase tracking-widest mb-4">ATS Compatibility</h3>
              <div className="relative w-28 h-28 mx-auto flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 80 80">
                  <circle cx="40" cy="40" r="36" fill="none" stroke="#e5e7eb" strokeWidth="8" />
                  <motion.circle
                    cx="40" cy="40" r="36" fill="none" stroke={scoreColor} strokeWidth="8"
                    strokeLinecap="round"
                    initial={{ strokeDashoffset: circumference }}
                    animate={{ strokeDashoffset }}
                    transition={{ duration: 1.5, ease: 'easeOut' }}
                    style={{ strokeDasharray: circumference }}
                  />
                </svg>
                <div className="absolute flex flex-col items-center">
                  <span className="text-2xl font-black" style={{ color: scoreColor }}>{atsScore}</span>
                  <span className="text-[10px] font-bold text-gray-400">/100</span>
                </div>
              </div>
              <p className="text-xs font-semibold mt-3" style={{ color: scoreColor }}>
                {atsScore >= 80 ? '🎯 Excellent!' : atsScore >= 60 ? '⚡ Good — improve keywords' : '⚠️ Needs work'}
              </p>
              <p className="text-[11px] text-gray-500 mt-1">Target 80+ to pass ATS filters</p>
            </div>

            {/* Job Description */}
            <div className="space-y-2">
              <h3 className="text-xs font-black text-gray-800 uppercase tracking-widest">Job Description Match</h3>
              <textarea
                className="w-full p-3 border border-gray-200 rounded-xl text-sm text-gray-800 min-h-[110px] outline-none focus:border-gray-400 resize-none bg-gray-50 placeholder-gray-400"
                placeholder="Paste job description to see keyword match..."
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
              />
            </div>

            {jobDescription && (
              <div className="space-y-3">
                <div>
                  <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2">✅ Matched Keywords</p>
                  <div className="flex flex-wrap gap-1.5">
                    {matchedKeywords.map(kw => (
                      <span key={kw} className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-green-100 text-green-800 text-xs font-semibold border border-green-200">
                        <CheckCircle2 className="w-3 h-3" /> {kw}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2">❌ Missing Keywords</p>
                  <div className="flex flex-wrap gap-1.5">
                    {missingKeywords.map(kw => (
                      <span key={kw} className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-red-100 text-red-800 text-xs font-semibold border border-red-200">
                        <XCircle className="w-3 h-3" /> {kw}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="bg-amber-50 border border-amber-100 rounded-xl p-3">
                  <p className="text-xs font-bold text-amber-700">💡 Add missing keywords naturally to your experience and skills sections to boost your score.</p>
                </div>
              </div>
            )}
          </>
        )}

        {/* ── SECTIONS TAB ── */}
        {tab === 'sections' && (
          <>
            <div>
              <h3 className="text-xs font-black text-gray-800 uppercase tracking-widest mb-1 flex items-center gap-2">
                <Rows className="w-3.5 h-3.5 text-gray-600" /> Section Visibility
              </h3>
              <p className="text-[11px] text-gray-500 mb-4">Toggle sections on/off in your resume</p>
              <div className="space-y-2">
                {sectionOrder.map((sec) => (
                  <div key={sec} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl border border-gray-100">
                    <span className="text-sm font-semibold text-gray-800">{SECTION_LABELS[sec] || sec}</span>
                    <button
                      onClick={() => toggleSectionVisibility(sec)}
                      className={`flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-lg transition-all ${
                        hiddenSections.includes(sec)
                          ? 'bg-gray-200 text-gray-500'
                          : 'bg-gray-900 text-white'
                      }`}
                    >
                      {hiddenSections.includes(sec) ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
                      {hiddenSections.includes(sec) ? 'Hidden' : 'Visible'}
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="border-t border-gray-100" />

            <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
              <p className="text-xs font-bold text-gray-700 mb-2">📌 Section Order</p>
              <p className="text-[11px] text-gray-500">Drag-to-reorder is available in the left panel under each section.</p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
