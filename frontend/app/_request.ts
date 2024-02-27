"use server";
async function fetchPrediction(formData: { MedInc: string; HouseAge: string; AveRooms: string; AveBedrms: string; Population: string; AveOccup: string; Latitude: string; Longitude: string; }) {
    try {
      const response = await fetch(process.env.NEXT_PUBLIC_API_ENDPOINT as string, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          // Convert string values to numbers as the API expects numbers
          "MedInc": parseFloat(formData.MedInc),
          "HouseAge": parseFloat(formData.HouseAge),
          "AveRooms": parseFloat(formData.AveRooms),
          "AveBedrms": parseFloat(formData.AveBedrms),
          "Population": parseFloat(formData.Population),
          "AveOccup": parseFloat(formData.AveOccup),
          "Latitude": parseFloat(formData.Latitude),
          "Longitude": parseFloat(formData.Longitude),
        }),
      });
  
      if (!response.ok) throw new Error('Network response was not ok.');
  
      const data = await response.json();
      return data.prediction;
    } catch (error) {
      console.error('Error fetching prediction:', error);
      return "Could not fetch prediction";
    }
  }
  
  export default fetchPrediction;