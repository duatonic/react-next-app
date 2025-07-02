import { NextResponse } from 'next/server'
import prisma from '@/app/lib/prismadb'

export async function GET(
    request: Request,
    { params }: { params: { userId: string } }
) {
    try {
        const { userId } = await params;
        // console.log ('<user> da params:', params);
        console.log('<user> da userId:', userId);

        if (!userId || typeof userId !== 'string') {
            return NextResponse.json({ error: 'Invalid user ID' }, { status: 400 });
        }

        const existingUser = await prisma.user.findUnique({
            where: {
                id: userId
            }
        });

        if (!existingUser) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        const followersCount = await prisma.user.count({
            where: {
                followingIds: {
                    has: userId
                }
            }
        });

        return NextResponse.json({ ...existingUser, followersCount });
    }
    catch (error) {
        console.log('Error:', error);
        return NextResponse.json({ error: 'Error fetching user' }, { status: 500 });
    }
}