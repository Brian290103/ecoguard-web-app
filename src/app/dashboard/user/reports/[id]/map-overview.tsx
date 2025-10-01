"use client";

interface MapOverviewProps {
  latitude: number;
  longitude: number;
}

export const MapOverview = ({ latitude, longitude }: MapOverviewProps) => {
  return (
    <div className="w-full h-64 rounded-md overflow-hidden">Hello World!</div>
  );
};
