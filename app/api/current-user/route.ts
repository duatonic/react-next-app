import { NextResponse } from 'next/server';
import serverAuth from '@/app/lib/server-auth';

export async function GET(request: Request) {
    console.log('GET /api/current-user, dis da request:', request);
  try {
    const { currentUser } = await serverAuth(request);

    return NextResponse.json(currentUser);
  }
  catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Error fetching current user' }, { status: 400 });
  }
}