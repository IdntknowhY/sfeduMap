import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/header.css'
import './styles/main.css'
import './styles/footer.css'
import './styles/index.css'
import './styles/admin.css'
import './styles/question.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
