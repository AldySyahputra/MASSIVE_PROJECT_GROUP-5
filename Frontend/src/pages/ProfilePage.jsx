import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button, ListGroup, Form, Spinner, Modal } from 'react-bootstrap';
import { FaUser, FaBell, FaExchangeAlt, FaHeart, FaSignOutAlt } from 'react-icons/fa';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { useWishlist } from '../../contexts/WishlistContext';

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const { wishlist } = useWishlist();

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user'));
    if (userData) {
      setUser(userData);
    } else {
      navigate('/login');
    }
  }, [navigate]);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) return;
    setLoading(true);

    const formData = new FormData();
    formData.append('profilePicture', file);
    formData.append('userId', user.id_pelanggan);

    try {
      const response = await axios.post('http://localhost:8081/upload-profile-picture', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      if (response.data.message === 'Foto profil berhasil diunggah') {
        const updatedUser = { ...user, foto_pelanggan: response.data.url };
        setUser(updatedUser);
        localStorage.setItem('user', JSON.stringify(updatedUser));
        alert('Foto profil berhasil diunggah!');
      }
    } catch (error) {
      console.error('Gagal mengunggah foto profil:', error);
      alert('Gagal mengunggah foto profil.');
    } finally {
      setLoading(false);
    }
  };

  const handleDeletePhoto = async () => {
    setShowModal(false);
    setLoading(true);

    try {
      const response = await axios.delete(`http://localhost:8081/delete-profile-picture/${user.id_pelanggan}`);
      if (response.data.message === 'Foto profil berhasil dihapus') {
        const updatedUser = { ...user, foto_pelanggan: null };
        setUser(updatedUser);
        localStorage.setItem('user', JSON.stringify(updatedUser));
        alert('Foto profil berhasil dihapus!');
      }
    } catch (error) {
      console.error('Gagal menghapus foto profil:', error);
      alert('Gagal menghapus foto profil.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.setItem('isLoggedIn', 'false');
    navigate('/login');
  };

  if (!user) {
    return (
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    );
  }

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('id-ID', options);
  };

  return (
    <Container className="profile-page-container">
      <Row>
        <Col md={3}>
          <Card className="profile-card">
            <Card.Body className="text-center">
              <img src={user.foto_pelanggan || 'https://via.placeholder.com/100'} alt="Profile" className="profile-picture rounded-circle mb-3" />
              <h5>{user.nama_pelanggan}</h5>
              <p>{user.email_pelanggan}</p>
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
        </Col>
        <Col md={9}>
          <Card className="profile-card">
            <Card.Body>
              <Row>
                <Col md={4} className="text-center">
                  <img src={user.foto_pelanggan || 'https://via.placeholder.com/150'} alt="Profile" className="profile-picture rounded-circle mb-3" />
                  <Form.Group controlId="formFile" className="mb-3">
                    <Form.Control type="file" onChange={handleFileChange} />
                  </Form.Group>
                  <div className="button-pp" style={{ display: 'flex', gap: '10px' }}>
                    <Button variant="outline-primary" onClick={handleUpload} style={{ borderRadius: '20px' }} disabled={loading}>
                      Unggah Foto
                    </Button>
                    <Button variant="outline-danger" onClick={() => setShowModal(true)} style={{ borderRadius: '20px' }} disabled={loading}>
                      Hapus Foto
                    </Button>
                  </div>
                </Col>
                <Col md={8}>
                  <h5>Profil</h5>
                  <p>Nama: {user.nama_pelanggan}</p>
                  <p>Jenis Kelamin: {user.gender}</p>
                  <p>
                    Tanggal Lahir: {formatDate(user.tanggal_lahir)} <a href="#">Tambahkan Tanggal Lahir</a>
                  </p>
                  <h5>Kontak</h5>
                  <p>
                    Email: {user.email_pelanggan} <a href="#">Ubah Email</a>
                  </p>
                  <h5>Alamat</h5>
                  <p>{user.alamat_pelanggan}</p>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Konfirmasi Penghapusan</Modal.Title>
        </Modal.Header>
        <Modal.Body>Apakah Anda yakin ingin menghapus foto profil ini?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Batal
          </Button>
          <Button variant="danger" onClick={handleDeletePhoto}>
            Hapus Foto
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default ProfilePage;
