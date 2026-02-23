import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { demand, timeOfDay } = await req.json();

  let base = 5;

  if (demand > 0.8) base *= 2;
  if (timeOfDay > 18) base *= 1.5;

  return NextResponse.json({ price: Math.round(base * 100) });
}
