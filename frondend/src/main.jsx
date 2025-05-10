import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';
import ShopContextProvider from './context/ShopContext.jsx';

const root = createRoot(document.getElementById('root'));

root.render(
  <BrowserRouter>
  <ShopContextProvider>
    <App />
    </ShopContextProvider>
  </BrowserRouter>
);
