'use client';

import { useResumeStore } from '@/lib/store';
import { ZoomIn, ZoomOut, Download, FileJson, Image as ImageIcon, FileText, Smartphone, Monitor, CheckCircle2, Loader2 } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { HtmlTemplate } from '@/components/templates';
import { templates } from '@/lib/templates';
import { motion, AnimatePresence } from 'framer-motion';

export default function CenterPanel() {
  const { theme, zoom, setZoom, saveStatus, mobilePreview, setMobilePreview, templateId, data } = useResumeStore();
  const [downloadOpen, setDownloadOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [downloading, setDownloading] = useState(false);
  const previewRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest('#download-menu')) setDownloadOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleDownloadPDF = async () => {
    setDownloading(true);
    setDownloadOpen(false);
    try {
      // Dynamic import to avoid SSR issues
      const html2canvas = (await import('html2canvas')).default;
      const jsPDF = (await import('jspdf')).default;
      
      const element = document.getElementById('resume-preview-inner');
      if (!element) { setDownloading(false); return; }

      // Temporarily make element full height for capture
      const originalOverflow = element.style.overflow;
      element.style.overflow = 'visible';

      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff',
        windowWidth: element.scrollWidth,
        windowHeight: element.scrollHeight,
        height: element.scrollHeight,
      });
      
      element.style.overflow = originalOverflow;

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
      const pdfWidth = pdf.internal.pageSize.getWidth();   // 210
      const pdfHeight = pdf.internal.pageSize.getHeight(); // 297
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = imgWidth / pdfWidth;
      const pageHeightPx = pdfHeight * ratio;
      let yPos = 0;
      let pageNum = 0;

      while (yPos < imgHeight) {
        if (pageNum > 0) pdf.addPage();
        // Crop canvas to one page slice
        const pageCanvas = document.createElement('canvas');
        pageCanvas.width = imgWidth;
        pageCanvas.height = Math.min(pageHeightPx, imgHeight - yPos);
        const ctx = pageCanvas.getContext('2d')!;
        ctx.drawImage(canvas, 0, yPos, imgWidth, pageCanvas.height, 0, 0, imgWidth, pageCanvas.height);
        const pageImg = pageCanvas.toDataURL('image/png');
        const sliceHeight = (pageCanvas.height / ratio);
        pdf.addImage(pageImg, 'PNG', 0, 0, pdfWidth, sliceHeight);
        yPos += pageHeightPx;
        pageNum++;
      }

      pdf.save(`${data.basics.name || 'resume'}.pdf`);
    } catch (err) {
      console.error('PDF generation failed:', err);
      alert('PDF download failed. Please try again.');
    }
    setDownloading(false);
  };

  const handleDownloadPNG = async () => {
    setDownloading(true);
    setDownloadOpen(false);
    try {
      const html2canvas = (await import('html2canvas')).default;
      const element = document.getElementById('resume-preview-inner');
      if (!element) { setDownloading(false); return; }
      const canvas = await html2canvas(element, { scale: 2, useCORS: true, backgroundColor: '#ffffff' });
      const link = document.createElement('a');
      link.download = `${data.basics.name || 'resume'}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    } catch (err) { alert('PNG export failed.'); }
    setDownloading(false);
  };

  const handleDownloadJSON = () => {
    setDownloadOpen(false);
    const json = JSON.stringify(data, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${data.basics.name || 'resume'}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const getTemplate = () => {
    return templates[templateId as keyof typeof templates] || templates['google-coral'] || Object.values(templates)[0];
  };
  const currentTemplate = getTemplate();

  return (
    <div className="flex-1 bg-slate-50 flex flex-col h-screen overflow-hidden">
      {/* Top Toolbar */}
      <div className="h-14 bg-white border-b border-slate-200 px-6 flex items-center justify-between z-10 shrink-0">
        <div className="flex items-center gap-3">
          <div className="flex items-center bg-slate-100 rounded-lg p-1">
            <button onClick={() => setZoom(Math.max(30, zoom - 10))} className="p-1.5 hover:bg-white hover:shadow-sm rounded-md transition-all">
              <ZoomOut className="w-4 h-4 text-slate-600" />
            </button>
            <span className="text-[11px] font-bold text-slate-600 px-3 min-w-[50px] text-center">{zoom}%</span>
            <button onClick={() => setZoom(Math.min(150, zoom + 10))} className="p-1.5 hover:bg-white hover:shadow-sm rounded-md transition-all">
              <ZoomIn className="w-4 h-4 text-slate-600" />
            </button>
          </div>
          <div className="h-6 w-px bg-slate-200" />
          <div className="flex items-center bg-slate-100 rounded-lg p-1">
            <button onClick={() => setMobilePreview(false)} className={`p-1.5 rounded-md transition-all ${!mobilePreview ? 'bg-white shadow-sm text-blue-600' : 'text-slate-500'}`}>
              <Monitor className="w-4 h-4" />
            </button>
            <button onClick={() => setMobilePreview(true)} className={`p-1.5 rounded-md transition-all ${mobilePreview ? 'bg-white shadow-sm text-blue-600' : 'text-slate-500'}`}>
              <Smartphone className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold ${saveStatus === 'saved' ? 'bg-green-50 text-green-600' : saveStatus === 'saving' ? 'bg-yellow-50 text-yellow-600' : 'bg-orange-50 text-orange-600'}`}>
            <CheckCircle2 className="w-3.5 h-3.5" />
            {saveStatus.toUpperCase()}
          </div>

          <div className="relative" id="download-menu">
            <button
              onClick={() => setDownloadOpen(!downloadOpen)}
              disabled={downloading}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-4 py-2 rounded-lg text-sm font-bold transition-all shadow-lg shadow-blue-200"
            >
              {downloading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}
              {downloading ? 'Generating...' : 'Download'}
            </button>

            <AnimatePresence>
              {downloadOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.96 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-0 mt-2 w-52 bg-white rounded-xl shadow-2xl border border-slate-100 p-2 z-50"
                >
                  <button onClick={handleDownloadPDF} className="w-full flex items-center gap-3 p-3 hover:bg-red-50 rounded-lg text-sm font-semibold text-slate-800 transition-colors">
                    <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
                      <FileText className="w-4 h-4 text-red-600" />
                    </div>
                    <div className="text-left">
                      <div className="font-bold text-slate-800">PDF Document</div>
                      <div className="text-[10px] text-slate-400">Best for sharing</div>
                    </div>
                  </button>
                  <button onClick={handleDownloadPNG} className="w-full flex items-center gap-3 p-3 hover:bg-purple-50 rounded-lg text-sm font-semibold text-slate-800 transition-colors">
                    <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                      <ImageIcon className="w-4 h-4 text-purple-600" />
                    </div>
                    <div className="text-left">
                      <div className="font-bold text-slate-800">Image (PNG)</div>
                      <div className="text-[10px] text-slate-400">High quality</div>
                    </div>
                  </button>
                  <button onClick={handleDownloadJSON} className="w-full flex items-center gap-3 p-3 hover:bg-blue-50 rounded-lg text-sm font-semibold text-slate-800 transition-colors">
                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                      <FileJson className="w-4 h-4 text-blue-600" />
                    </div>
                    <div className="text-left">
                      <div className="font-bold text-slate-800">JSON Data</div>
                      <div className="text-[10px] text-slate-400">Import elsewhere</div>
                    </div>
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Main Preview Area */}
      <div className="flex-1 overflow-auto p-8 flex justify-center bg-[#f0f2f5]" ref={previewRef}>
        <div
          className={`transition-all duration-500 ease-in-out ${mobilePreview ? 'w-[375px]' : 'w-full max-w-[860px]'}`}
          style={{ transform: `scale(${zoom / 100})`, transformOrigin: 'top center', marginBottom: zoom < 70 ? '-40%' : '0' }}
        >
          {/* Shadow wrapper */}
          <div className="bg-white shadow-[0_20px_60px_rgba(0,0,0,0.15)] rounded-sm ring-1 ring-black/5">
            <div id="resume-preview-inner">
              {isLoading ? (
                <div className="min-h-[1130px] flex items-center justify-center bg-white">
                  <div className="flex flex-col items-center gap-4">
                    <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
                    <p className="text-xs font-black text-slate-400 uppercase tracking-[0.3em]">Forging Resume...</p>
                  </div>
                </div>
              ) : (
                currentTemplate && <HtmlTemplate html={currentTemplate.html} css={currentTemplate.css} />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
