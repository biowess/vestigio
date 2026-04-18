import React from 'react';
import { useSettings } from '../context/SettingsContext';
import { Sun, Type, Activity, Palette } from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '../lib/utils';
import { Settings } from '../types';

export function SettingsPage() {
  const { settings, updateSettings } = useSettings();

  return (
    <div className="max-w-3xl mx-auto w-full px-6 py-12 sm:py-20 flex-1">
      <header className="mb-12 sm:mb-16">
        <h1 className="text-4xl font-display font-medium text-ink-900 mb-2">Instrument Configuration</h1>
        <p className="text-ink-700/60 font-serif italic text-lg">Fine-tune your writing environment.</p>
      </header>

      <div className="space-y-8 sm:space-y-12">
        {/* Font Controls */}
        <section className="border rounded-2xl p-6 sm:p-8 shadow-tactile" style={{ backgroundColor: 'var(--panel-bg)', borderColor: 'var(--border-main)' }}>
          <div className="flex items-center space-x-3 mb-8">
            <Type size={20} className="text-gold-600" />
            <h2 className="text-lg font-display m-0" style={{ color: 'var(--text-main)' }}>Composition Scale</h2>
          </div>

          <div className="space-y-8">
            <div>
              <div className="flex justify-between mb-4">
                <span className="text-sm font-medium">Typographic Size (UI Only)</span>
                <span className="font-mono text-sm text-gold-600">{settings.fontSize}px</span>
              </div>
              <input
                type="range"
                min="14"
                max="28"
                step="1"
                value={settings.fontSize}
                onChange={(e) => updateSettings({ fontSize: parseInt(e.target.value) })}
                className="w-full h-1.5 bg-parchment-300 rounded-lg appearance-none cursor-pointer accent-gold-500"
              />
              <div className="flex justify-between mt-2 text-[10px] font-mono uppercase text-ink-700/30">
                <span>Minimal</span>
                <span>Grand</span>
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-4">
                <span className="text-sm font-medium">Parchment Warmth (Print Only)</span>
                <span className="font-mono text-sm text-gold-600">{settings.parchmentWarmth}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                step="1"
                value={settings.parchmentWarmth}
                onChange={(e) => updateSettings({ parchmentWarmth: parseInt(e.target.value) })}
                className="w-full h-1.5 bg-parchment-300 rounded-lg appearance-none cursor-pointer accent-gold-500"
              />
            </div>
          </div>
        </section>

        {/* Behavior Toggles */}
        <section className="border rounded-2xl p-6 sm:p-8 shadow-tactile" style={{ backgroundColor: 'var(--panel-bg)', borderColor: 'var(--border-main)' }}>
          <div className="flex items-center space-x-3 mb-8">
            <Activity size={20} className="text-gold-600" />
            <h2 className="text-lg font-display text-ink-900 m-0">Instrument Behavior</h2>
          </div>

          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium">Archival Synchronization</h3>
                <p className="text-xs text-ink-700/50 font-serif italic">Automatically preserve changes in real-time.</p>
              </div>
              <button
                onClick={() => updateSettings({ autosave: !settings.autosave })}
                className={cn(
                  "w-12 h-6 rounded-full transition-all relative",
                  settings.autosave ? "bg-gold-500" : "bg-parchment-300"
                )}
              >
                <motion.div
                  animate={{ x: settings.autosave ? 26 : 2 }}
                  className="absolute top-1 left-0 w-4 h-4 bg-white rounded-full shadow-sm"
                />
              </button>
            </div>

            <div className="h-px bg-parchment-200" />

            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium">Reduction of Motion</h3>
                <p className="text-xs text-ink-700/50 font-serif italic">Disable atmospheric transitions for focus.</p>
              </div>
              <button
                onClick={() => updateSettings({ reducedMotion: !settings.reducedMotion })}
                className={cn(
                  "w-12 h-6 rounded-full transition-all relative",
                  settings.reducedMotion ? "bg-gold-500" : "bg-parchment-300"
                )}
              >
                <motion.div
                  animate={{ x: settings.reducedMotion ? 26 : 2 }}
                  className="absolute top-1 left-0 w-4 h-4 bg-white rounded-full shadow-sm"
                />
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
