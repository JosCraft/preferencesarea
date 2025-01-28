import { Provider } from 'jotai'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import Routes from './routes/Routes'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider>
      <Routes />
    </Provider>
  </StrictMode>,
)
