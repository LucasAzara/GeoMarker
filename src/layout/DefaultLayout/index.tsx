// CSS
import { LayoutContainer, LayoutBody } from './styles'
// Imports
import { Header } from '../../components/Header'
// Outlet
import { Outlet } from 'react-router-dom'
// Context
import { useContext } from 'react'
import { FormContext } from '../../context/FormData'
// Popup
import Swal from 'sweetalert2'

export function DefaultLayout() {
  const { loadState, handleSetLoadState } = useContext(FormContext)

  if (loadState === false) {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: `Unable to retrieve any of the votes right now, please try again later.`,
    })
    handleSetLoadState()
  }

  return (
    <LayoutBody>
      <LayoutContainer>
        <Header />
        {/* The 'children' equivalent in react router dom */}
        <Outlet />
      </LayoutContainer>
    </LayoutBody>
  )
}
