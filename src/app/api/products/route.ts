import { NextResponse } from 'next/server';
import { getDb, saveDb } from '@/lib/db';

export async function GET() {
  const db = getDb();
  return NextResponse.json(db.products);
}

export async function POST(request: Request) {
  const product = await request.json();
  const db = getDb();
  db.products = [product, ...db.products];
  saveDb(db);
  return NextResponse.json(product);
}

export async function PUT(request: Request) {
  const updatedProduct = await request.json();
  const db = getDb();
  db.products = db.products.map((p: any) => p.id === updatedProduct.id ? updatedProduct : p);
  saveDb(db);
  return NextResponse.json(updatedProduct);
}

export async function DELETE(request: Request) {
  const { id } = await request.json();
  const db = getDb();
  db.products = db.products.filter((p: any) => p.id !== id);
  saveDb(db);
  return NextResponse.json({ success: true });
}
