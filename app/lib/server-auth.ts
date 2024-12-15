import { error } from "console";
import { NextApiRequest } from "next";
import { getSession } from "next-auth/react";
import prisma from "../lib/prismadb";

export default async function serverAuth(req: NextApiRequest) {
    const session = await getSession({ req });

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