import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

import { AuthContextProvider } from './context/AuthContext';
import { ReorderContextProvider } from './context/ReorderContext';
import { PrescriptionContextProvider } from './context/PrescriptionContext';
import {LeavesContextProvider} from './context/LeaveContext';
import {BillContextProvider} from './context/BillContext';
import{InventoryContextProvider} from './context/InventoryContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <InventoryContextProvider>
    <BillContextProvider>
    <LeavesContextProvider>
    <ReorderContextProvider>
      <AuthContextProvider>
        <PrescriptionContextProvider>
          <App />
        </PrescriptionContextProvider>
      </AuthContextProvider>
    </ReorderContextProvider>
    </LeavesContextProvider>
    </BillContextProvider>
    </InventoryContextProvider>
  </React.StrictMode>
);


