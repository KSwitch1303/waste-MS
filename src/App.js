import './App.css'
import React, { useState } from 'react';

function WasteManagementSystem() {
  const [area, setArea] = useState('Residential');
  const [recommendations, setRecommendations] = useState([]);

  const handleChange = (event) => {
    setArea(event.target.value);
  };

  const getRecommendations = async () => {
    try {
      const response = await fetch(`https://waste-ms-backend.onrender.com/recommendations/${area}`);
      const data = await response.json();
      setRecommendations(data);
    } catch (error) {
      console.error('Error fetching recommendations:', error);
    }
  };

  return (
    <div className='container'>
      <h1 className='h1'>Waste Management System</h1>
      <label className='label' htmlFor="areaSelect">Select Area:</label>
      <select className='select' id="areaSelect" value={area} onChange={handleChange}>
        <option value="Residential">Residential</option>
        <option value="Commercial">Commercial</option>
        <option value="Industrial">Industrial</option>
      </select>
      <button onClick={getRecommendations}>Get Recommendations</button>
      <div>
        {recommendations.map((recommendation, index) => (
          <div className='recommendation' key={index}>
            <p>{recommendation.result}</p>
            <p>Action: {recommendation.action}</p>
            <hr />
          </div>
        ))}
      </div>
    </div>
  );
}

export default WasteManagementSystem;
