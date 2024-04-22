import { NextRequest, NextResponse } from "next/server";
import { getAll } from "../../../utils/crud";
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
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }

}