import { auth } from "@/auth";
import { createTaskLabel } from "@/features/task/domain/use-cases";
import { eq } from "drizzle-orm";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest, { params }: { params: { taskId: string; labelId: string } },
) {
    const session = await auth.api.getSession({
        headers: await headers(),
    });
    if (!params.taskId || !params.labelId) {
        return new NextResponse('Task Id and Label Id is required', {
            status: 400,
        });
    }
    if (!session) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    try {
        await createTaskLabel(params.taskId, params.labelId);
        return new NextResponse(JSON.stringify({ message: 'Label associé avec succès' }), {
            status: 200,
        });
    } catch (error) {
        console.error(error);
        return new NextResponse('Internal Server Error', { status: 500 });
    }
}