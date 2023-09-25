import { SetValue, Status } from "use-places-autocomplete";

export {};

declare global {
  type PlacesContextType = {
    isLoaded: boolean;
    apiKey: string;
    placeId: number | null;
    setPlaceId: Dispatch<React.SetStateAction<number | null>>;
    keyword: string | null;
    setKeyword: Dispatch<React.SetStateAction<string | null>>;
    jsonData: unknown[];
    setJsonData: Dispatch<React.SetStateAction<unknown[]>>;
    dataLoading: boolean;
    setDataLoading: Dispatch<React.SetStateAction<boolean>>;
    markerPlaced: Coordinates[];
    setMarkerPlaced: Dispatch<React.SetStateAction<Coordinates[]>>;
    defaultPoints: Coordinates | null;
    setDefaultPoints: Dispatch<React.SetStateAction<Coordinates | null>>;
    nearbyPlaces: NearbyPlaces[];
    setNearbyPlaces: Dispatch<React.SetStateAction<NearbyPlaces[]>>;
    user: UserType | null;
    setUser: Dispatch<React.SetStateAction<UserType | null>>;
    getPlace: () => void;
    getNearbyPlaces: () => void;
  };

  interface Props {
    children: React.ReactNode;
  }

  interface Coordinates {
    lat: number;
    lng: number;
  }

  interface NearbyPlaces {
    location?: Coordinates;
    is_client: boolean;
    name: string;
  }
  // interface PlacesDataTypes {
  //   business_status: string;
  //   geometry: {
  //     location: {
  //       lat: number;
  //       lng:number;
  //     }
  //   }
  // }

  type PlacesAutoCompleteTypes = {
    handleSelect: (address: string) => Promise<void>;
    handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
    ready: boolean;
    value: string;
    status: Status;
    data: google.maps.places.AutocompletePrediction[];
    setValue: SetValue;
  };

  type UserType = {
    id: number;
    name: string;
    location: Coordinates;
    radius: number;
  };

  interface MarkerProps {
    open: Coordinates | null;
    point: NearbyPlaces;
    marker: string;
    index: number;
    handleToggleOpen: (location: Coordinates) => void;
  }
}
