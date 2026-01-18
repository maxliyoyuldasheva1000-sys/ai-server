import express from "express";
import fetch from "node-fetch";

const app = express();

// CORS
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});

app.use(express.json());

// TEST
app.get("/", (req, res) => {
  res.send("Server ishlayapti");
});

// AI
app.post("/ai", async (req, res) => {
  try {
    const r = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": "Bearer " + process.env.OPENAI_API_KEY,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gpt-4.1-mini",
        messages: [
          { role: "system", content: "Sen IT savodxonligi o‘qituvchisisan. Faqat o‘zbekcha javob ber." },
          { role: "user", content: req.body.text }
        ]
      })
    });

    const data = await r.json();
    res.json({ answer: data.choices[0].message.content });
  } catch (e) {
    res.status(500).json({ error: "AI ishlamadi" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT);
import multer from "multer";
const upload = multer({ storage: multer.memoryStorage() });

app.post("/ai-image", upload.single("image"), async (req, res) => {
  try {
    const img = req.file.buffer.toString("base64");

    const r = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": "Bearer " + process.env.OPENAI_API_KEY,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gpt-4.1-mini",
        messages: [
          {
            role: "user",
            content: [
              { type: "text", text: "Rasmni tushuntirib ber" },
              { type: "image_url", image_url: { url: "data:image/png;base64," + img } }
            ]
          }
        ]
      })
    });

    const data = await r.json();
    res.json({ answer: data.choices[0].message.content });
  } catch {
    res.status(500).json({ error: "Rasm o‘qilmadi" });
  }
});
app.post("/ai-draw", async (req, res) => {
  try {
    const r = await fetch("https://api.openai.com/v1/images/generations", {
      method: "POST",
      headers: {
        "Authorization": "Bearer " + process.env.OPENAI_API_KEY,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gpt-image-1",
        prompt: req.body.text,
        size: "1024x1024"
      })
    });

    const data = await r.json();
    res.json({ image: data.data[0].url });
  } catch (e) {
    res.status(500).json({ error: "Rasm chizilmadi" });
  }
});

