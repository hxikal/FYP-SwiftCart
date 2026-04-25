import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './app/App'

// Import SEMUA fail style dari Figma
import './styles/tailwind.css'
import './styles/fonts.css'
import './styles/theme.css'
import './styles/index.css'
// Jika ada fail shadcn di luar folder styles:


import { CartProvider } from './app/context/CartContext'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <CartProvider>
      <App />
    </CartProvider>
  </React.StrictMode>,
)