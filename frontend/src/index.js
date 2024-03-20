import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { AuthContextProvider } from './context/AuthContext';
import { ReorderContextProvider } from './context/ReorderContext';
import { PrescriptionContextProvider } from './context/PrescriptionContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    
    <ReorderContextProvider>
      <AuthContextProvider>
        <PrescriptionContextProvider>
          <App />
        </PrescriptionContextProvider>
      </AuthContextProvider>
    </ReorderContextProvider>
    
  </React.StrictMode>
);


