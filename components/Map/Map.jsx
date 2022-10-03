import { useEffect } from "react";
import L from "leaflet";

import classNames from "classnames/bind";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

import styles from "./Map.module.css";
import "leaflet/dist/leaflet.css";

import iconRetinaUrl from "leaflet/dist/images/marker-icon-2x.png";
import iconUrl from "leaflet/dist/images/marker-icon.png";
import shadowUrl from "leaflet/dist/images/marker-shadow.png";

const cn = classNames.bind(styles);

function Map() {
  const position = [56.838011, 60.597465];

  useEffect(() => {
    (async function init() {
      delete L.Icon.Default.prototype._getIconUrl;

      L.Icon.Default.mergeOptions({
        iconRetinaUrl: iconRetinaUrl.src,
        iconUrl: iconUrl.src,
        shadowUrl: shadowUrl.src,
      });
    })();
  }, []);

  return (
    <MapContainer
      center={position}
      scrollWheelZoom={true}
      attributionControl={null}
      zoom={13}
      className={cn(styles.Map)}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={position}>
        <Popup>Popup test</Popup>
      </Marker>
    </MapContainer>
  );
}

export default Map;
