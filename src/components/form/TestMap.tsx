import { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';

import 'mapbox-gl/dist/mapbox-gl.css';

const MapboxExample = () => {
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const map = useRef<Map | null>(null);

  useEffect(() => {
    mapboxgl.accessToken =
      'pk.eyJ1Ijoia2xhemFyZXYiLCJhIjoiY202MnEzdTVjMGkwbzJxcHVkYzA5dm9ocyJ9.hWjIkYEkmRkkDczx4q8Wsw';

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      center: [-74.5, 40], // starting position [lng, lat]
      zoom: 9, // starting zoom
    });
  });

  return (
    <div
      style={{ height: '100%' }}
      ref={mapContainer}
      className="map-container"
    />
  );
};

export default MapboxExample;
