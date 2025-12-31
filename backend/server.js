// backend/server.js
const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

// Base de datos (Evaluaciones)
const db = new sqlite3.Database('./evaluations.db');

db.serialize(() => {
  // Tabla Docentes (Mock para cumplir requisito)
  db.run("CREATE TABLE IF NOT EXISTS teachers (id INTEGER PRIMARY KEY, name TEXT)");
  db.run("INSERT OR IGNORE INTO teachers (id, name) VALUES (1, 'Profesor X'), (2, 'Dra. Y')");

  // Tabla Evaluaciones (Requisito principal)
  db.run(`CREATE TABLE IF NOT EXISTS evaluations (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    course TEXT,
    teacherId INTEGER,
    score INTEGER,
    comment TEXT
  )`);
});

// Endpoint: Guardar Evaluación
app.post('/api/evaluations', (req, res) => {
  const { course, teacherId, score, comment } = req.body;
  if (score < 1 || score > 7) return res.status(400).json({error: 'Nota inválida'}); // Validación

  const stmt = db.prepare("INSERT INTO evaluations (course, teacherId, score, comment) VALUES (?, ?, ?, ?)");
  stmt.run(course, teacherId, score, comment, function(err) {
    if (err) return res.status(500).send(err.message);
    res.json({ id: this.lastID, message: 'Evaluación guardada' });
  });
});

// Endpoint: Listar Evaluaciones (Para reportes)
app.get('/api/evaluations', (req, res) => {
  db.all("SELECT * FROM evaluations", [], (err, rows) => {
    if (err) return res.status(500).send(err.message);
    res.json(rows);
  });
});

app.listen(port, () => {
  console.log(`Backend de evaluaciones corriendo en puerto ${port}`);
});