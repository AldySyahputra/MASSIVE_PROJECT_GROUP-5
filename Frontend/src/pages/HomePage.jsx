import React, { useState } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';

import Masterpieces from '../assets/img/Masterpieces.png';
import HeroImg from '../assets/img/hero-img.png';
import Share from '../assets/img/Share.png';
import Kuas from '../assets/img/kuas.png';
import Hendi from '../assets/img/Hendi.png';
import Anton from '../assets/img/Anton.png';
import Dara from '../assets/img/Dara.png';
import Seniman1 from '../assets/img/11.jpg';
import Seniman2 from '../assets/img/35.jpg';
import Seniman3 from '../assets/img/36.jpg';
import { Seniman, UntukKamu, Artikel } from '../data/index';

const HomePage = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const topSeniman = [
    {
      id: 1,
      name: 'Hendi',
      lastName: 'Danukusumo',
      paintings: 380,
      shares: 20834,
      sold: 373,
      image: Hendi,
    },
    {
      id: 2,
      name: 'Anton',
      lastName: 'Lukman Atmadja',
      paintings: 301,
      shares: 19808,
      sold: 287,
      image: Anton,
    },
    {
      id: 3,
      name: 'Dara',
      lastName: 'Amira Soedarsono',
      paintings: 260,
      shares: 17890,
      sold: 233,
      image: Dara,
    },
  ];

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const currentSeniman = topSeniman.find((seniman) => seniman.id === currentPage);

  return (
    <div className="homepage">
      <header className="w-100 min-vh-100 d-flex align-items-center">
        <Container>
          <Row className="header-box d-flex align-items-center">
            <Col lg="6" className="text-center">
              <h1>
                <img src={Masterpieces} alt="greating-image" style={{ width: '100%', height: 'auto', marginTop: '50px' }} />
              </h1>
              <p>
                <span>Temukan banyak </span>
                <span style={{ color: 'red', fontWeight: 'bold' }}>lukisan menarik </span>
                <span>di koleksi kami</span>
              </p>
              <p>
                <span>dapatkan </span>
                <span style={{ color: 'purple', fontWeight: 'bold' }}>lukisan kredibel </span>
                <span>dengan </span>
                <span style={{ color: 'blue', fontWeight: 'bold' }}>cara yang mudah</span>
              </p>
              <p>
                <span style={{ fontWeight: 'bold', color: 'black' }}>Gabung bersama </span>
                <span style={{ fontWeight: 'bold', color: 'red' }}>50.000+ pelanggan</span>
              </p>
              <button className="btn btn-dark" style={{ borderRadius: '20px', padding: '10px 20px', fontWeight: 'bold', marginLeft: '80px' }} onClick={() => document.getElementById('untuk-kamu').scrollIntoView({ behavior: 'smooth' })}>
                Pelajari lebih lanjut <span style={{ marginLeft: '10px' }}></span>
              </button>
            </Col>
            <Col lg="6" className="pt-lg-0 pt-5">
              <img src={HeroImg} alt="hero-image" style={{ width: '80%', height: 'auto' }} />
            </Col>
          </Row>
        </Container>
      </header>
      <div className="koleksi w-20 min-vh-20">
        <Container>
          <Row>
            <Col>
              <h1 className="text-center fw-bold">Lukisan Pilihan Terbaik</h1>
              <p className="text-center fw-bold">Jelajahi koleksi kami untuk menemukan lukisan favorit kamu!</p>
            </Col>
          </Row>
          <Row className="d-flex justify-content-center">
            <Col className="d-flex justify-content-center">
              <Button className="btn-purple mx-2">Semua</Button>
              <Button variant="secondary" className="mx-2">
                Rekomendasi
              </Button>
              <Button variant="secondary" className="mx-2">
                Terbaru
              </Button>
            </Col>
          </Row>
        </Container>
      </div>
      <div className="untuk-kamu w-100 min-vh-100" id="untuk-kamu">
        <Container>
          <Row className="d-flex justify-content-between align-items-center">
            <Col>
              <h1 className="fw-bold" style={{ fontSize: '30px' }}>
                Lukisan untuk kamu!
              </h1>
            </Col>
            <Col className="text-end">
              <a href="/koleksi" className="text-muted">
                Lihat Semua &gt;
              </a>
            </Col>
          </Row>
          <Row className="cardlukisan mb-3">
            {UntukKamu.map((rekomendasi) => {
              return (
                <Col key={rekomendasi.id}>
                  <img src={rekomendasi.image} alt="unsplash.com" className="w-100 mb-5 rounded-all" />
                  <div className="deskripsi mb-5 text-center d-flex flex-column align-items-center">
                    <h5 className="mb-3" style={{ fontWeight: 'bold' }}>
                      {rekomendasi.title}
                    </h5>
                    <span style={{ fontWeight: 'bold', color: '#979797' }}>{rekomendasi.author}</span>
                    <p style={{ fontWeight: 'bold' }}>{rekomendasi.price}</p>
                    <button className="btn btn-primary-custom rounded-1">{rekomendasi.buy}</button>
                  </div>
                </Col>
              );
            })}
          </Row>
        </Container>
      </div>
      <div className="teratas w-20 min-vh-20">
        <Container>
          <Row>
            <Col className="center-left">
              <h1 style={{ fontWeight: 'bold' }}>
                Top <span style={{ color: 'gray' }}>3</span> <br></br>Seniman
              </h1>
              <h2 style={{ color: 'brown' }}>Paling Populer!</h2>
              <p style={{ color: 'gray' }}>Lukisannya telah banyak terjual & telah di share oleh banyak pecinta seni</p>
              <ul className="pagination" style={{ fontSize: '40px' }}>
                {[1, 2, 3].map((page) => (
                  <li key={page} className={currentPage === page ? 'active' : ''} onClick={() => handlePageChange(page)} style={{ cursor: 'pointer' }}>
                    {page}
                  </li>
                ))}
              </ul>
            </Col>
            <Col className="center-right">
              <button className="btn-kunjungi" style={{ backgroundColor: '#FFD700', border: 'none', padding: '10px 20px', borderRadius: '5px', fontWeight: 'bold' }}>
                Kunjungi Profil {currentSeniman.name}
                <span className="icon" style={{ marginLeft: '10px' }}>
                  &rarr;
                </span>
              </button>
              <div className="profile-info mt-3 p-3 d-flex" style={{ border: '1px solid #ddd', borderRadius: '8px', textAlign: 'left', backgroundColor: 'white' }}>
                <div style={{ flex: '1' }}>
                  <h3 style={{ fontWeight: 'bold', color: '#2C3E50' }}>{currentSeniman.name}</h3>
                  <p style={{ color: '#E67E22', fontWeight: 'bold' }}>{currentSeniman.lastName}</p>
                  <div className="d-flex justify-content-start align-items-center mb-2">
                    <span className="me-3">
                      <img src={Kuas} style={{ width: '20px' }} alt="" /> {currentSeniman.paintings} lukisan
                    </span>
                    <span>
                      <img src={Share} style={{ width: '20px' }} alt="" /> {currentSeniman.shares}
                    </span>
                  </div>
                  <button className="btn btn-danger" style={{ borderRadius: '20px' }}>
                    <i className="bi bi-cart"></i> {currentSeniman.sold} terjual
                  </button>
                </div>
                <img src={currentSeniman.image} alt={currentSeniman.name} style={{ width: '150px', height: 'auto', marginLeft: '20px' }} />
              </div>
            </Col>
          </Row>
        </Container>
      </div>
      <div className="seniman w-20 min-vh-20">
        <Container>
          <Row>
            <Col>
              <h1 className="text-center">Seniman</h1>
            </Col>
          </Row>
          <Row className="d-flex justify-content-center">
            <Col className="d-flex justify-content-center">
              <img src={Seniman1} alt="First Artist" className="rounded-circle mx-2" style={{ width: '100px', height: '100px', marginTop: '-400px' }} />
              <img src={Seniman2} alt="Second Artist" className="rounded-circle mx-2" style={{ width: '100px', height: '100px', marginTop: '-400px' }} />
              <img src={Seniman3} alt="Third Artist" className="rounded-circle mx-2" style={{ width: '100px', height: '100px', marginTop: '-400px' }} />
            </Col>
          </Row>
          <Row className="d-flex justify-content-center mt-3">
            <Col className="text-center" style={{ marginTop: '-300px' }}>
              <p style={{ fontWeight: '700px' }}>lebih dari 10k+</p>
              <p style={{ color: '#979797' }}>Temukan beragam seniman berbakat yang dapat kamu jumpai disini!</p>
            </Col>
          </Row>
          <Row className="d-flex justify-content-center mt-3">
            <Col className="d-flex justify-content-center">
              <Button className="btn-purple mx-2">Semua</Button>
              <Button variant="secondary" className="mx-2">
                Populer
              </Button>
              <Button variant="secondary" className="mx-2">
                Terbaru
              </Button>
              <Button variant="secondary" className="mx-2">
                Kamu Mungkin Suka
              </Button>
            </Col>
          </Row>
        </Container>
      </div>
      <div className="seniman-lukisan w-100 min-vh-100">
        <Container>
          <Row className="d-flex justify-content-between align-items-center" style={{ marginTop: '-100px' }}>
            <Col>
              <h1 className="fw-bold" style={{ fontSize: '30px' }}>
                Lukisan untuk kamu!
              </h1>
            </Col>
            <Col className="text-end">
              <a href="/seniman" className="text-muted">
                Lihat Semua &gt;
              </a>
            </Col>
          </Row>
          <Row className="card-seniman mb-3">
            {Seniman.map((list) => {
              return (
                <Col key={list.id} className="text-center">
                  <img src={list.image} alt="unsplash.com" className="w-100 mb-5 rounded-all" />
                  <h5 style={{ fontWeight: 'bold' }}>{list.nama}</h5>
                  <div className="info">
                    <span className="me-3">
                      <img src={Kuas} alt="Kuas" style={{ width: '20px', height: '20px', marginRight: '5px' }} />
                      {list.lukisan}
                    </span>
                    <span>
                      <img src={Share} alt="Share" style={{ width: '20px', height: '20px', marginRight: '5px' }} />
                      {list.bagikan}
                    </span>
                  </div>
                </Col>
              );
            })}
          </Row>
        </Container>
      </div>
      <div className="artikel-home w-20 min-vh-20">
        <Container>
          <Row>
            <Col>
              <h1 className="text-center" style={{ fontSize: '30px' }}>
                Artikel
              </h1>
              <p className="text-center">Artikel-artikel menarik untuk kamu tentang seni untuk kamu baca</p>
            </Col>
          </Row>
        </Container>
      </div>
      <div className="list-artikel w-100 min-vh-100">
        <Container>
          <Row className="d-flex justify-content-between align-items-center">
            <Col>
              <h1 className="fw-bold" style={{ marginTop: '-100px', fontSize: '30px' }}>
                Artikel seru untuk kamu!
              </h1>
            </Col>
            <Col className="text-end" style={{ marginTop: '-150px' }}>
              <a href="/artikel" className="text-muted">
                Lihat Semua &gt;
              </a>
            </Col>
          </Row>
          <Row className="card-artikel mb-3" style={{ marginTop: '-130px' }}>
            {Artikel.map((artikel) => {
              return (
                <Col key={artikel.id}>
                  <img src={artikel.image} alt="unsplash.com" className="w-100 mb-5 rounded-all" />
                  <h5 style={{ fontWeight: 'bold' }}>{artikel.title}</h5>
                  <div className="info mb-3">
                    <span className="me-3">
                      <img src={Kuas} alt="Kuas" style={{ width: '30px', height: '30px', marginRight: '5px' }} />
                      {artikel.view}
                    </span>
                    <span>
                      <img src={Share} alt="Share" style={{ width: '25px', height: '25px', marginRight: '5px' }} />
                      {artikel.bagikan}
                    </span>
                  </div>
                  <div className="info mb-3">
                    <img src={artikel.authorImg} alt="unsplash.com" />
                    <span>{artikel.author}</span>
                    <span>{artikel.waktu}</span>
                  </div>
                  <button className="btn btn-light" style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                    Baca Sekarang <span>&#8599;</span>
                  </button>
                </Col>
              );
            })}
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default HomePage;
