import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { password } = await req.json();
  const correct = process.env.ADMIN_PASSWORD;
  if (!correct || password !== correct) {
    return NextResponse.json({ message: 'Incorrect password.' }, { status: 401 });
  }
  const res = NextResponse.json({ success: true });
  res.cookies.set('admin_authed', 'true', { httpOnly: true, maxAge: 60 * 60 * 8, path: '/' });
  return res;
}
