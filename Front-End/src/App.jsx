import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

// Import styles
import "./styles/main.css";
import "./styles/mobile-responsive.css";
import "./styles/auth.css";

// Import contexts
import { AuthProvider } from "./context/AuthContext";

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
import UsersAdmin from "./pages/Admin/UsersAdmin";
import SettingsAdmin from "./pages/Admin/SettingsAdmin";
import OrdersAdmin from "./pages/Admin/OrdersAdmin";
import ProfileAdmin from "./pages/Admin/ProfileAdmin";
import AdminLayout from "./layouts/AdminLayout";
import ProtectedRoute from "./components/ProtectedRoute";

// Import User pages
import UserLogin from "./pages/Login";
import UserRegister from "./pages/Register";
import UserProfile from "./pages/Profile";
import UserQuotes from "./pages/UserQuotes";
import UserMessages from "./pages/UserMessages";

function App() {
  return (
    <AuthProvider>
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
              <Route path="orders" element={<OrdersAdmin />} />
              <Route path="users" element={<UsersAdmin />} />
              <Route path="settings" element={<SettingsAdmin />} />
              <Route path="profile" element={<ProfileAdmin />} />
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

                    {/* User Auth Routes */}
                    <Route path="/login" element={<UserLogin />} />
                    <Route path="/register" element={<UserRegister />} />
                    <Route path="/profile" element={<UserProfile />} />
                    <Route path="/quotes" element={<UserQuotes />} />
                    <Route path="/messages" element={<UserMessages />} />

<<<<<<< HEAD
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
    </AuthProvider>
=======
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
    </Router>
>>>>>>> 2c3237bce6baee0120d82d92199eeece5e84727b
  );
}

export default App;
