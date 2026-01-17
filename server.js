import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.post("/ask", async (req, res) => {
  try {
    const { question } = req.body;

    if (!question) {
      return res.status(400).json({ error: "Savol yuborilmadi" });
    }

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": Bearer ${process.env.OPENAI_API_KEY}
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: "You are a helpful teacher." },
          { role: "user", content: question }
        ]
      })
    });

    const data = await response.json();
    res.json({ answer: data.choices[0].message.content });

  } catch (err) {
    res.status(500).json({ error: "Server xatosi", details: err.message });
  }
});

app.get("/", (req, res) => {
  res.send("AI server ishlayapti ✅");
});

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
