import { headers } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

import { auth } from '@/auth';
import { deleteList, getList, updateList } from '@/features/list/domain/use-cases';

export async function GET(request: NextRequest, { params }: { params: { slug: string } }) {
  const slug = params.slug;
  const data = await getList(slug);

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
  await updateList(slug, body);

  return NextResponse.json({ message: 'List updated successfully' });
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
  await deleteList(slug);

  return NextResponse.json({ message: 'List deleted successfully' });
}