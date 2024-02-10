"use client"

// Import necessary hooks and axios for API calls
import { useState, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';

// Define a type for the form data to ensure type safety
type FormData = {
  MedInc: string;
  HouseAge: string;
  AveRooms: string;
  AveBedrms: string;
  Population: string;
  AveOccup: string;
  Latitude: string;
  Longitude: string;
};

const HousePricePrediction = () => {
  // State for the prediction result and form data
  const [prediction, setPrediction] = useState<string>('');
  const [formData, setFormData] = useState<FormData>({
    MedInc: '8.3252',
    HouseAge: '41.0',
    AveRooms: '6.984127',
    AveBedrms: '1.023810',
    Population: '322.0',
    AveOccup: '2.555556',
    Latitude: '37.88',
    Longitude: '-122.23',
  });
  
  // Handle form field changes
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/predict/', {
        ...formData,
        // Convert string values to numbers as the API expects numbers
        MedInc: parseFloat(formData.MedInc),
        HouseAge: parseFloat(formData.HouseAge),
        AveRooms: parseFloat(formData.AveRooms),
        AveBedrms: parseFloat(formData.AveBedrms),
        Population: parseFloat(formData.Population),
        AveOccup: parseFloat(formData.AveOccup),
        Latitude: parseFloat(formData.Latitude),
        Longitude: parseFloat(formData.Longitude),
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      setPrediction(`Prediction: ${response.data.prediction}`);
    } catch (error) {
      console.error('Error fetching prediction:', error);
      setPrediction('Failed to fetch prediction');
    }
  };

  return (
    <div className="p-8 bg-gradient-to-r from-gray-900 to-black min-h-screen flex flex-col items-center justify-center text-white">
      <h1 className="text-4xl font-bold mb-8">House Price Prediction Model</h1>
      <h2 className="text-xl mb-4">Enter your details</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 items-center">
        {/* Form fields */}
        {Object.keys(formData).map((key) => (
          <div key={key} className="flex flex-col">
            <label htmlFor={key} className="mb-2 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</label>
            <input
              type="text"
              id={key}
              name={key}
              value={formData[key]}
              onChange={handleChange}
              className="p-2 rounded bg-gray-800 text-white"
              required
            />
          </div>
        ))}
        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4">
          Predict
        </button>
      </form>
      {prediction && <div className="mt-4">{prediction}</div>}
    </div>
  );
};

export default HousePricePrediction;
