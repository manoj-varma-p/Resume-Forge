'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  FileText, 
  LayoutDashboard, 
  Image as ImageIcon, 
  CheckCircle, 
  Settings,
  PlusCircle,
  Hexagon,
  User,
  LogOut
} from 'lucide-react';

export default function Navbar() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const { data: session } = useSession();
  const router = useRouter();

  const handleUserClick = () => {
    if (session) {
      router.push('/');
    } else {
      router.push('/login');
    }
  };

  useEffect(() => {
    const handleMouseLeave = (e: MouseEvent) => {
      if (
        e.clientY <= 0 ||
        e.clientX <= 0 ||
        e.clientX >= window.innerWidth ||
        e.clientY >= window.innerHeight
      ) {
        setIsVisible(false);
        setIsExpanded(false);
      }
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    const handleMouseMove = () => {
      if (!isVisible) setIsVisible(true);
    };

    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mousemove', handleMouseMove);

    return () => {
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isVisible]);

  return (
    <>
      <motion.div 
        className="fixed left-4 top-1/2 -translate-y-1/2 z-50 flex flex-col bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-gray-100 overflow-hidden py-4"
        initial={{ width: 80, x: -150, opacity: 0 }}
        animate={{ 
          width: isExpanded ? 260 : 80,
          x: isVisible ? 0 : -150,
          opacity: isVisible ? 1 : 0
        }}
        transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
        onMouseEnter={() => setIsExpanded(true)}
        onMouseLeave={() => setIsExpanded(false)}
      >
        {/* Top Logo */}
        <div className="flex items-center px-6 mb-6 mt-2">
          <div className="flex items-center justify-center min-w-[32px] min-h-[32px] text-black">
            <Hexagon className="w-8 h-8 fill-black" />
          </div>
          <AnimatePresence>
            {isExpanded && (
              <motion.span 
                className="ml-4 font-bold text-xl text-gray-800 whitespace-nowrap"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.2, delay: 0.1 }}
              >
                Resume Forge
              </motion.span>
            )}
          </AnimatePresence>
        </div>

        {/* Nav Items */}
        <div className="flex flex-col gap-3 px-4 w-full">
          <Link href="/"><NavItem icon={<LayoutDashboard />} text="Dashboard" isExpanded={isExpanded} active /></Link>
          <Link href="/templates"><NavItem icon={<FileText />} text="Templates" isExpanded={isExpanded} /></Link>
          <Link href="/#gallery"><NavItem icon={<ImageIcon />} text="Gallery" isExpanded={isExpanded} /></Link>
          <Link href="/ats-checker">
            <NavItem icon={<CheckCircle />} text="ATS Checker" isExpanded={isExpanded} />
          </Link>
        </div>

        <div className="mx-6 my-6 border-t border-gray-100"></div>

        <div className="flex flex-col gap-3 px-4 w-full">
          <Link href="/editor/new"><NavItem icon={<PlusCircle />} text="New Resume" isExpanded={isExpanded} /></Link>
          <NavItem icon={<Settings />} text="Settings" isExpanded={isExpanded} />
        </div>

        {/* Bottom Profile */}
        <div className="mt-auto px-4 pb-2 pt-6">
          <div 
            onClick={handleUserClick}
            className="flex items-center p-2 rounded-2xl hover:bg-gray-50 cursor-pointer transition-colors w-full overflow-hidden border border-transparent hover:border-gray-100"
          >
            <div className="flex items-center justify-center min-w-[32px] min-h-[32px] rounded-full bg-gray-100 text-black overflow-hidden">
              {session?.user?.image ? (
                <img src={session.user.image} alt="avatar" className="w-full h-full object-cover" />
              ) : (
                <User className="w-5 h-5" />
              )}
            </div>
            <AnimatePresence>
              {isExpanded && (
                <motion.div 
                  className="ml-3 flex flex-col whitespace-nowrap"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.2, delay: 0.1 }}
                >
                  <span className="text-sm font-semibold text-gray-800">
                    {session?.user?.name || session?.user?.email || 'Sign In'}
                  </span>
                  <span className="text-xs text-gray-500">
                    {session ? 'Logged In' : 'Click to Login'}
                  </span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          {session && isExpanded && (
            <button 
              onClick={(e) => { e.stopPropagation(); signOut({ callbackUrl: '/' }); }}
              className="mt-2 flex items-center justify-center w-full gap-2 p-2 rounded-xl text-red-500 hover:bg-red-50 hover:text-red-600 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span className="text-sm font-semibold">Logout</span>
            </button>
          )}
        </div>
      </motion.div>
    </>
  );
}

const NavItem = ({ icon, text, isExpanded, active = false }: { icon: React.ReactNode, text: string, isExpanded: boolean, active?: boolean }) => {
  return (
    <div className={`flex items-center p-3 rounded-2xl cursor-pointer transition-all duration-200 overflow-hidden group ${
      active 
        ? 'bg-black text-white shadow-md shadow-black/20' 
        : 'text-gray-400 hover:bg-gray-50 hover:text-gray-800'
    }`}>
      <div className={`flex items-center justify-center min-w-[24px] transition-transform duration-200 ${!active && 'group-hover:scale-110'}`}>
        {React.cloneElement(icon as React.ReactElement<any>, { className: 'w-6 h-6' })}
      </div>
      <AnimatePresence>
        {isExpanded && (
          <motion.span 
            className="ml-4 font-medium whitespace-nowrap"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.2, delay: 0.05 }}
          >
            {text}
          </motion.span>
        )}
      </AnimatePresence>
    </div>
  );
};
