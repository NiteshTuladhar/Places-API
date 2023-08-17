export {};

declare global {
  type PlacesContextType = {
    placeId: number | null;
    setPlaceId: Dispatch<React.SetStateAction<number | null>>;
    keyword: string | null;
    setKeyword: Dispatch<React.SetStateAction<string | null>>;
    jsonData: any | null;
    setJsonData: Dispatch<React.SetStateAction<any | null>>;
    dataLoading: boolean;
    setDataLoading: Dispatch<React.SetStateAction<boolean>>;
    getPlace: () => void;
  };

  interface Props {
    children: React.ReactNode;
  }
}
