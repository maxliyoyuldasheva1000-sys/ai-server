import express from "express";
import fetch from "node-fetch";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

const app = express();
app.use(express.json());

// HTML faylni ko‘rsatish
app.use(express.static(__dirname));

// Bosh sahifa — index.html
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// AI chat endpoint
app.post("/chat", async (req, res) => {
  try {
    const question = req.body.message;

    const r = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": Bearer ${process.env.OPENAI_API_KEY}
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: "Sen IT savodxonligi o‘qituvchisisan. Word, Excel, Windows bo‘yicha sodda va tushunarli javob ber."
          },
          { role: "user", content: question }
        ]
      })
    });

    const data = await r.json();
    res.json({ answer: data.choices[0].message.content });
  } catch (e) {
    res.status(500).json({ error: "AI xato berdi" });
  }
});
