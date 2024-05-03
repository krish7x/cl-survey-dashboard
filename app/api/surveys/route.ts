import { NextRequest, NextResponse } from 'next/server';

import { prisma } from '../../../prisma';
import { create } from '../../../utils/crud';

export async function GET(req: NextRequest) {
  try {
    const queryParams = req.nextUrl.searchParams;
    const filters = Object.fromEntries(queryParams);
    const surveys = await prisma.survey.findMany({
      where: filters,
      include: {
        project: true,
        template: true,
      },
    });
    if (surveys.length === 0) {
      return NextResponse.json(
        { exception: 'surveys not found' },
        { status: 404 },
      );
    }
    return NextResponse.json(surveys);
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
    const surveys = await create(prisma.survey, body);
    return NextResponse.json(surveys);
  } catch (err) {
    return NextResponse.json(
      { error: `Internal Server Error: ${err}` },
      { status: 500 },
    );
  }
}
