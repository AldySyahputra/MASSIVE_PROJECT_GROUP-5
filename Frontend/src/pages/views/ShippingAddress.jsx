import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../../dist/css/ShippingAddress.css';
import { Card, Button, Form, Row, Col } from 'react-bootstrap';

const ShippingAddress = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { cartItems, totalPrice } = location.state;
  const [addresses, setAddresses] = useState([]);
  const [shippingServices, setShippingServices] = useState([]);
  const [shippingCost, setShippingCost] = useState(300000); // Contoh biaya pengiriman
  const [tax, setTax] = useState(600000); // Contoh pajak
  const [frameCost, setFrameCost] = useState(400000); // Contoh biaya frame

  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const response = await fetch('http://localhost:8081/pelanggan'); // Sesuaikan URL dengan endpoint backend Anda
        const data = await response.json();
        setAddresses(data);
      } catch (error) {
        console.error('Error fetching addresses:', error);
      }
    };

    const fetchShippingServices = async () => {
      try {
        const response = await fetch('http://localhost:8081/shipping_services'); // Sesuaikan URL dengan endpoint backend Anda
        const data = await response.json();
        setShippingServices(data);
      } catch (error) {
        console.error('Error fetching shipping services:', error);
      }
    };

    fetchShippingServices();
    fetchAddresses();
  }, []);

  const handleProceedToPayment = () => {
    navigate('/payment', {
      state: {
        cartItems,
        totalPrice,
        shippingCost,
        tax,
        frameCost,
      },
    });
  };

  const grandTotal = totalPrice + shippingCost + tax + frameCost;

  return (
    <div style={{ marginTop: '100px' }}>
      <h3 style={{ textAlign: 'center' }}>
        <i className="fa fa-home" style={{ marginRight: '10px', color: 'blue' }}></i>
        <strong>Pengiriman & Alamat</strong>
      </h3>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div style={{ flex: 1, marginLeft: '50px' }}>
          <h3>
            <strong>Pesanan</strong>
          </h3>
          {cartItems.map((item) => (
            <div key={item.id} style={{ display: 'flex', marginBottom: '20px' }}>
              <img src={item.image} alt={item.title} style={{ width: '100px', height: '100px', marginRight: '20px' }} />
              <div>
                <p>{item.title}</p>
                <p>Dimensi: {item.dimensions}</p>
                <p>IDR. {parseFloat(item.price).toLocaleString('id-ID')}</p>
              </div>
            </div>
          ))}
          <Card className="cart-summary">
            <h3>
              <strong>Ringkasan Pesanan</strong>
            </h3>
            <Card.Body>
              <p>
                <span>Total Produk ({cartItems.length})</span>
                <span>IDR. {totalPrice.toLocaleString('id-ID')}</span>
              </p>
              <p>
                <span>Biaya pengiriman</span>
                <span>IDR. {shippingCost.toLocaleString('id-ID')}</span>
              </p>
              <div className="total">
                <span>Total</span>
                <span>IDR. {grandTotal.toLocaleString('id-ID')}</span>
              </div>
            </Card.Body>
          </Card>
        </div>
        <div style={{ flex: 1, marginLeft: '-50px' }}>
          <div style={{ marginTop: '20px' }}>
            <h4>
              <strong>Jasa Pengiriman</strong>
            </h4>
            {shippingServices.map((service) => (
              <div key={service.id} style={{ border: '1px solid #ccc', padding: '10px', borderRadius: '5px', marginBottom: '10px' }}>
                <p>{service.name}</p>
                <p>Estimasi pengiriman {service.estimated_delivery}</p>
                <p>IDR {parseFloat(service.price).toLocaleString('id-ID')}</p>
              </div>
            ))}
          </div>
          <Card className="address-card" style={{ marginTop: '20px' }}>
            <Card.Header>
              <h4>
                <strong>Alamat</strong>
              </h4>
              <p>Lengkapi detail alamat untuk melanjutkan pembayaran</p>
            </Card.Header>
            <Card.Body>
              <Form>
                <Row>
                  <Col>
                    <Form.Group controlId="firstName">
                      <Form.Label>Nama Depan</Form.Label>
                      <Form.Control type="text" placeholder="Nama Depan" />
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group controlId="lastName">
                      <Form.Label>Nama Belakang</Form.Label>
                      <Form.Control type="text" placeholder="Nama Belakang" />
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Form.Group controlId="phone">
                      <Form.Label>Nomor Telepon</Form.Label>
                      <Form.Control type="text" placeholder="+62" />
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group controlId="email">
                      <Form.Label>Alamat Email</Form.Label>
                      <Form.Control type="email" placeholder="Email" />
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Form.Group controlId="city">
                      <Form.Label>Kota</Form.Label>
                      <Form.Control type="text" placeholder="Kota" />
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group controlId="province">
                      <Form.Label>Provinsi</Form.Label>
                      <Form.Control type="text" placeholder="Provinsi" />
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group controlId="postalCode">
                      <Form.Label>Kode Pos</Form.Label>
                      <Form.Control type="text" placeholder="Kode Pos" />
                    </Form.Group>
                  </Col>
                </Row>
                <Form.Group controlId="address">
                  <Form.Label>Alamat</Form.Label>
                  <Form.Control type="text" placeholder="Alamat" />
                </Form.Group>
                <Form.Group controlId="notes">
                  <Form.Label>
                    Catatan <span style={{ color: 'gray' }}>*Optional</span>
                  </Form.Label>
                  <Form.Control type="text" placeholder="Catatan" />
                </Form.Group>
                <Form.Group controlId="defaultAddress">
                  <Form.Check type="checkbox" label="Simpan Alamat sebagai Default" />
                </Form.Group>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
                  <Button variant="secondary">Batal</Button>
                  <Button variant="primary" size="sm" onClick={handleProceedToPayment}>
                    Lanjut
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ShippingAddress;
