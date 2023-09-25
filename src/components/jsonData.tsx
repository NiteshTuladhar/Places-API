"use client";

import Loader from "./loader";
import { Circles as JsonLoader } from "react-loader-spinner";
import { JsonViewer } from "@textea/json-viewer";
import useAppContext from "@/hooks/useAppContext";

const JSONData = () => {
  const { jsonData, dataLoading } = useAppContext();

  return (
    <div className="text-container" style={{ overflow: "auto" }}>
      {dataLoading ? (
        <Loader Loader={JsonLoader} desc="Processing Data, Please wait" />
      ) : jsonData.length > 0 ? (
        <JsonViewer value={jsonData} />
      ) : (
        <p>No Location selected.</p>
      )}
    </div>
  );
};

export default JSONData;
