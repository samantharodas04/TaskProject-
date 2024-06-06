const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('./db'); // Importa la conexión a la base de datos

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.post('/register', (req, res) => {
  // Lógica para registrar usuarios
  const { email, name, birthdate, password, gender } = req.body;
  console.log('Received registration data:', req.body);

  const hashedPassword = bcrypt.hashSync(password, 10);
  console.log('Hashed password:', hashedPassword);

  const query = 'INSERT INTO users (email, name, birthdate, password, gender) VALUES (?, ?, ?, ?, ?)';
  db.query(query, [email, name, birthdate, hashedPassword, gender], (err, result) => {
    if (err) {
      console.error('Error inserting user into database:', err);
      res.status(500).send({ error: 'Registration failed', details: err });
    } else {
      console.log('User registered successfully:', result);
      res.status(200).send({ message: 'Registration successful' });
    }
  });
});

app.post('/login', (req, res) => {
  // Lógica para el inicio de sesión de usuarios
  const { email, password } = req.body;

  const query = 'SELECT * FROM users WHERE email = ?';
  db.query(query, [email], (err, result) => {
    if (err || result.length === 0) {
      console.error('Error fetching user from database or user not found:', err);
      res.status(401).send({ error: 'Login failed' });
    } else {
      console.log("codigo de usuario");
      const user = result[0];
      console.log(user);
      if (bcrypt.compareSync(password, user.password)) {
        const token = jwt.sign({ id: user.id }, 'your_jwt_secret');
        res.status(200).send({ message: 'Login successful', token, codigo: user['id'] });
      } else {
        res.status(401).send({ error: 'Login failed' });
      }
    }
  });
});
// Ruta para crear una nueva tarea
  app.post('/tarea', (req, res) => {
    // Lógica para registrar usuarios
    const { title, priority, description, date, user, status } = req.body;
    console.log('Received registration data:', req.body);

    const query = 'INSERT INTO tasks (title, priority, description, date, user_id, status) VALUES (?, ?, ?, ?, ?, ?)';
    db.query(query, [title, priority, description, date, user, status], (err, result) => {
      if (err) {
        console.error('Error inserting user into database:', err);
        res.status(500).send({ error: 'Registration failed', details: err });
      } else {
        console.log('Task Saved successfuly:', result);
        res.status(200).send({ message: 'Task Saved successfuly' });
      }
    });
  });
  app.get('/list/:id', (req, res) => {
    const query = `SELECT a.id, a.title, a.priority, a.description, a.date, user_id, a.status, b.name AS usuario FROM tasks a INNER JOIN users b ON a.user_id = b.id WHERE user_id = ${req.params.id}`;
    db.query(query, (err, results) => {
      if (err) {
        console.error('Error fetching tasks from database:', err);
        res.status(500).send({ error: 'Failed to fetch tasks', details: err });
      } else {
        res.status(200).send(results);
      }
    });
  });

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

