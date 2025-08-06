import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import MainLayout from '../layouts/MainLayout';

const UserQuotes = () => {
  const { user } = useAuth();
  const [quotes, setQuotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchQuotes = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('https://api.bnbatiment.com/api/user/quotes', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Erreur lors du chargement des devis');
        }

        const data = await response.json();
        setQuotes(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchQuotes();
    }
  }, [user]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'contacted':
        return 'bg-blue-100 text-blue-800';
      case 'quoted':
        return 'bg-purple-100 text-purple-800';
      case 'accepted':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'pending':
        return 'En attente';
      case 'contacted':
        return 'Contacté';
      case 'quoted':
        return 'Devis fourni';
      case 'accepted':
        return 'Accepté';
      case 'rejected':
        return 'Refusé';
      default:
        return status;
    }
  };

  const getUrgencyColor = (urgency) => {
    switch (urgency) {
      case 'urgent':
        return 'bg-red-100 text-red-800';
      case 'high':
        return 'bg-orange-100 text-orange-800';
      case 'normal':
        return 'bg-blue-100 text-blue-800';
      case 'low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getUrgencyText = (urgency) => {
    switch (urgency) {
      case 'urgent':
        return 'Urgent';
      case 'high':
        return 'Élevée';
      case 'normal':
        return 'Normale';
      case 'low':
        return 'Faible';
      default:
        return urgency;
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md mx-auto text-center">
          <p className="text-gray-600">Veuillez vous connecter pour voir vos devis.</p>
        </div>
      </div>
    );
  }

  return (
    <MainLayout>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-6">
              <h1 className="text-3xl font-bold text-white mb-2">Mes Devis</h1>
              <p className="text-blue-100">Consultez l'état de vos demandes de devis</p>
            </div>

            <div className="p-8">
              {loading ? (
                <div className="text-center py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                  <p className="mt-4 text-gray-600">Chargement de vos devis...</p>
                </div>
              ) : error ? (
                <div className="text-center py-12">
                  <div className="text-red-600 mb-4">{error}</div>
                  <button
                    onClick={() => window.location.reload()}
                    className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200"
                  >
                    Réessayer
                  </button>
                </div>
              ) : quotes.length === 0 ? (
                <div className="text-center py-12">
                  <div className="text-gray-500 mb-4">
                    <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Aucun devis trouvé</h3>
                  <p className="text-gray-600 mb-6">Vous n'avez pas encore de demandes de devis.</p>
                  <a
                    href="/contact"
                    className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 transition duration-200"
                  >
                    Demander un devis
                  </a>
                </div>
              ) : (
                <div className="space-y-6">
                  {quotes.map((quote) => (
                    <div key={quote.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition duration-200">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900 mb-2">
                            Devis #{quote.id} - {quote.service_type}
                          </h3>
                          <p className="text-gray-600 text-sm">
                            Créé le {new Date(quote.created_at).toLocaleDateString('fr-FR')}
                          </p>
                        </div>
                        <div className="flex flex-wrap gap-2 mt-2 md:mt-0">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(quote.status)}`}>
                            {getStatusText(quote.status)}
                          </span>
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getUrgencyColor(quote.urgency)}`}>
                            {getUrgencyText(quote.urgency)}
                          </span>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                          <h4 className="font-medium text-gray-900 mb-2">Description</h4>
                          <p className="text-gray-600 text-sm">{quote.description}</p>
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900 mb-2">Adresse</h4>
                          <p className="text-gray-600 text-sm">{quote.address}</p>
                        </div>
                      </div>

                      {quote.admin_notes && (
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                          <h4 className="font-medium text-blue-900 mb-2">Notes de l'administrateur</h4>
                          <p className="text-blue-800 text-sm">{quote.admin_notes}</p>
                        </div>
                      )}

                      <div className="flex flex-col sm:flex-row gap-2 pt-4 border-t border-gray-200">
                        <span className="text-sm text-gray-500">
                          <strong>Nom:</strong> {quote.name}
                        </span>
                        <span className="text-sm text-gray-500">
                          <strong>Email:</strong> {quote.email}
                        </span>
                        <span className="text-sm text-gray-500">
                          <strong>Téléphone:</strong> {quote.phone}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default UserQuotes; 