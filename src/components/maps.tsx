"use client";

import { useContext, useState } from "react";
import {
  GoogleMap,
  MarkerF as Marker,
  InfoWindow,
} from "@react-google-maps/api";
import "@reach/combobox/styles.css";
import { PlacesContext } from "../context/placesContext";
import location from "../../public/location.svg";
import MarkerInfoPopUp from "./info.comp";

const Map = () => {
  const greenMarker =
    "https://lh3.googleusercontent.com/drive-viewer/AITFw-yvL0TWywWBqcrUFRNoEx_mMvErDJPnX4EulzKWVj2AqVPmSK9UlEhgGkhr7nTRXqtlFGyrFSlOiMr8XxILw1FFiGfL=s1600";
  const blueMarker =
    "https://lh3.googleusercontent.com/drive-viewer/AITFw-x0S5sbin6-53mtCVUJr9HAhxhfTSBEeHFM5XeLHh0I8eJ_3-SrBP-1T6W--gRrwVotnKome7Y3yoty9QBtfbFP3_fb=s1600";

  const {
    isLoaded,
    apiKey,
    markerPlaced,
    setMarkerPlaced,
    defaultPoints,
    nearbyPlaces,
  } = useContext(PlacesContext) as PlacesContextType;

  const [open, setOpen] = useState<Coordinates | null>(null);
  function placeMarker(e: google.maps.MapMouseEvent) {
    setMarkerPlaced([{ lat: e.latLng?.lat(), lng: e.latLng?.lng() }]);
  }

  function handleToggleOpen(location: Coordinates) {
    setOpen(location);
  }
  return (
    <div style={{ backgroundColor: "#d3d3d3" }}>
      {!isLoaded ? (
        // <Loader Loader={MapLoader} />
        <p></p>
      ) : (
        <>
          <GoogleMap
            onClick={(e: google.maps.MapMouseEvent) => {
              placeMarker(e);
            }}
            zoom={14}
            center={
              nearbyPlaces.length > 0
                ? nearbyPlaces[0].location
                : (defaultPoints as Coordinates)
            }
            mapContainerClassName="map-container"
          >
            {/* {selected && <Marker position={selected[0]} />} */}
            {nearbyPlaces
              ? nearbyPlaces.map((point, index) => {
                  let marker = null;
                  if (point.is_client === true) {
                    marker =
                      "https://www.svgrepo.com/show/513552/location-pin.svg";
                  } else {
                    marker =
                      "https://www.svgrepo.com/show/452052/location-marker.svg";
                  }
                  return (
                    <Marker
                      position={point.location!}
                      key={index}
                      title={point.name}
                      icon={{
                        url: marker,
                        // url: require("../../public/location.svg"),
                        anchor: new google.maps.Point(17, 46),
                        scaledSize: new google.maps.Size(37, 37),
                      }}
                      onClick={() => {
                        handleToggleOpen(point.location!);
                      }}
                    >
                      {open?.lat === point.location?.lat &&
                        open?.lng === point.location?.lng && (
                          // <MarkerInfoPopUp
                          //   name={point.name}
                          //   is_client={point.is_client}
                          // />
                          <InfoWindow>
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "column",
                              }}
                            >
                              <p
                                style={{ fontSize: "16px", fontWeight: "bold" }}
                              >
                                {point.name}
                              </p>
                            </div>
                          </InfoWindow>
                        )}
                    </Marker>
                  );
                })
              : ""}

            {markerPlaced
              ? markerPlaced.map((marker, index) => {
                  return <Marker position={marker} key={index} />;
                })
              : ""}
          </GoogleMap>
        </>
      )}
    </div>
  );
};

export default Map;
