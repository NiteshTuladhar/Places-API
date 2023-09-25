import { NextResponse } from "next/server";
import companyDB from "../../../../database/company.json";

const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY;
// const place_id = "ChIJb6g49BAZ6zkR8OMzRoSH49M";

export async function GET(request: Request) {
  const url_ = new URL(request.url);
  const search_params = new URLSearchParams(url_.searchParams);

  const keyword: string = Array.from(search_params.values())[0];
  const type: string = Array.from(search_params.values())[1];
  const location: string = Array.from(search_params.values())[2];
  const radius: string = Array.from(search_params.values())[3];

  console.log("🚀 ~ file: route.ts:12 ~ GET ~ request: Fetching Nearby places");
  const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?keyword=${keyword}&location=${location}&radius=${radius}&type=${type}&key=${API_KEY}`;

  const response = await fetch(url);
  let mapsData = await response.json();

  const newResult = mapsData.results.map((data: any) => {
    // console.log("api name", data.name);
    // console.log(companyDB.some((company) => company.name === data.name));
    // console.log("=============================================_");

    const a = companyDB.some((company) => {
      return company.name === data.name;
    });

    return {
      ...data,
      is_client: companyDB.some((company) => company.name === data.name),
    };
  });

  mapsData["results"] = newResult;
  return NextResponse.json(mapsData);
}
