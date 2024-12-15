import { NextResponse } from "next/server";
import bcrypt from 'bcrypt';
import prisma from '@/app/lib/prismadb';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { email, username, name, password } = body;

        const hashedPassword = await bcrypt.hash(password, 12);

        const user = await prisma.user.create({
            data: {
                email,
                username,
                name,
                hashedPassword
            }
        });

        return NextResponse.json({ user }, { status: 200 });
    }
    catch (error) {
        console.log(error);
        return NextResponse.json({ message: 'An error occurred' }, { status: 500 });
    }
}