import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from "@reach/combobox";
import "@reach/combobox/styles.css";
import { FormEvent, useContext } from "react";
import { PlacesContext } from "@/context/placesContext";

const PlacesAutocomplete = () => {
  const {
    ready,
    value,
    setValue,
    suggestions: { status, data },
    clearSuggestions,
  } = usePlacesAutocomplete();

  const { setKeyword, setPlaceId, setNearbyPlaces } = useContext(
    PlacesContext
  ) as PlacesContextType;

  const handleSelect = async (address: string) => {
    setValue(address, false);
    clearSuggestions();
    const results = await getGeocode({ address });
    const { lat, lng } = await getLatLng(results[0]);
    setNearbyPlaces([{ lat, lng }]);
    // setMarkerPlaced([{ lat, lng }]);
    setPlaceId(results[0].place_id);
    // setKeyword("");
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setKeyword(value);
    // setPlaceId(null);
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", gap: "5" }}>
      <div>
        <Combobox
          onSelect={handleSelect}
          onSubmit={(e) => {
            handleSubmit;
          }}
        >
          <ComboboxInput
            value={value}
            onChange={(e) => setValue(e.target.value)}
            disabled={!ready}
            className="combobox-input"
            placeholder="Search an address"
          />
          <ComboboxPopover>
            <ComboboxList>
              {status === "OK" &&
                data.map(({ place_id, description }) => (
                  <ComboboxOption key={place_id} value={description} />
                ))}
            </ComboboxList>
          </ComboboxPopover>
        </Combobox>
      </div>
      <button
        type="submit"
        style={{ backgroundColor: "#00A8D5", padding: "10px" }}
      >
        <p>Submit</p>
      </button>
    </form>
  );
};

export default PlacesAutocomplete;
function getNearbyPlaces() {
  throw new Error("Function not implemented.");
}

function getPlace() {
  throw new Error("Function not implemented.");
}
