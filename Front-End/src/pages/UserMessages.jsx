import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import MainLayout from '../layouts/MainLayout';

const UserMessages = () => {
  const { user } = useAuth();
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('https://api.bnbatiment.com/api/user/messages', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Erreur lors du chargement des messages');
        }

        const data = await response.json();
        setMessages(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchMessages();
    }
  }, [user]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'unread':
        return 'bg-red-100 text-red-800';
      case 'read':
        return 'bg-blue-100 text-blue-800';
      case 'replied':
        return 'bg-green-100 text-green-800';
      case 'archived':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'unread':
        return 'Non lu';
      case 'read':
        return 'Lu';
      case 'replied':
        return 'Répondu';
      case 'archived':
        return 'Archivé';
      default:
        return status;
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md mx-auto text-center">
          <p className="text-gray-600">Veuillez vous connecter pour voir vos messages.</p>
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
              <h1 className="text-3xl font-bold text-white mb-2">Mes Messages</h1>
              <p className="text-blue-100">Consultez vos messages de contact</p>
            </div>

            <div className="p-8">
              {loading ? (
                <div className="text-center py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                  <p className="mt-4 text-gray-600">Chargement de vos messages...</p>
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
              ) : messages.length === 0 ? (
                <div className="text-center py-12">
                  <div className="text-gray-500 mb-4">
                    <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Aucun message trouvé</h3>
                  <p className="text-gray-600 mb-6">Vous n'avez pas encore envoyé de messages.</p>
                  <a
                    href="/contact"
                    className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 transition duration-200"
                  >
                    Envoyer un message
                  </a>
                </div>
              ) : (
                <div className="space-y-6">
                  {messages.map((message) => (
                    <div key={message.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition duration-200">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900 mb-2">
                            {message.subject}
                          </h3>
                          <p className="text-gray-600 text-sm">
                            Envoyé le {new Date(message.created_at).toLocaleDateString('fr-FR')}
                          </p>
                        </div>
                        <div className="flex flex-wrap gap-2 mt-2 md:mt-0">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(message.status)}`}>
                            {getStatusText(message.status)}
                          </span>
                        </div>
                      </div>

                      <div className="mb-4">
                        <h4 className="font-medium text-gray-900 mb-2">Message</h4>
                        <p className="text-gray-600 text-sm whitespace-pre-wrap">{message.message}</p>
                      </div>

                      {message.admin_response && (
                        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
                          <h4 className="font-medium text-green-900 mb-2">Réponse de l'administrateur</h4>
                          <p className="text-green-800 text-sm whitespace-pre-wrap">{message.admin_response}</p>
                        </div>
                      )}

                      <div className="flex flex-col sm:flex-row gap-2 pt-4 border-t border-gray-200">
                        <span className="text-sm text-gray-500">
                          <strong>Nom:</strong> {message.name}
                        </span>
                        <span className="text-sm text-gray-500">
                          <strong>Email:</strong> {message.email}
                        </span>
                        {message.phone && (
                          <span className="text-sm text-gray-500">
                            <strong>Téléphone:</strong> {message.phone}
                          </span>
                        )}
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

export default UserMessages; 