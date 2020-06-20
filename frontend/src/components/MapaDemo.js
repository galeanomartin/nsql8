import React, { Fragment } from "react";
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import './../app.css';
import { markers } from "../utils/markers";

import MarkerClusterGroup from "react-leaflet-markercluster";
import { Container } from '@material-ui/core';

const MapaDemo = () => {
  return (
    <Fragment>
      <br />
      <div class="row justify-content-center">
        <h1>Aeropuertos del mundo</h1>
      </div>
      <br />
      <Container maxWidth="800">
        <Map center={[10.0, 5.0]} zoom={2} minZoom={2}>
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url='https://{s}.tile.osm.org/{z}/{x}/{y}.png'
          />
          <MarkerClusterGroup>
            {markers.map((item) => (
              <Marker position={[item.lat, item.lng]}>
                <Popup>
                  <b>Nombre: </b>{item.name} < br />
                  <b>Ciudad:</b> {item.city} < br />
                  <b>Cód. IATA: </b>{item.iata_faa} < br />
                  {/*ICAO: {m.icao} < br/>*/}
                  <b>Altitud: </b>{Math.round(item.alt * 0.3048)} m < br />
                  <b>Zona Horaria:</b> {item.tz}
                </Popup>
              </Marker>
            ))}
          </MarkerClusterGroup>
        </Map>
      </Container>
    </Fragment>
  );
};

export default MapaDemo;

