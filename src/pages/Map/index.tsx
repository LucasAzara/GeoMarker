// Components
import { MapTable } from './MapTable'
import { MapPointer } from './MapPointers'
// CSS
import { MapContainer } from './styles'
import { useContext } from 'react'
import { FormContext } from '../../context/FormData'
import Swal from 'sweetalert2'

export function Map() {
  const { loadState, handleSetLoadState } = useContext(FormContext)

  if (loadState === false) {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: `Unable to optain current votes, please try again later`,
    })
    handleSetLoadState()
  }

  return (
    <MapContainer>
      <MapTable />
      <MapPointer />
    </MapContainer>
  )
}
