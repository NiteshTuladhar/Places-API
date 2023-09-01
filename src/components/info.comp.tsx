import { InfoWindow } from "@react-google-maps/api";

const MarkerInfoPopUp = ({ name, is_client }: NearbyPlaces) => {
  return (
    <InfoWindow>
      <p>{name}</p>
    </InfoWindow>
  );
};

export default MarkerInfoPopUp;
