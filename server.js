import express from "express";
import fetch from "node-fetch";

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Server ishlayapti");
});

app.post("/ai", async (req, res) => {
  const userText = req.body.text;

  const r = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": "Bearer " + process.env.OPENAI_API_KEY,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "gpt-4.1-mini",
      messages: [
        { role: "system", content: "Sen IT savodxonligi o‘qituvchisisan. Faqat o‘zbekcha, oddiy tushuntir." },
        { role: "user", content: userText }
      ]
    })
  });

  const data = await r.json();
  res.json({ answer: data.choices[0].message.content });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT);
