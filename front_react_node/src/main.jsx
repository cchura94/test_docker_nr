import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import ThemeProvider from './layouts/utils/ThemeContext';
// import './index.css'
import { BrowserRouter } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </BrowserRouter>,
)
