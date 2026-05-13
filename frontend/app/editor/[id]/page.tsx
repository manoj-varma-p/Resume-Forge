'use client';

import { useSession } from 'next-auth/react';
import { useRouter, useParams, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useResumeStore } from '@/lib/store';
import LeftPanel from './LeftPanel';
import CenterPanel from './CenterPanel';
import RightPanel from './RightPanel';
import { Loader2, ArrowLeft, CheckCircle2, Clock, Pencil } from 'lucide-react';
import Link from 'next/link';

function EditorTopBar() {
  const { saveStatus } = useResumeStore();
  const [editingTitle, setEditingTitle] = useState(false);
  const [title, setTitle] = useState('Untitled Resume');

  return (
    <header className="h-14 border-b border-gray-200 bg-white flex items-center justify-between px-4 shrink-0 z-30">
      <div className="flex items-center gap-3">
        <Link href="/" className="p-2 hover:bg-gray-100 rounded-lg text-gray-500 hover:text-black transition">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div className="h-5 w-px bg-gray-200" />
        {editingTitle ? (
          <input
            autoFocus
            className="font-bold text-gray-800 border-b-2 border-blue-500 outline-none bg-transparent text-sm px-1 min-w-[160px]"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onBlur={() => setEditingTitle(false)}
            onKeyDown={(e) => e.key === 'Enter' && setEditingTitle(false)}
          />
        ) : (
          <button
            onClick={() => setEditingTitle(true)}
            className="flex items-center gap-2 group"
          >
            <h1 className="font-bold text-gray-800 text-sm">{title}</h1>
            <Pencil className="w-3 h-3 text-gray-400 opacity-0 group-hover:opacity-100 transition" />
          </button>
        )}
        <span className="text-xs font-medium text-gray-400 bg-gray-100 px-2 py-1 rounded-md">Draft</span>
      </div>

      <div className="flex items-center gap-3">
        {/* Save Status */}
        <div className="flex items-center gap-1.5 text-xs font-medium">
          {saveStatus === 'saved' ? (
            <><CheckCircle2 className="w-3.5 h-3.5 text-green-500" /><span className="text-green-600">Saved</span></>
          ) : saveStatus === 'saving' ? (
            <><Clock className="w-3.5 h-3.5 text-yellow-500 animate-spin" /><span className="text-yellow-600">Saving...</span></>
          ) : (
            <><span className="w-2 h-2 rounded-full bg-orange-400 inline-block" /><span className="text-orange-600">Unsaved</span></>
          )}
        </div>
        <div className="h-5 w-px bg-gray-200" />
        <button className="text-sm font-semibold text-gray-600 hover:text-black px-4 py-1.5 rounded-lg hover:bg-gray-100 transition border border-gray-200">
          Preview
        </button>
        <button className="text-sm font-semibold text-white bg-black hover:bg-gray-800 px-4 py-2 rounded-lg shadow-sm transition flex items-center gap-2">
          Finish & Export
        </button>
      </div>
    </header>
  );
}

export default function EditorPage() {
  const { status } = useSession();
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();
  const { setTemplateId, setResumeId } = useResumeStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (params.id) {
      if (typeof params.id === 'string' && params.id !== 'new') {
        setResumeId(params.id);
      } else {
        const templateQuery = searchParams.get('template');
        setTemplateId(templateQuery || 'google-coral');
      }
    }
  }, [params.id, searchParams, setResumeId, setTemplateId]);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    }
  }, [status, router]);

  if (status === 'loading' || !mounted) {
    return (
      <div className="h-screen w-full flex flex-col items-center justify-center bg-white">
        <Loader2 className="w-8 h-8 animate-spin text-black mb-4" />
        <p className="text-gray-500 font-medium animate-pulse">Loading editor...</p>
      </div>
    );
  }

  if (status === 'unauthenticated') return null;

  return (
    <div className="flex flex-col h-screen w-full overflow-hidden bg-white font-sans">
      <EditorTopBar />
      <main className="flex flex-1 overflow-hidden relative">
        <LeftPanel />
        <CenterPanel />
        <RightPanel />
      </main>
    </div>
  );
}
