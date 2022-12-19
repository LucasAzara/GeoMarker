// CSS
import { HeaderContainer, Logo, Tabs } from './styles'
// Icon
import { GlobeHemisphereWest, MapPinLine, Table } from 'phosphor-react'
// Links
import { NavLink } from 'react-router-dom'

export function Header() {
  return (
    <HeaderContainer>
      {/* Logo */}
      <Logo>
        <NavLink to="/">
          <GlobeHemisphereWest />
          <h1>GeoMarker</h1>
        </NavLink>
      </Logo>
      {/* Menu */}
      <Tabs>
        <NavLink to="/">
          <Table />
        </NavLink>
        <NavLink to="/map">
          <MapPinLine />
        </NavLink>
      </Tabs>
    </HeaderContainer>
  )
}
