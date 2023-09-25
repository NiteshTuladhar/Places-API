import { PlacesContext } from "@/context/placesContext";
import { useContext } from "react";

function useAppContext() {
  const context = useContext(PlacesContext) as PlacesContextType;
  if (!context) {
    throw new Error("useAppContext must be used inside the ContextProvider");
  }
  return context;
}

export default useAppContext;
