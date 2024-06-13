import { Container, Row, Col, Card } from 'react-bootstrap';
import logo from '../assets/img/logo_bgremove.png';
import tentangimg from '../assets/img/tentang_header.png';
import pemalsuan from '../assets/img/palsu.png';
import kebohongan from '../assets/img/bohong.png';
import Box from '../assets/img/kardus.png';
import Ori from '../assets/img/original.png';
import Trusted from '../assets/img/trusted.png';

const TentangKami = () => {
  return (
    <div className="tentang">
      <Container>
        <Row>
          <Col className="d-flex justify-content-center align-items-center">
            <div style={{ textAlign: 'center' }} className="text-header-tentang">
              <h1 style={{ fontWeight: 'bold' }}>
                Halo{' '}
                <span role="img" aria-label="wave">
                  👋
                </span>
              </h1>
              <p style={{ fontWeight: 'bold' }}>kami adalah</p>
              <img src={logo} alt="Artverse Logo" style={{ height: '100px', paddingTop: '20px', paddingBottom: '20px' }} />
              <h2 style={{ fontWeight: 'bold' }}>Cari Lukisan Favorit kamu</h2>
              <p>dengan Mudah, Aman & Nyaman</p>
              <p>hanya di Artverse!</p>
              <button className="learn-more-btn">
                Pelajari lebih lanjut <span>▼</span>
              </button>
            </div>
          </Col>
          <Col>
            <img src={tentangimg} alt="Tentang Kami" style={{ width: '600px' }} />
          </Col>
        </Row>
      </Container>
      <div className="join-us">
        <Container>
          <Row className="text-center">
            <Col>
              <p style={{ fontWeight: 'bold', color: 'primary' }}>Bergabung Bersama Kami &gt;&gt;&gt;</p>
            </Col>
            <Col>
              <p style={{ fontWeight: 'bold', color: 'primary' }}>Pelukis</p>
              <p style={{ fontWeight: 'bold', fontSize: '24px' }}>10K+</p>
            </Col>
            <Col>
              <p style={{ fontWeight: 'bold', color: 'primary' }}>Pengguna</p>
              <p style={{ fontWeight: 'bold', fontSize: '24px' }}>50K+</p>
            </Col>
            <Col>
              <p style={{ fontWeight: 'bold', color: 'primary' }}>Pesanan</p>
              <p style={{ fontWeight: 'bold', fontSize: '24px' }}>30K+</p>
            </Col>
          </Row>
        </Container>
      </div>
      <div className="cerita-kami">
        <Container>
          <Row style={{ marginBottom: '40px' }}>
            <Col>
              <Card className="card-cerita text-center">
                <Card.Body>
                  <Card.Text>Pelaku Pemalsuan</Card.Text>
                </Card.Body>
                <Card.Img variant="bottom" src={pemalsuan} />
              </Card>
            </Col>
            <Col>
              <Card className="card-cerita text-center">
                <Card.Body>
                  <Card.Text>Pembeli Lukisan yang dibohongi</Card.Text>
                </Card.Body>
                <Card.Img variant="bottom" src={kebohongan} />
              </Card>
            </Col>
            <Col>
              <h2 style={{ color: 'purple', fontWeight: 'bold' }}>* Cerita Kami</h2>
              <h2>Kenapa Kami Membuat Artverse</h2>
              <div style={{ marginTop: '20px' }}>
                <h3 style={{ color: 'purple', fontWeight: 'bold' }}>“ Pemalsuan Karya Seni ”</h3>
                <p>Kami sangat prihatin dengan banyaknya kasus yang sering terjadi di kalangan pecinta seni, pemalsuan karya seni.</p>
                <p>
                  Permasalahan ini dilakukan oleh oknum-oknum tidak bertanggung jawab yang hanya ingin mengambil keuntungan saja, sehingga dampaknya sangat merugikan kedua belah pihak, baik{' '}
                  <span style={{ fontWeight: 'bold' }}>pelukis</span> maupun <span style={{ fontWeight: 'bold' }}>pembeli yang dibohongi</span>.
                </p>
              </div>
            </Col>
          </Row>
          <Row style={{ marginBottom: '40px' }}>
            <Col className="mr-3">
              <h2 style={{ color: 'purple', fontWeight: 'bold' }}>* Visi Misi Kami</h2>
              <div style={{ marginTop: '20px' }}>
                <h3 style={{ color: 'purple', fontWeight: 'bold' }}>Visi</h3>
                <p>untuk membantu pecinta seni menghindari penipuan lukisan.</p>
                <h3 style={{ color: 'purple', fontWeight: 'bold' }}>Misi</h3>
                <p>
                  kami hadir sebagai wadah transaksi lukisan yang tentunya mudah digunakan dan dijamin 100% asli dari senimannya langsung. Ribuan karya seni dari berbagai seniman juga telah kami verifikasi dengan institusi terkait yang
                  terpercaya untuk menjamin keasliannya.
                </p>
              </div>
            </Col>
            <Col className="ml-3">
              <div style={{ marginTop: '20px' }}>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
                  <img src={Ori} alt="100% Original" style={{ marginRight: '10px', width: '50px', height: '50px' }} />
                  <div>
                    <h3 style={{ color: 'purple', fontWeight: 'bold' }}>100% Original</h3>
                    <p>Semua lukisan yang ada di sini telah lolos pemeriksaan keasliannya oleh pihak terkait yang terpercaya</p>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
                  <img src={Trusted} alt="Seniman Asli" style={{ marginRight: '10px', width: '50px', height: '50px' }} />
                  <div>
                    <h3 style={{ color: 'purple', fontWeight: 'bold' }}>Seniman Asli</h3>
                    <p>Kami telah memeriksa validitas Artis untuk menghindari pemalsuan</p>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <img src={Box} alt="Pengiriman Terpercaya" style={{ marginRight: '10px', width: '50px', height: '50px' }} />
                  <div>
                    <h3 style={{ color: 'purple', fontWeight: 'bold' }}>Pengiriman Terpercaya</h3>
                    <p>Kami mengirimkan paket dengan jasa pengiriman kami pribadi dengan keamanan yang terpercaya</p>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
      <div className="proses-pemesanan">
        <Container>
          <Row className="text-center">
            <Col>
              <h2 style={{ color: 'purple', fontWeight: 'bold' }}>Proses Pemesanan</h2>
              <p>Pesan lukisan favorit kamu hanya dalam hitungan menit</p>
            </Col>
          </Row>
          <Row className="text-center" style={{ marginTop: '40px' }}>
            <Col>
              <div>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '20px' }}>
                  <div style={{ backgroundColor: 'purple', color: 'white', borderRadius: '50%', width: '50px', height: '50px', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '24px' }}>1</div>
                </div>
                <h3>Buat Pesanan</h3>
                <p>Setelah menemukan lukisan favorit, saatnya masukkan ke keranjang lalu masukkan alamat tujuan untuk pengiriman dan terakhir segera lakukan pembayaran.</p>
              </div>
            </Col>
            <Col>
              <div>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '20px' }}>
                  <div style={{ backgroundColor: 'purple', color: 'white', borderRadius: '50%', width: '50px', height: '50px', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '24px' }}>2</div>
                </div>
                <h3>Pesanan kamu di proses</h3>
                <p>Tunggu pesanan dikirimkan sesuai estimasi yang tertera.</p>
              </div>
            </Col>
            <Col>
              <div>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '20px' }}>
                  <div style={{ backgroundColor: 'purple', color: 'white', borderRadius: '50%', width: '50px', height: '50px', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '24px' }}>3</div>
                </div>
                <h3>Pesanan sampai tujuan</h3>
                <p>Dapatkan pesanan kamu yang telah kami kirimkan dengan aman.</p>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
      <div className="testimoni-pelanggan">
        <Container>
          <Row className="text-center">
            <Col>
              <h2 style={{ color: 'purple', fontWeight: 'bold' }}>Lihat Apa Kata Pelanggan Kami!</h2>
              <p>Review pengalaman pengguna dari pelanggan kami yang telah menggunakan Artverse</p>
            </Col>
          </Row>
          <Row className="text-center" style={{ marginTop: '40px' }}>
            <Col>
              <Card className="card-testimoni text-center">
                <Card.Body>
                  <Card.Text>Saya sangat menyukai situs web ini karena telah menghemat banyak waktu untuk membeli lukisan dengan cepat dan mudah.</Card.Text>
                </Card.Body>
                <Card.Footer>
                  <img src="path/to/hannah_hakim_image" alt="Hannah Hakim" style={{ borderRadius: '50%', width: '50px', height: '50px' }} />
                  <p>Hannah Hakim</p>
                  <p>★★★★★</p>
                </Card.Footer>
              </Card>
            </Col>
            <Col>
              <Card className="card-testimoni text-center">
                <Card.Body>
                  <Card.Text>Sangat membantu dalam menemukan lukisan untuk saya beli, prosesnya pun cepat, aman dan mudah.</Card.Text>
                </Card.Body>
                <Card.Footer>
                  <img src="path/to/adipara_albani_image" alt="Adipara Albani" style={{ borderRadius: '50%', width: '50px', height: '50px' }} />
                  <p>Adipara Albani</p>
                  <p>★★★★★</p>
                </Card.Footer>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default TentangKami;
