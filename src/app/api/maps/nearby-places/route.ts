import { NextResponse } from "next/server";

const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY;
// const place_id = "ChIJb6g49BAZ6zkR8OMzRoSH49M";

const keyword = "cruise";
const location = `-327.6878832302915%2C85.31886098029152`;
const radius = 1500;
const type = "restaurant";

export async function GET(request: Request) {
  const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json
  ?keyword=${keyword}
  &location= ${location}
  &radius=${radius}
  &type=${type}
  &key=${API_KEY}`;

  const response = await fetch(url);
  const mapsData = await response.json();

  return NextResponse.json(mapsData);
}
