import { NextResponse } from "next/server";
import { supabaseServerAuth } from "@/lib/supabaseServerAuth";
import { supabaseServer } from "@/lib/supabaseServer"; // service role (for controlled writes)

export async function POST(req: Request) {
  const form = await req.formData();
  const token = String(form.get("token") || "").trim();

  const supaAuth = supabaseServerAuth();
  const { data } = await supaAuth.auth.getUser();
  const user = data.user;

  if (!user || !user.email) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // Lookup invite (service role ok)
  const { data: invite, error: invErr } = await supabaseServer
    .from("venue_owner_invites")
    .select("id,venue_id,email,expires_at")
    .eq("token", token)
    .maybeSingle();

  if (invErr || !invite) {
    return NextResponse.redirect(new URL("/account?error=bad_token", req.url));
  }

  if (invite.email.toLowerCase() !== user.email.toLowerCase()) {
    return NextResponse.redirect(new URL("/account?error=email_mismatch", req.url));
  }

  if (new Date(invite.expires_at).getTime() < Date.now()) {
    return NextResponse.redirect(new URL("/account?error=expired", req.url));
  }

  // Create membership
  const { error: memErr } = await supabaseServer.from("venue_members").insert({
    venue_id: invite.venue_id,
    user_id: user.id,
    role: "owner",
  });

  if (memErr) {
    // Already exists is fine
  }

  // Consume invite (delete)
  await supabaseServer.from("venue_owner_invites").delete().eq("id", invite.id);

  return NextResponse.redirect(new URL(`/manage/${invite.venue_id}`, req.url));
}
