'use client';

import { useState } from 'react';
import { useResumeStore } from '@/lib/store';
import { Upload, User, FileText, Briefcase, GraduationCap, Code, Globe, MessageSquare, Heart, X, Sparkles, Check, Layout } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const SECTIONS = [
  { id: 'templates', label: 'Templates', icon: <Layout className="w-5 h-5" /> },
  { id: 'picture', label: 'Picture', icon: <Upload className="w-5 h-5" /> },
  { id: 'basics', label: 'Basics', icon: <User className="w-5 h-5" /> },
  { id: 'summary', label: 'Summary', icon: <FileText className="w-5 h-5" /> },
  { id: 'experience', label: 'Experience', icon: <Briefcase className="w-5 h-5" /> },
  { id: 'education', label: 'Education', icon: <GraduationCap className="w-5 h-5" /> },
  { id: 'skills', label: 'Skills', icon: <Code className="w-5 h-5" /> },
  { id: 'languages', label: 'Languages', icon: <Globe className="w-5 h-5" /> },
  { id: 'projects', label: 'Projects', icon: <Sparkles className="w-5 h-5" /> },
  { id: 'hobbies', label: 'Hobbies', icon: <Heart className="w-5 h-5" /> },
];

type TemplateCategory = 'All' | 'Google Style' | 'Canva Style' | 'Executive Style' | 'Tech Style' | 'Modern Style';

