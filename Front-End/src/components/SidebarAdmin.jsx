import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  LayoutDashboard, Target, Image, MessageSquare, BookOpen, Users, LogOut, Package, MessageCircle
} from 'lucide-react';
import '../styles/admin.css';

const sidebarLinks = [
  {
    to: '/admin/dashboard',
    label: 'Tableau de bord',
    icon: LayoutDashboard
  },
  {
    to: '/admin/contact',
    label: 'Contact',
    icon: MessageCircle
  },
  {
    to: '/admin/services',
    label: 'Services',
    icon: Target
  },
  {
    to: '/admin/orders',
    label: 'Commandes',
    icon: Package
  },
  {
    to: '/admin/gallery',
    label: 'Galerie',
    icon: Image
  },
  {
    to: '/admin/testimonials',
    label: 'Témoignages',
    icon: MessageSquare
  },
  {
    to: '/admin/blog',
    label: 'Blog',
    icon: BookOpen
  },
  {
    to: '/admin/users',
    label: 'Utilisateurs',
    icon: Users
  },

];

const SidebarAdmin = () => {
  const location = useLocation();

  return (
    <aside className="sidebar-admin">
      <div className="sidebar-logo">
        <div className="sidebar-logo-container">
          <img 
            src="/logo.png" 
            alt="BN BÂTIMENT Logo" 
            className="sidebar-logo-image"
          />
        </div>
        <div className="sidebar-logo-text-container">
          <span className="sidebar-logo-text">BN BÂTIMENT</span>
          <span className="sidebar-logo-subtitle">Administration</span>
        </div>
      </div>
      <nav className="sidebar-nav">
        {sidebarLinks.map(link => {
          const Icon = link.icon;
          return (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                'sidebar-link' + (isActive ? ' active' : '')
              }
              end={link.to === '/admin/dashboard'}
            >
              <Icon size={20} className="sidebar-link-icon" />
              <span className="sidebar-link-label">{link.label}</span>
            </NavLink>
          );
        })}
      </nav>
      <div className="sidebar-footer">
        <button className="sidebar-link logout">
          <LogOut size={20} className="sidebar-link-icon" />
          <span className="sidebar-link-label">Déconnexion</span>
        </button>
      </div>
    </aside>
  );
};

export default SidebarAdmin; 