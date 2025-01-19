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
import { Input } from '@/components/ui/input';
import { MapIcon, Minus, Plus, Search, Loader2 } from 'lucide-react';
import { GeoJSONFeature } from 'mapbox-gl';

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

interface GeocodingResult {
  place_name: string;
  center: [number, number];
}

const MapComponent: React.FC<MapComponentProps> = ({
  onLocationSelect,
  initialLocation,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<GeocodingResult[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [location, setLocation] = useState<Location>(
    initialLocation || {
      latitude: 40.7128,
      longitude: -74.006,
      radius: 5,
    },
  );

  const mapContainer = useRef<HTMLDivElement | null>(null);
  const map = useRef<Map | null>(null);
  const circle = useRef<GeoJSONSource | null>(null);
  const marker = useRef<Marker | null>(null);
  const searchTimeout = useRef<NodeJS.Timeout>();

  const initializeMap = () => {
    if (!mapContainer.current || map.current) return;

    try {
      map.current = new Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/streets-v12',
        center: [location.longitude, location.latitude],
        zoom: 12,
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
      data: circleData as GeoJSONFeature,
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
        reverseGeocode(lngLat.lat, lngLat.lng);
      }
    });
  };

  const createGeoJSONCircle = (
    center: [number, number],
    radiusKm: number,
  ): GeoJSONFeature => {
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
      circle.current.setData(createGeoJSONCircle([lng, lat], rad) as any);
    }

    if (map.current) {
      map.current.flyTo({ center: [lng, lat], duration: 1000 });
    }

    onLocationSelect({ latitude: lat, longitude: lng, radius: rad });
  };

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
          searchQuery,
        )}.json?access_token=${mapboxgl.accessToken}&limit=5`,
      );

      if (!response.ok) throw new Error('Search failed');

      const data = await response.json();
      setSearchResults(
        data.features.map((f: any) => ({
          place_name: f.place_name,
          center: f.center,
        })),
      );
    } catch (err) {
      setError('Search failed. Please try again.');
      console.error('Search error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const reverseGeocode = async (lat: number, lng: number) => {
    try {
      const response = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json?access_token=${mapboxgl.accessToken}`,
      );

      if (!response.ok) throw new Error('Reverse geocoding failed');

      const data = await response.json();
      if (data.features?.length > 0) {
        setLocation((prev) => ({
          ...prev,
          address: data.features[0].place_name,
        }));
      }
    } catch (err) {
      console.error('Reverse geocoding error:', err);
    }
  };

  useEffect(() => {
    if (isModalOpen) {
      initializeMap();
    }

    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, [initializeMap, isModalOpen]);

  useEffect(() => {
    if (searchTimeout.current) {
      clearTimeout(searchTimeout.current);
    }

    if (searchQuery) {
      searchTimeout.current = setTimeout(handleSearch, 500);
    } else {
      setSearchResults([]);
    }

    return () => {
      if (searchTimeout.current) {
        clearTimeout(searchTimeout.current);
      }
    };
  }, [handleSearch, searchQuery]);

  return (
    <>
      <Button
        type="button"
        onClick={() => setIsModalOpen(true)}
        className="flex items-center gap-2"
      >
        <MapIcon className="h-5 w-5" />
        Select Location
        {location.address && (
          <span className="ml-2 text-sm text-gray-600">
            ({location.address.split(',')[0]})
          </span>
        )}
      </Button>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-[800px]">
          <DialogHeader>
            <DialogTitle>Select Location and Radius</DialogTitle>
          </DialogHeader>

          <div className="grid gap-4">
            <div className="relative">
              <div className="relative">
                <Input
                  type="text"
                  placeholder="Search for a location..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pr-10"
                />
                {isLoading ? (
                  <Loader2 className="absolute right-3 top-2.5 h-5 w-5 animate-spin text-gray-400" />
                ) : (
                  <Search className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
                )}
              </div>

              {searchResults.length > 0 && (
                <div className="absolute z-10 mt-1 w-full rounded-md border border-gray-200 bg-white shadow-lg">
                  {searchResults.map((result, index) => (
                    <button
                      key={index}
                      className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100 focus:bg-gray-100 focus:outline-none"
                      onClick={() => {
                        updateLocation(
                          result.center[1],
                          result.center[0],
                          location.radius,
                        );
                        setSearchQuery('');
                        setSearchResults([]);
                      }}
                    >
                      {result.place_name}
                    </button>
                  ))}
                </div>
              )}
            </div>

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
                max={50}
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
