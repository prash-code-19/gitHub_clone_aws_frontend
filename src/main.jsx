import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom'
import './index.css'
import { AuthProvider } from './authContext.jsx'
import ProjectRoutes from './Routes.jsx'

createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <Router>
      <ProjectRoutes />
    </Router>
  </AuthProvider>
)
