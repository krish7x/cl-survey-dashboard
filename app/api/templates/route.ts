import { NextRequest, NextResponse } from 'next/server';

import { prisma } from '../../../prisma';
import { create } from '../../../utils/crud';

export async function GET(req: NextRequest) {
  try {
    const queryParams = req.nextUrl.searchParams;
    const filters = Object.fromEntries(queryParams);
    // const templates = await getAll(prisma.template, filters);
    const templates = await prisma.template.findMany({
      where: filters,
      include: {
        Survey: true,
      },
    });
    if (templates.length === 0) {
      return NextResponse.json(
        { exception: 'Templates not found' },
        { status: 404 },
      );
    }
    return NextResponse.json(templates);
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
    const templates = await create(prisma.template, body);
    return NextResponse.json(templates);
  } catch (err) {
    return NextResponse.json(
      { error: `Internal Server Error: ${err}` },
      { status: 500 },
    );
  }
}
