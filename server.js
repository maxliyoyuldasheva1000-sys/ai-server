import express from "express";

const app = express();
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("Server ishlayapti ✅");
});

/* 👇 MANA SHU YERGA QO‘SHASIZ */
app.get("/test", (req, res) => {
  res.json({ status: "API ishlayapti", ok: true });
});
/* 👆 MANA SHU YERGA QO‘SHASIZ */

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
