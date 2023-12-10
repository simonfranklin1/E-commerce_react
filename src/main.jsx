import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import Products from './routes/Products.jsx'
import ProductPage from "./routes/ProductPage.jsx"
import { StoreContextProvider } from './context/StoreContext.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from "./routes/Home.jsx"
import Search from './routes/Search.jsx'
import Women from './routes/Women.jsx'
import Men from './routes/Men.jsx'
import Checkout from './routes/Checkout.jsx'
import Historic from './routes/Historic.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />
      },
      {
        path: "/produtos",
        element: <Products />
      },
      {
        path: "/feminino",
        element: <Women />
      },
      {
        path: "/masculino",
        element: <Men />
      },
      {
        path: "/produtos/:id",
        element: <ProductPage />
      },
      {
        path: "/buscar",
        element: <Search /> 
      },
      {
        path: "/comprar",
        element: <Checkout />
      },
      {
        path: "/historico",
        element: <Historic />
      }
    ]
  }
])


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <StoreContextProvider>
      <RouterProvider router={router} />
    </StoreContextProvider>
  </React.StrictMode>,
)
