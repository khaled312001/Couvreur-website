import React, { createContext, useContext, useState } from 'react';

// Contexte de langue pour le site en français
const LanguageContext = createContext();

// Hook personnalisé pour utiliser le contexte de langue
export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage doit être utilisé dans un LanguageProvider');
  }
  return context;
};

// Fournisseur de contexte de langue
export const LanguageProvider = ({ children }) => {
  // Langue par défaut : français
  const [language, setLanguage] = useState('fr');
  
  // Traductions en français
  const translations = {
    fr: {
      // Navigation
      nav: {
        home: 'Accueil',
        about: 'A propos',
        services: 'Services',
        gallery: 'Realisations',
        testimonials: 'Avis clients',
        contact: 'Contact',
        areas: 'Zones d\'intervention',
        pricing: 'Tarifs'
      },
      
      // Services
      services: {
        installation: 'Installation de toiture',
        repair: 'Reparation de fuites',
        maintenance: 'Entretien de toiture',
        cleaning: 'Nettoyage de toiture',
        demoussage: 'Demoussage et traitement hydrofuge',
        charpente: 'Travaux de charpente',
        couverture: 'Travaux de couverture',
        zinguerie: 'Travaux de zinguerie',
        extras: 'Services supplementaires'
      },
      
      // Actions
      actions: {
        getQuote: 'Obtenir un devis',
        contactUs: 'Nous contacter',
        learnMore: 'En savoir plus',
        bookService: 'Reserver un service',
        viewGallery: 'Voir nos realisations',
        readTestimonials: 'Lire les avis'
      },
      
      // Contact
      contact: {
        title: 'Contactez-nous',
        subtitle: 'Nous sommes la pour vous aider',
        name: 'Nom complet',
        email: 'Adresse e-mail',
        phone: 'Telephone',
        message: 'Votre message',
        send: 'Envoyer le message',
        address: 'Adresse',
        workingHours: 'Heures d\'ouverture'
      },
      
      // Footer
      footer: {
        company: 'Entreprise',
        services: 'Nos services',
        contact: 'Contact',
        legal: 'Mentions legales',
        privacy: 'Politique de confidentialite',
        terms: 'Conditions d\'utilisation',
        copyright: 'Tous droits reserves'
      },
      
      // Common
      common: {
        loading: 'Chargement...',
        error: 'Une erreur est survenue',
        success: 'Operation reussie',
        required: 'Champ obligatoire',
        optional: 'Optionnel',
        submit: 'Soumettre',
        cancel: 'Annuler',
        save: 'Enregistrer',
        delete: 'Supprimer',
        edit: 'Modifier',
        view: 'Voir',
        close: 'Fermer'
      }
    }
  };

  // Fonction pour obtenir une traduction
  const t = (key) => {
    const keys = key.split('.');
    let value = translations[language];
    
    for (const k of keys) {
      if (value && value[k]) {
        value = value[k];
      } else {
        console.warn(`Traduction manquante pour la clé: ${key}`);
        return key;
      }
    }
    
    return value;
  };

  // Fonction pour changer de langue (pour une future expansion)
  const changeLanguage = (newLanguage) => {
    setLanguage(newLanguage);
  };

  const value = {
    language,
    changeLanguage,
    t,
    translations: translations[language]
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export default LanguageContext;
