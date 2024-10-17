const express = require("express");
const mysql = require("mysql2");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Create connection to RDS
const db = mysql.createConnection({
    host: 'cc-fa-2.ctqsqii6kc97.us-east-1.rds.amazonaws.com',
    user: 'admin',
    password: 'prasad2003NDA',
    database: 'cc-fa-2'  // Make sure this matches the database you created
  });

db.connect((err) => {
  if (err) {
    console.log("Error connecting to database:", err);
    return;
  }
  console.log("Connected to RDS MySQL database");
});

// API endpoint to save tune
app.post("/save-tune", (req, res) => {
  const tune = req.body.tune;
  const sql = "INSERT INTO tunes (tune) VALUES (?)";
  db.query(sql, [tune], (err, result) => {
    if (err) {
      res.status(500).send("Error saving tune");
      return;
    }
    res.status(200).send("Tune saved successfully");
  });
});

// API endpoint to get all tunes
app.get("/get-tunes", (req, res) => {
  const sql = "SELECT * FROM tunes";
  db.query(sql, (err, results) => {
    if (err) {
      return res.status(500).json({ error: "Error fetching tunes" });
    }
    res.status(200).json(results);
  });
});



app.listen(3000, () => {
  console.log("Server is running on port 3000");
});