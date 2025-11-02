import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import SEO from '../../components/SEO';
import OptimizedImage from '../../components/OptimizedImage';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import ContactForm from '../../components/ContactForm';
import '../../styles/services.css';

const Grenoble = () => {
  const [activeTab, setActiveTab] = useState('installation');

  const seoData = {
    title: "Couvreur Grenoble | BN BÂTIMENT - Couvreur Professionnel Grenoble | Installation Réparation Entretien Toiture 24h/24",
    description: "Couvreur professionnel à Grenoble. BN BÂTIMENT, votre couvreur expert à Grenoble. Couvreur spécialisé en installation de toiture, réparation des fuites, entretien, démoussage et nettoyage. Devis gratuit et intervention rapide 24h/24. Plus de 200 clients satisfaits à Grenoble et région. Votre couvreur de confiance.",
    keywords: "couvreur, couvreur Grenoble, couvreur professionnel, couvreur professionnel Grenoble, installation toiture Grenoble, réparation fuites Grenoble, entretien toiture Grenoble, démoussage toiture Grenoble, nettoyage toiture Grenoble, couvreur professionnel Grenoble, devis gratuit Grenoble, intervention rapide Grenoble, toiture Grenoble, couverture Grenoble, charpente Grenoble, zinguerie Grenoble, gouttières Grenoble, isolation toiture Grenoble, étanchéité toiture Grenoble, ventilation toiture Grenoble, écran sous-toiture Grenoble, pare-vapeur Grenoble, liteaux Grenoble, volige Grenoble, chevrons Grenoble, pannes Grenoble, fermes Grenoble, poutres Grenoble, solives Grenoble, plancher Grenoble, escalier Grenoble, terrasse Grenoble, pergola Grenoble, abri jardin Grenoble, cabane Grenoble, chalet Grenoble, maison ossature bois Grenoble, construction bois Grenoble, rénovation bois Grenoble, traitement bois Grenoble, lasure Grenoble, peinture bois Grenoble, protection bois Grenoble, anti-termites Grenoble, anti-fongique Grenoble, hydrofuge Grenoble, oléofuge Grenoble, saturateur Grenoble, vernis Grenoble, enduit Grenoble, crépis Grenoble, ravalement façade Grenoble, rénovation façade Grenoble, nettoyage façade Grenoble, hydrogommage Grenoble, sablage Grenoble, gommage Grenoble, ponçage Grenoble",
    url: "/services/grenoble",
    image: "/1.jpg",
    city: "Grenoble",
    isCityPage: true
  };

  const services = [
    {
      id: 'installation',
      title: 'Installation de Toiture',
      description: 'Installation complète de toiture neuve en tuiles, zinc, ardoises et métal',
      features: [
        'Installation de tuiles traditionnelles et modernes',
        'Pose de zinc et ardoises naturelles',
        'Installation de toiture métallique',
        'Pose d\'écran sous-toiture et pare-vapeur',
        'Installation de liteaux et voliges',
        'Pose de gouttières et descentes'
      ],
      image: '/1.jpg'
    },
    {
      id: 'reparation',
      title: 'Réparation des Fuites',
      description: 'Réparation rapide des fuites de toiture avec intervention d\'urgence 24h/24',
      features: [
        'Détection et réparation des fuites',
        'Remplacement de tuiles cassées',
        'Réparation de zinc endommagé',
        'Colmatage des fissures',
        'Réparation des joints de faîtage',
        'Intervention d\'urgence 24h/24'
      ],
      image: '/1.jpg'
    },
    {
      id: 'entretien',
      title: 'Entretien de Toiture',
      description: 'Entretien préventif et maintenance régulière de toiture',
      features: [
        'Inspection complète de la toiture',
        'Vérification de l\'étanchéité',
        'Contrôle des gouttières',
        'Maintenance des accessoires',
        'Vérification de la ventilation',
        'Rapport d\'inspection détaillé'
      ],
      image: '/1.jpg'
    },
    {
      id: 'demoussage',
      title: 'Démoussage et Traitement',
      description: 'Démoussage professionnel et traitement hydrofuge pour protéger votre toiture',
      features: [
        'Démoussage complet de la toiture',
        'Traitement hydrofuge professionnel',
        'Élimination des algues et lichens',
        'Protection contre la réapparition',
        'Traitement oléofuge pour tuiles',
        'Garantie de 5 ans sur le traitement'
      ],
      image: '/1.jpg'
    },
    {
      id: 'nettoyage',
      title: 'Nettoyage de Toiture',
      description: 'Nettoyage haute pression et entretien complet de votre toiture',
      features: [
        'Nettoyage haute pression adapté',
        'Nettoyage doux pour tuiles fragiles',
        'Élimination des débris végétaux',
        'Nettoyage des gouttières',
        'Nettoyage des descentes',
        'Résultat professionnel garanti'
      ],
      image: '/1.jpg'
    }
  ];

  const advantages = [
    {
      icon: '🏆',
      title: 'Expert Qualifié',
      description: 'Plus de 10 ans d\'expérience en toiture'
    },
    {
      icon: '⚡',
      title: 'Intervention Rapide',
      description: 'Service 24h/24 et 7j/7 pour les urgences'
    },
    {
      icon: '💰',
      title: 'Devis Gratuit',
      description: 'Estimation précise sans engagement'
    },
    {
      icon: '🛡️',
      title: 'Assurance Décennale',
      description: 'Garantie complète sur tous nos travaux'
    },
    {
      icon: '📱',
      title: 'Contact Facile',
      description: 'Téléphone, email et formulaire en ligne'
    },
    {
      icon: '🌟',
      title: 'Satisfaction Client',
      description: 'Plus de 200 clients satisfaits à Grenoble'
    }
  ];

  const testimonials = [
    {
      name: 'Michel R.',
      city: 'Grenoble Centre',
      rating: 5,
      comment: 'Service exceptionnel ! Intervention rapide pour une fuite de toiture. Travail soigné et professionnel. Je recommande vivement.'
    },
    {
      name: 'Catherine M.',
      city: 'Grenoble Nord',
      rating: 5,
      comment: 'BN BÂTIMENT a refait complètement ma toiture. Devis respecté, délais tenus, résultat parfait. Équipe sérieuse et compétente.'
    },
    {
      name: 'David L.',
      city: 'Grenoble Sud',
      rating: 5,
      comment: 'Démoussage et traitement hydrofuge effectués avec soin. Ma toiture est comme neuve ! Prix très correct pour la qualité.'
    }
  ];

  return (
    <>
      <SEO {...seoData} />
      <Header />
      
      <main className="grenoble-services-page">
        {/* Hero Section */}
        <section className="hero-section">
          <div className="container mx-auto px-4 py-20 text-center">
            <motion.h1 
              className="text-5xl md:text-6xl font-bold text-white mb-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              Couvreur Professionnel à Grenoble
            </motion.h1>
            <motion.p 
              className="text-xl md:text-2xl text-white mb-8 max-w-4xl mx-auto"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              BN BÂTIMENT, votre expert toiture à Grenoble. Installation, réparation, entretien, démoussage et nettoyage de toiture. 
              Devis gratuit et intervention rapide 24h/24.
            </motion.p>
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-colors">
                Devis Gratuit
              </button>
              <button className="bg-white hover:bg-gray-100 text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold transition-colors">
                Appeler Maintenant
              </button>
            </motion.div>
          </div>
        </section>

        {/* Services Tabs */}
        <section className="services-tabs py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-800 mb-4">
                Nos Services de Toiture à Grenoble
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Découvrez notre gamme complète de services de toiture professionnels, 
                adaptés aux spécificités climatiques de Grenoble et sa région.
              </p>
            </div>

            {/* Tab Navigation */}
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              {services.map((service) => (
                <button
                  key={service.id}
                  onClick={() => setActiveTab(service.id)}
                  className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                    activeTab === service.id
                      ? 'bg-blue-600 text-white shadow-lg'
                      : 'bg-white text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {service.title}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            {services.map((service) => (
              activeTab === service.id && (
                <motion.div
                  key={service.id}
                  className="bg-white rounded-2xl shadow-xl p-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="grid md:grid-cols-2 gap-8 items-center">
                    <div>
                      <h3 className="text-3xl font-bold text-gray-800 mb-4">
                        {service.title}
                      </h3>
                      <p className="text-lg text-gray-600 mb-6">
                        {service.description}
                      </p>
                      <ul className="space-y-3">
                        {service.features.map((feature, index) => (
                          <li key={index} className="flex items-center text-gray-700">
                            <span className="text-green-500 mr-3">✓</span>
                            {feature}
                          </li>
                        ))}
                      </ul>
                      <div className="mt-8">
                        <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors">
                          Demander un Devis
                        </button>
                      </div>
                    </div>
                    <div className="text-center">
                      <OptimizedImage
                        src={service.image}
                        alt={`${service.title} à Grenoble - BN BÂTIMENT`}
                        className="w-full max-w-md mx-auto rounded-lg shadow-lg"
                      />
                    </div>
                  </div>
                </motion.div>
              )
            ))}
          </div>
        </section>

        {/* Advantages Section */}
        <section className="advantages-section py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-800 mb-4">
                Pourquoi Choisir BN BÂTIMENT à Grenoble ?
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Notre expertise et notre engagement qualité font de nous le partenaire 
                de confiance pour tous vos travaux de toiture à Grenoble.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {advantages.map((advantage, index) => (
                <motion.div
                  key={index}
                  className="text-center p-6 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className="text-4xl mb-4">{advantage.icon}</div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    {advantage.title}
                  </h3>
                  <p className="text-gray-600">{advantage.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="testimonials-section py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-800 mb-4">
                Avis de Nos Clients à Grenoble
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Découvrez ce que disent nos clients satisfaits de nos services de toiture à Grenoble.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={index}
                  className="bg-white p-6 rounded-xl shadow-lg"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className="flex text-yellow-400 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <span key={i}>⭐</span>
                    ))}
                  </div>
                  <p className="text-gray-700 mb-4 italic">"{testimonial.comment}"</p>
                  <div className="text-sm text-gray-600">
                    <strong>{testimonial.name}</strong> - {testimonial.city}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="contact-section py-20 bg-blue-600">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-white mb-4">
                Besoin d'un Devis Gratuit à Grenoble ?
              </h2>
              <p className="text-xl text-blue-100 max-w-3xl mx-auto">
                Contactez-nous dès maintenant pour un devis personnalisé et gratuit. 
                Notre équipe d'experts est à votre disposition pour tous vos projets de toiture.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="text-white">
                <h3 className="text-2xl font-semibold mb-6">
                  Nos Coordonnées à Grenoble
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <span className="text-2xl mr-4">📞</span>
                    <div>
                      <p className="font-semibold">Téléphone</p>
                      <p>+33 780326427</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <span className="text-2xl mr-4">📧</span>
                    <div>
                      <p className="font-semibold">Email</p>
                      <p>support@bnbatiment.com</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <span className="text-2xl mr-4">🕒</span>
                    <div>
                      <p className="font-semibold">Horaires</p>
                      <p>24h/24 - 7j/7 pour les urgences</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <span className="text-2xl mr-4">📍</span>
                    <div>
                      <p className="font-semibold">Zone d'intervention</p>
                      <p>Grenoble et région (100km autour)</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white p-8 rounded-xl shadow-xl">
                <ContactForm />
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default Grenoble; 