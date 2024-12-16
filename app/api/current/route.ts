import { NextResponse } from 'next/server';
import { serverAuth } from '@/app/lib/server-auth';
import { NextApiResponse } from 'next';

export async function GET() {
  try {
    const { currentUser } = await serverAuth();

    console.log('<current> da currentUser:', currentUser);

    return NextResponse.json({ currentUser }, { status: 200 });
  }
  catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Error fetching current user' }, { status: 400 });
  }
}