import { headers } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

import { auth } from '@/auth';
import { createSearchParams } from '@/shared/domain/base.search-param';
import { createSubtask, getSubtasks } from '@/features/subtask/domain/use-cases';

export async function GET(request: NextRequest) {
   const searchParams = createSearchParams();
   const filter = searchParams.load(request);
  const data = await getSubtasks(filter);

  return NextResponse.json(data);
}

export async function POST(request: NextRequest,  { params }: { params: { taskId: string } }) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await request.json();
  
  const data = await createSubtask({...body,taskId: params.taskId, userId: session.user.id});

  return NextResponse.json(data);
}