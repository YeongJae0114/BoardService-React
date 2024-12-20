import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { AuthProvider } from './context/AuthContext'; // AuthProvider 추가

createRoot(document.getElementById('root')).render(
  <StrictMode>

      <App />

  </StrictMode>
);