import { create } from 'zustand';

export type ResumeData = {
  basics: {
    name: string;
    email: string;
    phone: string;
    location: string;
    website: string;
    summary: string;
    image: string;
  };
  education: Array<{ id: string; institution: string; area: string; studyType: string; startDate: string; endDate: string; score: string }>;
  work: Array<{ id: string; company: string; position: string; startDate: string; endDate: string; summary: string }>;
  projects: Array<{ id: string; name: string; description: string; link: string; technologies: string }>;
  skills: Array<{ id: string; name: string; level: string }>;
  languages: Array<{ id: string; language: string; fluency: string }>;
  certifications: Array<{ id: string; name: string; issuer: string; date: string }>;
  hobbies: string;
  declaration: string;
};

export type ThemeConfig = {
  color: string;
  fontFamily: string;
  fontSize: number;
  sidebarWidth: number;
  imagePosition: 'left' | 'right' | 'center';
  imageShape: 'round' | 'square' | 'rounded';
};

interface ResumeStore {
  resumeId: string | null;
  templateId: string;
  data: ResumeData;
  theme: ThemeConfig;
  zoom: number;
  atsScore: number;
  activeFieldId: string | null;
  jobDescription: string;

  // New States
  showGrid: boolean;
  mobilePreview: boolean;
  saveStatus: 'saved' | 'saving' | 'unsaved';
  sectionOrder: string[];
  hiddenSections: string[];

  // Actions
  setResumeId: (id: string | null) => void;
  setTemplateId: (id: string) => void;
  updateData: (newData: Partial<ResumeData>) => void;
  setTheme: (newTheme: Partial<ThemeConfig>) => void;
  updateTheme: (key: keyof ThemeConfig, value: any) => void;
  setZoom: (newZoom: number) => void;
  setAtsScore: (score: number) => void;
  setShowGrid: (show: boolean) => void;
  setMobilePreview: (show: boolean) => void;
  setSaveStatus: (status: 'saved' | 'saving' | 'unsaved') => void;
  setSectionOrder: (order: string[]) => void;
  toggleSectionVisibility: (section: string) => void;
  setJobDescription: (desc: string) => void;
  
  // Data Specific Actions
  updateBasics: (basics: Partial<ResumeData['basics']>) => void;
  addItem: (section: 'education' | 'work' | 'skills' | 'languages' | 'certifications' | 'projects', item: any) => void;
  removeItem: (section: 'education' | 'work' | 'skills' | 'languages' | 'certifications' | 'projects', id: string) => void;
  updateItem: (section: 'education' | 'work' | 'skills' | 'languages' | 'projects' | 'certifications', id: string, changes: any) => void;
  calculateAtsScore: () => void;
  setActiveFieldId: (id: string | null) => void;
}

export const initialData: ResumeData = {
  basics: {
    name: 'Alexander Sterling',
    email: 'sterling@sovereign.com',
    phone: '+1 (555) 000-1111',
    website: 'https://sterling.io',
    location: 'London, UK',
    summary: 'Strategic leader with 15+ years of experience in driving global operational excellence. Proven track record in scaling technical organizations and delivering high-impact business solutions at the intersection of technology and commerce.',
    image: 'https://ui-avatars.com/api/?name=Alexander+Sterling&background=1a2b4a&color=fff',
  },
  work: [
    {
      id: '1',
      company: 'Global Visionary Systems',
      position: 'Chief Strategy Officer',
      startDate: '2020-01',
      endDate: 'Present',
      summary: 'Architected the 5-year roadmap for $500M annual recurring revenue. Orchestrated the digital transformation of 14 regional offices, reducing operational overhead by 22% while increasing employee engagement by 40%.',
    },
    {
      id: '2',
      company: 'Tech Frontier Ltd.',
      position: 'VP of Engineering',
      startDate: '2015-06',
      endDate: '2019-12',
      summary: 'Scaled the engineering team from 20 to 150+ globally. Implemented a zero-downtime deployment pipeline and modernized the legacy monolithic architecture into a highly resilient microservices ecosystem.',
    }
  ],
  education: [
    {
      id: '1',
      institution: 'Oxford University',
      area: 'Masters in Strategic Management',
      studyType: 'Master',
      startDate: '2012',
      endDate: '2014',
      score: 'A+',
    }
  ],
  skills: [
    { id: '1', name: 'Strategic Leadership', level: 'Master' },
    { id: '2', name: 'Enterprise Architecture', level: 'Expert' },
    { id: '3', name: 'Global Operations', level: 'Expert' },
  ],
  projects: [
    {
      id: '1',
      name: 'Project Sovereign',
      description: 'A global enterprise-scale data mesh implementation for Fortune 500 financial institutions.',
      link: 'sovereign.tech',
      technologies: 'React, Node.js, AWS'
    }
  ],
  languages: [
    { id: '1', language: 'English', fluency: 'Native' },
    { id: '2', language: 'French', fluency: 'Fluent' },
    { id: '3', language: 'German', fluency: 'Professional' }
  ],
  certifications: [
    { id: '1', name: 'Executive Leadership Program', issuer: 'Harvard Business School', date: '2021' }
  ],
  hobbies: '',
  declaration: ''
};

