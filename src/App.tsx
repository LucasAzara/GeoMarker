// CSS
import { GlobalStyle } from './styles/global'
import { defaultTheme } from './styles/themes/default'
import { ThemeProvider } from 'styled-components'

// Pages
import { Router } from './Router'
import { BrowserRouter } from 'react-router-dom'

// Context
import { FormData } from './context/FormData'

export function App() {
  return (
    <>
      {/* Provides all the Default Colors of the Theme */}
      <ThemeProvider theme={defaultTheme}>
        {/* Browser Router used for Routes to be Accessible */}
        <BrowserRouter>
          {/* Context Data */}
          <FormData>
            {/* Pages */}
            <Router />
          </FormData>
          {/* Global Styles */}
          <GlobalStyle />
        </BrowserRouter>
      </ThemeProvider>
    </>
  )
}
