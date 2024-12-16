import { NextResponse } from "next/server";
import { serverAuth } from "@/app/lib/server-auth";
import prisma from "@/app/lib/prismadb";

export default async function handler(request: Request) {
    const { method } = request;

    if (method !== 'POST' && method !== 'DELETE') {
        return NextResponse.json({ error: 'Method not allowed' }, { status: 405 });
    }

    try {
        const userId = request.body;

        const { currentUser } = await serverAuth();

        if (!userId || typeof userId !== 'string') {
            throw new Error('No user found');
        }

        const user = await prisma.user.findUnique({
            where: {
                id: userId
            }
        });

        if (!user) {
            throw new Error('No user found');
        }

        let updatedFollowingIds = [...(user.followingIds || [])];

        if (method === 'POST') {
            updatedFollowingIds.push(userId);
        }

        if (method === 'DELETE') {
            updatedFollowingIds = updatedFollowingIds.filter((followingId) => followingId !== userId);
        }

        const updatedUser = await prisma.user.update({
            where: {
                id: currentUser.id
            },
            data: {
                followingIds: updatedFollowingIds
            }
        });

        return NextResponse.json(updatedUser);
    }
    catch (error) {
        console.log(error);
        return NextResponse.json({ error: 'Error fetching users' }, { status: 500 });
    }
}