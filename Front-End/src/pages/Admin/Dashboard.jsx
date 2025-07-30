import React from 'react';

const Dashboard = () => {
  return (
    <div className="admin-container">
      <div className="admin-main">
        <div className="admin-content">
          <div className="dashboard-welcome">
            <h1>Tableau de bord</h1>
            <p>Bienvenue dans votre espace d'administration</p>
          </div>
          
          <div className="dashboard-stats">
            <div className="stat-card">
              <h3>Devis en attente</h3>
              <p>12</p>
            </div>
            <div className="stat-card">
              <h3>Projets en cours</h3>
              <p>8</p>
            </div>
            <div className="stat-card">
              <h3>Clients satisfaits</h3>
              <p>156</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
