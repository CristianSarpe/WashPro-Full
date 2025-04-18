import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { TranslationProvider } from './TranslationContext'; // Importăm providerul pentru limbă

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <TranslationProvider> {/* Adăugăm contextul pentru traducere */}
      <App />
    </TranslationProvider>
  </StrictMode>,
);

