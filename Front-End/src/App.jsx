import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

// Import Header and Footer components
import Header from "./components/Header";
import Footer from "./components/Footer";

// Import all pages
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Blog from "./pages/Blog";
import Gallery from "./pages/Gallery";
import Testimonials from "./pages/Testimonials";
import Areas from "./pages/Areas";
import Pricing from "./pages/Pricing";

// Import Services pages
import Services from "./pages/Services/Services";
import Charpente from "./pages/Services/Charpente";
import Couverture from "./pages/Services/Couverture";
import Zinguerie from "./pages/Services/Zinguerie";
import Installation from "./pages/Services/Installation";
import Repair from "./pages/Services/Repair";
import Maintenance from "./pages/Services/Maintenance";
import Extras from "./pages/Services/Extras";

// Import Admin pages and components
import Login from "./pages/Admin/Login";
import Dashboard from "./pages/Admin/Dashboard";
import QuotesAdmin from "./pages/Admin/QuotesAdmin";
import TestimonialsAdmin from "./pages/Admin/TestimonialsAdmin";
import BlogAdmin from "./pages/Admin/BlogAdmin";
import GalleryAdmin from "./pages/Admin/GalleryAdmin";
import ServicesAdmin from "./pages/Admin/ServicesAdmin";
import AdminLayout from "./layouts/AdminLayout";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Router>
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
                  <Route path="/realisations" element={<Gallery />} />
                  <Route path="/avis" element={<Testimonials />} />
                  <Route path="/zones" element={<Areas />} />
                  <Route path="/tarifs" element={<Pricing />} />

                  {/* Services Pages */}
                  <Route path="/services" element={<Services />} />
                  <Route path="/services/charpente" element={<Charpente />} />
                  <Route path="/services/couverture" element={<Couverture />} />
                  <Route path="/services/zinguerie" element={<Zinguerie />} />
                  <Route path="/services/installation" element={<Installation />} />
                  <Route path="/services/repair" element={<Repair />} />
                  <Route path="/services/maintenance" element={<Maintenance />} />
                  <Route path="/services/extras" element={<Extras />} />
                </Routes>
              </main>
              <Footer />

              {/* Floating WhatsApp Button */}
              <div className="floating-whatsapp">
                <a href="https://wa.me/330603713994" target="_blank" rel="noopener noreferrer">
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
    </Router>
  );
}

export default App;
