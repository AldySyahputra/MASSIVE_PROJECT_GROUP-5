import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import logo from '../../assets/img/logo_bgremove.png';
import LoginImg from '../../assets/img/image1.jpeg';
import { Link } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [pelanggan, setPelanggan] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPelanggan = async () => {
      try {
        const response = await axios.get('http://localhost:8081/pelanggan');
        setPelanggan(response.data);
      } catch (error) {
        console.error('Error fetching pelanggan data:', error);
      }
    };

    fetchPelanggan();
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    const user = pelanggan.find((pel) => pel.email_pelanggan === email && pel.password_pelanggan === password);
    if (user) {
      setMessage('Login successful');
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('user', JSON.stringify(user)); // Simpan data pengguna di local storage
      navigate('/');
    } else {
      setMessage('Invalid email or password');
    }
  };

  return (
    <div className="login">
      <Container>
        <Row>
          <Col md={6}>
            <div>
              <Link to="/">
                <img src={logo} alt="" style={{ maxWidth: '200px', paddingBottom: '50px' }} />
              </Link>
            </div>
            <h3 style={{ textAlign: 'center' }}>
              Selamat datang di <strong>Artverse</strong>
            </h3>
            <p style={{ textAlign: 'center', color: '#979797' }}>Temukan lukisan terbaik kamu disini</p>
            <div style={{ textAlign: 'center', marginTop: '20px' }}>
              <Button variant="outline-secondary" style={{ borderRadius: '10px', padding: '10px 20px', height: 'auto', width: '400px' }}>
                Login dengan Google
              </Button>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', marginTop: '20px' }}>
              <hr style={{ flex: 1, border: 'none', borderTop: '1px solid #ccc' }} />
              <span style={{ margin: '0 10px', color: '#ccc' }}>atau</span>
              <hr style={{ flex: 1, border: 'none', borderTop: '1px solid #ccc' }} />
            </div>
            <Form onSubmit={handleLogin} style={{ marginTop: '20px' }}>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>
                  Email <span style={{ color: 'red' }}>*</span>
                </Form.Label>
                <Form.Control type="email" placeholder="Isi alamat email" value={email} onChange={(e) => setEmail(e.target.value)} />
              </Form.Group>

              <Form.Group controlId="formBasicPassword" style={{ marginTop: '20px' }}>
                <Form.Label>
                  Password <span style={{ color: 'red' }}>*</span>
                </Form.Label>
                <Form.Control type="password" placeholder="Buat kata sandi" value={password} onChange={(e) => setPassword(e.target.value)} />
              </Form.Group>

              <Form.Text className="text-muted" style={{ display: 'block', marginTop: '10px' }}>
                <a href="#" style={{ textDecoration: 'none' }}>
                  Lupa Password?
                </a>
              </Form.Text>

              <Form.Group controlId="formBasicCheckbox" style={{ marginTop: '10px' }}>
                <Form.Check type="checkbox" label="Ingat Saya" />
              </Form.Group>

              <Button variant="dark" type="submit" style={{ width: '100%', marginTop: '20px' }}>
                Masuk
              </Button>
              {message && <div style={{ color: 'red', marginTop: '20px', textAlign: 'center' }}>{message}</div>}
              <Form.Text className="text-muted" style={{ display: 'block', marginTop: '20px', textAlign: 'center' }}>
                Belum punya akun?{' '}
                <Link to="/signup" style={{ color: 'purple', textDecoration: 'none' }}>
                  Buat Sekarang
                </Link>
              </Form.Text>
            </Form>
          </Col>
          <Col md={6}>
            <img src={LoginImg} alt="" style={{ width: '90%', height: '90%', objectFit: 'cover', marginLeft: '70px' }} />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Login;
