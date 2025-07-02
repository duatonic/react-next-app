import { NextResponse } from "next/server";
import prisma from "@/app/lib/prismadb";

export async function GET(
    request: Request,
    { params }: { params: { postId: string } }
) {
    try {
        const { postId } = await params;
        console.log('<post> da postId:', postId);

        if (!postId || typeof postId !== 'string') {
            return NextResponse.json(
                { error: 'Invalid post ID' }, 
                { status: 400 }
            );
        }

        const post = await prisma.post.findUnique({
            where: {
                id: postId
            },
            include: {
                user: true,
                comments: {
                    include: {
                        user: true
                    },
                    orderBy: {
                        createdAt: 'desc'
                    }
                }
            }
        });

        if (!post) {
            return NextResponse.json(
                { error: 'Post not found' }, 
                { status: 404 }
            );
        }

        return NextResponse.json(post);
    }
    catch(error) {
        console.log(error);
        return NextResponse.json(
            { error: 'Error fetching post' }, 
            { status: 500 }
        );
    }
}