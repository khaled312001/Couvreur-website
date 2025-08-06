import React, { useState, useEffect } from 'react';
import { getPayments, updatePaymentStatus, deletePayment } from '../../api/payments';

const PaymentsAdmin = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    loadPayments();
  }, []);

  const loadPayments = async () => {
    try {
      setLoading(true);
      const data = await getPayments();
      setPayments(data);
    } catch (error) {
      setError('Échec du chargement des paiements');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (paymentId, newStatus) => {
    try {
      await updatePaymentStatus(paymentId, newStatus);
      await loadPayments(); // إعادة تحميل البيانات
    } catch (error) {
      setError('Échec de la mise à jour du statut du paiement');
    }
  };

  const handleDelete = async (paymentId) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette transaction ?')) {
      try {
        await deletePayment(paymentId);
        await loadPayments();
      } catch (error) {
        setError('Échec de la suppression de la transaction');
      }
    }
  };

  const filteredPayments = payments.filter(payment => {
    const matchesFilter = filter === 'all' || payment.status === filter;
    const matchesSearch = payment.transaction_id?.includes(searchTerm) ||
                         payment.customer_name?.includes(searchTerm) ||
                         payment.service_title?.includes(searchTerm);
    return matchesFilter && matchesSearch;
  });

  const getStatusBadge = (status) => {
    const statusConfig = {
      'pending': { text: 'En attente', class: 'badge-warning' },
      'completed': { text: 'Terminé', class: 'badge-success' },
      'failed': { text: 'Échoué', class: 'badge-danger' },
      'refunded': { text: 'Remboursé', class: 'badge-info' }
    };
    
    const config = statusConfig[status] || { text: status, class: 'badge-secondary' };
    return <span className={`badge ${config.class}`}>{config.text}</span>;
  };

  const getTotalAmount = () => {
    return filteredPayments
      .filter(p => p.status === 'completed')
      .reduce((sum, p) => sum + parseFloat(p.amount), 0);
  };

  if (loading) {
    return (
      <div className="admin-loading">
        <div className="loading-spinner"></div>
        <p>Chargement des paiements...</p>
      </div>
    );
  }

  return (
    <div className="payments-admin">
      <div className="admin-header">
        <h1>💰 Gestion des paiements</h1>
        <p>Gérez toutes les transactions financières</p>
      </div>

      {error && (
        <div className="admin-error">
          <span>⚠️</span>
          {error}
        </div>
      )}

      <div className="stats-cards">
        <div className="stat-card">
          <div className="stat-icon">💳</div>
          <div className="stat-content">
            <h3>{filteredPayments.length}</h3>
            <p>Total des transactions</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">✅</div>
          <div className="stat-content">
            <h3>{filteredPayments.filter(p => p.status === 'completed').length}</h3>
            <p>Transactions terminées</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">💰</div>
          <div className="stat-content">
            <h3>{getTotalAmount().toLocaleString()} €</h3>
            <p>Montant total</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">⏳</div>
          <div className="stat-content">
            <h3>{filteredPayments.filter(p => p.status === 'pending').length}</h3>
            <p>En attente</p>
          </div>
        </div>
      </div>

      <div className="filters-section">
        <div className="search-box">
          <input
            type="text"
            placeholder="Rechercher dans les transactions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
        
        <div className="filter-buttons">
          <button
            className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
            onClick={() => setFilter('all')}
          >
            Tout
          </button>
          <button
            className={`filter-btn ${filter === 'pending' ? 'active' : ''}`}
            onClick={() => setFilter('pending')}
          >
            En attente
          </button>
          <button
            className={`filter-btn ${filter === 'completed' ? 'active' : ''}`}
            onClick={() => setFilter('completed')}
          >
            Terminé
          </button>
          <button
            className={`filter-btn ${filter === 'failed' ? 'active' : ''}`}
            onClick={() => setFilter('failed')}
          >
            Échoué
          </button>
        </div>
      </div>

      <div className="payments-table">
        <table>
          <thead>
            <tr>
              <th>Numéro de transaction</th>
              <th>Client</th>
              <th>Service</th>
              <th>Montant</th>
              <th>Date</th>
              <th>Statut</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredPayments.map((payment) => (
              <tr key={payment.id}>
                <td>
                  <div className="transaction-id">
                    <span className="id-text">{payment.transaction_id}</span>
                    <span className="payment-method">
                      {payment.payment_method === 'visa' ? '💳' : '💳'}
                    </span>
                  </div>
                </td>
                <td>
                  <div className="customer-info">
                    <div className="customer-name">{payment.customer_name}</div>
                    <div className="customer-email">{payment.customer_email}</div>
                  </div>
                </td>
                <td>
                  <div className="service-info">
                    <div className="service-title">{payment.service_title}</div>
                    {payment.quote_id && (
                      <div className="quote-id">Devis #{payment.quote_id}</div>
                    )}
                  </div>
                </td>
                <td>
                  <div className="amount-info">
                    <span className="amount">{payment.amount.toLocaleString()} €</span>
                  </div>
                </td>
                <td>
                  <div className="date-info">
                    <div className="date">{new Date(payment.created_at).toLocaleDateString('fr-FR')}</div>
                    <div className="time">{new Date(payment.created_at).toLocaleTimeString('fr-FR')}</div>
                  </div>
                </td>
                <td>
                  {getStatusBadge(payment.status)}
                </td>
                <td>
                  <div className="actions">
                    <select
                      value={payment.status}
                      onChange={(e) => handleStatusChange(payment.id, e.target.value)}
                      className="status-select"
                    >
                      <option value="pending">En attente</option>
                      <option value="completed">Terminé</option>
                      <option value="failed">Échoué</option>
                      <option value="refunded">Remboursé</option>
                    </select>
                    
                    <button
                      onClick={() => handleDelete(payment.id)}
                      className="delete-btn"
                      title="Supprimer la transaction"
                    >
                      🗑️
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredPayments.length === 0 && (
          <div className="empty-state">
            <div className="empty-icon">💳</div>
            <h3>Aucune transaction</h3>
            <p>Aucune transaction trouvée correspondant aux critères de recherche</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentsAdmin; 