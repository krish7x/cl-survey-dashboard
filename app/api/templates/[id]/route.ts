import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../../prisma';
import { getById, deleteById, updateById } from "../../../../utils/crud";


export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {

    const templateId = params.id;

    console.log(templateId);
    if (!templateId) {
      throw new Error('template ID parameter is missing');
    }

    const existingTemplate = await getById(prisma.template, 'id', templateId);
    if (!existingTemplate) {
      throw new Error('template not found');
    }
    console.log(existingTemplate);
    await deleteById(prisma.template, 'id', templateId);

    return NextResponse.json({ message: 'template deleted successfully' });
  } catch (err) {
    console.error("Error fetching templates", err);
    return NextResponse.json({ error: `Internal Server Error: ${err}` }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {

    const templateId = params.id;

    const body = await req.json();

    if (!templateId) {
      throw new Error('template ID parameter is missing');
    }

    const existingTemplate = await getById(prisma.template, 'id', templateId);
    if (!existingTemplate) {
      throw new Error('template not found');
    }
    // console.log(existingTemplate);
    await updateById(prisma.template, body, 'id', templateId);

    return NextResponse.json({ message: 'template updated successfully' });
  } catch (err) {
    console.error("Error fetching templates", err);
    return NextResponse.json({ error: `Internal Server Error: ${err}` }, { status: 500 });
  }
}


