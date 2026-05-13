export const templates = {

  /* ─────────────── 1. GOOGLE DOCS "CORAL" ─────────────── */
  'google-coral': {
    name: 'Google Coral',
    category: 'Google Style',
    accent: '#E8453C',
    thumbnail: 'single-column',
    html: `
<div class="coral-page">
  <header class="coral-header">
    <h1 class="coral-name">{{name}}</h1>
    <div class="coral-contact-bar">
      <span>{{email}}</span><span class="coral-sep">•</span>
      <span>{{phone}}</span><span class="coral-sep">•</span>
      <span>{{location}}</span><span class="coral-sep">•</span>
      <span>{{website}}</span>
    </div>
  </header>

  <section class="coral-section">
    <div class="coral-rule"><span>PROFESSIONAL SUMMARY</span></div>
    <p class="coral-summary">{{summary}}</p>
  </section>

  <section class="coral-section">
    <div class="coral-rule"><span>EXPERIENCE</span></div>
    {{experience}}
  </section>

  <section class="coral-section">
    <div class="coral-rule"><span>EDUCATION</span></div>
    {{education}}
  </section>

  <section class="coral-section">
    <div class="coral-rule"><span>SKILLS</span></div>
    <div class="coral-skills-wrap">{{skills}}</div>
  </section>
</div>
`,
    css: `
.coral-page{font-family:var(--font-family);color:#202124;padding:48px 56px;background:#fff;min-height:1130px;line-height:1.55;font-size:var(--base-font-size);}
.coral-header{margin-bottom:28px;}
.coral-name{font-size:2.5em;font-weight:700;color:#202124;margin:0 0 10px;}
.coral-contact-bar{font-size:0.9em;color:#5f6368;display:flex;flex-wrap:wrap;gap:6px;align-items:center;}
.coral-sep{color:var(--primary-color);font-weight:700;}
.coral-rule{display:flex;align-items:center;gap:12px;margin:24px 0 14px;}
.coral-rule span{font-size:0.8em;font-weight:700;letter-spacing:2px;color:var(--primary-color);white-space:nowrap;}
.coral-rule::before{content:"";flex:0 0 0;border-top:2px solid var(--primary-color);}
.coral-rule::after{content:"";flex:1;border-top:1.5px solid #e8eaed;}
.coral-summary{font-size:0.95em;color:#3c4043;line-height:1.7;margin:0;}
.work-card{margin-bottom:22px;}
.card-side{display:none;}
.card-header{display:flex;justify-content:space-between;align-items:baseline;margin-bottom:2px;}
.position{font-size:1.1em;font-weight:700;color:#202124;}
.date{font-size:0.85em;color:#80868b;font-weight:500;}
.company{font-size:0.95em;font-weight:500;color:var(--primary-color);margin-bottom:6px;}
.summary{font-size:0.95em;color:#3c4043;line-height:1.65;}
.edu-card{display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:16px;}
.edu-info .area{font-size:1em;font-weight:700;color:#202124;}
.edu-info .institution{font-size:0.95em;color:#5f6368;margin-top:2px;}
.edu-date{font-size:0.85em;color:#80868b;}
.coral-skills-wrap{display:flex;flex-wrap:wrap;gap:8px;}
.skill-row{background:#f8f9fa;border:1.5px solid #e8eaed;border-radius:20px;padding:5px 14px;}
.skill-meta{font-size:0.9em;font-weight:500;color:#3c4043;}
.skill-track,.skill-fill,.skill-val{display:none;}
`
  },

  /* ─────────────── 2. GOOGLE DOCS "SERIF" ─────────────── */
  'google-serif': {
    name: 'Google Serif',
    category: 'Google Style',
    accent: '#1a73e8',
    thumbnail: 'single-column',
    html: `
<div class="serif-page">
  <header class="serif-header">
    <h1 class="serif-name">{{name}}</h1>
    <div class="serif-tagline">{{email}} &nbsp;|&nbsp; {{phone}} &nbsp;|&nbsp; {{location}}</div>
    <div class="serif-divider"></div>
  </header>

  <div class="serif-body">
    <div class="serif-main">
      <section>
        <h2 class="serif-h2">Summary</h2>
        <p class="serif-para">{{summary}}</p>
      </section>
      <section>
        <h2 class="serif-h2">Experience</h2>
        {{experience}}
      </section>
      <section>
        <h2 class="serif-h2">Projects</h2>
        {{projects}}
      </section>
    </div>
    <aside class="serif-side">
      <section>
        <h2 class="serif-side-h2">Education</h2>
        {{education}}
      </section>
      <section style="margin-top:28px;">
        <h2 class="serif-side-h2">Skills</h2>
        {{skills}}
      </section>
    </aside>
  </div>
</div>
`,
    css: `
.serif-page{font-family:var(--font-family);background:#fff;padding:48px 56px;min-height:1130px;color:#1c1c1e;font-size:var(--base-font-size);}
.serif-header{text-align:center;margin-bottom:28px;}
.serif-name{font-size:2.8em;font-weight:700;color:var(--primary-color);margin:0 0 10px;}
.serif-tagline{font-size:0.9em;color:#666;letter-spacing:.5px;}
.serif-divider{height:2.5px;background:linear-gradient(90deg,transparent,var(--primary-color),transparent);margin:18px 0 0;}
.serif-body{display:grid;grid-template-columns:1fr 240px;gap:36px;margin-top:28px;}
.serif-h2{font-size:1.2em;font-weight:700;color:var(--primary-color);border-bottom:1.5px solid #e8f0fe;padding-bottom:6px;margin:0 0 16px;}
.serif-side-h2{font-size:1.1em;font-weight:700;color:var(--primary-color);border-bottom:1.5px solid #e8f0fe;padding-bottom:4px;margin:0 0 14px;}
.serif-para{font-size:0.95em;line-height:1.7;color:#444;}
.card-side{display:none;}
.work-card{margin-bottom:20px;}
.card-header{display:flex;justify-content:space-between;align-items:baseline;}
.position{font-size:1em;font-weight:600;color:#1c1c1e;}
.date{font-size:0.85em;color:#888;}
.company{font-size:0.9em;color:var(--primary-color);font-weight:500;margin:2px 0 7px;}
.summary{font-size:0.95em;color:#444;line-height:1.6;}
.edu-card{margin-bottom:14px;}
.edu-info .area{font-size:0.95em;font-weight:600;color:#1c1c1e;}
.edu-info .institution{font-size:0.9em;color:#666;margin-top:2px;}
.edu-date{font-size:0.85em;color:#888;display:block;margin-top:3px;}
.skill-row{margin-bottom:10px;}
.skill-meta{display:flex;justify-content:space-between;font-size:0.85em;font-weight:500;margin-bottom:4px;color:#333;}
.skill-track{height:4px;background:#e8f0fe;border-radius:4px;}
.skill-fill{height:100%;background:var(--primary-color);border-radius:4px;}
.skill-val{color:#888;}
.project-card{margin-bottom:16px;}
.project-name{font-size:1em;font-weight:600;color:#1c1c1e;margin-bottom:4px;}
.project-desc{font-size:0.9em;color:#555;line-height:1.55;}
`
  },

  /* ─────────────── 3. CANVA "MODERN NAVY" ─────────────── */
  'canva-modern-navy': {
    name: 'Canva Modern Navy',
    category: 'Canva Style',
    accent: '#0d1b2a',
    thumbnail: 'two-column',
    html: `
<div class="navy-wrap">
  <div class="navy-sidebar">
    <div class="navy-avatar">{{initials}}</div>
    <h1 class="navy-name">{{name}}</h1>
    <p class="navy-role">PROFESSIONAL</p>

    <div class="navy-block">
      <h3 class="navy-block-title">CONTACT</h3>
      <div class="navy-info-item"><span class="navy-icon">✉</span><span>{{email}}</span></div>
      <div class="navy-info-item"><span class="navy-icon">✆</span><span>{{phone}}</span></div>
      <div class="navy-info-item"><span class="navy-icon">⚑</span><span>{{location}}</span></div>
      <div class="navy-info-item"><span class="navy-icon">🔗</span><span>{{website}}</span></div>
    </div>

    <div class="navy-block">
      <h3 class="navy-block-title">SKILLS</h3>
      {{skills}}
    </div>

    <div class="navy-block">
      <h3 class="navy-block-title">EDUCATION</h3>
      {{education}}
    </div>
  </div>

  <div class="navy-main">
    <section class="navy-section">
      <h2 class="navy-section-title">About Me</h2>
      <div class="navy-accent-bar"></div>
      <p class="navy-about">{{summary}}</p>
    </section>

    <section class="navy-section">
      <h2 class="navy-section-title">Work Experience</h2>
      <div class="navy-accent-bar"></div>
      {{experience}}
    </section>

    <section class="navy-section">
      <h2 class="navy-section-title">Projects</h2>
      <div class="navy-accent-bar"></div>
      <div class="navy-project-grid">{{projects}}</div>
    </section>
  </div>
</div>
`,
    css: `
.navy-wrap{display:grid;grid-template-columns:var(--sidebar-width) 1fr;min-height:1130px;font-family:var(--font-family);background:#fff;font-size:var(--base-font-size);}
.navy-sidebar{background:var(--primary-color);color:#fff;padding:44px 28px;display:flex;flex-direction:column;align-items:center;text-align:center;}
.navy-avatar{width:80px;height:80px;border-radius:50%;background:rgba(255,255,255,0.1);display:flex;align-items:center;justify-content:center;font-size:2em;font-weight:900;color:#fff;margin-bottom:18px;border:2px solid rgba(255,255,255,0.3);}
.navy-name{font-size:1.4em;font-weight:700;margin:0 0 4px;line-height:1.2;color:#fff;}
.navy-role{font-size:0.7em;letter-spacing:3px;color:rgba(255,255,255,0.7);margin:0 0 28px;}
.navy-block{width:100%;text-align:left;margin-bottom:26px;}
.navy-block-title{font-size:0.75em;font-weight:700;letter-spacing:3px;color:rgba(255,255,255,0.9);border-bottom:1px solid rgba(255,255,255,0.2);padding-bottom:8px;margin:0 0 14px;}
.navy-info-item{display:flex;align-items:flex-start;gap:10px;font-size:0.85em;color:rgba(255,255,255,0.8);margin-bottom:10px;word-break:break-all;}
.navy-icon{color:#fff;flex-shrink:0;font-size:0.9em;}
.skill-row{margin-bottom:12px;}
.skill-meta{display:flex;justify-content:space-between;font-size:0.8em;font-weight:600;color:#fff;margin-bottom:5px;}
.skill-track{height:3px;background:rgba(255,255,255,0.1);border-radius:3px;}
.skill-fill{height:100%;background:#fff;border-radius:3px;}
.skill-val{color:rgba(255,255,255,0.6);font-size:0.9em;}
.edu-card{margin-bottom:14px;}
.edu-info .area{font-size:0.9em;font-weight:600;color:#fff;}
.edu-info .institution{font-size:0.85em;color:rgba(255,255,255,0.6);margin-top:2px;}
.edu-date{font-size:0.8em;color:rgba(255,255,255,0.4);display:block;margin-top:3px;}
.navy-main{padding:44px 40px;}
.navy-section{margin-bottom:32px;}
.navy-section-title{font-size:1.3em;font-weight:700;color:var(--primary-color);margin:0 0 6px;}
.navy-accent-bar{height:3px;width:40px;background:var(--primary-color);border-radius:2px;margin-bottom:18px;}
.navy-about{font-size:0.95em;color:#455a64;line-height:1.75;}
.card-side{display:none;}
.work-card{margin-bottom:22px;}
.card-header{display:flex;justify-content:space-between;align-items:baseline;margin-bottom:4px;}
.position{font-size:1.1em;font-weight:700;color:#0d1b2a;}
.company{font-size:0.9em;font-weight:600;color:var(--primary-color);margin-bottom:6px;}
.date{font-size:0.85em;color:#90a4ae;font-weight:600;}
.summary{font-size:0.95em;color:#546e7a;line-height:1.65;}
.navy-project-grid{display:grid;grid-template-columns:1fr 1fr;gap:14px;}
.project-card{background:#f8f9fa;border-left:3px solid var(--primary-color);padding:14px;border-radius:6px;}
.project-name{font-size:1em;font-weight:700;color:#0d1b2a;margin-bottom:4px;}
.project-desc{font-size:0.9em;color:#546e7a;line-height:1.5;}
`
  },

  /* ─────────────── 4. CANVA "ROSE GOLD EXECUTIVE" ─────────────── */
  'canva-rose-executive': {
    name: 'Canva Rose Executive',
    category: 'Canva Style',
    accent: '#b76e79',
    thumbnail: 'two-column',
    html: `
<div class="rose-wrap">
  <div class="rose-top">
    <div class="rose-top-left">
      <h1 class="rose-name">{{name}}</h1>
      <p class="rose-subtitle">SENIOR PROFESSIONAL</p>
    </div>
    <div class="rose-top-right">
      <div class="rose-contact-pill">{{email}}</div>
      <div class="rose-contact-pill">{{phone}}</div>
      <div class="rose-contact-pill">{{location}}</div>
    </div>
  </div>

  <div class="rose-body">
    <div class="rose-sidebar">
      <div class="rose-avatar-circle">{{initials}}</div>

      <div class="rose-side-block">
        <h3 class="rose-side-title">SKILLS</h3>
        {{skills}}
      </div>

      <div class="rose-side-block">
        <h3 class="rose-side-title">EDUCATION</h3>
        {{education}}
      </div>

      <div class="rose-side-block">
        <h3 class="rose-side-title">WEBSITE</h3>
        <p class="rose-link">{{website}}</p>
      </div>
    </div>

    <div class="rose-content">
      <section class="rose-section">
        <h2 class="rose-section-h2">Profile</h2>
        <p class="rose-profile-text">{{summary}}</p>
      </section>

      <section class="rose-section">
        <h2 class="rose-section-h2">Experience</h2>
        {{experience}}
      </section>

      <section class="rose-section">
        <h2 class="rose-section-h2">Signature Projects</h2>
        {{projects}}
      </section>
    </div>
  </div>
</div>
`,
    css: `
.rose-wrap{font-family:var(--font-family);background:#fff;min-height:1130px;color:#2d2d2d;font-size:var(--base-font-size);}
.rose-top{background:var(--primary-color);padding:36px 48px;display:flex;justify-content:space-between;align-items:center;}
.rose-name{font-size:2.8em;font-weight:700;color:#fff;margin:0;line-height:1;}
.rose-subtitle{font-size:0.75em;letter-spacing:4px;color:rgba(255,255,255,0.7);margin:8px 0 0;font-weight:500;}
.rose-top-right{display:flex;flex-direction:column;align-items:flex-end;gap:8px;}
.rose-contact-pill{background:rgba(255,255,255,0.15);backdrop-filter:blur(4px);color:#fff;font-size:0.85em;padding:5px 14px;border-radius:20px;border:1px solid rgba(255,255,255,0.3);}
.rose-body{display:grid;grid-template-columns:var(--sidebar-width) 1fr;}
.rose-sidebar{background:#fdf6f7;padding:36px 28px;border-right:1px solid #f0e0e2;}
.rose-avatar-circle{width:80px;height:80px;border-radius:50%;background:var(--primary-color);display:flex;align-items:center;justify-content:center;font-size:2em;font-weight:700;color:#fff;margin:0 auto 28px;box-shadow:0 6px 20px rgba(0,0,0,0.1);}
.rose-side-block{margin-bottom:28px;}
.rose-side-title{font-size:0.75em;font-weight:700;letter-spacing:3px;color:var(--primary-color);border-bottom:1px solid #f0e0e2;padding-bottom:8px;margin:0 0 14px;}
.skill-row{margin-bottom:12px;}
.skill-meta{display:flex;justify-content:space-between;font-size:0.85em;font-weight:600;color:#555;margin-bottom:5px;}
.skill-track{height:3px;background:#f0e0e2;border-radius:3px;}
.skill-fill{height:100%;background:var(--primary-color);border-radius:3px;}
.skill-val{color:var(--primary-color);}
.edu-card{margin-bottom:14px;}
.edu-info .area{font-size:0.9em;font-weight:600;color:#2d2d2d;}
.edu-info .institution{font-size:0.85em;color:#888;margin-top:2px;}
.edu-date{font-size:0.8em;color:#aaa;display:block;margin-top:3px;}
.rose-link{font-size:0.85em;color:var(--primary-color);word-break:break-all;}
.rose-content{padding:36px 40px;}
.rose-section{margin-bottom:30px;}
.rose-section-h2{font-size:1.5em;font-weight:700;color:var(--primary-color);margin:0 0 4px;border-bottom:2px solid #f0e0e2;padding-bottom:8px;}
.rose-profile-text{font-size:0.95em;color:#555;line-height:1.75;}
.card-side{display:none;}
.work-card{margin-bottom:22px;padding-left:14px;border-left:3px solid #f0e0e2;position:relative;}
.work-card::before{content:'';position:absolute;left:-6px;top:5px;width:9px;height:9px;background:var(--primary-color);border-radius:50%;}
.card-header{display:flex;justify-content:space-between;align-items:baseline;}
.position{font-size:1.1em;font-weight:700;color:#2d2d2d;}
.date{font-size:0.85em;color:#aaa;font-weight:500;}
.company{font-size:1em;color:var(--primary-color);font-weight:600;margin:3px 0 7px;}
.summary{font-size:0.95em;color:#555;line-height:1.65;}
.project-card{margin-bottom:16px;padding:14px;background:#fdf6f7;border-radius:8px;border-left:3px solid var(--primary-color);}
.project-name{font-size:1em;font-weight:700;color:#2d2d2d;margin-bottom:4px;}
.project-desc{font-size:0.9em;color:#666;line-height:1.55;}
`
  },

  /* ─────────────── 5. CANVA "MINIMAL SLATE" ─────────────── */
  'canva-minimal-slate': {
    name: 'Canva Minimal Slate',
    category: 'Canva Style',
    accent: '#334155',
    thumbnail: 'single-column',
    html: `
<div class="slate-page">
  <header class="slate-header">
    <div class="slate-header-left">
      <div class="slate-monogram">{{initials}}</div>
    </div>
    <div class="slate-header-right">
      <h1 class="slate-name">{{name}}</h1>
      <div class="slate-contacts">
        <span>{{email}}</span>
        <span class="slate-dot"></span>
        <span>{{phone}}</span>
        <span class="slate-dot"></span>
        <span>{{location}}</span>
      </div>
    </div>
  </header>

  <div class="slate-divider"></div>

  <div class="slate-grid">
    <div class="slate-left">
      <section class="slate-sec">
        <h2 class="slate-h2">Summary</h2>
        <p class="slate-text">{{summary}}</p>
      </section>

      <section class="slate-sec">
        <h2 class="slate-h2">Experience</h2>
        {{experience}}
      </section>
    </div>

    <div class="slate-right">
      <section class="slate-sec">
        <h2 class="slate-h2">Skills</h2>
        {{skills}}
      </section>

      <section class="slate-sec">
        <h2 class="slate-h2">Education</h2>
        {{education}}
      </section>

      <section class="slate-sec">
        <h2 class="slate-h2">Projects</h2>
        {{projects}}
      </section>
    </div>
  </div>
</div>
`,
    css: `
.slate-page{font-family:var(--font-family);background:#fff;min-height:1130px;color:#1e293b;padding:0;font-size:var(--base-font-size);}
.slate-header{display:flex;align-items:center;gap:20px;padding:36px 48px 28px;background:#f8fafc;}
.slate-monogram{width:70px;height:70px;border-radius:16px;background:var(--primary-color);color:#fff;font-size:2em;font-weight:900;display:flex;align-items:center;justify-content:center;flex-shrink:0;letter-spacing:-1px;}
.slate-name{font-size:2.4em;font-weight:800;color:#0f172a;margin:0 0 10px;letter-spacing:-0.5px;}
.slate-contacts{display:flex;align-items:center;flex-wrap:wrap;gap:8px;font-size:0.9em;color:#64748b;}
.slate-dot{width:4px;height:4px;background:#cbd5e1;border-radius:50%;display:inline-block;}
.slate-divider{height:4px;background:linear-gradient(90deg,var(--primary-color),#64748b,#cbd5e1);}
.slate-grid{display:grid;grid-template-columns:1fr var(--sidebar-width);gap:0;padding:36px 48px;}
.slate-left{padding-right:36px;border-right:1px solid #e2e8f0;}
.slate-right{padding-left:36px;}
.slate-sec{margin-bottom:28px;}
.slate-h2{font-size:0.75em;font-weight:800;letter-spacing:2.5px;color:var(--primary-color);text-transform:uppercase;border-bottom:2px solid var(--primary-color);padding-bottom:6px;margin:0 0 16px;}
.slate-text{font-size:0.95em;color:#475569;line-height:1.75;}
.card-side{display:none;}
.work-card{margin-bottom:22px;}
.card-header{display:flex;justify-content:space-between;align-items:baseline;margin-bottom:2px;}
.position{font-size:1.1em;font-weight:700;color:#0f172a;}
.date{font-size:0.85em;color:#94a3b8;font-weight:600;}
.company{font-size:0.95em;font-weight:600;color:var(--primary-color);margin-bottom:7px;}
.summary{font-size:0.95em;color:#475569;line-height:1.65;}
.skill-row{margin-bottom:10px;}
.skill-meta{display:flex;justify-content:space-between;font-size:0.85em;font-weight:600;color:var(--primary-color);margin-bottom:5px;}
.skill-track{height:3px;background:#e2e8f0;border-radius:3px;}
.skill-fill{height:100%;background:var(--primary-color);border-radius:3px;}
.skill-val{color:#94a3b8;font-size:0.85em;}
.edu-card{margin-bottom:14px;}
.edu-info .area{font-size:0.95em;font-weight:600;color:#0f172a;}
.edu-info .institution{font-size:0.9em;color:#64748b;margin-top:2px;}
.edu-date{font-size:0.85em;color:#94a3b8;display:block;margin-top:3px;}
.project-card{background:#f8fafc;border-radius:8px;padding:12px;margin-bottom:12px;border:1px solid #e2e8f0;}
.project-name{font-size:0.95em;font-weight:700;color:#0f172a;margin-bottom:4px;}
.project-desc{font-size:0.9em;color:#64748b;line-height:1.55;}
`
  },

  /* ─────────────── 6. ELITE EXECUTIVE ─────────────── */
  'elite-executive': {
    name: 'Elite Executive',
    category: 'Executive Style',
    accent: '#1e293b',
    thumbnail: 'single-column',
    html: `
<div class="elite-page">
  <div class="elite-accent-stripe"></div>
  <header class="elite-header">
    <h1 class="elite-name">{{name}}</h1>
    <p class="elite-summary-intro">{{summary}}</p>
    <div class="elite-contact-grid">
      <div class="elite-contact-item"><span>Email</span> {{email}}</div>
      <div class="elite-contact-item"><span>Phone</span> {{phone}}</div>
      <div class="elite-contact-item"><span>Location</span> {{location}}</div>
      <div class="elite-contact-item"><span>Network</span> {{website}}</div>
    </div>
  </header>

  <div class="elite-content">
    <section class="elite-section">
      <h2 class="elite-h2">Strategic Experience</h2>
      {{experience}}
    </section>

    <div class="elite-two-col">
      <div class="elite-left-col">
        <section class="elite-section">
          <h2 class="elite-h2">Key Projects</h2>
          {{projects}}
        </section>
      </div>
      <div class="elite-right-col">
        <section class="elite-section">
          <h2 class="elite-h2">Education</h2>
          {{education}}
        </section>
        <section class="elite-section">
          <h2 class="elite-h2">Expertise</h2>
          <div class="elite-skills-grid">{{skills}}</div>
        </section>
      </div>
    </div>
  </div>
</div>
`,
    css: `
.elite-page{font-family:var(--font-family);background:#fff;min-height:1130px;color:#334155;padding:60px;font-size:var(--base-font-size);position:relative;overflow:hidden;}
.elite-accent-stripe{position:absolute;top:0;left:0;right:0;height:8px;background:var(--primary-color);}
.elite-header{margin-bottom:48px;border-bottom:1px solid #f1f5f9;padding-bottom:32px;}
.elite-name{font-size:3em;font-weight:900;color:var(--primary-color);margin:0 0 16px;letter-spacing:-1.5px;text-transform:uppercase;}
.elite-summary-intro{font-size:1.1em;line-height:1.6;color:#64748b;max-width:90%;margin-bottom:24px;}
.elite-contact-grid{display:grid;grid-template-columns:repeat(2, 1fr);gap:12px;}
.elite-contact-item{font-size:0.85em;color:#94a3b8;display:flex;gap:12px;}
.elite-contact-item span{font-weight:700;color:var(--primary-color);text-transform:uppercase;width:60px;}
.elite-h2{font-size:1.2em;font-weight:900;color:var(--primary-color);text-transform:uppercase;letter-spacing:2px;margin:0 0 24px;display:flex;align-items:center;gap:16px;}
.elite-h2::after{content:"";flex:1;height:1px;background:#f1f5f9;}
.elite-section{margin-bottom:40px;}
.work-card{margin-bottom:28px;}
.card-header{display:flex;justify-content:space-between;align-items:baseline;margin-bottom:4px;}
.position{font-size:1.2em;font-weight:800;color:#1e293b;}
.date{font-size:0.85em;color:#94a3b8;font-weight:600;}
.company{font-size:1em;font-weight:600;color:var(--primary-color);margin-bottom:12px;}
.summary{font-size:0.95em;color:#475569;line-height:1.7;}
.elite-two-col{display:grid;grid-template-columns:1fr 280px;gap:48px;}
.edu-card{margin-bottom:20px;}
.edu-info .area{font-size:1em;font-weight:700;color:#1e293b;}
.edu-info .institution{font-size:0.9em;color:#64748b;margin-top:4px;}
.edu-date{font-size:0.85em;color:#94a3b8;display:block;margin-top:4px;}
.elite-skills-grid{display:flex;flex-wrap:wrap;gap:8px;}
.skill-row{background:var(--primary-color);color:#fff;padding:6px 14px;border-radius:4px;font-size:0.8em;font-weight:600;}
.skill-track,.skill-fill,.skill-val{display:none;}
.project-card{margin-bottom:20px;padding:16px;background:#f8fafc;border-radius:12px;}
.project-name{font-size:1.05em;font-weight:800;color:#1e293b;margin-bottom:8px;}
.project-desc{font-size:0.9em;color:#64748b;line-height:1.6;}
`
  },

  /* ─────────────── 7. CREATIVE EDGE ─────────────── */
  'creative-edge': {
    name: 'Creative Edge',
    category: 'Creative Style',
    accent: '#f43f5e',
    thumbnail: 'two-column',
    html: `
<div class="creative-wrap">
  <div class="creative-sidebar">
    <div class="creative-circle"></div>
    <div class="creative-initials">{{initials}}</div>
    <div class="creative-side-content">
      <section class="creative-side-sec">
        <h3>CONTACT</h3>
        <p>{{email}}</p>
        <p>{{phone}}</p>
        <p>{{location}}</p>
      </section>
      <section class="creative-side-sec">
        <h3>EDUCATION</h3>
        {{education}}
      </section>
      <section class="creative-side-sec">
        <h3>SKILLS</h3>
        {{skills}}
      </section>
    </div>
  </div>
  <div class="creative-main">
    <header class="creative-header">
      <h1 class="creative-name">{{name}}</h1>
      <div class="creative-bar"></div>
      <p class="creative-summary">{{summary}}</p>
    </header>

    <section class="creative-main-sec">
      <h2 class="creative-h2">THE JOURNEY</h2>
      {{experience}}
    </section>

    <section class="creative-main-sec">
      <h2 class="creative-h2">PROJECT SHOWCASE</h2>
      <div class="creative-projects">{{projects}}</div>
    </section>
  </div>
</div>
`,
    css: `
.creative-wrap{display:grid;grid-template-columns:var(--sidebar-width) 1fr;min-height:1130px;font-family:var(--font-family);background:#fff;font-size:var(--base-font-size);}
.creative-sidebar{background:#0f172a;color:#fff;padding:60px 32px;position:relative;overflow:hidden;}
.creative-circle{position:absolute;top:-100px;left:-100px;width:300px;height:300px;background:var(--primary-color);border-radius:50%;opacity:0.1;}
.creative-initials{font-size:4em;font-weight:900;color:var(--primary-color);margin-bottom:48px;position:relative;}
.creative-side-sec{margin-bottom:40px;}
.creative-side-sec h3{font-size:0.8em;letter-spacing:4px;color:var(--primary-color);margin-bottom:16px;font-weight:800;}
.creative-side-sec p{font-size:0.9em;color:rgba(255,255,255,0.7);margin-bottom:8px;}
.creative-main{padding:60px 48px;}
.creative-name{font-size:3.5em;font-weight:900;color:#0f172a;margin:0;line-height:1;}
.creative-bar{height:6px;width:80px;background:var(--primary-color);margin:24px 0;}
.creative-summary{font-size:1.1em;line-height:1.7;color:#334155;margin-bottom:48px;}
.creative-h2{font-size:1.2em;font-weight:900;color:var(--primary-color);margin-bottom:32px;letter-spacing:3px;}
.work-card{margin-bottom:32px;position:relative;padding-left:24px;border-left:2px solid #f1f5f9;}
.position{font-size:1.2em;font-weight:800;color:#0f172a;}
.company{font-size:1em;font-weight:600;color:var(--primary-color);margin:4px 0 12px;}
.date{font-size:0.85em;color:#94a3b8;margin-bottom:8px;display:block;}
.summary{font-size:0.95em;color:#475569;line-height:1.7;}
.creative-projects{display:grid;grid-template-columns:1fr 1fr;gap:20px;}
.project-card{padding:20px;background:#f8fafc;border-radius:2px;border-top:4px solid var(--primary-color);}
.project-name{font-size:1.1em;font-weight:800;color:#0f172a;margin-bottom:8px;}
.project-desc{font-size:0.9em;color:#64748b;line-height:1.6;}
.skill-row{margin-bottom:16px;}
.skill-meta{display:flex;justify-content:space-between;font-size:0.85em;color:#fff;margin-bottom:6px;}
.skill-track{height:2px;background:rgba(255,255,255,0.1);}
.skill-fill{height:100%;background:var(--primary-color);}
.edu-card{margin-bottom:20px;}
.area{font-size:1em;font-weight:700;color:#fff;}
.institution{font-size:0.9em;color:rgba(255,255,255,0.5);}
`
  },

  /* ─────────────── 8. SILICON VALLEY ─────────────── */
  'silicon-valley': {
    name: 'Silicon Valley',
    category: 'Tech Style',
    accent: '#06b6d4',
    thumbnail: 'single-column',
    html: `
<div class="sv-page">
  <div class="sv-header">
    <div class="sv-header-main">
      <h1 class="sv-name">{{name}}</h1>
      <p class="sv-title">Software Engineer & Technologist</p>
    </div>
    <div class="sv-header-side">
      <div class="sv-meta"><span>GITHUB</span> {{website}}</div>
      <div class="sv-meta"><span>EMAIL</span> {{email}}</div>
      <div class="sv-meta"><span>LOC</span> {{location}}</div>
    </div>
  </div>

  <div class="sv-divider"></div>

  <div class="sv-grid">
    <div class="sv-main">
      <section class="sv-section">
        <h2 class="sv-h2">01. PROFILE</h2>
        <p class="sv-summary">{{summary}}</p>
      </section>
      <section class="sv-section">
        <h2 class="sv-h2">02. EXPERIENCE</h2>
        {{experience}}
      </section>
    </div>
    <div class="sv-side">
      <section class="sv-section">
        <h2 class="sv-h2">03. STACK</h2>
        <div class="sv-skill-cloud">{{skills}}</div>
      </section>
      <section class="sv-section">
        <h2 class="sv-h2">04. EDUCATION</h2>
        {{education}}
      </section>
      <section class="sv-section">
        <h2 class="sv-h2">05. PROJECTS</h2>
        {{projects}}
      </section>
    </div>
  </div>
</div>
`,
    css: `
.sv-page{font-family:var(--font-family);background:#fff;min-height:1130px;color:#0f172a;padding:48px;font-size:var(--base-font-size);}
.sv-header{display:flex;justify-content:space-between;align-items:flex-end;margin-bottom:32px;}
.sv-name{font-size:3em;font-weight:900;letter-spacing:-2px;color:#0f172a;margin:0;}
.sv-title{font-size:1.1em;color:var(--primary-color);font-weight:600;margin-top:4px;}
.sv-header-side{text-align:right;}
.sv-meta{font-size:0.75em;color:#64748b;font-weight:700;margin-bottom:4px;display:flex;justify-content:flex-end;gap:8px;}
.sv-meta span{color:var(--primary-color);}
.sv-divider{height:1px;background:#e2e8f0;margin-bottom:40px;}
.sv-grid{display:grid;grid-template-columns:1fr 280px;gap:48px;}
.sv-h2{font-size:0.85em;font-weight:900;color:var(--primary-color);letter-spacing:2px;margin-bottom:24px;}
.sv-summary{font-size:1em;line-height:1.7;color:#475569;}
.sv-section{margin-bottom:48px;}
.work-card{margin-bottom:32px;}
.position{font-size:1.1em;font-weight:800;color:#0f172a;}
.company{font-size:1em;font-weight:600;color:var(--primary-color);margin:4px 0 8px;}
.date{font-size:0.85em;color:#94a3b8;}
.summary{font-size:0.95em;color:#475569;line-height:1.6;margin-top:12px;}
.sv-skill-cloud{display:flex;flex-wrap:wrap;gap:8px;}
.skill-row{background:#f1f5f9;border-radius:4px;padding:6px 12px;font-size:0.8em;font-weight:600;color:#475569;border:1px solid #e2e8f0;}
.skill-track,.skill-fill,.skill-val{display:none;}
.edu-card{margin-bottom:20px;}
.area{font-size:0.95em;font-weight:700;color:#0f172a;}
.institution{font-size:0.85em;color:#64748b;margin-top:2px;}
.project-card{margin-bottom:16px;padding-bottom:16px;border-bottom:1px solid #f1f5f9;}
.project-name{font-size:1em;font-weight:700;color:#0f172a;}
.project-desc{font-size:0.85em;color:#64748b;line-height:1.5;margin-top:4px;}
`
  },

  /* ─────────────── 9. STANDARD PROFESSIONAL ─────────────── */
  'standard-pro': {
    name: 'Standard Professional',
    category: 'Corporate Style',
    accent: '#27272a',
    thumbnail: 'single-column',
    html: `
<div class="std-page">
  <header class="std-header">
    <h1 class="std-name">{{name}}</h1>
    <div class="std-contact">
      {{email}} | {{phone}} | {{location}} | {{website}}
    </div>
  </header>

  <div class="std-section">
    <h2 class="std-h2">PROFESSIONAL SUMMARY</h2>
    <p class="std-summary">{{summary}}</p>
  </div>

  <div class="std-section">
    <h2 class="std-h2">EXPERIENCE</h2>
    {{experience}}
  </div>

  <div class="std-section">
    <h2 class="std-h2">EDUCATION</h2>
    {{education}}
  </div>

  <div class="std-section">
    <h2 class="std-h2">SKILLS & EXPERTISE</h2>
    <div class="std-skills">{{skills}}</div>
  </div>

  <div class="std-section">
    <h2 class="std-h2">PROJECTS</h2>
    {{projects}}
  </div>
</div>
`,
    css: `
.std-page{font-family:var(--font-family);background:#fff;min-height:1130px;color:#27272a;padding:56px 64px;font-size:var(--base-font-size);line-height:1.5;}
.std-header{text-align:center;margin-bottom:32px;border-bottom:2px solid var(--primary-color);padding-bottom:16px;}
.std-name{font-size:2.2em;font-weight:800;color:var(--primary-color);margin-bottom:8px;text-transform:uppercase;letter-spacing:1px;}
.std-contact{font-size:0.9em;color:#52525b;}
.std-section{margin-bottom:24px;}
.std-h2{font-size:1.1em;font-weight:800;color:var(--primary-color);border-bottom:1px solid #e4e4e7;padding-bottom:4px;margin-bottom:12px;text-transform:uppercase;letter-spacing:1px;}
.std-summary{font-size:1em;color:#3f3f46;text-align:justify;}
.work-card{margin-bottom:18px;}
.card-header{display:flex;justify-content:space-between;align-items:baseline;}
.position{font-size:1.05em;font-weight:700;color:#18181b;}
.company{font-size:1em;font-weight:600;color:var(--primary-color);}
.date{font-size:0.9em;color:#71717a;font-weight:500;}
.summary{font-size:0.95em;color:#3f3f46;margin-top:6px;}
.edu-card{display:flex;justify-content:space-between;margin-bottom:12px;}
.area{font-weight:700;color:#18181b;}
.institution{color:#52525b;}
.std-skills{display:flex;flex-wrap:wrap;gap:x;column-gap:24px;row-gap:8px;}
.skill-row{font-size:0.95em;color:#3f3f46;font-weight:500;}
.skill-track,.skill-fill,.skill-val{display:none;}
.project-card{margin-bottom:14px;}
.project-name{font-size:1em;font-weight:700;color:#18181b;}
.project-desc{font-size:0.9em;color:#52525b;margin-top:2px;}
`
  },

  /* ─────────────── 10. DYNAMIC DUO ─────────────── */
  'dynamic-duo': {
    name: 'Dynamic Duo',
    category: 'Modern Style',
    accent: '#4f46e5',
    thumbnail: 'two-column',
    html: `
<div class="duo-page">
  <div class="duo-sidebar">
    <div class="duo-profile">
      <div class="duo-avatar">{{initials}}</div>
      <h1 class="duo-name">{{name}}</h1>
      <p class="duo-role">Impact Driver</p>
    </div>
    
    <div class="duo-side-content">
      <section class="duo-side-section">
        <h2 class="duo-side-h2">Contact</h2>
        <div class="duo-contact-item"><span>Email</span> {{email}}</div>
        <div class="duo-contact-item"><span>Phone</span> {{phone}}</div>
        <div class="duo-contact-item"><span>Site</span> {{website}}</div>
      </section>

      <section class="duo-side-section">
        <h2 class="duo-side-h2">Mastery</h2>
        {{skills}}
      </section>

      <section class="duo-side-section">
        <h2 class="duo-side-h2">Education</h2>
        {{education}}
      </section>
    </div>
  </div>
  <div class="duo-main">
    <section class="duo-section">
      <h2 class="duo-h2">Introduction</h2>
      <p class="duo-summary">{{summary}}</p>
    </section>

    <section class="duo-section">
      <h2 class="duo-h2">Professional History</h2>
      {{experience}}
    </section>

    <section class="duo-section">
      <h2 class="duo-h2">Noteworthy Projects</h2>
      {{projects}}
    </section>
  </div>
</div>
`,
    css: `
.duo-page{display:grid;grid-template-columns:var(--sidebar-width) 1fr;min-height:1130px;font-family:var(--font-family);background:#fff;font-size:var(--base-font-size);}
.duo-sidebar{background:#f8fafc;padding:60px 32px;border-right:1px solid #e2e8f0;}
.duo-avatar{width:72px;height:72px;background:var(--primary-color);color:#fff;border-radius:24px;display:flex;align-items:center;justify-content:center;font-size:1.8em;font-weight:900;margin-bottom:24px;box-shadow:0 10px 20px rgba(0,0,0,0.05);}
.duo-name{font-size:1.8em;font-weight:900;color:#0f172a;line-height:1.1;margin-bottom:8px;}
.duo-role{font-size:0.9em;color:var(--primary-color);font-weight:700;text-transform:uppercase;letter-spacing:1px;}
.duo-side-content{margin-top:48px;}
.duo-side-section{margin-bottom:40px;}
.duo-side-h2{font-size:0.75em;font-weight:800;text-transform:uppercase;letter-spacing:2px;color:#94a3b8;margin-bottom:20px;}
.duo-contact-item{font-size:0.85em;color:#475569;margin-bottom:12px;display:flex;flex-direction:column;}
.duo-contact-item span{font-weight:700;color:var(--primary-color);font-size:0.8em;text-transform:uppercase;}
.duo-main{padding:60px 48px;}
.duo-section{margin-bottom:48px;}
.duo-h2{font-size:1.3em;font-weight:900;color:#0f172a;margin-bottom:24px;display:flex;align-items:center;gap:16px;}
.duo-h2::after{content:"";flex:1;height:4px;background:var(--primary-color);border-radius:2px;opacity:0.1;}
.duo-summary{font-size:1.05em;line-height:1.7;color:#334155;}
.work-card{margin-bottom:32px;}
.position{font-size:1.15em;font-weight:800;color:#0f172a;}
.company{font-size:1em;font-weight:600;color:var(--primary-color);margin:4px 0 12px;}
.date{font-size:0.85em;color:#94a3b8;font-weight:600;}
.summary{font-size:0.95em;color:#475569;line-height:1.65;}
.skill-row{margin-bottom:16px;}
.skill-meta{display:flex;justify-content:space-between;font-size:0.85em;font-weight:700;color:#334155;margin-bottom:6px;}
.skill-track{height:4px;background:#e2e8f0;border-radius:2px;}
.skill-fill{height:100%;background:var(--primary-color);border-radius:2px;}
.project-card{margin-bottom:20px;padding:20px;background:#fff;border:1px solid #f1f5f9;border-radius:12px;box-shadow:0 4px 6px rgba(0,0,0,0.02);}
.project-name{font-size:1em;font-weight:800;color:#0f172a;}
`
  },

  'midnight-pro': {
    name: 'Midnight Pro',
    category: 'Executive Style',
    accent: '#6366f1',
    thumbnail: 'two-column',
    html: `<div class="mp-page"><div class="mp-sidebar"><div class="mp-avatar">{{initials}}</div><h1 class="mp-name">{{name}}</h1><div class="mp-divider"></div><div class="mp-block"><h3 class="mp-block-h">Contact</h3><p class="mp-info">{{email}}</p><p class="mp-info">{{phone}}</p><p class="mp-info">{{location}}</p><p class="mp-info">{{website}}</p></div><div class="mp-block"><h3 class="mp-block-h">Skills</h3>{{skills}}</div><div class="mp-block"><h3 class="mp-block-h">Education</h3>{{education}}</div></div><div class="mp-main"><div class="mp-top-bar"></div><section class="mp-section"><h2 class="mp-h2">Profile</h2><p class="mp-body">{{summary}}</p></section><section class="mp-section"><h2 class="mp-h2">Experience</h2>{{experience}}</section><section class="mp-section"><h2 class="mp-h2">Projects</h2>{{projects}}</section></div></div>`,
    css: `.mp-page{display:grid;grid-template-columns:var(--sidebar-width) 1fr;font-family:var(--font-family);min-height:1130px;font-size:var(--base-font-size);}
.mp-sidebar{background:#0f0f1a;color:#fff;padding:48px 28px;}
.mp-avatar{width:72px;height:72px;border-radius:50%;background:var(--primary-color);color:#fff;font-size:2em;font-weight:900;display:flex;align-items:center;justify-content:center;margin-bottom:16px;}
.mp-name{font-size:1.4em;font-weight:800;color:#fff;margin:0 0 20px;}
.mp-divider{height:2px;background:var(--primary-color);margin-bottom:24px;opacity:0.4;}
.mp-block{margin-bottom:28px;}
.mp-block-h{font-size:0.7em;letter-spacing:3px;color:var(--primary-color);font-weight:800;margin-bottom:12px;text-transform:uppercase;}
.mp-info{font-size:0.85em;color:rgba(255,255,255,0.6);margin-bottom:8px;word-break:break-all;}
.mp-main{background:#fff;padding:0;}
.mp-top-bar{height:6px;background:var(--primary-color);}
.mp-section{padding:32px 40px 0;}
.mp-h2{font-size:1.1em;font-weight:800;color:var(--primary-color);border-bottom:2px solid var(--primary-color);padding-bottom:6px;margin:0 0 20px;opacity:0.9;}
.mp-body{font-size:0.95em;color:#334155;line-height:1.7;}
.skill-row{margin-bottom:10px;}
.skill-meta{display:flex;justify-content:space-between;font-size:0.8em;color:rgba(255,255,255,0.8);margin-bottom:4px;}
.skill-track{height:3px;background:rgba(255,255,255,0.1);border-radius:3px;}
.skill-fill{height:100%;background:var(--primary-color);border-radius:3px;}
.skill-val{display:none;}
.edu-card{margin-bottom:14px;}
.edu-info .area{font-size:0.9em;font-weight:700;color:#fff;}
.edu-info .institution{font-size:0.8em;color:rgba(255,255,255,0.5);}
.edu-date{font-size:0.75em;color:rgba(255,255,255,0.3);display:block;}
.work-card{margin-bottom:24px;}
.card-header{display:flex;justify-content:space-between;align-items:baseline;}
.position{font-size:1.05em;font-weight:700;color:#1e293b;}
.company{font-size:0.9em;font-weight:600;color:var(--primary-color);margin:3px 0 8px;}
.date{font-size:0.8em;color:#94a3b8;}
.summary{font-size:0.9em;color:#475569;line-height:1.6;}
.card-side{display:none;}
.project-card{margin-bottom:16px;padding:12px;background:#f8fafc;border-left:3px solid var(--primary-color);border-radius:0 8px 8px 0;}
.project-name{font-size:0.95em;font-weight:700;color:#1e293b;}
.project-desc{font-size:0.85em;color:#64748b;margin-top:4px;}`
  },

  'ivy-league': {
    name: 'Ivy League',
    category: 'Academic Style',
    accent: '#7c3aed',
    thumbnail: 'single-column',
    html: `<div class="ivy-page"><header class="ivy-header"><h1 class="ivy-name">{{name}}</h1><p class="ivy-contact">{{email}} &nbsp;·&nbsp; {{phone}} &nbsp;·&nbsp; {{location}} &nbsp;·&nbsp; {{website}}</p></header><div class="ivy-rule"></div><section class="ivy-sec"><h2 class="ivy-h2">Research & Profile</h2><p class="ivy-text">{{summary}}</p></section><section class="ivy-sec"><h2 class="ivy-h2">Academic & Professional Experience</h2>{{experience}}</section><section class="ivy-sec"><h2 class="ivy-h2">Education</h2>{{education}}</section><div class="ivy-two"><div><h2 class="ivy-h2">Publications & Projects</h2>{{projects}}</div><div><h2 class="ivy-h2">Competencies</h2>{{skills}}</div></div></div>`,
    css: `.ivy-page{font-family:var(--font-family);background:#fff;padding:56px 72px;color:#1a1a2e;font-size:var(--base-font-size);}
.ivy-header{text-align:center;margin-bottom:20px;}
.ivy-name{font-size:2.6em;font-weight:900;color:#1a1a2e;letter-spacing:-1px;margin:0 0 10px;}
.ivy-contact{font-size:0.85em;color:#666;letter-spacing:0.3px;}
.ivy-rule{border:none;border-top:3px double var(--primary-color);margin:0 0 28px;}
.ivy-sec{margin-bottom:28px;}
.ivy-h2{font-size:1em;font-weight:800;color:var(--primary-color);text-transform:uppercase;letter-spacing:2px;border-bottom:1px solid #ede9fe;padding-bottom:6px;margin:0 0 16px;}
.ivy-text{font-size:0.95em;color:#374151;line-height:1.75;}
.ivy-two{display:grid;grid-template-columns:1fr 1fr;gap:32px;}
.card-side{display:none;}
.work-card{margin-bottom:20px;}
.card-header{display:flex;justify-content:space-between;}
.position{font-size:1em;font-weight:700;color:#1a1a2e;}
.company{font-size:0.9em;color:var(--primary-color);font-weight:600;margin:3px 0 6px;}
.date{font-size:0.82em;color:#9ca3af;}
.summary{font-size:0.9em;color:#374151;line-height:1.6;}
.edu-card{margin-bottom:14px;}
.edu-info .area{font-size:0.95em;font-weight:700;color:#1a1a2e;}
.edu-info .institution{font-size:0.85em;color:#6b7280;}
.edu-date{font-size:0.8em;color:#9ca3af;display:block;margin-top:2px;}
.skill-row{padding:5px 0;border-bottom:1px solid #f5f3ff;}
.skill-meta{font-size:0.9em;color:#374151;font-weight:500;}
.skill-track,.skill-fill,.skill-val{display:none;}
.project-card{margin-bottom:14px;}
.project-name{font-size:0.95em;font-weight:700;color:#1a1a2e;}
.project-desc{font-size:0.85em;color:#6b7280;margin-top:3px;}`
  },

  'startup-founder': {
    name: 'Startup Founder',
    category: 'Modern Style',
    accent: '#f97316',
    thumbnail: 'single-column',
    html: `<div class="sf-page"><div class="sf-hero"><div class="sf-hero-text"><h1 class="sf-name">{{name}}</h1><p class="sf-tagline">{{summary}}</p></div><div class="sf-hero-right"><div class="sf-contact-grid"><span>{{email}}</span><span>{{phone}}</span><span>{{location}}</span><span>{{website}}</span></div></div></div><div class="sf-body"><div class="sf-main"><section class="sf-sec"><h2 class="sf-h2">What I've Built</h2>{{experience}}</section><section class="sf-sec"><h2 class="sf-h2">Projects & Ventures</h2><div class="sf-cards">{{projects}}</div></section></div><div class="sf-side"><section class="sf-sec"><h2 class="sf-h2">Stack</h2>{{skills}}</section><section class="sf-sec"><h2 class="sf-h2">Education</h2>{{education}}</section></div></div></div>`,
    css: `.sf-page{font-family:var(--font-family);background:#fff;font-size:var(--base-font-size);}
.sf-hero{background:linear-gradient(135deg,#0f172a 0%,#1e293b 100%);padding:48px 56px;display:flex;justify-content:space-between;align-items:center;gap:32px;}
.sf-name{font-size:2.8em;font-weight:900;color:#fff;margin:0 0 12px;letter-spacing:-1px;}
.sf-tagline{font-size:1em;color:rgba(255,255,255,0.65);line-height:1.6;max-width:400px;}
.sf-contact-grid{display:flex;flex-direction:column;gap:8px;text-align:right;}
.sf-contact-grid span{font-size:0.82em;color:rgba(255,255,255,0.5);}
.sf-body{display:grid;grid-template-columns:1fr var(--sidebar-width);padding:40px 56px;gap:40px;}
.sf-h2{font-size:0.8em;font-weight:900;letter-spacing:3px;color:var(--primary-color);text-transform:uppercase;border-bottom:2px solid var(--primary-color);padding-bottom:6px;margin:0 0 20px;}
.sf-sec{margin-bottom:36px;}
.card-side{display:none;}
.work-card{margin-bottom:24px;padding:16px;background:#fff7ed;border-radius:12px;border-left:4px solid var(--primary-color);}
.card-header{display:flex;justify-content:space-between;align-items:baseline;margin-bottom:4px;}
.position{font-size:1.05em;font-weight:800;color:#0f172a;}
.company{font-size:0.9em;font-weight:700;color:var(--primary-color);margin-bottom:8px;}
.date{font-size:0.8em;color:#9ca3af;}
.summary{font-size:0.9em;color:#374151;line-height:1.6;}
.sf-cards{display:flex;flex-direction:column;gap:14px;}
.project-card{padding:14px;background:#f8fafc;border-radius:10px;border:1px solid #fed7aa;}
.project-name{font-size:1em;font-weight:700;color:#0f172a;}
.project-desc{font-size:0.85em;color:#6b7280;margin-top:4px;}
.skill-row{background:var(--primary-color);color:#fff;padding:6px 12px;border-radius:6px;margin-bottom:8px;display:flex;justify-content:space-between;align-items:center;}
.skill-meta{font-size:0.85em;font-weight:600;color:#fff;}
.skill-track,.skill-fill,.skill-val{display:none;}
.edu-card{margin-bottom:16px;}
.edu-info .area{font-size:0.9em;font-weight:700;color:#0f172a;}
.edu-info .institution{font-size:0.82em;color:#6b7280;}
.edu-date{font-size:0.78em;color:#9ca3af;display:block;margin-top:2px;}`
  },

  'zen-minimal': {
    name: 'Zen Minimal',
    category: 'Minimalist Style',
    accent: '#64748b',
    thumbnail: 'single-column',
    html: `<div class="zen-page"><header class="zen-header"><h1 class="zen-name">{{name}}</h1><div class="zen-meta">{{email}} · {{phone}} · {{location}}</div></header><section class="zen-sec"><p class="zen-summary">{{summary}}</p></section><div class="zen-line"></div><section class="zen-sec"><h2 class="zen-h2">Experience</h2>{{experience}}</section><div class="zen-line"></div><section class="zen-sec"><h2 class="zen-h2">Education</h2>{{education}}</section><div class="zen-line"></div><div class="zen-bottom"><div><h2 class="zen-h2">Skills</h2>{{skills}}</div><div><h2 class="zen-h2">Projects</h2>{{projects}}</div></div></div>`,
    css: `.zen-page{font-family:var(--font-family);background:#fff;padding:72px 88px;color:#374151;font-size:var(--base-font-size);}
.zen-header{margin-bottom:32px;}
.zen-name{font-size:2em;font-weight:700;color:#111827;margin:0 0 8px;letter-spacing:-0.5px;}
.zen-meta{font-size:0.85em;color:#9ca3af;letter-spacing:0.5px;}
.zen-summary{font-size:1em;color:#4b5563;line-height:1.8;font-style:italic;}
.zen-line{border:none;border-top:1px solid #f3f4f6;margin:24px 0;}
.zen-sec{margin-bottom:24px;}
.zen-h2{font-size:0.75em;font-weight:700;color:var(--primary-color);letter-spacing:3px;text-transform:uppercase;margin:0 0 16px;}
.zen-bottom{display:grid;grid-template-columns:1fr 1fr;gap:40px;}
.card-side{display:none;}
.work-card{margin-bottom:20px;}
.card-header{display:flex;justify-content:space-between;align-items:baseline;}
.position{font-size:1em;font-weight:600;color:#111827;}
.company{font-size:0.9em;color:var(--primary-color);margin:2px 0 6px;}
.date{font-size:0.8em;color:#9ca3af;}
.summary{font-size:0.9em;color:#4b5563;line-height:1.65;}
.edu-card{margin-bottom:14px;}
.edu-info .area{font-size:0.95em;font-weight:600;color:#111827;}
.edu-info .institution{font-size:0.85em;color:#6b7280;}
.edu-date{font-size:0.8em;color:#9ca3af;display:block;}
.skill-row{margin-bottom:8px;}
.skill-meta{font-size:0.88em;color:#374151;}
.skill-track,.skill-fill,.skill-val{display:none;}
.project-card{margin-bottom:14px;}
.project-name{font-size:0.92em;font-weight:600;color:#111827;}
.project-desc{font-size:0.85em;color:#6b7280;margin-top:3px;}`
  },

  'grid-master': {
    name: 'Grid Master',
    category: 'Modern Style',
    accent: '#0ea5e9',
    thumbnail: 'two-column',
    html: `<div class="gm-page"><div class="gm-header"><div class="gm-badge">{{initials}}</div><div class="gm-header-text"><h1 class="gm-name">{{name}}</h1><div class="gm-pills"><span>{{email}}</span><span>{{phone}}</span><span>{{location}}</span></div></div></div><div class="gm-body"><div class="gm-left"><section class="gm-sec"><h2 class="gm-h2">Summary</h2><p class="gm-text">{{summary}}</p></section><section class="gm-sec"><h2 class="gm-h2">Experience</h2>{{experience}}</section></div><div class="gm-right"><section class="gm-sec"><h2 class="gm-h2">Skills</h2>{{skills}}</section><section class="gm-sec"><h2 class="gm-h2">Education</h2>{{education}}</section><section class="gm-sec"><h2 class="gm-h2">Projects</h2>{{projects}}</section></div></div></div>`,
    css: `.gm-page{font-family:var(--font-family);background:#f0f9ff;font-size:var(--base-font-size);}
.gm-header{background:var(--primary-color);padding:36px 48px;display:flex;align-items:center;gap:24px;}
.gm-badge{width:64px;height:64px;background:rgba(255,255,255,0.2);border-radius:16px;color:#fff;font-size:1.8em;font-weight:900;display:flex;align-items:center;justify-content:center;flex-shrink:0;}
.gm-name{font-size:2em;font-weight:900;color:#fff;margin:0 0 10px;}
.gm-pills{display:flex;gap:10px;flex-wrap:wrap;}
.gm-pills span{font-size:0.8em;color:rgba(255,255,255,0.8);background:rgba(255,255,255,0.15);padding:3px 10px;border-radius:20px;}
.gm-body{display:grid;grid-template-columns:1fr var(--sidebar-width);gap:0;padding:36px 48px;background:#fff;}
.gm-left{padding-right:32px;border-right:1px solid #e0f2fe;}
.gm-right{padding-left:32px;}
.gm-sec{margin-bottom:28px;}
.gm-h2{font-size:0.75em;font-weight:800;color:var(--primary-color);letter-spacing:2.5px;text-transform:uppercase;border-bottom:2px solid var(--primary-color);padding-bottom:5px;margin:0 0 14px;opacity:0.8;}
.gm-text{font-size:0.95em;color:#374151;line-height:1.7;}
.card-side{display:none;}
.work-card{margin-bottom:22px;}
.card-header{display:flex;justify-content:space-between;align-items:baseline;margin-bottom:3px;}
.position{font-size:1.05em;font-weight:700;color:#0f172a;}
.company{font-size:0.88em;font-weight:600;color:var(--primary-color);margin-bottom:7px;}
.date{font-size:0.8em;color:#94a3b8;}
.summary{font-size:0.9em;color:#475569;line-height:1.6;}
.skill-row{background:#e0f2fe;border-radius:6px;padding:7px 12px;margin-bottom:8px;display:flex;justify-content:space-between;align-items:center;}
.skill-meta{font-size:0.85em;font-weight:600;color:#0369a1;}
.skill-track,.skill-fill,.skill-val{display:none;}
.edu-card{margin-bottom:14px;}
.edu-info .area{font-size:0.9em;font-weight:700;color:#0f172a;}
.edu-info .institution{font-size:0.82em;color:#6b7280;}
.edu-date{font-size:0.78em;color:#94a3b8;display:block;}
.project-card{margin-bottom:12px;padding:10px;background:#f0f9ff;border-radius:8px;border-left:3px solid var(--primary-color);}
.project-name{font-size:0.9em;font-weight:700;color:#0f172a;}
.project-desc{font-size:0.82em;color:#6b7280;margin-top:3px;}`
  },

  'bold-impact': {
    name: 'Bold Impact',
    category: 'Creative Style',
    accent: '#dc2626',
    thumbnail: 'single-column',
    html: `<div class="bi-page"><div class="bi-left"><div class="bi-name-block"><h1 class="bi-name">{{name}}</h1><div class="bi-accent-line"></div></div><section class="bi-sec"><h2 class="bi-h2">Experience</h2>{{experience}}</section><section class="bi-sec"><h2 class="bi-h2">Projects</h2>{{projects}}</section></div><div class="bi-right"><div class="bi-contact"><p class="bi-c">{{email}}</p><p class="bi-c">{{phone}}</p><p class="bi-c">{{location}}</p><p class="bi-c">{{website}}</p></div><div class="bi-r-sec"><h3 class="bi-rh">Profile</h3><p class="bi-text">{{summary}}</p></div><div class="bi-r-sec"><h3 class="bi-rh">Skills</h3>{{skills}}</div><div class="bi-r-sec"><h3 class="bi-rh">Education</h3>{{education}}</div></div></div>`,
    css: `.bi-page{display:grid;grid-template-columns:1fr var(--sidebar-width);font-family:var(--font-family);background:#fff;font-size:var(--base-font-size);min-height:1130px;}
.bi-left{padding:56px 40px;}
.bi-name-block{margin-bottom:40px;}
.bi-name{font-size:3.2em;font-weight:900;color:#111;margin:0;line-height:1;text-transform:uppercase;letter-spacing:-2px;}
.bi-accent-line{height:8px;background:var(--primary-color);width:60px;margin-top:16px;}
.bi-sec{margin-bottom:36px;}
.bi-h2{font-size:0.75em;font-weight:900;letter-spacing:3px;color:var(--primary-color);text-transform:uppercase;margin:0 0 20px;border-left:4px solid var(--primary-color);padding-left:12px;}
.bi-right{background:#fafafa;border-left:1px solid #f3f4f6;padding:56px 28px;}
.bi-contact{margin-bottom:32px;padding-bottom:24px;border-bottom:2px solid var(--primary-color);}
.bi-c{font-size:0.82em;color:#4b5563;margin-bottom:8px;word-break:break-all;}
.bi-r-sec{margin-bottom:28px;}
.bi-rh{font-size:0.72em;font-weight:800;letter-spacing:2.5px;color:#111;text-transform:uppercase;margin:0 0 12px;}
.bi-text{font-size:0.88em;color:#374151;line-height:1.7;}
.card-side{display:none;}
.work-card{margin-bottom:22px;}
.card-header{display:flex;justify-content:space-between;align-items:baseline;margin-bottom:3px;}
.position{font-size:1.05em;font-weight:700;color:#111;}
.company{font-size:0.88em;font-weight:600;color:var(--primary-color);margin-bottom:6px;}
.date{font-size:0.78em;color:#9ca3af;}
.summary{font-size:0.88em;color:#374151;line-height:1.6;}
.skill-row{border-bottom:1px solid #e5e7eb;padding:8px 0;display:flex;justify-content:space-between;}
.skill-meta{font-size:0.88em;color:#111;font-weight:500;}
.skill-track,.skill-fill,.skill-val{display:none;}
.edu-card{margin-bottom:14px;}
.edu-info .area{font-size:0.88em;font-weight:700;color:#111;}
.edu-info .institution{font-size:0.8em;color:#6b7280;}
.edu-date{font-size:0.75em;color:#9ca3af;display:block;}
.project-card{margin-bottom:14px;padding:10px;border:1px solid #fecaca;border-radius:6px;background:#fff5f5;}
.project-name{font-size:0.9em;font-weight:700;color:#111;}
.project-desc{font-size:0.82em;color:#6b7280;margin-top:3px;}`
  },

  'clean-lines': {
    name: 'Clean Lines',
    category: 'Minimalist Style',
    accent: '#059669',
    thumbnail: 'single-column',
    html: `<div class="cl-page"><header class="cl-header"><div class="cl-hl"><h1 class="cl-name">{{name}}</h1><p class="cl-loc">{{location}} · {{phone}}</p></div><div class="cl-hr"><p class="cl-email">{{email}}</p><p class="cl-web">{{website}}</p></div></header><div class="cl-green-bar"></div><div class="cl-body"><section class="cl-sec"><h2 class="cl-h2">About</h2><p class="cl-p">{{summary}}</p></section><section class="cl-sec"><h2 class="cl-h2">Work History</h2>{{experience}}</section><div class="cl-cols"><div><h2 class="cl-h2">Education</h2>{{education}}<h2 class="cl-h2" style="margin-top:24px">Projects</h2>{{projects}}</div><div><h2 class="cl-h2">Skills</h2>{{skills}}</div></div></div></div>`,
    css: `.cl-page{font-family:var(--font-family);background:#fff;font-size:var(--base-font-size);}
.cl-header{display:flex;justify-content:space-between;align-items:flex-end;padding:40px 56px 20px;}
.cl-name{font-size:2.4em;font-weight:800;color:#111827;margin:0 0 6px;letter-spacing:-1px;}
.cl-loc{font-size:0.85em;color:#6b7280;}
.cl-hr{text-align:right;}
.cl-email,.cl-web{font-size:0.85em;color:#6b7280;margin-bottom:4px;}
.cl-green-bar{height:4px;background:linear-gradient(90deg,var(--primary-color),transparent);}
.cl-body{padding:32px 56px;}
.cl-sec{margin-bottom:28px;}
.cl-h2{font-size:0.78em;font-weight:800;color:var(--primary-color);letter-spacing:2.5px;text-transform:uppercase;margin:0 0 14px;border-bottom:1.5px solid var(--primary-color);padding-bottom:4px;}
.cl-p{font-size:0.95em;color:#374151;line-height:1.75;}
.cl-cols{display:grid;grid-template-columns:1fr 1fr;gap:32px;}
.card-side{display:none;}
.work-card{margin-bottom:20px;}
.card-header{display:flex;justify-content:space-between;align-items:baseline;margin-bottom:3px;}
.position{font-size:1em;font-weight:700;color:#111827;}
.company{font-size:0.88em;color:var(--primary-color);font-weight:600;margin-bottom:6px;}
.date{font-size:0.8em;color:#9ca3af;}
.summary{font-size:0.88em;color:#374151;line-height:1.6;}
.edu-card{margin-bottom:14px;}
.edu-info .area{font-size:0.9em;font-weight:700;color:#111827;}
.edu-info .institution{font-size:0.82em;color:#6b7280;}
.edu-date{font-size:0.78em;color:#9ca3af;display:block;}
.skill-row{display:flex;align-items:center;gap:8px;margin-bottom:10px;}
.skill-meta{font-size:0.88em;color:#374151;font-weight:500;}
.skill-track{flex:1;height:3px;background:#d1fae5;border-radius:3px;}
.skill-fill{height:100%;background:var(--primary-color);border-radius:3px;}
.skill-val{font-size:0.75em;color:#9ca3af;}
.project-card{margin-bottom:12px;}
.project-name{font-size:0.9em;font-weight:700;color:#111827;}
.project-desc{font-size:0.82em;color:#6b7280;margin-top:3px;}`
  },

  'aurora': {
    name: 'Aurora',
    category: 'Creative Style',
    accent: '#8b5cf6',
    thumbnail: 'two-column',
    html: `<div class="au-page"><div class="au-sidebar"><div class="au-glow"></div><div class="au-profile"><div class="au-initials">{{initials}}</div><h1 class="au-name">{{name}}</h1></div><div class="au-sc"><h3 class="au-sh">Connect</h3><p class="au-si">{{email}}</p><p class="au-si">{{phone}}</p><p class="au-si">{{location}}</p><p class="au-si">{{website}}</p></div><div class="au-sc"><h3 class="au-sh">Skills</h3>{{skills}}</div><div class="au-sc"><h3 class="au-sh">Education</h3>{{education}}</div></div><div class="au-main"><section class="au-sec au-first"><h2 class="au-h2">About</h2><p class="au-body">{{summary}}</p></section><section class="au-sec"><h2 class="au-h2">Career</h2>{{experience}}</section><section class="au-sec"><h2 class="au-h2">Work</h2>{{projects}}</section></div></div>`,
    css: `.au-page{display:grid;grid-template-columns:var(--sidebar-width) 1fr;font-family:var(--font-family);font-size:var(--base-font-size);min-height:1130px;background:#fff;}
.au-sidebar{background:linear-gradient(160deg,#1e1b4b,#312e81);color:#fff;padding:40px 24px;position:relative;overflow:hidden;}
.au-glow{position:absolute;top:-80px;left:-80px;width:240px;height:240px;background:var(--primary-color);border-radius:50%;opacity:0.15;filter:blur(40px);}
.au-profile{text-align:center;margin-bottom:32px;position:relative;}
.au-initials{width:72px;height:72px;border-radius:50%;background:var(--primary-color);color:#fff;font-size:2em;font-weight:900;display:flex;align-items:center;justify-content:center;margin:0 auto 14px;}
.au-name{font-size:1.2em;font-weight:800;color:#fff;margin:0;}
.au-sc{margin-bottom:28px;}
.au-sh{font-size:0.68em;letter-spacing:3px;color:var(--primary-color);font-weight:800;text-transform:uppercase;margin:0 0 12px;}
.au-si{font-size:0.8em;color:rgba(255,255,255,0.6);margin-bottom:7px;word-break:break-all;}
.au-main{padding:0;}
.au-first{padding-top:48px;}
.au-sec{padding:0 44px 32px;}
.au-h2{font-size:1em;font-weight:800;color:var(--primary-color);margin:0 0 18px;display:flex;align-items:center;gap:10px;}
.au-h2::after{content:"";flex:1;height:2px;background:var(--primary-color);opacity:0.15;}
.au-body{font-size:0.93em;color:#374151;line-height:1.75;}
.card-side{display:none;}
.work-card{margin-bottom:24px;}
.card-header{display:flex;justify-content:space-between;align-items:baseline;margin-bottom:4px;}
.position{font-size:1em;font-weight:700;color:#1e1b4b;}
.company{font-size:0.88em;font-weight:600;color:var(--primary-color);margin-bottom:7px;}
.date{font-size:0.78em;color:#9ca3af;}
.summary{font-size:0.88em;color:#374151;line-height:1.6;}
.skill-row{margin-bottom:12px;}
.skill-meta{display:flex;justify-content:space-between;font-size:0.8em;color:rgba(255,255,255,0.8);margin-bottom:4px;}
.skill-track{height:3px;background:rgba(255,255,255,0.1);border-radius:3px;}
.skill-fill{height:100%;background:var(--primary-color);border-radius:3px;}
.skill-val{display:none;}
.edu-card{margin-bottom:14px;}
.edu-info .area{font-size:0.85em;font-weight:700;color:#e0e7ff;}
.edu-info .institution{font-size:0.78em;color:rgba(255,255,255,0.45);}
.edu-date{font-size:0.72em;color:rgba(255,255,255,0.3);display:block;}
.project-card{margin-bottom:16px;padding:12px;background:#f5f3ff;border-radius:8px;border-left:3px solid var(--primary-color);}
.project-name{font-size:0.92em;font-weight:700;color:#1e1b4b;}
.project-desc{font-size:0.82em;color:#6b7280;margin-top:4px;}`
  },

  'copper-executive': {
    name: 'Copper Executive',
    category: 'Executive Style',
    accent: '#b45309',
    thumbnail: 'single-column',
    html: `<div class="ce-page"><header class="ce-header"><h1 class="ce-name">{{name}}</h1><div class="ce-ornament"></div><div class="ce-contacts"><span>{{email}}</span><span class="ce-sep">◆</span><span>{{phone}}</span><span class="ce-sep">◆</span><span>{{location}}</span></div></header><div class="ce-body"><div class="ce-main"><section class="ce-sec"><h2 class="ce-h2">Executive Summary</h2><p class="ce-p">{{summary}}</p></section><section class="ce-sec"><h2 class="ce-h2">Professional Experience</h2>{{experience}}</section><section class="ce-sec"><h2 class="ce-h2">Key Projects</h2>{{projects}}</section></div><div class="ce-side"><section class="ce-ssec"><h2 class="ce-sh">Expertise</h2>{{skills}}</section><section class="ce-ssec"><h2 class="ce-sh">Education</h2>{{education}}</section></div></div></div>`,
    css: `.ce-page{font-family:var(--font-family);background:#fffbf5;font-size:var(--base-font-size);min-height:1130px;}
.ce-header{text-align:center;padding:48px 64px 24px;background:linear-gradient(135deg,#1c1009,#2d1a08);position:relative;}
.ce-name{font-size:2.8em;font-weight:900;color:#f5deb3;margin:0 0 16px;letter-spacing:-0.5px;}
.ce-ornament{width:80px;height:3px;background:linear-gradient(90deg,transparent,var(--primary-color),transparent);margin:0 auto 16px;}
.ce-contacts{font-size:0.85em;color:rgba(245,222,179,0.6);display:flex;justify-content:center;gap:12px;flex-wrap:wrap;}
.ce-sep{color:var(--primary-color);}
.ce-body{display:grid;grid-template-columns:1fr 260px;padding:36px 48px;gap:40px;}
.ce-sec{margin-bottom:32px;}
.ce-h2{font-size:0.82em;font-weight:800;color:var(--primary-color);text-transform:uppercase;letter-spacing:2px;border-bottom:1px solid #fde68a;padding-bottom:6px;margin:0 0 18px;}
.ce-p{font-size:0.95em;color:#44301a;line-height:1.75;}
.ce-side{padding-left:24px;border-left:1px solid #fde68a;}
.ce-ssec{margin-bottom:28px;}
.ce-sh{font-size:0.75em;font-weight:800;color:var(--primary-color);letter-spacing:2px;text-transform:uppercase;margin:0 0 14px;}
.card-side{display:none;}
.work-card{margin-bottom:24px;padding-left:14px;border-left:3px solid #fde68a;}
.card-header{display:flex;justify-content:space-between;align-items:baseline;margin-bottom:3px;}
.position{font-size:1.05em;font-weight:700;color:#1c1009;}
.company{font-size:0.9em;font-weight:600;color:var(--primary-color);margin-bottom:8px;}
.date{font-size:0.8em;color:#92400e;}
.summary{font-size:0.9em;color:#44301a;line-height:1.65;}
.skill-row{margin-bottom:10px;padding:7px 10px;background:#fef3c7;border-radius:6px;border-left:3px solid var(--primary-color);}
.skill-meta{font-size:0.85em;font-weight:600;color:#44301a;}
.skill-track,.skill-fill,.skill-val{display:none;}
.edu-card{margin-bottom:14px;}
.edu-info .area{font-size:0.9em;font-weight:700;color:#1c1009;}
.edu-info .institution{font-size:0.82em;color:#78350f;}
.edu-date{font-size:0.78em;color:#92400e;display:block;}
.project-card{margin-bottom:14px;padding:10px;background:#fef9ee;border-radius:8px;}
.project-name{font-size:0.9em;font-weight:700;color:#1c1009;}
.project-desc{font-size:0.82em;color:#78350f;margin-top:3px;}`
  },

  'blueprint': {
    name: 'Blueprint',
    category: 'Tech Style',
    accent: '#1d4ed8',
    thumbnail: 'single-column',
    html: `<div class="bp-page"><div class="bp-header"><div class="bp-logo">{{initials}}</div><div class="bp-header-text"><h1 class="bp-name">{{name}}</h1><div class="bp-links"><span>{{email}}</span><span>{{phone}}</span><span>{{location}}</span><span>{{website}}</span></div></div></div><div class="bp-content"><div class="bp-main"><section class="bp-sec"><h2 class="bp-h2">// profile</h2><p class="bp-p">{{summary}}</p></section><section class="bp-sec"><h2 class="bp-h2">// experience</h2>{{experience}}</section></div><div class="bp-right"><section class="bp-sec"><h2 class="bp-h2">// stack</h2><div class="bp-skill-list">{{skills}}</div></section><section class="bp-sec"><h2 class="bp-h2">// education</h2>{{education}}</section><section class="bp-sec"><h2 class="bp-h2">// projects</h2>{{projects}}</section></div></div></div>`,
    css: `.bp-page{font-family:var(--font-family);background:#f8faff;font-size:var(--base-font-size);min-height:1130px;border:8px solid var(--primary-color);}
.bp-header{background:var(--primary-color);padding:32px 48px;display:flex;align-items:center;gap:20px;}
.bp-logo{width:56px;height:56px;background:rgba(255,255,255,0.15);border:2px solid rgba(255,255,255,0.4);color:#fff;font-size:1.5em;font-weight:900;display:flex;align-items:center;justify-content:center;font-family:monospace;flex-shrink:0;}
.bp-name{font-size:2em;font-weight:900;color:#fff;margin:0 0 8px;letter-spacing:-0.5px;}
.bp-links{display:flex;gap:16px;flex-wrap:wrap;}
.bp-links span{font-size:0.78em;color:rgba(255,255,255,0.7);font-family:monospace;}
.bp-content{display:grid;grid-template-columns:1fr 280px;padding:36px 48px;gap:40px;background:#fff;}
.bp-sec{margin-bottom:32px;}
.bp-h2{font-family:monospace;font-size:0.82em;font-weight:700;color:var(--primary-color);margin:0 0 16px;letter-spacing:1px;}
.bp-p{font-size:0.93em;color:#334155;line-height:1.7;}
.card-side{display:none;}
.work-card{margin-bottom:24px;padding:14px;background:#f0f6ff;border-left:3px solid var(--primary-color);border-radius:0 8px 8px 0;}
.card-header{display:flex;justify-content:space-between;align-items:baseline;margin-bottom:4px;}
.position{font-size:1.02em;font-weight:700;color:#1e293b;}
.company{font-size:0.88em;font-weight:600;color:var(--primary-color);margin-bottom:8px;font-family:monospace;}
.date{font-size:0.78em;color:#94a3b8;font-family:monospace;}
.summary{font-size:0.88em;color:#374151;line-height:1.6;}
.bp-skill-list{display:flex;flex-direction:column;gap:6px;}
.skill-row{font-family:monospace;font-size:0.82em;color:#1e293b;padding:6px 10px;background:#dbeafe;border-radius:4px;font-weight:600;}
.skill-track,.skill-fill,.skill-val{display:none;}
.edu-card{margin-bottom:14px;}
.edu-info .area{font-size:0.9em;font-weight:700;color:#1e293b;}
.edu-info .institution{font-size:0.82em;color:#475569;font-family:monospace;}
.edu-date{font-size:0.75em;color:#94a3b8;display:block;font-family:monospace;}
.project-card{margin-bottom:14px;padding:10px;background:#f0f6ff;border-radius:6px;}
.project-name{font-size:0.88em;font-weight:700;color:#1e293b;font-family:monospace;}
.project-desc{font-size:0.8em;color:#64748b;margin-top:4px;}`
  },

  'obsidian': { name: 'Obsidian', category: 'Executive Style', accent: '#1e1e2e', thumbnail: 'two-column',
    html: `<div class="ob-page"><div class="ob-left"><div class="ob-top"><h1 class="ob-name">{{name}}</h1><div class="ob-bar"></div></div><p class="ob-summary">{{summary}}</p><h3 class="ob-sh">Experience</h3>{{experience}}<h3 class="ob-sh">Projects</h3>{{projects}}</div><div class="ob-right"><div class="ob-contact"><h3 class="ob-rh">Contact</h3><p>{{email}}</p><p>{{phone}}</p><p>{{location}}</p></div><div class="ob-block"><h3 class="ob-rh">Skills</h3>{{skills}}</div><div class="ob-block"><h3 class="ob-rh">Education</h3>{{education}}</div></div></div>`,
    css: `.ob-page{display:grid;grid-template-columns:1fr var(--sidebar-width);font-family:var(--font-family);font-size:var(--base-font-size);min-height:1130px;}.ob-left{padding:52px 40px;background:#fff;}.ob-right{background:#1e1e2e;padding:52px 28px;color:#cdd6f4;}.ob-top{margin-bottom:24px;}.ob-name{font-size:2.8em;font-weight:900;color:#1e1e2e;margin:0;letter-spacing:-1.5px;}.ob-bar{height:5px;width:48px;background:var(--primary-color);margin-top:12px;}.ob-summary{font-size:0.93em;color:#374151;line-height:1.75;margin-bottom:32px;}.ob-sh{font-size:0.72em;font-weight:800;letter-spacing:3px;color:var(--primary-color);text-transform:uppercase;margin:24px 0 14px;border-left:4px solid var(--primary-color);padding-left:10px;}.ob-contact{margin-bottom:28px;padding-bottom:20px;border-bottom:1px solid rgba(205,214,244,0.15);}.ob-rh{font-size:0.7em;letter-spacing:3px;color:var(--primary-color);font-weight:800;text-transform:uppercase;margin:0 0 12px;}.ob-contact p,.ob-block p{font-size:0.82em;color:rgba(205,214,244,0.65);margin-bottom:7px;word-break:break-all;}.ob-block{margin-bottom:24px;}.card-side{display:none;}.work-card{margin-bottom:20px;}.card-header{display:flex;justify-content:space-between;align-items:baseline;}.position{font-size:1em;font-weight:700;color:#1e1e2e;}.company{font-size:0.88em;color:var(--primary-color);font-weight:600;margin:3px 0 7px;}.date{font-size:0.78em;color:#9ca3af;}.summary{font-size:0.88em;color:#374151;line-height:1.6;}.skill-row{padding:6px 0;border-bottom:1px solid rgba(205,214,244,0.1);}.skill-meta{font-size:0.82em;color:rgba(205,214,244,0.8);font-weight:500;}.skill-track,.skill-fill,.skill-val{display:none;}.edu-card{margin-bottom:12px;}.edu-info .area{font-size:0.88em;font-weight:700;color:#cdd6f4;}.edu-info .institution{font-size:0.8em;color:rgba(205,214,244,0.45);}.edu-date{font-size:0.75em;color:rgba(205,214,244,0.3);display:block;}.project-card{margin-bottom:14px;padding:10px;background:#f8f9fa;border-radius:6px;border-left:3px solid var(--primary-color);}.project-name{font-size:0.9em;font-weight:700;color:#1e1e2e;}.project-desc{font-size:0.82em;color:#6b7280;margin-top:3px;}`
  },

  'sage': { name: 'Sage', category: 'Minimalist Style', accent: '#16a34a', thumbnail: 'single-column',
    html: `<div class="sg-page"><header class="sg-header"><div class="sg-initials-box">{{initials}}</div><div><h1 class="sg-name">{{name}}</h1><div class="sg-contact-row"><span>{{email}}</span><span>{{phone}}</span><span>{{location}}</span></div></div></header><div class="sg-grid"><div class="sg-main"><section class="sg-sec"><h2 class="sg-h2">Summary</h2><p class="sg-p">{{summary}}</p></section><section class="sg-sec"><h2 class="sg-h2">Experience</h2>{{experience}}</section><section class="sg-sec"><h2 class="sg-h2">Projects</h2>{{projects}}</section></div><div class="sg-aside"><section class="sg-sec"><h2 class="sg-h2">Skills</h2>{{skills}}</section><section class="sg-sec"><h2 class="sg-h2">Education</h2>{{education}}</section></div></div></div>`,
    css: `.sg-page{font-family:var(--font-family);background:#f9fafb;font-size:var(--base-font-size);}.sg-header{display:flex;align-items:center;gap:20px;padding:40px 48px;background:#fff;border-bottom:3px solid var(--primary-color);}.sg-initials-box{width:60px;height:60px;background:var(--primary-color);color:#fff;font-size:1.6em;font-weight:900;display:flex;align-items:center;justify-content:center;border-radius:12px;flex-shrink:0;}.sg-name{font-size:2em;font-weight:800;color:#111827;margin:0 0 8px;}.sg-contact-row{display:flex;gap:16px;flex-wrap:wrap;font-size:0.82em;color:#6b7280;}.sg-grid{display:grid;grid-template-columns:1fr var(--sidebar-width);gap:0;}.sg-main{padding:32px 40px;background:#fff;border-right:1px solid #e5e7eb;}.sg-aside{padding:32px 28px;background:#f9fafb;}.sg-sec{margin-bottom:28px;}.sg-h2{font-size:0.72em;font-weight:800;color:var(--primary-color);letter-spacing:2.5px;text-transform:uppercase;border-bottom:1.5px solid var(--primary-color);padding-bottom:4px;margin:0 0 14px;}.sg-p{font-size:0.93em;color:#374151;line-height:1.75;}.card-side{display:none;}.work-card{margin-bottom:20px;}.card-header{display:flex;justify-content:space-between;align-items:baseline;margin-bottom:3px;}.position{font-size:1em;font-weight:700;color:#111827;}.company{font-size:0.88em;color:var(--primary-color);font-weight:600;margin-bottom:6px;}.date{font-size:0.78em;color:#9ca3af;}.summary{font-size:0.88em;color:#374151;line-height:1.6;}.skill-row{background:#dcfce7;border-radius:6px;padding:7px 10px;margin-bottom:8px;}.skill-meta{font-size:0.85em;font-weight:600;color:#14532d;}.skill-track,.skill-fill,.skill-val{display:none;}.edu-card{margin-bottom:14px;padding:10px;background:#fff;border-radius:8px;border:1px solid #e5e7eb;}.edu-info .area{font-size:0.9em;font-weight:700;color:#111827;}.edu-info .institution{font-size:0.82em;color:#6b7280;}.edu-date{font-size:0.75em;color:#9ca3af;display:block;margin-top:2px;}.project-card{margin-bottom:12px;padding:10px;background:#fff;border-radius:8px;border:1px solid #e5e7eb;}.project-name{font-size:0.9em;font-weight:700;color:#111827;}.project-desc{font-size:0.82em;color:#6b7280;margin-top:3px;}`
  },

  'cardinal': { name: 'Cardinal', category: 'Corporate Style', accent: '#be123c', thumbnail: 'two-column',
    html: `<div class="cd-page"><div class="cd-header"><h1 class="cd-name">{{name}}</h1><div class="cd-tagline">{{email}} &nbsp;|&nbsp; {{phone}} &nbsp;|&nbsp; {{location}} &nbsp;|&nbsp; {{website}}</div></div><div class="cd-body"><div class="cd-main"><section class="cd-sec"><h2 class="cd-h2">Professional Summary</h2><p class="cd-p">{{summary}}</p></section><section class="cd-sec"><h2 class="cd-h2">Experience</h2>{{experience}}</section><section class="cd-sec"><h2 class="cd-h2">Projects</h2>{{projects}}</section></div><div class="cd-side"><section class="cd-ssec"><h3 class="cd-sh">Core Skills</h3>{{skills}}</section><section class="cd-ssec"><h3 class="cd-sh">Education</h3>{{education}}</section></div></div></div>`,
    css: `.cd-page{font-family:var(--font-family);background:#fff;font-size:var(--base-font-size);min-height:1130px;}.cd-header{background:var(--primary-color);padding:40px 52px;}.cd-name{font-size:2.6em;font-weight:900;color:#fff;margin:0 0 10px;letter-spacing:-1px;}.cd-tagline{font-size:0.82em;color:rgba(255,255,255,0.75);letter-spacing:0.5px;}.cd-body{display:grid;grid-template-columns:1fr 240px;}.cd-main{padding:36px 40px;border-right:1px solid #fce7f3;}.cd-side{padding:36px 24px;background:#fff5f7;}.cd-sec{margin-bottom:28px;}.cd-h2{font-size:0.8em;font-weight:800;color:var(--primary-color);text-transform:uppercase;letter-spacing:2px;border-bottom:2px solid var(--primary-color);padding-bottom:5px;margin:0 0 16px;}.cd-p{font-size:0.93em;color:#374151;line-height:1.75;}.cd-ssec{margin-bottom:24px;}.cd-sh{font-size:0.72em;font-weight:800;letter-spacing:2px;color:var(--primary-color);text-transform:uppercase;margin:0 0 12px;}.card-side{display:none;}.work-card{margin-bottom:20px;}.card-header{display:flex;justify-content:space-between;align-items:baseline;margin-bottom:3px;}.position{font-size:1em;font-weight:700;color:#111827;}.company{font-size:0.88em;color:var(--primary-color);font-weight:600;margin-bottom:7px;}.date{font-size:0.78em;color:#9ca3af;}.summary{font-size:0.88em;color:#374151;line-height:1.6;}.skill-row{padding:6px 10px;background:#ffe4e6;border-radius:6px;margin-bottom:8px;}.skill-meta{font-size:0.85em;font-weight:600;color:#9f1239;}.skill-track,.skill-fill,.skill-val{display:none;}.edu-card{margin-bottom:14px;}.edu-info .area{font-size:0.9em;font-weight:700;color:#111827;}.edu-info .institution{font-size:0.82em;color:#6b7280;}.edu-date{font-size:0.75em;color:#9ca3af;display:block;}.project-card{margin-bottom:12px;padding:10px;background:#fff5f7;border-radius:6px;border-left:3px solid var(--primary-color);}.project-name{font-size:0.9em;font-weight:700;color:#111827;}.project-desc{font-size:0.82em;color:#6b7280;margin-top:3px;}`
  },

  'prism': { name: 'Prism', category: 'Creative Style', accent: '#7c3aed', thumbnail: 'single-column',
    html: `<div class="pr-page"><div class="pr-diagonal"></div><header class="pr-header"><h1 class="pr-name">{{name}}</h1><p class="pr-sub">{{email}} · {{phone}} · {{location}}</p></header><div class="pr-content"><div class="pr-main"><section class="pr-sec"><h2 class="pr-h2">About Me</h2><p class="pr-p">{{summary}}</p></section><section class="pr-sec"><h2 class="pr-h2">Experience</h2>{{experience}}</section><section class="pr-sec"><h2 class="pr-h2">Projects</h2>{{projects}}</section></div><div class="pr-side"><section class="pr-ssec"><h3 class="pr-sh">Skills</h3>{{skills}}</section><section class="pr-ssec"><h3 class="pr-sh">Education</h3>{{education}}</section></div></div></div>`,
    css: `.pr-page{font-family:var(--font-family);background:#fff;font-size:var(--base-font-size);min-height:1130px;overflow:hidden;position:relative;}.pr-diagonal{position:absolute;top:-60px;right:-60px;width:300px;height:300px;background:linear-gradient(135deg,var(--primary-color),#c4b5fd);border-radius:0 0 0 100%;opacity:0.15;}.pr-header{padding:48px 52px 32px;}.pr-name{font-size:2.8em;font-weight:900;color:var(--primary-color);margin:0 0 10px;letter-spacing:-1.5px;}.pr-sub{font-size:0.85em;color:#6b7280;}.pr-content{display:grid;grid-template-columns:1fr var(--sidebar-width);padding:0 52px 52px;gap:36px;position:relative;}.pr-main{}.pr-side{}.pr-sec{margin-bottom:28px;}.pr-h2{font-size:0.78em;font-weight:800;color:var(--primary-color);text-transform:uppercase;letter-spacing:2.5px;border-bottom:2px solid var(--primary-color);padding-bottom:5px;margin:0 0 16px;}.pr-p{font-size:0.93em;color:#374151;line-height:1.75;}.pr-ssec{margin-bottom:24px;}.pr-sh{font-size:0.72em;font-weight:800;color:var(--primary-color);letter-spacing:2px;text-transform:uppercase;margin:0 0 12px;}.card-side{display:none;}.work-card{margin-bottom:20px;}.card-header{display:flex;justify-content:space-between;align-items:baseline;margin-bottom:3px;}.position{font-size:1em;font-weight:700;color:#1e1b4b;}.company{font-size:0.88em;color:var(--primary-color);font-weight:600;margin-bottom:7px;}.date{font-size:0.78em;color:#9ca3af;}.summary{font-size:0.88em;color:#374151;line-height:1.6;}.skill-row{background:linear-gradient(135deg,#f5f3ff,#ede9fe);border-radius:8px;padding:8px 12px;margin-bottom:8px;}.skill-meta{font-size:0.85em;font-weight:600;color:#4c1d95;}.skill-track,.skill-fill,.skill-val{display:none;}.edu-card{margin-bottom:14px;}.edu-info .area{font-size:0.9em;font-weight:700;color:#1e1b4b;}.edu-info .institution{font-size:0.82em;color:#6b7280;}.edu-date{font-size:0.75em;color:#9ca3af;display:block;}.project-card{margin-bottom:14px;padding:10px;background:#f5f3ff;border-radius:8px;border-left:3px solid var(--primary-color);}.project-name{font-size:0.9em;font-weight:700;color:#1e1b4b;}.project-desc{font-size:0.82em;color:#6b7280;margin-top:3px;}`
  },

  'typewriter': { name: 'Typewriter', category: 'Creative Style', accent: '#d97706', thumbnail: 'single-column',
    html: `<div class="tw-page"><header class="tw-header"><h1 class="tw-name">{{name}}</h1><p class="tw-cursor">▌</p><div class="tw-underline"></div><div class="tw-meta">{{email}} · {{phone}} · {{location}} · {{website}}</div></header><div class="tw-body"><section class="tw-sec full"><h2 class="tw-h2">// PROFILE</h2><p class="tw-p">{{summary}}</p></section><section class="tw-sec full"><h2 class="tw-h2">// EXPERIENCE</h2>{{experience}}</section><div class="tw-two"><div><h2 class="tw-h2">// EDUCATION</h2>{{education}}<h2 class="tw-h2" style="margin-top:20px">// PROJECTS</h2>{{projects}}</div><div><h2 class="tw-h2">// SKILLS</h2>{{skills}}</div></div></div></div>`,
    css: `.tw-page{font-family:'Courier New',Courier,monospace;background:#fffef5;font-size:var(--base-font-size);min-height:1130px;}.tw-header{padding:48px 56px 28px;border-bottom:3px solid var(--primary-color);}.tw-name{font-size:2.6em;font-weight:900;color:#1a1a1a;margin:0;letter-spacing:-1px;display:inline;}.tw-cursor{display:inline;color:var(--primary-color);font-size:2.6em;margin:0;animation:blink 1s step-end infinite;}@keyframes blink{50%{opacity:0}}.tw-underline{height:3px;background:repeating-linear-gradient(90deg,var(--primary-color) 0 8px,transparent 8px 12px);margin:12px 0;}.tw-meta{font-size:0.8em;color:#6b7280;letter-spacing:1px;}.tw-body{padding:28px 56px;}.tw-two{display:grid;grid-template-columns:1fr 1fr;gap:32px;}.tw-sec{margin-bottom:24px;}.tw-h2{font-size:0.75em;font-weight:700;color:var(--primary-color);letter-spacing:2px;margin:0 0 14px;}.tw-p{font-size:0.9em;color:#374151;line-height:1.7;}.card-side{display:none;}.work-card{margin-bottom:20px;border-left:2px dashed var(--primary-color);padding-left:14px;}.card-header{display:flex;justify-content:space-between;align-items:baseline;margin-bottom:3px;}.position{font-size:0.95em;font-weight:700;color:#1a1a1a;}.company{font-size:0.85em;color:var(--primary-color);font-weight:600;margin-bottom:6px;}.date{font-size:0.78em;color:#9ca3af;}.summary{font-size:0.85em;color:#374151;line-height:1.6;}.skill-row{font-size:0.85em;color:#374151;padding:4px 0;border-bottom:1px dashed #e5e7eb;}.skill-meta{font-weight:600;}.skill-track,.skill-fill,.skill-val{display:none;}.edu-card{margin-bottom:14px;}.edu-info .area{font-size:0.9em;font-weight:700;color:#1a1a1a;}.edu-info .institution{font-size:0.82em;color:#6b7280;}.edu-date{font-size:0.75em;color:#9ca3af;display:block;}.project-card{margin-bottom:12px;}.project-name{font-size:0.88em;font-weight:700;color:#1a1a1a;}.project-desc{font-size:0.82em;color:#6b7280;margin-top:3px;}`
  },

  'horizon': { name: 'Horizon', category: 'Modern Style', accent: '#0891b2', thumbnail: 'single-column',
    html: `<div class="hz-page"><div class="hz-band"><div class="hz-band-inner"><h1 class="hz-name">{{name}}</h1><div class="hz-contact"><span>{{email}}</span><span>{{phone}}</span><span>{{location}}</span></div></div></div><div class="hz-body"><div class="hz-left"><section class="hz-sec"><h2 class="hz-h2">Profile</h2><p class="hz-p">{{summary}}</p></section><section class="hz-sec"><h2 class="hz-h2">Experience</h2>{{experience}}</section><section class="hz-sec"><h2 class="hz-h2">Projects</h2>{{projects}}</section></div><div class="hz-right"><section class="hz-sec"><h2 class="hz-h2">Skills</h2>{{skills}}</section><section class="hz-sec"><h2 class="hz-h2">Education</h2>{{education}}</section></div></div></div>`,
    css: `.hz-page{font-family:var(--font-family);background:#fff;font-size:var(--base-font-size);min-height:1130px;}.hz-band{background:linear-gradient(90deg,var(--primary-color),#0e7490);padding:36px 52px;}.hz-name{font-size:2.4em;font-weight:900;color:#fff;margin:0 0 10px;letter-spacing:-1px;}.hz-contact{display:flex;gap:16px;flex-wrap:wrap;}.hz-contact span{font-size:0.82em;color:rgba(255,255,255,0.75);background:rgba(255,255,255,0.1);padding:3px 10px;border-radius:20px;}.hz-body{display:grid;grid-template-columns:1fr var(--sidebar-width);padding:36px 52px;gap:40px;}.hz-sec{margin-bottom:28px;}.hz-h2{font-size:0.75em;font-weight:800;color:var(--primary-color);letter-spacing:2.5px;text-transform:uppercase;border-bottom:2px solid var(--primary-color);padding-bottom:4px;margin:0 0 14px;}.hz-p{font-size:0.93em;color:#374151;line-height:1.75;}.card-side{display:none;}.work-card{margin-bottom:20px;}.card-header{display:flex;justify-content:space-between;align-items:baseline;margin-bottom:3px;}.position{font-size:1em;font-weight:700;color:#111827;}.company{font-size:0.88em;color:var(--primary-color);font-weight:600;margin-bottom:6px;}.date{font-size:0.78em;color:#9ca3af;}.summary{font-size:0.88em;color:#374151;line-height:1.6;}.skill-row{background:#cffafe;border-radius:6px;padding:7px 10px;margin-bottom:8px;}.skill-meta{font-size:0.85em;font-weight:600;color:#164e63;}.skill-track,.skill-fill,.skill-val{display:none;}.edu-card{margin-bottom:14px;}.edu-info .area{font-size:0.9em;font-weight:700;color:#111827;}.edu-info .institution{font-size:0.82em;color:#6b7280;}.edu-date{font-size:0.75em;color:#9ca3af;display:block;}.project-card{margin-bottom:12px;padding:10px;background:#ecfeff;border-radius:8px;border-left:3px solid var(--primary-color);}.project-name{font-size:0.9em;font-weight:700;color:#111827;}.project-desc{font-size:0.82em;color:#6b7280;margin-top:3px;}`
  },

  'mosaic': { name: 'Mosaic', category: 'Creative Style', accent: '#ea580c', thumbnail: 'two-column',
    html: `<div class="mo-page"><div class="mo-header"><div class="mo-block1"></div><div class="mo-block2"></div><div class="mo-title"><h1 class="mo-name">{{name}}</h1><p class="mo-sub">{{email}} · {{phone}} · {{location}}</p></div></div><div class="mo-body"><div class="mo-main"><section class="mo-sec"><h2 class="mo-h2">Overview</h2><p class="mo-p">{{summary}}</p></section><section class="mo-sec"><h2 class="mo-h2">Experience</h2>{{experience}}</section><section class="mo-sec"><h2 class="mo-h2">Projects</h2>{{projects}}</section></div><div class="mo-side"><section class="mo-ssec"><h3 class="mo-sh">Skills</h3>{{skills}}</section><section class="mo-ssec"><h3 class="mo-sh">Education</h3>{{education}}</section></div></div></div>`,
    css: `.mo-page{font-family:var(--font-family);background:#fff;font-size:var(--base-font-size);min-height:1130px;}.mo-header{position:relative;height:120px;overflow:hidden;}.mo-block1{position:absolute;top:0;left:0;width:60%;height:100%;background:var(--primary-color);}.mo-block2{position:absolute;top:0;right:0;width:42%;height:100%;background:#0f172a;}.mo-title{position:absolute;bottom:20px;left:40px;right:40px;z-index:2;}.mo-name{font-size:2.4em;font-weight:900;color:#fff;margin:0 0 6px;letter-spacing:-1px;text-shadow:0 2px 8px rgba(0,0,0,0.3);}.mo-sub{font-size:0.82em;color:rgba(255,255,255,0.75);}.mo-body{display:grid;grid-template-columns:1fr var(--sidebar-width);padding:32px 40px;gap:36px;}.mo-sec{margin-bottom:26px;}.mo-h2{font-size:0.78em;font-weight:800;color:var(--primary-color);text-transform:uppercase;letter-spacing:2px;border-bottom:2px solid var(--primary-color);padding-bottom:5px;margin:0 0 14px;}.mo-p{font-size:0.93em;color:#374151;line-height:1.75;}.mo-ssec{margin-bottom:22px;}.mo-sh{font-size:0.72em;font-weight:800;letter-spacing:2px;color:#0f172a;text-transform:uppercase;margin:0 0 12px;}.card-side{display:none;}.work-card{margin-bottom:18px;}.card-header{display:flex;justify-content:space-between;align-items:baseline;margin-bottom:3px;}.position{font-size:1em;font-weight:700;color:#111827;}.company{font-size:0.88em;color:var(--primary-color);font-weight:600;margin-bottom:6px;}.date{font-size:0.78em;color:#9ca3af;}.summary{font-size:0.88em;color:#374151;line-height:1.6;}.skill-row{padding:6px 10px;background:#fff7ed;border-radius:6px;margin-bottom:8px;border-left:3px solid var(--primary-color);}.skill-meta{font-size:0.85em;font-weight:600;color:#7c2d12;}.skill-track,.skill-fill,.skill-val{display:none;}.edu-card{margin-bottom:14px;}.edu-info .area{font-size:0.9em;font-weight:700;color:#111827;}.edu-info .institution{font-size:0.82em;color:#6b7280;}.edu-date{font-size:0.75em;color:#9ca3af;display:block;}.project-card{margin-bottom:12px;padding:10px;background:#fff7ed;border-radius:6px;}.project-name{font-size:0.9em;font-weight:700;color:#111827;}.project-desc{font-size:0.82em;color:#6b7280;margin-top:3px;}`
  },

  'velvet': { name: 'Velvet', category: 'Executive Style', accent: '#9333ea', thumbnail: 'two-column',
    html: `<div class="vl-page"><div class="vl-sidebar"><div class="vl-avatar">{{initials}}</div><h1 class="vl-name">{{name}}</h1><p class="vl-tagline">{{website}}</p><div class="vl-divider"></div><h3 class="vl-sh">Contact</h3><p class="vl-si">{{email}}</p><p class="vl-si">{{phone}}</p><p class="vl-si">{{location}}</p><div class="vl-divider"></div><h3 class="vl-sh">Skills</h3>{{skills}}<div class="vl-divider"></div><h3 class="vl-sh">Education</h3>{{education}}</div><div class="vl-main"><section class="vl-sec"><h2 class="vl-h2">About</h2><p class="vl-p">{{summary}}</p></section><section class="vl-sec"><h2 class="vl-h2">Career</h2>{{experience}}</section><section class="vl-sec"><h2 class="vl-h2">Projects</h2>{{projects}}</section></div></div>`,
    css: `.vl-page{display:grid;grid-template-columns:var(--sidebar-width) 1fr;font-family:var(--font-family);font-size:var(--base-font-size);min-height:1130px;}.vl-sidebar{background:#1a0533;padding:48px 28px;color:#e9d5ff;}.vl-avatar{width:68px;height:68px;border-radius:50%;background:var(--primary-color);color:#fff;font-size:1.8em;font-weight:900;display:flex;align-items:center;justify-content:center;margin-bottom:16px;box-shadow:0 0 30px rgba(147,51,234,0.4);}.vl-name{font-size:1.4em;font-weight:800;color:#f3e8ff;margin:0 0 6px;}.vl-tagline{font-size:0.78em;color:rgba(233,213,255,0.5);margin-bottom:24px;word-break:break-all;}.vl-divider{height:1px;background:rgba(233,213,255,0.1);margin:20px 0;}.vl-sh{font-size:0.68em;letter-spacing:3px;color:var(--primary-color);font-weight:800;text-transform:uppercase;margin:0 0 12px;}.vl-si{font-size:0.8em;color:rgba(233,213,255,0.6);margin-bottom:7px;word-break:break-all;}.vl-main{padding:48px 40px;background:#fff;}.vl-sec{margin-bottom:32px;}.vl-h2{font-size:1em;font-weight:800;color:var(--primary-color);margin:0 0 18px;border-bottom:2px solid var(--primary-color);padding-bottom:6px;opacity:0.9;}.vl-p{font-size:0.93em;color:#374151;line-height:1.75;}.card-side{display:none;}.work-card{margin-bottom:22px;}.card-header{display:flex;justify-content:space-between;align-items:baseline;margin-bottom:3px;}.position{font-size:1em;font-weight:700;color:#1a0533;}.company{font-size:0.88em;color:var(--primary-color);font-weight:600;margin-bottom:7px;}.date{font-size:0.78em;color:#9ca3af;}.summary{font-size:0.88em;color:#374151;line-height:1.6;}.skill-row{padding:5px 0;border-bottom:1px solid rgba(233,213,255,0.1);}.skill-meta{font-size:0.82em;color:rgba(233,213,255,0.8);}.skill-track,.skill-fill,.skill-val{display:none;}.edu-card{margin-bottom:12px;}.edu-info .area{font-size:0.88em;font-weight:700;color:#f3e8ff;}.edu-info .institution{font-size:0.8em;color:rgba(233,213,255,0.45);}.edu-date{font-size:0.75em;color:rgba(233,213,255,0.3);display:block;}.project-card{margin-bottom:14px;padding:12px;background:#fdf4ff;border-radius:8px;border-left:3px solid var(--primary-color);}.project-name{font-size:0.9em;font-weight:700;color:#1a0533;}.project-desc{font-size:0.82em;color:#6b7280;margin-top:3px;}`
  },

  'circuit': { name: 'Circuit', category: 'Tech Style', accent: '#15803d', thumbnail: 'single-column',
    html: `<div class="ci-page"><header class="ci-header"><div class="ci-corner-tl"></div><div class="ci-corner-br"></div><h1 class="ci-name">{{name}}</h1><div class="ci-links"><span class="ci-chip">{{email}}</span><span class="ci-chip">{{phone}}</span><span class="ci-chip">{{location}}</span></div></header><div class="ci-grid"><div class="ci-main"><section class="ci-sec"><h2 class="ci-h2">README.md</h2><p class="ci-p">{{summary}}</p></section><section class="ci-sec"><h2 class="ci-h2">Work History</h2>{{experience}}</section></div><div class="ci-side"><section class="ci-sec"><h2 class="ci-h2">Tech Stack</h2>{{skills}}</section><section class="ci-sec"><h2 class="ci-h2">Education</h2>{{education}}</section><section class="ci-sec"><h2 class="ci-h2">Projects</h2>{{projects}}</section></div></div></div>`,
    css: `.ci-page{font-family:var(--font-family);background:#f0fdf4;font-size:var(--base-font-size);min-height:1130px;}.ci-header{background:#052e16;padding:36px 48px;position:relative;overflow:hidden;}.ci-corner-tl{position:absolute;top:0;left:0;width:80px;height:80px;border-right:2px solid var(--primary-color);border-bottom:2px solid var(--primary-color);border-radius:0 0 8px 0;opacity:0.3;}.ci-corner-br{position:absolute;bottom:0;right:0;width:80px;height:80px;border-left:2px solid var(--primary-color);border-top:2px solid var(--primary-color);border-radius:8px 0 0 0;opacity:0.3;}.ci-name{font-size:2.2em;font-weight:900;color:#bbf7d0;margin:0 0 14px;letter-spacing:-0.5px;}.ci-links{display:flex;gap:10px;flex-wrap:wrap;}.ci-chip{font-size:0.78em;color:var(--primary-color);background:rgba(21,128,61,0.15);border:1px solid rgba(21,128,61,0.3);padding:3px 10px;border-radius:4px;}.ci-grid{display:grid;grid-template-columns:1fr 260px;padding:32px 48px;gap:36px;background:#fff;}.ci-sec{margin-bottom:28px;}.ci-h2{font-family:monospace;font-size:0.78em;font-weight:700;color:var(--primary-color);margin:0 0 14px;letter-spacing:1px;}.ci-p{font-size:0.93em;color:#374151;line-height:1.75;}.card-side{display:none;}.work-card{margin-bottom:20px;padding:12px;background:#f0fdf4;border-radius:6px;border-left:3px solid var(--primary-color);}.card-header{display:flex;justify-content:space-between;align-items:baseline;margin-bottom:3px;}.position{font-size:1em;font-weight:700;color:#052e16;}.company{font-size:0.88em;color:var(--primary-color);font-weight:600;margin-bottom:6px;font-family:monospace;}.date{font-size:0.78em;color:#9ca3af;font-family:monospace;}.summary{font-size:0.88em;color:#374151;line-height:1.6;}.skill-row{background:#dcfce7;border-radius:4px;padding:6px 10px;margin-bottom:7px;font-family:monospace;}.skill-meta{font-size:0.82em;font-weight:600;color:#052e16;}.skill-track,.skill-fill,.skill-val{display:none;}.edu-card{margin-bottom:14px;}.edu-info .area{font-size:0.9em;font-weight:700;color:#052e16;}.edu-info .institution{font-size:0.82em;color:#6b7280;font-family:monospace;}.edu-date{font-size:0.75em;color:#9ca3af;display:block;}.project-card{margin-bottom:12px;padding:8px;background:#f0fdf4;border-radius:6px;}.project-name{font-size:0.88em;font-weight:700;color:#052e16;font-family:monospace;}.project-desc{font-size:0.8em;color:#6b7280;margin-top:3px;}`
  },

  'diplomat': { name: 'Diplomat', category: 'Corporate Style', accent: '#1e40af', thumbnail: 'single-column',
    html: `<div class="di-page"><div class="di-top-rule"></div><header class="di-header"><h1 class="di-name">{{name}}</h1><div class="di-contact">{{email}} &nbsp;◆&nbsp; {{phone}} &nbsp;◆&nbsp; {{location}} &nbsp;◆&nbsp; {{website}}</div></header><div class="di-rule"></div><div class="di-body"><div class="di-main"><section class="di-sec"><h2 class="di-h2">Executive Profile</h2><p class="di-p">{{summary}}</p></section><section class="di-sec"><h2 class="di-h2">Professional Experience</h2>{{experience}}</section><section class="di-sec"><h2 class="di-h2">Notable Projects</h2>{{projects}}</section></div><div class="di-side"><section class="di-ssec"><h3 class="di-sh">Core Competencies</h3>{{skills}}</section><section class="di-ssec"><h3 class="di-sh">Education</h3>{{education}}</section></div></div><div class="di-bottom-rule"></div></div>`,
    css: `.di-page{font-family:var(--font-family);background:#fff;font-size:var(--base-font-size);min-height:1130px;border:12px solid var(--primary-color);position:relative;}.di-top-rule{height:4px;background:linear-gradient(90deg,var(--primary-color),#1e3a8a,var(--primary-color));}.di-header{text-align:center;padding:36px 60px 20px;}.di-name{font-size:2.6em;font-weight:900;color:var(--primary-color);margin:0 0 10px;letter-spacing:-0.5px;}.di-contact{font-size:0.82em;color:#4b5563;letter-spacing:0.5px;}.di-rule{height:1px;background:linear-gradient(90deg,transparent,var(--primary-color),transparent);margin:0 60px 24px;}.di-body{display:grid;grid-template-columns:1fr 240px;padding:0 48px 36px;gap:36px;}.di-main{}.di-side{padding-left:24px;border-left:1px solid #dbeafe;}.di-sec{margin-bottom:28px;}.di-h2{font-size:0.82em;font-weight:800;color:var(--primary-color);text-transform:uppercase;letter-spacing:2px;border-bottom:1px solid #dbeafe;padding-bottom:6px;margin:0 0 16px;}.di-p{font-size:0.93em;color:#374151;line-height:1.75;text-align:justify;}.di-ssec{margin-bottom:24px;}.di-sh{font-size:0.75em;font-weight:800;letter-spacing:2px;color:var(--primary-color);text-transform:uppercase;margin:0 0 12px;}.card-side{display:none;}.work-card{margin-bottom:22px;}.card-header{display:flex;justify-content:space-between;align-items:baseline;margin-bottom:3px;}.position{font-size:1em;font-weight:700;color:#1e293b;}.company{font-size:0.88em;color:var(--primary-color);font-weight:600;margin-bottom:7px;}.date{font-size:0.78em;color:#9ca3af;}.summary{font-size:0.88em;color:#374151;line-height:1.65;}.skill-row{padding:7px 10px;background:#eff6ff;border-radius:6px;margin-bottom:8px;border-left:3px solid var(--primary-color);}.skill-meta{font-size:0.85em;font-weight:600;color:#1e3a8a;}.skill-track,.skill-fill,.skill-val{display:none;}.edu-card{margin-bottom:14px;}.edu-info .area{font-size:0.9em;font-weight:700;color:#1e293b;}.edu-info .institution{font-size:0.82em;color:#6b7280;}.edu-date{font-size:0.75em;color:#9ca3af;display:block;}.project-card{margin-bottom:12px;padding:10px;background:#eff6ff;border-radius:6px;}.project-name{font-size:0.9em;font-weight:700;color:#1e293b;}.project-desc{font-size:0.82em;color:#6b7280;margin-top:3px;}.di-bottom-rule{height:4px;background:linear-gradient(90deg,var(--primary-color),#1e3a8a,var(--primary-color));}`
  },
  'avatar-pro': { name: 'Avatar Pro', category: 'Executive Style', accent: '#1f2937', thumbnail: 'single-column',
    html: `<div class="av-page"><header class="av-header"><div class="av-header-inner">{{profileImage}}<div class="av-header-text"><h1 class="av-name">{{name}}</h1><div class="av-contact"><span>{{email}}</span><span>{{phone}}</span><span>{{location}}</span></div></div></div></header><div class="av-body"><section class="av-sec"><h2 class="av-h2">Profile</h2><p class="av-p">{{summary}}</p></section><section class="av-sec"><h2 class="av-h2">Experience</h2>{{experience}}</section><div class="av-two"><div><h2 class="av-h2">Education</h2>{{education}}</div><div><h2 class="av-h2">Skills</h2>{{skills}}</div></div><section class="av-sec"><h2 class="av-h2" style="margin-top:20px">Projects</h2>{{projects}}</section></div></div>`,
    css: `.av-page{font-family:var(--font-family);background:#fff;font-size:var(--base-font-size);min-height:1130px;}.av-header{padding:48px 56px 32px;background:#f9fafb;border-bottom:1px solid #e5e7eb;}.av-header-inner{display:flex;flex-direction:var(--header-flex-dir);align-items:var(--header-align-items);text-align:var(--image-text-align);gap:28px;}.profile-img{width:110px;height:110px;border-radius:var(--image-radius);background-size:cover;background-position:center;flex-shrink:0;box-shadow:0 4px 12px rgba(0,0,0,0.08);}.profile-img.fallback{background:var(--primary-color);color:#fff;display:flex;align-items:center;justify-content:center;font-size:36px;font-weight:bold;}.av-name{font-size:2.8em;font-weight:800;color:#111827;margin:0 0 8px;letter-spacing:-0.5px;}.av-contact{display:flex;gap:16px;flex-wrap:wrap;justify-content:inherit;}.av-contact span{font-size:0.85em;color:#4b5563;font-weight:500;}.av-body{padding:36px 56px;}.av-two{display:grid;grid-template-columns:1fr 1fr;gap:32px;}.av-sec{margin-bottom:28px;}.av-h2{font-size:0.85em;font-weight:800;color:var(--primary-color);letter-spacing:1.5px;text-transform:uppercase;border-bottom:2px solid #e5e7eb;padding-bottom:6px;margin:0 0 16px;}.av-p{font-size:0.95em;color:#374151;line-height:1.7;}.card-side{display:none;}.work-card{margin-bottom:20px;}.card-header{display:flex;justify-content:space-between;align-items:baseline;margin-bottom:4px;}.position{font-size:1.05em;font-weight:700;color:#111827;}.company{font-size:0.9em;color:var(--primary-color);font-weight:600;margin-bottom:8px;}.date{font-size:0.85em;color:#6b7280;font-weight:500;}.summary{font-size:0.9em;color:#4b5563;line-height:1.65;}.skill-row{display:flex;align-items:center;margin-bottom:8px;}.skill-meta{width:120px;font-size:0.85em;font-weight:600;color:#374151;}.skill-track{flex:1;height:6px;background:#e5e7eb;border-radius:3px;overflow:hidden;margin-left:12px;}.skill-fill{height:100%;background:var(--primary-color);}.skill-val{display:none;}.edu-card{margin-bottom:16px;}.edu-info .area{font-size:0.95em;font-weight:700;color:#111827;}.edu-info .institution{font-size:0.85em;color:#4b5563;margin-top:2px;}.edu-date{font-size:0.8em;color:#6b7280;display:block;margin-top:4px;}.project-card{margin-bottom:16px;}.project-name{font-size:0.95em;font-weight:700;color:#111827;}.project-desc{font-size:0.88em;color:#4b5563;margin-top:4px;line-height:1.6;}`
  },
  'profile-wave': { name: 'Profile Wave', category: 'Creative Style', accent: '#4f46e5', thumbnail: 'single-column',
    html: `<div class="wv-page"><div class="wv-hero"><div class="wv-hero-inner">{{profileImage}}<div class="wv-hero-text"><h1 class="wv-name">{{name}}</h1><p class="wv-contact">{{email}} | {{phone}} | {{location}}</p></div></div><svg class="wv-svg" viewBox="0 0 1440 120" preserveAspectRatio="none"><path fill="#ffffff" d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z"></path></svg></div><div class="wv-body"><section class="wv-sec full"><h2 class="wv-h2">About Me</h2><p class="wv-p">{{summary}}</p></section><div class="wv-grid"><div class="wv-main"><section class="wv-sec"><h2 class="wv-h2">Experience</h2>{{experience}}</section><section class="wv-sec"><h2 class="wv-h2">Projects</h2>{{projects}}</section></div><div class="wv-side"><section class="wv-sec"><h2 class="wv-h2">Education</h2>{{education}}</section><section class="wv-sec"><h2 class="wv-h2">Skills</h2>{{skills}}</section></div></div></div></div>`,
    css: `.wv-page{font-family:var(--font-family);background:#fff;font-size:var(--base-font-size);min-height:1130px;}.wv-hero{background:linear-gradient(135deg,var(--primary-color),#312e81);padding:48px 56px 0;position:relative;color:#fff;}.wv-hero-inner{display:flex;flex-direction:var(--header-flex-dir);align-items:var(--header-align-items);text-align:var(--image-text-align);gap:24px;position:relative;z-index:2;padding-bottom:32px;}.profile-img{width:120px;height:120px;border-radius:var(--image-radius);background-size:cover;background-position:center;border:4px solid rgba(255,255,255,0.3);flex-shrink:0;}.profile-img.fallback{background:rgba(255,255,255,0.2);color:#fff;display:flex;align-items:center;justify-content:center;font-size:40px;font-weight:bold;}.wv-name{font-size:3em;font-weight:900;margin:0 0 8px;letter-spacing:-1px;}.wv-contact{font-size:0.9em;opacity:0.9;margin:0;font-weight:500;}.wv-svg{position:absolute;bottom:0;left:0;width:100%;height:40px;display:block;}.wv-body{padding:24px 56px 48px;}.wv-grid{display:grid;grid-template-columns:1fr var(--sidebar-width);gap:40px;}.wv-sec{margin-bottom:28px;}.wv-h2{font-size:1.1em;font-weight:800;color:#111827;margin:0 0 16px;position:relative;display:inline-block;}.wv-h2::after{content:'';position:absolute;bottom:-4px;left:0;width:40px;height:4px;background:var(--primary-color);border-radius:2px;}.wv-p{font-size:0.95em;color:#4b5563;line-height:1.7;}.card-side{display:none;}.work-card{margin-bottom:24px;}.card-header{margin-bottom:6px;}.position{font-size:1.05em;font-weight:800;color:#111827;}.company{font-size:0.9em;color:var(--primary-color);font-weight:700;display:inline-block;margin-right:12px;}.date{font-size:0.85em;color:#6b7280;background:#f3f4f6;padding:2px 8px;border-radius:12px;font-weight:600;}.summary{font-size:0.9em;color:#4b5563;line-height:1.6;margin-top:8px;}.skill-row{margin-bottom:12px;}.skill-meta{display:flex;justify-content:space-between;font-size:0.85em;font-weight:700;color:#374151;margin-bottom:4px;}.skill-track{height:8px;background:#f3f4f6;border-radius:4px;overflow:hidden;}.skill-fill{height:100%;background:var(--primary-color);border-radius:4px;}.edu-card{margin-bottom:16px;padding-left:16px;border-left:2px solid #e5e7eb;}.edu-info .area{font-size:0.95em;font-weight:800;color:#111827;}.edu-info .institution{font-size:0.85em;color:var(--primary-color);font-weight:600;margin-top:2px;}.edu-date{font-size:0.8em;color:#6b7280;margin-top:4px;}.project-card{margin-bottom:16px;}.project-name{font-size:1em;font-weight:800;color:#111827;}.project-desc{font-size:0.9em;color:#4b5563;margin-top:4px;line-height:1.6;}`
  },
  'elegant-face': { name: 'Elegant Face', category: 'Executive Style', accent: '#0f172a', thumbnail: 'single-column',
    html: `<div class="ef-page"><div class="ef-sidebar"><div class="ef-profile">{{profileImage}}</div><h1 class="ef-name">{{name}}</h1><p class="ef-contact">{{email}}<br>{{phone}}<br>{{location}}</p><div class="ef-divider"></div><h2 class="ef-h2">Skills</h2><div class="ef-skills">{{skills}}</div><div class="ef-divider"></div><h2 class="ef-h2">Education</h2><div class="ef-edu">{{education}}</div></div><div class="ef-main"><section class="ef-sec"><h2 class="ef-h2-main">Executive Summary</h2><p class="ef-p">{{summary}}</p></section><section class="ef-sec"><h2 class="ef-h2-main">Professional Experience</h2>{{experience}}</section><section class="ef-sec"><h2 class="ef-h2-main">Projects</h2>{{projects}}</section></div></div>`,
    css: `.ef-page{font-family:var(--font-family);background:#fff;font-size:var(--base-font-size);min-height:1130px;display:flex;}.ef-sidebar{width:var(--sidebar-width);background:#f8fafc;padding:48px 32px;border-right:1px solid #e2e8f0;}.ef-profile{display:flex;justify-content:center;margin-bottom:24px;}.profile-img{width:140px;height:140px;border-radius:var(--image-radius);background-size:cover;background-position:center;border:1px solid #cbd5e1;box-shadow:0 10px 15px -3px rgba(0,0,0,0.1);}.profile-img.fallback{background:var(--primary-color);color:#fff;display:flex;align-items:center;justify-content:center;font-size:48px;font-weight:300;}.ef-name{font-size:2.2em;font-weight:300;color:#0f172a;text-align:center;margin:0 0 16px;line-height:1.2;}.ef-contact{font-size:0.85em;color:#475569;text-align:center;line-height:1.8;}.ef-divider{height:1px;background:#cbd5e1;margin:24px 0;}.ef-h2{font-size:0.8em;font-weight:700;color:var(--primary-color);letter-spacing:2px;text-transform:uppercase;margin:0 0 16px;text-align:center;}.ef-skills .skill-row{margin-bottom:12px;}.ef-skills .skill-meta{display:flex;justify-content:space-between;font-size:0.8em;font-weight:600;color:#334155;margin-bottom:4px;}.ef-skills .skill-track{height:4px;background:#e2e8f0;border-radius:2px;}.ef-skills .skill-fill{height:100%;background:var(--primary-color);}.ef-edu .edu-card{margin-bottom:16px;text-align:center;}.ef-edu .area{font-size:0.9em;font-weight:700;color:#0f172a;}.ef-edu .institution{font-size:0.8em;color:#475569;margin-top:2px;}.ef-edu .edu-date{font-size:0.75em;color:#64748b;margin-top:2px;}.ef-main{flex:1;padding:48px 56px;}.ef-sec{margin-bottom:36px;}.ef-h2-main{font-size:1.4em;font-weight:300;color:var(--primary-color);border-bottom:1px solid #cbd5e1;padding-bottom:8px;margin:0 0 20px;}.ef-p{font-size:0.95em;color:#334155;line-height:1.8;}.card-side{display:none;}.work-card{margin-bottom:28px;}.card-header{margin-bottom:6px;}.position{font-size:1.1em;font-weight:600;color:#0f172a;}.company{font-size:0.95em;color:var(--primary-color);font-weight:500;display:block;margin-bottom:4px;}.date{font-size:0.85em;color:#64748b;font-style:italic;}.summary{font-size:0.95em;color:#334155;line-height:1.7;margin-top:8px;}.project-card{margin-bottom:20px;}.project-name{font-size:1.05em;font-weight:600;color:#0f172a;}.project-desc{font-size:0.9em;color:#334155;margin-top:4px;line-height:1.7;}`
  },
  'modern-split': { name: 'Modern Split', category: 'Modern Style', accent: '#059669', thumbnail: 'single-column',
    html: `<div class="ms-page"><header class="ms-header"><div class="ms-inner">{{profileImage}}<div class="ms-text"><h1 class="ms-name">{{name}}</h1><h2 class="ms-title">{{email}} • {{phone}} • {{location}}</h2></div></div></header><div class="ms-body"><div class="ms-col1"><section class="ms-sec"><h3 class="ms-h3">Profile</h3><p class="ms-p">{{summary}}</p></section><section class="ms-sec"><h3 class="ms-h3">Skills</h3><div class="ms-skills">{{skills}}</div></section><section class="ms-sec"><h3 class="ms-h3">Education</h3>{{education}}</section></div><div class="ms-col2"><section class="ms-sec"><h3 class="ms-h3">Experience</h3>{{experience}}</section><section class="ms-sec"><h3 class="ms-h3">Projects</h3>{{projects}}</section></div></div></div>`,
    css: `.ms-page{font-family:var(--font-family);background:#fff;font-size:var(--base-font-size);min-height:1130px;}.ms-header{background:#111827;color:#fff;padding:48px 56px;}.ms-inner{display:flex;flex-direction:var(--header-flex-dir);align-items:var(--header-align-items);text-align:var(--image-text-align);gap:32px;}.profile-img{width:96px;height:96px;border-radius:var(--image-radius);background-size:cover;background-position:center;border:2px solid var(--primary-color);flex-shrink:0;}.profile-img.fallback{background:var(--primary-color);color:#fff;display:flex;align-items:center;justify-content:center;font-size:32px;font-weight:bold;}.ms-name{font-size:2.8em;font-weight:800;margin:0 0 8px;letter-spacing:-1px;}.ms-title{font-size:0.95em;font-weight:400;color:#9ca3af;margin:0;letter-spacing:1px;}.ms-body{display:grid;grid-template-columns:30% 1fr;gap:48px;padding:48px 56px;}.ms-sec{margin-bottom:32px;}.ms-h3{font-size:1em;font-weight:800;color:#111827;text-transform:uppercase;letter-spacing:1px;margin:0 0 16px;display:flex;align-items:center;gap:12px;}.ms-h3::after{content:'';flex:1;height:1px;background:#e5e7eb;}.ms-p{font-size:0.9em;color:#4b5563;line-height:1.7;}.ms-skills .skill-row{margin-bottom:12px;}.ms-skills .skill-meta{font-size:0.85em;font-weight:700;color:#374151;margin-bottom:4px;display:flex;justify-content:space-between;}.ms-skills .skill-track{height:6px;background:#f3f4f6;border-radius:3px;}.ms-skills .skill-fill{height:100%;background:var(--primary-color);border-radius:3px;}.edu-card{margin-bottom:16px;}.edu-info .area{font-size:0.9em;font-weight:700;color:#111827;}.edu-info .institution{font-size:0.85em;color:#6b7280;margin-top:2px;}.edu-date{font-size:0.8em;color:var(--primary-color);font-weight:600;margin-top:4px;display:block;}.card-side{display:none;}.work-card{margin-bottom:28px;}.card-header{margin-bottom:4px;}.position{font-size:1.1em;font-weight:700;color:#111827;}.company{font-size:0.95em;color:var(--primary-color);font-weight:600;}.date{font-size:0.85em;color:#6b7280;float:right;font-weight:500;}.summary{font-size:0.9em;color:#4b5563;line-height:1.7;margin-top:8px;clear:both;}.project-card{margin-bottom:20px;}.project-name{font-size:1.05em;font-weight:700;color:#111827;}.project-desc{font-size:0.9em;color:#4b5563;line-height:1.6;margin-top:4px;}`
  },
  'clean-focus': { name: 'Clean Focus', category: 'Minimalist Style', accent: '#2563eb', thumbnail: 'single-column',
    html: `<div class="cf-page"><header class="cf-header"><div class="cf-header-inner">{{profileImage}}<div class="cf-header-text"><h1 class="cf-name">{{name}}</h1><p class="cf-contact">{{email}} | {{phone}} | {{location}}</p></div></div></header><div class="cf-body"><section class="cf-sec"><h2 class="cf-h2">Summary</h2><p class="cf-p">{{summary}}</p></section><div class="cf-grid"><div class="cf-left"><section class="cf-sec"><h2 class="cf-h2">Experience</h2>{{experience}}</section><section class="cf-sec"><h2 class="cf-h2">Projects</h2>{{projects}}</section></div><div class="cf-right"><section class="cf-sec"><h2 class="cf-h2">Education</h2>{{education}}</section><section class="cf-sec"><h2 class="cf-h2">Skills</h2>{{skills}}</section></div></div></div></div>`,
    css: `.cf-page{font-family:var(--font-family);background:#fff;font-size:var(--base-font-size);min-height:1130px;}.cf-header{padding:48px 56px 24px;border-bottom:2px solid #f3f4f6;}.cf-header-inner{display:flex;flex-direction:var(--header-flex-dir);align-items:var(--header-align-items);text-align:var(--image-text-align);gap:24px;}.profile-img{width:80px;height:80px;border-radius:var(--image-radius);background-size:cover;background-position:center;flex-shrink:0;}.profile-img.fallback{background:var(--primary-color);color:#fff;display:flex;align-items:center;justify-content:center;font-size:28px;font-weight:600;}.cf-name{font-size:2.4em;font-weight:700;color:#111827;margin:0 0 8px;letter-spacing:-0.5px;}.cf-contact{font-size:0.9em;color:#6b7280;margin:0;}.cf-body{padding:32px 56px;}.cf-sec{margin-bottom:28px;}.cf-h2{font-size:0.9em;font-weight:700;color:#111827;text-transform:uppercase;letter-spacing:1px;margin:0 0 16px;color:var(--primary-color);}.cf-p{font-size:0.95em;color:#374151;line-height:1.7;}.cf-grid{display:grid;grid-template-columns:1fr var(--sidebar-width);gap:40px;}.card-side{display:none;}.work-card{margin-bottom:24px;}.card-header{margin-bottom:4px;}.position{font-size:1.05em;font-weight:600;color:#111827;}.company{font-size:0.9em;color:#4b5563;font-weight:500;}.date{font-size:0.85em;color:#9ca3af;float:right;}.summary{font-size:0.95em;color:#374151;line-height:1.6;margin-top:8px;clear:both;}.edu-card{margin-bottom:16px;}.edu-info .area{font-size:0.95em;font-weight:600;color:#111827;}.edu-info .institution{font-size:0.85em;color:#6b7280;margin-top:2px;}.edu-date{font-size:0.8em;color:#9ca3af;display:block;margin-top:2px;}.skill-row{display:flex;align-items:center;justify-content:space-between;padding:8px 0;border-bottom:1px solid #f3f4f6;}.skill-meta{font-size:0.9em;font-weight:500;color:#374151;}.skill-val{font-size:0.8em;color:var(--primary-color);font-weight:600;}.skill-track,.skill-fill{display:none;}.project-card{margin-bottom:20px;}.project-name{font-size:1em;font-weight:600;color:#111827;}.project-desc{font-size:0.9em;color:#4b5563;line-height:1.6;margin-top:4px;}`
  },
  'bold-vision': { name: 'Bold Vision', category: 'Creative Style', accent: '#dc2626', thumbnail: 'single-column',
    html: `<div class="bv-page"><div class="bv-sidebar"><div class="bv-profile-wrapper">{{profileImage}}</div><h2 class="bv-h2-side">Contact</h2><p class="bv-contact-item">{{email}}</p><p class="bv-contact-item">{{phone}}</p><p class="bv-contact-item">{{location}}</p><h2 class="bv-h2-side">Skills</h2><div class="bv-skills">{{skills}}</div></div><div class="bv-main"><header class="bv-header"><h1 class="bv-name">{{name}}</h1></header><section class="bv-sec"><h2 class="bv-h2">About</h2><p class="bv-p">{{summary}}</p></section><section class="bv-sec"><h2 class="bv-h2">Experience</h2>{{experience}}</section><section class="bv-sec"><h2 class="bv-h2">Education</h2>{{education}}</section></div></div>`,
    css: `.bv-page{font-family:var(--font-family);background:#fff;font-size:var(--base-font-size);min-height:1130px;display:flex;}.bv-sidebar{width:var(--sidebar-width);background:var(--primary-color);color:#fff;padding:48px 32px;}.bv-profile-wrapper{display:flex;justify-content:center;margin-bottom:40px;}.profile-img{width:130px;height:130px;border-radius:var(--image-radius);background-size:cover;background-position:center;border:4px solid rgba(255,255,255,0.2);}.profile-img.fallback{background:#fff;color:var(--primary-color);display:flex;align-items:center;justify-content:center;font-size:48px;font-weight:900;}.bv-h2-side{font-size:1.1em;font-weight:800;margin:0 0 16px;text-transform:uppercase;letter-spacing:1px;border-bottom:2px solid rgba(255,255,255,0.2);padding-bottom:8px;}.bv-contact-item{font-size:0.85em;margin:0 0 12px;opacity:0.9;}.bv-skills .skill-row{margin-bottom:12px;}.bv-skills .skill-meta{font-size:0.85em;font-weight:600;margin-bottom:4px;display:flex;justify-content:space-between;}.bv-skills .skill-track{height:6px;background:rgba(255,255,255,0.2);border-radius:3px;}.bv-skills .skill-fill{height:100%;background:#fff;border-radius:3px;}.bv-main{flex:1;padding:48px 56px;}.bv-header{margin-bottom:40px;}.bv-name{font-size:3.5em;font-weight:900;color:#111827;margin:0;line-height:1.1;letter-spacing:-1px;}.bv-sec{margin-bottom:36px;}.bv-h2{font-size:1.4em;font-weight:800;color:#111827;margin:0 0 20px;display:flex;align-items:center;gap:16px;}.bv-h2::after{content:'';flex:1;height:2px;background:#f3f4f6;}.bv-p{font-size:0.95em;color:#4b5563;line-height:1.8;}.card-side{display:none;}.work-card{margin-bottom:28px;}.card-header{margin-bottom:6px;}.position{font-size:1.15em;font-weight:800;color:#111827;}.company{font-size:0.95em;color:var(--primary-color);font-weight:700;}.date{font-size:0.85em;color:#6b7280;float:right;font-weight:600;}.summary{font-size:0.95em;color:#4b5563;line-height:1.7;margin-top:8px;clear:both;}.edu-card{margin-bottom:20px;}.edu-info .area{font-size:1.05em;font-weight:800;color:#111827;}.edu-info .institution{font-size:0.9em;color:#6b7280;margin-top:4px;}.edu-date{font-size:0.85em;color:var(--primary-color);font-weight:700;display:block;margin-top:4px;}`
  },
  'tech-squad': { name: 'Tech Squad', category: 'Tech Style', accent: '#8b5cf6', thumbnail: 'single-column',
    html: `<div class="ts-page"><header class="ts-header"><div class="ts-header-inner">{{profileImage}}<div class="ts-header-text"><h1 class="ts-name">{{name}}</h1><div class="ts-contact"><span class="ts-badge">{{email}}</span><span class="ts-badge">{{phone}}</span><span class="ts-badge">{{location}}</span></div></div></div></header><div class="ts-body"><div class="ts-col1"><section class="ts-sec"><h2 class="ts-h2">About</h2><p class="ts-p">{{summary}}</p></section><section class="ts-sec"><h2 class="ts-h2">Experience</h2>{{experience}}</section></div><div class="ts-col2"><section class="ts-sec"><h2 class="ts-h2">Skills</h2><div class="ts-skills">{{skills}}</div></section><section class="ts-sec"><h2 class="ts-h2">Projects</h2>{{projects}}</section><section class="ts-sec"><h2 class="ts-h2">Education</h2>{{education}}</section></div></div></div>`,
    css: `.ts-page{font-family:var(--font-family);background:#f8fafc;font-size:var(--base-font-size);min-height:1130px;}.ts-header{background:#fff;padding:40px 56px;border-bottom:1px solid #e2e8f0;}.ts-header-inner{display:flex;flex-direction:var(--header-flex-dir);align-items:var(--header-align-items);text-align:var(--image-text-align);gap:28px;}.profile-img{width:100px;height:100px;border-radius:var(--image-radius);background-size:cover;background-position:center;border:3px solid var(--primary-color);padding:3px;background-clip:content-box;flex-shrink:0;}.profile-img.fallback{background:var(--primary-color);color:#fff;display:flex;align-items:center;justify-content:center;font-size:36px;font-weight:700;}.ts-name{font-size:2.5em;font-weight:800;color:#0f172a;margin:0 0 12px;letter-spacing:-0.5px;}.ts-contact{display:flex;gap:8px;flex-wrap:wrap;justify-content:inherit;}.ts-badge{font-size:0.8em;background:#f1f5f9;color:#475569;padding:4px 10px;border-radius:6px;font-weight:600;border:1px solid #e2e8f0;}.ts-body{display:grid;grid-template-columns:1fr var(--sidebar-width);gap:32px;padding:32px 56px;}.ts-sec{background:#fff;padding:24px;border-radius:12px;box-shadow:0 1px 3px rgba(0,0,0,0.05);margin-bottom:24px;border:1px solid #e2e8f0;}.ts-h2{font-size:1em;font-weight:700;color:#0f172a;margin:0 0 16px;display:flex;align-items:center;gap:8px;}.ts-h2::before{content:'';width:12px;height:12px;background:var(--primary-color);border-radius:3px;}.ts-p{font-size:0.9em;color:#475569;line-height:1.7;}.card-side{display:none;}.work-card{margin-bottom:24px;padding-bottom:24px;border-bottom:1px solid #e2e8f0;}.work-card:last-child{margin-bottom:0;padding-bottom:0;border-bottom:none;}.card-header{margin-bottom:6px;}.position{font-size:1.05em;font-weight:700;color:#0f172a;}.company{font-size:0.9em;color:var(--primary-color);font-weight:600;}.date{font-size:0.8em;color:#64748b;float:right;background:#f1f5f9;padding:2px 8px;border-radius:4px;}.summary{font-size:0.9em;color:#475569;line-height:1.6;margin-top:12px;clear:both;}.ts-skills .skill-row{margin-bottom:12px;}.ts-skills .skill-meta{font-size:0.85em;font-weight:600;color:#334155;margin-bottom:6px;}.ts-skills .skill-track{height:8px;background:#f1f5f9;border-radius:4px;overflow:hidden;}.ts-skills .skill-fill{height:100%;background:var(--primary-color);}.project-card{margin-bottom:20px;}.project-name{font-size:0.95em;font-weight:700;color:#0f172a;}.project-desc{font-size:0.85em;color:#475569;line-height:1.6;margin-top:6px;}.edu-card{margin-bottom:16px;}.edu-info .area{font-size:0.9em;font-weight:700;color:#0f172a;}.edu-info .institution{font-size:0.85em;color:#475569;margin-top:2px;}.edu-date{font-size:0.8em;color:#64748b;display:block;margin-top:4px;}`
  },
  'gradient-shift': { name: 'Gradient Shift', category: 'Creative Style', accent: '#ec4899', thumbnail: 'single-column',
    html: `<div class="gs-page"><div class="gs-bg"></div><header class="gs-header"><div class="gs-header-inner">{{profileImage}}<div class="gs-header-text"><h1 class="gs-name">{{name}}</h1><p class="gs-contact">{{email}} • {{phone}} • {{location}}</p></div></div></header><div class="gs-body"><section class="gs-sec"><h2 class="gs-h2">About</h2><p class="gs-p">{{summary}}</p></section><div class="gs-grid"><div class="gs-main"><section class="gs-sec"><h2 class="gs-h2">Experience</h2>{{experience}}</section><section class="gs-sec"><h2 class="gs-h2">Projects</h2>{{projects}}</section></div><div class="gs-side"><section class="gs-sec"><h2 class="gs-h2">Skills</h2><div class="gs-skills">{{skills}}</div></section><section class="gs-sec"><h2 class="gs-h2">Education</h2>{{education}}</section></div></div></div></div>`,
    css: `.gs-page{font-family:var(--font-family);background:#fff;font-size:var(--base-font-size);min-height:1130px;position:relative;}.gs-bg{position:absolute;top:0;left:0;width:100%;height:300px;background:linear-gradient(135deg,var(--primary-color),#fb923c);opacity:0.1;z-index:0;}.gs-header{padding:56px 56px 32px;position:relative;z-index:1;}.gs-header-inner{display:flex;flex-direction:var(--header-flex-dir);align-items:var(--header-align-items);text-align:var(--image-text-align);gap:32px;}.profile-img{width:110px;height:110px;border-radius:var(--image-radius);background-size:cover;background-position:center;box-shadow:0 10px 25px -5px rgba(0,0,0,0.1);flex-shrink:0;}.profile-img.fallback{background:var(--primary-color);color:#fff;display:flex;align-items:center;justify-content:center;font-size:36px;font-weight:800;}.gs-name{font-size:3em;font-weight:900;color:#111827;margin:0 0 8px;letter-spacing:-1px;background:linear-gradient(90deg,var(--primary-color),#fb923c);-webkit-background-clip:text;-webkit-text-fill-color:transparent;}.gs-contact{font-size:0.95em;color:#4b5563;font-weight:500;margin:0;}.gs-body{padding:0 56px 48px;position:relative;z-index:1;}.gs-sec{margin-bottom:32px;}.gs-h2{font-size:1.1em;font-weight:800;color:#111827;margin:0 0 16px;display:inline-block;border-bottom:3px solid var(--primary-color);padding-bottom:4px;}.gs-p{font-size:0.95em;color:#4b5563;line-height:1.7;}.gs-grid{display:grid;grid-template-columns:1fr var(--sidebar-width);gap:48px;}.card-side{display:none;}.work-card{margin-bottom:28px;}.card-header{margin-bottom:6px;}.position{font-size:1.1em;font-weight:800;color:#111827;}.company{font-size:0.95em;color:var(--primary-color);font-weight:700;}.date{font-size:0.85em;color:#6b7280;float:right;font-weight:500;}.summary{font-size:0.95em;color:#4b5563;line-height:1.7;margin-top:8px;clear:both;}.gs-skills .skill-row{margin-bottom:14px;}.gs-skills .skill-meta{display:flex;justify-content:space-between;font-size:0.9em;font-weight:700;color:#374151;margin-bottom:6px;}.gs-skills .skill-track{height:6px;background:#f3f4f6;border-radius:3px;}.gs-skills .skill-fill{height:100%;background:linear-gradient(90deg,var(--primary-color),#fb923c);border-radius:3px;}.edu-card{margin-bottom:20px;}.edu-info .area{font-size:1em;font-weight:800;color:#111827;}.edu-info .institution{font-size:0.9em;color:#6b7280;margin-top:4px;}.edu-date{font-size:0.85em;color:var(--primary-color);font-weight:700;display:block;margin-top:4px;}.project-card{margin-bottom:24px;}.project-name{font-size:1.05em;font-weight:800;color:#111827;}.project-desc{font-size:0.95em;color:#4b5563;line-height:1.6;margin-top:6px;}`
  },
  'solid-base': { name: 'Solid Base', category: 'Executive Style', accent: '#3b82f6', thumbnail: 'single-column',
    html: `<div class="sb-page"><header class="sb-header"><div class="sb-inner">{{profileImage}}<div class="sb-text"><h1 class="sb-name">{{name}}</h1><p class="sb-contact">{{email}} | {{phone}} | {{location}}</p></div></div></header><div class="sb-body"><div class="sb-grid"><div class="sb-main"><section class="sb-sec"><h2 class="sb-h2">Professional Summary</h2><p class="sb-p">{{summary}}</p></section><section class="sb-sec"><h2 class="sb-h2">Experience</h2>{{experience}}</section></div><div class="sb-side"><section class="sb-sec"><h2 class="sb-h2">Skills</h2>{{skills}}</section><section class="sb-sec"><h2 class="sb-h2">Education</h2>{{education}}</section><section class="sb-sec"><h2 class="sb-h2">Projects</h2>{{projects}}</section></div></div></div></div>`,
    css: `.sb-page{font-family:var(--font-family);background:#fff;font-size:var(--base-font-size);min-height:1130px;}.sb-header{background:var(--primary-color);color:#fff;padding:48px 56px;}.sb-inner{display:flex;flex-direction:var(--header-flex-dir);align-items:var(--header-align-items);text-align:var(--image-text-align);gap:32px;}.profile-img{width:120px;height:120px;border-radius:var(--image-radius);background-size:cover;background-position:center;border:4px solid rgba(255,255,255,0.2);flex-shrink:0;}.profile-img.fallback{background:#fff;color:var(--primary-color);display:flex;align-items:center;justify-content:center;font-size:40px;font-weight:bold;}.sb-name{font-size:2.8em;font-weight:800;margin:0 0 12px;letter-spacing:-0.5px;}.sb-contact{font-size:0.95em;opacity:0.9;margin:0;font-weight:500;}.sb-body{padding:40px 56px;}.sb-grid{display:grid;grid-template-columns:1fr var(--sidebar-width);gap:48px;}.sb-sec{margin-bottom:32px;}.sb-h2{font-size:1.05em;font-weight:800;color:#1e293b;text-transform:uppercase;letter-spacing:1px;margin:0 0 16px;padding-bottom:8px;border-bottom:2px solid #e2e8f0;}.sb-p{font-size:0.95em;color:#475569;line-height:1.7;}.card-side{display:none;}.work-card{margin-bottom:28px;}.card-header{margin-bottom:6px;}.position{font-size:1.1em;font-weight:700;color:#1e293b;}.company{font-size:0.95em;color:var(--primary-color);font-weight:600;}.date{font-size:0.85em;color:#64748b;float:right;font-weight:500;}.summary{font-size:0.95em;color:#475569;line-height:1.6;margin-top:8px;clear:both;}.skill-row{display:flex;justify-content:space-between;align-items:center;padding:8px 0;border-bottom:1px solid #f1f5f9;}.skill-meta{font-size:0.9em;font-weight:600;color:#334155;}.skill-val{font-size:0.85em;color:var(--primary-color);font-weight:700;background:#eff6ff;padding:2px 8px;border-radius:12px;}.skill-track,.skill-fill{display:none;}.edu-card{margin-bottom:16px;}.edu-info .area{font-size:0.95em;font-weight:700;color:#1e293b;}.edu-info .institution{font-size:0.85em;color:#64748b;margin-top:4px;}.edu-date{font-size:0.8em;color:var(--primary-color);font-weight:600;display:block;margin-top:4px;}.project-card{margin-bottom:20px;}.project-name{font-size:1em;font-weight:700;color:#1e293b;}.project-desc{font-size:0.9em;color:#475569;line-height:1.6;margin-top:4px;}`
  },
  'golden-ratio': { name: 'Golden Ratio', category: 'Minimalist Style', accent: '#ca8a04', thumbnail: 'single-column',
    html: `<div class="gr-page"><div class="gr-header"><div class="gr-inner">{{profileImage}}<div class="gr-text"><h1 class="gr-name">{{name}}</h1><p class="gr-title">{{email}}</p><p class="gr-contact">{{phone}} • {{location}}</p></div></div></div><div class="gr-body"><section class="gr-sec"><h2 class="gr-h2">Profile</h2><p class="gr-p">{{summary}}</p></section><section class="gr-sec"><h2 class="gr-h2">Experience</h2>{{experience}}</section><div class="gr-grid"><div><h2 class="gr-h2">Education</h2>{{education}}</div><div><h2 class="gr-h2">Skills</h2><div class="gr-skills">{{skills}}</div></div></div></div></div>`,
    css: `.gr-page{font-family:var(--font-family);background:#fefce8;font-size:var(--base-font-size);min-height:1130px;color:#422006;}.gr-header{padding:48px 56px 32px;}.gr-inner{display:flex;flex-direction:var(--header-flex-dir);align-items:var(--header-align-items);text-align:var(--image-text-align);gap:32px;}.profile-img{width:100px;height:100px;border-radius:var(--image-radius);background-size:cover;background-position:center;border:2px solid var(--primary-color);flex-shrink:0;}.profile-img.fallback{background:var(--primary-color);color:#fff;display:flex;align-items:center;justify-content:center;font-size:32px;font-weight:600;}.gr-name{font-size:3em;font-weight:800;color:#713f12;margin:0 0 8px;letter-spacing:-1px;}.gr-title{font-size:1.1em;color:var(--primary-color);font-weight:600;margin:0 0 4px;}.gr-contact{font-size:0.9em;color:#854d0e;margin:0;}.gr-body{padding:0 56px 48px;}.gr-sec{margin-bottom:36px;}.gr-h2{font-size:0.95em;font-weight:700;color:#713f12;text-transform:uppercase;letter-spacing:2px;margin:0 0 20px;display:flex;align-items:center;gap:12px;}.gr-h2::after{content:'';flex:1;height:1px;background:#fef08a;}.gr-p{font-size:0.95em;color:#713f12;line-height:1.8;}.gr-grid{display:grid;grid-template-columns:1fr 1fr;gap:40px;}.card-side{display:none;}.work-card{margin-bottom:28px;border-left:2px solid #fef08a;padding-left:16px;}.card-header{margin-bottom:6px;}.position{font-size:1.1em;font-weight:700;color:#713f12;}.company{font-size:0.95em;color:var(--primary-color);font-weight:600;}.date{font-size:0.85em;color:#854d0e;float:right;font-weight:500;}.summary{font-size:0.95em;color:#713f12;line-height:1.7;margin-top:8px;clear:both;}.edu-card{margin-bottom:20px;}.edu-info .area{font-size:1em;font-weight:700;color:#713f12;}.edu-info .institution{font-size:0.9em;color:#854d0e;margin-top:4px;}.edu-date{font-size:0.85em;color:var(--primary-color);font-weight:600;display:block;margin-top:4px;}.gr-skills .skill-row{margin-bottom:12px;}.gr-skills .skill-meta{display:flex;justify-content:space-between;font-size:0.9em;font-weight:600;color:#713f12;margin-bottom:4px;}.gr-skills .skill-track{height:4px;background:#fef08a;border-radius:2px;}.gr-skills .skill-fill{height:100%;background:var(--primary-color);border-radius:2px;}`
  },
};

export type TemplateKey = keyof typeof templates;
