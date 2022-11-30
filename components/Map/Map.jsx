/* eslint-disable react/button-has-type */
import { useEffect, useState } from "react";
import L from "leaflet";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import classNames from "classnames/bind";

import iconRetinaUrl from "leaflet/dist/images/marker-icon-2x.png";
import iconUrl from "leaflet/dist/images/marker-icon.png";
import shadowUrl from "leaflet/dist/images/marker-shadow.png";

import styles from "./Map.module.css";
import "leaflet/dist/leaflet.css";

const CORS_HTTPS_PROXY =
  "https://allorigins.hexlet.app/raw?disableCache=true&url=";

const cn = classNames.bind(styles);

function Map() {
  const centerPosition = [56.838011, 60.597465];

  const [oknPositionsData, setOknPositionsData] = useState([]);
  const [isOknDataLoaded, setIsOknDataLoaded] = useState(false);
  const [isOknVisible, setIsOknVisible] = useState(true);

  const [housesPositionsData, setHousesPositionsData] = useState([]);
  const [isHousesLoaded, setIsHousesLoaded] = useState(false);
  const [isHousesVisible, setIsHousesVisible] = useState(true);

  const [dtpsPositionsData, setDtpsPositionsData] = useState([]);
  const [isDtpsLoaded, setIsDtpsLoaded] = useState(false);
  const [isDtpsVisible, setIsDtpsVisible] = useState(true);

  useEffect(() => {
    (async function init() {
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: iconRetinaUrl.src,
        iconUrl: iconUrl.src,
        shadowUrl: shadowUrl.src,
      });
    })();
  }, []);

  const reqOkn = new XMLHttpRequest();
  reqOkn.addEventListener("load", () => {
    if (isOknDataLoaded) {
      return;
    }
    setIsOknDataLoaded(true);
    setOknPositionsData(JSON.parse(reqOkn.responseText));
  });
  reqOkn.open(
    "GET",
    `${CORS_HTTPS_PROXY}http://51.178.191.76:1337/api/okns?populate=geometry`
  );
  reqOkn.send();

  const reqHouses = new XMLHttpRequest();
  reqHouses.addEventListener("load", () => {
    if (isHousesLoaded) {
      return;
    }
    setIsHousesLoaded(true);
    setHousesPositionsData(JSON.parse(reqHouses.responseText));
  });
  reqHouses.open(
    "GET",
    `${CORS_HTTPS_PROXY}http://51.178.191.76:1337/api/house?populate=geometry`
  );
  reqHouses.send();

  const reqDtps = new XMLHttpRequest();
  reqHouses.addEventListener("load", () => {
    if (isDtpsLoaded) {
      return;
    }
    setIsDtpsLoaded(true);
    setDtpsPositionsData(JSON.parse(reqDtps.responseText));
  });
  reqDtps.open("GET", "http://51.178.191.76:1337/api/dtps?populate=geometry");
  reqDtps.send();

  return (
    <span>
      <button
        className="bbb"
        onClick={() => setIsHousesVisible(!isHousesVisible)}
      >
        Houses
      </button>
      <button className="bbb" onClick={() => setIsOknVisible(!isOknVisible)}>
        Okns
      </button>
      <button className="bbb" onClick={() => setIsDtpsVisible(!isDtpsVisible)}>
        Dtps
      </button>
      <MapContainer
        center={centerPosition}
        scrollWheelZoom
        attributionControl={null}
        zoom={13}
        className={cn(styles.Map)}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {isHousesVisible ? (
          <HousesMarkers housesPositionsData={housesPositionsData} />
        ) : null}
        {isOknVisible ? (
          <OknMarkers oknPositionsData={oknPositionsData} />
        ) : null}
        {isDtpsVisible ? (
          <DtpsMarkers dtpsPositionsData={dtpsPositionsData} />
        ) : null}
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
