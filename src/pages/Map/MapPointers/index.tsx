import { MapPointerContainer } from './styles'

import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
} from 'react-simple-maps'

import { MapPin } from 'phosphor-react'
import { useContext } from 'react'
import { FormContext } from '../../../context/FormData'

const geoUrl = 'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json'

export function MapPointer() {
  const { mapData } = useContext(FormContext)

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
        projectionConfig={{
          center: [20, 0],
        }}
      >
        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies.map((geo) => (
              <Geography
                key={geo.rsmKey}
                geography={geo}
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
          <Marker
            key={name}
            coordinates={[coordinates.at(0)!, coordinates.at(1)!]}
          >
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
