import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../../prisma';
import { getById, deleteById, updateById } from "../../../../utils/crud";


export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {

    const surveyId = params.id;

    console.log(surveyId);
    if (!surveyId) {
      throw new Error('survey ID parameter is missing');
    }

    const existingSurvey = await getById(prisma.survey, 'id', surveyId);
    if (!existingSurvey) {
      throw new Error('survey not found');
    }
    console.log(existingSurvey);
    await deleteById(prisma.survey, 'id', surveyId);

    return NextResponse.json({ message: 'survey deleted successfully' });
  } catch (err) {
    console.error("Error fetching surveys", err);
    return NextResponse.json({ error: `Internal Server Error: ${err}` }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
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
    // console.log(existingsurvey);
    await updateById(prisma.survey, body, 'id', surveyId);

    return NextResponse.json({ message: 'survey updated successfully' });
  } catch (err) {
    console.error("Error fetching surveys", err);
    return NextResponse.json({ error: `Internal Server Error: ${err}` }, { status: 500 });
  }
}


