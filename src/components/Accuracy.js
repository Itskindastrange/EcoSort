import React, { useState, useEffect } from 'react';

const RandomTextPage = () => {
    const [randomText, setRandomText] = useState('');
    const [imageURL, setImageURL] = useState('');
  
    useEffect(() => {
      
      
  
        setImageURL('/home/abdullah/Documents/EcoSort-v2-final/frontend/ecosort/src/Screenshot from 2024-05-08 08-16-03.png');
      setImageURL('/home/abdullah/Documents/EcoSort-v2-final/frontend/ecosort/src/Screenshot from 2024-05-08 08-15-56.png');
    }, []);
  
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minHeight: '100vh' }}>
        <h1>Random Text</h1>
        <p>{randomText}</p>
        {'accuracy: 0.8003 - val_loss: 0.8928 - val_accuracy: 0.7544'}
        <img src={imageURL} alt="Random Image" />
      </div>
    );

  

  
};

export default RandomTextPage;
