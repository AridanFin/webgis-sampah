import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
  useMap
} from 'react-leaflet'

import { useState, useEffect } from 'react'

import {
  GeoSearchControl,
  OpenStreetMapProvider
} from 'leaflet-geosearch'

import 'leaflet/dist/leaflet.css'
import 'leaflet-geosearch/dist/geosearch.css'

function SearchField() {

  const map = useMap()

  useEffect(() => {

    const provider = new OpenStreetMapProvider()

    const searchControl = new GeoSearchControl({
      provider,
      style: 'bar',
      showMarker: true,
      showPopup: false,
      autoClose: true,
      retainZoomLevel: false,
      animateZoom: true
    })

    map.addControl(searchControl)

    return () => map.removeControl(searchControl)

  }, [map])

  return null
}

function LocationMarker({ setPosition }) {

  const [position, setPos] = useState(null)

  useMapEvents({
    click(e) {

      const latlng = e.latlng

      setPos(latlng)
      setPosition(latlng)
    }
  })

  return position === null ? null : (
    <Marker position={position}>
      <Popup>
        Lokasi Dipilih
      </Popup>
    </Marker>
  )
}

export default function Map({ setPosition }) {

  return (
    <MapContainer
      center={[-7.8011945, 110.364917]}
      zoom={13}
      style={{
        height: '400px',
        width: '100%',
        borderRadius: '15px'
      }}
    >

      <TileLayer
        attribution='OpenStreetMap'
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
      />

      <SearchField />

      <LocationMarker setPosition={setPosition} />

    </MapContainer>
  )
}