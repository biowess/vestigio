import React from 'react';
import { Book, Code, PenTool, Layout, Save, Share, Layers } from 'lucide-react';
import { motion } from 'motion/react';

export function DocsPage() {
  const sections = [
    {
      title: 'Structural Interface',
      icon: Layout,
      content: 'Vestigio is partitioned into two distinct realms: the Composer on the left and the Folio on the right. The Composer is your technical interface, where Markdown — a mechanical syntax for semantic structure — is authored. The Folio represents the compiled objective, typeset in real-time with typographic intentionality.'
    },
    {
      title: 'Stylistic Syntax',
      icon: PenTool,
      content: 'We utilize Github Flavored Markdown (GFM). This allows for tables, task lists, and standard formatting using simple character strings. For example, enclosing text in double asterisks yields bold emphasis, while a single hash yields a Level 1 Heading.'
    },
    {
      title: 'Local Archival',
      icon: Save,
      content: 'Your manuscripts are preserved within your browser\'s local storage vault. This ensures privacy and offline availability. You can export these archives as raw .md files for external portability or as typeset PDFs for formal presentation.'
    },
    {
      title: 'Technical Implementation',
      icon: Code,
      content: 'Vestigio is constructed upon modern foundations: React 19 for reactive state, Tailwind CSS for mechanical styling, and Remark-GFM for accurate manuscript rendering. Animations are choreographed via Motion (Framer), ensuring smooth transitions between compositional states.'
    }
  ];

  return (
    <div className="max-w-4xl mx-auto w-full px-6 sm:px-10 py-20 flex-1">
      <header className="text-center mb-24">
        <span className="text-[10px] uppercase font-mono tracking-[0.5em] text-gold-600 mb-4 block">Instructional Manual</span>
        <h1 className="text-6xl font-display font-medium mb-8 border-none" style={{ color: 'var(--text-main)' }}>The Vestigio Lexicon</h1>
        <div className="w-24 h-px bg-gold-500/30 mx-auto" />
      </header>

      <div className="space-y-24">
        {sections.map((section, idx) => (
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
            key={idx}
            className="grid grid-cols-1 md:grid-cols-12 gap-12 px-2 sm:px-0"
          >
            <div className="md:col-span-1 flex flex-col items-center">
              <div 
                className="p-4 rounded-full text-gold-600 mb-4 border shadow-tactile"
                style={{ backgroundColor: 'var(--panel-bg)', borderColor: 'var(--border-main)' }}
              >
                <section.icon size={24} />
              </div>
              <div className="flex-1 w-px bg-gold-500/20" />
            </div>
            
            <div className="md:col-span-11">
              <h2 className="text-2xl font-display mb-6 mt-0 border-none" style={{ color: 'var(--text-main)' }}>{section.title}</h2>
              <p className="font-serif text-xl leading-relaxed text-justify opacity-80" style={{ color: 'var(--text-main)' }}>
                {section.content}
              </p>
              
              {idx === 1 && (
                <div className="mt-8 bg-black p-8 rounded-xl shadow-premium">
                  <pre className="font-mono text-sm text-parchment-300 leading-loose">
                    {`# Main Heading (Playfair)
## Subheading (Parchment Line)

"Prose is the architecture of thought."

- Key point one
- Mechanical syntax
- Typographic precision`}
                  </pre>
                  <div className="mt-4 text-[10px] font-mono text-parchment-100/30 uppercase tracking-[0.2em] text-right">
                    Markdown Sample Code
                  </div>
                </div>
              )}
            </div>
          </motion.section>
        ))}
      </div>

      <div className="mt-32 p-12 border-2 border-gold-500/5 rounded-3xl bg-gold-50/20 text-center mx-4 sm:mx-0">
        <Layers className="mx-auto text-gold-600 mb-6" size={32} />
        <h3 className="font-display text-2xl mb-4" style={{ color: 'var(--text-main)' }}>A Note on Exportation</h3>
        <p className="font-serif text-lg max-w-2xl mx-auto leading-relaxed opacity-60" style={{ color: 'var(--text-main)' }}>
          We utilize React-PDF to generate high-fidelity documents. By rendering components directly into PDF primitives, we ensure superior resolution and layout consistency without relying on browser print settings.
        </p>
      </div>
    </div>
  );
}
