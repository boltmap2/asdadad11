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
      style: 'https://api.maptiler.com/maps/streets/style.json?key=get_your_own_OpIi9ZULNHzrESv6T2vL',
      center: [0, 20],
      zoom: 1.5
    });

    map.current.addControl(new maplibregl.NavigationControl());

    map.current.on('load', () => {
      if (!map.current) return;

      // Add country boundaries layer
      map.current.addSource('countries', {
        type: 'geojson',
        data: 'https://d2ad6b4ur7yvpq.cloudfront.net/naturalearth-3.3.0/ne_50m_admin_0_countries.geojson'
      });

      map.current.addLayer({
        id: 'country-fills',
        type: 'fill',
        source: 'countries',
        layout: {},
        paint: {
          'fill-color': '#334155',
          'fill-opacity': 0.5
        }
      });

      map.current.addLayer({
        id: 'country-borders',
        type: 'line',
        source: 'countries',
        layout: {},
        paint: {
          'line-color': '#64748b',
          'line-width': 1
        }
      });

      map.current.addLayer({
        id: 'country-fills-hover',
        type: 'fill',
        source: 'countries',
        layout: {},
        paint: {
          'fill-color': '#2563eb',
          'fill-opacity': ['case', ['boolean', ['feature-state', 'hover'], false], 0.7, 0]
        }
      });
    });

    // Handle country selection
    map.current.on('click', 'country-fills', (e) => {
      if (!e.features?.[0]) return;
      
      const countryName = e.features[0].properties?.ADMIN || e.features[0].properties?.name;
      setSelectedCountry(countryName);
      
      const mockCountryData = {
        name: countryName,
        gdp: `${Math.floor(Math.random() * 1000)}B USD`,
        exports: `${Math.floor(Math.random() * 500)}B USD`,
        imports: `${Math.floor(Math.random() * 500)}B USD`,
        topPartners: ['United States', 'China', 'Germany', 'Japan', 'United Kingdom'],
        tradeAgreements: ['NAFTA', 'EU', 'ASEAN', 'MERCOSUR']
      };
      
      onCountrySelect(mockCountryData);
    });

    // Handle hover effects
    let hoveredStateId: number | null = null;

    map.current.on('mousemove', 'country-fills', (e) => {
      if (e.features?.length) {
        if (hoveredStateId) {
          map.current?.setFeatureState(
            { source: 'countries', id: hoveredStateId },
            { hover: false }
          );
        }
        hoveredStateId = e.features[0].id as number;
        map.current?.setFeatureState(
          { source: 'countries', id: hoveredStateId },
          { hover: true }
        );
      }
    });

    map.current.on('mouseleave', 'country-fills', () => {
      if (hoveredStateId) {
        map.current?.setFeatureState(
          { source: 'countries', id: hoveredStateId },
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