import { NextResponse } from "next/server";
import { z } from "zod";
import crypto from "crypto";
import { supabaseServer } from "@/lib/supabaseServer";

const LeadSchema = z.object({
  name: z.string().trim().max(120).optional().or(z.literal("")),
  email: z.string().trim().email().max(200),
  phone: z.string().trim().max(40).optional().or(z.literal("")),
  company: z.string().trim().max(200).optional().or(z.literal("")),
  city: z.string().trim().max(120).optional().or(z.literal("")),
  region: z.string().trim().max(80).optional().or(z.literal("")),
  venue_type: z.string().trim().max(120).optional().or(z.literal("")),
  message: z.string().trim().max(2000).optional().or(z.literal("")),
  source: z.string().trim().max(40).optional().or(z.literal("")),
});

function hashIp(ip: string) {
  return crypto.createHash("sha256").update(ip).digest("hex");
}

export async function POST(req: Request) {
  try {
    const ct = req.headers.get("content-type") || "";
    let raw: any = {};

    if (ct.includes("application/json")) {
      raw = await req.json();
    } else {
      const form = await req.formData();
      raw = Object.fromEntries(form.entries());
    }

    const parsed = LeadSchema.safeParse({
      ...raw,
      source: raw.source || "web",
    });

    if (!parsed.success) {
      return NextResponse.json(
        { ok: false, error: "Invalid lead data", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    // basic anti-spam hook (not stored yet)
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "0.0.0.0";
    const ip_hash = hashIp(ip);
    void ip_hash;

    // NOTE: In this codebase supabaseServer is a client instance (NOT a function).
    const supabase = supabaseServer();

    const { data, error } = await supabase
      .from("leads")
      .insert([
        {
          ...parsed.data,
          name: parsed.data.name || null,
          phone: parsed.data.phone || null,
          company: parsed.data.company || null,
          city: parsed.data.city || null,
          region: parsed.data.region || null,
          venue_type: parsed.data.venue_type || null,
          message: parsed.data.message || null,
          source: parsed.data.source || "web",
        },
      ])
      .select("id, created_at, status")
      .limit(1);

    if (error) {
      return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
    }

    return NextResponse.json({ ok: true, lead: data?.[0] || null });
  } catch (e: any) {
    return NextResponse.json(
      { ok: false, error: e?.message || "Unknown error" },
      { status: 500 }
    );
  }
}
