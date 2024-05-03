import { NextRequest, NextResponse } from "next/server";
import { getAll, create } from "../../../utils/crud";
import { prisma } from '../../../prisma'

export async function GET(req: NextRequest) {
  try {
    console.log("inside templates route", req.nextUrl);
    const queryParams = req.nextUrl.searchParams;
    const filters = Object.fromEntries(queryParams);
    // const templates = await getAll(prisma.template, filters);
    const templates = await prisma.template.findMany({
      where: filters,
      include: {
        Survey: true
      }
    });
    if (templates.length === 0) {
      return NextResponse.json({ exception: 'Templates not found' }, { status: 404 })
    }
    return NextResponse.json(templates);
  } catch (err) {
    console.error("Error fetching templates", err);
    return NextResponse.json({ error: `Internal Server Error: ${err}` }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    console.log("inside post route\n", body);
    const templates = await create(prisma.template, body);
    return NextResponse.json(templates);
  } catch (err) {
    console.error("Error fetching templates", err);
    return NextResponse.json({ error: `Internal Server Error: ${err}` }, { status: 500 })
  }
}
