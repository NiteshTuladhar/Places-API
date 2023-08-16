import { useState } from "react";
import { GoogleMap, Marker } from "@react-google-maps/api";
import "@reach/combobox/styles.css";
import PlacesAutocomplete from "./autocomp";
import { useLoadScript } from "@react-google-maps/api";

const Map = ({ setPlaceId }: any) => {
  const [selected, setSelected] = useState(null);
  const [defaultPoint, setDefaultPoint] = useState({
    lat: 44,
    lng: -80,
  });
  const apiKey: string = process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY as string;

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: apiKey,
    libraries: ["places"],
  });

  return (
    <div style={{ backgroundColor: "#d3d3d3" }}>
      {!isLoaded ? (
        // <Loader Loader={MapLoader} />
        <p></p>
      ) : (
        <>
          <div className="places-container">
            <PlacesAutocomplete
              setSelected={setSelected}
              setPlaceId={setPlaceId}
            />
          </div>
          <GoogleMap
            zoom={16}
            center={selected ? selected : defaultPoint}
            mapContainerClassName="map-container"
          >
            {selected && <Marker position={selected} />}
          </GoogleMap>
        </>
      )}
    </div>
  );
};

export default Map;
