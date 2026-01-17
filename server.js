import express from "express";
import fetch from "node-fetch";

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("IT savodxonlik AI server ishlayapti");
});

app.post("/chat", async (req, res) => {
  try {
    const question = req.body.message;

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
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
            content: "Sen IT savodxonligi o‘qituvchisisan. Word, Excel, Windows va kompyuter bo‘yicha sodda va tushunarli javob ber."
          },
          {
            role: "user",
            content: question
          }
        ]
      })
    });

    const data = await response.json();
    res.json({ answer: data.choices[0].message.content });

  } catch (e) {
    res.status(500).json({ error: "AI xatolik berdi" });
  }
});

const port = process.env.PORT || 10000;
app.listen(port, () => {
  console.log("Server running on port " + port);
});
