// CSS
import { LayoutContainer, LayoutBody } from './styles'
// Imports
import { Header } from '../../components/Header'
// Outlet
import { Outlet } from 'react-router-dom'

export function DefaultLayout() {
  return (
    <LayoutBody>
      <LayoutContainer>
        <Header />
        <Outlet />
      </LayoutContainer>
    </LayoutBody>
  )
}
