import React, { useRef } from 'react';
import { Printer, Download, FileText, Building, User, MapPin, Phone, Mail, Calendar, DollarSign, Package, CheckCircle, Star, X } from 'lucide-react';

const Invoice = ({ order, onClose }) => {
  const invoiceRef = useRef();

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR'
    }).format(amount);
  };

  const calculateTax = (amount) => {
    return amount * 0.20; // 20% TVA
  };

  const calculateTotal = (amount) => {
    return amount + calculateTax(amount);
  };

  const handlePrint = () => {
    const printWindow = window.open('', '_blank');
    const printContent = invoiceRef.current.innerHTML;
    
    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Facture - ${order.service}</title>
          <style>
            @page {
              size: A4;
              margin: 0.5cm;
            }
            @media print {
              body { 
                margin: 0; 
                padding: 0; 
                font-family: 'Arial', sans-serif; 
                background: white !important;
                min-height: auto !important;
                height: auto !important;
              }
              .no-print { display: none !important; }
              .invoice-close-btn { display: none !important; }
              .invoice-container { 
                box-shadow: none !important; 
                border: none !important;
                margin: 0 !important;
                padding: 0 !important;
                max-width: none !important;
                width: 100% !important;
                min-height: auto !important;
                height: auto !important;
              }
              .invoice-body { 
                padding: 15px !important;
              }
              .invoice-header { 
                background: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%) !important;
                -webkit-print-color-adjust: exact;
                color-adjust: exact;
                padding: 12px 15px !important;
              }
              .accent-section { 
                background: #fef3c7 !important;
                -webkit-print-color-adjust: exact;
                color-adjust: exact;
                padding: 12px !important;
                margin-bottom: 12px !important;
              }
              .service-section { 
                background: #f8fafc !important;
                -webkit-print-color-adjust: exact;
                color-adjust: exact;
                padding: 12px !important;
                margin-bottom: 12px !important;
              }
              .totals-section { 
                background: #ecfdf5 !important;
                -webkit-print-color-adjust: exact;
                color-adjust: exact;
                padding: 12px !important;
                margin-top: 12px !important;
              }
              .footer { 
                background: #f1f5f9 !important;
                -webkit-print-color-adjust: exact;
                color-adjust: exact;
                padding: 12px !important;
              }
            }
            body { 
              font-family: 'Arial', sans-serif; 
              margin: 0; 
              padding: 20px; 
              background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
              min-height: auto;
            }
            .invoice-container { 
              max-width: 210mm; 
              margin: 0 auto; 
              background: white; 
              border-radius: 16px; 
              box-shadow: 0 25px 50px rgba(0,0,0,0.15); 
              overflow: hidden;
              min-height: auto;
              height: auto;
              position: relative;
            }
            .invoice-header { 
              background: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%); 
              color: white; 
              padding: 20px 25px; 
              text-align: center;
              position: relative;
              overflow: hidden;
            }
            .invoice-header::before {
              content: '';
              position: absolute;
              top: -50%;
              right: -50%;
              width: 200%;
              height: 200%;
              background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%);
              animation: float 6s ease-in-out infinite;
            }
            @keyframes float {
              0%, 100% { transform: translateY(0px) rotate(0deg); }
              50% { transform: translateY(-20px) rotate(180deg); }
            }
            .company-info { margin-bottom: 15px; position: relative; z-index: 1; }
            .company-name { 
              font-size: 24px; 
              font-weight: bold; 
              margin-bottom: 6px;
              text-shadow: 0 2px 4px rgba(0,0,0,0.3);
            }
            .company-tagline { 
              font-size: 14px; 
              opacity: 0.95;
              font-weight: 500;
            }
            .company-details {
              display: flex;
              justify-content: space-between;
              align-items: center;
              margin-top: 15px;
              position: relative;
              z-index: 1;
            }
            .invoice-number { 
              font-size: 16px; 
              font-weight: bold;
              background: rgba(255,255,255,0.2);
              padding: 6px 12px;
              border-radius: 8px;
              backdrop-filter: blur(10px);
            }
            .invoice-date { 
              font-size: 14px; 
              opacity: 0.9;
              background: rgba(255,255,255,0.1);
              padding: 4px 10px;
              border-radius: 6px;
            }
            .status-badge { 
              display: inline-flex;
              align-items: center;
              gap: 5px;
              padding: 6px 12px; 
              border-radius: 20px; 
              font-size: 12px; 
              font-weight: 600;
              background: linear-gradient(135deg, #10b981 0%, #059669 100%);
              color: white;
              box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);
            }
            .invoice-body { padding: 15px 20px; }
            .accent-section { 
              background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%); 
              padding: 15px; 
              border-radius: 12px; 
              margin-bottom: 15px;
              border: 2px solid #f59e0b;
              position: relative;
            }
            .accent-section::before {
              content: '';
              position: absolute;
              top: 0;
              left: 0;
              right: 0;
              height: 4px;
              background: linear-gradient(90deg, #f59e0b, #d97706, #b45309);
              border-radius: 12px 12px 0 0;
            }
            .section-title { 
              font-size: 16px; 
              font-weight: bold; 
              color: #1e293b; 
              margin-bottom: 10px;
              display: flex;
              align-items: center;
              gap: 10px;
            }
            .section-title svg {
              color: #f59e0b;
            }
            .client-info { 
              display: grid; 
              grid-template-columns: 1fr 1fr; 
              gap: 12px;
            }
            .info-item { 
              display: flex; 
              align-items: center; 
              gap: 8px;
              padding: 8px;
              background: rgba(255,255,255,0.7);
              border-radius: 8px;
              border: 1px solid rgba(245, 158, 11, 0.2);
            }
            .info-item svg {
              color: #f59e0b;
              flex-shrink: 0;
            }
            .info-label { 
              font-weight: 600; 
              color: #374151; 
              font-size: 13px;
              margin-bottom: 2px;
            }
            .info-value { 
              color: #1e293b; 
              font-size: 14px;
              font-weight: 500;
            }
            .service-section { 
              background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
              padding: 15px; 
              border-radius: 12px; 
              margin-bottom: 15px;
              border: 2px solid #e2e8f0;
            }
            .service-table { 
              width: 100%; 
              border-collapse: collapse; 
              margin-top: 10px;
              background: white;
              border-radius: 8px;
              overflow: hidden;
              box-shadow: 0 4px 12px rgba(0,0,0,0.1);
            }
            .service-table th { 
              background: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%); 
              color: white;
              padding: 10px 8px; 
              text-align: left; 
              font-weight: 600; 
              font-size: 12px;
            }
            .service-table td { 
              padding: 10px 8px; 
              border-bottom: 1px solid #e2e8f0;
              font-size: 12px;
            }
            .service-table tr:last-child td {
              border-bottom: none;
            }
            .service-name { 
              font-weight: 600; 
              color: #1e293b; 
              font-size: 13px;
            }
            .service-description { 
              color: #64748b; 
              font-size: 11px; 
              margin-top: 3px;
              line-height: 1.2;
            }
            .amount-cell { 
              text-align: right; 
              font-weight: 600;
              color: #059669;
              font-size: 13px;
            }
            .totals-section { 
              background: linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%); 
              padding: 15px; 
              border-radius: 12px; 
              margin-top: 15px;
              border: 2px solid #10b981;
            }
            .totals-table { 
              width: 100%; 
              border-collapse: collapse;
            }
            .totals-table td { 
              padding: 8px 0; 
              border-bottom: 1px solid #d1fae5;
              font-size: 13px;
            }
            .totals-table tr:last-child td { 
              border-bottom: none; 
              font-weight: bold; 
              font-size: 16px;
              color: #059669;
            }
            .total-label { 
              text-align: right; 
              padding-right: 20px;
              color: #374151;
            }
            .total-value { 
              text-align: right;
              color: #059669;
            }
            .footer { 
              background: linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%); 
              padding: 15px; 
              text-align: center;
              border-top: 2px solid #e2e8f0;
            }
            .footer-content { 
              display: flex; 
              justify-content: space-between; 
              align-items: flex-start;
              gap: 15px;
            }
            .payment-info { 
              text-align: left;
              flex: 1;
            }
            .payment-title { 
              font-weight: bold; 
              color: #1e293b; 
              margin-bottom: 4px;
              font-size: 13px;
            }
            .payment-details { 
              color: #64748b; 
              font-size: 11px;
              line-height: 1.3;
            }
            .due-date-info {
              text-align: right;
              flex: 1;
            }
            .print-buttons { 
              text-align: center; 
              padding: 20px; 
              background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%); 
              border-top: 2px solid #e2e8f0;
            }
            .print-btn { 
              background: linear-gradient(135deg, #3b82f6 0%, #1e40af 100%); 
              color: white; 
              border: none; 
              padding: 14px 28px; 
              border-radius: 10px; 
              font-weight: 600; 
              cursor: pointer; 
              margin: 0 12px;
              display: inline-flex;
              align-items: center;
              gap: 10px;
              transition: all 0.3s ease;
              box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
              font-size: 15px;
            }
            .print-btn:hover { 
              background: linear-gradient(135deg, #2563eb 0%, #1e3a8a 100%); 
              transform: translateY(-2px);
              box-shadow: 0 6px 20px rgba(59, 130, 246, 0.4);
            }
            .print-btn.secondary { 
              background: linear-gradient(135deg, #6b7280 0%, #4b5563 100%);
              box-shadow: 0 4px 12px rgba(107, 114, 128, 0.3);
            }
            .print-btn.secondary:hover { 
              background: linear-gradient(135deg, #4b5563 0%, #374151 100%);
              box-shadow: 0 6px 20px rgba(107, 114, 128, 0.4);
            }
            .company-logo {
              display: flex;
              align-items: center;
              justify-content: center;
              gap: 10px;
              margin-bottom: 10px;
            }
            .logo-icon {
              width: 40px;
              height: 40px;
              background: rgba(255,255,255,0.2);
              border-radius: 10px;
              display: flex;
              align-items: center;
              justify-content: center;
              backdrop-filter: blur(10px);
            }
            .company-logo-image {
              width: 45px;
              height: 45px;
              object-fit: contain;
              border-radius: 10px;
              background: rgba(255,255,255,0.2);
              padding: 6px;
              backdrop-filter: blur(10px);
            }
            .watermark {
              position: absolute;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%) rotate(-45deg);
              font-size: 80px;
              color: rgba(0,0,0,0.02);
              font-weight: bold;
              pointer-events: none;
              z-index: 0;
            }
          </style>
        </head>
        <body>
          ${printContent}
        </body>
      </html>
    `);
    
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
    printWindow.close();
  };

  const handleDownload = () => {
    // This would typically generate a PDF
    // For now, we'll just trigger the print function
    handlePrint();
  };

  return (
    <div className="invoice-modal-simple">
      <div className="invoice-container" ref={invoiceRef}>
        <button className="invoice-close-btn" onClick={onClose}>
          <X size={20} />
        </button>
        <div className="watermark">COUVREUR PRO</div>
        
        {/* Header */}
        <div className="invoice-header">
          <div className="company-info">
            <div className="company-logo">
              <img 
                src="/logo.png" 
                alt="COUVREUR PRO Logo" 
                className="company-logo-image"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'flex';
                }}
              />
              <div className="logo-icon" style={{ display: 'none' }}>
                <Star size={24} />
              </div>
              <div>
                <div className="company-name">COUVREUR PRO</div>
                <div className="company-tagline">Spécialiste en toiture et couverture</div>
              </div>
            </div>
          </div>
          
          <div className="company-details">
            <div>
              <div className="invoice-number">FACTURE #{order.id.toString().padStart(6, '0')}</div>
              <div className="invoice-date">Date: {formatDate(new Date())}</div>
            </div>
            <div className="status-badge">
              <CheckCircle size={16} />
              {order.status === 'terminé' ? 'Payé' : 'En attente'}
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="invoice-body">
          {/* Client Information */}
          <div className="accent-section">
            <div className="section-title">
              <User size={24} />
              Informations Client
            </div>
            <div className="client-info">
              <div className="info-item">
                <User size={18} />
                <div>
                  <div className="info-label">Nom</div>
                  <div className="info-value">{order.client_name}</div>
                </div>
              </div>
              <div className="info-item">
                <Mail size={18} />
                <div>
                  <div className="info-label">Email</div>
                  <div className="info-value">{order.clientEmail}</div>
                </div>
              </div>
              <div className="info-item">
                <Phone size={18} />
                <div>
                  <div className="info-label">Téléphone</div>
                  <div className="info-value">{order.clientPhone}</div>
                </div>
              </div>
              <div className="info-item">
                <MapPin size={18} />
                <div>
                  <div className="info-label">Adresse</div>
                  <div className="info-value">{order.address}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Service Details */}
          <div className="service-section">
            <div className="section-title">
              <Package size={24} />
              Détails du Service
            </div>
            <table className="service-table">
              <thead>
                <tr>
                  <th>Service</th>
                  <th>Description</th>
                  <th>Durée</th>
                  <th>Montant</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <div className="service-name">{order.service}</div>
                  </td>
                  <td>
                    <div className="service-description">{order.description}</div>
                  </td>
                  <td>{order.estimatedDuration}</td>
                  <td className="amount-cell">{formatCurrency(order.budget)}</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Totals */}
          <div className="totals-section">
            <table className="totals-table">
              <tbody>
                <tr>
                  <td className="total-label">Sous-total:</td>
                  <td className="total-value">{formatCurrency(order.budget)}</td>
                </tr>
                <tr>
                  <td className="total-label">TVA (20%):</td>
                  <td className="total-value">{formatCurrency(calculateTax(order.budget))}</td>
                </tr>
                <tr>
                  <td className="total-label">Total TTC:</td>
                  <td className="total-value">{formatCurrency(calculateTotal(order.budget))}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer */}
        <div className="footer">
          <div className="footer-content">
            <div className="payment-info">
              <div className="payment-title">Conditions de paiement</div>
              <div className="payment-details">
                Paiement à 30 jours<br />
                IBAN: FR76 1234 5678 9012 3456 7890 123<br />
                BIC: BNPAFRPPXXX<br />
                <strong>Merci pour votre confiance !</strong>
              </div>
            </div>
            <div className="due-date-info">
              <div className="payment-title">Échéance</div>
              <div className="payment-details">{formatDate(order.deadline)}</div>
            </div>
          </div>
        </div>

        {/* Print Buttons */}
        <div className="print-buttons no-print" style={{display: 'flex', justifyContent: 'center', gap: '16px', background: 'none', border: 'none', boxShadow: 'none', padding: 0}}>
          <button className="print-btn" onClick={handlePrint} style={{minWidth: 180}}>
            <Printer size={18} />
            Imprimer la facture
          </button>
          <button className="print-btn secondary" onClick={onClose} style={{minWidth: 120}}>
            Fermer
          </button>
        </div>
      </div>
    </div>
  );
};

export default Invoice; 