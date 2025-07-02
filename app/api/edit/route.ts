import { serverAuth } from '@/app/lib/server-auth';
import { NextResponse } from 'next/server';
import prisma from '@/app/lib/prismadb';

export async function PATCH(request: Request) {
    try {
        const { currentUser } = await serverAuth();
        const body = await request.json();
        
        const { name, username, bio, profileImage, coverImage } = body;

        if (!name || !username) {
            return NextResponse.json(
                { error: 'Name and username are required' }, 
                { status: 400 }
            );
        }

        const updatedUser = await prisma.user.update({
            where: {
                id: currentUser.id
            },
            data: {
                name,
                username,
                bio,
                profileImage,
                coverImage
            }
        });

        return NextResponse.json(updatedUser);

    } catch (error) {
        console.log(error);
        return NextResponse.json(
            { error: 'Failed to update user' }, 
            { status: 500 }
        );
    }
}