import { NextResponse } from "next/server";
import { serverAuth } from "@/app/lib/server-auth";
import prisma from "@/app/lib/prismadb";

export default async function handler(request: Request) {
    const { method } = request;

    if (method !== 'POST' && method !== 'DELETE') {
        return NextResponse.json({ error: 'Method not allowed' }, { status: 405 });
    }

    try {
        console.log('<like> da request.body:', request.body);
        const postId = request.body;
        const { currentUser } = await serverAuth();

        if (!postId || typeof postId !== 'string') {
            throw new Error('No post found');
        }

        const post = await prisma.post.findUnique({
            where: {
                id: postId
            }
        });

        if (!post) {
            throw new Error('Invalid ID');
        }

        let updatedLikedIds = [...(post.likedIds || [])];

        if (method === 'POST') {
            updatedLikedIds.push(currentUser.id);
        }

        if (method === 'DELETE') {
            updatedLikedIds = updatedLikedIds.filter((likedId) => likedId !== currentUser.id);
        }

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
        return NextResponse.json({ error: 'Error fetching users' }, { status: 500 });
    }
}