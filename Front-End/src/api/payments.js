const API_BASE_URL = process.env.REACT_APP_API_URL || 'https://api.bnbatiment.com/api';

// Mock data for payments when API is not available
const mockPayments = [
  {
    id: 1,
    transaction_id: 'TXN-2025-001',
    customer_name: 'Ahmed Mohamed',
    customer_email: 'ahmed@example.com',
    service_title: 'Installation de toiture neuve',
    quote_id: 1,
    amount: 25000,
    payment_method: 'visa',
    status: 'completed',
    created_at: '2025-01-15T10:30:00Z',
    updated_at: '2025-01-15T10:35:00Z'
  },
  {
    id: 2,
    transaction_id: 'TXN-2025-002',
    customer_name: 'Fatima Ali',
    customer_email: 'fatima@example.com',
    service_title: 'Réparation de fuites d\'eau',
    quote_id: 2,
    amount: 5000,
    payment_method: 'mastercard',
    status: 'pending',
    created_at: '2025-01-14T15:20:00Z',
    updated_at: '2025-01-14T15:20:00Z'
  },
  {
    id: 3,
    transaction_id: 'TXN-2025-003',
    customer_name: 'Mohamed Hassan',
    customer_email: 'mohamed@example.com',
    service_title: 'Entretien périodique',
    quote_id: 3,
    amount: 3000,
    payment_method: 'visa',
    status: 'failed',
    created_at: '2025-01-13T09:15:00Z',
    updated_at: '2025-01-13T09:20:00Z'
  }
];

export const fetchPayments = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/payments`);
    if (!response.ok) {
      throw new Error('Failed to fetch payments');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching payments:', error);
    return [];
  }
};

export const getPayments = async () => {
  try {
    const payments = await fetchPayments();
    return payments;
  } catch (error) {
    console.log('Using mock payments data');
    return getMockPayments();
  }
};

export const fetchPaymentById = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/payments/${id}`);
    if (!response.ok) {
      throw new Error('Payment not found');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching payment:', error);
    return null;
  }
};

export const createPayment = async (data) => {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_BASE_URL}/payments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error('Failed to create payment');
    }
    return await response.json();
  } catch (error) {
    console.error('Error creating payment:', error);
    throw error;
  }
};

export const updatePaymentStatus = async (id, status) => {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_BASE_URL}/admin/payments/${id}/status`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ status }),
    });
    if (!response.ok) {
      throw new Error('Failed to update payment status');
    }
    return await response.json();
  } catch (error) {
    console.error('Error updating payment status:', error);
    throw error;
  }
};

export const deletePayment = async (id) => {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_BASE_URL}/admin/payments/${id}`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error('Failed to delete payment');
    }
    return await response.json();
  } catch (error) {
    console.error('Error deleting payment:', error);
    throw error;
  }
};

export const processPayment = async (paymentData) => {
  try {
    // محاكاة معالجة الدفع
    const transactionId = `TXN-${Date.now()}`;
    
    // محاكاة تأخير المعالجة
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // محاكاة نجاح الدفع (90% نجاح)
    const isSuccess = Math.random() > 0.1;
    
    if (isSuccess) {
      return {
        success: true,
        transactionId: transactionId,
        message: 'Paiement traité avec succès',
        amount: paymentData.amount,
        timestamp: new Date().toISOString()
      };
    } else {
      throw new Error('Échec du traitement du paiement');
    }
  } catch (error) {
    console.error('Error processing payment:', error);
    throw error;
  }
};

export const getPaymentsByStatus = async (status) => {
  try {
    const response = await fetch(`${API_BASE_URL}/payments/status/${status}`);
    if (!response.ok) {
      throw new Error('Failed to fetch payments by status');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching payments by status:', error);
    return [];
  }
};

export const getPaymentsByDateRange = async (startDate, endDate) => {
  try {
    const response = await fetch(`${API_BASE_URL}/payments/date-range?start=${startDate}&end=${endDate}`);
    if (!response.ok) {
      throw new Error('Failed to fetch payments by date range');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching payments by date range:', error);
    return [];
  }
};

export const getPaymentStats = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/payments/stats`);
    if (!response.ok) {
      throw new Error('Failed to fetch payment stats');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching payment stats:', error);
    return getMockPaymentStats();
  }
};

// Mock data for payments when API is not available
export const getMockPayments = () => {
  return mockPayments;
};

// Mock payment statistics
export const getMockPaymentStats = () => {
  const completedPayments = mockPayments.filter(p => p.status === 'completed');
  const pendingPayments = mockPayments.filter(p => p.status === 'pending');
  const failedPayments = mockPayments.filter(p => p.status === 'failed');
  
  return {
    total_payments: mockPayments.length,
    completed_payments: completedPayments.length,
    pending_payments: pendingPayments.length,
    failed_payments: failedPayments.length,
    total_amount: completedPayments.reduce((sum, p) => sum + p.amount, 0),
    average_amount: completedPayments.length > 0 
      ? completedPayments.reduce((sum, p) => sum + p.amount, 0) / completedPayments.length 
      : 0
  };
}; 