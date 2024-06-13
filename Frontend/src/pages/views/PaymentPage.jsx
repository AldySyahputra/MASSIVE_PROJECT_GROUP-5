import React, { useEffect, useState } from 'react';
import { Card, Button, Form, Row, Col } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import { useUser } from '../../../contexts/UserContext';
import '../../dist/css/PaymentPage.css';

const PaymentPage = () => {
  const location = useLocation();
  const { cartItems, totalPrice, shippingCost, tax, frameCost } = location.state;
  const { user, updateUser } = useUser();
  const [addresses, setAddresses] = useState([]);
  const [shippingServices, setShippingServices] = useState([]);
  const [selectedShippingService, setSelectedShippingService] = useState(null);

  useEffect(() => {
    if (!user) {
      updateUser();
    }

    const fetchAddresses = async () => {
      try {
        const response = await fetch('http://localhost:8081/pelanggan');
        const data = await response.json();
        setAddresses(data);
      } catch (error) {
        console.error('Error fetching addresses:', error);
      }
    };

    const fetchShippingServices = async () => {
      try {
        const response = await fetch('http://localhost:8081/shipping_services');
        const data = await response.json();
        setShippingServices(data);
      } catch (error) {
        console.error('Error fetching shipping services:', error);
      }
    };

    fetchShippingServices();
    fetchAddresses();
  }, [user]);

  const handleShippingServiceChange = (event) => {
    const serviceId = event.target.value;
    const service = shippingServices.find((svc) => svc.id === parseInt(serviceId));
    setSelectedShippingService(service);
  };

  const grandTotal = totalPrice + (selectedShippingService ? selectedShippingService.price : 0);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!user) {
      alert('Data pengguna tidak tersedia. Tidak dapat melanjutkan pembayaran.');
      return;
    }
    const paymentData = {
      user_id: user.id_pelanggan,
      total: grandTotal,
      card_number: event.target.cardNumber.value,
      expiry_date: event.target.expiryDate.value,
      cvv: event.target.cvv.value,
      status: 'Pending',
    };

    try {
      const response = await fetch('http://localhost:8081/api/payments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(paymentData),
      });
      if (response.ok) {
        alert('Pembayaran berhasil disimpan');
        // Redirect ke halaman transaksi atau update UI
      } else {
        alert('Gagal menyimpan pembayaran');
      }
    } catch (error) {
      console.error('Error saat menyimpan pembayaran:', error);
      alert('Terjadi kesalahan saat menyimpan pembayaran');
    }
  };

  return (
    <div className="container" style={{ marginTop: '100px' }}>
      <h3 style={{ textAlign: 'center' }}>
        <strong>Detail Pembayaran</strong>
      </h3>
      <div className="row">
        <div className="col-md-6">
          <h3>
            <strong>Pesanan</strong>
          </h3>
          {cartItems.map((item) => (
            <div key={item.id} className="d-flex mb-3">
              <img src={item.image} alt={item.title} className="img-thumbnail mr-3" style={{ width: '100px', height: '100px' }} />
              <div>
                <p>{item.title}</p>
                <p>Dimensi: {item.dimensions}</p>
                <p>IDR. {parseFloat(item.price).toLocaleString('id-ID')}</p>
              </div>
            </div>
          ))}
          <div className="address-shipping-card">
            <Card>
              <Card.Body>
                <h4>
                  <strong>Alamat & Pengiriman</strong>
                </h4>
                <div className="address-details">
                  <h5>
                    <strong>Detail Alamat</strong>
                  </h5>
                  {user && (
                    <>
                      <p>
                        <strong>Nama Pelanggan:</strong> {user.nama_pelanggan}
                      </p>
                      <p>
                        <strong>Alamat Pelanggan:</strong> {user.alamat_pelanggan}
                      </p>
                    </>
                  )}
                </div>
                <div className="shipping-service">
                  <Form.Group controlId="shippingServiceSelect">
                    <Form.Label>Pilih Layanan Pengiriman</Form.Label>
                    <Form.Control as="select" onChange={handleShippingServiceChange}>
                      <option value="">Pilih Layanan Pengiriman</option>
                      {shippingServices.map((service) => (
                        <option key={service.id} value={service.id}>
                          {service.name} - IDR {parseFloat(service.price).toLocaleString('id-ID')}
                        </option>
                      ))}
                    </Form.Control>
                  </Form.Group>
                  {selectedShippingService && (
                    <div className="shipping-service-details">
                      <p>
                        <strong>{selectedShippingService.name}</strong>
                      </p>
                      <p>Estimasi Pengiriman: {selectedShippingService.estimated_delivery}</p>
                      <p className="shipping-cost">
                        <strong>IDR {parseFloat(selectedShippingService.price).toLocaleString('id-ID')}</strong>
                      </p>
                    </div>
                  )}
                </div>
              </Card.Body>
            </Card>
          </div>
        </div>
        <div className="col-md-6">
          <Card className="payment-card">
            <Card.Header>
              <h4>
                <strong>Detail Pembayaran</strong>
              </h4>
              <p>Selesaikan pembelian dengan memberikan rincian pembayaran pesanan kamu.</p>
            </Card.Header>
            <Card.Body>
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="cardHolderName">
                  <Form.Label>
                    <strong>Pemilik Kartu</strong>
                  </Form.Label>
                  <Form.Control type="text" placeholder="Nama" required />
                </Form.Group>
                <Form.Group controlId="cardNumber" style={{ marginTop: '10px' }}>
                  <Form.Label>
                    <strong>Nomor Kartu</strong>
                  </Form.Label>
                  <Form.Control type="text" placeholder="**** **** **** ****" required />
                </Form.Group>
                <Row>
                  <Col style={{ marginTop: '10px' }}>
                    <Form.Group controlId="expiryDate">
                      <Form.Label>
                        <strong>Tanggal Expired</strong>
                      </Form.Label>
                      <Form.Control type="date" placeholder="MM/YY" required />
                    </Form.Group>
                  </Col>
                  <Col style={{ marginTop: '10px' }}>
                    <Form.Group controlId="cvv">
                      <Form.Label>
                        <strong>CVV/CVC</strong>
                      </Form.Label>
                      <Form.Control type="text" placeholder="CVV" required />
                    </Form.Group>
                  </Col>
                </Row>
                <Card.Footer style={{ marginTop: '10px' }}>
                  <div className="payment-summary">
                    <p>
                      <strong>Total Produk ({cartItems.length}):</strong> IDR {parseFloat(totalPrice).toLocaleString('id-ID')}
                    </p>
                    <p>
                      <strong>Biaya Pengiriman:</strong> IDR {selectedShippingService ? parseFloat(selectedShippingService.price).toLocaleString('id-ID') : 0}
                    </p>
                    <hr />
                    <p>
                      <strong>Total:</strong> IDR {parseFloat(grandTotal).toLocaleString('id-ID')}
                    </p>
                  </div>
                </Card.Footer>
                <Button variant="primary" type="submit">
                  Bayar Sekarang
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
