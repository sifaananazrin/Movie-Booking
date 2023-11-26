import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import axios from "axios"
import App from './App';
import { Provider } from "react-redux"
import {BrowserRouter} from "react-router-dom"
import { store } from './store';
 axios.defaults.baseURL="http://localhost:5001"

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
    <Provider store ={store}>
    <App />
    </Provider>
    </BrowserRouter>
  </React.StrictMode>
);

