import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useWishlist } from '../../contexts/WishlistContext';
import { useUser } from '../../contexts/UserContext';
import ProfileSidebar from '../components/ProfileSidebar';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as faHeartSolid } from '@fortawesome/free-solid-svg-icons';

const WishlistPage = () => {
  const { wishlist } = useWishlist();
  const { user, setUser } = useUser();
  const navigate = useNavigate();
  const [paintings, setPaintings] = useState([]);
  const [activeHearts, setActiveHearts] = useState([]);

  useEffect(() => {
    // Ambil data lukisan berdasarkan wishlist
    const fetchPaintings = async () => {
      try {
        const paintingIds = wishlist.map((item) => item.painting_id);
        const response = await axios.post('/api/getPaintingsByIds', { ids: paintingIds });
        setPaintings(response.data);
        setActiveHearts(new Array(response.data.length).fill(false));
      } catch (error) {
        console.error('Error fetching paintings:', error);
      }
    };

    if (wishlist.length > 0) {
      fetchPaintings();
    }
  }, [wishlist]);

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  const handleRemoveFromWishlist = async (paintingId) => {
    try {
      // Menghapus item dari state lokal
      const updatedWishlist = wishlist.filter((item) => item.painting_id !== paintingId);
      setWishlist(updatedWishlist);

      // Mengirim permintaan ke server untuk menghapus item dari database
      const payload = { id_pelanggan: user.id_pelanggan, painting_id: paintingId };
      console.log('Sending payload:', payload); // Tambahkan log untuk debugging
      const response = await axios.post('/api/wishlist/remove', payload);
      console.log('Response:', response); // Tambahkan log untuk debugging
      alert('Item berhasil dihapus dari wishlist');
    } catch (error) {
      console.error('Gagal menghapus item dari wishlist:', error);
      alert('Gagal menghapus item dari wishlist');
    }
  };

  return (
    <Container style={{ marginTop: '10px', paddingTop: '5rem' }}>
      <Row>
        <Col md={3}>
          <ProfileSidebar onLogout={handleLogout} />
        </Col>
        <Col md={9}>
          <Card>
            <Card.Body>
              <Row>
                {wishlist.map((painting, index) => (
                  <Col md={4} key={painting.id}>
                    <Card>
                      <Card.Img variant="top" src={painting.image} />
                      <Card.Body>
                        <Card.Title>{painting.title}</Card.Title>
                        <Card.Text>
                          {painting.artist}
                          <br />
                          <strong>{painting.price.toLocaleString('id-ID')}</strong>
                        </Card.Text>
                        <FontAwesomeIcon icon={faHeartSolid} onClick={() => handleRemoveFromWishlist(painting.id)} style={{ cursor: 'pointer', color: 'red' }} />
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default WishlistPage;
