import { NextRequest, NextResponse } from 'next/server';

import { prisma } from '../../../prisma';
import { create } from '../../../utils/crud';

export async function GET(req: NextRequest) {
  try {
    const queryParams = req.nextUrl.searchParams;
    const filters = Object.fromEntries(queryParams);
    // const projects = await getAll(prisma.project, filters);
    const projects = await prisma.project.findMany({
      where: filters,
      include: {
        User: true,
      },
    });
    if (projects.length === 0) {
      return NextResponse.json(
        { error: 'Projects not found' },
        { status: 404 },
      );
    }
    return NextResponse.json(projects);
  } catch (err) {
    return NextResponse.json(
      { error: `Internal Server Error: ${err}` },
      { status: 500 },
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const projects = await create(prisma.project, body);
    return NextResponse.json(projects);
  } catch (err) {
    return NextResponse.json(
      { error: `Internal Server Error: ${err}` },
      { status: 500 },
    );
  }
}
