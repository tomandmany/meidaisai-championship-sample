// @/app/api/ticket/route.ts
import { NextResponse } from 'next/server';
import { updateTicketStatus } from '@/actions/updateTicketStatus';

export async function PUT(req: Request) {
  try {
    const { userId } = await req.json();
    await updateTicketStatus(userId); // updateTicketStatusでticket_usedをtrueに更新
    return NextResponse.json({ message: 'チケットの状態が更新されました' });
  } catch (error) {
    console.error('Error updating ticket:', error);
    return NextResponse.json({ error: 'チケットの更新に失敗しました' }, { status: 500 });
  }
}
