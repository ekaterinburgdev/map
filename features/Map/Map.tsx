'use client';

import { useContext } from 'react';

import maplibregl from 'maplibre-gl';
import MapGl from 'react-map-gl';
import { MAX_ZOOM, MIN_ZOOM, CENTER_COORDS } from 'constants/map';

import { BuildingSource } from 'features/Building/BuildingSource';
import { DesignCodeSource } from 'features/DesignCode/DesignCodeSource';
import { DtpSource } from 'features/DTP/DtpSource';
import { LinesSource } from 'features/Lines/LinesSource';
import { OknSource } from 'features/OKN/OknSource';
import { QuarterSource } from 'features/Quarter/QuarterSource';
import { FacadeSource } from 'features/Facade/FacadeSource';
import { MapContext } from './providers/MapProvider';

import 'maplibre-gl/dist/maplibre-gl.css';

function MapLayers() {
  return (
    <>
      <BuildingSource />
      <OknSource />
      <DtpSource />
      <LinesSource />
      <DesignCodeSource />
      <QuarterSource />
      <FacadeSource />
    </>
  );
}

export function Map() {
  const { loading, setLoading } = useContext(MapContext);

  return (
    <MapGl
      id="ekbMap"
      initialViewState={{
        latitude: CENTER_COORDS[1],
        longitude: CENTER_COORDS[0],
        zoom: 15,
        pitch: 0,
      }}
      minZoom={MIN_ZOOM}
      maxZoom={MAX_ZOOM}
      // hash
      style={{ width: '100vw', height: '100vh', color: 'black' }}
      mapStyle="https://map-backend.netlify.app/style.json"
      // @ts-ignore
      mapLib={maplibregl}
      antialias
      reuseMaps
      onLoad={() => setLoading(false)}
      // Disable RTL plugin
      RTLTextPlugin={null}
    >
      {!loading && <MapLayers />}
    </MapGl>
  );
}
