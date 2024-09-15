import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import './FAQ.css';  // External CSS for styling
import Navbar from './Navbar';

const FAQ = () => {
  const [faqs, setFaqs] = useState([]);
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchFaqs();
  }, []);

  const fetchFaqs = async () => {
    const response = await axios.get('http://localhost:5000/faqs');
    setFaqs(response.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editMode) {
      await axios.put(`http://localhost:5000/faqs/${editId}`, { question, answer });
      setEditMode(false);
      setEditId(null);
    } else {
      await axios.post('http://localhost:5000/faqs', { question, answer });
    }
    setQuestion('');
    setAnswer('');
    fetchFaqs();
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/faqs/${id}`);
    fetchFaqs();
  };

  const handleEdit = (faq) => {
    setQuestion(faq.question);
    setAnswer(faq.answer);
    setEditId(faq.id);
    setEditMode(true);
  };

  return (
    <div><Navbar/>
    <div className="faq-container">
      <h2>FAQs</h2>
      
      <div className="faqs-list">
        {faqs.map((faq) => (
          <div className="faq-item" key={faq.id}>
            <div className="faq-question" onClick={() => document.getElementById(`faq-${faq.id}`).classList.toggle('show')}>
              {faq.question}
              <div className="faq-actions">
                <FontAwesomeIcon icon={faEdit} onClick={() => handleEdit(faq)} />
                <FontAwesomeIcon icon={faTrash} onClick={() => handleDelete(faq.id)} />
              </div>
            </div>
            <div className="faq-answer" id={`faq-${faq.id}`}>
              {faq.answer}
            </div>
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter Question"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          required
        />
        <textarea
          placeholder="Enter Answer"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          required
        ></textarea>
        <button type="submit">{editMode ? 'Update FAQ' : 'Submit FAQ'}</button>
      </form>
    </div>
    </div>
  );
};

export default FAQ;
