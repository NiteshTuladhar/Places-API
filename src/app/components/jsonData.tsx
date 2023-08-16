import { useState, useEffect, useRef } from "react";
import axios from "axios";
import Loader from "./loader";
import { Circles as JsonLoader } from "react-loader-spinner";
import { JsonViewer } from "@textea/json-viewer";
("@textea/json-viewer");

const JSONData = ({ placeId }: any) => {
  const isFirstRender = useRef(true);
  const [dataLoading, setDataLoding] = useState(false);
  const [jsonData, setJsonData] = useState(null);

  useEffect(() => {
    //To prevent useEffect from running on initial page load.
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    setDataLoding(true);
    setTimeout(() => {
      axios
        .get(`http://localhost:3000/api/maps?placeid=${placeId}`)
        .then((res: any) => {
          setJsonData(res.data.result);
        })
        .then(() => {
          setDataLoding(false);
        });
    }, 1000);
  }, [placeId]);

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
