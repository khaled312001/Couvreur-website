import React, { useState, useEffect, useRef } from 'react';
import { getServices } from '../api/services';
import { getGallery } from '../api/gallery';
import { getTestimonials } from '../api/testimonials';
import { fetchBlogPosts } from '../api/blog';
import { contactApi } from '../api/contact';
import ServiceCard from '../components/ServiceCard';
import GalleryItem from '../components/GalleryItem';
import BlogCard from '../components/BlogCard';
import Testimonial from '../components/Testimonial';
import AnimatedSection from '../components/AnimatedSection';
import { motion, useInView } from 'framer-motion';
import { getIconComponent } from '../utils/iconMapping';
import { getServiceImage } from '../utils/imageUtils';
import SEO from '../components/SEO';
import '../styles/main.css';


// Function to get the correct image URL for services
const getServiceImageUrl = (imagePath) => {
  if (!imagePath || imagePath === '' || imagePath === null) {
    return null;
  }
  
  // If it's already a full URL, return as is
  if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
    return imagePath;
  }
  
  // If it's a relative path, construct the full URL
  // Use the API route to serve images
  const baseUrl = 'https://api.bnbatiment.com/api';
  return `${baseUrl}${imagePath}`;
};

// Composant pour les statistiques animées
const AnimatedCounter = ({ end, duration = 2, suffix = "", prefix = "", title, icon }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, threshold: 0.5 });

  useEffect(() => {
    if (isInView) {
      let startTime = null;
      const animate = (currentTime) => {
        if (!startTime) startTime = currentTime;
        const progress = Math.min((currentTime - startTime) / (duration * 1000), 1);
        const currentCount = Math.floor(progress * end);
        setCount(currentCount);
        
        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };
      requestAnimationFrame(animate);
    }
  }, [isInView, end, duration]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.8 }}
      className="stat-item"
      style={{
        textAlign: "center",
        padding: "2rem",
        backgroundColor: "white",
        borderRadius: "20px",
        boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
        border: "1px solid #e2e8f0",
        transition: "all 0.3s ease"
      }}
    >
      <div className="stat-icon" style={{
        fontSize: "3rem",
        marginBottom: "1rem",
        display: "flex",
        justifyContent: "center"
      }}>
        {icon}
      </div>
      <div className="stat-number" style={{
        fontSize: "3rem",
        fontWeight: "800",
        color: "#3b82f6",
        marginBottom: "0.5rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "0.5rem"
      }}>
        {prefix}{count}{suffix}
      </div>
      <div className="stat-title" style={{
        fontSize: "1.1rem",
        fontWeight: "600",
        color: "#1e293b",
        textAlign: "center"
      }}>
        {title}
      </div>
    </motion.div>
  );
};

