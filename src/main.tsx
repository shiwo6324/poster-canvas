import React from 'react'
import ReactDOM from 'react-dom/client'
import '@mantine/core/styles.css'
import { MantineProvider } from '@mantine/core'
import { Toaster } from 'sonner'

import App from './App'
import '../src/index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <MantineProvider>
      <Toaster />

      <App />
    </MantineProvider>
  </React.StrictMode>,
)
