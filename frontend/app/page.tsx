"use client"

import { useState, ChangeEvent, FormEvent } from 'react';
import fetchPrediction from './_request';

// Define a type for the form data to ensure type safety
type FormData = {
  [key: string]: string;
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

    const response = await fetchPrediction(formData);

    setPrediction(`Prediction: ${response}`);
  };

  return (
    <div
      className="p-8 bg-gradient-to-r from-gray-900 to-black min-h-screen md:flex md:flex-col md:items-center md:justify-center text-white"
    >
      <h1 className="text-white text-center mb-8 md:text-4xl md:font-bold">House Price Prediction Model</h1>
      <h2 className="text-xl mb-4 md:text-center">Enter your details</h2>
      <form onSubmit={handleSubmit} className="md:flex md:flex-col md:gap-4 md:items-center">
        {/* Form fields */}
        {Object.keys(formData).map((key) => (
          <div key={key} className="md:flex md:items-center md:mb-4">
            <label htmlFor={key} className="mb-2 md:mb-0 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</label>
            <input
              type="text"
              id={key}
              name={key}
              value={formData[key]}
              onChange={handleChange}
              className="p-2 rounded bg-gray-800 text-white md:ml-2"
              required
            />
          </div>
        ))}
        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4 md:mt-0">
          Predict
        </button>
      </form>
      {prediction && <div className="mt-4">{prediction}</div>}
    </div>
  );
};

export default HousePricePrediction;
