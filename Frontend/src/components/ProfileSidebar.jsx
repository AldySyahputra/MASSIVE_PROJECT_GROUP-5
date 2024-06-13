import React, { useEffect } from 'react';
import { Card, ListGroup, Button } from 'react-bootstrap';
import { FaUser, FaBell, FaExchangeAlt, FaHeart, FaSignOutAlt } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '../../contexts/UserContext'; // Impor useUser

const ProfileSidebar = () => {
  const { user, setUser } = useUser(); // Gunakan useUser untuk mendapatkan setUser
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]); // Tambahkan useEffect untuk menghandle redirect

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null); // Reset state pengguna di UserContext
    navigate('/login');
  };

  // Hapus pengecekan user di sini untuk menghindari redirect saat render

  return (
    <Card className="profile-card">
      <Card.Body className="text-center">
        <img src={user?.foto_pelanggan || 'https://via.placeholder.com/100'} alt="Profile" className="profile-picture rounded-circle mb-3" />
        <h5>{user?.nama_pelanggan}</h5>
        <p>{user?.email_pelanggan}</p>
      </Card.Body>
      <ListGroup variant="flush">
        <ListGroup.Item>
          <FaUser className="me-2" />{' '}
          <Link to="/profile" style={{ color: 'inherit', textDecoration: 'none' }}>
            Informasi Akun
          </Link>
        </ListGroup.Item>
        <ListGroup.Item>
          <FaBell className="me-2" /> Notifikasi
        </ListGroup.Item>
        <ListGroup.Item>
          <FaExchangeAlt className="me-2" /> Transaksi
        </ListGroup.Item>
        <ListGroup.Item>
          <FaHeart className="me-2" />{' '}
          <Link to="/wishlist" style={{ color: 'inherit', textDecoration: 'none' }}>
            Wishlist
          </Link>
        </ListGroup.Item>
      </ListGroup>
      <Card.Body>
        <Button variant="danger" className="w-100" onClick={handleLogout}>
          <FaSignOutAlt className="me-2" /> Keluar
        </Button>
      </Card.Body>
    </Card>
  );
};

export default ProfileSidebar;
