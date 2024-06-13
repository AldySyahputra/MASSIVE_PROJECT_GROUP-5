import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { SenimanAll } from '../../data/index';
import '../../dist/css/DetailPelukis.css';

const DetailPelukis = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const pelukis = SenimanAll.find((p) => p.id.toString() === id); // Pastikan ID adalah string jika perlu

  const handleBackClick = () => {
    navigate('/seniman');
  };

  return (
    <div className="detail-pelukis-container" style={{ marginTop: '60px' }}>
      <div className="back-icon" onClick={handleBackClick}>
        <i className="fas fa-arrow-left"></i> Kembali ke Seniman
      </div>
      {pelukis ? (
        <div className="pelukis-detail">
          <img src={pelukis.image} alt={pelukis.nama} className="pelukis-image" />
          <div className="pelukis-info">
            <h2>
              <strong>{pelukis.nama}</strong>
            </h2>
            <div className="pelukis-bio">
              <h3>
                <strong>Tentang Artist</strong>
              </h3>
              <p className="pelukis-description">{pelukis.deskripsi}</p>
            </div>
            <div className="social-media">
              <h3>
                <strong>Sosial Media</strong>
              </h3>
              <div className="social-icons">
                <a href={pelukis.instagram} target="_blank" rel="noopener noreferrer">
                  <i className="fab fa-instagram"></i>
                </a>
                <a href={pelukis.twitter} target="_blank" rel="noopener noreferrer">
                  <i className="fab fa-twitter"></i>
                </a>
                <a href={pelukis.facebook} target="_blank" rel="noopener noreferrer">
                  <i className="fab fa-facebook"></i>
                </a>
                <a href={`mailto:${pelukis.email}`} target="_blank" rel="noopener noreferrer">
                  <i className="fab fa-envelope"></i>
                </a>
              </div>
            </div>
            <div className="video-perkenalan" style={{ marginLeft: '-400px' }}>
              <h3>
                <strong>Video Perkenalan</strong>
              </h3>
              <p className="des">Lihat apa yang ingin seniman katakan</p>
              <div className="video-container">
                <iframe width="560" height="315" src={pelukis.videoUrl} title="Video Perkenalan" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <p>Pelukis tidak ditemukan</p>
      )}
    </div>
  );
};

export default DetailPelukis;
