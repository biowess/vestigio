import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { cn } from '../lib/utils';

interface ManuscriptPreviewProps {
  content: string;
  className?: string;
  forwardRef?: React.RefObject<HTMLDivElement>;
}

export function ManuscriptPreview({ content, className, forwardRef }: ManuscriptPreviewProps) {
  return (
    <div
      ref={forwardRef}
      className={cn(
        "shadow-premium p-12 sm:p-20 min-h-full w-full max-w-4xl mx-auto border relative manuscript-container",
        "parchment-bg", // For print styles
        className
      )}
      style={{
        backgroundColor: 'var(--panel-bg)',
        borderColor: 'var(--border-main)',
        color: 'var(--text-main)'
      }}
    >
      {/* Editorial Decorative Elements */}
      <div 
        className="absolute top-8 left-8 right-8 border-b h-px no-print" 
        style={{ borderColor: 'var(--border-main)', opacity: 0.1 }}
      />
      <div 
        className="absolute top-12 left-1/2 -translate-x-1/2 text-[10px] uppercase font-mono tracking-widest no-print"
        style={{ color: 'var(--color-gold-600)', opacity: 0.5 }}
      >
        Manuscript Folio
      </div>

      <div className="markdown-body max-w-none">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {content || "*Your manuscript begins here...*"}
        </ReactMarkdown>
      </div>

      <div 
        className="mt-20 pt-8 border-t flex justify-between items-center no-print"
        style={{ borderColor: 'var(--border-main)' }}
      >
        <span className="text-[10px] font-mono uppercase tracking-widest" style={{ color: 'var(--text-main)', opacity: 0.4 }}>
          Vestigio • Typeset with Intent
        </span>
        <span className="text-[10px] font-mono uppercase tracking-widest" style={{ color: 'var(--text-main)', opacity: 0.4 }}>
          Folio {Math.ceil(content.length / 3000) || 1}
        </span>
      </div>
    </div>
  );
}
