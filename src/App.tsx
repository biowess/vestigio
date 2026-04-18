import React, { useState, useEffect } from 'react'; // Add hooks
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { AppShell } from './components/AppShell';
import { EditorPage } from './pages/EditorPage';
import { FilesPage } from './pages/FilesPage';
import { DocsPage } from './pages/DocsPage';
import { SettingsPage } from './pages/SettingsPage';
import { AboutPage } from './pages/AboutPage';
import { SettingsProvider } from './context/SettingsContext';

// 1. Import the new component
import { SplashScreen } from './components/SplashScreen'; 

export default function App() {
  // 2. Setup isolated, top-level visibility state
  const [showSplash, setShowSplash] = useState(true);

  // 3. Simple timeout mechanism (1.5 seconds)
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 1500);
    return () => clearTimeout(timer); // Clean up on unmount just in case
  }, []);

  return (
    <SettingsProvider>
      {/* 4. Mount purely as an overlay */}
      <SplashScreen isVisible={showSplash} />
      
      {/* Your standard routing remains completely unbothered below */}
      <Router>
        <AppShell>
          <Routes>
            <Route path="/" element={<EditorPage />} />
            <Route path="/files" element={<FilesPage />} />
            <Route path="/docs" element={<DocsPage />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="/about" element={<AboutPage />} />
          </Routes>
        </AppShell>
      </Router>
    </SettingsProvider>
  );
}
