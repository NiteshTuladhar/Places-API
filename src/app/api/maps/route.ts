import { NextResponse } from "next/server";

const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY;
// const place_id = "ChIJb6g49BAZ6zkR8OMzRoSH49M";

export async function GET(request: Request) {
  const url_ = new URL(request.url);
  const search_params = new URLSearchParams(url_.searchParams);
  const place_id: string = Array.from(search_params.values())[0];
  const url = `https://maps.googleapis.com/maps/api/place/details/json?placeid=${place_id}&key=${API_KEY}`;

  const response = await fetch(url);
  const mapsData = await response.json();

  return NextResponse.json(mapsData);
}
