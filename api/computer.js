import axios from "axios";

let computer; // Cache the VM so we don't create multiple

export default async function handler(req, res) {
  if (computer) return res.status(200).json(computer);

  try {
    const response = await axios.post(
      "https://engine.hyperbeam.com/v0/vm",
      {}, // Optional: { url: "https://google.com" }
      { headers: { Authorization: `Bearer ${process.env.HB_API_KEY}` } }
    );

    computer = response.data;
    res.status(200).json(computer);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create Hyperbeam VM" });
  }
}
