export {};

declare global {
  type PlacesContextType = {
    apiKey: string;
    placeId: number | null;
    setPlaceId: Dispatch<React.SetStateAction<number | null>>;
    keyword: string | null;
    setKeyword: Dispatch<React.SetStateAction<string | null>>;
    jsonData: any | null;
    setJsonData: Dispatch<React.SetStateAction<any | null>>;
    dataLoading: boolean;
    setDataLoading: Dispatch<React.SetStateAction<boolean>>;
    markerPlaced: Coordinates[];
    setMarkerPlaced: Dispatch<React.SetStateAction<Coordinates[]>>;
    defaultPoints: Coordinates | null;
    setDefaultPoints: Dispatch<React.SetStateAction<Coordinates | null>>;
    nearbyPlaces: Coordinates[];
    setNearbyPlaces: Dispatch<React.SetStateAction<Coordinates[]>>;
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

  // interface PlacesDataTypes {
  //   business_status: string;
  //   geometry: {
  //     location: {
  //       lat: number;
  //       lng:number;
  //     }
  //   }
  // }
}
