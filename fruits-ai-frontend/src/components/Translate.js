import React, { useState } from 'react';
import axios from 'axios';
import './Translate.css';  // External CSS for styling
import Navbar from './Navbar'

const Translate = () => {
  const [text, setText] = useState('');
  const [sourceLang, setSourceLang] = useState('en');
  const [targetLang, setTargetLang] = useState('es');
  const [translatedText, setTranslatedText] = useState('');

  const handleTranslate = async () => {
    try {
      const response = await axios.post('http://localhost:5000/translate', {
        text,
        sourceLang,
        targetLang
      });
      setTranslatedText(response.data.translatedText);
    } catch (error) {
      setTranslatedText('Error: Unable to translate');
    }
  };

  return (
    <div><Navbar/>
    <div className="translate-container">
      <h2>Language Translator</h2>
      <div className="dropdown-container">
        <label>From:</label>
        <select value={sourceLang} onChange={(e) => setSourceLang(e.target.value)}>
          <option value="en">English</option>
          <option value="es">Spanish</option>
          <option value="fr">French</option>
          <option value="de">German</option>
          <option value="hi">Hindi</option>
          <option value="zh">Chinese</option>
          {/* Add more languages as needed */}
        </select>

        <label>To:</label>
        <select value={targetLang} onChange={(e) => setTargetLang(e.target.value)}>
          <option value="es">Spanish</option>
          <option value="en">English</option>
          <option value="fr">French</option>
          <option value="de">German</option>
          <option value="hi">Hindi</option>
          <option value="zh">Chinese</option>
          {/* Add more languages as needed */}
        </select>
      </div>

      <textarea
        placeholder="Enter text to translate..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      ></textarea>

      <button onClick={handleTranslate}>Translate</button>

      {translatedText && (
        <div className="translated-card">
          <h3>Translated Text</h3>
          <p>{translatedText}</p>
        </div>
      )}
    </div>
    </div>
  );
};

export default Translate;
