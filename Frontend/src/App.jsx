import { Routes, Route, useLocation, BrowserRouter as Router } from 'react-router-dom';
import { WishlistProvider } from '../contexts/WishlistContext';
import { UserProvider } from '../contexts/UserContext';
import { CartProvider } from '../contexts/CartContext'; // Import CartProvider

import NavbarComponent from './components/NavbarComponent';
import FooterComponent from './components/FooterComponent';

import HomePage from './pages/HomePage';
import Koleksi from './pages/Koleksi';
import Seniman from './pages/Seniman';
import Artikel from './pages/Artikel';
import TentangKami from './pages/TentangKami';
import Login from './pages/auth/login';
import ProfilePage from './pages/ProfilePage';
import Signup from './pages/auth/signup';
import DetailPelukis from './pages/views/DetailPelukis';
import WishlistPage from './pages/WishlistPage';
import DetailKoleksi from './pages/views/DetailKoleksi';
import Cart from './pages/views/Cart'; // Impor komponen Cart
import ShippingAddress from './pages/views/ShippingAddress'; // Pastikan impor ini benar
import PaymentPage from './pages/views/PaymentPage';

function App() {
  const location = useLocation();
  const showNavAndFooter = location.pathname !== '/login' && location.pathname !== '/signup';

  return (
    <UserProvider>
      <WishlistProvider>
        <CartProvider>
          {' '}
          {/* Menggunakan CartProvider */}
          <div>
            {showNavAndFooter && <NavbarComponent />}

            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/seniman" element={<Seniman />} />
              <Route path="/koleksi" element={<Koleksi />} />
              <Route path="/artikel" element={<Artikel />} />
              <Route path="/tentangkami" element={<TentangKami />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/detail-pelukis/:id" element={<DetailPelukis />} />
              <Route path="/wishlist" element={<WishlistPage />} />
              <Route path="/detail-koleksi/:id" element={<DetailKoleksi />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/shipping-address" element={<ShippingAddress />} />
              <Route path="/payment" element={<PaymentPage />} />
            </Routes>

            {showNavAndFooter && <FooterComponent />}
          </div>
        </CartProvider>
      </WishlistProvider>
    </UserProvider>
  );
}

export default App;
