import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import logo from '../../assets/img/logo_bgremove.png';
import LoginImg from '../../assets/img/image1.jpeg';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import React, { useState } from 'react';

const signup = () => {
  const navigate = useNavigate();
  const [email_pelanggan, setEmail] = useState('');
  const [password_pelanggan, setPassword] = useState('');
  const [gender, setGender] = useState('');
  const [tanggal_lahir, setTanggalLahir] = useState('');
  const [nama_pelanggan, setNama] = useState('');
  const [foto_pelanggan, setFoto] = useState('');
  const [alamat_pelanggan, setAlamat] = useState(''); // Tambahkan state untuk alamat
  const [agree, setAgree] = useState(false);

  const handleEmailChange = (event) => setEmail(event.target.value);
  const handlePasswordChange = (event) => setPassword(event.target.value);
  const handleGenderChange = (event) => setGender(event.target.value);
  const handleTanggalLahirChange = (event) => setTanggalLahir(event.target.value);
  const handleNamaChange = (event) => setNama(event.target.value);
  const handleAlamatChange = (event) => setAlamat(event.target.value); // Tambahkan handler untuk alamat
  const handleAgreeChange = (event) => setAgree(event.target.checked);

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log('Form submitted');
    if (!agree) {
      alert('Anda harus menyetujui Syarat & Kebijakan untuk melanjutkan.');
      return;
    }

    const userData = { email_pelanggan, password_pelanggan, gender, tanggal_lahir, nama_pelanggan, foto_pelanggan, alamat_pelanggan };

    try {
      const response = await fetch('http://localhost:8081/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();
      if (response.ok) {
        alert('Pendaftaran berhasil!');
        navigate('/login');
      } else {
        throw new Error(data.message || 'Gagal mendaftar');
      }
    } catch (error) {
      alert(`Error: ${error.message}`);
    }
  };
  return (
    <div className="signup">
      <Container>
        <Row>
          <Col md={6}>
            <div>
              <Link to="/">
                <img src={logo} alt="" style={{ maxWidth: '300px', paddingBottom: '200px' }} />
              </Link>
            </div>
            <h1 style={{ textAlign: 'center' }}>Selamat datang di Artverse</h1>
            <p style={{ textAlign: 'center' }}>Temukan lukisan terbaik kamu disini</p>
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
            <Form onSubmit={handleSubmit} style={{ marginTop: '20px' }}>
              <Form.Group controlId="formBasicNama">
                <Form.Label>
                  Nama <span style={{ color: 'red' }}>*</span>
                </Form.Label>
                <Form.Control type="text" placeholder="Tuliskan nama kamu" value={nama_pelanggan} onChange={handleNamaChange} />
              </Form.Group>

              <Form.Group controlId="formBasicEmail" style={{ marginTop: '20px' }}>
                <Form.Label>
                  Email <span style={{ color: 'red' }}>*</span>
                </Form.Label>
                <Form.Control type="email" placeholder="Isi alamat email" value={email_pelanggan} onChange={handleEmailChange} />
              </Form.Group>

              <Form.Group controlId="formBasicPassword" style={{ marginTop: '20px' }}>
                <Form.Label>
                  Password <span style={{ color: 'red' }}>*</span>
                </Form.Label>
                <Form.Control type="password" placeholder="Buat kata sandi" value={password_pelanggan} onChange={handlePasswordChange} />
              </Form.Group>

              <Form.Group controlId="formBasicGender" style={{ marginTop: '20px' }}>
                <Form.Label>
                  Gender <span style={{ color: 'red' }}>*</span>
                </Form.Label>
                <div>
                  <Form.Check type="radio" label="Laki-laki" value="L" name="gender" checked={gender === 'L'} onChange={handleGenderChange} style={{ marginRight: '10px' }} />
                  <Form.Check type="radio" label="Perempuan" value="P" name="gender" checked={gender === 'P'} onChange={handleGenderChange} />
                </div>
              </Form.Group>

              <Form.Group controlId="formBasicTanggalLahir" style={{ marginTop: '20px' }}>
                <Form.Label>
                  Tanggal Lahir <span style={{ color: 'red' }}>*</span>
                </Form.Label>
                <Form.Control type="date" placeholder="Tanggal lahir" value={tanggal_lahir} onChange={handleTanggalLahirChange} />
              </Form.Group>

              <Form.Group controlId="formBasicAlamat" style={{ marginTop: '20px' }}>
                <Form.Label>
                  Alamat <span style={{ color: 'red' }}>*</span>
                </Form.Label>
                <Form.Control type="text" placeholder="Tuliskan alamat kamu" value={alamat_pelanggan} onChange={handleAlamatChange} />
              </Form.Group>

              <Form.Group controlId="formBasicCheckbox" style={{ marginTop: '10px' }}>
                <Form.Check type="checkbox" label="Saya menyetujui semua Syarat & Kebijakan Artverse" checked={agree} onChange={handleAgreeChange} />
              </Form.Group>

              <Button variant="dark" type="submit" style={{ width: '100%', marginTop: '20px' }}>
                Daftar
              </Button>

              <Form.Text className="text-muted" style={{ display: 'block', marginTop: '20px', textAlign: 'center' }}>
                Sudah punya akun? <Link to="/login">Login disini</Link>
              </Form.Text>
            </Form>
          </Col>
          <Col md={6}>
            <img src={LoginImg} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', marginLeft: '30px' }} />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default signup;
