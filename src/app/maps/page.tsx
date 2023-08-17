"use client";

import JSONData from "@/components/jsonData";
import Map from "@/components/maps";

const MapHomePage = () => {
  return (
    <div className="main-container">
      {/* Maps */}
      <Map />
      {/* JSON Data */}
      <JSONData />
    </div>
  );
};

export default MapHomePage;
