// app/api/posts/route.ts
import { serverAuth } from '@/app/lib/server-auth';
import prisma from '@/app/lib/prismadb';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const { currentUser } = await serverAuth();
        const body = await request.json();

        const post = await prisma.post.create({
            data: {
                body: body.body,
                userId: currentUser.id
            }
        });

        return NextResponse.json(post, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: 'Error creating post' }, { status: 500 });
    }
}

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const userId = searchParams.get('userId');

        let posts;

        if (userId && typeof userId === 'string') {
            posts = await prisma.post.findMany({
                where: {
                    userId
                },
                include: {
                    user: true,
                    comments: true
                },
                orderBy: {
                    createdAt: 'desc'
                }
            });
        } else {
            posts = await prisma.post.findMany({
                include: {
                    user: true,
                    comments: true
                },
                orderBy: {
                    createdAt: 'desc'
                }
            });
        }

        return NextResponse.json(posts, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: 'Error fetching posts' }, { status: 500 });
    }
}