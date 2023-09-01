import { NextResponse } from "next/server";
import users from "../../../../database/users.json";

export async function GET(request: Request) {
  return NextResponse.json(users);
}
