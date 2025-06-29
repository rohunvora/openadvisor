import { NextResponse } from 'next/server';

export async function GET() {
  // For now, redirect to the external API
  // This can be converted to full OAuth implementation later
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';
  return NextResponse.redirect(`${apiUrl}/api/auth/twitter`);
} 