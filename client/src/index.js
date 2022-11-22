import 'style/style.css'
import 'style/utilStyle.css'
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from 'App'
import reportWebVitals from './reportWebVitals'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import TrainingType from 'pages/trainingtype'
import QuickTrainingCategorySelection from 'pages/quick_training_category_selection'
import Questions from 'pages/questions'
import { CategorySelectionProvider } from 'context/categorySelectionContext'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <CategorySelectionProvider>
    <React.StrictMode>
      <BrowserRouter basename='/'>
        <Routes>
          <Route path='/' element={<App />} />
          <Route path='/trainingtype' element={<TrainingType />} />
          <Route path='/quick-test/category-selection' element={<QuickTrainingCategorySelection />} />
          <Route path='/questions/:trainingType' element={<Questions />} />
        </Routes>
      </BrowserRouter>
    </React.StrictMode>
  </CategorySelectionProvider>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
