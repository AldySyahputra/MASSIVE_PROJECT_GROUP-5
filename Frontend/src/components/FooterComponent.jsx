import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Box from '../assets/img/kardus.png';
import Ori from '../assets/img/original.png';
import Trusted from '../assets/img/trusted.png';
import Subscibe from '../assets/img/subscibe.png';
import logo from '../assets/img/logo_bgremove.png';
import Painting from '../assets/img/painting.png';
import LogoSupport from '../assets/img/Logo_DJKI_Kemenkumham.png';
import Visa from '../assets/img/Visa_Inc._logo.svg.png';
import Mastercard from '../assets/img/Mastercard-logo.svg.png';
import Paypal from '../assets/img/PayPal-Logo.png';
import BCA from '../assets/img/bca_logo.png';
import BRI from '../assets/img/bri2020.png';
import BNI from '../assets/img/BNI_logo.svg.png';

import { FaPhone, FaFacebook } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { AiFillInstagram } from 'react-icons/ai';

import { IoIosMail } from 'react-icons/io';

const FooterComponent = () => {
  return (
    <div className="footer-container" style={{ marginTop: '30px' }}>
      <Container>
        <Row className="align-items-center" style={{ paddingBottom: '30px' }}>
          <Col className="d-flex align-items-center">
            <img src={Box} alt="box-footer" className="footer-image" style={{ width: '70px', height: '70px' }} />
            <div className="footer-text">
              <h3 className="footer-title" style={{ fontSize: '20px' }}>
                Pengiriman Aman
              </h3>
              <p className="footer-description" style={{ fontSize: '15px', marginTop: '10px' }}>
                Kami mengirimkan paket dengan kurir pribadi kami dengan keamanan yang aman
              </p>
            </div>
          </Col>
          <div className="vertical-line"></div>
          <Col className="d-flex align-items-center">
            <img src={Ori} alt="original-footer" className="footer-image" style={{ width: '70px', height: '70px' }} />
            <div className="footer-text">
              <h3 className="footer-title" style={{ fontSize: '20px' }}>
                100% Original
              </h3>
              <p className="footer-description" style={{ fontSize: '15px', marginTop: '10px' }}>
                Semua lukisan yang ada di sini telah lolos pemeriksaan keasliannya oleh pihak terkait yang terpercaya
              </p>
            </div>
          </Col>
          <div className="vertical-line"></div>
          <Col className="d-flex align-items-center">
            <img src={Trusted} alt="trusted-footer" className="footer-image" style={{ width: '70px', height: '70px' }} />
            <div className="footer-text">
              <h3 className="footer-title" style={{ fontSize: '20px' }}>
                Seniman Terpercaya
              </h3>
              <p className="footer-description" style={{ fontSize: '15px', marginTop: '10px' }}>
                Kami telah memeriksa validitas Artis untuk menghindari pemalsuan
              </p>
            </div>
          </Col>
        </Row>
      </Container>
      <div className="subscribe w-20 min-vh-20" style={{ backgroundImage: `url(${Subscibe})`, backgroundSize: 'cover', backgroundPosition: 'center', textAlign: 'center' }}>
        <Row style={{ paddingBottom: '150px', paddingTop: '100' }}>
          <Col>
            <h3 style={{ paddingTop: '150px', fontWeight: 'bold' }}>Berlangganan untuk Newsletter kami</h3>
            <p>Jadilah orang pertama yang mengetahui penawaran khusus, berita, dan pembaruan kami</p>
            <div className="search-container" style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
              <input type="text" placeholder="@ Masukkan email" className="search-input" />
              <button className="search-button">Langganan</button>
            </div>
          </Col>
        </Row>
      </div>
      <div className="kontak">
        <Row>
          <Col className="mx-2">
            <img src={logo} alt="logo-footer" style={{ width: '150px', height: '50px', marginTop: '-50px' }} />
            <img src={Painting} alt="" style={{ width: '150px', height: '50px', marginTop: '5px' }} />
          </Col>
          <Col className="mx-2">
            <h4 style={{ fontWeight: 'bold', fontSize: '20px', marginTop: '-35px' }}>Hubungi Kami</h4>
            <div className="contact-info">
              <p>
                <FaPhone size="1.25em" /> +621500702
              </p>
              <p>
                <IoIosMail size="1.25em" /> dpo.id@artverse.com
              </p>
            </div>
          </Col>
          <Col className="mx-2" style={{ textAlign: 'center' }}>
            <h4 style={{ fontWeight: 'bold', fontSize: '20px', marginTop: '-35px', marginLeft: '-50px' }}>Sosial Media</h4>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginLeft: '-50px' }}>
              <FaXTwitter size="1.25em" />
              <FaFacebook size="1.25em" />
              <AiFillInstagram size="1.25em" />
            </div>
          </Col>
          <Col className="mx-2" style={{ textAlign: 'center' }}>
            <h4 style={{ fontWeight: 'bold', fontSize: '20px', marginTop: '-35px', marginLeft: '-50px' }}>Disupport Oleh</h4>
            <img src={LogoSupport} alt="Logo DJKI Kemenkumham" style={{ maxWidth: '70%', height: 'auto', marginLeft: '10px' }} />
          </Col>
          <Col className="mx-2" style={{ textAlign: 'center' }}>
            <h4 style={{ fontWeight: 'bold', fontSize: '20px', marginTop: '-35px', marginLeft: '-35px' }}>Metode Pembayaran</h4>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', flexWrap: 'wrap' }}>
              <img src={Visa} alt="Visa" style={{ maxWidth: '50px', height: 'auto', marginLeft: '-20px' }} />
              <img src={Mastercard} alt="Mastercard" style={{ maxWidth: '50px', height: 'auto' }} />
              <img src={Paypal} alt="Paypal" style={{ maxWidth: '50px', height: 'auto' }} />
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', flexWrap: 'wrap' }}>
              <img src={BCA} alt="BCA" style={{ maxWidth: '50px', height: 'auto', marginLeft: '-20px', marginTop: '10px' }} />
              <img src={BRI} alt="BRI" style={{ maxWidth: '50px', height: '20px', marginTop: '20px' }} />
              <img src={BNI} alt="BNI" style={{ maxWidth: '50px', height: '20px', marginTop: '20px' }} />
            </div>
          </Col>
        </Row>
      </div>
      <div style={{ textAlign: 'center', padding: '20px 0' }}>
        <p>©2024 Artverse. Icons by Icons8, Images by Unsplash & Freepik, Animations by LottieFiles</p>
      </div>
    </div>
  );
};

export default FooterComponent;