const Home = () => {
  if (process.env.NODE_ENV === 'development') {
    console.log('Home component loaded');
  }

  // SEO Data for Home Page - Enhanced for better search visibility and social sharing
  const seoData = {
    title: "BN BÂTIMENT - Expert Couvreur Lyon Saint-Étienne Valence | Installation Réparation Entretien Toiture 24h/24",
    description: "BN BÂTIMENT, expert couvreur à Lyon, Saint-Étienne, Valence, Clermont-Ferrand, Grenoble. Installation toiture, réparation fuites, entretien toiture, démoussage, nettoyage toiture. Intervention 24h/24, devis gratuit. Plus de 200 clients satisfaits. Certifié Qualibat, assurance décennale.",
    keywords: "couvreur Lyon, couvreur Saint-Étienne, couvreur Valence, couvreur Clermont-Ferrand, couvreur Grenoble, installation toiture Lyon, réparation fuites toiture Lyon, entretien toiture Lyon, démoussage toiture Lyon, nettoyage toiture Lyon, installation toiture Saint-Étienne, réparation fuites toiture Saint-Étienne, entretien toiture Saint-Étienne, démoussage toiture Saint-Étienne, nettoyage toiture Saint-Étienne, installation toiture Valence, réparation fuites toiture Valence, entretien toiture Valence, démoussage toiture Valence, nettoyage toiture Valence, installation toiture Clermont-Ferrand, réparation fuites toiture Clermont-Ferrand, entretien toiture Clermont-Ferrand, démoussage toiture Clermont-Ferrand, nettoyage toiture Clermont-Ferrand, installation toiture Grenoble, réparation fuites toiture Grenoble, entretien toiture Grenoble, démoussage toiture Grenoble, nettoyage toiture Grenoble, installation toiture Francheville, réparation fuites toiture Francheville, entretien toiture Francheville, démoussage toiture Francheville, nettoyage toiture Francheville, couvreur Francheville, installation toiture Givors, réparation fuites toiture Givors, entretien toiture Givors, démoussage toiture Givors, nettoyage toiture Givors, couvreur Givors, installation toiture Vienne, réparation fuites toiture Vienne, entretien toiture Vienne, démoussage toiture Vienne, nettoyage toiture Vienne, couvreur Vienne, installation toiture Le Pouzin, réparation fuites toiture Le Pouzin, entretien toiture Le Pouzin, démoussage toiture Le Pouzin, nettoyage toiture Le Pouzin, couvreur Le Pouzin, installation toiture Privas, réparation fuites toiture Privas, entretien toiture Privas, démoussage toiture Privas, nettoyage toiture Privas, couvreur Privas, installation toiture La Voulte-sur-Rhône, réparation fuites toiture La Voulte-sur-Rhône, entretien toiture La Voulte-sur-Rhône, démoussage toiture La Voulte-sur-Rhône, nettoyage toiture La Voulte-sur-Rhône, couvreur La Voulte-sur-Rhône, installation toiture Crest, réparation fuites toiture Crest, entretien toiture Crest, démoussage toiture Crest, nettoyage toiture Crest, couvreur Crest, installation toiture Loriol-sur-Drôme, réparation fuites toiture Loriol-sur-Drôme, entretien toiture Loriol-sur-Drôme, démoussage toiture Loriol-sur-Drôme, nettoyage toiture Loriol-sur-Drôme, couvreur Loriol-sur-Drôme, installation toiture Livron, réparation fuites toiture Livron, entretien toiture Livron, démoussage toiture Livron, nettoyage toiture Livron, couvreur Livron, installation toiture La Saulce, réparation fuites toiture La Saulce, entretien toiture La Saulce, démoussage toiture La Saulce, nettoyage toiture La Saulce, couvreur La Saulce, installation toiture Mirmande, réparation fuites toiture Mirmande, entretien toiture Mirmande, démoussage toiture Mirmande, nettoyage toiture Mirmande, couvreur Mirmande, installation toiture Montélimar, réparation fuites toiture Montélimar, entretien toiture Montélimar, démoussage toiture Montélimar, nettoyage toiture Montélimar, couvreur Montélimar, installation de toiture, réparation des fuites, entretien de toiture, démoussage et traitement hydrofuge, nettoyage de toiture, pose toiture, remplacement toiture, réparation infiltration toiture, réparation fuite toiture, détection fuite toiture, réparation rapide fuite toiture, maintenance toiture, entretien régulier toiture, prolonger durée vie toiture, démoussage traitement hydrofuge, élimination mousses toiture, traitement protecteur toiture, nettoyage haute pression toiture, nettoyage doux toiture, toiture propre, toiture saine, installation couverture, réparation couverture, entretien couverture, démoussage couverture, nettoyage couverture, installation tuiles, réparation tuiles, entretien tuiles, démoussage tuiles, nettoyage tuiles, installation ardoises, réparation ardoises, entretien ardoises, démoussage ardoises, nettoyage ardoises, installation zinc, réparation zinc, entretien zinc, démoussage zinc, nettoyage zinc, installation cuivre, réparation cuivre, entretien cuivre, démoussage cuivre, nettoyage cuivre, installation PVC, réparation PVC, entretien PVC, démoussage PVC, nettoyage PVC, installation aluminium, réparation aluminium, entretien aluminium, démoussage aluminium, nettoyage aluminium, installation acier, réparation acier, entretien acier, démoussage acier, nettoyage acier, installation inox, réparation inox, entretien inox, démoussage inox, nettoyage inox, installation titane, réparation titane, entretien titane, démoussage titane, nettoyage titane, installation composite, réparation composite, entretien composite, démoussage composite, nettoyage composite, installation bitume, réparation bitume, entretien bitume, démoussage bitume, nettoyage bitume, installation membrane, réparation membrane, entretien membrane, démoussage membrane, nettoyage membrane, installation étanchéité, réparation étanchéité, entretien étanchéité, démoussage étanchéité, nettoyage étanchéité, installation ventilation, réparation ventilation, entretien ventilation, démoussage ventilation, nettoyage ventilation, installation écran sous-toiture, réparation écran sous-toiture, entretien écran sous-toiture, démoussage écran sous-toiture, nettoyage écran sous-toiture, installation pare-vapeur, réparation pare-vapeur, entretien pare-vapeur, démoussage pare-vapeur, nettoyage pare-vapeur, installation liteaux, réparation liteaux, entretien liteaux, démoussage liteaux, nettoyage liteaux, installation volige, réparation volige, entretien volige, démoussage volige, nettoyage volige, installation chevrons, réparation chevrons, entretien chevrons, démoussage chevrons, nettoyage chevrons, installation pannes, réparation pannes, entretien pannes, démoussage pannes, nettoyage pannes, installation fermes, réparation fermes, entretien fermes, démoussage fermes, nettoyage fermes, installation poutres, réparation poutres, entretien poutres, démoussage poutres, nettoyage poutres, installation solives, réparation solives, entretien solives, démoussage solives, nettoyage solives, installation plancher, réparation plancher, entretien plancher, démoussage plancher, nettoyage plancher, installation escalier, réparation escalier, entretien escalier, démoussage escalier, nettoyage escalier, installation terrasse, réparation terrasse, entretien terrasse, démoussage terrasse, nettoyage terrasse, installation pergola, réparation pergola, entretien pergola, démoussage pergola, nettoyage pergola, installation abri jardin, réparation abri jardin, entretien abri jardin, démoussage abri jardin, nettoyage abri jardin, installation cabane, réparation cabane, entretien cabane, démoussage cabane, nettoyage cabane, installation chalet, réparation chalet, entretien chalet, démoussage chalet, nettoyage chalet, installation maison ossature bois, réparation maison ossature bois, entretien maison ossature bois, démoussage maison ossature bois, nettoyage maison ossature bois, installation construction bois, réparation construction bois, entretien construction bois, démoussage construction bois, nettoyage construction bois, installation rénovation bois, réparation rénovation bois, entretien rénovation bois, démoussage rénovation bois, nettoyage rénovation bois, installation traitement bois, réparation traitement bois, entretien traitement bois, démoussage traitement bois, nettoyage traitement bois, installation lasure, réparation lasure, entretien lasure, démoussage lasure, nettoyage lasure, installation peinture bois, réparation peinture bois, entretien peinture bois, démoussage peinture bois, nettoyage peinture bois, installation protection bois, réparation protection bois, entretien protection bois, démoussage protection bois, nettoyage protection bois, installation anti-termites, réparation anti-termites, entretien anti-termites, démoussage anti-termites, nettoyage anti-termites, installation anti-fongique, réparation anti-fongique, entretien anti-fongique, démoussage anti-fongique, nettoyage anti-fongique, installation hydrofuge, réparation hydrofuge, entretien hydrofuge, démoussage hydrofuge, nettoyage hydrofuge, installation oléofuge, réparation oléofuge, entretien oléofuge, démoussage oléofuge, nettoyage oléofuge, installation saturateur, réparation saturateur, entretien saturateur, démoussage saturateur, nettoyage saturateur, installation vernis, réparation vernis, entretien vernis, démoussage vernis, nettoyage vernis, installation enduit, réparation enduit, entretien enduit, démoussage enduit, nettoyage enduit, installation crépis, réparation crépis, entretien crépis, démoussage crépis, nettoyage crépis, installation ravalement façade, réparation ravalement façade, entretien ravalement façade, démoussage ravalement façade, nettoyage ravalement façade, installation rénovation façade, réparation rénovation façade, entretien rénovation façade, démoussage rénovation façade, nettoyage rénovation façade, installation nettoyage façade, réparation nettoyage façade, entretien nettoyage façade, démoussage nettoyage façade, nettoyage façade, installation hydrogommage, réparation hydrogommage, entretien hydrogommage, démoussage hydrogommage, nettoyage hydrogommage, installation sablage, réparation sablage, entretien sablage, démoussage sablage, nettoyage sablage, installation gommage, réparation gommage, entretien gommage, démoussage gommage, nettoyage gommage, installation ponçage, réparation ponçage, entretien ponçage, démoussage ponçage, nettoyage ponçage, devis gratuit installation toiture, devis gratuit réparation fuites, devis gratuit entretien toiture, devis gratuit démoussage, devis gratuit nettoyage toiture, prix installation toiture, prix réparation fuites, prix entretien toiture, prix démoussage, prix nettoyage toiture, tarifs installation toiture, tarifs réparation fuites, tarifs entretien toiture, tarifs démoussage, tarifs nettoyage toiture, intervention d'urgence installation toiture, intervention d'urgence réparation fuites, intervention d'urgence entretien toiture, intervention d'urgence démoussage, intervention d'urgence nettoyage toiture, BN BÂTIMENT, entreprise construction, artisan bâtiment, professionnel construction, expert construction, spécialiste construction, intervention construction, réparation construction, rénovation construction, maintenance construction, installation construction, pose construction, montage construction, assemblage construction, fabrication construction, réalisation construction, exécution construction, mise en œuvre construction, application construction, traitement construction, finition construction, décoration construction, aménagement construction, équipement construction, charpente Lyon, charpente Saint-Étienne, charpente Valence, zinguerie Lyon, zinguerie Saint-Étienne, zinguerie Valence, gouttières Lyon, gouttières Saint-Étienne, gouttières Valence, isolation toiture Lyon, isolation toiture Saint-Étienne, isolation toiture Valence, étanchéité toiture Lyon, étanchéité toiture Saint-Étienne, étanchéité toiture Valence, ventilation toiture Lyon, ventilation toiture Saint-Étienne, ventilation toiture Valence, écran sous-toiture Lyon, écran sous-toiture Saint-Étienne, écran sous-toiture Valence, pare-vapeur Lyon, pare-vapeur Saint-Étienne, pare-vapeur Valence, liteaux Lyon, liteaux Saint-Étienne, liteaux Valence, volige Lyon, volige Saint-Étienne, volige Valence, chevrons Lyon, chevrons Saint-Étienne, chevrons Valence, pannes Lyon, pannes Saint-Étienne, pannes Valence, fermes Lyon, fermes Saint-Étienne, fermes Valence, poutres Lyon, poutres Saint-Étienne, poutres Valence, solives Lyon, solives Saint-Étienne, solives Valence, plancher Lyon, plancher Saint-Étienne, plancher Valence, escalier Lyon, escalier Saint-Étienne, escalier Valence, terrasse Lyon, terrasse Saint-Étienne, terrasse Valence, pergola Lyon, pergola Saint-Étienne, pergola Valence, abri jardin Lyon, abri jardin Saint-Étienne, abri jardin Valence, cabane Lyon, cabane Saint-Étienne, cabane Valence, chalet Lyon, chalet Saint-Étienne, chalet Valence, maison ossature bois Lyon, maison ossature bois Saint-Étienne, maison ossature bois Valence, construction bois Lyon, construction bois Saint-Étienne, construction bois Valence, rénovation bois Lyon, rénovation bois Saint-Étienne, rénovation bois Valence, traitement bois Lyon, traitement bois Saint-Étienne, traitement bois Valence, lasure Lyon, lasure Saint-Étienne, lasure Valence, peinture bois Lyon, peinture bois Saint-Étienne, peinture bois Valence, protection bois Lyon, protection bois Saint-Étienne, protection bois Valence, anti-termites Lyon, anti-termites Saint-Étienne, anti-termites Valence, anti-fongique Lyon, anti-fongique Saint-Étienne, anti-fongique Valence, hydrofuge Lyon, hydrofuge Saint-Étienne, hydrofuge Valence, oléofuge Lyon, oléofuge Saint-Étienne, oléofuge Valence, saturateur Lyon, saturateur Saint-Étienne, saturateur Valence, vernis Lyon, vernis Saint-Étienne, vernis Valence, enduit Lyon, enduit Saint-Étienne, enduit Valence, crépis Lyon, crépis Saint-Étienne, crépis Valence, ravalement façade Lyon, ravalement façade Saint-Étienne, ravalement façade Valence, rénovation façade Lyon, rénovation façade Saint-Étienne, rénovation façade Valence, nettoyage façade Lyon, nettoyage façade Saint-Étienne, nettoyage façade Valence, hydrogommage Lyon, hydrogommage Saint-Étienne, hydrogommage Valence, sablage Lyon, sablage Saint-Étienne, sablage Valence, gommage Lyon, gommage Saint-Étienne, gommage Valence, ponçage Lyon, ponçage Saint-Étienne, ponçage Valence, certification Qualibat, assurance décennale, garantie décennale, plus de 200 clients satisfaits, intervention 24h 24, intervention 7j 7, devis gratuit, prix compétitifs, qualité exceptionnelle, expertise professionnelle, spécialiste toiture, expert couvreur, professionnel toiture, artisan couvreur, entreprise toiture, société toiture, compagnie toiture, service toiture, prestation toiture, travail toiture, chantier toiture, projet toiture, réalisation toiture, exécution toiture, mise en œuvre toiture, application toiture, traitement toiture, finition toiture, décoration toiture, aménagement toiture, équipement toiture, matériaux toiture, produits toiture, accessoires toiture, outils toiture, machines toiture, engins toiture, véhicules toiture, camions toiture, échafaudages toiture, échelles toiture, cordes toiture, harnais toiture, casques toiture, gants toiture, chaussures toiture, vêtements toiture, équipements de protection toiture, sécurité toiture, prévention toiture, formation toiture, qualification toiture, diplôme toiture, certificat toiture, attestation toiture, habilitation toiture, agrément toiture, autorisation toiture, licence toiture, permis toiture, déclaration toiture, déclaration d'ouverture de chantier, déclaration d'achèvement de travaux, déclaration d'intention de commencement de travaux, déclaration préalable, permis de construire, autorisation d'urbanisme, certificat d'urbanisme, attestation d'urbanisme, document d'urbanisme, plan local d'urbanisme, règlement national d'urbanisme, code de l'urbanisme, code de la construction, code de la santé publique, code du travail, code de la sécurité sociale, code des assurances, code civil, code de commerce, code pénal, code de procédure pénale, code de procédure civile, code de l'environnement, code forestier, code rural, code de la route, code de la défense, code de justice militaire, code de la propriété intellectuelle, code des postes et communications électroniques, code des transports, code de l'énergie, code minier, code de la recherche, code de l'éducation, code de l'action sociale et des familles, code de la santé publique, code de la sécurité intérieure, code de la défense, code de justice militaire, code de la propriété intellectuelle, code des postes et communications électroniques, code des transports, code de l'énergie, code minier, code de la recherche, code de l'éducation, code de l'action sociale et des familles",
    url: "/",
    image: "/1.jpg"
  };
  


  const createServiceSlug = (service) => {
    if (service.slug) return service.slug;
    if (service.title) {
      return service.title
        .toLowerCase()
        .replace(/[éèê]/g, 'e')
        .replace(/[àâ]/g, 'a')
        .replace(/[ùû]/g, 'u')
        .replace(/[ôö]/g, 'o')
        .replace(/[îï]/g, 'i')
        .replace(/[ç]/g, 'c')
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .replace(/^-|-$/g, '');
    }
    return service.id?.toString() || 'service';
  };

  const [services, setServices] = useState([]);
  const [gallery, setGallery] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [blogPosts, setBlogPosts] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loading, setLoading] = useState(true);
  const [contactFormData, setContactFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: ''
  });
  const [contactFormLoading, setContactFormLoading] = useState(false);
  const [contactFormSuccess, setContactFormSuccess] = useState(false);
  const [contactFormError, setContactFormError] = useState('');
  const [contactFormServices, setContactFormServices] = useState([]);
  const [loadingContactServices, setLoadingContactServices] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [startY, setStartY] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const scrollTrackRef = useRef(null);

  // Load data on component mount
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const [servicesData, galleryData, testimonialsData, blogData] = await Promise.all([
          getServices(),
          getGallery(),
          getTestimonials(),
          fetchBlogPosts()
        ]);
        setServices(servicesData);
        setGallery(galleryData);
        setTestimonials(testimonialsData);
        setBlogPosts(blogData);
        
        // Also set contact form services to avoid duplicate API call
        setContactFormServices(servicesData);
        setLoadingContactServices(false);
      } catch (error) {
        console.error('Error loading data:', error);
        // Fallback to default services if API fails
        setContactFormServices([
          { id: 1, title: "Installation", slug: "installation" },
          { id: 2, title: "Réparation", slug: "reparation" },
          { id: 3, title: "Entretien", slug: "entretien" },
          { id: 4, title: "Isolation", slug: "isolation" },
          { id: 5, title: "Charpente", slug: "charpente" },
          { id: 6, title: "Zinguerie", slug: "zinguerie" }
        ]);
        setLoadingContactServices(false);
      } finally {
        setLoading(false);
      }
    };
    
    loadData();
  }, []);

  // Hero slides data with professional French roofing images
  const heroSlides = [     
    {
      id: 1,
      image: 'https://www.satorytoiture.com/public/img/big/AdobeStock125087270jpg_62ea778f3406f.jpg',
      title: 'BN BÂTIMENT : Expert Installation Réparation Entretien Toiture',
      subtitle: 'Lyon - Saint-Étienne - Valence - Clermont-Ferrand - Grenoble',
      description: 'Installation de toiture, réparation des fuites, entretien de toiture, démoussage et traitement hydrofuge, nettoyage de toiture. Plus de 10 ans d\'expérience au service de votre toiture.',
      cta: 'DEMANDER UN DEVIS'
    },
    {     
      id: 2,
      image: 'https://www.guide-travaux-toiture.be/wp-content/uploads/sites/2/2024/08/toit-couvreur-1-1024x536.jpg',
      title: 'Installation de Toiture Professionnelle',
      subtitle: 'Lyon, Saint-Étienne, Valence, Clermont-Ferrand',
      description: 'Installation complète de toitures en tuiles, zinc et métal. Réparation des fuites, entretien de toiture, démoussage et traitement hydrofuge. Respect des normes et garantie décennale.',
      cta: 'NOS SERVICES'
    },
    {
      id: 4,
      image: 'https://les-couvreurs-du-var-83.fr/wp-content/uploads/2023/02/Construction-couvreur-ouvrier-charpentier-clouer-planche-de-bois-avec-un-marteau-sur-les-travaux-dinstallation-sur-le-toit.jpg',
      title: 'Démoussage et Nettoyage de Toiture',
      subtitle: 'Traitement hydrofuge professionnel',
      description: 'Démoussage et traitement hydrofuge, nettoyage de toiture haute pression. Installation, réparation, entretien de toiture. Service complet sur toute la région Rhône-Alpes.',
      cta: 'NOS PRESTATIONS'
    }
  ];

  // Services with professional French roofing images
  const servicesWithImages = [
    {
      id: 1,
      title: 'Installation de toiture',
      description: 'Installation complète de toitures en tuiles, zinc, ardoises et métal. Service sur Lyon, Saint-Étienne, Valence, Clermont-Ferrand, Grenoble',
      image: 'https://www.guide-toiture.com/wp-content/uploads/2023/04/voligeage.jpg',
      icon: '🏠',
      link: '/services/installation'
    },
    {
      id: 2,
      title: 'Réparation des fuites',
      description: 'Réparation rapide des fuites de toiture. Intervention d\'urgence 24h/24 sur toute la région Rhône-Alpes',
      image: 'https://www.guide-toiture.com/wp-content/uploads/2023/04/voligeage.jpg',
      icon: '🔧',
      link: '/services/repair'
    },
    {
      id: 3,
      title: 'Entretien de toiture',
      description: 'Entretien régulier et maintenance préventive de votre toiture. Service complet sur Lyon, Saint-Étienne, Valence',
      image: 'https://www.guide-toiture.com/wp-content/uploads/2023/04/voligeage.jpg',
      icon: '🛠️',
      link: '/services/entretien'
    },
    {
      id: 4,
      title: 'Démoussage et traitement hydrofuge',
      description: 'Démoussage professionnel et traitement hydrofuge pour protéger votre toiture. Service sur Clermont-Ferrand, Grenoble',
      image: 'https://www.guide-toiture.com/wp-content/uploads/2023/04/voligeage.jpg',
      icon: '🧹',
      link: '/services/demoussage'
    },
    {
      id: 5,
      title: 'Nettoyage de toiture',
      description: 'Nettoyage haute pression et entretien complet de votre toiture. Intervention sur toute la région',
      image: 'https://www.guide-toiture.com/wp-content/uploads/2023/04/voligeage.jpg',
      icon: '💧',
      link: '/services/nettoyage'
    },
    {
      id: 6,
      title: 'Installation de gouttières',
      description: 'Pose et réparation de gouttières en zinc et PVC. Service sur Lyon, Saint-Étienne, Valence, Clermont-Ferrand',
      image: 'https://www.guide-toiture.com/wp-content/uploads/2023/04/voligeage.jpg',
      icon: '🌧️',
      link: '/services/gouttieres'
    }
  ];

  // Auto-slide effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [heroSlides.length]);

  // Manual slide navigation
  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  };

  // Scroll animations
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, observerOptions);

    const elements = document.querySelectorAll('.fade-in-on-scroll');
    elements.forEach(el => observer.observe(el));

    return () => {
      elements.forEach(el => observer.unobserve(el));
    };
  }, []);

  // Contact form handlers
  const handleContactFormChange = (e) => {
    setContactFormData({
      ...contactFormData,
      [e.target.name]: e.target.value
    });
  };

  const handleContactFormSubmit = async (e) => {
    e.preventDefault();
    setContactFormLoading(true);
    setContactFormError('');

    try {
      await contactApi.createMessage({
        name: contactFormData.name,
        email: contactFormData.email,
        phone: contactFormData.phone,
        subject: contactFormData.service ? `Demande de devis - ${contactFormData.service}` : 'Demande de devis',
        message: contactFormData.message
      });
      setContactFormSuccess(true);
      setContactFormData({
        name: '',
        email: '',
        phone: '',
        service: '',
        message: ''
      });
    } catch (err) {
      console.error('Error submitting contact form:', err);
      setContactFormError('Une erreur s\'est produite. Veuillez réessayer.');
    } finally {
      setContactFormLoading(false);
    }
  };

  // Carousel functions
  const scrollCarouselLeft = () => {
    const carousel = document.getElementById('blogCarousel');
    if (carousel) {
      carousel.scrollBy({
        left: -carousel.offsetWidth,
        behavior: 'smooth'
      });
    }
  };

  const scrollCarouselRight = () => {
    const carousel = document.getElementById('blogCarousel');
    if (carousel) {
      carousel.scrollBy({
        left: carousel.offsetWidth,
        behavior: 'smooth'
      });
    }
  };
 
  // Mouse drag functions for services scroll
  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - scrollTrackRef.current.offsetLeft);
    setStartY(e.pageY);
    setScrollLeft(scrollTrackRef.current.scrollLeft);
    scrollTrackRef.current.style.cursor = 'grabbing';
    scrollTrackRef.current.style.animationPlayState = 'paused';
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
    if (scrollTrackRef.current) {
      scrollTrackRef.current.style.cursor = 'grab';
      scrollTrackRef.current.style.animationPlayState = 'running';
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    if (scrollTrackRef.current) {
      scrollTrackRef.current.style.cursor = 'grab';
      scrollTrackRef.current.style.animationPlayState = 'running';
    }
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    
    // Vérifier si le mouvement est suffisamment horizontal pour être considéré comme un glissement
    const deltaX = Math.abs(e.pageX - (startX + scrollTrackRef.current.offsetLeft));
    const deltaY = Math.abs(e.pageY - startY);
    
    if (deltaX > deltaY && deltaX > 5) {
      // Mouvement horizontal - permettre le glissement du carousel
      e.preventDefault();
      const x = e.pageX - scrollTrackRef.current.offsetLeft;
      const walk = (x - startX) * 3; // زيادة سرعة التمرير
      scrollTrackRef.current.scrollLeft = scrollLeft - walk;
    }
  };

  // إضافة event listeners للتحكم بالتمرير
  useEffect(() => {
    const track = scrollTrackRef.current;
    if (!track) return;

    const handleWheel = (e) => {
      // Vérifier si le défilement est principalement horizontal ou vertical
      const isHorizontalScroll = Math.abs(e.deltaX) > Math.abs(e.deltaY);
      
      if (isHorizontalScroll || e.shiftKey) {
        // Défilement horizontal - rediriger vers le carousel
        e.preventDefault();
        track.scrollLeft += e.deltaX || e.deltaY;
      } else {
        // Défilement vertical - permettre le défilement normal de la page
        // Ne pas empêcher l'événement par défaut
        return;
      }
    };

    track.addEventListener('wheel', handleWheel, { passive: false });
    
    return () => {
      track.removeEventListener('wheel', handleWheel);
    };
  }, []);

  return (
    <div className="home-page">
      <SEO {...seoData} />
      {/* Animated Background */}
      <div className="animated-background">
        <div className="floating-shapes">
          <div className="shape shape-1"></div>
          <div className="shape shape-2"></div>
          <div className="shape shape-3"></div>
          <div className="shape shape-4"></div>
          <div className="shape shape-5"></div>
        </div>
      </div>

      {/* Hero Section with Slider */}
      <section className="hero-slider">
        <div className="slider-container">
          {heroSlides.map((slide, index) => (
            <div 
              key={slide.id}
              className={`slide ${index === currentSlide ? 'active' : ''}`}
              style={{ backgroundImage: `url(${slide.image})` }}
            >
              <div className="slide-overlay">
                <div className="container">
                  <div className="slide-content">
                    {/* Promotional Badge */}
                    <AnimatedSection animationType="fade-in-down" className="slide-promotional-badge" delay={0.1}>
                      <div className="promotional-badge-overlay">
                        <span className="badge-icon">🇫🇷</span>
                        <span>EXCELLENCE FRANÇAISE</span>
                      </div>
                    </AnimatedSection>
                    
                    {/* Main Title */}
                    <AnimatedSection animationType="fade-in-left" className="slide-title">
                      {slide.title}
                    </AnimatedSection>
                    
                    {/* Promotional Subtitle */}
                    <AnimatedSection animationType="fade-in-right" className="slide-promotional-subtitle" delay={0.2}>
                      <div className="promotional-subtitle-overlay">
                        <span>🏆 Qualité Exceptionnelle</span>
                        <span>•</span>
                        <span>💰 Prix Compétitifs</span>
                        <span>•</span>
                        <span>⚡ Intervention Rapide</span>
                        <span>•</span>
                        <span>🗺️ Partout en France</span>
                      </div>
                    </AnimatedSection>
                    
                    <AnimatedSection animationType="fade-in-right" className="slide-subtitle" delay={0.3}>
                      {slide.subtitle}
                    </AnimatedSection>
                    <AnimatedSection animationType="slide-up-bounce" className="slide-description" delay={0.4}>
                      {slide.description}
                    </AnimatedSection>
                    <AnimatedSection animationType="scale-in" className="slide-buttons" delay={0.6}>
                      <a href="/contact" className="hero-btn primary">{slide.cta}</a>
                      <a href="/services" className="hero-btn secondary">NOS SERVICES</a>
                    </AnimatedSection>
                  </div>
                </div>
              </div>
            </div>
          ))}
          
          {/* Slider Navigation */}
          <button className="slider-nav prev" onClick={prevSlide}>
            <span>‹</span>
          </button>
          <button className="slider-nav next" onClick={nextSlide}>
            <span>›</span>
          </button>
          
          {/* Contact Box - Call Now */}
          <div className="emergency-contact-box">
            <div className="emergency-contact-content">
              <div className="emergency-badge">🚨 Intervention d'Urgence</div>
              <h3 className="emergency-title">Votre Toiture en Urgence ?</h3>
              <p className="emergency-description">
                Dégâts des eaux ? Fuites ? Appelez maintenant !
                <br />
                Un technicien qualifié arrive immédiatement
              </p>
              <div className="emergency-buttons">
                <a 
                  href="tel:+33780326427"
                  className="emergency-btn phone-btn"
                  title="Appelez-nous maintenant"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="btn-icon">
                    <path d="M164.9 24.6c-7.7-18.6-28-28.5-47.4-23.2l-88 24C12.1 30.2 0 46 0 64C0 311.4 200.6 512 448 512c18 0 33.8-12.1 38.6-29.5l24-88c5.3-19.4-4.6-39.7-23.2-47.4l-96-40c-16.3-6.8-35.2-2.1-46.3 11.6L304.7 368C234.3 334.7 177.3 277.7 144 207.3L193.3 167c13.7-11.2 18.4-30 11.6-46.3l-40-96z"/>
                  </svg>
                  <span>Appelez Maintenant</span>
                </a>
                <a 
                  href="https://wa.me/33780326427?text=URGENCE%20:%20J'ai%20besoin%20d'une%20intervention%20rapide%20pour%20dégâts%20des%20eaux%20sur%20ma%20toiture.%20Merci%20!"
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="emergency-btn whatsapp-btn"
                  title="WhatsApp urgente"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className="btn-icon">
                    <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 339.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56 81.2 56 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"/>
                  </svg>
                  <span>WhatsApp Urgent</span>
                </a>
              </div>
            </div>
          </div>
          
          {/* Slider Dots */}
          <div className="slider-dots">
            {heroSlides.map((_, index) => (
              <button
                key={index}
                className={`dot ${index === currentSlide ? 'active' : ''}`}
                onClick={() => goToSlide(index)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Working Hours Section */}
      <section className="working-hours-section section">
        <div className="container">
          <AnimatedSection animationType="fade-in-up" className="working-hours-header">
            <div className="section-badge">
              <div className="badge-icon">{React.createElement(getIconComponent('🕐'))}</div>
              <span>NOS HORAIRES</span>
            </div>
            <h2 className="section-title">
              Disponible 24h/24, 7j/7 pour vos urgences
            </h2>
            <p className="section-subtitle">
              Notre équipe est disponible à tout moment pour répondre à vos besoins
            </p>
          </AnimatedSection>

          <div className="working-hours-grid">
            <AnimatedSection animationType="scale-in" className="hours-card" delay={0.1}>
              <div className="card-icon">
                <div className="icon-wrapper">
                  {React.createElement(getIconComponent('🌙'))}
                </div>
              </div>
              <div className="card-content">
                <h3>24h/24</h3>
                <p>Disponible sur appel</p>
                <div className="availability-badge">
                  <span className="badge-dot"></span>
                  <span>Urgences</span>
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection animationType="scale-in" className="hours-card" delay={0.2}>
              <div className="card-icon">
                <div className="icon-wrapper">
                  {React.createElement(getIconComponent('📅'))}
                </div>
              </div>
              <div className="card-content">
                <h3>7j/7</h3>
                <p>Tous les jours</p>
                <div className="availability-badge">
                  <span className="badge-dot"></span>
                  <span>Week-end inclus</span>
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection animationType="scale-in" className="hours-card" delay={0.3}>
              <div className="card-icon">
                <div className="icon-wrapper">
                  {React.createElement(getIconComponent('⚡'))}
                </div>
              </div>
              <div className="card-content">
                <h3>Réponse rapide</h3>
                <p>Sous 2h maximum</p>
                <div className="availability-badge">
                  <span className="badge-dot"></span>
                  <span>Intervention urgente</span>
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection animationType="scale-in" className="hours-card" delay={0.4}>
              <div className="card-icon">
                <div className="icon-wrapper">
                  {React.createElement(getIconComponent('📞'))}
                </div>
              </div>
              <div className="card-content">
                <h3>Contact direct</h3>
                <p>07 80 32 64 27</p>
                <div className="availability-badge">
                  <span className="badge-dot"></span>
                  <span>Appel gratuit</span>
                </div>
              </div>
            </AnimatedSection>
          </div>

         
        </div>
      </section>


        {/* Services Section with Different Images */}
        <section className="services-section section section-gray">
        <div className="container">
          <AnimatedSection animationType="slide-up-bounce" className="section-header">
            <div className="section-badge">
              <div className="badge-square"></div>
              <span>NOS SERVICES</span>
            </div>
            <h2 className="section-title">{React.createElement(getIconComponent('🏠'))} Services de Toiture en France</h2>
            <p className="section-subtitle">
              <strong>Excellence française en couverture et toiture</strong><br/>
              <br/>
              Nous proposons de nombreux services répondant chacun aux besoins spécifiques de nos clients
            </p>
          </AnimatedSection>
          
          {/* Auto-scrolling Services Container */}
          <div 
            className="services-auto-scroll-container"
            style={{
              overflow: "hidden",
              position: "relative",
              padding: "2rem 0"
            }}
          >
            <div 
              ref={scrollTrackRef}
              className="services-auto-scroll-track"
              style={{
                display: "flex",
                gap: "2rem",
                animation: "autoScroll 60s linear infinite",
                width: "fit-content"
              }}
              onMouseDown={handleMouseDown}
              onMouseLeave={handleMouseLeave}
              onMouseUp={handleMouseUp}
              onMouseMove={handleMouseMove}
            >
                          {loading ? (
                <p>Chargement des services...</p>
              ) : services.length === 0 ? (
                <p>Aucun service disponible pour le moment.</p>
              ) : (
                <>
                  {/* First set of services */}
                  {services.map((service, index) => (
                    <div key={`${service.id}-${index}`} className="services-carousel-item" style={{
                      minWidth: "350px",
                      flexShrink: 0
                    }}>
                      <AnimatedSection animationType="scale-in" className="service-card card" delay={index * 0.1}>
                        <div className="service-card-container" style={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          justifyContent: "center",
                          height: "100%",
                          padding: "2rem",
                          minHeight: "350px"
                        }}>
                          <div className="service-image" style={{
                            height: "150px",
                            width: "100%",
                            borderRadius: "15px",
                            overflow: "hidden",
                            marginBottom: "1.5rem",
                            position: "relative"
                          }}>
                            <img 
                              src={getServiceImageUrl(service.image) || getServiceImage(service.title)}
                              alt={service.title}
                              style={{
                                width: "100%",
                                height: "100%",
                                objectFit: "cover",
                                transition: "transform 0.3s ease"
                              }}
                              onError={(e) => {
                                e.target.src = getServiceImage(service.title);
                              }}
                            />
                          </div>
                          <h3 style={{
                            fontSize: "1.5rem",
                            fontWeight: "700",
                            color: "#1e293b",
                            marginBottom: "1.5rem",
                            textAlign: "center"
                          }}>{service.title}</h3>
                          <div style={{
                            display: "flex",
                            gap: "1rem",
                            width: "100%"
                          }}>
                            <a href={`/services/${createServiceSlug(service)}`} className="card-button" style={{
                              flex: 1,
                              backgroundColor: "#3b82f6",
                              color: "white",
                              padding: "0.8rem 1.5rem",
                              borderRadius: "10px",
                              textDecoration: "none",
                              textAlign: "center",
                              fontWeight: "600",
                              transition: "all 0.3s ease",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              gap: "0.5rem",
                              fontSize: "1rem"
                            }}>
                              🔍 Voir le détail
                            </a>
                            <a href="/contact" className="card-button" style={{
                              flex: 1,
                              backgroundColor: "transparent",
                              color: "#3b82f6",
                              padding: "0.8rem 1.5rem",
                              borderRadius: "10px",
                              textDecoration: "none",
                              textAlign: "center",
                              fontWeight: "600",
                              border: "2px solid #3b82f6",
                              transition: "all 0.3s ease",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              gap: "0.5rem",
                              fontSize: "1rem"
                            }}>
                              📋 Demander un devis
                            </a>
                          </div>
                        </div>
                      </AnimatedSection>
                    </div>
                  ))}
                  
                  {/* Second set of services for seamless loop */}
                  {services.map((service, index) => (
                    <div key={`${service.id}-${index}-duplicate`} className="services-carousel-item" style={{
                      minWidth: "350px",
                      flexShrink: 0
                    }}>
                      <AnimatedSection animationType="scale-in" className="service-card card" delay={index * 0.1}>
                        <div className="service-card-container" style={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          justifyContent: "center",
                          height: "100%",
                          padding: "2rem",
                          minHeight: "350px"
                        }}>
                          <div className="service-image" style={{
                            height: "150px",
                            width: "100%",
                            borderRadius: "15px",
                            overflow: "hidden",
                            marginBottom: "1.5rem",
                            position: "relative"
                          }}>
                            <img 
                              src={getServiceImageUrl(service.image) || getServiceImage(service.title)}
                              alt={service.title}
                              style={{
                                width: "100%",
                                height: "100%",
                                objectFit: "cover",
                                transition: "transform 0.3s ease"
                              }}
                              onError={(e) => {
                                e.target.src = getServiceImage(service.title);
                              }}
                            />
                          </div>
                          <h3 style={{
                            fontSize: "1.5rem",
                            fontWeight: "700",
                            color: "#1e293b",
                            marginBottom: "1.5rem",
                            textAlign: "center"
                          }}>{service.title}</h3>
                          <div style={{
                            display: "flex",
                            gap: "1rem",
                            width: "100%"
                          }}>
                            <a href={`/services/${createServiceSlug(service)}`} className="card-button" style={{
                              flex: 1,
                              backgroundColor: "#3b82f6",
                              color: "white",
                              padding: "0.8rem 1.5rem",
                              borderRadius: "10px",
                              textDecoration: "none",
                              textAlign: "center",
                              fontWeight: "600",
                              transition: "all 0.3s ease",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              gap: "0.5rem",
                              fontSize: "1rem"
                            }}>
                              🔍 Voir le détail
                            </a>
                            <a href="/contact" className="card-button" style={{
                              flex: 1,
                              backgroundColor: "transparent",
                              color: "#3b82f6",
                              textDecoration: "none",
                              textAlign: "center",
                              fontWeight: "600",
                              border: "2px solid #3b82f6",
                              transition: "all 0.3s ease",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              gap: "0.5rem",
                              fontSize: "1rem"
                            }}>
                              📋 Demander un devis
                            </a>
                          </div>
                        </div>
                      </AnimatedSection>
                    </div>
                  ))}
                </>
              )}
            </div>
            <button 
              className="carousel-nav carousel-prev" 
              onClick={() => {
                const track = scrollTrackRef.current;
                if (track) {
                  track.scrollBy({ left: -400, behavior: 'smooth' });
                }
              }}
              aria-label="Précédent"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15,18 9,12 15,6"></polyline>
              </svg>
            </button>
            <button 
              className="carousel-nav carousel-next" 
              onClick={() => {
                const track = scrollTrackRef.current;
                if (track) {
                  track.scrollBy({ left: 400, behavior: 'smooth' });
                }
              }}
              aria-label="Suivant"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9,18 15,12 9,6"></polyline>
              </svg>
            </button>
          </div>
          
         
        </div>
      </section>

      {/* About Section */}
      <section className="about-section section">
        <div className="container">
          <div className="about-grid">
            <AnimatedSection animationType="fade-in-left" className="about-content">
              <div className="about-header">
                <div className="about-badge">
                  <div className="badge-square"></div>
                  <span>A PROPOS</span>
                </div>
                <h2 className="about-title">
                  Qualité et fiabilité : votre couvreur à Rhône-Alpes pour une satisfaction garantie !
                </h2>
              </div>
              
              <div className="about-description">
                <p>
                  BN BÂTIMENT vous accompagne dans tous vos projets de toiture dans la région Rhône-Alpes. 
                  Installation de toiture, réparation des fuites, entretien de toiture, démoussage et traitement hydrofuge, 
                  nettoyage de toiture sur Lyon, Saint-Étienne, Valence, Clermont-Ferrand, Grenoble et toute la région. 
                  Nous vous proposons un accompagnement personnalisé pour vos projets de couverture, avec des devis gratuits 
                  et détaillés, des conseils d'experts, des facilités de paiement et une équipe réactive pour vos besoins 
                  de rénovation, désamiantage, nettoyage et étanchéité dans un rayon de 100km autour de Lyon.
                </p>
              </div>
              
              <div className="about-features">
                <AnimatedSection animationType="scale-in" className="about-feature" delay={0.1}>
                  <div className="feature-icon">
                    <div className="team-icon">{React.createElement(getIconComponent('👥'))}</div>
                  </div>
                  <div className="feature-content">
                    <h3>Installation de Toiture Expert</h3>
                    <p>
                      Installation de toiture professionnelle sur Lyon, Saint-Étienne, Valence, Clermont-Ferrand, Grenoble. 
                      Fort de 10 ans d'expérience, BN BÂTIMENT dispose de toute l'expertise professionnelle 
                      nécessaire pour vos futurs projets de toiture.
                    </p>
                  </div>
                </AnimatedSection>
                
                <AnimatedSection animationType="scale-in" className="about-feature" delay={0.2}>
                  <div className="feature-icon">
                    <div className="tools-icon">{React.createElement(getIconComponent('🔧'))}</div>
                  </div>
                  <div className="feature-content">
                    <h3>Recherche et réparation des fuites Rapide</h3>
                    <p>
                      Recherche et réparation des fuites d'urgence 24h/24 sur Lyon, Saint-Étienne, Valence, Clermont-Ferrand, Grenoble. 
                      Nous sélectionnons exclusivement des matériaux de haute qualité pour des toitures 
                      qui allient performance et respect de l'environnement.
                    </p>
                  </div>
                </AnimatedSection>
                
                <AnimatedSection animationType="scale-in" className="about-feature" delay={0.3}>
                  <div className="feature-icon">
                    <div className="price-icon">{React.createElement(getIconComponent('💰'))}</div>
                  </div>
                  <div className="feature-content">
                    <h3>Entretien de Toiture Régulier</h3>
                    <p>
                      Entretien de toiture préventif et maintenance régulière sur toute la région Rhône-Alpes. 
                      Nous veillons à pratiquer des prix justes et compétitifs pour l'ensemble 
                      de nos interventions de toiture.
                    </p>
                  </div>
                </AnimatedSection>
                
                <AnimatedSection animationType="scale-in" className="about-feature" delay={0.4}>
                  <div className="feature-icon">
                    <div className="warranty-icon">{React.createElement(getIconComponent('🛡️'))}</div>
                  </div>
                  <div className="feature-content">
                    <h3>Démoussage et Nettoyage de Toiture</h3>
                    <p>
                      Démoussage et traitement hydrofuge, nettoyage de toiture professionnel sur Lyon, Saint-Étienne, 
                      Valence, Clermont-Ferrand, Grenoble. BN BÂTIMENT votre entreprise de couverture à Rhône-Alpes, 
                      est pleinement assurée et certifiée pour votre tranquillité d'esprit.
                    </p>
                  </div>
                </AnimatedSection>
              </div>
              
            </AnimatedSection>
            
            <AnimatedSection animationType="fade-in-right" className="about-visual" delay={0.2}>
              <div className="quality-image-container">
                <div className="quality-image-wrapper">
                  <img 
                    src="/1.jpg" 
                    alt="Qualité et fiabilité - BN BÂTIMENT" 
                    className="quality-image"
                  />
                  <div className="image-overlay">
                    <div className="overlay-content">
                      <div className="quality-badge">
                        <span className="badge-icon">{React.createElement(getIconComponent('⭐'))}</span>
                        <span className="badge-text">Qualité Garantie</span>
                      </div>
                    </div>
                  </div>
                  <div className="floating-elements">
                                    <div className="floating-element element-1">{React.createElement(getIconComponent('🏠'))}</div>
                <div className="floating-element element-2">{React.createElement(getIconComponent('🔧'))}</div>
                <div className="floating-element element-3">{React.createElement(getIconComponent('⭐'))}</div>
                <div className="floating-element element-4">{React.createElement(getIconComponent('🛡️'))}</div>
                  </div>
                </div>
                <div className="experience-badge">
                  <div className="badge-number">10</div>
                  <div className="badge-text">ans d'expérience</div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Quality and Reliability Section */}
      <section className="quality-section section">
        <div className="container">
          <div className="quality-grid">
            <AnimatedSection animationType="fade-in-left" className="quality-content">
              <h2 className="section-title">Installation Réparation Entretien Toiture - Qualité et Fiabilité</h2>
              <p className="section-description">
                Installation de toiture, réparation des fuites, entretien de toiture, démoussage et traitement hydrofuge, 
                nettoyage de toiture sur Lyon, Saint-Étienne, Valence, Clermont-Ferrand, Grenoble. Notre engagement envers l'excellence 
                se traduit par des prestations de qualité, le respect des délais et une fiabilité reconnue par nos clients.
              </p>
                              <div className="quality-features">
                <div className="quality-feature">
                  <div className="feature-icon">{React.createElement(getIconComponent('🏆'))}</div>
                  <div className="feature-text">
                    <h3>Installation de Toiture</h3>
                    <p>Installation de toiture professionnelle sur Lyon, Saint-Étienne, Valence, Clermont-Ferrand, Grenoble</p>
                  </div>
                </div>
                <div className="quality-feature">
                  <div className="feature-icon">{React.createElement(getIconComponent('⏰'))}</div>
                  <div className="feature-text">
                    <h3>Réparation des Fuites</h3>
                    <p>Recherche et réparation des fuites d'urgence 24h/24 sur toute la région Rhône-Alpes</p>
                  </div>
                </div>
                <div className="quality-feature">
                  <div className="feature-icon">{React.createElement(getIconComponent('🔧'))}</div>
                  <div className="feature-text">
                    <h3>Entretien de Toiture</h3>
                    <p>Entretien de toiture régulier et maintenance préventive</p>
                  </div>
                </div>
                <div className="quality-feature">
                  <div className="feature-icon">{React.createElement(getIconComponent('🛠️'))}</div>
                  <div className="feature-text">
                    <h3>Démoussage et Nettoyage</h3>
                    <p>Démoussage et traitement hydrofuge, nettoyage de toiture professionnel</p>
                  </div>
                </div>
              </div>
              <a href="/contact" className="cta-button">DEMANDER UN DEVIS</a>
            </AnimatedSection>
            <AnimatedSection animationType="fade-in-right" className="quality-image" delay={0.2}>
              <img 
                src="https://soumissionsquebec.ca/wp-content/uploads/2021/06/services-couvreur-commercial-quebec-768x512.jpg" 
                alt="Travailleur sur toiture" 
                className="worker-image"
              />
             
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section style={{
        padding: "4rem 0",
        backgroundColor: "#f8fafc",
        position: "relative",
        overflow: "hidden"
      }}>
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            style={{ textAlign: "center", marginBottom: "3rem" }}
          >
            <h2 style={{
              fontSize: "2.5rem",
              fontWeight: "700",
              color: "#1e293b",
              marginBottom: "1rem"
            }}>
              {React.createElement(getIconComponent('📊'))} Nos Chiffres Clés
            </h2>
            <p style={{
              fontSize: "1.2rem",
              color: "#64748b",
              maxWidth: "600px",
              margin: "0 auto"
            }}>
              Découvrez pourquoi nos clients nous font confiance pour leurs projets de toiture
            </p>
          </motion.div>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "2rem",
            maxWidth: "1200px",
            margin: "0 auto"
          }}>
            <AnimatedCounter 
              end={500} 
              suffix="+" 
              title="Clients Satisfaits"
              icon="👥"
            />
            <AnimatedCounter 
              end={4.9} 
              suffix="/5" 
              title="Note Moyenne"
              icon="⭐"
            />
            <AnimatedCounter 
              end={10} 
              suffix="+" 
              title="Années d'Expérience"
              icon="🏆"
            />
            <AnimatedCounter 
              end={100} 
              suffix="%" 
              title="Garantie Décennale"
              icon="🛡️"
            />
          </div>
        </div>
      </section>

    

      {/* Process Steps Section */}
      <section className="process-section section">
        <div className="container">
          <div className="section-header fade-in-on-scroll">
            <h2 className="section-title">Les étapes pour la réparation ou rénovation</h2>
          </div>
          <div className="process-grid">
            <div className="process-step fade-in-on-scroll" style={{animationDelay: '0.1s'}}>
              <div className="step-number">01</div>
              <h3>Prise de contact & Devis</h3>
              <p>
                Contactez-nous pour un rendez-vous. Nous établissons un devis détaillé 
                et gratuit selon vos besoins et votre budget.
              </p>
            </div>
            <div className="process-step fade-in-on-scroll" style={{animationDelay: '0.3s'}}>
              <div className="step-number">02</div>
              <h3>Planification & Préparation</h3>
              <p>
                Planification minutieuse du chantier, commande des matériaux 
                et préparation de l'intervention dans les meilleures conditions.
              </p>
            </div>
            <div className="process-step fade-in-on-scroll" style={{animationDelay: '0.5s'}}>
              <div className="step-number">03</div>
              <h3>Réalisation & Suivi</h3>
              <p>
                Exécution des travaux avec professionnalisme, suivi régulier 
                et validation finale avec le client.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials-section section section-gray">
        <div className="container">
          <div className="section-header fade-in-on-scroll">
            <h2 className="section-title">Nos clients témoignent</h2>
            <p className="section-subtitle">Découvrez ce que nos clients disent de nos services</p>
          </div>
          <div className="testimonials-auto-scroll-container">
            <div 
              className="testimonials-auto-scroll-track" 
              id="testimonialsCarousel"
              style={{
                display: "flex",
                gap: "2rem",
                animation: "autoScroll 60s linear infinite",
                width: "fit-content"
              }}
              onMouseDown={handleMouseDown}
              onMouseLeave={handleMouseLeave}
              onMouseUp={handleMouseUp}
              onMouseMove={handleMouseMove}
            >
              {loading ? (
                <div className="carousel-loading">
                  <div className="loading-spinner"></div>
                  <p>Chargement des avis...</p>
                </div>
              ) : testimonials.length === 0 ? (
                <div className="carousel-empty">
                  <p>Aucun avis disponible pour le moment.</p>
                </div>
              ) : (
                <>
                  {testimonials.map((testimonial, index) => (
                    <div key={`${testimonial.id}-${index}`} className="testimonials-carousel-item" style={{
                      minWidth: "350px",
                      flexShrink: 0
                    }}>
                      <AnimatedSection animationType="scale-in" className="testimonial-card" delay={index * 0.1}>
                        <Testimonial testimonial={testimonial} />
                      </AnimatedSection>
                    </div>
                  ))}
                  {/* Duplicate items for seamless loop */}
                  {testimonials.map((testimonial, index) => (
                    <div key={`${testimonial.id}-${index}-duplicate`} className="testimonials-carousel-item" style={{
                      minWidth: "350px",
                      flexShrink: 0
                    }}>
                      <AnimatedSection animationType="scale-in" className="testimonial-card" delay={index * 0.1}>
                        <Testimonial testimonial={testimonial} />
                      </AnimatedSection>
                    </div>
                  ))}
                </>
              )}
            </div>
            <button 
              className="carousel-nav carousel-prev" 
              onClick={() => {
                const track = document.getElementById('testimonialsCarousel');
                if (track) {
                  track.scrollBy({ left: -400, behavior: 'smooth' });
                }
              }}
              aria-label="Précédent"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15,18 9,12 15,6"></polyline>
              </svg>
            </button>
            <button 
              className="carousel-nav carousel-next" 
              onClick={() => {
                const track = document.getElementById('testimonialsCarousel');
                if (track) {
                  track.scrollBy({ left: 400, behavior: 'smooth' });
                }
              }}
              aria-label="Suivant"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9,18 15,12 9,6"></polyline>
              </svg>
            </button>
          </div>
          
         
        </div>
      </section>

      {/* Professionalism Section */}
      <section className="professionalism-section section">
        <div className="container">
          <div className="professionalism-grid">
            <div className="professionalism-content fade-in-on-scroll">
              <h2 className="section-title">Installation Réparation Entretien Toiture - Professionnalisme</h2>
              <p className="section-description">
                Installation de toiture, réparation des fuites, entretien de toiture, démoussage et traitement hydrofuge, 
                nettoyage de toiture sur Lyon, Saint-Étienne, Valence, Clermont-Ferrand, Grenoble. Notre expertise et notre engagement 
                envers la qualité font de nous votre partenaire de confiance pour tous vos projets de toiture.
              </p>
                              <div className="professionalism-features">
                <div className="feature-item">
                  <div className="feature-icon">{React.createElement(getIconComponent('⚡'))}</div>
                  <div className="feature-text">
                    <h4>Installation de Toiture</h4>
                    <p>Installation de toiture sur Lyon, Saint-Étienne, Valence, Clermont-Ferrand, Grenoble</p>
                  </div>
                </div>
                <div className="feature-item">
                  <div className="feature-icon">{React.createElement(getIconComponent('📋'))}</div>
                  <div className="feature-text">
                    <h4>Réparation des Fuites</h4>
                    <p>Recherche et réparation des fuites d'urgence 24h/24</p>
                  </div>
                </div>
                <div className="feature-item">
                  <div className="feature-icon">{React.createElement(getIconComponent('🏗️'))}</div>
                  <div className="feature-text">
                    <h4>Entretien de Toiture</h4>
                    <p>Entretien de toiture régulier et maintenance</p>
                  </div>
                </div>
                <div className="feature-item">
                  <div className="feature-icon">{React.createElement(getIconComponent('👨‍🔧'))}</div>
                  <div className="feature-text">
                    <h4>Démoussage et Nettoyage</h4>
                    <p>Démoussage et traitement hydrofuge professionnel</p>
                  </div>
                </div>
                <div className="feature-item">
                  <div className="feature-icon">{React.createElement(getIconComponent('📏'))}</div>
                  <div className="feature-text">
                    <h4>Nettoyage de Toiture</h4>
                    <p>Nettoyage de toiture haute pression</p>
                  </div>
                </div>
                <div className="feature-item">
                  <div className="feature-icon">{React.createElement(getIconComponent('😊'))}</div>
                  <div className="feature-text">
                    <h4>Service Complet</h4>
                    <p>Installation, réparation, entretien, démoussage, nettoyage</p>
                  </div>
                </div>
              </div>
              <a href="/contact" className="cta-button">DEMANDER UN DEVIS</a>
            </div>
            <div className="professionalism-visual fade-in-on-scroll">
              <div className="house-graphic">
                <div className="house-icon">{React.createElement(getIconComponent('🏠'))}</div>
                <div className="house-features">
                  {['Réactivité', 'Devis Gratuit', 'Qualité', 'Expertise', 'Normes', 'Satisfaction'].map((feature, index) => (
                    <div key={index} className="house-feature" style={{animationDelay: `${index * 0.1}s`}}>
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
              <img 
                src="https://soumissionsquebec.ca/wp-content/uploads/2021/06/services-couvreur-commercial-quebec-768x512.jpg" 
                alt="Travailleur professionnel" 
                className="worker-image"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="gallery-section section section-gray">
        <div className="container">
          <div className="section-header fade-in-on-scroll">
            <h2 className="section-title">Nos réalisations</h2>
            <p className="section-subtitle">Découvrez nos derniers projets de couverture et zinguerie</p>
          </div>
          <div className="gallery-auto-scroll-container">
            <div 
              className="gallery-auto-scroll-track" 
              id="galleryCarousel"
              style={{
                display: "flex",
                gap: "2rem",
                animation: "autoScroll 60s linear infinite",
                width: "fit-content"
              }}
              onMouseDown={handleMouseDown}
              onMouseLeave={handleMouseLeave}
              onMouseUp={handleMouseUp}
              onMouseMove={handleMouseMove}
            >
              {loading ? (
                <div className="carousel-loading">
                  <div className="loading-spinner"></div>
                  <p>Chargement des galeries...</p>
                </div>
              ) : gallery.length === 0 ? (
                <div className="carousel-empty">
                  <p>Aucune galerie disponible pour le moment.</p>
                </div>
              ) : (
                <>
                  {gallery.map((item, index) => (
                    <div key={`${item.id}-${index}`} className="gallery-carousel-item" style={{
                      minWidth: "350px",
                      flexShrink: 0
                    }}>
                      <GalleryItem item={item} index={index} />
                    </div>
                  ))}
                  {/* Duplicate items for seamless loop */}
                  {gallery.map((item, index) => (
                    <div key={`${item.id}-${index}-duplicate`} className="gallery-carousel-item" style={{
                      minWidth: "350px",
                      flexShrink: 0
                    }}>
                      <GalleryItem item={item} index={index} />
                    </div>
                  ))}
                </>
              )}
            </div>
            <button 
              className="carousel-nav carousel-prev" 
              onClick={() => {
                const track = document.getElementById('galleryCarousel');
                if (track) {
                  track.scrollBy({ left: -400, behavior: 'smooth' });
                }
              }}
              aria-label="Précédent"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15,18 9,12 15,6"></polyline>
              </svg>
            </button>
            <button 
              className="carousel-nav carousel-next" 
              onClick={() => {
                const track = document.getElementById('galleryCarousel');
                if (track) {
                  track.scrollBy({ left: 400, behavior: 'smooth' });
                }
              }}
              aria-label="Suivant"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9,18 15,12 9,6"></polyline>
              </svg>
            </button>
          </div>
        </div>
      </section>

    
     

      {/* Blog Carousel Section */}
      <section className="blog-carousel-section section section-gray">
        <div className="container">
          <div className="section-header fade-in-on-scroll">
            <h2 className="section-title">Nos derniers articles</h2>
            <p className="section-subtitle">Conseils et actualités sur la toiture</p>
          </div>
          <div className="blog-auto-scroll-container">
            <div 
              className="blog-auto-scroll-track" 
              id="blogCarousel"
              style={{
                display: "flex",
                gap: "2rem",
                animation: "autoScroll 60s linear infinite",
                width: "fit-content"
              }}
              onMouseDown={handleMouseDown}
              onMouseLeave={handleMouseLeave}
              onMouseUp={handleMouseUp}
              onMouseMove={handleMouseMove}
            >
              {loading ? (
                <div className="carousel-loading">
                  <div className="loading-spinner"></div>
                  <p>Chargement des articles...</p>
                </div>
              ) : blogPosts.length === 0 ? (
                <div className="carousel-empty">
                  <p>Aucun article disponible pour le moment.</p>
                </div>
              ) : (
                <>
                  {blogPosts.map((post, index) => (
                    <div key={`${post.id}-${index}`} className="blog-carousel-item" style={{
                      minWidth: "350px",
                      flexShrink: 0
                    }}>
                      <AnimatedSection animationType="scale-in" className="blog-card" delay={index * 0.1}>
                        <div className="blog-image">
                          <img 
                            src={post.image || `https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400&h=300&fit=crop&crop=center`} 
                            alt={post.title}
                          />
                          <div className="blog-overlay">
                            <div className="blog-overlay-content">
                              <h3>{post.title}</h3>
                              <p>{post.excerpt}</p>
                              <a href={`/blog/${post.slug}`} className="blog-overlay-button">
                                Lire l'article
                              </a>
                            </div>
                          </div>
                        </div>
                        <div className="card-content">
                          <h3>{post.title}</h3>
                          <p>{post.excerpt}</p>
                          <div className="blog-meta">
                            <span className="blog-date">{new Date(post.created_at).toLocaleDateString('fr-FR')}</span>
                            <span className="blog-category">{post.category}</span>
                          </div>
                          <a href={`/blog/${post.slug}`} className="card-button">
                            Lire l'article
                          </a>
                        </div>
                      </AnimatedSection>
                    </div>
                  ))}
                  {/* Duplicate items for seamless loop */}
                  {blogPosts.map((post, index) => (
                    <div key={`${post.id}-${index}-duplicate`} className="blog-carousel-item" style={{
                      minWidth: "350px",
                      flexShrink: 0
                    }}>
                      <AnimatedSection animationType="scale-in" className="blog-card" delay={index * 0.1}>
                        <div className="blog-image">
                          <img 
                            src={post.image || `https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400&h=300&fit=crop&crop=center`} 
                            alt={post.title}
                          />
                          <div className="blog-overlay">
                            <div className="blog-overlay-content">
                              <h3>{post.title}</h3>
                              <p>{post.excerpt}</p>
                              <a href={`/blog/${post.slug}`} className="blog-overlay-button">
                                Lire l'article
                              </a>
                            </div>
                          </div>
                        </div>
                        <div className="card-content">
                          <h3>{post.title}</h3>
                          <p>{post.excerpt}</p>
                          <div className="blog-meta">
                            <span className="blog-date">{new Date(post.created_at).toLocaleDateString('fr-FR')}</span>
                            <span className="blog-category">{post.category}</span>
                          </div>
                          <a href={`/blog/${post.slug}`} className="card-button">
                            Lire l'article
                          </a>
                        </div>
                      </AnimatedSection>
                    </div>
                  ))}
                </>
              )}
            </div>
            <button 
              className="carousel-nav carousel-prev" 
              onClick={() => {
                const track = document.getElementById('blogCarousel');
                if (track) {
                  track.scrollBy({ left: -400, behavior: 'smooth' });
                }
              }}
              aria-label="Précédent"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15,18 9,12 15,6"></polyline>
              </svg>
            </button>
            <button 
              className="carousel-nav carousel-next" 
              onClick={() => {
                const track = document.getElementById('blogCarousel');
                if (track) {
                  track.scrollBy({ left: 400, behavior: 'smooth' });
                }
              }}
              aria-label="Suivant"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9,18 15,12 9,6"></polyline>
              </svg>
            </button>
          </div>
        </div>
      </section>

      {/* Medium Article Backlink Section */}
      <section className="medium-article-section section section-light">
        <div className="container">
          <div className="section-header fade-in-on-scroll">
            <h2 className="section-title">Découvrez Notre Expertise</h2>
            <p className="section-subtitle">Lisez notre article détaillé sur l'avenir de la couverture professionnelle</p>
          </div>
          <div className="medium-article-card fade-in-on-scroll">
            <div className="medium-article-content">
              <div className="medium-article-icon">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
                  <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
                </svg>
              </div>
              <div className="medium-article-text">
                <h3>L'Avenir de la Couverture Professionnelle</h3>
                <p>Découvrez comment la technologie transforme l'industrie du bâtiment et révolutionne les services de couverture. Notre article détaillé explore les innovations modernes, les solutions durables et les approches technologiques qui façonnent l'avenir de la construction.</p>
                <div className="medium-article-features">
                  <span className="feature-tag">Technologie Avancée</span>
                  <span className="feature-tag">Solutions Durables</span>
                  <span className="feature-tag">Innovation</span>
                </div>       
                <a 
                  href="https://medium.com/@khaledahmedhaggagy/the-future-of-professional-roofing-how-technology-is-transforming-the-construction-industry-3a363875c365" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="medium-article-button"
                >
                  Lire l'article sur Medium
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M7 7h10v10"></path>
                    <path d="M7 17 17 7"></path>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Contact Section - Final Section */}
       <section className="contact-section section section-gray">
        <div className="container">
          <div className="section-header fade-in-on-scroll">
            <h2 className="section-title">Contactez-nous</h2>
            <p className="section-subtitle">Prêt à commencer votre projet de toiture ? Contactez-nous dès maintenant !</p>
          </div>
          <div className="enhanced-contact-grid">
            <div className="contact-info-container fade-in-on-scroll">
              <div className="contact-info-card">
                <div className="contact-info-header">
                  <h3>📞 Informations de contact</h3>
                  <p>Nous sommes là pour vous aider avec tous vos projets de toiture</p>
                </div>
                <div className="contact-info-items">
                  <div className="contact-info-item">
                    <div className="contact-icon-wrapper">
                      <span className="contact-icon">📞</span>
                    </div>
                    <div className="contact-details">
                      <h4>Téléphone</h4>
                      <p>07 80 32 64 27</p>
                    </div>
                  </div>
                  <div className="contact-info-item">
                    <div className="contact-icon-wrapper">
                      <span className="contact-icon">📍</span>
                    </div>
                    <div className="contact-details">
                      <h4>Adresse</h4>
                      <p>90 impasse des ramiers</p>
                      <p>07250 le pouzin</p>
                    </div>
                  </div>
                  <div className="contact-info-item">
                    <div className="contact-icon-wrapper">
                      <span className="contact-icon">📧</span>
                    </div>
                    <div className="contact-details">
                      <h4>Email</h4>
                      <p>support@bnbatiment.com</p>
                    </div>
                  </div>
                  <div className="contact-info-item">
                    <div className="contact-icon-wrapper">
                      <span className="contact-icon">🕐</span>
                    </div>
                    <div className="contact-details">
                      <h4>Horaires</h4>
                      <p>24h/24, 7j/7</p>
                      <p>Disponible sur appel</p>
                    </div>
                  </div>
                  <div className="contact-info-item">
                    <div className="contact-icon-wrapper">
                      <span className="contact-icon">🗺️</span>
                    </div>
                    <div className="contact-details">
                      <h4>Zones d'intervention</h4>
                      <p>Lyon, Saint-Étienne, Valence, Clermont-Ferrand, Grenoble</p>
                      <p>Francheville, Givors, Vienne, Le Pouzin, Privas, La Voulte-sur-Rhône</p>
                      <p>Crest, Loriol-sur-Drôme, Livron, La Saulce, Mirmande, Montélimar</p>
                    </div>
                  </div>
                </div>
                <div className="contact-cta">
                  <a href="tel:0780326427" className="contact-cta-button">
                    <span>📞</span>
                    Appeler maintenant
                  </a>
                </div>
              </div>
            </div>
            <div className="contact-form-container fade-in-on-scroll">
              <div className="contact-form-card">
                <h3>📝 Demande de devis gratuit</h3>
                <p>Remplissez le formulaire ci-dessous et nous vous répondrons dans les plus brefs délais</p>
                {contactFormSuccess ? (
                                  <div className="success-message">
                  <span>{React.createElement(getIconComponent('✅'))}</span>
                  <div>
                    <h4>Message envoyé avec succès!</h4>
                    <p>Nous vous répondrons dans les plus brefs délais.</p>
                  </div>
                </div>
                ) : (
                  <form className="contact-form" onSubmit={handleContactFormSubmit}>
                    <div className="form-row">
                      <div className="form-group">
                        <label className="form-label">Nom complet</label>
                        <input 
                          type="text" 
                          name="name"
                          value={contactFormData.name}
                          onChange={handleContactFormChange}
                          className="form-input" 
                          placeholder="Votre nom" 
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label className="form-label">Email</label>
                        <input 
                          type="email" 
                          name="email"
                          value={contactFormData.email}
                          onChange={handleContactFormChange}
                          className="form-input" 
                          placeholder="votre@email.com" 
                          required
                        />
                      </div>
                    </div>
                    <div className="form-group">
                      <label className="form-label">Téléphone</label>
                      <input 
                        type="tel" 
                        name="phone"
                        value={contactFormData.phone}
                        onChange={handleContactFormChange}
                        className="form-input" 
                        placeholder="07 80 32 64 27" 
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Service souhaité</label>
                      <select 
                        name="service"
                        value={contactFormData.service}
                        onChange={handleContactFormChange}
                        className="form-select"
                        disabled={loadingContactServices}
                      >
                        <option value="">
                          {loadingContactServices ? "Chargement des services..." : "Sélectionner un service"}
                        </option>
                        {contactFormServices.map((service) => (
                          <option key={service.id} value={service.slug || service.id}>
                            {service.title}
                          </option>
                        ))}
                        <option value="other">Autre service</option>
                      </select>
                      {loadingContactServices && (
                        <div className="loading-indicator">
                          <span className="loading-spinner-small"></span>
                          <span>Chargement des services...</span>
                        </div>
                      )}
                    </div>
                    <div className="form-group">
                      <label className="form-label">Message</label>
                      <textarea 
                        name="message"
                        value={contactFormData.message}
                        onChange={handleContactFormChange}
                        className="form-textarea" 
                        placeholder="Décrivez votre projet ou votre demande..." 
                        required
                      ></textarea>
                    </div>
                    {contactFormError && (
                      <div style={{
                        color: '#dc2626',
                        backgroundColor: '#fef2f2',
                        border: '1px solid #fecaca',
                        padding: '12px',
                        borderRadius: '8px',
                        marginBottom: '20px'
                      }}>
                        {contactFormError}
                      </div>
                    )}
                    <button 
                      type="submit" 
                      className="form-button"
                      disabled={contactFormLoading}
                    >
                      {contactFormLoading ? 'ENVOI EN COURS...' : 'ENVOYER LE MESSAGE'}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Google Maps Section */}
      <section className="section">
        <div className="container">
          <div className="section-header fade-in-on-scroll">
            <h2 className="section-title">Planifiez votre trajet</h2>
            <p className="section-subtitle">Utilisez notre carte interactive pour planifier votre trajet vers nos services</p>
          </div>
          <div className="google-maps-iframe-container">
            <iframe 
              src="https://storage.googleapis.com/maps-solutions-nm58esdixu/commutes/udid/commutes.html"
              width="100%" 
              height="500"
              style={{
                border: 0, 
                borderRadius: '12px', 
                boxShadow: '0 10px 25px rgba(0, 0, 0, 0.15)'
              }}
              loading="lazy"
              title="Planification de trajet - BN BÂTIMENT"
            />
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;
