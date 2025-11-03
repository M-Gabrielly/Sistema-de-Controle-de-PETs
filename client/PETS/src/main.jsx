import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { MensagemProvider } from './context/MensagemAPI.jsx'

import App from './App.jsx'

import Notificacao from './components/Notificacao.jsx'
import NotFoundPage from './components/NotFoundPage.jsx'
import Navbar from './components/Navbar.jsx'
import NovoPET from './components/NovoPET.jsx'
import NovoUsuario from './components/NovoCliente.jsx'


import { createBrowserRouter, RouterProvider } from 'react-router-dom'

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <>
        <Navbar />
        <App />
      </>
      ),
    errorElement: (
      <>
        <Navbar />
        <NotFoundPage />
      </>
      ),
  },
  {
    path: '/Novo',
    element: (
      <>
        <Navbar />
        <NovoPET />
      </>
      ),
    errorElement: (
      <>
        <Navbar />
        <NotFoundPage />
      </>
      ),
  },
  
  {
    path: '/Usuario',
    element: (
      <>
        <Navbar />
        <NovoUsuario />
      </>
      ),
    errorElement: (
      <>
        <Navbar />
        <NotFoundPage />
      </>
      ),
  },
], {
  basename: import.meta.env.BASE_URL
});

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <MensagemProvider>
      <Notificacao />
      <RouterProvider router = {router} />
    </MensagemProvider>
  </StrictMode>,
)
