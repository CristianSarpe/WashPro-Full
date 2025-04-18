import React, { createContext, useState, useEffect } from 'react';
import ro from './locales/locales/locales/ro.json';
import ru from './locales/locales/locales/ru.json';

export const TranslationContext = createContext();

const translations = { ro, ru };

export const TranslationProvider = ({ children }) => {
    const savedLanguage = localStorage.getItem('language') || 'ro';
    const [language, setLanguage] = useState(savedLanguage);
    const [texts, setTexts] = useState(translations[savedLanguage]);

    useEffect(() => {
        localStorage.setItem('language', language);
        setTexts(translations[language]); // Schimbă textele când limba se modifică
    }, [language]);

    return (
        <TranslationContext.Provider value={{ texts, setLanguage }}>
            {children}
        </TranslationContext.Provider>
    );
};
