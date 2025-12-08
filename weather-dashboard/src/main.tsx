import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter } from 'react-router-dom'
import { CitiesProvider } from './context/CitiesContext.tsx'

const client = new QueryClient()

createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={client}>
    <BrowserRouter>
      <CitiesProvider>
        <App />
      </CitiesProvider>
    </BrowserRouter>
  </QueryClientProvider>,
)
