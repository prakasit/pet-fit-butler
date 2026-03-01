"use client";

import type { LatLngExpression } from "leaflet";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet/dist/leaflet.css";
import { useEffect, useMemo } from "react";
import { MapContainer, Marker, Polyline, TileLayer, useMap } from "react-leaflet";

import type { Coordinates } from "@/lib/types";

interface FitBoundsProps {
  positions: LatLngExpression[];
}

function FitBounds({ positions }: FitBoundsProps) {
  const map = useMap();
  useEffect(() => {
    if (positions.length < 2) return;
    map.fitBounds(positions as [number, number][], { padding: [24, 24], maxZoom: 14 });
  }, [map, positions]);
  return null;
}

interface RouteMapProps {
  route: Coordinates[];
  className?: string;
}

export function RouteMap({ route, className = "" }: RouteMapProps) {
  const positions: LatLngExpression[] = useMemo(
    () => route.map((c) => [c.lat, c.lng] as LatLngExpression),
    [route],
  );

  if (!route.length) return null;

  return (
    <div className={`overflow-hidden rounded-xl [&_.leaflet-container]:z-0 ${className}`}>
      <MapContainer
        center={[route[0]!.lat, route[0]!.lng]}
        zoom={12}
        scrollWheelZoom
        className="h-full min-h-[200px] w-full rounded-xl"
        style={{ minHeight: 200 }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Polyline
          positions={positions}
          pathOptions={{
            color: "#6e9e8f",
            weight: 4,
            opacity: 0.9,
          }}
        />
        {route.map((point, index) => (
          <Marker key={`${point.lat}-${point.lng}-${index}`} position={[point.lat, point.lng]} />
        ))}
        <FitBounds positions={positions} />
      </MapContainer>
    </div>
  );
}
