'use client';

import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { LogOut, FileText, User, Settings, PlusCircle } from 'lucide-react';

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'unauthenticated') router.replace('/login');
  }, [status, router]);

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="w-8 h-8 rounded-full border-2 border-black border-t-transparent animate-spin" />
      </div>
    );
  }

  const user = session?.user;

  return (
    <main className="min-h-screen bg-white font-sans">
      {/* Top bar */}
      <header className="border-b border-gray-100 px-6 md:px-12 py-4 flex items-center justify-between">
        <h1 className="text-xl font-black text-black tracking-tight">Resume <span className="text-gray-400">Forge</span></h1>
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-600 hidden md:block">{user?.email}</span>
          <button
            onClick={() => signOut({ callbackUrl: '/' })}
            className="flex items-center gap-2 text-sm font-semibold text-gray-600 hover:text-black transition-colors border border-gray-200 rounded-full px-4 py-2 hover:border-black"
          >
            <LogOut className="w-4 h-4" /> Sign out
          </button>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-6 md:px-12 py-12">
        {/* Welcome */}
        <div className="mb-12">
          <h2 className="text-3xl md:text-4xl font-black text-black mb-2">
            Welcome back{user?.name ? `, ${user.name.split(' ')[0]}` : ''}!
          </h2>
          <p className="text-gray-500 text-lg">Ready to forge your perfect resume?</p>
        </div>

        {/* Quick action cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <QuickCard
            icon={<PlusCircle className="w-6 h-6" />}
            title="New Resume"
            desc="Start from scratch with a blank template"
            onClick={() => router.push('/editor/new')}
          />
          <QuickCard
            icon={<FileText className="w-6 h-6" />}
            title="My Resumes"
            desc="View and edit your saved resumes"
            onClick={() => router.push('/settings')}
          />
          <QuickCard
            icon={<Settings className="w-6 h-6" />}
            title="Settings"
            desc="Manage your account and preferences"
            onClick={() => router.push('/settings')}
          />
        </div>

        {/* Profile card */}
        <div className="border border-gray-100 rounded-3xl p-8 flex items-center gap-6 shadow-[0_4px_20px_rgb(0,0,0,0.04)]">
          {user?.image ? (
            <img src={user.image} alt={user.name || 'avatar'} className="w-16 h-16 rounded-full border-2 border-gray-100" />
          ) : (
            <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center">
              <User className="w-8 h-8 text-gray-400" />
            </div>
          )}
          <div>
            <p className="font-bold text-black text-lg">{user?.name || 'User'}</p>
            <p className="text-gray-500 text-sm">{user?.email}</p>
            <span className="mt-1 inline-block text-xs font-bold bg-black text-white px-3 py-1 rounded-full">Free Plan</span>
          </div>
        </div>
      </div>
    </main>
  );
}

const QuickCard = ({ icon, title, desc, onClick }: any) => (
  <button
    onClick={onClick}
    className="group text-left p-6 border border-gray-100 rounded-3xl hover:border-black hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all duration-300"
  >
    <div className="w-12 h-12 bg-gray-100 group-hover:bg-black rounded-2xl flex items-center justify-center mb-4 transition-colors duration-300">
      <span className="text-black group-hover:text-white transition-colors duration-300">{icon}</span>
    </div>
    <h3 className="font-bold text-black mb-1">{title}</h3>
    <p className="text-sm text-gray-500">{desc}</p>
  </button>
);
