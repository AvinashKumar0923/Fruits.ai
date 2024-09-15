const express = require('express');
const fs = require('fs');
const cors = require('cors');
const app = express();
const PORT = 5000;
const { GoogleGenerativeAI } = require("@google/generative-ai");
const axios = require('axios');

app.use(cors());
app.use(express.json());

const filePath = './faq.json';

// GET FAQs
app.get('/faqs', (req, res) => {
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ message: 'Error reading file' });
    }
    res.json(JSON.parse(data));
  });
});

// POST a new FAQ
app.post('/faqs', (req, res) => {
  const { question, answer } = req.body;
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ message: 'Error reading file' });
    }
    const faqs = JSON.parse(data);
    const newFAQ = { id: faqs.length + 1, question, answer };
    faqs.push(newFAQ);
    fs.writeFile(filePath, JSON.stringify(faqs, null, 2), (err) => {
      if (err) {
        return res.status(500).json({ message: 'Error writing file' });
      }
      res.json(newFAQ);
    });
  });
});

// DELETE FAQ
app.delete('/faqs/:id', (req, res) => {
  const id = parseInt(req.params.id);
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ message: 'Error reading file' });
    }
    let faqs = JSON.parse(data);
    faqs = faqs.filter(faq => faq.id !== id);
    fs.writeFile(filePath, JSON.stringify(faqs, null, 2), (err) => {
      if (err) {
        return res.status(500).json({ message: 'Error writing file' });
      }
      res.json({ message: 'FAQ deleted' });
    });
  });
});

// PUT to update an FAQ
app.put('/faqs/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { question, answer } = req.body;
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ message: 'Error reading file' });
    }
    let faqs = JSON.parse(data);
    faqs = faqs.map(faq => (faq.id === id ? { id, question, answer } : faq));
    fs.writeFile(filePath, JSON.stringify(faqs, null, 2), (err) => {
      if (err) {
        return res.status(500).json({ message: 'Error writing file' });
      }
      res.json({ message: 'FAQ updated' });
    });
  });
});

app.post('/chatbot', async (req, res) => {
    const { prompt } = req.body;

    // Make sure to include these imports:
// import { GoogleGenerativeAI } from "@google/generative-ai";
    
    try {
    //   const response = await axios.post(
    //     'https://api.example.com/v1/chatbot',  // Replace with a real API endpoint
    //     {
    //       prompt: prompt,
    //       key: CHAT_API_KEY
    //     }
    //   );
    const genAI = new GoogleGenerativeAI(process.env.API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const result = await model.generateContent(prompt);
    console.log(result.response.text());
      res.json({ reply: result.response.text() });
    } catch (error) {
      res.status(500).json({ error: 'Failed to get a response from the chatbot' });
    }
  });

  // POST endpoint for translation
app.post('/translate', async (req, res) => {
    const { text, sourceLang, targetLang } = req.body;
    try {
      const response = await axios.post('https://libretranslate.com/translate', {
        q: text,
        source: sourceLang,
        target: targetLang,
        format: 'text'
      });
      res.json({ translatedText: response.data.translatedText });
    } catch (error) {
      res.status(500).json({ message: 'Translation failed' });
    }
  });

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
