import React, { createContext, useState } from 'react';
import langData from '../Lang.json'; 

// Création du contexte
export const LangContext = createContext();

// Fournisseur de contexte
export const LangProvider = ({ children }) => {

    const [language, setLanguage] = useState('EN'); // État initial de la langue

    // Fonction pour changer la langue
    const changeLanguage = (lang) => {
        setLanguage(lang);
    };

    // Obtenez les données de langue actuelles
    const currentLangData = langData[language];

    return (
        <LangContext.Provider value={{ language, changeLanguage, currentLangData }}>
            {children}
        </LangContext.Provider>
    );
};
