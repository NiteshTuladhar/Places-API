"use client";

import React, { createContext, FC, useState, Dispatch } from "react";
import axios from "axios";

export const PlacesContext = createContext<PlacesContextType | null>(null);

const PlacesProvider: FC<Props> = ({ children }) => {
  const [placeId, setPlaceId] = useState<number | null>(null);
  const [keyword, setKeyword] = useState<string | null>("");

  //for json view
  const [jsonData, setJsonData] = useState<any | null>(null);
  const [dataLoading, setDataLoading] = useState<boolean>(false);

  function getPlace() {
    setTimeout(() => {
      axios
        .get(`http://localhost:3000/api/maps?placeid=${placeId}`)
        .then((res: any) => {
          setJsonData(res.data.result);
        })
        .then(() => {
          setDataLoading(false);
        });
    }, 1000);
  }
  return (
    <PlacesContext.Provider
      value={{
        placeId,
        setPlaceId,
        keyword,
        setKeyword,
        jsonData,
        setJsonData,
        dataLoading,
        setDataLoading,
        getPlace,
      }}
    >
      {children}
    </PlacesContext.Provider>
  );
};

export default PlacesProvider;
