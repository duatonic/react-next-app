import { NextResponse } from "next/server";
import { serverAuth } from "@/app/lib/server-auth";
import prisma from "@/app/lib/prismadb";

export async function POST(request: Request) {
    try {
        const data = await request.json();
        const { postId } = data;
        const { currentUser } = await serverAuth();

        if (!postId || typeof postId !== 'string') {
            return NextResponse.json({ error: 'Invalid post ID' }, { status: 400 });
        }

        const post = await prisma.post.findUnique({
            where: {
                id: postId
            }
        });

        if (!post) {
            return NextResponse.json({ error: 'Post not found' }, { status: 404 });
        }

        const updatedLikedIds = [...(post.likedIds || []), currentUser.id];

        const updatedPost = await prisma.post.update({
            where: {
                id: postId
            },
            data: {
                likedIds: updatedLikedIds
            }
        });

        return NextResponse.json(updatedPost);
    }
    catch (error) {
        console.log(error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

export async function DELETE(request: Request) {
    try {
        const data = await request.json();
        const { postId } = data;
        const { currentUser } = await serverAuth();

        if (!postId || typeof postId !== 'string') {
            return NextResponse.json({ error: 'Invalid post ID' }, { status: 400 });
        }

        const post = await prisma.post.findUnique({
            where: {
                id: postId
            }
        });

        if (!post) {
            return NextResponse.json({ error: 'Post not found' }, { status: 404 });
        }

        const updatedLikedIds = post.likedIds?.filter((likedId) => likedId !== currentUser.id) || [];

        const updatedPost = await prisma.post.update({
            where: {
                id: postId
            },
            data: {
                likedIds: updatedLikedIds
            }
        });

        return NextResponse.json(updatedPost);
    }
    catch (error) {
        console.log(error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}