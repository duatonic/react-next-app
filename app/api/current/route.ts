import { NextResponse } from 'next/server';
import { serverAuth } from '@/app/lib/server-auth';

export async function GET() {
  try {
    const { currentUser } = await serverAuth();

    console.log('<current> da currentUser:', NextResponse.json(currentUser));

    return NextResponse.json(currentUser);
  }
  catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Error fetching current user' }, { status: 400 });
  }
}