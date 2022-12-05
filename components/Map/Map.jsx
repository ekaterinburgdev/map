/* eslint-disable react/button-has-type */
import { useEffect, useState } from "react";
import L from "leaflet";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import classNames from "classnames/bind";

import iconRetinaUrl from "leaflet/dist/images/marker-icon-2x.png";
import iconUrl from "leaflet/dist/images/marker-icon.png";

import styles from "./Map.module.css";
import "leaflet/dist/leaflet.css";

const cn = classNames.bind(styles);

function Map() {
  const centerPosition = [56.838011, 60.597465];

  const [oknPositionsData, setOknPositionsData] = useState([]);
  const [isOknVisible, setIsOknVisible] = useState(true);

  const [housesPositionsData, setHousesPositionsData] = useState([]);
  const [isHousesVisible, setIsHousesVisible] = useState(true);

  const [dtpsPositionsData, setDtpsPositionsData] = useState([]);
  const [isDtpsVisible, setIsDtpsVisible] = useState(true);

  useEffect(() => {
    (async function init() {
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: iconRetinaUrl.src,
        iconUrl: iconUrl.src,
        shadowUrl: "",
      });
    })();

    fetch(
      "https://map-api.ekaterinburg.io/api/okns?populate=geometry&pagination[pageSize]=600"
    )
      .then((response) => response.json())
      .then((data) => setOknPositionsData(data));

    fetch(
      "https://map-api.ekaterinburg.io/api/dtps?populate=geometry&pagination[pageSize]=3000"
    )
      .then((response) => response.json())
      .then((data) => setDtpsPositionsData(data));

    fetch(
      "https://map-api.ekaterinburg.io/api/house?populate=geometry&pagination[pageSize]=3000"
    )
      .then((response) => response.json())
      .then((data) => setHousesPositionsData(data));
  }, []);

  return (
    <span>
      <button className="bbb" onClick={() => setIsOknVisible(!isOknVisible)}>
        Okns <br /> (600/759)
      </button>
      <button className="bbb" onClick={() => setIsDtpsVisible(!isDtpsVisible)}>
        Dtps (3000/7922)
      </button>
      <button
        className="bbb"
        onClick={() => setIsHousesVisible(!isHousesVisible)}
      >
        Houses (3000/7837)
      </button>
      <MapContainer
        center={centerPosition}
        scrollWheelZoom
        attributionControl={null}
        zoom={13}
        className={cn(styles.Map)}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {isHousesVisible && (
          <HousesMarkers housesPositionsData={housesPositionsData} />
        )}
        {isOknVisible && <OknMarkers oknPositionsData={oknPositionsData} />}
        {isDtpsVisible && <DtpsMarkers dtpsPositionsData={dtpsPositionsData} />}
      </MapContainer>
    </span>
  );
}

function OknMarkers(oknPositionsData) {
  const markers = [];
  if (
    !oknPositionsData.oknPositionsData ||
    !oknPositionsData.oknPositionsData.data
  )
    return;
  for (const p of oknPositionsData.oknPositionsData.data) {
    const coords = p.attributes.geometry.coordinates;
    markers.push(
      <Marker position={[coords[1], coords[0]]}>
        <Popup>okn</Popup>
      </Marker>
    );
  }

  // eslint-disable-next-line consistent-return
  return markers;
}

function HousesMarkers(housesPositionsData) {
  const markers = [];
  if (
    !housesPositionsData.housesPositionsData ||
    !housesPositionsData.housesPositionsData.data
  )
    return;
  for (const p of housesPositionsData.housesPositionsData.data) {
    const coords = p.attributes.geometry.coordinates;
    markers.push(
      <Marker position={[coords[1], coords[0]]}>
        <Popup>house</Popup>
      </Marker>
    );
  }

  // eslint-disable-next-line consistent-return
  return markers;
}

function DtpsMarkers(dtpsPositionsData) {
  const markers = [];
  if (
    !dtpsPositionsData.dtpsPositionsData ||
    !dtpsPositionsData.dtpsPositionsData.data
  )
    return;
  for (const p of dtpsPositionsData.dtpsPositionsData.data) {
    const coords = p.attributes.geometry.coordinates;
    markers.push(
      <Marker position={[coords[1], coords[0]]}>
        <Popup>dtp</Popup>
      </Marker>
    );
  }

  // eslint-disable-next-line consistent-return
  return markers;
}

export default Map;
