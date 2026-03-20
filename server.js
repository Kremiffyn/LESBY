// server.js
const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");

const app = express();
app.use(cors());
app.use(express.json());

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

app.post("/register", async (req, res) => {
  const { nazwa, imie, nazwisko, email, tel, haslo } = req.body;
  try {
    const query = `
      INSERT INTO uzytkownik(nazwa_uzyt, imie, nazwisko, email, nr_tel, haslo)
      VALUES ($1,$2,$3,$4,$5,$6) RETURNING id_uzyt
    `;
    const values = [nazwa, imie, nazwisko, email, tel, haslo];
    const result = await pool.query(query, values);
    res.json({ status: "ok", Id_uzyt: result.rows[0].id_uzyt });
  } catch (err) {
    console.error(err);
    res.json({ status: "blad", error: err.message });
  }
});

app.post("/login", async (req, res) => {
  const { login, haslo } = req.body;
  try {
    const result = await pool.query(
      `SELECT id_uzyt, nazwa_uzyt FROM uzytkownik WHERE nazwa_uzyt=$1 AND haslo=$2`,
      [login, haslo]
    );
    if (result.rows.length > 0)
      res.json({ status: "ok", Id_uzyt: result.rows[0].id_uzyt });
    else
      res.json({ status: "blad", error: "Złe dane logowania" });
  } catch (err) {
    console.error(err);
    res.json({ status: "blad", error: err.message });
  }
});

app.post("/gra", async (req, res) => {
  const { Id_uzyt, data_start, data_koniec } = req.body;
  if (!Id_uzyt || !data_start || !data_koniec)
    return res.status(400).json({ error: "Brak danych" });

  try {
    await pool.query(
      `INSERT INTO gra(id_uzyt, data_start, data_koniec) VALUES ($1, $2, $3)`,
      [Id_uzyt, data_start, data_koniec]
    );
    res.json({ status: "ok" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

app.get("/ranking-today", async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const result = await pool.query(
      `
      SELECT g.id_uzyt, u.nazwa_uzyt, g.data_start, g.data_koniec
      FROM gra g
      JOIN uzytkownik u ON g.id_uzyt = u.id_uzyt
      WHERE g.data_start >= $1 AND g.data_start < $2
      ORDER BY EXTRACT(EPOCH FROM (g.data_koniec - g.data_start))
      `,
      [today.toISOString(), tomorrow.toISOString()]
    );

    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`API działa na porcie ${PORT}`));