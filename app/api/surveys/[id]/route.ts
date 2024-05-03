import { NextRequest, NextResponse } from 'next/server';

import { prisma } from '../../../../prisma';
import { deleteById, getById, updateById } from '../../../../utils/crud';

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const surveyId = params.id;

    if (!surveyId) {
      throw new Error('survey ID parameter is missing');
    }

    const existingSurvey = await getById(prisma.survey, 'id', surveyId);
    if (!existingSurvey) {
      throw new Error('survey not found');
    }
    await deleteById(prisma.survey, 'id', surveyId);

    return NextResponse.json({ message: 'survey deleted successfully' });
  } catch (err) {
    return NextResponse.json(
      { error: `Internal Server Error: ${err}` },
      { status: 500 },
    );
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const surveyId = params.id;

    const body = await req.json();

    if (!surveyId) {
      throw new Error('survey ID parameter is missing');
    }

    const existingSurvey = await getById(prisma.survey, 'id', surveyId);
    if (!existingSurvey) {
      throw new Error('survey not found');
    }
    await updateById(prisma.survey, body, 'id', surveyId);

    return NextResponse.json({ message: 'survey updated successfully' });
  } catch (err) {
    return NextResponse.json(
      { error: `Internal Server Error: ${err}` },
      { status: 500 },
    );
  }
}
