import React, { useEffect } from "react";
import L from "leaflet";

require("dotenv").config();

const ACCESS_TOKEN = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;

export default function Map({ data, lng, lat }) {
  useEffect(() => {
    let mymap = L.map("mapid").setView([lat, lng], 16);

    L.tileLayer(
      "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}",
      {
        attribution:
          'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 20,
        zoomOffset: -1,
        id: "mapbox/streets-v11",
        tileSize: 512,
        accessToken: ACCESS_TOKEN,
      }
    ).addTo(mymap);

    data.forEach((restaurant) => {
      const marker = L.marker([restaurant.lat, restaurant.long]).addTo(mymap);
      marker.bindPopup(restaurant.name + " at " + restaurant.addressbi);
    });

    L.circle([lat, lng], {
      color: "#AC3931",
      fillColor: "#AC3931",
      fillOpacity: "0.5",
      radius: 50,
    }).addTo(mymap);

    return () => {
      mymap.remove();
    };
  }, [data, lat, lng]);

  return <div style={{ height: "35vh" }} id="mapid"></div>;
}
