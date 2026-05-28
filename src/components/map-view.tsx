'use client';

import { useEffect, useRef } from 'react';
import L from 'leaflet';

interface MapViewProps {
  latitude: number;
  longitude: number;
}

export function MapView({ latitude, longitude }: MapViewProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!containerRef.current || mapRef.current) {
      return;
    }

    const map = L.map(containerRef.current, {
      zoomControl: false,
      scrollWheelZoom: false,
      doubleClickZoom: false,
      boxZoom: false,
      keyboard: false,
      dragging: true,
      touchZoom: true,
    }).setView([latitude, longitude], 17);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> kaastöölised',
    }).addTo(map);

    L.marker([latitude, longitude], {
      icon: L.divIcon({
        className: '',
        html: '<div class="location-marker" aria-hidden="true"></div>',
        iconSize: [18, 18],
        iconAnchor: [9, 9],
      }),
      interactive: false,
    }).addTo(map);

    mapRef.current = map;

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, [latitude, longitude]);

  useEffect(() => {
    mapRef.current?.setView([latitude, longitude], mapRef.current.getZoom());
  }, [latitude, longitude]);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 z-0"
      aria-label="OpenStreetMap — sinu asukoht"
    />
  );
}
