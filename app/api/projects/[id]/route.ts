import { NextRequest, NextResponse } from 'next/server';

import { prisma } from '../../../../prisma';
import { deleteById, getById } from '../../../../utils/crud';

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const projectId = params.id;

    if (!projectId) {
      throw new Error('Project ID parameter is missing');
    }

    const existingProject = await getById(prisma.project, 'id', projectId);
    if (!existingProject) {
      throw new Error('Project not found');
    }
    await deleteById(prisma.project, 'id', projectId);

    return NextResponse.json({ message: 'Project deleted successfully' });
  } catch (err) {
    return NextResponse.json(
      { error: `Internal Server Error: ${err}` },
      { status: 500 },
    );
  }
}
