// Styles
import { MapPointerContainer } from './styles'
// Map Functions
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
} from 'react-simple-maps'
// Context
import { useContext } from 'react'
import { FormContext } from '../../../context/FormData'

// Image of the World used to determine where the coordinates will be
const geoUrl = 'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json'

export function MapPointer() {
  // Context
  const { mapData } = useContext(FormContext)

  // Map Markers Coordinations
  const markers = mapData.map((votes) => {
    return {
      name: votes.companyName,
      points: votes.vote * 10,
      coordinates: [votes.companyLong, votes.companyLat],
    }
  })

  return (
    <MapPointerContainer>
      <ComposableMap
        // Center the map a little more to the left
        projectionConfig={{
          center: [20, 0],
        }}
      >
        {/* Map Generator */}
        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies.map((geo) => (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                // Style of the Map
                style={{
                  default: {
                    fill: '#121214',
                  },
                  hover: {
                    fill: '#121214',
                  },
                  pressed: {
                    fill: '#121214',
                  },
                }}
              />
            ))
          }
        </Geographies>
        {markers.map(({ name, coordinates, points }) => (
          // Mark Coordinates
          <Marker
            key={name}
            coordinates={[coordinates.at(0)!, coordinates.at(1)!]}
          >
            {/* SVG used to point exact location on map */}
            <g
              fill="none"
              stroke="#00B37E"
              strokeWidth="1"
              strokeLinecap="round"
              strokeLinejoin="round"
              transform="translate(-12, -24)"
            >
              <circle cx="12" cy="10" r="3" />
              <path d="M12 21.7C17.3 17 20 13 20 10a8 8 0 1 0-16 0c0 3 2.7 6.9 8 11.7z" />
            </g>
            {/* Text Writing down the name of the company and how many points they have */}
            <text
              textAnchor="middle"
              y={5}
              x={0}
              style={{
                fontFamily: 'Roboto',
                fill: '#00B37E',
                fontSize: '8px',
              }}
            >
              {name}, {points}
            </text>
          </Marker>
        ))}
      </ComposableMap>
    </MapPointerContainer>
  )
}
