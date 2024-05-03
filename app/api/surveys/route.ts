import { NextRequest, NextResponse } from "next/server";
import { getAll, create } from "../../../utils/crud";
import { prisma } from '../../../prisma'

export async function GET(req: NextRequest) {
  try {
    console.log("inside surveys route", req.nextUrl);
    const queryParams = req.nextUrl.searchParams;
    const filters = Object.fromEntries(queryParams);
    // const surveys = await getAll(prisma.survey, filters);
    const surveys = await prisma.survey.findMany({
      where: filters,
      include: {
        template: true
      }
    });
    if (surveys.length === 0) {
      return NextResponse.json({ exception: 'surveys not found' }, { status: 404 })
    }
    return NextResponse.json(surveys);
  } catch (err) {
    console.error("Error fetching surveys", err);
    return NextResponse.json({ error: `Internal Server Error: ${err}` }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    console.log("inside post route\n", body);
    const surveys = await create(prisma.survey, body);
    return NextResponse.json(surveys);
  } catch (err) {
    console.error("Error fetching surveys", err);
    return NextResponse.json({ error: `Internal Server Error: ${err}` }, { status: 500 })
  }
}
