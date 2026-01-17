import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.send("SALOM, SERVER ISHLAYAPTI ✅");
});

const port = process.env.PORT || 10000;
app.listen(port, () => {
  console.log("Server running");
});
