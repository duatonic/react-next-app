import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/app/lib/prismadb";

export default async function serverAuth(request: Request) {
    const session = await getServerSession(authOptions);
    console.log('session:', session);

    if (!session?.user?.email) {
        throw new Error('Not signed in');
    }

    const currentUser = await prisma.user.findUnique({
        where: {
            email: session.user.email
        }
    });

    if (!currentUser) {
        throw new Error('No user found');
    }

    return { currentUser };
}