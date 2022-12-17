import 'styled-components'
import { defaultTheme } from '../styles/themes/default'

// Get type of defaultTheme
type ThemeType = typeof defaultTheme

// Customizing the default theme type of styled components
declare module 'styled-components' {
  export interface DefaultTheme extends ThemeType {}
}
