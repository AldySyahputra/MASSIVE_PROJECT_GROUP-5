import React from 'react';
import { Container, Row, Col, Card, Button, Tooltip, OverlayTrigger } from 'react-bootstrap';
import { useCart } from '../../../contexts/CartContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faHeart } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import '../../dist/css/Cart.css';

const Cart = () => {
  const { cartItems, removeFromCart, addToWishlist } = useCart();
  const navigate = useNavigate();

  const totalPrice = cartItems.reduce((total, item) => total + parseFloat(item.price), 0);

  const renderTooltip = (props, message) => (
    <Tooltip id="button-tooltip" {...props}>
      {message}
    </Tooltip>
  );

  const handleAddToWishlist = (itemId) => {
    addToWishlist(itemId); // Fungsi yang menambahkan item ke wishlist
    navigate('/wishlist'); // Mengarahkan pengguna ke halaman wishlist
  };

  const handleProceedToShipping = () => {
    navigate('/shipping-address', { state: { cartItems, totalPrice } });
  };

  return (
    <Container className="cart-page">
      <Row>
        <Col md={8}>
          <h3 style={{ marginLeft: '-50px' }}>
            <strong>Pesanan</strong>
          </h3>
          {cartItems.map((item) => (
            <Card className="cart-item" key={item.id} style={{ marginLeft: '-50px', width: '700px' }}>
              <Card.Body>
                <Row>
                  <Col md={3}>
                    <img src={item.image} alt={item.title} className="img-fluid" />
                  </Col>
                  <Col md={9}>
                    <Card.Title>{item.title}</Card.Title>
                    <Card.Text>
                      Dimensi: {item.dimensions}
                      <br />
                      IDR. {parseFloat(item.price).toLocaleString('id-ID')}
                    </Card.Text>
                    <OverlayTrigger placement="top" overlay={(props) => renderTooltip(props, 'Tambahkan ke Wishlist')}>
                      <Button variant="outline-danger" size="sm" onClick={() => handleAddToWishlist(item.id)}>
                        <FontAwesomeIcon icon={faHeart} size="sm" /> Wishlist
                      </Button>
                    </OverlayTrigger>
                    <OverlayTrigger placement="top" overlay={(props) => renderTooltip(props, 'Hapus dari Keranjang')}>
                      <Button variant="outline-secondary" size="sm" onClick={() => removeFromCart(item.id)}>
                        <FontAwesomeIcon icon={faTrash} size="sm" /> Hapus
                      </Button>
                    </OverlayTrigger>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          ))}
        </Col>
        <Col md={4}>
          <Card className="cart-summary" style={{ marginTop: '45px', marginLeft: '-50px', width: '500px' }}>
            <h3>
              <strong>Ringkasan Pesanan</strong>
            </h3>
            <Card.Body>
              <p>
                Total Produk ({cartItems.length}): IDR. {totalPrice.toLocaleString('id-ID')}
              </p>
              <h3>Total: IDR. {totalPrice.toLocaleString('id-ID')}</h3>
              <Button variant="primary" size="sm" onClick={handleProceedToShipping}>
                Lanjut
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Cart;
