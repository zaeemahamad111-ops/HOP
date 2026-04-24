import { NextResponse } from 'next/server';
import { getDb, saveDb } from '@/lib/db';

export async function GET() {
  const db = getDb();
  return NextResponse.json(db.orders);
}

export async function POST(request: Request) {
  const order = await request.json();
  const db = getDb();
  db.orders = [order, ...db.orders];
  saveDb(db);
  return NextResponse.json(order);
}

export async function PUT(request: Request) {
  const { id, status } = await request.json();
  const db = getDb();
  db.orders = db.orders.map((o: any) => o.id === id ? { ...o, status } : o);
  saveDb(db);
  return NextResponse.json({ success: true });
}
