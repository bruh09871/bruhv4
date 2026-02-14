// server.js
const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
app.use(cors()); // allow frontend to request

// Keep track of current lock
let lockActive = false;
let lockExpireTime = null;

app.get("/new-vm", async (req, res) => {
  try {
    // If lock is active and not expired, reject new sessions
    if (lockActive && Date.now() < lockExpireTime) {
      return res.status(403).json({ error: "Locked by admin" });
    }

    // Request new Hyperbeam VM
    const resp = await axios.post(
      "https://engine.hyperbeam.com/v0/vm",
      {},
      { headers: { Authorization: `Bearer sk_live_26e2qaRQNBOLEd2l62x6MmftCqD4Pt4-IdHPZrufCYE` } }
    );

    res.json(resp.data); // contains embed_url

  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Endpoint to activate lock (10 min)
app.get("/lock", (req, res) => {
  const pwd = req.query.password;
  if (pwd === "bruh_09871iscool") {
    lockActive = true;
    lockExpireTime = Date.now() + 10*60*1000; // 10 min
    return res.json({ success: true, expiresIn: 10*60 });
  } else {
    return res.status(401).json({ error: "Wrong password" });
  }
});

app.listen(8080, () => console.log("Server running on port 8080"));
