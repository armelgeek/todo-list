import { headers } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

import { auth } from '@/auth';
import { deleteSubtask, getSubtask, updateSubtask } from '@/features/subtask/domain/use-cases';

export async function GET(request: NextRequest, { params }: { params: { slug: string } }) {
  const slug = params.slug;
  const data = await getSubtask(slug);

  return NextResponse.json(data);
}

export async function PUT(request: NextRequest, { params }: { params: { slug: string } }) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const slug = params.slug;
  const body = await request.json();
  await updateSubtask(slug, body);

  return NextResponse.json({ message: 'Subtask updated successfully' });
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { slug: string } },
) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const slug = params.slug;
  await deleteSubtask(slug);

  return NextResponse.json({ message: 'Subtask deleted successfully' });
}