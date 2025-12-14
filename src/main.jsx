import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import { Toaster } from 'react-hot-toast';
// import 'react-hot-toast/dist/react-hot-toast.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
  <BrowserRouter>
  <Toaster />
    <App />
    </BrowserRouter>
  </StrictMode>,
)
