'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { templates } from '@/lib/templates';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ArrowRight, Hexagon, Star, X } from 'lucide-react';
import ShapeGrid from '@/components/ShapeGrid';

// ─── Sample resume data ────────────────────────────────────────────────────────
// Using a consistent, professional face photo for all previews
const SAMPLE_IMAGE = 'https://randomuser.me/api/portraits/women/44.jpg';

const SAMPLE = {
  name: 'Alexandra Johnson',
  email: 'alex.johnson@gmail.com',
  phone: '+1 (555) 234-5678',
  location: 'San Francisco, CA',
  website: 'linkedin.com/in/alexjohnson',
  summary: 'Senior Software Engineer with 8+ years building scalable web applications. Passionate about clean architecture, developer experience, and mentoring high-performing teams.',
  image: SAMPLE_IMAGE,
  work: [
    { company: 'Google LLC', position: 'Senior Software Engineer', startDate: '2021-01', endDate: 'Present', summary: 'Led frontend architecture for Google Search. Improved core web vitals by 35% across 1B+ users. Mentored 6 junior engineers.' },
    { company: 'Meta Platforms', position: 'Software Engineer', startDate: '2018-03', endDate: '2020-12', summary: 'Built React components used by 500M+ daily active users. Reduced bundle size by 40% through code splitting.' },
    { company: 'Stripe, Inc.', position: 'Frontend Developer', startDate: '2016-06', endDate: '2018-02', summary: 'Developed payment UI processing $1B+ daily. Maintained 99.99% uptime for critical checkout flows.' },
  ],
  education: [
    { institution: 'Stanford University', area: 'Computer Science, M.S.', studyType: 'Master', startDate: '2014', endDate: '2016' },
    { institution: 'UC Berkeley', area: 'Computer Science, B.S.', studyType: 'Bachelor', startDate: '2010', endDate: '2014' },
  ],
  skills: [
    { name: 'React / Next.js', level: 'Expert' },
    { name: 'TypeScript', level: 'Expert' },
    { name: 'Node.js', level: 'Advanced' },
    { name: 'System Design', level: 'Advanced' },
    { name: 'Python', level: 'Proficient' },
    { name: 'GraphQL', level: 'Proficient' },
  ],
  languages: [
    { language: 'English', fluency: 'Native' },
    { language: 'Spanish', fluency: 'Professional' },
  ],
  projects: [
    { name: 'OpenResume', description: 'Open-source resume builder with 20K+ GitHub stars.' },
    { name: 'ReactFlow Kit', description: 'UI component library with 500K+ monthly npm downloads.' },
  ],
};

const LEVEL_MAP: Record<string, number> = {
  Beginner: 25, Elementary: 35, Intermediate: 55, Proficient: 65,
  Advanced: 75, Expert: 85, Master: 95, Native: 100, Fluent: 90, Professional: 70,
};

