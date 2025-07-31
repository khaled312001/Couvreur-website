import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const service = location.state?.service;
  const quote = location.state?.quote;

  const [paymentData, setPaymentData] = useState({
    cardNumber: '',
    cardHolder: '',
    expiryMonth: '',
    expiryYear: '',
    cvv: '',
    amount: service?.price || quote?.total || 0
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPaymentData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(' ');
    } else {
      return v;
    }
  };

  const handleCardNumberChange = (e) => {
    const formatted = formatCardNumber(e.target.value);
    setPaymentData(prev => ({
      ...prev,
      cardNumber: formatted
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Process payment data
      const response = await fetch('/api/payment/process', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...paymentData,
          serviceId: service?.id,
          quoteId: quote?.id,
          amount: paymentData.amount
        }),
      });

      if (response.ok) {
        const result = await response.json();
        navigate('/payment-success', { 
          state: { 
            transactionId: result.transactionId,
            amount: paymentData.amount,
            service: service,
            quote: quote
          }
        });
      } else {
        throw new Error('Échec du traitement du paiement');
      }
    } catch (error) {
      setError('Une erreur est survenue lors du traitement du paiement. Veuillez réessayer.');
    } finally {
      setLoading(false);
    }
  };

  const getCardType = (number) => {
    const cleanNumber = number.replace(/\s/g, '');
    if (cleanNumber.startsWith('4')) return 'visa';
    if (cleanNumber.startsWith('5')) return 'mastercard';
    return 'unknown';
  };

  const cardType = getCardType(paymentData.cardNumber);

  return (
    <div className="payment-container">
      <div className="payment-card">
        <div className="payment-header">
          <h1>💳 Paiement en ligne</h1>
          <p>Complétez votre paiement pour confirmer votre demande de service</p>
        </div>

        {error && (
          <div className="payment-error">
            <span>⚠️</span>
            {error}
          </div>
        )}

        <div className="payment-summary">
          <h3>Récapitulatif de la commande</h3>
          {service && (
            <div className="summary-item">
              <span>Service:</span>
              <span>{service.title}</span>
            </div>
          )}
          {quote && (
            <div className="summary-item">
              <span>Numéro de devis:</span>
              <span>#{quote.id}</span>
            </div>
          )}
          <div className="summary-item total">
            <span>Montant total:</span>
            <span>{paymentData.amount.toLocaleString()} €</span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="payment-form">
          <div className="form-group">
            <label htmlFor="cardNumber">Numéro de carte</label>
            <div className="card-input-wrapper">
              <input
                id="cardNumber"
                name="cardNumber"
                type="text"
                value={paymentData.cardNumber}
                onChange={handleCardNumberChange}
                placeholder="0000 0000 0000 0000"
                maxLength="19"
                required
                className="card-input"
              />
              <div className="card-type">
                {cardType === 'visa' && <span>💳</span>}
                {cardType === 'mastercard' && <span>💳</span>}
              </div>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="cardHolder">Nom du titulaire</label>
            <input
              id="cardHolder"
              name="cardHolder"
              type="text"
              value={paymentData.cardHolder}
              onChange={handleInputChange}
              placeholder="Nom tel qu'il apparaît sur la carte"
              required
              className="form-input"
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="expiryMonth">Mois d'expiration</label>
              <select
                id="expiryMonth"
                name="expiryMonth"
                value={paymentData.expiryMonth}
                onChange={handleInputChange}
                required
                className="form-input"
              >
                <option value="">Mois</option>
                {Array.from({ length: 12 }, (_, i) => i + 1).map(month => (
                  <option key={month} value={month.toString().padStart(2, '0')}>
                    {month.toString().padStart(2, '0')}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="expiryYear">Année d'expiration</label>
              <select
                id="expiryYear"
                name="expiryYear"
                value={paymentData.expiryYear}
                onChange={handleInputChange}
                required
                className="form-input"
              >
                <option value="">Année</option>
                {Array.from({ length: 10 }, (_, i) => new Date().getFullYear() + i).map(year => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="cvv">CVV</label>
              <input
                id="cvv"
                name="cvv"
                type="password"
                value={paymentData.cvv}
                onChange={handleInputChange}
                placeholder="123"
                maxLength="4"
                required
                className="form-input"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`payment-submit-btn ${loading ? 'loading' : ''}`}
          >
            {loading ? 'Traitement en cours...' : `Payer ${paymentData.amount.toLocaleString()} €`}
          </button>
        </form>

        <div className="payment-security">
          <div className="security-info">
            <span>🔒</span>
            <p>Toutes les transactions sont protégées par le chiffrement SSL</p>
          </div>
          <div className="security-info">
            <span>✅</span>
            <p>Nous ne stockons pas les données de votre carte</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment; 