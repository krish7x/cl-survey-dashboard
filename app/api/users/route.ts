import { NextRequest, NextResponse } from "next/server";
import { getAll, create } from "../../../utils/crud";
import { prisma } from '../../../prisma'

export async function GET(req: NextRequest) {
  try {
    console.log("inside users route", req.nextUrl);
    const queryParams = req.nextUrl.searchParams;
    const filters = Object.fromEntries(queryParams);
    const users = await getAll(prisma.user, filters);
    return NextResponse.json(users);
  } catch (err) {
    console.error("Error fetching users", err);
    return NextResponse.json({ error: `Internal Server Error: ${err}` }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    console.log("inside post route\n", body);
    const users = await create(prisma.user, body);
    return NextResponse.json(users);
  } catch (err) {
    console.error("Error fetching users", err);
    return NextResponse.json({ error: `Internal Server Error: ${err}` }, { status: 500 })
  }
}
