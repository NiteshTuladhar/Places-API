import React from "react";
import { MarkerF, InfoWindow } from "@react-google-maps/api";

const CustomMarker = ({
  open,
  point,
  index,
  marker,
  handleToggleOpen,
}: MarkerProps) => {
  console.log(point);

  if (point.name == "Fursad Cafe") {
    console.log("Fursad cafe", marker);
  }
  return (
    <MarkerF
      position={point.location!}
      key={index}
      title={point.name}
      icon={{
        url: marker,
        // url: require("../../public/location.svg").default,
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
              <p style={{ fontSize: "16px", fontWeight: "bold" }}>
                {point.name}
              </p>
            </div>
          </InfoWindow>
        )}
    </MarkerF>
  );
};

export default CustomMarker;
