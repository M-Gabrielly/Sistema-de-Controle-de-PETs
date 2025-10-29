import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

import NotFoundPage from './components/NotFoundPage.jsx'
import Navbar from './components/Navbar.jsx'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <NotFoundPage />
  },
], {
  basename: import.meta.env.BASE_URL
});

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Navbar />
    <RouterProvider router = {router} />
  </StrictMode>,
)
