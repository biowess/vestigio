import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FileText, Download, Printer, Trash2, Calendar, FileCode, Eraser } from 'lucide-react';
import { storage } from '../lib/storage';
import { Document } from '../types';
import { formatDate, cn, sanitizeFilename } from '../lib/utils';
import { motion, AnimatePresence } from 'motion/react';

export function FilesPage() {
  const navigate = useNavigate();
  const [docs, setDocs] = React.useState<Document[]>([]);
  const [isDeleting, setIsDeleting] = React.useState(false);
  const [showSuccess, setShowSuccess] = React.useState(false);
  const [showPurgeModal, setShowPurgeModal] = React.useState(false);
  const [fileToDelete, setFileToDelete] = React.useState<string | null>(null);

  React.useEffect(() => {
    setDocs(storage.getDocuments());
  }, []);

  const handleDeleteClick = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setFileToDelete(id);
  };

  const executeSingleDelete = () => {
    if (fileToDelete) {
      storage.deleteDocument(fileToDelete);
      setDocs(storage.getDocuments());
      setFileToDelete(null);
    }
  };

  const executePurge = () => {
    setIsDeleting(true);
    setShowPurgeModal(false);
    
    // Intentional micro-delay for mechanical feedback and storage synchronization
    setTimeout(() => {
      try {
        storage.deleteAllDocuments();
        
        // Force immediate state update
        setDocs([]);
        setShowSuccess(true);
        
        // Verify deletion by reading back from storage
        const verification = storage.getDocuments();
        if (verification.length > 0) {
          throw new Error("Persistence layer failed to clear.");
        }

        setTimeout(() => setShowSuccess(false), 3000);
      } catch (error) {
        console.error("Critical failure during archival purge:", error);
        alert("A critical storage error occurred. Your manuscripts could not be fully purged.");
      } finally {
        setIsDeleting(false);
      }
    }, 800);
  };

  const handleDownload = (doc: Document, e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      const blob = new Blob([doc.content], { type: 'text/markdown' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${sanitizeFilename(doc.title, 'vestigio-document')}.md`;
      a.style.display = 'none';
      
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      
      setTimeout(() => {
        URL.revokeObjectURL(url);
      }, 100);
    } catch (error) {
      console.error("Download failed:", error);
      alert("Failed to download raw file. Please try again.");
    }
  };

  return (
    <div className="max-w-5xl mx-auto w-full px-6 py-12 flex-1">
      <header className="mb-12 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        <div>
          <h1 className="text-4xl font-display font-medium mb-2" style={{ color: 'var(--text-main)' }}>My Library</h1>
          <p className="font-serif italic text-lg opacity-60" style={{ color: 'var(--text-main)' }}>A chronicle of your mechanical compositions.</p>
        </div>
        <div className="flex flex-col items-end space-y-2">
          {docs.length > 0 && (
            <button
              onClick={() => setShowPurgeModal(true)}
              disabled={isDeleting}
              className={cn(
                "flex items-center space-x-2 px-4 py-2 text-xs font-bold uppercase tracking-widest rounded-lg transition-all",
                isDeleting 
                  ? "opacity-50 cursor-not-allowed bg-red-50 text-red-400" 
                  : "text-red-500/60 hover:text-red-600 hover:bg-red-50"
              )}
              title="Delete all manuscripts permanently"
            >
              {isDeleting ? (
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 border-2 border-red-500/30 border-t-red-500 rounded-full animate-spin" />
                  <span>Purging...</span>
                </div>
              ) : (
                <>
                  <Eraser size={14} />
                  <span>Delete All Files</span>
                </>
              )}
            </button>
          )}
          <AnimatePresence>
            {showSuccess && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="text-[10px] font-mono uppercase tracking-widest text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full shadow-sm"
              >
                All files successfully purged
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </header>

      {/* Purge Confirmation Modal */}
      <AnimatePresence>
        {showPurgeModal && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center px-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowPurgeModal(false)}
              className="absolute inset-0 bg-parchment-900/40 backdrop-blur-md"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-md p-8 rounded-2xl border shadow-2xl overflow-hidden"
              style={{ backgroundColor: 'var(--panel-bg)', borderColor: 'var(--border-main)' }}
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-red-500/50" />
              
              <div className="flex items-center space-x-4 mb-6">
                <div className="p-3 bg-red-50 text-red-600 rounded-full">
                  <Trash2 size={24} />
                </div>
                <h3 className="text-2xl font-display font-medium" style={{ color: 'var(--text-main)' }}>Irreversible Action</h3>
              </div>
              
              <p className="font-serif text-lg leading-relaxed mb-8 opacity-80" style={{ color: 'var(--text-main)' }}>
                You are about to permanently purge all manuscripts from the central archive. This action is mechanical and cannot be reversed. All narratives will be lost to time.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={executePurge}
                  className="flex-1 px-6 py-3 bg-red-600 text-white rounded-xl font-bold uppercase tracking-widest text-[10px] hover:bg-red-700 transition-all shadow-tactile shadow-red-600/20"
                >
                  Confirm Purge
                </button>
                <button
                  onClick={() => setShowPurgeModal(false)}
                  className="flex-1 px-6 py-3 bg-parchment-200 rounded-xl font-bold uppercase tracking-widest text-[10px] hover:bg-parchment-300 transition-all"
                  style={{ color: 'var(--text-main)' }}
                >
                  Preserve Files
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Single File Delete Modal */}
      <AnimatePresence>
        {fileToDelete && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center px-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={(e) => { e.stopPropagation(); setFileToDelete(null); }}
              className="absolute inset-0 bg-parchment-900/40 backdrop-blur-md"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-md p-8 rounded-2xl border shadow-2xl overflow-hidden"
              style={{ backgroundColor: 'var(--panel-bg)', borderColor: 'var(--border-main)' }}
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-red-500/50" />
              
              <div className="flex items-center space-x-4 mb-6">
                <div className="p-3 bg-red-50 text-red-600 rounded-full">
                  <Trash2 size={24} />
                </div>
                <h3 className="text-2xl font-display font-medium" style={{ color: 'var(--text-main)' }}>Discard Manuscript</h3>
              </div>
              
              <p className="font-serif text-lg leading-relaxed mb-8 opacity-80" style={{ color: 'var(--text-main)' }}>
                You are about to permanently discard this manuscript. This action cannot be reversed.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={executeSingleDelete}
                  className="flex-1 px-6 py-3 bg-red-600 text-white rounded-xl font-bold uppercase tracking-widest text-[10px] hover:bg-red-700 transition-all shadow-tactile shadow-red-600/20"
                >
                  Confirm Discard
                </button>
                <button
                  onClick={() => setFileToDelete(null)}
                  className="flex-1 px-6 py-3 bg-parchment-200 rounded-xl font-bold uppercase tracking-widest text-[10px] hover:bg-parchment-300 transition-all"
                  style={{ color: 'var(--text-main)' }}
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {docs.length === 0 ? (
        <div className="border border-dashed rounded-2xl p-20 flex flex-col items-center justify-center text-center" style={{ borderColor: 'var(--border-main)' }}>
          <FileText size={48} className="mb-6 opacity-20" />
          <h3 className="text-xl font-display mb-2" style={{ color: 'var(--text-main)' }}>The archives are silent.</h3>
          <p className="font-serif mb-8 opacity-50" style={{ color: 'var(--text-main)' }}>Begin your first manuscript in the editor.</p>
          <button
            onClick={() => navigate('/')}
            className="px-8 py-3 bg-gold-600 text-white rounded-full font-medium hover:bg-gold-700 transition-all shadow-tactile"
          >
            Create New Manuscript
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {docs.map((doc, idx) => (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              key={doc.id}
              onClick={() => navigate(`/?id=${doc.id}`)}
              className="group border p-6 rounded-xl hover:border-gold-500/50 hover:shadow-premium transition-colors transition-shadow cursor-pointer relative overflow-hidden"
              style={{ backgroundColor: 'var(--panel-bg)', borderColor: 'var(--border-main)' }}
            >
              <div className="absolute top-0 left-0 w-1 h-full bg-gold-500/10 group-hover:bg-gold-500 transition-all" />
              
              <div className="flex justify-between items-start mb-4">
                <div className="p-2 bg-parchment-200 rounded-lg text-gold-600 group-hover:bg-gold-100 transition-all no-print">
                  <FileText size={20} />
                </div>
                <div className="flex space-x-1 opacity-100 lg:opacity-0 group-hover:opacity-100 transition-all">
                  <button
                    onClick={(e) => handleDownload(doc, e)}
                    className="p-1.5 hover:text-gold-600 transition-all"
                    style={{ color: 'var(--text-main)', opacity: 0.4 }}
                    title="Download RAW"
                  >
                    <FileCode size={16} />
                  </button>
                  <button
                    onClick={(e) => handleDeleteClick(doc.id, e)}
                    className="p-1.5 hover:text-red-500 transition-all"
                    style={{ color: 'var(--text-main)', opacity: 0.4 }}
                    title="Discard"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>

              <h3 className="font-display text-xl mb-4 line-clamp-1 group-hover:text-gold-700 transition-all" style={{ color: 'var(--text-main)' }}>
                {doc.title}
              </h3>
              
              <p className="font-serif text-sm line-clamp-3 mb-6 leading-relaxed opacity-60" style={{ color: 'var(--text-main)' }}>
                {doc.content.substring(0, 150) || "No content preserved."}
              </p>

              <div className="flex items-center text-[10px] font-mono uppercase tracking-[0.1em] opacity-40" style={{ color: 'var(--text-main)' }}>
                <Calendar size={12} className="mr-2" />
                {formatDate(doc.updatedAt)}
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
