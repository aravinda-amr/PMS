import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { AuthContextProvider } from './context/AuthContext';
import { ReorderContextProvider } from './context/ReorderContext';
import {LeavesContextProvider} from './context/LeaveContext'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <LeavesContextProvider>
    <ReorderContextProvider>
    <AuthContextProvider>
      <App />
    </AuthContextProvider>
    </ReorderContextProvider>
    </LeavesContextProvider>
  </React.StrictMode>
);