export const useResumeStore = create<ResumeStore>((set, get) => ({
  resumeId: null,
  templateId: 'google-coral',
  data: initialData,
  theme: { color: '#000000', fontFamily: 'Inter', fontSize: 14, sidebarWidth: 30, imagePosition: 'left', imageShape: 'round' },
  zoom: 100,
  atsScore: 85,
  activeFieldId: null,
  jobDescription: '',
  showGrid: false,
  mobilePreview: false,
  saveStatus: 'saved',
  sectionOrder: ['basics', 'summary', 'work', 'education', 'skills', 'projects', 'languages', 'certifications'],
  hiddenSections: [],

  setResumeId: (id) => set({ resumeId: id }),
  setTemplateId: (id) => set({ templateId: id }),
  updateData: (newData) => set((state) => ({ data: { ...state.data, ...newData } })),
  setTheme: (newTheme) => set((state) => ({ theme: { ...state.theme, ...newTheme } })),
  updateTheme: (key, value) => set((state) => ({ theme: { ...state.theme, [key]: value } })),
  setZoom: (zoom) => set({ zoom }),
  setAtsScore: (atsScore) => set({ atsScore }),
  setShowGrid: (showGrid) => set({ showGrid }),
  setMobilePreview: (mobilePreview) => set({ mobilePreview }),
  setSaveStatus: (saveStatus) => set({ saveStatus }),
  setSectionOrder: (sectionOrder) => set({ sectionOrder }),
  toggleSectionVisibility: (section) => set((state) => ({
    hiddenSections: state.hiddenSections.includes(section)
      ? state.hiddenSections.filter(s => s !== section)
      : [...state.hiddenSections, section]
  })),
  setJobDescription: (jobDescription) => set({ jobDescription }),

  updateBasics: (basics) =>
    set((state) => ({
      data: {
        ...state.data,
        basics: { ...state.data.basics, ...basics },
      },
    })),

  addItem: (section, item) =>
    set((state) => ({
      data: {
        ...state.data,
        [section]: [...(state.data[section] as any[]), item],
      },
    })),

  removeItem: (section, id) =>
    set((state) => ({
      data: {
        ...state.data,
        [section]: (state.data[section] as any[]).filter((item) => item.id !== id),
      },
    })),

  updateItem: (section, id, changes) =>
    set((state) => ({
      data: {
        ...state.data,
        [section]: (state.data[section] as any[]).map((item) =>
          item.id === id ? { ...item, ...changes } : item
        ),
      },
    })),

  calculateAtsScore: () => {
    const { data } = get();
    let score = 0;
    if (data.basics.name) score += 10;
    if (data.basics.email) score += 5;
    if (data.basics.phone) score += 5;
    if (data.basics.summary && data.basics.summary.length > 50) score += 15;
    if (data.work.length > 0) score += 20;
    if (data.education.length > 0) score += 10;
    if (data.skills.length >= 3) score += 15;
    if (data.skills.length >= 6) score += 5;
    if (data.projects.length > 0) score += 10;
    if (data.languages.length > 0) score += 5;
    set({ atsScore: Math.min(100, score) });
  },

  setActiveFieldId: (activeFieldId) => set({ activeFieldId }),
}));
