import React, { createContext, useContext, useState, useEffect } from 'react';
import { Settings, DEFAULT_SETTINGS } from '../types';
import { storage } from '../lib/storage';

interface SettingsContextType {
  settings: Settings;
  updateSettings: (newSettings: Partial<Settings>) => void;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = useState<Settings>(storage.getSettings());

  const updateSettings = (newSettings: Partial<Settings>) => {
    const updated = { ...settings, ...newSettings };
    setSettings(updated);
    storage.saveSettings(updated);
  };

  // Sync with storage on mount just in case
  useEffect(() => {
    setSettings(storage.getSettings());
  }, []);

  return (
    <SettingsContext.Provider value={{ settings, updateSettings }}>
      <div 
        className={`theme-${settings.theme} min-h-screen`}
        style={{ 
          '--base-font-size': `${settings.fontSize}px`
        } as React.CSSProperties}
      >
        {children}
      </div>
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
}
