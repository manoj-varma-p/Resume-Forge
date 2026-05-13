'use client';

import { useResumeStore } from '@/lib/store';
import { useEffect, useState } from 'react';

interface HtmlTemplateProps {
  html: string;
  css: string;
}

const LEVEL_MAP: Record<string, number> = {
  Beginner: 25, Novice: 30,
  Elementary: 35, Basic: 40,
  Intermediate: 55, Proficient: 65,
  Advanced: 75, Expert: 85,
  Master: 95, Native: 100, Fluent: 90, Professional: 70,
};

function levelToPercent(level: string): number {
  const clean = (level || '').trim();
  const direct = LEVEL_MAP[clean];
  if (direct) return direct;
  const num = parseInt(clean);
  if (!isNaN(num) && num >= 0 && num <= 100) return num;
  return 70; // Reasonable default
}

function escapeHtml(str: string): string {
  if (!str) return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function formatSummary(text: string): string {
  if (!text) return '';
  // Convert line breaks to paragraphs, preserve bullet lists
  const lines = text.split('\n').filter(l => l.trim());
  if (lines.length <= 1) return escapeHtml(text);
  return lines.map(line => {
    const trimmed = line.trim();
    if (trimmed.startsWith('•') || trimmed.startsWith('-') || trimmed.startsWith('*')) {
      return `<li style="margin-bottom:3px;">${escapeHtml(trimmed.replace(/^[•\-\*]\s*/, ''))}</li>`;
    }
    return `<span>${escapeHtml(trimmed)}</span>`;
  }).join('\n');
}

export default function HtmlTemplate({ html, css }: HtmlTemplateProps) {
  const { data, theme, hiddenSections } = useResumeStore();
  const [processedHtml, setProcessedHtml] = useState('');

  useEffect(() => {
    let result = html;

    // ── Core replacements ──────────────────────────────
    const initials = (data.basics.name || 'RF')
      .split(' ').map(n => n[0] || '').join('').toUpperCase().slice(0, 2);

    // ── Build profileImage HTML ─────────────────────────
    // Use an <img> element (more reliable than background-image)
    // wrapped in a div that carries the class for template CSS
    const profileImgHtml = data.basics.image
      ? `<div class="profile-img" style="
            background-image:url('${data.basics.image}');
            background-size:cover;
            background-position:center;
            overflow:hidden;
          "><img src="${data.basics.image}" alt="${escapeHtml(data.basics.name)}" style="width:100%;height:100%;object-fit:cover;display:block;" /></div>`
      : `<div class="profile-img fallback" style="
            display:flex;
            align-items:center;
            justify-content:center;
            background:var(--primary-color);
            color:#fff;
            font-size:2em;
            font-weight:800;
            letter-spacing:-1px;
          ">${initials}</div>`;

    const replacements: Record<string, string> = {
      '{{name}}': escapeHtml(data.basics.name) || 'Your Name',
      '{{email}}': escapeHtml(data.basics.email) || 'email@example.com',
      '{{phone}}': escapeHtml(data.basics.phone) || '',
      '{{location}}': escapeHtml(data.basics.location) || '',
      '{{website}}': escapeHtml(data.basics.website) || '',
      '{{summary}}': escapeHtml(data.basics.summary) || '',
      '{{image}}': data.basics.image || '',
      '{{initials}}': initials,
      '{{profileImage}}': profileImgHtml,
    };

    Object.entries(replacements).forEach(([key, value]) => {
      result = result.replace(new RegExp(key.replace(/[{}]/g, '\\$&'), 'g'), value);
    });

    // ── Experience ─────────────────────────────────────
    const workHtml = (!hiddenSections.includes('work') && data.work.length > 0)
      ? data.work.map(job => {
          const bullets = (job.summary || '').split('\n')
            .map(l => l.trim()).filter(Boolean);
          const summaryHtml = bullets.length > 1
            ? `<ul style="margin:6px 0 0 16px;padding:0;list-style:disc;">${bullets.map(b =>
                `<li style="font-size:inherit;line-height:1.6;margin-bottom:3px;">${escapeHtml(b.replace(/^[•\-\*]\s*/, ''))}</li>`
              ).join('')}</ul>`
            : `<div class="summary">${escapeHtml(job.summary)}</div>`;
          return `
            <div class="work-card">
              <div class="card-side">
                <span class="dot"></span>
                <span class="line"></span>
              </div>
              <div class="card-main">
                <div class="card-header">
                  <h3 class="position">${escapeHtml(job.position)}</h3>
                  <span class="date">${escapeHtml(job.startDate)} — ${escapeHtml(job.endDate || 'Present')}</span>
                </div>
                <p class="company">${escapeHtml(job.company)}</p>
                ${summaryHtml}
              </div>
            </div>`;
        }).join('')
      : hiddenSections.includes('work') ? '' : '<p style="color:#999;font-size:13px;font-style:italic;">Add your work experience...</p>';

    result = result.replace(/{{experience}}/g, workHtml);

    // ── Education ──────────────────────────────────────
    const eduHtml = (!hiddenSections.includes('education') && data.education.length > 0)
      ? data.education.map(edu => `
          <div class="edu-card">
            <div class="edu-info">
              <h3 class="area">${escapeHtml(edu.area)}</h3>
              <p class="institution">${escapeHtml(edu.institution)}</p>
              ${edu.score ? `<span class="edu-score" style="font-size:11px;color:#888;">${escapeHtml(edu.score)}</span>` : ''}
            </div>
            <span class="edu-date">${escapeHtml(edu.startDate ? `${edu.startDate} – ` : '')}${escapeHtml(edu.endDate)}</span>
          </div>`)
        .join('')
      : hiddenSections.includes('education') ? '' : '<p style="color:#999;font-size:13px;font-style:italic;">Add your education...</p>';

    result = result.replace(/{{education}}/g, eduHtml);

    // ── Skills with accurate proficiency bars ──────────
    const skillsHtml = (!hiddenSections.includes('skills') && data.skills.length > 0)
      ? data.skills.map(s => {
          const pct = levelToPercent(s.level);
          return `
            <div class="skill-row">
              <div class="skill-meta">
                <span class="skill-name">${escapeHtml(s.name)}</span>
                <span class="skill-val">${escapeHtml(s.level)}</span>
              </div>
              <div class="skill-track">
                <div class="skill-fill" style="width:${pct}%"></div>
              </div>
            </div>`;
        }).join('')
      : hiddenSections.includes('skills') ? '' : '<p style="color:#999;font-size:13px;font-style:italic;">Add your skills...</p>';

    result = result.replace(/{{skills}}/g, skillsHtml);

    // ── Projects ───────────────────────────────────────
    const projectsHtml = (!hiddenSections.includes('projects') && data.projects.length > 0)
      ? data.projects.map(p => `
          <div class="project-card">
            <h4 class="project-name">${escapeHtml(p.name)}${p.link ? ` <a href="${escapeHtml(p.link)}" style="font-size:10px;color:inherit;opacity:.6;font-weight:400;margin-left:6px;">${escapeHtml(p.link)}</a>` : ''}</h4>
            <p class="project-desc">${escapeHtml(p.description)}</p>
            ${p.technologies ? `<div style="margin-top:6px;display:flex;flex-wrap:wrap;gap:4px;">${p.technologies.split(',').map(t => `<span style="font-size:10px;background:rgba(0,0,0,0.06);padding:2px 8px;border-radius:20px;">${escapeHtml(t.trim())}</span>`).join('')}</div>` : ''}
          </div>`)
        .join('')
      : '';

    result = result.replace(/{{projects}}/g, projectsHtml);

    // ── Languages ──────────────────────────────────────
    const languagesHtml = (!hiddenSections.includes('languages') && data.languages.length > 0)
      ? data.languages.map(l => {
          const pct = levelToPercent(l.fluency);
          return `
            <div class="skill-row">
              <div class="skill-meta">
                <span class="skill-name">${escapeHtml(l.language)}</span>
                <span class="skill-val">${escapeHtml(l.fluency)}</span>
              </div>
              <div class="skill-track">
                <div class="skill-fill" style="width:${pct}%"></div>
              </div>
            </div>`;
        }).join('')
      : '';

    result = result.replace(/{{languages}}/g, languagesHtml);

    // ── Certifications ─────────────────────────────────
    const certHtml = (!hiddenSections.includes('certifications') && data.certifications.length > 0)
      ? data.certifications.map(c => `
          <div class="edu-card" style="margin-bottom:12px;">
            <div class="edu-info">
              <h3 class="area" style="font-size:12.5px;">${escapeHtml(c.name)}</h3>
              <p class="institution">${escapeHtml(c.issuer)}</p>
            </div>
            <span class="edu-date">${escapeHtml(c.date)}</span>
          </div>`)
        .join('')
      : '';

    result = result.replace(/{{certifications}}/g, certHtml);

    setProcessedHtml(result);
  }, [html, data, hiddenSections]);

  // Inject Google Fonts dynamically
  useEffect(() => {
    if (!theme.fontFamily) return;
    const link = document.createElement('link');
    link.href = `https://fonts.googleapis.com/css2?family=${theme.fontFamily.replace(/\s+/g, '+')}:wght@300;400;500;600;700;900&display=swap`;
    link.rel = 'stylesheet';
    document.head.appendChild(link);
    return () => {
      document.head.removeChild(link);
    };
  }, [theme.fontFamily]);

  // Global CSS injected into every template to ensure .profile-img
  // always has explicit dimensions regardless of which template is active.
  const globalCss = `
    .profile-img {
      width: 100px;
      height: 100px;
      border-radius: var(--image-radius, 50%);
      overflow: hidden;
      flex-shrink: 0;
      background-size: cover;
      background-position: center;
      background-repeat: no-repeat;
    }
    .profile-img img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
    }
    .profile-img.fallback {
      display: flex;
      align-items: center;
      justify-content: center;
      background: var(--primary-color, #333);
      color: #fff;
      font-size: 2em;
      font-weight: 800;
    }
  `;

  return (
    <div 
      className="resume-renderer w-full h-full"
      style={{
        '--primary-color': theme.color,
        '--font-family': theme.fontFamily + ', sans-serif',
        '--base-font-size': `${theme.fontSize}px`,
        '--sidebar-width': `${theme.sidebarWidth}%`,
        '--image-radius': theme.imageShape === 'round' ? '50%' : theme.imageShape === 'rounded' ? '12px' : '0px',
        '--image-align': theme.imagePosition === 'left' ? 'flex-start' : theme.imagePosition === 'right' ? 'flex-end' : 'center',
        '--image-text-align': theme.imagePosition === 'left' ? 'left' : theme.imagePosition === 'right' ? 'right' : 'center',
        '--header-flex-dir': theme.imagePosition === 'right' ? 'row-reverse' : theme.imagePosition === 'center' ? 'column' : 'row',
        '--header-align-items': theme.imagePosition === 'center' ? 'center' : 'flex-start',
      } as React.CSSProperties}
    >
      {/* Global styles first, then template-specific overrides */}
      <style dangerouslySetInnerHTML={{ __html: globalCss + '\n' + css }} />
      <div dangerouslySetInnerHTML={{ __html: processedHtml }} />
    </div>
  );
}
