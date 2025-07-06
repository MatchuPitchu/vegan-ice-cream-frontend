import { IonReactRouter } from '@ionic/react-router'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import { App } from './app'
import { ThemeContextProvider } from './context/theme-context'

const container = document.getElementById('root')
const root = createRoot(container!)
root.render(
  <StrictMode>
    <ThemeContextProvider>
      <IonReactRouter>
        <App />
      </IonReactRouter>
    </ThemeContextProvider>
  </StrictMode>,
)
