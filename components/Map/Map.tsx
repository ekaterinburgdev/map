'use client';

import { useContext } from 'react';

import maplibregl from 'maplibre-gl';
import MapGl from 'react-map-gl';
import { COORDS_EKATERINBURG } from 'constants/coords';
import { MAX_ZOOM, MIN_ZOOM } from 'constants/map';

import { BuildingSource } from './layers/BuildingSource';
import { DesignCodeSource } from './layers/DesignCodeSource';
import { DtpSource } from './layers/DtpSource';
import { LinesSource } from './layers/LinesSource';
import { OknSource } from './layers/OknSource';
import { QuarterSource } from './layers/QuarterSource';
import { FacadeSource } from './layers/FacadeSource';
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
        latitude: COORDS_EKATERINBURG[1],
        longitude: COORDS_EKATERINBURG[0],
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