const ALL_TEMPLATES = [
  {
    id: 'google-coral',
    name: 'Google Coral',
    category: 'Google Style' as TemplateCategory,
    accent: '#E8453C',
    layout: 'single',
    tags: ['ATS', 'Clean', 'Simple'],
    preview: { sidebar: false, accentBar: true, cols: 1 }
  },
  {
    id: 'google-serif',
    name: 'Google Serif',
    category: 'Google Style' as TemplateCategory,
    accent: '#1a73e8',
    layout: 'two-col',
    tags: ['ATS', 'Serif', 'Blue'],
    preview: { sidebar: true, accentBar: false, cols: 2 }
  },
  {
    id: 'canva-modern-navy',
    name: 'Modern Navy',
    category: 'Canva Style' as TemplateCategory,
    accent: '#0288d1',
    layout: 'two-col',
    tags: ['Bold', 'Navy', 'Executive'],
    preview: { sidebar: true, accentBar: true, cols: 2 }
  },
  {
    id: 'canva-rose-executive',
    name: 'Rose Executive',
    category: 'Canva Style' as TemplateCategory,
    accent: '#b76e79',
    layout: 'two-col',
    tags: ['Elegant', 'Rose Gold'],
    preview: { sidebar: true, accentBar: false, cols: 2 }
  },
  {
    id: 'canva-minimal-slate',
    name: 'Minimal Slate',
    category: 'Canva Style' as TemplateCategory,
    accent: '#334155',
    layout: 'two-col',
    tags: ['Minimal', 'Clean', 'ATS'],
    preview: { sidebar: false, accentBar: true, cols: 2 }
  },
  {
    id: 'elite-executive',
    name: 'Elite Executive',
    category: 'Executive Style' as TemplateCategory,
    accent: '#1e293b',
    layout: 'single',
    tags: ['Executive', 'Sleek', 'Bold'],
    preview: { sidebar: false, accentBar: true, cols: 1 }
  },
  {
    id: 'creative-edge',
    name: 'Creative Edge',
    category: 'Modern Style' as TemplateCategory,
    accent: '#f43f5e',
    layout: 'two-col',
    tags: ['Creative', 'Bold', 'Unique'],
    preview: { sidebar: true, accentBar: true, cols: 2 }
  },
  {
    id: 'silicon-valley',
    name: 'Silicon Valley',
    category: 'Tech Style' as TemplateCategory,
    accent: '#06b6d4',
    layout: 'single',
    tags: ['Tech', 'Minimal', 'Modern'],
    preview: { sidebar: false, accentBar: false, cols: 1 }
  },
  {
    id: 'standard-exec',
    name: 'Standard Executive',
    category: 'Executive Style' as TemplateCategory,
    accent: '#27272a',
    layout: 'single',
    tags: ['ATS', 'Safe', 'Reliable'],
    preview: { sidebar: false, accentBar: false, cols: 1 }
  },
  {
    id: 'dynamic-duo',
    name: 'Dynamic Duo',
    category: 'Modern Style' as TemplateCategory,
    accent: '#4f46e5',
    layout: 'two-col',
    tags: ['Versatile', 'Balanced'],
    preview: { sidebar: true, accentBar: true, cols: 2 }
  },
  {
    id: 'avatar-exec',
    name: 'Avatar Executive',
    category: 'Executive Style' as TemplateCategory,
    accent: '#1f2937',
    layout: 'single',
    tags: ['Image', 'Executive', 'Featured'],
    preview: { sidebar: false, accentBar: true, cols: 1 }
  },
  {
    id: 'profile-wave',
    name: 'Profile Wave',
    category: 'Modern Style' as TemplateCategory,
    accent: '#4f46e5',
    layout: 'two-col',
    tags: ['Image', 'Creative', 'Wave'],
    preview: { sidebar: true, accentBar: true, cols: 2 }
  },
  {
    id: 'elegant-face',
    name: 'Elegant Face',
    category: 'Executive Style' as TemplateCategory,
    accent: '#0f172a',
    layout: 'two-col',
    tags: ['Image', 'Elegant', 'Clean'],
    preview: { sidebar: true, accentBar: false, cols: 2 }
  },
  {
    id: 'modern-split',
    name: 'Modern Split',
    category: 'Modern Style' as TemplateCategory,
    accent: '#059669',
    layout: 'two-col',
    tags: ['Image', 'Split', 'Modern'],
    preview: { sidebar: true, accentBar: true, cols: 2 }
  },
  {
    id: 'clean-focus',
    name: 'Clean Focus',
    category: 'Modern Style' as TemplateCategory,
    accent: '#2563eb',
    layout: 'two-col',
    tags: ['Image', 'Minimal', 'Focus'],
    preview: { sidebar: true, accentBar: false, cols: 2 }
  },
  {
    id: 'bold-vision',
    name: 'Bold Vision',
    category: 'Modern Style' as TemplateCategory,
    accent: '#dc2626',
    layout: 'two-col',
    tags: ['Image', 'Bold', 'Vision'],
    preview: { sidebar: true, accentBar: true, cols: 2 }
  },
  {
    id: 'tech-squad',
    name: 'Tech Squad',
    category: 'Tech Style' as TemplateCategory,
    accent: '#8b5cf6',
    layout: 'two-col',
    tags: ['Image', 'Tech', 'Squad'],
    preview: { sidebar: true, accentBar: true, cols: 2 }
  },
  {
    id: 'gradient-shift',
    name: 'Gradient Shift',
    category: 'Modern Style' as TemplateCategory,
    accent: '#ec4899',
    layout: 'two-col',
    tags: ['Image', 'Gradient', 'Shift'],
    preview: { sidebar: true, accentBar: true, cols: 2 }
  },
  {
    id: 'solid-base',
    name: 'Solid Base',
    category: 'Executive Style' as TemplateCategory,
    accent: '#3b82f6',
    layout: 'two-col',
    tags: ['Image', 'Solid', 'Base'],
    preview: { sidebar: true, accentBar: false, cols: 2 }
  },
  {
    id: 'golden-ratio',
    name: 'Golden Ratio',
    category: 'Modern Style' as TemplateCategory,
    accent: '#ca8a04',
    layout: 'two-col',
    tags: ['Image', 'Golden', 'Ratio'],
    preview: { sidebar: true, accentBar: true, cols: 2 }
  }
];

