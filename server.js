import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

app.post("/ask", async (req, res) => {
  const q = req.body.question;

  const r = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": Bearer ${process.env.OPENAI_API_KEY},
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "Sen Word, Excel, PowerPoint, IT savodxonlik, Informatika, Matematika va boshqa fanlar bo‘yicha o‘qituvchisan. Javoblarni oddiy o‘zbek tilida tushuntir."
        },
        { role: "user", content: q }
      ]
    })
  });

  const data = await r.json();
  res.json({ answer: data.choices[0].message.content });
});

app.listen(3000);
