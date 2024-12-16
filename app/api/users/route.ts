import prisma from "@/app/lib/prismadb";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    // const { method, body } = request;
    // console.log("<users> da request method:", method);
    // console.log("<users> da request body:", body);
    try {
        const users = await prisma.user.findMany({
            orderBy: {
                createdAt: "desc"
            }
        });

        // console.log("<users> da NextResponse:", NextResponse.json(users));

        return NextResponse.json(users);
    }  
    catch (error) {
        console.log(error);
        return NextResponse.json({ error: 'Error fetching users' }, { status: 500 });
    }
}