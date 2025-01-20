// MapComponent.tsx
import React, { useState, useEffect, useRef } from 'react';
import mapboxgl, { GeoJSONSource, Map, Marker } from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { MapIcon, Minus, Plus } from 'lucide-react';
import type { Feature, Polygon } from 'geojson';

// Ensure token is properly loaded from environment variables
if (!import.meta.env.VITE_MAPBOX_TOKEN) {
  console.error('Mapbox token is missing from environment variables');
}
mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN;

interface Location {
  latitude: number;
  longitude: number;
  radius: number;
  address?: string;
}

interface MapComponentProps {
  onLocationSelect: (location: Location) => void;
  initialLocation?: Location;
}

const MapComponent: React.FC<MapComponentProps> = ({
  onLocationSelect,
  initialLocation,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [location, setLocation] = useState<Location>(
    initialLocation || {
      // Vancouver coordinates
      latitude: 49.2827,
      longitude: -123.1207,
      radius: 2,
    },
  );

  const mapContainer = useRef<HTMLDivElement | null>(null);
  const map = useRef<Map | null>(null);
  const circle = useRef<GeoJSONSource | null>(null);
  const marker = useRef<Marker | null>(null);

  const initializeMap = () => {
    if (!mapContainer.current || map.current) return;

    try {
      map.current = new Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/streets-v12',
        center: [location.longitude, location.latitude],
        zoom: 10,
      });

      map.current.on('load', () => {
        if (!map.current) return;
        addCircleLayer();
        addMarker();
      });

      map.current.on('error', (e) => {
        console.error('Map error:', e);
        setError('Error loading map');
      });
    } catch (err) {
      console.error('Map initialization error:', err);
      setError('Failed to initialize map');
    }
  };

  const addCircleLayer = () => {
    if (!map.current) return;

    const circleData = createGeoJSONCircle(
      [location.longitude, location.latitude],
      location.radius,
    );

    map.current.addSource('circle', {
      type: 'geojson',
      data: circleData,
    });

    map.current.addLayer({
      id: 'circle-fill',
      type: 'fill',
      source: 'circle',
      paint: {
        'fill-color': '#4338ca',
        'fill-opacity': 0.2,
      },
    });

    map.current.addLayer({
      id: 'circle-outline',
      type: 'line',
      source: 'circle',
      paint: {
        'line-color': '#4338ca',
        'line-width': 2,
      },
    });

    circle.current = map.current.getSource('circle') as GeoJSONSource;
  };

  const addMarker = () => {
    if (!map.current) return;

    marker.current = new Marker({ draggable: true, color: '#4338ca' })
      .setLngLat([location.longitude, location.latitude])
      .addTo(map.current);

    marker.current.on('dragend', () => {
      const lngLat = marker.current?.getLngLat();
      if (lngLat) {
        updateLocation(lngLat.lat, lngLat.lng, location.radius);
      }
    });
  };

  const createGeoJSONCircle = (
    center: [number, number],
    radiusKm: number,
  ): Feature<Polygon> => {
    const points = 64;
    const coords: number[][] = [];

    for (let i = 0; i <= points; i++) {
      const angle = (i * 360) / points;
      const rad = (angle * Math.PI) / 180;
      const radiusDeg = radiusKm / 111.32;
      const lat = center[1] + radiusDeg * Math.sin(rad);
      const lng =
        center[0] +
        (radiusDeg * Math.cos(rad)) / Math.cos((center[1] * Math.PI) / 180);
      coords.push([lng, lat]);
    }

    return {
      type: 'Feature',
      geometry: {
        type: 'Polygon',
        coordinates: [coords],
      },
      properties: {},
    };
  };

  const updateLocation = async (lat: number, lng: number, rad: number) => {
    setLocation((prev) => ({
      ...prev,
      latitude: lat,
      longitude: lng,
      radius: rad,
    }));

    if (circle.current) {
      circle.current.setData(createGeoJSONCircle([lng, lat], rad));
    }

    if (map.current) {
      map.current.flyTo({ center: [lng, lat], duration: 1000 });
    }

    onLocationSelect({ latitude: lat, longitude: lng, radius: rad });
  };

  useEffect(() => {
    if (isModalOpen) {
      // Small delay to ensure container is ready
      const timer = setTimeout(() => {
        initializeMap();
      }, 100);

      return () => {
        clearTimeout(timer);
        // Clean up map instance and references
        if (marker.current) {
          marker.current.remove();
          marker.current = null;
        }
        if (map.current) {
          map.current.remove();
          map.current = null;
        }
        // Reset any mapbox-specific body styles that might affect scrolling
        document.body.style.overflow = '';
      };
    }
  }, [isModalOpen]);

  // Force map resize when modal opens
  useEffect(() => {
    if (isModalOpen && map.current) {
      // Small delay to handle modal transition
      const timer = setTimeout(() => {
        map.current?.resize();
      }, 100);

      return () => clearTimeout(timer);
    }
  }, [isModalOpen]);

  return (
    <>
      <Button
        type="button"
        onClick={() => setIsModalOpen(true)}
        className="flex items-center gap-2 bg-primary hover:bg-secondary"
      >
        <MapIcon className="h-5 w-5" />
        Select Location
      </Button>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-[800px]">
          <DialogHeader>
            <DialogTitle>Move marker to select Location and Radius</DialogTitle>
          </DialogHeader>

          <div className="grid gap-4">
            <div ref={mapContainer} className="h-[400px] w-full rounded-lg" />

            <div className="flex items-center gap-4 px-4">
              <Minus className="h-4 w-4" />
              <Slider
                value={[location.radius]}
                onValueChange={(newRadius) => {
                  updateLocation(
                    location.latitude,
                    location.longitude,
                    newRadius[0],
                  );
                }}
                min={1}
                max={30}
                step={1}
                className="flex-1"
              />
              <Plus className="h-4 w-4" />
              <span className="min-w-[60px] text-sm">{location.radius}km</span>
            </div>

            {error && <p className="text-sm text-red-500">{error}</p>}

            <Button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="w-full"
            >
              Confirm Location
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default MapComponent;
