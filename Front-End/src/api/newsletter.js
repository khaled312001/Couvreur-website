const API_BASE_URL = 'https://api.bnbatiment.com/api';

export const subscribeToNewsletter = async (email) => {
  try {
    const response = await fetch(`${API_BASE_URL}/newsletter/subscribe`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({ email })
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Erreur lors de l\'inscription');
    }

    return data;
  } catch (error) {
    console.error('Newsletter subscription error:', error);
    throw error;
  }
};

export const unsubscribeFromNewsletter = async (email) => {
  try {
    const response = await fetch(`${API_BASE_URL}/newsletter/unsubscribe`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({ email })
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Erreur lors de la désinscription');
    }

    return data;
  } catch (error) {
    console.error('Newsletter unsubscription error:', error);
    throw error;
  }
};

export const getNewsletterSubscriptions = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/admin/newsletter`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Erreur lors de la récupération des abonnements');
    }

    return data;
  } catch (error) {
    console.error('Get newsletter subscriptions error:', error);
    throw error;
  }
};

export const deleteNewsletterSubscription = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/admin/newsletter/${id}`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Erreur lors de la suppression');
    }

    return data;
  } catch (error) {
    console.error('Delete newsletter subscription error:', error);
    throw error;
  }
}; 