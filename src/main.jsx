import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { router } from './Routes/Routes'
import { RouterProvider } from 'react-router'
import BookProvider from './Context/BookContext'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BookProvider>
      <RouterProvider router={router} />
    </BookProvider>
  </StrictMode>,
)