function esc(s: string) {
  return (s || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function buildDoc(html: string, css: string, accent: string): string {
  const d = SAMPLE;
  const initials = d.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);

  const workHtml = d.work.map(j => `
    <div class="work-card">
      <div class="card-side"><span class="dot"></span><span class="line"></span></div>
      <div class="card-main">
        <div class="card-header">
          <h3 class="position">${esc(j.position)}</h3>
          <span class="date">${esc(j.startDate)} — ${esc(j.endDate)}</span>
        </div>
        <div class="company">${esc(j.company)}</div>
        <div class="summary">${esc(j.summary)}</div>
      </div>
    </div>`).join('');

  const eduHtml = d.education.map(e => `
    <div class="edu-card">
      <div class="edu-info">
        <div class="area">${esc(e.area)}</div>
        <div class="institution">${esc(e.institution)}</div>
      </div>
      <span class="edu-date">${esc(e.startDate)} — ${esc(e.endDate)}</span>
    </div>`).join('');

  const skillsHtml = d.skills.map(s => {
    const pct = LEVEL_MAP[s.level] ?? 70;
    return `<div class="skill-row"><span class="skill-meta">${esc(s.name)}</span><div class="skill-track"><div class="skill-fill" style="width:${pct}%"></div></div><span class="skill-val">${pct}%</span></div>`;
  }).join('');

  const langHtml = d.languages.map(l => {
    const pct = LEVEL_MAP[l.fluency] ?? 70;
    return `<div class="skill-row"><span class="skill-meta">${esc(l.language)}</span><div class="skill-track"><div class="skill-fill" style="width:${pct}%"></div></div><span class="skill-val">${esc(l.fluency)}</span></div>`;
  }).join('');

  const projHtml = d.projects.map(p => `
    <div class="project-card"><div class="project-name">${esc(p.name)}</div><div class="project-desc">${esc(p.description)}</div></div>`).join('');

  // Profile image: show real photo if available, fall back to initials
  const profileImgHtml = d.image
    ? `<div class="profile-img" style="
          width:100px;height:100px;border-radius:50%;overflow:hidden;
          flex-shrink:0;background:${accent};
        ">
        <img src="${d.image}" alt="${esc(d.name)}"
          style="width:100%;height:100%;object-fit:cover;display:block;" />
       </div>`
    : `<div class="profile-img fallback" style="
          background:${accent};color:#fff;display:flex;
          align-items:center;justify-content:center;
          font-size:36px;font-weight:bold;
          width:100px;height:100px;border-radius:50%;
        ">${initials}</div>`;

  const result = html
    .replace(/\{\{name\}\}/g, esc(d.name))
    .replace(/\{\{email\}\}/g, esc(d.email))
    .replace(/\{\{phone\}\}/g, esc(d.phone))
    .replace(/\{\{location\}\}/g, esc(d.location))
    .replace(/\{\{website\}\}/g, esc(d.website))
    .replace(/\{\{summary\}\}/g, esc(d.summary))
    .replace(/\{\{image\}\}/g, d.image || '')
    .replace(/\{\{initials\}\}/g, initials)
    .replace(/\{\{profileImage\}\}/g, profileImgHtml)
    .replace(/\{\{experience\}\}/g, workHtml)
    .replace(/\{\{education\}\}/g, eduHtml)
    .replace(/\{\{skills\}\}/g, skillsHtml)
    .replace(/\{\{languages\}\}/g, langHtml)
    .replace(/\{\{projects\}\}/g, projHtml)
    .replace(/\{\{certifications\}\}/g, '')
    .replace(/\{\{interests\}\}/g, '');

  // A4 page: 794px wide × 1123px tall at 96dpi
  return `<!DOCTYPE html><html><head><meta charset="utf-8"><style>
    *{box-sizing:border-box;margin:0;padding:0;}
    html,body{width:794px;min-height:1123px;background:#fff;overflow:hidden;}
    :root{
      --primary-color:${accent};
      --font-family:'Segoe UI',system-ui,-apple-system,sans-serif;
      --base-font-size:12px;
      --header-flex-dir:row;
      --header-align-items:center;
      --image-radius:50%;
      --image-text-align:left;
    }
    ${css}
  </style></head><body>${result}</body></html>`;
}

// ─── All templates ─────────────────────────────────────────────────────────────
const ALL_TEMPLATES = Object.entries(templates).map(([id, t]) => ({
  id, name: t.name, category: t.category, accent: t.accent,
  html: t.html, css: t.css,
}));

const CATEGORIES = ['All', ...Array.from(new Set(ALL_TEMPLATES.map(t => t.category)))];

// ─── Card dimensions — A4 ratio (1:1.414) ────────────────────────────────────
// Card width: 280px → scale = 280/794 ≈ 0.3526
// Card height = 1123 * 0.3526 ≈ 396px
const CARD_W = 280;
const DOC_W  = 794;
const DOC_H  = 1123;
const SCALE  = CARD_W / DOC_W;          // ~0.3526
const CARD_H = Math.round(DOC_H * SCALE); // ~396

// ─── Template preview card ─────────────────────────────────────────────────────
function TemplateCard({ id, name, category, accent, html, css }: typeof ALL_TEMPLATES[0]) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;
    iframe.srcdoc = buildDoc(html, css, accent);
  }, [html, css, accent]);

  return (
    <motion.div
      whileHover={{ y: -6, scale: 1.02 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Link
        href={`/editor/new?template=${id}`}
        className="block rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl border border-gray-200/80 hover:border-transparent transition-all duration-300 bg-white"
        style={{ width: CARD_W }}
      >
        {/* ── A4-proportioned preview area ── */}
        <div
          className="relative bg-white overflow-hidden"
          style={{ width: CARD_W, height: CARD_H }}
        >
          <iframe
            ref={iframeRef}
            scrolling="no"
            className={`pointer-events-none border-0 absolute top-0 left-0 transition-all duration-500 ${hovered ? 'blur-md scale-105' : ''}`}
            style={{
              width:  DOC_W,
              height: DOC_H,
              transform: `scale(${SCALE})`,
              transformOrigin: '0 0',
            }}
            title={name}
            sandbox="allow-same-origin allow-scripts"
          />

          {/* Hover overlay */}
          <AnimatePresence>
            {hovered && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-black/30 backdrop-blur-[3px] z-20"
              >
                <p className="text-white font-black text-xl tracking-tight text-center px-6 drop-shadow-lg">
                  {name}
                </p>
                <div className="text-white font-black uppercase tracking-widest text-[11px] flex items-center gap-2 bg-black px-6 py-2.5 rounded-full border border-white/20 shadow-2xl">
                  Use Template <ArrowRight className="w-4 h-4" />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Category badge */}
          <div
            className="absolute top-2.5 left-2.5 text-white text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full z-10 shadow"
            style={{ background: accent }}
          >
            {category}
          </div>
        </div>

        {/* ── Card footer ── */}
        <div className="px-3.5 py-2.5 flex items-center justify-between border-t border-gray-100 bg-white">
          <div>
            <p className="text-xs font-black text-gray-900 leading-none">{name}</p>
            <p className="text-[10px] text-gray-400 mt-0.5">{category}</p>
          </div>
          <div
            className="w-6 h-6 rounded-full flex-shrink-0 border-2 border-white shadow"
            style={{ background: accent }}
          />
        </div>
      </Link>
    </motion.div>
  );
}

// ─── Page ──────────────────────────────────────────────────────────────────────
export default function TemplatesPage() {
  const [search, setSearch]     = useState('');
  const [category, setCategory] = useState('All');

  const filtered = ALL_TEMPLATES.filter(t => {
    const matchCat    = category === 'All' || t.category === category;
    const matchSearch = t.name.toLowerCase().includes(search.toLowerCase())
                     || t.category.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="min-h-screen font-sans relative bg-white">
      {/* Flowing Background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <ShapeGrid 
          squareSize={100} 
          borderColor="rgba(0,0,0,0.05)" 
          hoverFillColor="rgba(0,0,0,0.03)"
          speed={0.5}
        />
      </div>

      <div className="relative z-10">

      {/* ── Navbar ── */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-screen-2xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <Hexagon className="w-7 h-7 fill-black text-black" />
            <span className="font-black text-lg text-gray-900">Resume Forge</span>
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/" className="text-sm font-medium text-gray-500 hover:text-gray-900 transition">Home</Link>
            <Link href="/ats-checker" className="text-sm font-medium text-gray-500 hover:text-gray-900 transition">ATS Checker</Link>
            <Link href="/editor/new" className="text-sm font-bold text-white bg-black hover:bg-gray-800 px-4 py-2 rounded-lg transition">
              + New Resume
            </Link>
          </div>
        </div>
      </nav>

      {/* ── Hero ── */}
      <div
        className="relative overflow-hidden border-b border-gray-100"
      >
        <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full opacity-20"
          style={{ background: 'radial-gradient(circle, #6366f1, transparent)' }} />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 rounded-full opacity-20"
          style={{ background: 'radial-gradient(circle, #a855f7, transparent)' }} />

        <div className="relative max-w-screen-2xl mx-auto px-8 py-20 flex flex-col md:flex-row items-start md:items-end justify-between gap-8">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-indigo-300 bg-indigo-950/60 border border-indigo-800 px-4 py-1.5 rounded-full mb-6">
              <Star className="w-3 h-3 fill-indigo-300" />
              {ALL_TEMPLATES.length} Professional Templates
            </div>
            <h1 className="text-6xl md:text-7xl font-black text-black tracking-tight leading-none mb-4">
              Find your
              <span className="block text-transparent bg-clip-text" style={{ backgroundImage: 'linear-gradient(90deg, #000, #333)' }}>
                perfect design
              </span>
            </h1>
            <p className="text-lg text-gray-500 max-w-xl leading-relaxed">
              Every template is ATS-optimized, fully customizable, and ready to download as PDF.
            </p>
          </div>

          {/* Search */}
          <div className="relative w-full md:w-80 shrink-0">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search templates..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-11 pr-10 py-3.5 rounded-xl bg-white border border-gray-200 text-black placeholder-gray-400 text-sm outline-none focus:border-black transition shadow-sm"
            />
            {search && (
              <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* ── Main ── */}
      <div className="max-w-screen-2xl mx-auto px-6 py-10">

        {/* Category filter */}
        <div className="flex items-center justify-between gap-4 mb-8 flex-wrap">
          <div className="flex gap-2 flex-wrap">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`text-xs font-bold px-4 py-2 rounded-full border transition-all ${
                  category === cat
                    ? 'bg-black text-white border-black shadow-md'
                    : 'bg-white/50 backdrop-blur-sm text-gray-600 border-gray-200 hover:border-gray-400 hover:bg-white'
                }`}
              >
                {cat}
                {cat === 'All' && <span className="ml-1.5 opacity-60">({ALL_TEMPLATES.length})</span>}
              </button>
            ))}
          </div>
          <p className="text-sm text-gray-500 font-medium shrink-0">
            Showing <span className="text-gray-900 font-bold">{filtered.length}</span> templates
          </p>
        </div>

        {/* ── Template grid ── */}
        {filtered.length > 0 ? (
          <div
            className="grid gap-6"
            style={{ gridTemplateColumns: `repeat(auto-fill, minmax(${CARD_W}px, 1fr))` }}
          >
            {filtered.map((t, i) => (
              <motion.div
                key={t.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.02, duration: 0.3, ease: 'easeOut' }}
              >
                <TemplateCard {...t} />
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-32">
            <p className="text-4xl font-black text-gray-200 mb-3">No templates found</p>
            <p className="text-gray-400 mb-6">Try adjusting your search or filter.</p>
            <button
              onClick={() => { setSearch(''); setCategory('All'); }}
              className="text-sm font-bold text-indigo-600 bg-indigo-50 px-5 py-2.5 rounded-xl hover:bg-indigo-100 transition"
            >
              Clear filters
            </button>
          </div>
        )}

        {/* Bottom CTA */}
        <div
          className="mt-20 text-center py-16 rounded-3xl border border-gray-100 bg-gray-50/50 backdrop-blur-sm"
        >
          <p className="text-3xl font-black text-white mb-3">Ready to stand out?</p>
          <p className="text-slate-400 mb-8 text-lg">Pick a template and build your resume in minutes.</p>
          <Link
            href="/editor/new"
            className="inline-flex items-center gap-2 font-black text-white px-8 py-4 rounded-xl text-sm hover:opacity-90 transition shadow-xl bg-black"
          >
            Get Started Now <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        </div>
      </div>
    </div>
  );
}
