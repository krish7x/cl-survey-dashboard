import { NextRequest, NextResponse } from 'next/server';

import { prisma } from '../../../prisma';
import { create, getAll } from '../../../utils/crud';

export async function GET(req: NextRequest) {
  try {
    const queryParams = req.nextUrl.searchParams;
    const filters = Object.fromEntries(queryParams);
    const users = await getAll(prisma.user, filters);
    return NextResponse.json(users);
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
    const users = await create(prisma.user, body);
    return NextResponse.json(users);
  } catch (err) {
    return NextResponse.json(
      { error: `Internal Server Error: ${err}` },
      { status: 500 },
    );
  }
}
