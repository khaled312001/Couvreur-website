import React, { useState } from 'react';
import '../styles/invoice.css';

const Invoice = () => {
  const [invoiceData, setInvoiceData] = useState({
    invoiceNumber: '',
    date: new Date().toISOString().split('T')[0],
    customer: {
      name: '',
      address: '',
      phone: '',
      email: ''
    },
    services: [
      {
        description: '',
        quantity: 1,
        unitPrice: 0,
        duration: '',
        total: 0
      }
    ],
    notes: '',
    paymentTerms: 'Paiement à 30 jours',
    total: 0,
    tax: 20, // TVA 20%
    subtotal: 0,
    taxAmount: 0,
    grandTotal: 0
  });

  const [isPrinting, setIsPrinting] = useState(false);

  // Calculate totals
  const calculateTotals = (services) => {
    const subtotal = services.reduce((sum, service) => sum + (service.quantity * service.unitPrice), 0);
    const taxAmount = subtotal * (invoiceData.tax / 100);
    const grandTotal = subtotal + taxAmount;
    
    return { subtotal, taxAmount, grandTotal };
  };

  // Update service
  const updateService = (index, field, value) => {
    const updatedServices = [...invoiceData.services];
    updatedServices[index] = { ...updatedServices[index], [field]: value };
    
    // Calculate total for this service
    if (field === 'quantity' || field === 'unitPrice') {
      updatedServices[index].total = updatedServices[index].quantity * updatedServices[index].unitPrice;
    }
    
    const totals = calculateTotals(updatedServices);
    
    setInvoiceData({
      ...invoiceData,
      services: updatedServices,
      ...totals
    });
  };

  // Add new service
  const addService = () => {
    setInvoiceData({
      ...invoiceData,
      services: [
        ...invoiceData.services,
        {
          description: '',
          quantity: 1,
          unitPrice: 0,
          duration: '',
          total: 0
        }
      ]
    });
  };

  // Remove service
  const removeService = (index) => {
    if (invoiceData.services.length > 1) {
      const updatedServices = invoiceData.services.filter((_, i) => i !== index);
      const totals = calculateTotals(updatedServices);
      
      setInvoiceData({
        ...invoiceData,
        services: updatedServices,
        ...totals
      });
    }
  };

  // Update customer info
  const updateCustomer = (field, value) => {
    setInvoiceData({
      ...invoiceData,
      customer: {
        ...invoiceData.customer,
        [field]: value
      }
    });
  };

  // Generate invoice number
  const generateInvoiceNumber = () => {
    const year = new Date().getFullYear();
    const month = String(new Date().getMonth() + 1).padStart(2, '0');
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    return `FACT-${year}${month}-${random}`;
  };

  // Handle print
  const handlePrint = () => {
    setIsPrinting(true);
    setTimeout(() => {
      window.print();
      setIsPrinting(false);
    }, 100);
  };

  return (
    <div className="invoice-container">
      {/* Header */}
      <div className="invoice-header">
        <div className="company-info">
          <h1>BN BÂTIMENT</h1>
          <p>Charpente • Couverture • Zinguerie</p>
          <p>Drôme (26) et Ardèche (07)</p>
          <p>Tél: 33 780 326 427</p>
          <p>Email: contact@bn-batiment.fr</p>
        </div>
        <div className="invoice-info">
          <h2>FACTURE</h2>
          <div className="invoice-details">
            <div className="invoice-field">
              <label>N° Facture:</label>
              <input
                type="text"
                value={invoiceData.invoiceNumber}
                onChange={(e) => setInvoiceData({...invoiceData, invoiceNumber: e.target.value})}
                placeholder="FACT-2024-001"
              />
              <button 
                className="generate-btn"
                onClick={() => setInvoiceData({...invoiceData, invoiceNumber: generateInvoiceNumber()})}
              >
                Générer
              </button>
            </div>
            <div className="invoice-field">
              <label>Date:</label>
              <input
                type="date"
                value={invoiceData.date}
                onChange={(e) => setInvoiceData({...invoiceData, date: e.target.value})}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Customer Information */}
      <div className="customer-section">
        <h3>Informations Client</h3>
        <div className="customer-form">
          <div className="form-row">
            <div className="form-group">
              <label>Nom complet:</label>
              <input
                type="text"
                value={invoiceData.customer.name}
                onChange={(e) => updateCustomer('name', e.target.value)}
                placeholder="Nom et prénom du client"
              />
            </div>
            <div className="form-group">
              <label>Téléphone:</label>
              <input
                type="tel"
                value={invoiceData.customer.phone}
                onChange={(e) => updateCustomer('phone', e.target.value)}
                placeholder="06 12 34 56 78"
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Adresse:</label>
              <textarea
                value={invoiceData.customer.address}
                onChange={(e) => updateCustomer('address', e.target.value)}
                placeholder="Adresse complète du client"
                rows="3"
              />
            </div>
            <div className="form-group">
              <label>Email:</label>
              <input
                type="email"
                value={invoiceData.customer.email}
                onChange={(e) => updateCustomer('email', e.target.value)}
                placeholder="client@email.com"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Services */}
      <div className="services-section">
        <h3>Services et Prestations</h3>
        <div className="services-table">
          <div className="table-header">
            <div className="header-cell">Description</div>
            <div className="header-cell">Quantité</div>
            <div className="header-cell">Prix unitaire (€)</div>
            <div className="header-cell">Durée</div>
            <div className="header-cell">Total (€)</div>
            <div className="header-cell">Action</div>
          </div>
          
          {invoiceData.services.map((service, index) => (
            <div key={index} className="table-row">
              <div className="table-cell">
                <textarea
                  value={service.description}
                  onChange={(e) => updateService(index, 'description', e.target.value)}
                  placeholder="Description du service"
                  rows="2"
                />
              </div>
              <div className="table-cell">
                <input
                  type="number"
                  min="1"
                  value={service.quantity}
                  onChange={(e) => updateService(index, 'quantity', parseInt(e.target.value) || 1)}
                />
              </div>
              <div className="table-cell">
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={service.unitPrice}
                  onChange={(e) => updateService(index, 'unitPrice', parseFloat(e.target.value) || 0)}
                />
              </div>
              <div className="table-cell">
                <input
                  type="text"
                  value={service.duration}
                  onChange={(e) => updateService(index, 'duration', e.target.value)}
                  placeholder="ex: 2 jours"
                />
              </div>
              <div className="table-cell total-cell">
                {(service.quantity * service.unitPrice).toFixed(2)} €
              </div>
              <div className="table-cell">
                <button 
                  className="remove-btn"
                  onClick={() => removeService(index)}
                  disabled={invoiceData.services.length === 1}
                >
                  ✕
                </button>
              </div>
            </div>
          ))}
        </div>
        
        <button className="add-service-btn" onClick={addService}>
          + Ajouter un service
        </button>
      </div>

      {/* Totals */}
      <div className="totals-section">
        <div className="totals-grid">
          <div className="total-row">
            <span>Sous-total:</span>
            <span>{invoiceData.subtotal.toFixed(2)} €</span>
          </div>
          <div className="total-row">
            <span>TVA ({invoiceData.tax}%):</span>
            <span>{invoiceData.taxAmount.toFixed(2)} €</span>
          </div>
          <div className="total-row grand-total">
            <span>Total TTC:</span>
            <span>{invoiceData.grandTotal.toFixed(2)} €</span>
          </div>
        </div>
      </div>

      {/* Additional Information */}
      <div className="additional-section">
        <div className="form-group">
          <label>Notes et conditions:</label>
          <textarea
            value={invoiceData.notes}
            onChange={(e) => setInvoiceData({...invoiceData, notes: e.target.value})}
            placeholder="Notes additionnelles, conditions spéciales, etc."
            rows="4"
          />
        </div>
        
        <div className="form-group">
          <label>Conditions de paiement:</label>
          <input
            type="text"
            value={invoiceData.paymentTerms}
            onChange={(e) => setInvoiceData({...invoiceData, paymentTerms: e.target.value})}
            placeholder="Paiement à 30 jours"
          />
        </div>
      </div>

      {/* Action Buttons */}
      <div className="action-buttons">
        <button className="print-btn" onClick={handlePrint}>
          🖨️ Imprimer la facture
        </button>
        <button className="save-btn">
          💾 Sauvegarder
        </button>
        <button className="send-btn">
          📧 Envoyer par email
        </button>
      </div>

      {/* Print Preview */}
      {isPrinting && (
        <div className="print-preview">
          <div className="invoice-paper">
            {/* Same content as above but optimized for print */}
            <div className="print-header">
              <div className="print-company">
                <h1>BN BÂTIMENT</h1>
                <p>Charpente • Couverture • Zinguerie</p>
                <p>Drôme (26) et Ardèche (07)</p>
                <p>Tél: 33 780 326 427</p>
              </div>
              <div className="print-invoice-info">
                <h2>FACTURE</h2>
                <p><strong>N° Facture:</strong> {invoiceData.invoiceNumber}</p>
                <p><strong>Date:</strong> {invoiceData.date}</p>
              </div>
            </div>
            
            <div className="print-customer">
              <h3>Client:</h3>
              <p><strong>{invoiceData.customer.name}</strong></p>
              <p>{invoiceData.customer.address}</p>
              <p>Tél: {invoiceData.customer.phone}</p>
              <p>Email: {invoiceData.customer.email}</p>
            </div>
            
            <div className="print-services">
              <h3>Services:</h3>
              <table className="print-table">
                <thead>
                  <tr>
                    <th>Description</th>
                    <th>Qté</th>
                    <th>Prix unit.</th>
                    <th>Durée</th>
                    <th>Total</th>
                  </tr>
                </thead>
                <tbody>
                  {invoiceData.services.map((service, index) => (
                    <tr key={index}>
                      <td>{service.description}</td>
                      <td>{service.quantity}</td>
                      <td>{service.unitPrice.toFixed(2)} €</td>
                      <td>{service.duration}</td>
                      <td>{(service.quantity * service.unitPrice).toFixed(2)} €</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <div className="print-totals">
              <p><strong>Sous-total:</strong> {invoiceData.subtotal.toFixed(2)} €</p>
              <p><strong>TVA ({invoiceData.tax}%):</strong> {invoiceData.taxAmount.toFixed(2)} €</p>
              <p><strong>Total TTC:</strong> {invoiceData.grandTotal.toFixed(2)} €</p>
            </div>
            
            <div className="print-notes">
              <p><strong>Notes:</strong> {invoiceData.notes}</p>
              <p><strong>Conditions de paiement:</strong> {invoiceData.paymentTerms}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Invoice; 