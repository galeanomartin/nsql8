import React from "react";
import MarkerItem from "./MarkerItem";
import MarkerClusterGroup from "react-leaflet-markercluster";

const MarkerList = ({list}) => {
    return (
        <MarkerClusterGroup>
            {list.map((item)=>(
                <MarkerItem key={item.id} item={item} />
            ))}
        </MarkerClusterGroup>
    );
};

export default MarkerList;