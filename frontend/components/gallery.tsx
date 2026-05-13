'use client';

import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { templates } from '@/lib/templates';

// ─── Sample data for previews ─────────────────────────────────────────────────
// Using a consistent, professional face photo for all previews
const SAMPLE_IMAGE = 'https://randomuser.me/api/portraits/women/44.jpg';

const SAMPLE = {
  name: 'Alexandra Johnson',
  email: 'alex@gmail.com',
  phone: '+1 (555) 234-5678',
  location: 'San Francisco, CA',
  website: 'linkedin.com/in/alexj',
  summary: 'Senior Software Engineer with 8+ years building scalable web applications. Passionate about clean architecture and developer experience.',
  image: SAMPLE_IMAGE,
  work: [
    { company: 'Google LLC', position: 'Senior Software Engineer', startDate: 'Jan 2021', endDate: 'Present', summary: 'Led frontend architecture for Search. Improved core web vitals by 35%.' },
    { company: 'Meta Platforms', position: 'Software Engineer', startDate: 'Mar 2018', endDate: 'Dec 2020', summary: 'Built React components used by 500M+ users. Reduced bundle size by 40%.' },
  ],
  education: [
    { institution: 'Stanford University', area: 'Computer Science, M.S.', startDate: '2014', endDate: '2016' },
    { institution: 'UC Berkeley', area: 'Computer Science, B.S.', startDate: '2010', endDate: '2014' },
  ],
  skills: [
    { name: 'React / Next.js', level: 'Expert' },
    { name: 'TypeScript', level: 'Expert' },
    { name: 'Node.js', level: 'Advanced' },
    { name: 'System Design', level: 'Advanced' },
  ],
  languages: [
    { language: 'English', fluency: 'Native' },
    { language: 'Spanish', fluency: 'Professional' },
  ],
  projects: [
    { name: 'OpenResume', description: 'Open-source resume builder with 20K+ GitHub stars.' },
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

  return `<!DOCTYPE html><html><head><meta charset="utf-8"><style>
    *{box-sizing:border-box;margin:0;padding:0;}
    :root{--primary-color:${accent};--font-family:system-ui,sans-serif;--base-font-size:11px;--header-flex-dir:row;--header-align-items:center;--image-radius:50%;--image-text-align:left;}
    body{margin:0;padding:0;background:#fff;}
    ${css}
  </style></head><body>${result}</body></html>`;
}

// ─── Template entries ─────────────────────────────────────────────────────────
const allTemplates = Object.entries(templates).map(([id, t]) => ({
  id, name: t.name, accent: t.accent, html: t.html, css: t.css,
}));

const topRow = allTemplates.filter((_, i) => i % 2 === 0);
const bottomRow = allTemplates.filter((_, i) => i % 2 !== 0);

// A4: 794 × 1123 px — card: 240 × 340 px → scale = 240/794 ≈ 0.302
const CARD_W_G  = 260;
const DOC_W_G   = 794;
const DOC_H_G   = 1123;
const SCALE_G   = CARD_W_G / DOC_W_G;
const CARD_H_G  = Math.round(DOC_H_G * SCALE_G);

// ─── Live preview card ────────────────────────────────────────────────────────
function PreviewCard({ id, name, accent, html, css }: typeof allTemplates[0]) {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;
    iframe.srcdoc = buildDoc(html, css, accent);
  }, [html, css, accent]);

  return (
    <Link
      href={`/editor/new?template=${id}`}
      className="relative group shrink-0 rounded-xl overflow-hidden shadow-md hover:shadow-2xl border border-gray-200 hover:border-transparent transition-all duration-300 cursor-pointer block"
      style={{ width: CARD_W_G, height: CARD_H_G + 36 }}
    >
      {/* Live iframe preview — A4 proportioned */}
      <div className="absolute top-0 left-0 right-0 bg-white overflow-hidden" style={{ height: CARD_H_G }}>
        <iframe
          ref={iframeRef}
          scrolling="no"
          className="pointer-events-none border-0 absolute top-0 left-0 transition-all duration-500 group-hover:blur-md group-hover:scale-105"
          style={{ width: DOC_W_G, height: DOC_H_G, transform: `scale(${SCALE_G})`, transformOrigin: '0 0' }}
          title={name}
          sandbox="allow-same-origin allow-scripts"
        />
      </div>
      {/* Hover overlay */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col items-center justify-center gap-3 bg-black/20 backdrop-blur-[2px]"
        style={{ height: CARD_H_G }}
      >
        <p className="text-white font-black text-lg tracking-tight text-center px-4 drop-shadow-md">
          {name}
        </p>
        <span className="text-white font-black uppercase tracking-widest text-[10px] bg-black px-4 py-2 rounded-full shadow-xl border border-white/20">
          Use Template
        </span>
      </div>
      {/* Footer label */}
      <div
        className="absolute left-0 right-0 bottom-0 flex items-center justify-between px-3 bg-white border-t border-gray-100"
        style={{ height: 36 }}
      >
        <span className="text-[11px] font-bold text-gray-800 truncate">{name}</span>
        <span className="w-4 h-4 rounded-full flex-shrink-0" style={{ background: accent }} />
      </div>
    </Link>
  );
}

