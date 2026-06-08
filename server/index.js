const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("./db");

const app = express();

app.use(cors());
app.use(express.json());

/* =========================
   BASIC TEST ROUTE
========================= */
app.get("/", (req, res) => {
  res.send("Backend is running");
});

/* =========================
   REGISTER
========================= */
app.post("/register", async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const sql =
      "INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)";

    db.query(sql, [name, email, hashedPassword, role], (err, result) => {
      if (err) {
        return res.status(500).json(err);
      }

      res.json({
        message: "User registered successfully",
      });
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
    });
  }
});

/* =========================
   LOGIN
========================= */
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  const sql = "SELECT * FROM users WHERE email = ?";

  db.query(sql, [email], async (err, results) => {
    if (err) return res.status(500).json(err);

    if (results.length === 0) {
      return res.status(400).json({
        message: "User not found",
      });
    }

    const user = results[0];

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.status(400).json({
        message: "Wrong password",
      });
    }

    const token = jwt.sign(
      { id: user.id, role: user.role },
      "your_jwt_secret",
      { expiresIn: "1h" }
    );

    res.json({
      message: "Login successful",
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  });
});

/* =========================
   CREATE JOB
========================= */
app.post("/api/jobs", (req, res) => {
  const {
    title,
    skill_required,
    location,
    budget,
    description,
    client_id,
  } = req.body;

  const sql = `
    INSERT INTO jobs 
    (title, skill_required, location, budget, description, client_id)
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  db.query(
    sql,
    [title, skill_required, location, budget, description, client_id],
    (err, result) => {
      if (err) return res.status(500).json(err);

      res.json({
        message: "Job created successfully",
        jobId: result.insertId,
      });
    }
  );
});

/* =========================
   GET CLIENT JOBS
========================= */
app.get("/api/jobs/client/:id", (req, res) => {
  const sql = "SELECT * FROM jobs WHERE client_id = ?";

  db.query(sql, [req.params.id], (err, results) => {
    if (err) return res.status(500).json(err);

    res.json(results);
  });
});

/* =========================
   GET ALL OPEN JOBS
   (FOR FUNDIS)
========================= */
app.get("/api/jobs", (req, res) => {
  const sql = "SELECT * FROM jobs WHERE status = 'open'";

  db.query(sql, (err, results) => {
    if (err) return res.status(500).json(err);

    res.json(results);
  });
});

/* =========================
   DELETE JOB
========================= */
app.delete("/api/jobs/:id", (req, res) => {
  const sql = "DELETE FROM jobs WHERE id = ?";

  db.query(sql, [req.params.id], (err, result) => {
    if (err) return res.status(500).json(err);

    res.json({ message: "Job deleted successfully" });
  });
});

/* =========================
   START SERVER
========================= */
app.listen(5000, () => {
  console.log("Server running on port 5000");
});