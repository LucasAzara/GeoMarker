// React Router
import { Route, Routes } from 'react-router-dom'
// Imports
import { Home } from './pages/Home'
import { DefaultLayout } from './layout/DefaultLayout'
import { Map } from './pages/Map'

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<DefaultLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/map" element={<Map />} />
      </Route>
    </Routes>
  )
}
