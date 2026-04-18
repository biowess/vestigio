import React from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface SplashScreenProps {
  isVisible: boolean;
}

export function SplashScreen({ isVisible }: SplashScreenProps) {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="splash-screen"
          /* Slow luxurious fade out of the entire overlay */
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center pointer-events-none"
          style={{ backgroundColor: 'var(--bg-main)' }} // Syncs strictly with your parchment theme
        >
          {/* Main Title: Vintage mechanical tracking expansion & blur resolve */}
          <motion.div
            initial={{ opacity: 0, letterSpacing: '-0.1em', filter: 'blur(8px)' }}
            animate={{ opacity: 1, letterSpacing: '0.02em', filter: 'blur(0px)' }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="flex-1 flex items-center justify-center"
          >
            <h1 className="font-cursive text-7xl md:text-9xl text-gold-600 drop-shadow-sm">
              Vestigio
            </h1>
          </motion.div>

          {/* Subtitle: Subtle monospace watermark at the bottom */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 0.4, y: 0 }}
            transition={{ delay: 0.5, duration: 1, ease: "easeOut" }}
            className="absolute bottom-8 font-mono text-[10px] uppercase tracking-widest text-gold-700"
          >
            biowess 2026
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}