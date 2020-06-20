import React, { useEffect, useState } from "react";
import { Marker, Popup } from 'react-leaflet';
import { greenIcon, blueIcon, goldIcon, redIcon, violetIcon, blackIcon } from '../utils/leafletIcons';
import { withRouter, Link } from 'react-router-dom';


const MarkerItem = ({ item }) => {

  //asignamos un color a un tipo de comida, o azul por defecto

  const [icon, setIcon] = useState(blueIcon);

  useEffect(() => {
    switch (item.cuisine) {
      case "American":
        setIcon(redIcon);
        break;
      case "Parrilla":
        setIcon(redIcon);
        break;
      case "Irish":
        setIcon(greenIcon);
        break;
      case "Sushi":
        setIcon(greenIcon);
        break;
      case "Chinese":
        setIcon(goldIcon);
        break;
      case "Cervecería":
        setIcon(goldIcon);
        break;
      case "Hamburgers":
        setIcon(violetIcon);
        break;
      case "Hamburguesas":
        setIcon(violetIcon);
        break;
      case "Pizza":
        setIcon(blackIcon);
        break;
      case "Pizzería":
        setIcon(blackIcon);
        break;
      case "Helados":
        setIcon(blueIcon);
        break;
      default:
        setIcon(blueIcon);
        break;
    }
  }, [])

  if ((item.address.coord[0]) && (item.address.coord[1])) {
    return (
      <Marker position={[item.address.coord[1], item.address.coord[0]]} icon={icon} >
        <Popup>
          <b>Nombre:</b> {item.name} < br />
          <b>Ciudad: </b>{item.borough}< br />
          <b>Dirección:</b> {item.address.street} {item.address.building}< br />
          <b>Menú principal: </b>{item.cuisine}< br />
          <Link type="button" to={`/restaurant/${item.id}`} >Ver más información....</Link>

        </Popup>
      </Marker>
    );
  } else {
    console.log(item);
    return null
  }

};

export default withRouter(MarkerItem);