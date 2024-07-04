const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'artverse',
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to the database');
});

const paintings = [
  {
    title: 'Ohne Titel',
    year: 2023,
    artist: 'Basuki Hartono',
    price: 'IDR 58.000.000',
    image: 'src/assets/img/Karya1.png',
    category: 'Abstract',
    media: 'Oil Paint',
    description: 'Deskripsi untuk Ohne Titel',
  },
  {
    title: 'Sand Ocean Samuel',
    year: 2006,
    artist: 'Samuel Hardiman',
    price: 'IDR 60.000.000',
    image: 'src/assets/img/home13.png',
    category: 'Realism',
    media: 'Acrylic Paint',
    description: 'Deskripsi untuk Sand Ocean Samuel',
  },
  // Tambahkan deskripsi untuk lukisan lainnya
];

const verifyToken = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) {
    return res.status(403).send('Token is required');
  }
  jwt.verify(token, 'your_secret_key', (err, decoded) => {
    if (err) {
      return res.status(401).send('Invalid Token');
    }
    req.userId = decoded.id;
    next();
  });
};

app.get('/shipping_services', (req, res) => {
  const sql = 'SELECT * FROM shipping_services';
  db.query(sql, (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.json(results);
  });
});

// Mengambil semua pembayaran
app.get('/api/payments', (req, res) => {
  const query = 'SELECT * FROM payments';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching payments:', err);
      return res.status(500).send('Error fetching payments');
    }
    res.json(results);
  });
});

// Mengambil pembayaran spesifik berdasarkan user_id
app.get('/api/payments/:user_id', (req, res) => {
  const { user_id } = req.params;
  const query = 'SELECT * FROM payments WHERE user_id = ?';
  db.query(query, [user_id], (err, results) => {
    if (err) {
      console.error('Error fetching payment for user:', err);
      return res.status(500).send('Error fetching payment');
    }
    res.json(results);
  });
});

app.put('/api/payments/:id', (req, res) => {
  const { status } = req.body;
  const { id } = req.params;
  const query = 'UPDATE payments SET status = ? WHERE id = ?';
  db.query(query, [status, id], (err, result) => {
    if (err) {
      console.error('Error updating payment:', err);
      return res.status(500).send('Error updating payment');
    }
    res.send('Payment updated successfully');
  });
});

app.delete('/api/payments/:id', (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM payments WHERE id = ?';
  db.query(query, [id], (err, result) => {
    if (err) {
      console.error('Error deleting payment:', err);
      return res.status(500).send('Error deleting payment');
    }
    res.send('Payment deleted successfully');
  });
});

app.get('/pelanggan/profile', verifyToken, (req, res) => {
  const sql = 'SELECT * FROM pelanggan WHERE id_pelanggan = ?';
  db.query(sql, [req.userId], (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    if (results.length === 0) {
      return res.status(404).send('User not found');
    }
    res.json(results[0]);
  });
});

app.get('/', (req, res) => {
  return res.json('From Backend Side');
});

app.get('/pelanggan', (req, res) => {
  const sql = 'SELECT * FROM pelanggan';
  db.query(sql, (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.json(results);
  });
});

app.post('/insert-paintings', (req, res) => {
  paintings.forEach((painting) => {
    const { title, year, artist, price, image, category, media, description } = painting;
    const query = 'INSERT INTO paintings (title, year, artist, price, image, category, media, description) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
    db.query(query, [title, year, artist, price, image, category, media, description], (err, results) => {
      if (err) {
        console.error('Error inserting data:', err);
        return res.status(500).send('Error inserting data');
      }
    });
  });
  res.send('Data inserted successfully');
});

app.get('/paintings', (req, res) => {
  const query = 'SELECT * FROM paintings';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching data:', err);
      return res.status(500).send('Error fetching data');
    }
    res.json(results);
  });
});

// Rute untuk mendapatkan lukisan berdasarkan ID
app.get('/paintings/:id', (req, res) => {
  const { id } = req.params;
  const query = 'SELECT * FROM paintings WHERE id = ?';
  db.query(query, [id], (err, result) => {
    if (err) {
      console.error('Error fetching painting:', err);
      return res.status(500).send('Error fetching painting');
    }
    if (result.length === 0) {
      return res.status(404).send('Painting not found');
    }
    res.json(result[0]);
  });
});

app.post('/api/getPaintingsByIds', (req, res) => {
  const ids = req.body.ids;
  if (!ids || ids.length === 0) {
    return res.status(400).send('No IDs provided');
  }

  const query = 'SELECT * FROM paintings WHERE id IN (?)';
  db.query(query, [ids], (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

// Tambahkan item ke wishlist
app.post('/wishlist/add', (req, res) => {
  const { id_pelanggan, painting_id } = req.body;
  const query = 'INSERT INTO wishlist (id_pelanggan, painting_id) VALUES (?, ?)';
  db.query(query, [id_pelanggan, painting_id], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(200).json({ message: 'Item added to wishlist' });
  });
});

// Hapus item dari wishlist
app.post('/api/wishlist/remove', (req, res) => {
  const { id_pelanggan, painting_id } = req.body;
  console.log('Received request to remove item from wishlist:', req.body); // Tambahkan log untuk debugging

  if (!id_pelanggan || !painting_id) {
    return res.status(400).json({ error: 'id_pelanggan and painting_id are required' });
  }

  const query = 'DELETE FROM wishlist WHERE id_pelanggan = ? AND painting_id = ?';
  db.query(query, [id_pelanggan, painting_id], (err, result) => {
    if (err) {
      console.error('Error removing item from wishlist:', err); // Tambahkan log untuk debugging
      return res.status(500).json({ error: err.message });
    }
    res.status(200).json({ message: 'Item removed from wishlist' });
  });
});

// Dapatkan wishlist pengguna
app.get('/wishlist/:id_pelanggan', (req, res) => {
  const { id_pelanggan } = req.params;
  const query = 'SELECT * FROM paintings WHERE id IN (SELECT painting_id FROM wishlist WHERE id_pelanggan = ?)';
  db.query(query, [id_pelanggan], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(200).json(results);
  });
});

app.get('/shipping_services', (req, res) => {
  const query = 'SELECT * FROM shipping_services';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching shipping services:', err);
      res.status(500).send('Error fetching shipping services');
      return;
    }
    res.json(results);
  });
});

const NODE_PORT = process.env.PORT || 5075;
app.listen(NODE_PORT, () => {
  console.log(`Server is running on port ${NODE_PORT}`);
});

app.listen(8081, () => {
  console.log('Server is running on port 8081');
});
