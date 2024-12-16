// app/api/follow/route.ts
import { NextResponse } from "next/server";
import { serverAuth } from "@/app/lib/server-auth";
import prisma from "@/app/lib/prismadb";

export async function POST(request: Request) {
    try {
        const { userId } = await request.json(); // Changed from request.body to request.json()

        const { currentUser } = await serverAuth();

        if (!userId || typeof userId !== 'string') {
            return NextResponse.json({ error: 'Invalid user ID' }, { status: 400 });
        }

        const user = await prisma.user.findUnique({
            where: {
                id: userId
            }
        });

        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        const updatedFollowingIds = [...(currentUser.followingIds || [])];
        updatedFollowingIds.push(userId);

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
        return NextResponse.json({ error: 'Error following user' }, { status: 500 });
    }
}

export async function DELETE(request: Request) {
    try {
        const { userId } = await request.json(); // Changed from request.body to request.json()

        const { currentUser } = await serverAuth();

        if (!userId || typeof userId !== 'string') {
            return NextResponse.json({ error: 'Invalid user ID' }, { status: 400 });
        }

        const user = await prisma.user.findUnique({
            where: {
                id: userId
            }
        });

        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        const updatedFollowingIds = [...(currentUser.followingIds || [])];
        const updatedIds = updatedFollowingIds.filter((followingId) => followingId !== userId);

        const updatedUser = await prisma.user.update({
            where: {
                id: currentUser.id
            },
            data: {
                followingIds: updatedIds
            }
        });

        return NextResponse.json(updatedUser);
    }
    catch (error) {
        console.log(error);
        return NextResponse.json({ error: 'Error unfollowing user' }, { status: 500 });
    }
}