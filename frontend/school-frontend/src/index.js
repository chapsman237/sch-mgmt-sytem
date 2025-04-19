import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; // ✅ Import your global Poppins styles
import App from './App';
import reportWebVitals from './reportWebVitals';

// ✅ Create root and render App inside StrictMode
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// ✅ Optional: log web vitals for performance
reportWebVitals();
