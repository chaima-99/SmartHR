import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/global.css';
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
/*import Employee from './Pages/Employee';
import HR from './Pages/HR'
import SideBarHr from './Components/HR/SideBarHr';
import Admin from './Pages/Admin'
import { Router, useNavigate } from 'react-router-dom';
import EditProfile from './Components/Employee/EditProfile';
import Login_page from './Components/Login_page';*/