// ─── Gallery component ────────────────────────────────────────────────────────
export default function TemplateGallery() {
  const col1 = [...allTemplates.filter((_, i) => i % 3 === 0)];
  const col2 = [...allTemplates.filter((_, i) => i % 3 === 1)];
  const col3 = [...allTemplates.filter((_, i) => i % 3 === 2)];

  // Repeat items for seamless loop
  const c1Items = [...col1, ...col1, ...col1, ...col1];
  const c2Items = [...col2, ...col2, ...col2, ...col2];
  const c3Items = [...col3, ...col3, ...col3, ...col3];

  return (
    <section className="relative w-full bg-white overflow-hidden py-24 font-sans">
      <div className="max-w-[90rem] mx-auto px-6 md:px-12 flex flex-col lg:flex-row gap-16 items-center">
        
        {/* Left: Text Content */}
        <div className="w-full lg:w-1/3 z-10">
          <div className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-gray-400 mb-6 bg-gray-50 px-4 py-1.5 rounded-full border border-gray-100">
            <span className="w-1.5 h-1.5 rounded-full bg-black animate-pulse" />
            Live Showcases
          </div>
          <h2 className="text-5xl md:text-7xl font-black text-black tracking-tight leading-[0.9] mb-8">
            The New <br/>
            <span className="text-gray-300">Standard</span>
          </h2>
          <p className="text-lg md:text-xl text-gray-500 max-w-md leading-relaxed font-medium mb-10">
            Choose from {allTemplates.length} professional designs. Every template is ATS-optimized and fully customizable.
          </p>
          <Link
            href="/templates"
            className="inline-flex items-center gap-3 font-black text-white bg-black hover:bg-gray-800 px-8 py-4 rounded-xl transition shadow-2xl hover:scale-105 active:scale-95 group"
          >
            Explore All Templates
            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Right: Vertical Scrolling Columns */}
        <div className="w-full lg:w-2/3 h-[700px] flex gap-4 md:gap-8 overflow-hidden relative">
          {/* Fading Gradients */}
          <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-white to-transparent z-10 pointer-events-none" />
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent z-10 pointer-events-none" />

          {/* Col 1 - Up */}
          <div className="flex-1 min-w-[140px]">
            <motion.div
              className="flex flex-col gap-6"
              animate={{ y: ['0%', '-50%'] }}
              transition={{ repeat: Infinity, ease: 'linear', duration: 180 }}
            >
              {c1Items.map((t, i) => (
                <div key={`c1-${i}`} className="w-full">
                   <PreviewCard {...t} />
                </div>
              ))}
            </motion.div>
          </div>

          {/* Col 2 - Down */}
          <div className="flex-1 min-w-[140px] mt-[-300px]">
            <motion.div
              className="flex flex-col gap-6"
              animate={{ y: ['-50%', '0%'] }}
              transition={{ repeat: Infinity, ease: 'linear', duration: 200 }}
            >
              {c2Items.map((t, i) => (
                <div key={`c2-${i}`} className="w-full">
                   <PreviewCard {...t} />
                </div>
              ))}
            </motion.div>
          </div>

          {/* Col 3 - Up */}
          <div className="flex-1 min-w-[140px] mt-[-100px]">
            <motion.div
              className="flex flex-col gap-6"
              animate={{ y: ['0%', '-50%'] }}
              transition={{ repeat: Infinity, ease: 'linear', duration: 220 }}
            >
              {c3Items.map((t, i) => (
                <div key={`c3-${i}`} className="w-full">
                   <PreviewCard {...t} />
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

