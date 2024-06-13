import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faShareAlt, faMapMarkerAlt, faTruck, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { faPinterest, faFacebook, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { useCart } from '../../../contexts/CartContext'; // Import useCart
import Bingkai2 from '../../assets/img/bingkai2.png';
import Bingkai1 from '../../assets/img/bingkai1.png';
import Bingkai3 from '../../assets/img/bingkai3.png';
import Bingkai4 from '../../assets/img/bingkai4.png';
import '../../dist/css/DetailKoleksi.css';

const DetailKoleksi = () => {
  const { id } = useParams();
  const [painting, setPainting] = useState(null);
  const [error, setError] = useState(null);
  const { addToCart } = useCart(); // Gunakan useCart untuk mendapatkan addToCart

  useEffect(() => {
    console.log(`Fetching painting with ID: ${id}`);
    fetch(`http://localhost:3000/paintings/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => setPainting(data))
      .catch((error) => {
        console.error('Error fetching painting:', error);
        setError(error.message);
      });
  }, [id]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!painting) {
    return <div>Loading...</div>;
  }

  const handleAddToCart = () => {
    addToCart(painting);
  };

  return (
    <Container className="detail-koleksi">
      <Row>
        <Col md={6}>
          <img src={`/${painting.image}`} alt={painting.title} className="img-fluid" style={{ width: '70%', height: 'auto', marginLeft: '80px' }} />
          <div className="share-icons mt-3" style={{ marginLeft: '100px' }}>
            <span className="fa-text">Bagikan ke</span>
            <FontAwesomeIcon icon={faShareAlt} className="me-2 fa-icon" />
            <FontAwesomeIcon icon={faPinterest} className="me-2 fa-icon" />
            <FontAwesomeIcon icon={faFacebook} className="me-2 fa-icon" />
            <FontAwesomeIcon icon={faTwitter} className="me-2 fa-icon" />
          </div>
        </Col>
        <Col md={6}>
          <Card style={{ marginTop: '-90px' }}>
            <Card.Body>
              <Card.Title>
                {painting.title} <span>{painting.year}</span>
              </Card.Title>
              <Card.Text>
                <strong>Harga:</strong> IDR. {painting.price.toLocaleString('id-ID')}
                <br />
                <span className="badge bg-success">Tersedia</span>
                <br />
                <strong>Artis:</strong> {painting.artist}
                <br />
                <strong>Dimensi:</strong> 200 x 102 cm
                <br />
                <strong>Deskripsi Fisik:</strong> {painting.media} di Canvas
                <br />
                <strong>Deskripsi:</strong> {painting.description}
                <br />
                <strong>Pilih Tipe Frame:</strong>
                <div className="frame-options">
                  <img src={Bingkai2} alt="Frame 1" style={{ width: '100px', height: 'auto' }} />
                  <img src={Bingkai1} alt="Frame 2" style={{ width: '100px', height: 'auto' }} />
                  <img src={Bingkai3} alt="Frame 3" style={{ width: '100px', height: 'auto' }} />
                  <img src={Bingkai4} alt="No Frame" style={{ width: '100px', height: 'auto' }} />
                </div>
              </Card.Text>
              <Button className="custom-cart-button d-inline-block me-2" onClick={handleAddToCart}>
                <FontAwesomeIcon icon={faShoppingCart} className="cart-icon" />
                Keranjang
              </Button>
              <Button className="custom-buy-button d-inline-block">Beli Sekarang</Button>
              <div className="details mt-3">
                <p>
                  <FontAwesomeIcon icon={faMapMarkerAlt} className="me-2" />
                  Dikirim dari <strong>Jakarta, Indonesia</strong>
                </p>
                <p>
                  <FontAwesomeIcon icon={faTruck} className="me-2" />
                  Estimasi Pengiriman <strong>IDR 150.000</strong>
                </p>
                <p>
                  <FontAwesomeIcon icon={faCheckCircle} className="me-2" />
                  100% Produk Original
                </p>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col></Col>
      </Row>
    </Container>
  );
};

export default DetailKoleksi;
