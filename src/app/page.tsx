import PlacesProvider from "../context/placesContext";
import MapsHomePage from "./maps/page";

export default function Home() {
  return (
    <PlacesProvider>
      <MapsHomePage />
    </PlacesProvider>
  );
}
