'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { User, Lock, FileText, Download, Trash2, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function SettingsPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState('');

  // Mock saved resumes
  const [resumes, setResumes] = useState([
    { id: '1', title: 'Software Engineer Resume', date: '2023-10-12', template: 'Modern' },
    { id: '2', title: 'Product Manager Resume', date: '2023-11-05', template: 'Classic' }
  ]);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    }
    if (session?.user?.name) {
      setName(session.user.name);
    }
  }, [status, session, router]);

  const handleUpdateProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    // Mock save delay
    setTimeout(() => {
      setIsSaving(false);
      setMessage('Profile updated successfully!');
      setTimeout(() => setMessage(''), 3000);
    }, 1000);
  };

  const handleDeleteResume = (id: string) => {
    setResumes(resumes.filter(r => r.id !== id));
  };

  if (status === 'loading') return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  if (!session) return null;

  return (
    <div className="min-h-screen bg-gray-50/50 pb-20">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center gap-4">
          <Link href="/" className="p-2 -ml-2 hover:bg-gray-100 rounded-xl transition">
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </Link>
          <h1 className="text-xl font-bold text-black">Account Settings</h1>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Left Col: Profile & Security */}
        <div className="lg:col-span-5 space-y-8">
          
          {/* Profile Form */}
          <div className="bg-white rounded-3xl border border-gray-200 p-8 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
                <User className="w-5 h-5" />
              </div>
              <h2 className="text-lg font-bold text-black">Personal Info</h2>
            </div>
            
            <form onSubmit={handleUpdateProfile} className="space-y-5">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1.5 block">Email Address</label>
                <input 
                  type="email" 
                  value={session.user?.email || ''} 
                  disabled
                  className="w-full p-3 border border-gray-200 rounded-xl bg-gray-50 text-gray-500 text-sm cursor-not-allowed"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1.5 block">Full Name</label>
                <input 
                  type="text" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full p-3 border border-gray-200 rounded-xl text-sm focus:border-black focus:ring-1 focus:ring-black outline-none transition"
                  placeholder="Your Name"
                />
              </div>
              <button 
                type="submit" 
                disabled={isSaving}
                className="w-full py-3 bg-black text-white font-semibold rounded-xl text-sm hover:bg-gray-800 transition disabled:opacity-50"
              >
                {isSaving ? 'Saving...' : 'Save Changes'}
              </button>
              {message && <p className="text-sm text-green-600 font-medium text-center">{message}</p>}
            </form>
          </div>

          {/* Security Form */}
          <div className="bg-white rounded-3xl border border-gray-200 p-8 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-orange-50 flex items-center justify-center text-orange-600">
                <Lock className="w-5 h-5" />
              </div>
              <h2 className="text-lg font-bold text-black">Security</h2>
            </div>
            
            <form onSubmit={handleUpdateProfile} className="space-y-5">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1.5 block">New Password</label>
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-3 border border-gray-200 rounded-xl text-sm focus:border-black focus:ring-1 focus:ring-black outline-none transition"
                  placeholder="Enter new password"
                />
              </div>
              <button 
                type="submit" 
                disabled={isSaving || !password}
                className="w-full py-3 bg-white border-2 border-gray-200 text-black font-semibold rounded-xl text-sm hover:border-black transition disabled:opacity-50"
              >
                Update Password
              </button>
            </form>
          </div>
        </div>

        {/* Right Col: My Resumes */}
        <div className="lg:col-span-7">
          <div className="bg-white rounded-3xl border border-gray-200 p-8 shadow-sm h-full">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-purple-50 flex items-center justify-center text-purple-600">
                  <FileText className="w-5 h-5" />
                </div>
                <h2 className="text-lg font-bold text-black">My Resumes</h2>
              </div>
              <Link href="/editor/new" className="text-sm font-bold text-blue-600 hover:text-blue-700">
                + Create New
              </Link>
            </div>

            {resumes.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500 mb-4">You haven't created any resumes yet.</p>
                <Link href="/editor/new" className="inline-block px-6 py-2.5 bg-black text-white text-sm font-bold rounded-xl hover:bg-gray-800 transition">
                  Create First Resume
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {resumes.map(resume => (
                  <div key={resume.id} className="group flex items-center justify-between p-5 border border-gray-100 rounded-2xl hover:border-gray-200 hover:shadow-sm transition bg-white">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-16 bg-gray-100 rounded flex items-center justify-center border border-gray-200">
                        <span className="text-[10px] font-bold text-gray-400 uppercase">{resume.template}</span>
                      </div>
                      <div>
                        <h3 className="font-bold text-black group-hover:text-blue-600 transition">{resume.title}</h3>
                        <p className="text-xs text-gray-500 mt-1">Edited on {new Date(resume.date).toLocaleDateString()}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Link href={`/editor/${resume.id}`} className="p-2 text-gray-500 hover:text-black hover:bg-gray-100 rounded-lg transition" title="Edit">
                        <FileText className="w-4 h-4" />
                      </Link>
                      <button className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition" title="Download PDF">
                        <Download className="w-4 h-4" />
                      </button>
                      <button onClick={() => handleDeleteResume(resume.id)} className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition" title="Delete">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

      </main>
    </div>
  );
}
