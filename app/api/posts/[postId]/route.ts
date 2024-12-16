import { NextResponse } from "next/server";
import prisma from "@/app/lib/prismadb";

export default async function GET(request: Request, { params }: any) {
    try {
        const { postId } = params.id;

        if (!postId || typeof postId !== 'string') {
            throw new Error('Invalid post ID');
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

        return NextResponse.json(post);
    }
    catch(error) {
        console.log(error);
        return NextResponse.json({ error: 'Error fetching posts' }, { status: 400 });
    }
}