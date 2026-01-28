import { NextRequest, NextResponse } from 'next/server';
import { getAllUserAccessData } from '@/lib/rate-limit';

export async function GET(request: NextRequest) {
  try {
    // Get all user access data
    const data = getAllUserAccessData();

    // Format the data for better readability
    const formattedData = {
      ...data,
      users: data.users.map(user => ({
        ...user,
        lastAccess: user.lastAccess.toISOString(),
      })),
    };

    return NextResponse.json(formattedData);
  } catch (error) {
    console.error('Error in admin stats API:', error);
    return NextResponse.json(
      { error: 'Failed to process request' },
      { status: 500 }
    );
  }
} 