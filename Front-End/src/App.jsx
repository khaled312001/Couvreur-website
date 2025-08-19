// App Component - Updated
import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

// Import styles
import "./styles/main.css";
import "./styles/mobile-responsive.css";
import "./styles/auth.css";
import "./styles/payment.css";
import "./styles/services.css";
import "./styles/service-details.css";
import "./styles/not-found.css";
import "./styles/animations.css";

// Import contexts
import { AuthProvider } from "./context/AuthContext";
import { LanguageProvider } from "./context/LanguageContext";

// Import Header and Footer components
import Header from "./components/Header";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import SmoothScroll from "./components/SmoothScroll";

// Import all pages
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Blog from "./pages/Blog";
import BlogDetail from "./pages/BlogDetail";
import Gallery from "./pages/Gallery";
import Testimonials from "./pages/Testimonials";
import Areas from "./pages/Areas";
import Pricing from "./pages/Pricing";

// Import Services pages
import Services from "./pages/Services/Services";
import ServiceDetail from "./pages/Services/ServiceDetail";

// Import City-specific service pages
import Lyon from "./pages/Services/Lyon";
import SaintEtienne from "./pages/Services/SaintEtienne";
import Valence from "./pages/Services/Valence";
import ClermontFerrand from "./pages/Services/ClermontFerrand";
import Grenoble from "./pages/Services/Grenoble";

// Import Admin pages and components
import Login from "./pages/Admin/Login";
import Dashboard from "./pages/Admin/Dashboard";
import QuotesAdmin from "./pages/Admin/QuotesAdmin";
import TestimonialsAdmin from "./pages/Admin/TestimonialsAdmin";
import BlogAdmin from "./pages/Admin/BlogAdmin";
import GalleryAdmin from "./pages/Admin/GalleryAdmin";
import ServicesAdmin from "./pages/Admin/ServicesAdmin";
// ContactAdmin import - Updated - Fixed
import ContactAdmin from "./pages/Admin/ContactAdmin";
import UsersAdmin from "./pages/Admin/UsersAdmin";
import SettingsAdmin from "./pages/Admin/SettingsAdmin";
import OrdersAdmin from "./pages/Admin/OrdersAdmin";
import ProfileAdmin from "./pages/Admin/ProfileAdmin";
import PaymentsAdmin from "./pages/Admin/PaymentsAdmin";
import ChatAdmin from "./pages/Admin/ChatAdmin";
import AdminLayout from "./layouts/AdminLayout";
import ProtectedRoute from "./components/ProtectedRoute";

// Import User pages
import UserLogin from "./pages/Login";
import UserRegister from "./pages/Register";
import UserProfile from "./pages/Profile";
import UserQuotes from "./pages/UserQuotes";
import UserMessages from "./pages/UserMessages";

// Import Payment pages
import Payment from "./pages/Payment";
import PaymentSuccess from "./pages/PaymentSuccess";

// Import Invoice page
import Invoice from "./pages/Invoice";

// Import 404 page
import NotFound from "./pages/NotFound";

// Import Performance Optimizer
import PerformanceOptimizer from "./components/PerformanceOptimizer";

function App() {
  return (
    <AuthProvider>
        <Router>
          <LanguageProvider>
            <PerformanceOptimizer>
              <ScrollToTop />
              <SmoothScroll />
              <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', width: '100%' }}>
                <Routes>
                  {/* Admin Routes */}
                  <Route path="/admin/login" element={<Login />} />
                  <Route path="/admin" element={<ProtectedRoute><AdminLayout /></ProtectedRoute>}>
                    <Route index element={<Navigate to="/admin/dashboard" replace />} />
                    <Route path="dashboard" element={<Dashboard />} />
                    <Route path="quotes" element={<QuotesAdmin />} />
                    <Route path="testimonials" element={<TestimonialsAdmin />} />
                    <Route path="blog" element={<BlogAdmin />} />
                    <Route path="gallery" element={<GalleryAdmin />} />
                    <Route path="services" element={<ServicesAdmin />} />
                    <Route path="contact" element={<ContactAdmin />} />
                    <Route path="orders" element={<OrdersAdmin />} />
                    <Route path="users" element={<UsersAdmin />} />
                    <Route path="settings" element={<SettingsAdmin />} />
                    <Route path="profile" element={<ProfileAdmin />} />
                    <Route path="payments" element={<PaymentsAdmin />} />
                    <Route path="chat" element={<ChatAdmin />} />
                  </Route>

                  {/* Main App Routes */}
                  <Route path="*" element={
                    <>
                      <Header />
                      <main style={{ flex: 1, width: '100%' }}>
                        <Routes>
                          {/* Main Pages */}
                          <Route path="/" element={<Home />} />
                          <Route path="/a-propos" element={<About />} />
                          <Route path="/contact" element={<Contact />} />
                          <Route path="/blog" element={<Blog />} />
                          <Route path="/blog/:slug" element={<BlogDetail />} />
                          <Route path="/realisations" element={<Gallery />} />
                          <Route path="/avis" element={<Testimonials />} />
                          <Route path="/testimonials" element={<Testimonials />} />
                          <Route path="/zones" element={<Areas />} />
                          <Route path="/tarifs" element={<Pricing />} />

                          {/* User Auth Routes */}
                          <Route path="/login" element={<UserLogin />} />
                          <Route path="/register" element={<UserRegister />} />
                          <Route path="/profile" element={<UserProfile />} />
                          <Route path="/quotes" element={<UserQuotes />} />
                          <Route path="/messages" element={<UserMessages />} />

                          {/* Payment Routes */}
                          <Route path="/payment" element={<Payment />} />
                          <Route path="/payment-success" element={<PaymentSuccess />} />

                          {/* Invoice Route */}
                          <Route path="/facture" element={<Invoice />} />

                          {/* Services Pages */}
                          <Route path="/services" element={<Services />} />
                          <Route path="/services/:slug" element={<ServiceDetail />} />

                          {/* City-specific Service Pages for Local SEO */}
                          <Route path="/services/lyon" element={<Lyon />} />
                          <Route path="/services/saint-etienne" element={<SaintEtienne />} />
                          <Route path="/services/valence" element={<Valence />} />
                          <Route path="/services/clermont-ferrand" element={<ClermontFerrand />} />
                          <Route path="/services/grenoble" element={<Grenoble />} />

                          {/* 404 Page - Must be last */}
                          <Route path="*" element={<NotFound />} />
                        </Routes>
                      </main>
                      <Footer />

                      {/* Floating WhatsApp Button */}
                      <div className="floating-whatsapp">
                        <a href="https://wa.me/33780326427" target="_blank" rel="noopener noreferrer">
                          <img
                            src="https://media.zid.store/apps/ff0d62d8-f69c-44d3-86b3-a262bbab7d87.png"
                            alt="WhatsApp"
                            style={{ width: "38px", height: "38px", objectFit: "contain" }}
                          />
                        </a>
                      </div>
                    </>
                  } />
                </Routes>
              </div>
            </PerformanceOptimizer>
          </LanguageProvider>
        </Router>
    </AuthProvider>
  );
}

export default App;
