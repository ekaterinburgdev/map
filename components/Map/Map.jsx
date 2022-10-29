import { useEffect, useState } from "react";
import L from "leaflet";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import classNames from "classnames/bind";

import iconRetinaUrl from "leaflet/dist/images/marker-icon-2x.png";
import iconUrl from "leaflet/dist/images/marker-icon.png";
import shadowUrl from "leaflet/dist/images/marker-shadow.png";

import styles from "./Map.module.css";
import "leaflet/dist/leaflet.css";

const cn = classNames.bind(styles);

function Map() {
  const centerPosition = [56.838011, 60.597465];

  const [positionsData, setPositionsData] = useState([]);
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  useEffect(() => {
    (async function init() {
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: iconRetinaUrl.src,
        iconUrl: iconUrl.src,
        shadowUrl: shadowUrl.src,
      });
    })();
  }, []);

  const req = new XMLHttpRequest();

  req.addEventListener("load", () => {
    if (isDataLoaded){
      return;
    }
    setIsDataLoaded(true);
    setPositionsData(JSON.parse(req.responseText));
  });

  req.open("GET", "https://map.ekaterinburg.design/api/map");
  req.send();

  return (
    <MapContainer
      center={centerPosition}
      scrollWheelZoom
      attributionControl={null}
      zoom={13}
      className={cn(styles.Map)}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <Markers positionsData={positionsData}/>
    </MapContainer>
  );
}

function Markers(positionsData){
  const markers = [];
  console.log(positionsData);
  //too strange thing that data saves to prop that called like parent object
  for (const p of positionsData.positionsData){
    const parsedCoords = p.coords.split(", ").map(x => Number(x));
    
    markers.push(
      <Marker position={parsedCoords}>
        <Popup>{p.name}</Popup>
      </Marker>
    );
  }

  return markers;
}

export default Map;
