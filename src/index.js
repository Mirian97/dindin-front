import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from "react-router-dom";
import MainRoutes from './routes';
import "./styles/index.css";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <React.StrictMode>
      <MainRoutes />
    </React.StrictMode>
  </BrowserRouter>
);
