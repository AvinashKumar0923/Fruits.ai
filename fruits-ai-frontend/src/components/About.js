import React from 'react';
import Navbar from './Navbar';
import './About.css';  // External CSS for styling

const About = () => {
  return (
    <div><Navbar />
    <div className="about-container">
      
      <div className="about-card">
        <h2>About Fruits.ai</h2>
        <p>
          Whether you're looking to discover new fruits, understand their nutritional values, 
          or find the perfect fruit for your diet, our AI-driven chatbot is here to assist. 
          We provide personalized fruit recommendations tailored to your health needs, making it 
          easier for you to integrate the best fruits into your daily routine.
        </p>
        <p>
          At Fruits.ai, we believe that maintaining a healthy lifestyle shouldn't be complicated. 
          With our chatbot, you can easily explore different fruits based on your dietary preferences, 
          lifestyle, and health goals. From weight management to boosting immunity, our recommendations 
          are crafted to help you make informed decisions. Stay healthy, stay fruity!
        </p>
      </div>
    </div>
    </div>
  );
};

export default About;
