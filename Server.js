// ✅ Servers.js (CommonJS version)
const express = require("express");
const fetch = require("node-fetch");
const cors = require("cors");

const app = express();
const PORT = 5050;

app.use(cors());

// ✅ Route to get all shoes
app.get("/api/shoes", async (req, res) => {
  try {
    const response = await fetch("https://shoes-collections.p.rapidapi.com/shoes", {
      method: "GET",
      headers: {
    'x-rapidapi-key': '9a1d278f4bmsh62ae784f69a3f98p1d42bejsn18dc25b2f5f7',    
        "x-rapidapi-host": "shoes-collections.p.rapidapi.com",
      },
    });

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error("Error fetching shoes:", error);
    res.status(500).json({ message: "Error fetching data from RapidAPI" });
  }
});

// ✅ Route to get a specific shoe by ID
app.get("/api/shoes/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const response = await fetch(`https://shoes-collections.p.rapidapi.com/shoes/${id}`, {
      method: "GET",
      headers: {
            'x-rapidapi-key': '9a1d278f4bmsh62ae784f69a3f98p1d42bejsn18dc25b2f5f7',
        "x-rapidapi-host": "shoes-collections.p.rapidapi.com",
      },
    });

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error("Error fetching shoe details:", error);
    res.status(500).json({ message: "Error fetching shoe details" });
  }
});

// ✅ Optional: prevent "Cannot GET /favicon.ico" warning
app.get("/favicon.ico", (req, res) => res.status(204).end());

// ✅ Start the server
app.listen(PORT, () => console.log(`✅ Server running on http://localhost:${PORT}`));
