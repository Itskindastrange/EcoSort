import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import WelcomePage from './components/WelcomePage';
import UploadPage from './components/UploadPage';
import AboutPage from './components/About';
import AccuracyPage from './components/Accuracy';
const App = () => {
  // Theme state from local storage or default
  const mode = localStorage.getItem('theme') || 'light';

  const toggleMode = () => {
    const newMode = mode === 'light' ? 'dark' : 'light';
    localStorage.setItem('theme', newMode);
    document.body.style.backgroundColor = newMode === 'dark' ? '#0e101e' : 'white';

    // Display alert for 5 seconds
    const alertTimeout = setTimeout(() => {
      showAlert(null);
    }, 5000); // 5000 milliseconds = 5 seconds

    // Optional function to display alert (if needed in other components)
    const showAlert = (message) => {
      console.log(message || `Theme changed to ${newMode}`);
    };

    showAlert(`Theme changed to ${newMode}`); // Display alert immediately
    clearTimeout(alertTimeout); // Clear any previous timeout to prevent stacking alerts
  };

  return (
    <Router>
      {/* Pass toggleMode and mode to all pages */}
      <Routes>
        <Route
          exact
          path="/"
          element={<WelcomePage toggleMode={toggleMode} mode={mode} />}
        />
        <Route path="/upload" element={<UploadPage toggleMode={toggleMode} mode={mode} />} />
        <Route path="/about" element={<AboutPage toggleMode={toggleMode} mode={mode} />} />
        <Route path="/accuracy" element={<AccuracyPage toggleMode={toggleMode} mode={mode} />} />
      </Routes>
    </Router>
  );
};

export default App;
