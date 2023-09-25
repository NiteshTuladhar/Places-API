"use client";

import PlacesAutocomplete from "./autocomp";
import useAppContext from "@/hooks/useAppContext";

const FormComponent = () => {
  const { isLoaded } = useAppContext();

  return <div>{!isLoaded ? <p></p> : <PlacesAutocomplete />}</div>;
};

export default FormComponent;
