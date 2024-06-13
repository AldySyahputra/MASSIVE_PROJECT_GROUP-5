import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Ganti useHistory dengan useNavigate
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import koleksiImage from '../assets/img/koleksipage.png';
import { faHeart as faHeartRegular, faHeart as faHeartSolid } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useWishlist } from '../../contexts/WishlistContext';

const Koleksi = () => {
  const [paintings, setPaintings] = useState([]);
  const [filteredPaintings, setFilteredPaintings] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedMedia, setSelectedMedia] = useState([]);
  const [activeHearts, setActiveHearts] = useState([]);
  const [activeButton, setActiveButton] = useState('Semua');
  const { addToWishlist, removeFromWishlist } = useWishlist();
  const [userId, setUserId] = useState(1);
  const navigate = useNavigate(); // Gunakan useNavigate untuk navigasi

  useEffect(() => {
    fetch('http://localhost:3000/paintings')
      .then((response) => response.json())
      .then((data) => {
        setPaintings(data);
        setFilteredPaintings(data);
        setActiveHearts(new Array(data.length).fill(false));
      })
      .catch((error) => console.error('Error fetching data:', error));
  }, [userId]);

  const handleCardClick = (id) => {
    navigate(`/detail-koleksi/${id}`); // Navigasi ke halaman detail
  };

  const handleCategoryChange = (event) => {
    const { name, checked } = event.target;
    setSelectedCategories((prev) => (checked ? [...prev, name] : prev.filter((category) => category !== name)));
  };

  const handleHeartClick = (index) => {
    const newActiveHearts = [...activeHearts];
    const painting = filteredByCategoryAndMedia[index];
    newActiveHearts[index] = !newActiveHearts[index];
    setActiveHearts(newActiveHearts);

    if (newActiveHearts[index]) {
      addToWishlist(painting);
      fetch('http://localhost:3000/wishlist/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id_pelanggan: userId, painting_id: painting.id }),
      });
    } else {
      removeFromWishlist(painting.id);
      fetch('http://localhost:3000/wishlist/remove', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id_pelanggan: userId, painting_id: painting.id }),
      });
    }
  };

  const handleMediaChange = (event) => {
    const { name, checked } = event.target;
    setSelectedMedia((prev) => (checked ? [...prev, name] : prev.filter((media) => media !== name)));
  };

  const handleButtonClick = (buttonName) => {
    setActiveButton(buttonName);
    let filtered = paintings;

    if (buttonName === 'Rekomendasi') {
      filtered = paintings.filter((painting) => painting.isRecommended);
    } else if (buttonName === 'Terbaru') {
      filtered = paintings.sort((a, b) => new Date(b.date) - new Date(a.date));
    }

    setFilteredPaintings(filtered);
  };

  const filteredByCategoryAndMedia = filteredPaintings.filter((painting) => {
    const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(painting.category);
    const matchesMedia = selectedMedia.length === 0 || selectedMedia.includes(painting.media);
    return matchesCategory && matchesMedia;
  });

  return (
    <div className="koleksi-page">
      <Container>
        <Row>
          <Col>
            <img src={koleksiImage} alt="Koleksi Lukisan" className="img-fluid w-100" />
          </Col>
        </Row>
        <Row>
          <Col md={2}>
            <div className="filters">
              <h5>Filters</h5>
              <div className="filter-category">
                <h6>Kategori</h6>
                <div>
                  <input type="checkbox" id="abstract" name="Abstract" onChange={handleCategoryChange} />
                  <label className="kategori" htmlFor="abstract">
                    Abstract
                  </label>
                </div>
                <div>
                  <input type="checkbox" id="realism" name="Realism" onChange={handleCategoryChange} />
                  <label className="kategori" htmlFor="realism">
                    Realism
                  </label>
                </div>
                <div>
                  <input type="checkbox" id="cubism" name="Cubism" onChange={handleCategoryChange} />
                  <label className="kategori" htmlFor="cubism">
                    Cubism
                  </label>
                </div>
                <div>
                  <input type="checkbox" id="futurism" name="Futurism" onChange={handleCategoryChange} />
                  <label className="kategori" htmlFor="futurism">
                    Futurism
                  </label>
                </div>
                <div>
                  <input type="checkbox" id="pop-art" name="Pop Art" onChange={handleCategoryChange} />
                  <label className="kategori" htmlFor="pop-art">
                    Pop Art
                  </label>
                </div>
                <div>
                  <input type="checkbox" id="surrealism" name="Surrealism" onChange={handleCategoryChange} />
                  <label className="kategori" htmlFor="surrealism">
                    Surrealism
                  </label>
                </div>
                <div>
                  <input type="checkbox" id="photorealism" name="Photorealism" onChange={handleCategoryChange} />
                  <label className="kategori" htmlFor="photorealism">
                    Photorealism
                  </label>
                </div>
                <div>
                  <input type="checkbox" id="impressionism" name="Impressionism" onChange={handleCategoryChange} />
                  <label className="kategori" htmlFor="impressionism">
                    Impressionism
                  </label>
                </div>
                <div>
                  <input type="checkbox" id="expressionism" name="Expressionism" onChange={handleCategoryChange} />
                  <label className="kategori" htmlFor="expressionism">
                    Expressionism
                  </label>
                </div>
              </div>
              <h6 className="media">Media</h6>
              <div>
                <input type="checkbox" id="mixed-media" name="Mixed Media" onChange={handleMediaChange} />
                <label className="kategori" htmlFor="mixed-media">
                  Mixed Media
                </label>
              </div>
              <div>
                <input type="checkbox" id="acrylic-paint" name="Acrylic Paint" onChange={handleMediaChange} />
                <label className="kategori" htmlFor="acrylic-paint">
                  Acrylic Paint
                </label>
              </div>
              <div>
                <input type="checkbox" id="oil-paint" name="Oil Paint" onChange={handleMediaChange} />
                <label className="kategori" htmlFor="oil-paint">
                  Oil Paint
                </label>
              </div>
              <div>
                <input type="checkbox" id="watercolor" name="Watercolor" onChange={handleMediaChange} />
                <label className="kategori" htmlFor="watercolor">
                  Watercolor
                </label>
              </div>
              <div>
                <input type="checkbox" id="digital" name="Digital" onChange={handleMediaChange} />
                <label className="kategori" htmlFor="digital">
                  Digital
                </label>
              </div>
            </div>
          </Col>
          <Col md={10}>
            <div className="button-group">
              <Button variant={activeButton === 'Semua' ? 'secondary' : 'light'} onClick={() => handleButtonClick('Semua')} className="me-2">
                Semua
              </Button>
              <Button variant={activeButton === 'Rekomendasi' ? 'secondary' : 'light'} onClick={() => handleButtonClick('Rekomendasi')} className="me-2">
                Rekomendasi
              </Button>
              <Button variant={activeButton === 'Terbaru' ? 'secondary' : 'light'} onClick={() => handleButtonClick('Terbaru')}>
                Terbaru
              </Button>
            </div>
            <Row>
              {filteredByCategoryAndMedia.map((painting, index) => (
                <Col md={3} key={painting.id} className="mb-4">
                  <Card className="custom-card" onClick={() => handleCardClick(painting.id)}>
                    <Card.Img variant="top" src={painting.image} />
                    <Card.Body>
                      <Card.Title>{painting.title}</Card.Title>
                      <Card.Text>
                        <small className="text-muted">{painting.year}</small>
                        <br />
                        <span>oleh {painting.artist}</span>
                      </Card.Text>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <strong>IDR. {painting.price.toLocaleString('id-ID')}</strong>
                        <Button
                          variant="link"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleHeartClick(index);
                          }}
                          style={{ padding: 0, border: 'none', background: 'none' }}
                        >
                          <FontAwesomeIcon icon={activeHearts[index] ? faHeartSolid : faHeartRegular} color={activeHearts[index] ? 'red' : 'black'} />
                        </Button>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Koleksi;