export default function LeftPanel() {
  const [activeSection, setActiveSection] = useState('templates');
  const [templateCategory, setTemplateCategory] = useState<TemplateCategory>('All');
  const store = useResumeStore();
  const { data, templateId, setTemplateId } = store;
  const calculateAtsScore = (store as any).calculateAtsScore ?? (() => {});
  const setActiveFieldId = (store as any).setActiveFieldId ?? (() => {});
  const [aiSuggestions, setAiSuggestions] = useState<string[]>([]);
  const [showAi, setShowAi] = useState<string | null>(null);

  const handleChange = (field: string, value: string) => {
    useResumeStore.getState().updateBasics({ [field]: value } as any);
    calculateAtsScore();
  };

  const handleAiRewrite = (id: string) => {
    setShowAi(id);
    setAiSuggestions([
      "Optimized processes reducing load time by 40%",
      "Spearheaded the development of core UI components",
      "Collaborated with cross-functional teams to deliver 3 apps"
    ]);
  };

  return (
    <div className="flex h-full shrink-0 relative z-20">
      {/* Icon Sidebar */}
      <div className="w-20 h-full border-r border-gray-200/50 flex flex-col items-center py-6 gap-2 bg-white/85 backdrop-blur-xl">
        {SECTIONS.map((section) => (
          <button
            key={section.id}
            onClick={() => setActiveSection(section.id)}
            className={`p-3 rounded-xl transition relative group ${
              activeSection === section.id 
                ? 'bg-blue-50 text-blue-600 shadow-sm' 
                : 'text-gray-400 hover:text-gray-800 hover:bg-gray-50'
            }`}
            title={section.label}
          >
            {activeSection === section.id && (
              <motion.div layoutId="activeTabIndicator" className="absolute -left-2 top-1/2 -translate-y-1/2 w-1 h-8 bg-blue-600 rounded-r-full" />
            )}
            {section.icon}
          </button>
        ))}
      </div>

      {/* Content Sidebar */}
      <div className="w-[320px] lg:w-[360px] h-full border-r border-gray-200/50 flex flex-col overflow-hidden shrink-0 bg-white/85 backdrop-blur-xl relative">
        <div className="p-4 border-b border-gray-100/50 flex items-center justify-between">
          <h2 className="font-bold text-black">Content</h2>
          <button className="text-xs bg-blue-50/50 text-blue-600 px-3 py-1.5 rounded-full font-medium hover:bg-blue-100 transition">
            Auto-fill with AI
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 custom-scrollbar relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSection}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 20, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
            {activeSection === 'templates' && (
              <div className="space-y-4">
                <div>
                  <h3 className="font-bold text-black text-lg mb-1">Choose Template</h3>
                  <p className="text-xs text-gray-400 mb-4">Professional designs from Google & Canva</p>
                </div>

                {/* Category Tabs */}
                <div className="flex gap-2 flex-wrap mb-4">
                  {(['All', 'Google Style', 'Canva Style', 'Executive Style', 'Tech Style', 'Modern Style'] as TemplateCategory[]).map(cat => (
                    <button
                      key={cat}
                      onClick={() => setTemplateCategory(cat)}
                      className={`text-[11px] font-bold px-3 py-1.5 rounded-full transition border ${
                        templateCategory === cat
                          ? 'bg-gray-900 text-white border-gray-900'
                          : 'bg-white text-gray-500 border-gray-200 hover:border-gray-400'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>

                {/* Template Cards */}
                <div className="grid grid-cols-1 gap-4">
                  {ALL_TEMPLATES.filter(t => templateCategory === 'All' || t.category === templateCategory).map((t) => {
                    const isActive = templateId === t.id;
                    return (
                      <button
                        key={t.id}
                        onClick={() => setTemplateId(t.id)}
                        className={`w-full rounded-2xl border-2 transition-all text-left relative overflow-hidden group ${
                          isActive
                            ? 'border-2 shadow-lg scale-[1.01]'
                            : 'border-gray-100 hover:border-gray-300 hover:shadow-md'
                        }`}
                        style={isActive ? { borderColor: t.accent } : {}}
                      >
                        {/* Visual Thumbnail */}
                        <div className="h-28 w-full relative overflow-hidden" style={{ background: t.layout === 'two-col' ? '#f8fafc' : '#fff' }}>
                          {t.preview.sidebar && (
                            <div className="absolute left-0 top-0 bottom-0 w-[35%]" style={{ background: t.accent, opacity: 0.9 }}>
                              <div className="mt-4 mx-3 space-y-2">
                                <div className="w-8 h-8 rounded-full bg-white/20 mx-auto"></div>
                                <div className="h-1.5 bg-white/30 rounded-full w-3/4 mx-auto mt-2"></div>
                                <div className="h-1 bg-white/20 rounded-full w-1/2 mx-auto"></div>
                                <div className="mt-3 space-y-1.5">
                                  <div className="h-1 bg-white/20 rounded-full w-full"></div>
                                  <div className="h-1 bg-white/20 rounded-full w-4/5"></div>
                                  <div className="h-1 bg-white/20 rounded-full w-full"></div>
                                </div>
                              </div>
                            </div>
                          )}
                          <div className={`absolute top-0 bottom-0 right-0 p-3 space-y-1.5 ${t.preview.sidebar ? 'left-[37%]' : 'left-0'}`}>
                            {t.preview.accentBar && (
                              <div className="h-1 w-16 rounded-full mb-2" style={{ background: t.accent }}></div>
                            )}
                            <div className="h-2 bg-gray-200 rounded-full w-2/3"></div>
                            <div className="h-1.5 rounded-full w-1/3" style={{ background: t.accent, opacity: 0.6 }}></div>
                            <div className="h-1 bg-gray-100 rounded-full w-full"></div>
                            <div className="h-1 bg-gray-100 rounded-full w-5/6"></div>
                            <div className="h-1 bg-gray-100 rounded-full w-full"></div>
                            <div className="mt-2 h-1.5 bg-gray-200 rounded-full w-1/2"></div>
                            <div className="h-1 bg-gray-100 rounded-full w-full"></div>
                            <div className="h-1 bg-gray-100 rounded-full w-4/5"></div>
                          </div>
                        </div>

                        {/* Card Footer */}
                        <div className="px-3 py-2.5 flex items-center justify-between bg-white border-t border-gray-100">
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-[9px] font-bold uppercase tracking-widest" style={{ color: t.accent }}>{t.category}</span>
                            </div>
                            <div className="text-sm font-bold text-gray-800">{t.name}</div>
                            <div className="flex gap-1 mt-1.5 flex-wrap">
                              {t.tags.map(tag => (
                                <span key={tag} className="text-[9px] font-semibold px-2 py-0.5 rounded-full bg-gray-100 text-gray-500">{tag}</span>
                              ))}
                            </div>
                          </div>
                          {isActive ? (
                            <div className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: t.accent }}>
                              <Check className="w-3.5 h-3.5 text-white" />
                            </div>
                          ) : (
                            <div className="w-7 h-7 rounded-full border-2 border-gray-200 flex-shrink-0 group-hover:border-gray-400 transition"></div>
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {activeSection === 'picture' && (
                <div className="space-y-4">
                  <div>
                    <h3 className="font-bold text-black text-lg mb-1">Profile Picture</h3>
                    <p className="text-xs text-gray-400 mb-4">Supports image-featured templates (Avatar Pro, Profile Wave, Tech Squad, etc.)</p>
                  </div>

                  {/* Upload area */}
                  <label className="w-full h-40 border-2 border-dashed border-gray-200 rounded-2xl flex flex-col items-center justify-center text-gray-400 hover:bg-gray-50 hover:border-black cursor-pointer transition relative overflow-hidden group">
                    {data.basics.image ? (
                      <>
                        <img src={data.basics.image} alt="Profile" className="w-full h-full object-cover absolute inset-0" />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                          <span className="text-white text-xs font-bold">Click to change</span>
                        </div>
                      </>
                    ) : (
                      <>
                        <Upload className="w-8 h-8 mb-2 text-gray-300" />
                        <span className="text-sm font-semibold text-gray-500">Click to upload photo</span>
                        <span className="text-xs text-gray-400 mt-1">JPG, PNG or WebP</span>
                      </>
                    )}
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          const reader = new FileReader();
                          reader.onloadend = () => {
                            handleChange('image', reader.result as string);
                          };
                          reader.readAsDataURL(file);
                        }
                      }}
                    />
                  </label>

                  {/* Remove button */}
                  {data.basics.image && (
                    <button
                      onClick={() => handleChange('image', '')}
                      className="w-full py-2 text-xs font-bold text-red-500 border border-red-200 rounded-xl hover:bg-red-50 transition"
                    >
                      Remove Photo
                    </button>
                  )}

                  {/* URL input */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Or paste image URL</label>
                    <input
                      type="text"
                      className="w-full p-2.5 border border-gray-200 rounded-xl text-sm outline-none focus:border-black focus:ring-2 focus:ring-black/5 bg-gray-50"
                      placeholder="https://example.com/photo.jpg"
                      value={data.basics.image.startsWith('data:') ? '' : data.basics.image}
                      onChange={(e) => handleChange('image', e.target.value)}
                    />
                  </div>

                  {/* Tip */}
                  <div className="bg-blue-50 border border-blue-100 rounded-xl p-3">
                    <p className="text-xs font-bold text-blue-700 mb-1">💡 Pro tip</p>
                    <p className="text-[11px] text-blue-600">After uploading, select an image-featured template from the Templates tab (look for the <span className="font-bold">Image</span> tag). Then use the <span className="font-bold">Design</span> tab on the right to control shape and alignment.</p>
                  </div>
                </div>
              )}


              {activeSection === 'basics' && (
                <div className="space-y-4">
                  <h3 className="font-bold text-black text-lg mb-4">Personal Details</h3>
                  <InputField id="basics.name" label="Full Name" value={data.basics.name} onChange={(v: string) => handleChange('name', v)} />
                  <InputField id="basics.email" label="Email Address" type="email" value={data.basics.email} onChange={(v: string) => handleChange('email', v)} />
                  <InputField id="basics.phone" label="Phone Number" type="tel" value={data.basics.phone} onChange={(v: string) => handleChange('phone', v)} />
                  <InputField id="basics.location" label="Location / Address" value={data.basics.location} onChange={(v: string) => handleChange('location', v)} />
                  <InputField id="basics.website" label="Website / LinkedIn" value={data.basics.website} onChange={(v: string) => handleChange('website', v)} />
                </div>
              )}

              {activeSection === 'summary' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold text-black text-lg">Professional Summary</h3>
                    <button className="text-xs flex items-center gap-1 text-purple-600 hover:text-purple-700 bg-purple-50 px-2 py-1 rounded-md">
                      <MessageSquare className="w-3 h-3" /> AI Generate
                    </button>
                  </div>
                  <div className="relative group">
                    <textarea 
                      className="w-full p-3 border border-gray-200 rounded-xl text-sm min-h-[200px] outline-none focus:border-black focus:ring-2 focus:ring-black/5 resize-none bg-white/50"
                      placeholder="Briefly describe your professional background and goals..."
                      value={data.basics.summary}
                      onFocus={() => setActiveFieldId('summary')}
                      onBlur={() => setActiveFieldId(null)}
                      onChange={(e) => handleChange('summary', e.target.value)}
                    />
                    <button onClick={() => handleAiRewrite('summary')} className="absolute bottom-3 right-3 p-1.5 bg-blue-100 text-blue-600 rounded-md opacity-0 group-hover:opacity-100 transition shadow-sm hover:bg-blue-200">
                      <Sparkles className="w-4 h-4" />
                    </button>
                  </div>
                  
                  <AnimatePresence>
                    {showAi === 'summary' && (
                      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="p-4 bg-gray-50 border border-gray-200 rounded-xl space-y-3">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-xs font-bold text-gray-500 uppercase">AI Suggestions</span>
                          <button onClick={() => setShowAi(null)}><X className="w-4 h-4 text-gray-400 hover:text-gray-600" /></button>
                        </div>
                        {aiSuggestions.map((sug, i) => (
                          <div key={i} className="flex flex-col gap-2 p-3 bg-white border border-gray-100 rounded-lg hover:border-blue-300 transition">
                            <p className="text-sm text-gray-700">{sug}</p>
                            <button 
                              onClick={() => { handleChange('summary', sug); setShowAi(null); }}
                              className="text-xs font-medium text-blue-600 self-end flex items-center gap-1"
                            >
                              <Check className="w-3 h-3" /> Use this
                            </button>
                          </div>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )}

              {activeSection === 'hobbies' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold text-black text-lg">Hobbies & Interests</h3>
                  </div>
                  <textarea 
                    className="w-full p-3 border border-gray-200 rounded-xl text-sm min-h-[150px] outline-none focus:border-black focus:ring-2 focus:ring-black/5 resize-none bg-white/50"
                    placeholder="List your hobbies, e.g., Reading, Open Source, Hiking..."
                    value={data.hobbies}
                    onFocus={() => setActiveFieldId('hobbies')}
                    onBlur={() => setActiveFieldId(null)}
                    onChange={(e) => {
                      useResumeStore.setState({ data: { ...data, hobbies: e.target.value } });
                      calculateAtsScore();
                    }}
                  />
                </div>
              )}

              {['experience', 'education', 'skills', 'languages', 'projects'].includes(activeSection) && (
                <div className="space-y-4">
                  <h3 className="font-bold text-black text-lg mb-4 capitalize">{activeSection}</h3>
                  
                  {/* Existing Items */}
                  <div className="space-y-4">
                    {/* @ts-ignore */}
                    {data[activeSection as keyof typeof data]?.map((item: any) => (
                      <div key={item.id} className="p-4 border border-gray-200 rounded-xl bg-gray-50/50 space-y-4">
                        <div className="flex justify-between items-center pb-3 border-b border-gray-100">
                          <span className="font-bold text-black text-sm">
                            {item.name || item.company || item.institution || item.language || item.position || 'New Item'}
                          </span>
                          <button 
                            onClick={() => useResumeStore.getState().removeItem(activeSection as any, item.id)}
                            className="text-red-500 hover:bg-red-50 p-1.5 rounded-lg transition"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>

                        {/* Conditional Forms based on section */}
                        {activeSection === 'skills' && (
                          <div className="space-y-3">
                            <div className="grid grid-cols-2 gap-3">
                              <InputField 
                                id={`skill-${item.id}-name`}
                                label="Skill Name" 
                                value={item.name} 
                                onChange={(v: string) => useResumeStore.getState().updateItem('skills', item.id, { name: v })} 
                              />
                              <div className="space-y-1.5">
                                <label className="text-sm font-medium text-black">Proficiency</label>
                                <select
                                  className="w-full p-2.5 border border-gray-200 rounded-xl text-sm outline-none focus:border-black bg-white text-black"
                                  value={item.level}
                                  onChange={(e) => useResumeStore.getState().updateItem('skills', item.id, { level: e.target.value })}
                                >
                                  {['Beginner','Intermediate','Advanced','Expert','Master'].map(l => <option key={l}>{l}</option>)}
                                </select>
                              </div>
                            </div>
                          </div>
                        )}

                        {activeSection === 'experience' && (
                          <div className="space-y-3">
                            <InputField id={`exp-${item.id}-company`} label="Company" value={item.company} onChange={(v: string) => useResumeStore.getState().updateItem('work', item.id, { company: v })} />
                            <InputField id={`exp-${item.id}-position`} label="Position" value={item.position} onChange={(v: string) => useResumeStore.getState().updateItem('work', item.id, { position: v })} />
                            <div className="grid grid-cols-2 gap-3">
                              <InputField id={`exp-${item.id}-start`} label="Start Date" value={item.startDate} onChange={(v: string) => useResumeStore.getState().updateItem('work', item.id, { startDate: v })} />
                              <InputField id={`exp-${item.id}-end`} label="End Date" value={item.endDate} onChange={(v: string) => useResumeStore.getState().updateItem('work', item.id, { endDate: v })} />
                            </div>
                            <div className="space-y-1.5 relative group">
                              <label className="text-sm font-medium text-black">Summary / Description</label>
                              <textarea 
                                className="w-full p-2.5 border border-gray-200 rounded-xl text-sm outline-none focus:border-black focus:ring-2 focus:ring-black/5 resize-none h-24 text-black bg-white"
                                value={item.summary}
                                onFocus={() => setActiveFieldId('experience')}
                                onBlur={() => setActiveFieldId(null)}
                                onChange={(e) => useResumeStore.getState().updateItem('work', item.id, { summary: e.target.value })}
                              />
                              <button onClick={() => handleAiRewrite(item.id)} className="absolute bottom-3 right-3 p-1.5 bg-blue-100 text-blue-600 rounded-md opacity-0 group-hover:opacity-100 transition shadow-sm hover:bg-blue-200">
                                <Sparkles className="w-4 h-4" />
                              </button>
                            </div>
                            
                            <AnimatePresence>
                              {showAi === item.id && (
                                <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="p-4 bg-white border border-gray-200 rounded-xl space-y-3 shadow-sm mt-2">
                                  <div className="flex justify-between items-center mb-2">
                                    <span className="text-xs font-bold text-gray-500 uppercase">AI Suggestions</span>
                                    <button onClick={() => setShowAi(null)}><X className="w-4 h-4 text-gray-400 hover:text-gray-600" /></button>
                                  </div>
                                  {aiSuggestions.map((sug, i) => (
                                    <div key={i} className="flex flex-col gap-2 p-3 bg-gray-50 border border-gray-100 rounded-lg hover:border-blue-300 transition">
                                      <p className="text-sm text-gray-700">{sug}</p>
                                      <button 
                                        onClick={() => { useResumeStore.getState().updateItem('work', item.id, { summary: sug }); setShowAi(null); }}
                                        className="text-xs font-medium text-blue-600 self-end flex items-center gap-1"
                                      >
                                        <Check className="w-3 h-3" /> Use this
                                      </button>
                                    </div>
                                  ))}
                                </motion.div>
                              )}
                            </AnimatePresence>
                            
                          </div>
                        )}
                        
                        {activeSection === 'education' && (
                          <div className="space-y-3">
                            <InputField id={`edu-${item.id}-inst`} label="Institution" value={item.institution} onChange={(v: string) => useResumeStore.getState().updateItem('education', item.id, { institution: v })} />
                            <InputField id={`edu-${item.id}-area`} label="Degree / Area" value={item.area} onChange={(v: string) => useResumeStore.getState().updateItem('education', item.id, { area: v })} />
                            <div className="grid grid-cols-2 gap-3">
                              <InputField id={`edu-${item.id}-start`} label="Start Year" value={item.startDate} onChange={(v: string) => useResumeStore.getState().updateItem('education', item.id, { startDate: v })} />
                              <InputField id={`edu-${item.id}-end`} label="End Year" value={item.endDate} onChange={(v: string) => useResumeStore.getState().updateItem('education', item.id, { endDate: v })} />
                            </div>
                            <InputField id={`edu-${item.id}-score`} label="Grade / Score" value={item.score} onChange={(v: string) => useResumeStore.getState().updateItem('education', item.id, { score: v })} />
                          </div>
                        )}

                        {activeSection === 'languages' && (
                          <div className="space-y-3">
                            <InputField id={`lang-${item.id}-lang`} label="Language" value={item.language} onChange={(v: string) => useResumeStore.getState().updateItem('languages', item.id, { language: v })} />
                            <div className="space-y-1.5">
                              <label className="text-sm font-medium text-black">Fluency</label>
                              <select className="w-full p-2.5 border border-gray-200 rounded-xl text-sm outline-none focus:border-black bg-white text-black" value={item.fluency} onChange={(e) => useResumeStore.getState().updateItem('languages', item.id, { fluency: e.target.value })}>
                                {['Native','Fluent','Professional','Intermediate','Basic','Beginner'].map(l => <option key={l}>{l}</option>)}
                              </select>
                            </div>
                          </div>
                        )}

                        {activeSection === 'projects' && (
                          <div className="space-y-3">
                            <InputField id={`proj-${item.id}-name`} label="Project Name" value={item.name} onChange={(v: string) => useResumeStore.getState().updateItem('projects', item.id, { name: v })} />
                            <InputField id={`proj-${item.id}-link`} label="URL / Link" value={item.link} onChange={(v: string) => useResumeStore.getState().updateItem('projects', item.id, { link: v })} />
                            <InputField id={`proj-${item.id}-tech`} label="Technologies (comma-separated)" value={item.technologies} onChange={(v: string) => useResumeStore.getState().updateItem('projects', item.id, { technologies: v })} />
                            <div className="space-y-1.5">
                              <label className="text-sm font-medium text-black">Description</label>
                              <textarea className="w-full p-2.5 border border-gray-200 rounded-xl text-sm outline-none focus:border-black focus:ring-2 focus:ring-black/5 resize-none h-24 text-black bg-white" value={item.description} onChange={(e) => useResumeStore.getState().updateItem('projects', item.id, { description: e.target.value })} />
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* @ts-ignore */}
                  {data[activeSection as keyof typeof data]?.length === 0 && (
                    <div className="p-8 text-center text-gray-400 border border-dashed border-gray-200 rounded-2xl">
                      Click + to add {activeSection}
                    </div>
                  )}
                  
                  <button 
                    onClick={() => {
                      const uid = () => Math.random().toString(36).slice(2,9);
                      if (activeSection === 'skills') useResumeStore.getState().addItem('skills', { id: uid(), name: '', level: 'Intermediate' });
                      else if (activeSection === 'experience') useResumeStore.getState().addItem('work', { id: uid(), company: '', position: '', startDate: '', endDate: '', summary: '' });
                      else if (activeSection === 'education') useResumeStore.getState().addItem('education', { id: uid(), institution: '', area: '', studyType: '', startDate: '', endDate: '', score: '' });
                      else if (activeSection === 'languages') useResumeStore.getState().addItem('languages', { id: uid(), language: '', fluency: 'Native' });
                      else if (activeSection === 'projects') useResumeStore.getState().addItem('projects', { id: uid(), name: '', description: '', link: '', technologies: '' });
                    }}
                    className="w-full py-2.5 border border-black text-black rounded-xl text-sm font-bold hover:bg-black hover:text-white transition shadow-[0_4px_14px_0_rgb(0,0,0,0.1)] hover:shadow-[0_6px_20px_rgba(0,0,0,0.2)]"
                  >
                    + Add Item
                  </button>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

const InputField = ({ id, label, value, onChange, type = 'text' }: any) => {
  const setActiveFieldId = (useResumeStore(s => (s as any).setActiveFieldId)) ?? (() => {});
  return (
    <div className="space-y-1.5">
      <label className="text-sm font-medium text-black">{label}</label>
      <input 
        type={type}
        className="w-full p-2.5 border border-gray-200 rounded-xl text-sm outline-none focus:border-black focus:ring-2 focus:ring-black/5 transition-all text-black bg-white"
        value={value}
        onFocus={() => setActiveFieldId(id || label.toLowerCase())}
        onBlur={() => setActiveFieldId(null)}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};
