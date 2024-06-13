import { Container, Row, Col } from 'react-bootstrap';
import Spotlight from '../assets/img/spotlight.png';
import Trending from '../assets/img/trending.png';
import SpotlightImg from '../assets/img/apropriasi.jpg';
import TrendingImg1 from '../assets/img/aigenerated.png';
import TrendingImg2 from '../assets/img/tahun.jpg';
import TrendingImg3 from '../assets/img/pameran.jpg';
import TrendingImg4 from '../assets/img/kaws_blog.png';
import { FaEye, FaShareAlt } from 'react-icons/fa';
import { ArtikelTerbaru } from '../data/index';
import { ArtikelJelajah } from '../data/index';

const Artikel = () => {
  const trendingArticles = [
    {
      img: TrendingImg1,
      title: 'Kontroversi Seni oleh AI: Masa Depan Kreativitas atau Pengganti Bakat Manusia?',
      author: 'Velove Ruth Shakira',
      views: 8932,
      shares: 4970,
      time: '2 minggu yang lalu',
      readTime: '3 menit baca',
    },
    {
      img: TrendingImg2,
      title: 'Dunia Seni pada 2024: Pameran, Tren dan Pameran Besar',
      author: 'Kevin Lim',
      views: 4269,
      shares: 2857,
      time: '10 hari yang lalu',
      readTime: '4 menit baca',
    },
    {
      img: TrendingImg3,
      title: 'Pameran Van Gogh: Merayakan Ulang Tahun ke-170 Kelahiran Sang Seniman',
      author: 'Kavanya Andini Leonardo',
      views: 4250,
      shares: 2840,
      time: '8 hari yang lalu',
      readTime: '2 menit baca',
    },
    {
      img: TrendingImg4,
      title: 'KAWS: Dari Seniman Jalanan Menjadi Fenomena Pop Art',
      author: 'Hanan Hartigan',
      views: 3082,
      shares: 1879,
      time: '5 hari yang lalu',
      readTime: '6 menit baca',
    },
  ];

  return (
    <div className="artikel">
      <Container>
        <Row>
          <Col md={6}>
            <h3 className="spotlight">
              <img src={Spotlight} alt="" style={{ width: '40px', height: '40px', marginRight: '15px', marginTop: '-10px' }} />
              <strong>Spotlight</strong>
            </h3>
            <div className="artikel-spotlight mt-5">
              <img src={SpotlightImg} alt="" />
              <h2>Apropriasi! Ketika Seni (sangat erat) Menginspirasi Seni Lainnya</h2>
              <p>
                Seni apropriasi telah ada selama berabad-abad, meskipun kebangkitan konsumerisme menyebabkan munculnya signifikansi dan prevalensi baru. Bergabunglah bersama kami dalam menjelajahi beberapa karya seni apropriasi paling
                ikonik dalam sejarah seni kontemporer.
              </p>
              <div className="artikel-stats mt-3">
                <span style={{ color: 'grey' }}>
                  <FaEye /> 20862 Dilihat
                </span>
                <span style={{ marginLeft: '15px', color: 'grey' }}>
                  <FaShareAlt /> 5899 Dibagikan
                </span>
              </div>
            </div>
          </Col>
          <Col md={6}>
            <h3 className="trending">
              <img src={Trending} alt="" style={{ width: '40px', height: '40px', marginRight: '15px' }} />
              <strong>Trending</strong>
            </h3>
            <div className="artikel-trending mt-5">
              {trendingArticles.map((article, index) => (
                <div key={index} className="trending-article mb-4">
                  <img src={article.img} alt="" className="trending-img" />
                  <div className="trending-info">
                    <p className="trending-time">
                      {article.time} • {article.readTime}
                    </p>
                    <h2 className="trending-title">{article.title}</h2>
                    <p className="trending-author">oleh {article.author}</p>
                    <div className="trending-stats">
                      <span>
                        <FaEye /> {article.views} Dilihat
                      </span>
                      <span style={{ marginLeft: '15px' }}>
                        <FaShareAlt /> {article.shares} Dibagikan
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Col>
        </Row>
      </Container>

      <div className="artikel-terbaru">
        <Container>
          <Row>
            <Col>
              <h3>
                <strong>
                  Artikel <span style={{ color: 'var(--primary)' }}>Terbaru</span>
                </strong>
              </h3>
            </Col>
          </Row>
          <Row className="artikel-terbaru">
            {ArtikelTerbaru.map((terbaru) => {
              return (
                <Col key={terbaru.id} className="artikel-terbaru-item">
                  <img src={terbaru.image} alt="" className="artikel-terbaru-img" />
                  <h5 className="artikel-terbaru-title">{terbaru.title}</h5>
                  <div className="artikel-terbaru-meta">
                    <span>{terbaru.post}</span>
                    <span>{terbaru.time}</span>
                  </div>
                  <div className="artikel-terbaru-author">
                    <img src={terbaru.authorImg} alt="" className="artikel-terbaru-author-img" />
                    <span>{terbaru.author}</span>
                  </div>
                </Col>
              );
            })}
          </Row>
        </Container>
      </div>
      <div className="jelajahi w-100 min-vh-100">
        <Container>
          <Row>
            <Col>
              <h3>
                <strong>
                  Jelajahi <span style={{ color: 'var(--primary)' }}>Lebih Banyak</span>
                </strong>
              </h3>
            </Col>
          </Row>
          <Row className="list-jelajah">
            {ArtikelJelajah.map((jelajah) => {
              return (
                <Col key={jelajah.id} className="artikel-card">
                  <img src={jelajah.image} alt={jelajah.title} className="artikel-image" />
                  <h5 className="artikel-title">{jelajah.title}</h5>
                  <div className="artikel-stats">
                    <span className="artikel-views">{jelajah.view}</span>
                    <span className="artikel-shares">{jelajah.bagikan}</span>
                  </div>
                  <div className="artikel-author-info">
                    <img src={jelajah.authorImg} alt={jelajah.author} className="author-image" style={{ borderRadius: '50%', width: '30px', height: '30px' }} />
                    <div>
                      <span className="artikel-time">{jelajah.time}</span>
                      <span className="artikel-author">{jelajah.author}</span>
                    </div>
                  </div>
                </Col>
              );
            })}
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default Artikel;
