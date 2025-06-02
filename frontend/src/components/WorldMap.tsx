import React, { useEffect, useRef, useState } from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';

interface WorldMapProps {
  onCountrySelect: (countryData: any) => void;
}

const WorldMap: React.FC<WorldMapProps> = ({ onCountrySelect }) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<maplibregl.Map | null>(null);
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);

  useEffect(() => {
    if (!mapContainer.current) return;

    map.current = new maplibregl.Map({
      container: mapContainer.current,
      style: 'https://api.maptiler.com/maps/basic-v2/style.json?key=YOUR_KEY',
      center: [0, 20],
      zoom: 1.5
    });

    map.current.addControl(new maplibregl.NavigationControl());

    map.current.on('load', () => {
      // Add country boundaries layer
      map.current?.addSource('countries', {
        type: 'vector',
        url: 'https://api.maptiler.com/tiles/countries-v3/tiles.json?key=YOUR_KEY'
      });

      map.current?.addLayer({
        id: 'country-fills',
        type: 'fill',
        source: 'countries',
        'source-layer': 'countries',
        paint: {
          'fill-color': '#334155',
          'fill-opacity': 0.5
        }
      });

      map.current?.addLayer({
        id: 'country-borders',
        type: 'line',
        source: 'countries',
        'source-layer': 'countries',
        paint: {
          'line-color': '#64748b',
          'line-width': 1
        }
      });

      // Add hover effect
      map.current?.addLayer({
        id: 'country-fills-hover',
        type: 'fill',
        source: 'countries',
        'source-layer': 'countries',
        paint: {
          'fill-color': '#2563eb',
          'fill-opacity': 0
        }
      });
    });

    // Handle country selection
    map.current.on('click', 'country-fills', (e) => {
      if (!e.features?.[0]) return;
      
      const countryName = e.features[0].properties?.name_en;
      setSelectedCountry(countryName);
      
      // Mock data for demonstration
      const mockCountryData = {
        name: countryName,
        gdp: Math.floor(Math.random() * 1000) + 'B USD',
        exports: Math.floor(Math.random() * 500) + 'B USD',
        imports: Math.floor(Math.random() * 500) + 'B USD',
        topPartners: ['USA', 'China', 'Germany', 'Japan'],
        tradeAgreements: ['NAFTA', 'ASEAN', 'EU']
      };
      
      onCountrySelect(mockCountryData);
    });

    // Handle hover effects
    let hoveredStateId: string | null = null;

    map.current.on('mousemove', 'country-fills', (e) => {
      if (e.features?.length) {
        if (hoveredStateId !== null) {
          map.current?.setFeatureState(
            { source: 'countries', sourceLayer: 'countries', id: hoveredStateId },
            { hover: false }
          );
        }
        hoveredStateId = e.features[0].id as string;
        map.current?.setFeatureState(
          { source: 'countries', sourceLayer: 'countries', id: hoveredStateId },
          { hover: true }
        );
      }
    });

    map.current.on('mouseleave', 'country-fills', () => {
      if (hoveredStateId !== null) {
        map.current?.setFeatureState(
          { source: 'countries', sourceLayer: 'countries', id: hoveredStateId },
          { hover: false }
        );
      }
      hoveredStateId = null;
    });

    return () => {
      map.current?.remove();
    };
  }, [onCountrySelect]);

  return (
    <div ref={mapContainer} className="w-full h-full rounded-lg overflow-hidden" />
  );
};

export default WorldMap;