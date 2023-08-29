import { useContext, useState } from "react";
import { GoogleMap, MarkerF as Marker } from "@react-google-maps/api";
import "@reach/combobox/styles.css";
import PlacesAutocomplete from "./autocomp";
import { useLoadScript } from "@react-google-maps/api";
import { PlacesContext } from "../context/placesContext";
import location from "../../public/location.svg";

const Map = () => {
  const { apiKey, markerPlaced, setMarkerPlaced, defaultPoints, nearbyPlaces } =
    useContext(PlacesContext) as PlacesContextType;
  console.log("🚀 ~ file: maps.tsx:10 ~ Map ~ selected:", nearbyPlaces);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: apiKey,
    libraries: ["places"],
  });

  function placeMarker(e: google.maps.MapMouseEvent) {
    setMarkerPlaced([{ lat: e.latLng?.lat(), lng: e.latLng?.lng() }]);
  }
  return (
    <div style={{ backgroundColor: "#d3d3d3" }}>
      {!isLoaded ? (
        // <Loader Loader={MapLoader} />
        <p></p>
      ) : (
        <>
          <div className="places-container">
            <PlacesAutocomplete />
          </div>
          <GoogleMap
            onClick={(e: google.maps.MapMouseEvent) => {
              placeMarker(e);
            }}
            zoom={16}
            center={
              nearbyPlaces.length > 0
                ? nearbyPlaces[0]
                : (defaultPoints as Coordinates)
            }
            mapContainerClassName="map-container"
          >
            {/* {selected && <Marker position={selected[0]} />} */}
            {nearbyPlaces
              ? nearbyPlaces.map((point, index) => {
                  return (
                    <Marker
                      position={point}
                      key={index}
                      icon={{
                        url: "https://www.svgrepo.com/show/399139/location-man-alt.svg",
                        // url: require("../../public/location.svg"),
                        anchor: new google.maps.Point(17, 46),
                        scaledSize: new google.maps.Size(37, 37),
                      }}
                    />
                  );
                })
              : ""}

            {markerPlaced
              ? markerPlaced.map((marker, index) => {
                  return (
                    <Marker
                      position={marker}
                      key={index}
                      // icon={{
                      //   url: "https://www.svgrepo.com/show/399139/location-man-alt.svg",
                      //   // url: require("../../public/location.svg"),
                      //   anchor: new google.maps.Point(17, 46),
                      //   scaledSize: new google.maps.Size(37, 37),
                      // }}
                    />
                  );
                })
              : ""}
          </GoogleMap>
        </>
      )}
    </div>
  );
};

export default Map;
