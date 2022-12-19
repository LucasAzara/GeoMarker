// Components
import { MapTable } from './MapTable'
import { MapPointer } from './MapPointers'
// CSS
import { MapContainer } from './styles'

export function Map() {
  return (
    <MapContainer>
      <MapTable />
      <MapPointer />
    </MapContainer>
  )
}
