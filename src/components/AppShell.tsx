import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { cn } from '../lib/utils';
import { PenLine, Files, BookOpen, Settings as SettingsIcon, Info, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface AppShellProps {
  children: React.ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  const navItems = [
    { name: 'Editor', path: '/', icon: PenLine },
    { name: 'My Files', path: '/files', icon: Files },
    { name: 'Documentation', path: '/docs', icon: BookOpen },
    { name: 'Settings', path: '/settings', icon: SettingsIcon },
    { name: 'About', path: '/about', icon: Info },
  ];

  return (
    <div className="min-h-screen bg-inherit flex flex-col items-center overflow-x-hidden">
      {/* Navigation Bar */}
      <nav 
        className="w-full h-20 flex items-center justify-between px-6 border-b transition-colors duration-500 z-[100] sticky top-0"
        style={{ backgroundColor: 'var(--bg-main)', borderColor: 'var(--border-main)' }}
      >
        <div className="max-w-7xl mx-auto w-full flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2 no-print group">
            <span className="font-cursive text-3xl text-gold-600 transition-transform group-hover:scale-105 duration-300">Vestigio</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-10">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  cn(
                    "text-[10px] font-bold tracking-[0.2em] uppercase transition-all duration-300 relative py-2",
                    isActive ? "text-gold-600" : "text-ink-700/40 hover:text-gold-600"
                  )
                }
              >
                {({ isActive }) => (
                  <>
                    <span className="flex items-center space-x-2">
                       <item.icon size={12} strokeWidth={2.5} />
                       <span>{item.name}</span>
                    </span>
                    {isActive && (
                      <motion.div
                        layoutId="nav-underline"
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-gold-500/50"
                      />
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </div>

          {/* Mobile Toggle */}
          <button 
            className="md:hidden p-2 text-gold-600 rounded-lg hover:bg-gold-50 transition-colors no-print"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[90] md:hidden"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 right-0 w-3/4 max-w-xs border-l z-[100] md:hidden flex flex-col pt-24 pb-12 px-8 shadow-2xl"
              style={{ backgroundColor: 'var(--panel-bg)', borderColor: 'var(--border-main)' }}
            >
               <button 
                  className="absolute top-6 right-6 p-2 text-ink-700/40"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <X size={24} />
                </button>

              <div className="flex flex-col space-y-6">
                <div className="text-[10px] font-bold uppercase tracking-[0.3em] text-gold-600/40 mb-4">Archives Nav</div>
                {navItems.map((item) => (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={({ isActive }) =>
                      cn(
                        "flex items-center space-x-4 text-xs font-bold tracking-[0.1em] uppercase p-4 rounded-xl transition-all",
                        isActive ? "bg-gold-500 text-white shadow-lg shadow-gold-500/20" : "text-ink-700/60 hover:bg-parchment-200"
                      )
                    }
                  >
                    <item.icon size={18} strokeWidth={2.5} />
                    <span>{item.name}</span>
                  </NavLink>
                ))}
              </div>
              
              <div className="mt-auto pt-12 text-center">
                <div className="font-cursive text-2xl text-gold-600 opacity-20 mb-2">Vestigio</div>
                <div className="text-[8px] font-mono tracking-[0.3em] uppercase text-ink-700/20">Version 1.0.4</div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="w-full flex-1 flex flex-col relative">
        {children}
      </main>

      {/* Subtle Bottom Accent */}
      <footer 
        className="w-full h-12 flex items-center justify-center border-t no-print"
        style={{ backgroundColor: 'var(--panel-bg)', borderColor: 'var(--border-main)' }}
      >
        <span className="text-[10px] uppercase tracking-[0.2em] font-mono opacity-20">
          Mechanical Writing Instrument • By Biowess © 2026
        </span>
      </footer>
    </div>
  );
}
