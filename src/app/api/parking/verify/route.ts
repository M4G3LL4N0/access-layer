import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabaseServer";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const token = String(url.searchParams.get("token") || "").trim();

    if (!token) {
      return NextResponse.json(
        { ok: false, error: "Missing token" },
        { status: 400 }
      );
    }

    const supabase = supabaseServer();

    // Find all events for this token, newest first
    const { data: events, error: eventsErr } = await supabase
      .from("parking_events")
      .select("*")
      .eq("token", token)
      .order("created_at", { ascending: false });

    if (eventsErr) {
      return NextResponse.json(
        { ok: false, error: eventsErr.message },
        { status: 500 }
      );
    }

    if (!events || events.length === 0) {
      return NextResponse.json(
        { ok: false, error: "Token not found" },
        { status: 404 }
      );
    }

    // Build a summary from events
    const issuedEvent = events.find((e) => e.event_type === "issued");
    const verifyEvent = events.find((e) => e.event_type === "verify_ok");

    return NextResponse.json({
      ok: true,
      token,
      issued_at: issuedEvent?.created_at || null,
      verify: verifyEvent || null,
      allEvents: events,
    });
  } catch (e: any) {
    return NextResponse.json(
      { ok: false, error: String(e?.message || e) },
      { status: 500 }
    );
  }
}
