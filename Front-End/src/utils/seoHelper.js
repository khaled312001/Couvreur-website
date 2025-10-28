/**
 * SEO Helper Functions
 * Provides French SEO utilities for BN BÂTIMENT
 */

/**
 * Generate SEO-friendly French title
 */
export const generateFrenchTitle = (page, city, service) => {
  const baseTitle = 'BN BÂTIMENT - Expert Couvreur Lyon Saint-Étienne Valence Clermont-Ferrand Grenoble';
  
  const pageTitles = {
    home: 'BN BÂTIMENT - Couvreur Professionnel Lyon | Installation Réparation Entretien Toiture 24h/24',
    about: 'À Propos BN BÂTIMENT - Expert Couvreur Lyon Saint-Étienne Valence',
    contact: 'Contact BN BÂTIMENT - Devis Gratuit Couvreur Lyon Intervention 24h/24',
    services: 'Services BN BÂTIMENT - Installation Réparation Entretien Toiture',
    blog: 'Blog BN BÂTIMENT - Conseils Toiture Charpente Couverture Zinguerie',
    gallery: 'Réalisations BN BÂTIMENT - Galerie Travaux Toiture Lyon',
    testimonials: 'Avis Clients BN BÂTIMENT - Témoignages Couvreur Lyon',
    areas: 'Zones d\'intervention BN BÂTIMENT - Lyon Saint-Étienne Valence Clermont-Ferrand Grenoble',
    pricing: 'Tarifs BN BÂTIMENT - Devis Gratuit Toiture Lyon'
  };
  
  let title = pageTitles[page] || baseTitle;
  
  if (city) {
    title = `${title} - Couvreur ${city}`;
  }
  
  if (service) {
    title = `${service} - ${title}`;
  }
  
  return title;
};

/**
 * Generate SEO-friendly French description
 */
export const generateFrenchDescription = (page, city, service, context = {}) => {
  const baseDescription = 'BN BÂTIMENT, expert en installation, réparation et entretien de toiture. Intervention rapide 24h/24. Devis gratuit. Plus de 200 clients satisfaits. Certifié Qualibat, assurance décennale.';
  
  const pageDescriptions = {
    home: `BN BÂTIMENT - Couvreur professionnel à ${city || 'Lyon, Saint-Étienne, Valence, Clermont-Ferrand, Grenoble'}. Installation de toiture, réparation des fuites, entretien, démoussage et nettoyage. Devis gratuit et intervention rapide 24h/24. Plus de 200 clients satisfaits. Certifié Qualibat, assurance décennale.`,
    about: 'Découvrez BN BÂTIMENT, expert en charpente, couverture et zinguerie. Plus de 10 ans d\'expérience. Intervention 24h/24. Devis gratuit. Certifié Qualibat.',
    contact: 'Contactez BN BÂTIMENT pour un devis gratuit en charpente, couverture et zinguerie. Intervention 24h/24. Expert toiture certifié. Réparation, installation, rénovation toiture.',
    services: 'Services BN BÂTIMENT: Installation de toiture, réparation de fuites, entretien, démoussage. Intervention rapide 24h/24. Devis gratuit.',
    blog: 'Découvrez nos conseils et actualités sur la charpente, couverture et zinguerie. Expert toiture Lyon. Conseils entretien, réparation, installation toiture.',
    gallery: 'Découvrez nos réalisations en charpente, couverture et zinguerie. Avant/après, transformations toiture. Plus de 200 projets réalisés.',
    testimonials: 'Lisez les avis de nos clients. Plus de 200 témoignages sur notre expertise en charpente, couverture et zinguerie.',
    areas: 'BN BÂTIMENT intervient dans toute la région Rhône-Alpes pour charpente, couverture et zinguerie. Lyon, Saint-Étienne, Valence, Clermont-Ferrand, Grenoble.',
    pricing: 'Tarifs transparents pour tous nos services de toiture. Devis gratuit. Financement disponible.'
  };
  
  let description = pageDescriptions[page] || baseDescription;
  
  if (city) {
    description = description.replace('Lyon', city);
  }
  
  return description;
};

/**
 * Generate French keywords
 */
export const generateFrenchKeywords = (page, city, service, topics = []) => {
  const baseKeywords = [
    'couvreur',
    'toiture',
    'charpente',
    'zinguerie',
    'installation toiture',
    'réparation toiture',
    'entretien toiture',
    'démoussage',
    'nettoyage toiture',
    'expert toiture',
    'couvreur professionnel',
    'devis gratuit',
    'intervention rapide',
    'urgence toiture',
    'BN BÂTIMENT'
  ];
  
  const cityKeywords = city ? [
    `couvreur ${city}`,
    `installation toiture ${city}`,
    `réparation toiture ${city}`,
    `entretien toiture ${city}`,
    `expert toiture ${city}`,
    `devis toiture ${city}`
  ] : [];
  
  const serviceKeywords = service ? [
    `${service} Lyon`,
    `${service} ${city || 'Lyon'}`,
    `expert ${service}`,
    `devis ${service}`
  ] : [];
  
  const pageKeywords = {
    home: ['page d\'accueil', 'accueil', 'services'],
    about: ['à propos', 'entreprise', 'histoire', 'équipe'],
    contact: ['contact', 'devis gratuit', 'appel', 'téléphone'],
    services: ['services', 'prestations', 'travaux'],
    blog: ['blog', 'articles', 'conseils', 'actualités'],
    gallery: ['réalisations', 'galerie', 'projets', 'avant après'],
    testimonials: ['avis', 'témoignages', 'clients', 'satisfaction'],
    areas: ['zones', 'intervention', 'région', 'secteur'],
    pricing: ['tarifs', 'prix', 'devis', 'budget']
  };
  
  return [
    ...baseKeywords,
    ...cityKeywords,
    ...serviceKeywords,
    ...(pageKeywords[page] || []),
    ...topics
  ].join(', ');
};

/**
 * Generate service-specific French alt text
 */
export const generateServiceAltText = (serviceName, city) => {
  const altTexts = {
    'installation': `Installation de toiture professionnelle par BN BÂTIMENT${city ? ' à ' + city : ''} - Expert couvreur certifié`,
    'repair': `Réparation de fuite de toiture par BN BÂTIMENT${city ? ' à ' + city : ''} - Urgence 24h/24`,
    'maintenance': `Entretien de toiture professionnel par BN BÂTIMENT${city ? ' à ' + city : ''} - Démoussage et nettoyage`,
    'cleaning': `Nettoyage et démoussage de toiture par BN BÂTIMENT${city ? ' à ' + city : ''} - Traitement hydrofuge`,
    'zinguerie': `Travaux de zinguerie par BN BÂTIMENT${city ? ' à ' + city : ''} - Expert zingueur`,
    'charpente': `Charpente traditionnelle et moderne par BN BÂTIMENT${city ? ' à ' + city : ''} - Charpentier expert`,
    'couverture': `Couverture de toiture par BN BÂTIMENT${city ? ' à ' + city : ''} - Expert couvreur`
  };
  
  return altTexts[serviceName] || `Service de toiture par BN BÂTIMENT${city ? ' à ' + city : ''} - Expert couvreur`;
};

/**
 * Generate French image caption
 */
export const generateImageCaption = (imageName, service, city) => {
  return `${service || 'Travaux'} de toiture par BN BÂTIMENT${city ? ' à ' + city : ''} - Expert couvreur certifié Lyon`;
};
