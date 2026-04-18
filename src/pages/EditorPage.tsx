import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { Plus, Bold, Italic, List, ListOrdered, Heading1, Heading2, Heading3, Quote, Code, Save, Download, Printer, Undo2, Redo2, Eye, Pen } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ManuscriptPreview } from '../components/ManuscriptPreview';
import { storage } from '../lib/storage';
import { Document } from '../types';
import { cn, formatDate, sanitizeFilename } from '../lib/utils';
import { useReactToPrint } from 'react-to-print';
import { useSettings } from '../context/SettingsContext';
import { pdf } from '@react-pdf/renderer';
import { PDFDocument } from '../pdf/PDFDocument';
import { processMarkdown } from '../pdf/processor';

export function EditorPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const fileId = searchParams.get('id');
  const { settings } = useSettings();
  
  const [markdown, setMarkdown] = React.useState('');
  const [title, setTitle] = React.useState('Untitled Manuscript');
  const [charCount, setCharCount] = React.useState(0);
  const [isSaving, setIsSaving] = React.useState(false);
  const [viewMode, setViewMode] = React.useState<'edit' | 'compiled'>('edit');
  
  // Undo/Redo history
  const [history, setHistory] = React.useState<string[]>(['']);
  const [currentIndex, setCurrentIndex] = React.useState(0);
  
  const editorRef = React.useRef<HTMLTextAreaElement>(null);
  const previewRef = React.useRef<HTMLDivElement>(null);

  const handlePrint = useReactToPrint({
    contentRef: previewRef,
    documentTitle: title,
    onAfterPrint: () => console.log('Print flow triggered'),
  });

  const handleExportPDF = async () => {
    // Prevent multiple simultaneous exports
    if (isSaving) return;
    
    setIsSaving(true);
    console.log('Initiating PDF generation...');
    
    try {
      const ast = processMarkdown(markdown);
      
      // 1. Generate the PDF blob using React-PDF's pdf() API
      const docInstance = pdf(
        <PDFDocument 
          title={title} 
          ast={ast} 
          parchmentWarmth={settings.parchmentWarmth} 
        />
      );
      const blob = await docInstance.toBlob();
      
      if (!blob) {
        throw new Error('Failed to generate PDF blob');
      }

      console.log('PDF blob generated successfully, size:', blob.size);

      // 2. Create a proper download trigger
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      
      // Use utility to sanitize filename with requested fallback
      const sanitizedTitle = sanitizeFilename(title, 'vestigio-document');
      
      link.href = url;
      link.download = `${sanitizedTitle}.pdf`;
      link.style.display = 'none';
      
      // 3. Programmatically trigger download
      document.body.appendChild(link);
      link.click();
      
      // 4. Cleanup
      document.body.removeChild(link);
      
      // Small timeout before revoking to ensure browser picks up the link action
      setTimeout(() => {
        URL.revokeObjectURL(url);
        console.log('PDF object URL revoked');
      }, 100);

    } catch (error) {
      console.error('Vector PDF Export failed:', error);
      alert('An error occurred while generating your manuscript PDF. Please ensure all assets are loaded and try again.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleNew = () => {
    setMarkdown('');
    setTitle('Untitled Manuscript');
    setSearchParams({});
    setHistory(['']);
    setCurrentIndex(0);
  };

  React.useEffect(() => {
    if (fileId) {
      const docs = storage.getDocuments();
      const doc = docs.find(d => d.id === fileId);
      if (doc) {
        setMarkdown(doc.content);
        setTitle(doc.title);
        setHistory([doc.content]);
        setCurrentIndex(0);
      }
    }
  }, [fileId]);

  const updateMarkdown = (newText: string, addToHistory = true) => {
    setMarkdown(newText);
    if (addToHistory && newText !== history[currentIndex]) {
      const newHistory = history.slice(0, currentIndex + 1);
      newHistory.push(newText);
      // Limit history size to 50
      if (newHistory.length > 50) newHistory.shift();
      setHistory(newHistory);
      setCurrentIndex(newHistory.length - 1);
    }
  };

  const handleUndo = () => {
    if (currentIndex > 0) {
      const prev = history[currentIndex - 1];
      setCurrentIndex(currentIndex - 1);
      setMarkdown(prev);
    }
  };

  const handleRedo = () => {
    if (currentIndex < history.length - 1) {
      const next = history[currentIndex + 1];
      setCurrentIndex(currentIndex + 1);
      setMarkdown(next);
    }
  };

  React.useEffect(() => {
    setCharCount(markdown.length);
    
    // Auto-save logic
    if (settings.autosave) {
      const timer = setTimeout(() => {
        handleSave();
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [markdown, title, settings.autosave]);

  const handleSave = () => {
    // Determine the title to save, ensuring it's not empty or just whitespace
    const finalTitle = title.trim() || 'Untitled Manuscript';
    
    if (!markdown && finalTitle === 'Untitled Manuscript') return;
    
    setIsSaving(true);
    const doc: Document = {
      id: fileId || Math.random().toString(36).substr(2, 9),
      title: finalTitle,
      content: markdown,
      updatedAt: Date.now()
    };
    storage.saveDocument(doc);
    if (!fileId) {
      setSearchParams({ id: doc.id });
    }
    setTimeout(() => setIsSaving(false), 500);
  };

  const insertMarkdown = (prefix: string, suffix: string = '') => {
    if (!editorRef.current) return;
    
    const start = editorRef.current.selectionStart;
    const end = editorRef.current.selectionEnd;
    const text = editorRef.current.value;
    const selectedText = text.substring(start, end);
    
    const before = text.substring(0, start);
    const after = text.substring(end);
    
    const newText = `${before}${prefix}${selectedText}${suffix}${after}`;
    updateMarkdown(newText);
    
    // Focus back and set selection
    setTimeout(() => {
      if (editorRef.current) {
        editorRef.current.focus();
        const newCursorPos = start + prefix.length + selectedText.length + suffix.length;
        editorRef.current.setSelectionRange(newCursorPos, newCursorPos);
      }
    }, 0);
  };

  const handleDownload = () => {
    const blob = new Blob([markdown], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = window.document.createElement('a');
    a.href = url;
    a.download = `${sanitizeFilename(title, 'vestigio-document')}.md`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const toolbarButtons = [
    { icon: Bold, label: 'Bold', action: () => insertMarkdown('**', '**') },
    { icon: Italic, label: 'Italic', action: () => insertMarkdown('*', '*') },
    { icon: Heading1, label: 'H1', action: () => insertMarkdown('# ') },
    { icon: Heading2, label: 'H2', action: () => insertMarkdown('## ') },
    { icon: Heading3, label: 'H3', action: () => insertMarkdown('### ') },
    { icon: List, label: 'List', action: () => insertMarkdown('- ') },
    { icon: ListOrdered, label: 'Ordered List', action: () => insertMarkdown('1. ') },
    { icon: Quote, label: 'Quote', action: () => insertMarkdown('> ') },
    { icon: Code, label: 'Code', action: () => insertMarkdown('`', '`') },
  ];

  return (
    <div className="flex-1 flex flex-col h-[calc(100vh-80px-48px)] bg-inherit">
      {/* Top Bar / Editor Controls */}
      <div className="h-14 border-b flex items-center justify-between px-4 sm:px-6 no-print overflow-x-auto" style={{ backgroundColor: 'var(--panel-bg)', borderColor: 'var(--border-main)' }}>
        <div className="flex items-center space-x-2 sm:space-x-4 min-w-max">
          <button
            onClick={handleNew}
            className="p-1.5 text-gold-600 hover:bg-gold-50 rounded transition-all border border-gold-500/20"
            title="New Manuscript"
          >
            <Plus size={16} />
          </button>
          
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onBlur={() => {
              if (!title.trim()) {
                setTitle('Untitled Manuscript');
              }
            }}
            className="bg-transparent border-none focus:ring-0 font-medium text-sm w-32 sm:w-48 opacity-70 hover:opacity-100 placeholder:opacity-40 transition-opacity"
            style={{ color: 'var(--text-main)' }}
            placeholder="Manuscript Title..."
          />
          
          <div className="h-4 w-px bg-parchment-300 mx-2 hidden sm:block" />

          {/* Desktop Only Toolbar */}
          <div className="hidden lg:flex items-center space-x-1">
            {toolbarButtons.map((btn, idx) => (
              <button
                key={idx}
                onClick={btn.action}
                className="p-1.5 hover:text-gold-600 hover:bg-parchment-300 rounded transition-all group relative opacity-60 hover:opacity-100"
                style={{ color: 'var(--text-main)' }}
                title={btn.label}
              >
                <btn.icon size={16} />
              </button>
            ))}
          </div>

          {/* Mobile Only View Toggle */}
          <div className="flex lg:hidden items-center bg-parchment-200 rounded-full p-1 border border-parchment-300">
            <button 
              onClick={() => setViewMode('edit')}
              className={cn(
                "p-1.5 rounded-full transition-all flex items-center space-x-2 px-3",
                viewMode === 'edit' ? "bg-white shadow-sm text-gold-600" : "opacity-40"
              )}
              style={viewMode !== 'edit' ? { color: 'var(--text-main)' } : {}}
            >
              <Pen size={14} />
              <span className="text-[10px] font-bold uppercase tracking-wider">Edit</span>
            </button>
            <button 
              onClick={() => setViewMode('compiled')}
              className={cn(
                "p-1.5 rounded-full transition-all flex items-center space-x-2 px-3",
                viewMode === 'compiled' ? "bg-white shadow-sm text-gold-600" : "opacity-40"
              )}
              style={viewMode !== 'compiled' ? { color: 'var(--text-main)' } : {}}
            >
              <Eye size={14} />
              <span className="text-[10px] font-bold uppercase tracking-wider">Folio</span>
            </button>
          </div>
        </div>

        <div className="flex items-center space-x-1 sm:space-x-2">
          {/* History Controls (Visible only in edit mode - desktop/mobile) */}
          {(viewMode === 'edit' || window.innerWidth > 1024) && (
            <>
              <button
                onClick={handleUndo}
                disabled={currentIndex === 0}
                className="p-1.5 hover:text-gold-600 disabled:opacity-20"
                style={{ color: 'var(--text-main)', opacity: 0.4 }}
              >
                <Undo2 size={16} />
              </button>
              <button
                onClick={handleRedo}
                disabled={currentIndex === history.length - 1}
                className="p-1.5 hover:text-gold-600 disabled:opacity-20"
                style={{ color: 'var(--text-main)', opacity: 0.4 }}
              >
                <Redo2 size={16} />
              </button>
              <div className="h-4 w-px bg-parchment-300 mx-2" />
            </>
          )}

          <div className="text-[10px] font-mono uppercase tracking-widest hidden xl:block opacity-40" style={{ color: 'var(--text-main)' }}>
            {isSaving ? 'Synchronized' : `${charCount} CHARS`}
          </div>

          {/* Contextual Actions */}
          <div className="flex items-center space-x-1 sm:space-x-2">
            <button
              onClick={handleSave}
              className="p-2 text-gold-600 hover:bg-gold-50 rounded transition-all"
              title="Save Local"
            >
              <Save size={18} className={isSaving ? "animate-pulse" : ""} />
            </button>
            
            <button
              onClick={handleDownload}
              className="p-2 text-ink-700/60 hover:text-gold-600 hover:bg-parchment-300 rounded transition-all"
              title="Download Markdown"
            >
              <Download size={18} />
            </button>
            <button
              onClick={handleExportPDF}
              className="p-2 text-ink-700/60 hover:text-gold-600 hover:bg-parchment-300 rounded transition-all"
              title="Download PDF"
            >
              <Printer size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Editor Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Editor Pane (Desktop always, Mobile only if 'edit') */}
        <div 
          className={cn(
            "lg:w-1/2 w-full flex flex-col border-r bg-inherit no-print transition-all duration-300",
            viewMode === 'edit' ? "flex" : "hidden lg:flex"
          )}
          style={{ borderColor: 'var(--border-main)' }}
        >
          {/* Mobile Toolbars - floating above editor */}
          <div className="lg:hidden flex items-center justify-between p-2 border-b border-parchment-300 bg-parchment-50 no-print">
            <div className="flex items-center space-x-1 overflow-x-auto scrollbar-hide">
              {toolbarButtons.map((btn, idx) => (
                <button
                  key={idx}
                  onClick={btn.action}
                  className="p-2 hover:text-gold-600 opacity-60"
                  style={{ color: 'var(--text-main)' }}
                >
                  <btn.icon size={14} />
                </button>
              ))}
            </div>
            <span className="text-[10px] font-mono opacity-30 whitespace-nowrap ml-2" style={{ color: 'var(--text-main)' }}>{charCount}c</span>
          </div>

          <textarea
            ref={editorRef}
            value={markdown}
            onChange={(e) => updateMarkdown(e.target.value)}
            className="flex-1 p-6 sm:p-10 resize-none bg-transparent border-none focus:ring-0 font-sans text-lg leading-relaxed"
            style={{ color: 'var(--text-main)', caretColor: 'var(--color-gold-600)' }}
            placeholder="Begin your narrative..."
          />
        </div>

        {/* Preview Pane (Desktop always, Mobile only if 'compiled') */}
        <div 
          className={cn(
            "lg:w-1/2 w-full overflow-y-auto flex flex-col p-4 sm:p-10 items-center scrollbar-hide transition-all duration-300",
            viewMode === 'compiled' ? "flex" : "hidden lg:flex"
          )}
          style={{ backgroundColor: 'color-mix(in srgb, var(--bg-main), transparent 30%)' }}
        >
          <ManuscriptPreview content={markdown} forwardRef={previewRef} />
        </div>
      </div>
    </div>
  );
}