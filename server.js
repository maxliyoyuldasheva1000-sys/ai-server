import express from "express";
import fetch from "node-fetch";

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Server ishlayapti");
});

app.post("/ai", async (req, res) => {
  try {
    const userText = req.body.text;

    const response = await fetch(
      "https://api.openai.com/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Authorization": Bearer ${process.env.OPENAI_API_KEY},
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          model: "gpt-4.1-mini",
          messages: [
            {
              role: "system",
              content:
                "Sen IT savodxonligi bo‘yicha universal o‘qituvchisan. Word, Excel, PowerPoint, Access, IP manzillar, HTML, Python, JavaScript va sun’iy intellekt bo‘yicha savollarga faqat o‘zbekcha, oddiy va bosqichma-bosqich javob ber."
            },
            { role: "user", content: userText }
          ]
        })
      }
    );

    const data = await response.json();
    res.json({ answer: data.choices[0].message.content });
  } catch (e) {
    res.status(500).json({ error: "AI xatosi" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT);
