import { NextRequest, NextResponse } from 'next/server';

import { prisma } from '../../../../prisma';
import { deleteById, getById, updateById } from '../../../../utils/crud';

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const templateId = params.id;

    if (!templateId) {
      throw new Error('template ID parameter is missing');
    }

    const existingTemplate = await getById(prisma.template, 'id', templateId);
    if (!existingTemplate) {
      throw new Error('template not found');
    }
    await deleteById(prisma.template, 'id', templateId);

    return NextResponse.json({ message: 'template deleted successfully' });
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
    const templateId = params.id;

    const body = await req.json();

    if (!templateId) {
      throw new Error('template ID parameter is missing');
    }

    const existingTemplate = await getById(prisma.template, 'id', templateId);
    if (!existingTemplate) {
      throw new Error('template not found');
    }
    const data = await updateById(prisma.template, body, 'id', templateId);
    return NextResponse.json({
      message: 'template updated successfully',
      data,
    });
  } catch (err) {
    return NextResponse.json(
      { error: `Internal Server Error: ${err}` },
      { status: 500 },
    );
  }
}
