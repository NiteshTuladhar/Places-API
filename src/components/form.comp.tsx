"use client";

import { useContext } from "react";
import PlacesAutocomplete from "./autocomp";
import { PlacesContext } from "@/context/placesContext";

const FormComponent = () => {
  const { isLoaded } = useContext(PlacesContext) as PlacesContextType;

  return <div>{!isLoaded ? <p></p> : <PlacesAutocomplete />}</div>;
};

export default FormComponent;
