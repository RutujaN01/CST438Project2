import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import ThemeProvider from './ThemeProvider'
import { BrowserRouter } from 'react-router-dom'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <ThemeProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ThemeProvider>,
)
