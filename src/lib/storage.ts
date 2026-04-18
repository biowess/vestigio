import { Document, Settings, DEFAULT_SETTINGS } from '../types';

const DOCUMENTS_KEY = 'vestigio_documents';
const SETTINGS_KEY = 'vestigio_settings';

export const storage = {
  getDocuments: (): Document[] => {
    const data = localStorage.getItem(DOCUMENTS_KEY);
    return data ? JSON.parse(data) : [];
  },

  saveDocument: (doc: Document): void => {
    const docs = storage.getDocuments();
    const index = docs.findIndex(d => d.id === doc.id);
    if (index >= 0) {
      docs[index] = { ...doc, updatedAt: Date.now() };
    } else {
      docs.unshift({ ...doc, updatedAt: Date.now() });
    }
    localStorage.setItem(DOCUMENTS_KEY, JSON.stringify(docs));
  },

  deleteDocument: (id: string): void => {
    const docs = storage.getDocuments().filter(d => d.id !== id);
    localStorage.setItem(DOCUMENTS_KEY, JSON.stringify(docs));
  },

  deleteAllDocuments: (): void => {
    try {
      localStorage.removeItem(DOCUMENTS_KEY);
      // Extra precaution: explicitly set to empty array string
      localStorage.setItem(DOCUMENTS_KEY, '[]');
      // Dispatch storage event for cross-tab/component reactivity
      window.dispatchEvent(new Event('storage'));
    } catch (error) {
      console.error("Storage vault access failure:", error);
      throw error;
    }
  },

  getSettings: (): Settings => {
    const data = localStorage.getItem(SETTINGS_KEY);
    if (!data) return DEFAULT_SETTINGS;
    
    // Migration: if 'intensity' exists and 'parchmentWarmth' doesn't, map it
    const parsed = JSON.parse(data);
    if (parsed.intensity !== undefined && parsed.parchmentWarmth === undefined) {
      parsed.parchmentWarmth = parsed.intensity;
      delete parsed.intensity;
    }
    
    return { ...DEFAULT_SETTINGS, ...parsed };
  },

  saveSettings: (settings: Settings): void => {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
  }
};
