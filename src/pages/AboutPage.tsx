import React from 'react';
import { motion } from 'motion/react';
import { PenTool, Feather, ShieldCheck } from 'lucide-react';

export function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto w-full px-6 sm:px-12 py-24 flex-1">
      <header className="text-center mb-24">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="inline-block p-4 border rounded-full mb-8 shadow-sm"
          style={{ backgroundColor: 'var(--panel-bg)', borderColor: 'var(--border-main)' }}
        >
          <PenTool size={40} className="text-gold-600" />
        </motion.div>
        <h1 className="text-7xl font-display font-medium mb-6 border-none" style={{ color: 'var(--text-main)' }}>The Vestigio Philosophy</h1>
        <p className="font-serif italic text-2xl leading-relaxed max-w-2xl mx-auto opacity-60" style={{ color: 'var(--text-main)' }}>
          "Writing is not merely the recording of data, but the architectural construction of intent."
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-20 mb-32 px-4 sm:px-0">
        <div>
          <h2 className="text-3xl font-display mb-8 border-none" style={{ color: 'var(--text-main)' }}>A Mechanical Writing Instrument</h2>
          <p className="font-serif text-lg leading-relaxed text-justify mb-6" style={{ color: 'var(--text-main)' }}>
            Vestigio was conceived as an antidote to the ephemeral, disposable nature of modern digital text. In an age of infinite scroll and flat, characterless interfaces, we sought to return a sense of physicality and weight to the act of composition.
          </p>
          <p className="font-serif text-lg leading-relaxed text-justify" style={{ color: 'var(--text-main)' }}>
            Inspired by the tactile response of mid-century typewriters and the timeless elegance of hand-pressed manuscripts, Vestigio is more than a Markdown editor. It is a workspace designed for focus, where the interface recedes to celebrate the narrative.
          </p>
        </div>
        
        <div className="relative">
          <div className="aspect-[4/5] rounded-3xl overflow-hidden shadow-premium border" style={{ backgroundColor: 'var(--panel-bg)', borderColor: 'var(--border-main)' }}>
            <img 
              src="https://picsum.photos/seed/ink/800/1000?grayscale" 
              alt="Atmospheric Ink" 
              className="w-full h-full object-cover opacity-60 mix-blend-multiply"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-parchment-100/80 to-transparent" />
          </div>
          <div className="absolute -bottom-6 -right-6 p-8 bg-gold-600 text-white rounded-2xl shadow-premium">
            <Feather size={32} />
          </div>
        </div>
      </div>

      <div className="border-t border-parchment-300 pt-20 grid grid-cols-1 sm:grid-cols-3 gap-12">
        <div className="text-center">
          <div className="text-gold-600 mb-4 inline-block"><ShieldCheck size={24} /></div>
          <h3 className="font-display text-xl mb-2" style={{ color: 'var(--text-main)' }}>Privacy First</h3>
          <p className="text-sm font-serif italic opacity-50" style={{ color: 'var(--text-main)' }}>Your words are your own. All archival data remains local to your device.</p>
        </div>
        <div className="text-center">
          <div className="text-gold-600 mb-4 inline-block"><PenTool size={24} /></div>
          <h3 className="font-display text-xl mb-2" style={{ color: 'var(--text-main)' }}>Artisanal Design</h3>
          <p className="text-sm font-serif italic opacity-50" style={{ color: 'var(--text-main)' }}>Every curve, margin, and ligature is chosen with typographic intent.</p>
        </div>
        <div className="text-center">
          <div className="text-gold-600 mb-4 inline-block"><Feather size={24} /></div>
          <h3 className="font-display text-xl mb-2" style={{ color: 'var(--text-main)' }}>Lightweight Shell</h3>
          <p className="text-sm font-serif italic opacity-50" style={{ color: 'var(--text-main)' }}>Fast, responsive, and distraction-free compositing architecture.</p>
        </div>
      </div>

      <footer className="mt-40 text-center pb-20">
        <div className="font-cursive text-4xl text-gold-600/30 mb-4">Vestigio</div>
        <div className="text-[10px] font-mono tracking-[0.4em] uppercase opacity-20" style={{ color: 'var(--text-main)' }}>A Manuscript for the Modern Age</div>
      </footer>
    </div>
  );
}
