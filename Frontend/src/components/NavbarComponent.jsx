import { useState, useEffect } from 'react';
import { navLinks } from '../data/index';
import { Navbar, Container, Nav, Form, FormControl, Button, InputGroup } from 'react-bootstrap';
import { FaShoppingCart, FaUser, FaSearch } from 'react-icons/fa';
import logo from '../assets/img/logo_bgremove.png';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useCart } from '../../contexts/CartContext'; // Import useCart

const NavbarComponent = () => {
  const [changeColor, setChangeColor] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const { cartItems } = useCart(); // Gunakan useCart untuk mendapatkan cartItems

  const handleCartClick = () => {
    navigate('/cart');
  };

  const changeBackgroundColor = () => {
    if (window.scrollY > 10) {
      setChangeColor(true);
    } else {
      setChangeColor(false);
    }
  };

  useEffect(() => {
    changeBackgroundColor();
    window.addEventListener('scroll', changeBackgroundColor);
    // Check if user is logged in
    const loggedInStatus = localStorage.getItem('isLoggedIn');
    if (loggedInStatus === 'true') {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.setItem('isLoggedIn', 'false');
    setIsLoggedIn(false);
  };

  return (
    <div>
      <Navbar expand="lg" className="bg-body-tertiary fixed-top" style={{ boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.1)' }}>
        <Container>
          <Navbar.Brand href="#beranda">
            <img src={logo} alt="Logo" style={{ height: '30px', marginLeft: '-10px' }} />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mx-auto">
              {navLinks.map((link) => {
                return (
                  <div className="nav-link" key={link.id}>
                    <NavLink to={link.path} className={({ isActive, isPending }) => (isPending ? 'pending' : isActive ? 'active' : '')} end>
                      {link.text === 'Home' ? 'Beranda' : link.text}
                    </NavLink>
                  </div>
                );
              })}
            </Nav>

            <div className="d-flex align-items-center">
              <Form className="d-flex">
                <InputGroup>
                  <InputGroup.Text style={{ padding: '0.25rem' }}>
                    <FaSearch size="0.75em" />
                  </InputGroup.Text>
                  <FormControl
                    type="search"
                    placeholder="Cari"
                    className="me-2"
                    aria-label="Search"
                    style={{ height: '30px', fontSize: '0.875rem' }}
                    onFocus={(e) => (e.target.style.backgroundColor = '#f8f9fa')}
                    onBlur={(e) => (e.target.style.backgroundColor = 'white')}
                  />
                </InputGroup>
              </Form>
              {isLoggedIn ? (
                <>
                  <Button variant="link" className="me-2 position-relative" style={{ color: 'black', boxShadow: 'none', padding: '0.25rem' }} onClick={handleCartClick}>
                    <FaShoppingCart size="1.25em" />
                    {cartItems.length > 0 && <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">{cartItems.length}</span>}
                  </Button>
                  <Button variant="link" className="me-2" style={{ color: 'black', boxShadow: 'none', padding: '0.25rem' }}>
                    <Link to="/profile" className="text-dark text-decoration-none">
                      <FaUser size="1.25em" />
                    </Link>
                  </Button>
                </>
              ) : (
                <Button variant="primary" className="ms-2">
                  <Link to="/login" className="text-white text-decoration-none">
                    Login
                  </Link>
                </Button>
              )}
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default NavbarComponent;
