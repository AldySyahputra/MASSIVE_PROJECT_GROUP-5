import { Container, Row, Col, Button } from 'react-bootstrap';
import SenimanHeader from '../assets/img/seniman-header.jpg';
import { SenimanAll } from '../data/index';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const Seniman = () => {
  const [filter, setFilter] = useState('Semua');

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
  };

  const filteredSeniman = SenimanAll.filter((pelukis) => {
    if (filter === 'Populer') {
      return pelukis.populer;
    } else if (filter === 'Terbaru') {
      return pelukis.terbaru;
    } else if (filter === 'Kamu Mungkin Suka') {
      return pelukis.rekomendasi;
    }
    return true; // Untuk 'Semua' atau filter default
  });
  return (
    <div className="seniman">
      <div className="seniman-header">
        <Container>
          <Row>
            <Col>
              <img src={SenimanHeader} alt="Seniman Header" className="img-fluid w-100" />
            </Col>
          </Row>
        </Container>
      </div>
      <div className="btn-seniman">
        <Container>
          <Row>
            <Col>
              <Button variant={filter === 'Semua' ? 'secondary' : 'light'} onClick={() => handleFilterChange('Semua')}>
                Semua
              </Button>
              <Button variant={filter === 'Populer' ? 'secondary' : 'light'} onClick={() => handleFilterChange('Populer')}>
                Populer
              </Button>
              <Button variant={filter === 'Terbaru' ? 'secondary' : 'light'} onClick={() => handleFilterChange('Terbaru')}>
                Terbaru
              </Button>
              <Button variant={filter === 'Kamu Mungkin Suka' ? 'secondary' : 'light'} onClick={() => handleFilterChange('Kamu Mungkin Suka')}>
                Kamu Mungkin Suka
              </Button>
            </Col>
          </Row>
        </Container>
      </div>
      <div className="list-pelukis w-100 min-vh-100">
        <Container>
          <Row className="pelukis-card mb-3">
            {filteredSeniman.map((pelukis) => {
              return (
                <Col className="mb-3" key={pelukis.id}>
                  <Link to={`/detail-pelukis/${pelukis.id}`} style={{ textDecoration: 'none' }}>
                    <img src={pelukis.image} alt="" />
                    <h5 style={{ fontWeight: 'bold', color: 'black' }}>{pelukis.nama}</h5>
                    <div className="info">
                      <span className="me-3" style={{ color: 'black' }}>
                        {pelukis.lukisan}
                      </span>
                      <span className="me-3" style={{ color: 'black' }}>
                        {pelukis.bagikan}
                      </span>
                    </div>
                  </Link>
                </Col>
              );
            })}
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default Seniman;
