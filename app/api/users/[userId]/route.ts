import { NextResponse } from 'next/server'
import prisma from '@/app/lib/prismadb'

export default async function GET(request: Request, { params }: any) {
    try {
       console.log("<[userid]> da request, params:", request, params);
       const { userId } = params.id;

       if (!userId || typeof userId !== 'string'){
        throw new Error('Invalid user ID');
        }

        const existingUser = await prisma.user.findUnique({
            where: {
                id: userId
            }
        });

        const followersCount = await prisma.user.count({
            where: {
                followingIds: {
                    has: userId
             }
            }
        });

        return NextResponse.json({ ...existingUser, followersCount });
        
    }
    catch (error){
        console.log('Error');
        return NextResponse.json({ error: 'Error fetching user' }, { status: 400 });
    }
}