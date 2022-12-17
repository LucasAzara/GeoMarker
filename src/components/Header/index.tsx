// CSS
import { HeaderContainer, Logo, Tabs } from './styles'
// Icon
import { GlobeHemisphereWest, MapPinLine, Table } from 'phosphor-react'
// Links
import { NavLink } from 'react-router-dom'

export function Header() {
  return (
    <HeaderContainer>
      <Logo>
        <GlobeHemisphereWest size={64} />
        <h1>GeoMarker</h1>
      </Logo>
      <Tabs>
        <NavLink to="/">
          <Table size={46} />
        </NavLink>
        <NavLink to="/map">
          <MapPinLine size={46} />
        </NavLink>
      </Tabs>
    </HeaderContainer>
  )
}
