import React from 'react';
import { useLocation, Link } from 'react-router-dom';

const PaymentSuccess = () => {
  const location = useLocation();
  const { transactionId, amount, service, quote } = location.state || {};

  return (
    <div className="payment-success-container">
      <div className="success-card">
        <div className="success-icon">
          <span>✅</span>
        </div>
        
        <div className="success-content">
          <h1>Paiement réussi !</h1>
          <p>Merci, votre commande a été traitée avec succès</p>
          
          <div className="transaction-details">
            <h3>Détails de la transaction</h3>
            <div className="detail-item">
              <span>Numéro de transaction:</span>
              <span>{transactionId}</span>
            </div>
            <div className="detail-item">
              <span>Montant payé:</span>
              <span>{amount?.toLocaleString()} €</span>
            </div>
            {service && (
              <div className="detail-item">
                <span>Service:</span>
                <span>{service.title}</span>
              </div>
            )}
            {quote && (
              <div className="detail-item">
                <span>Numéro de devis:</span>
                <span>#{quote.id}</span>
              </div>
            )}
            <div className="detail-item">
              <span>Date de paiement:</span>
              <span>{new Date().toLocaleDateString('fr-FR')}</span>
            </div>
          </div>

          <div className="next-steps">
            <h3>Prochaines étapes</h3>
            <ul>
              <li>Nous vous contacterons dans les 24 heures</li>
              <li>Un email de confirmation vous sera envoyé</li>
              <li>Vous pouvez suivre votre commande depuis votre tableau de bord</li>
            </ul>
          </div>

          <div className="success-actions">
            <Link to="/profile" className="btn-primary">
              Aller au tableau de bord
            </Link>
            <Link to="/" className="btn-secondary">
              Retour à l'accueil
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess; 