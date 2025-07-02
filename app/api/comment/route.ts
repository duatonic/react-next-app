import { NextResponse } from 'next/server';
import prisma from '@/app/lib/prismadb';
import { serverAuth } from '@/app/lib/server-auth';

export async function POST(request: Request) {
    try {
        const { currentUser } = await serverAuth();
        const req = await request.json();
        const { postId, body } = req;
 
        console.log('<comment> da body:', body);
        console.log('<comment> da postId:', postId);

        if (!postId || typeof postId !== 'string') {
            throw new Error('Invalid post ID');
        }

        const comment = await prisma.comment.create({
            data: {
                body,
                userId: currentUser.id,
                postId
            }
        });

        return NextResponse.json(comment);
    }
    catch (error) {
        console.error(error);

        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}