import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { dbService } from './service';
const REQUEST_URL = 'http://localhost:8000'

const roomDBService = new dbService(REQUEST_URL);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App DBService={roomDBService}/>
  </React.StrictMode>
);

