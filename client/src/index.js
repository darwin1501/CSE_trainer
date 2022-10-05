import 'style/style.css';
import "style/utilStyle.css"
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from 'App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route } from "react-router-dom";


import TrainingType from 'pages/trainingtype';
import CategorySelection from 'pages/category_selection';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App />}/>
        <Route path='/trainingtype' element={<TrainingType />} />
        <Route path='/category-selection' element={<CategorySelection />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
