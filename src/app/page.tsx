"use client";

import { useState } from "react";
import Map from "./components/maps";
import JSONData from "./components/jsonData";

export default function Home() {
  //acts as a global state
  const [placeId, setPlaceId] = useState(null);

  return (
    <div className="main-container">
      {/* Maps */}
      <Map setPlaceId={setPlaceId} />
      {/* JSON Data */}
      <JSONData placeId={placeId} />
    </div>
  );
}
