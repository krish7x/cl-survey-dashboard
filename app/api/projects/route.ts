import { NextRequest, NextResponse } from "next/server";
import { getAll, create } from "../../../utils/crud";
import { prisma } from '../../../prisma'

export async function GET(req: NextRequest) {
  try {
    console.log("inside projects route", req.nextUrl);
    const queryParams = req.nextUrl.searchParams;
    const filters = Object.fromEntries(queryParams);
    // const projects = await getAll(prisma.project, filters);
    const projects = await prisma.project.findMany({
      where: filters,
      include: {
        user: true
      }
    });
    return NextResponse.json(projects);
  } catch (err) {
    console.error("Error fetching projects", err);
    return NextResponse.json({ error: `Internal Server Error: ${err}` }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    console.log("inside post route\n", body);
    const projects = await create(prisma.project, body);
    return NextResponse.json(projects);
  } catch (err) {
    console.error("Error fetching projects", err);
    return NextResponse.json({ error: `Internal Server Error: ${err}` }, { status: 500 })
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const body = await req.json();
    console.log("inside post route\n", body);
    const projects = await create(prisma.project, body);
    return NextResponse.json(projects);
  } catch (err) {
    console.error("Error fetching projects", err);
    return NextResponse.json({ error: `Internal Server Error: ${err}` }, { status: 500 })
  }
}
