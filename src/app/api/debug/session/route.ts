export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { supabaseServerAuth } from "@/lib/supabaseServerAuth";

export async function GET() {
  try {
    const supabase = await supabaseServerAuth();
    const { data: sessionData, error: sessErr } = await supabase.auth.getSession();
    const { data: userData, error: userErr } = await supabase.auth.getUser();

    return NextResponse.json({
      ok: true,
      hasSession: Boolean(sessionData.session),
      sessionUserEmail: sessionData.session?.user?.email || null,
      userEmail: userData.user?.email || null,
      sessErr: sessErr?.message || null,
      userErr: userErr?.message || null,
      note:
        "If hasSession=false even right after Google login, cookies are not being set/persisted from /auth/callback.",
    });
  } catch (e: any) {
    return NextResponse.json(
      { ok: false, error: e?.message || String(e) },
      { status: 500 }
    );
  }
}
