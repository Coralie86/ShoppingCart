import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router'
import Navigation from './Components/navigation.jsx'
import Children from './Components/children.jsx'
import { CartProvider } from './Components/cartContext.jsx'


const router = createBrowserRouter([
  {
    path: "ShoppingCart/",
    element: <Navigation />,
    children: [
      {
        index: true, element: <Children />
      },
      {
        path: ":page", element: <Children />,
      }
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CartProvider>
      <RouterProvider router={router} />
    </CartProvider>
  </StrictMode>,
)
