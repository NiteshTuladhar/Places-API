import { useState, useEffect, useRef, useContext } from "react";
import axios from "axios";
import Loader from "./loader";
import { Circles as JsonLoader } from "react-loader-spinner";
import { JsonViewer } from "@textea/json-viewer";
import { PlacesContext } from "@/context/placesContext";

const JSONData = () => {
  const { jsonData, dataLoading } = useContext(
    PlacesContext
  ) as PlacesContextType;

  return (
    <div className="text-container">
      <div
        style={{
          display: "flex",
          marginBottom: "25px",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <p>Google Places API (JSON Format)</p>
      </div>
      {dataLoading ? (
        <Loader Loader={JsonLoader} desc="Processing Data, Please wait" />
      ) : jsonData ? (
        <JsonViewer value={jsonData} />
      ) : (
        <p>No Location selected.</p>
      )}
    </div>
  );
};

export default JSONData;
