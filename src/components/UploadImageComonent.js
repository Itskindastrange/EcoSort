import React, { useState } from 'react';
import axios from 'axios';

const UploadImageComponent = () => {
  const [file, setFile] = useState(null);
  const [prediction, setPrediction] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(false); // Added for loading state

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setImageUrl(URL.createObjectURL(e.target.files[0])); // Display uploaded image
  };

  const handleSubmit = async () => {
    if (!file) {
      alert('Please select an image file to upload.'); // Improved error handling
      return; // Prevent unnecessary request
    }

    setLoading(true); // Set loading state before the request

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('http://localhost:5000/predict', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setPrediction(response.data.prediction);
    } catch (error) {
      console.error('Error:', error);
      setPrediction('Error occurred while making the prediction.');
    } finally {
      setLoading(false); // Set loading state regardless of success or error
    }
  };

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleFileChange} />
      <button onClick={handleSubmit} disabled={loading}>
        {loading ? 'Loading prediction...' : 'Upload & Predict'}
      </button>
      {imageUrl && <img src={imageUrl} alt="Uploaded" style={{ maxWidth: '100%', maxHeight: '400px' }} />}
      {prediction && <p>Prediction: {prediction}</p>}
    </div>
  );
};

export default UploadImageComponent;
