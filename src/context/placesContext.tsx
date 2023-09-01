"use client";

import React, { createContext, FC, useState, useEffect, useRef } from "react";
import axios from "axios";
import { useLoadScript } from "@react-google-maps/api";

export const PlacesContext = createContext<PlacesContextType | null>(null);

const PlacesProvider: FC<Props> = ({ children }) => {
  const apiKey: string = process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY as string;
  const [placeId, setPlaceId] = useState<number | null>(null);
  const [keyword, setKeyword] = useState<string | null>("");

  //for json view
  const [jsonData, setJsonData] = useState<any[]>([]);
  const [dataLoading, setDataLoading] = useState<boolean>(false);

  const [markerPlaced, setMarkerPlaced] = useState<Coordinates[]>([]);
  const [defaultPoints, setDefaultPoints] = useState<Coordinates | null>(null);
  const [nearbyPlaces, setNearbyPlaces] = useState<NearbyPlaces[]>([]);

  const [user, setUser] = useState<UserType | null>(null);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: apiKey,
    libraries: ["places"],
  });

  function getPlace() {
    setDataLoading(true);
    setTimeout(() => {
      axios
        .get(`http://localhost:3000/api/maps?placeid=${placeId}`)
        .then((res: any) => {
          setJsonData([res.data.result]);
        })
        .then(() => {
          setDataLoading(false);
        });
    }, 1000);
  }

  function getNearbyPlaces() {
    setDataLoading(true);

    //TODO:This needs to be dynamic
    const type = keyword;
    // console.log(
    //   "🚀 ~ file: placesContext.tsx:47 ~ getNearbyPlaces ~ markerPlaced:",
    //   markerPlaced
    // );
    const location =
      markerPlaced.length > 0
        ? `${markerPlaced[0].lat}%2C${markerPlaced[0].lng}`
        : `${defaultPoints?.lat}%2C${defaultPoints?.lng}`;
    const radius = user?.radius;

    setTimeout(() => {
      axios
        .get(
          `http://localhost:3000/api/nearby-places?keyword=${keyword}&type=${type}&location=${location}&radius=${radius}`
        )
        .then((res: any) => {
          setJsonData(res.data.results);
        })
        .then(() => {
          setDataLoading(false);
        });
    }, 1000);
  }

  const isFirstRender = useRef(true);
  const isFirstRender2 = useRef(true);
  const isFirstRender3 = useRef(true);

  //Sets marker positions on the map view after location's jsonData has been fetched
  useEffect(() => {
    let geometryList: any = [];

    jsonData
      ? jsonData.forEach((each: any) => {
          geometryList.push({
            location: each.geometry.location,
            is_client: each.is_client,
            name: each.name,
          });
        })
      : "";
    setNearbyPlaces(geometryList);
  }, [jsonData]);

  //Sets initial location points for default map view
  useEffect(() => {
    setDefaultPoints({
      lat: 27.68518442010728,
      lng: 85.31616217010729,
    });
  }, []);

  //Fetches the nearby location datas for the searched keyword.
  useEffect(() => {
    //To prevent useEffect from running on initial page load.
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    setDataLoading(true);
    getNearbyPlaces();
  }, [keyword, markerPlaced]);

  //Fetches the single data for the searched keyword
  useEffect(() => {
    //To prevent useEffect from running on initial page load.
    if (isFirstRender2.current) {
      isFirstRender2.current = false;
      return;
    }
    setDataLoading(true);
    getPlace();
  }, [placeId]);

  // set default points to selected user region
  useEffect(() => {
    if (isFirstRender3.current) {
      isFirstRender3.current = false;
      return;
    }
    setDefaultPoints({
      lat: (user as UserType)?.location.lat,
      lng: (user as UserType)?.location.lng,
    });
  }, [user]);

  return (
    <PlacesContext.Provider
      value={{
        isLoaded,
        apiKey,
        placeId,
        setPlaceId,
        keyword,
        setKeyword,
        jsonData,
        setJsonData,
        dataLoading,
        setDataLoading,
        getPlace,
        getNearbyPlaces,
        markerPlaced,
        setMarkerPlaced,
        defaultPoints,
        setDefaultPoints,
        nearbyPlaces,
        setNearbyPlaces,
        user,
        setUser,
      }}
    >
      {children}
    </PlacesContext.Provider>
  );
};

export default PlacesProvider;
