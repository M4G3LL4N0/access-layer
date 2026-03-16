import { supabaseServerService } from "@/lib/supabaseServer";

type EventInput = {
  venue_id?: string | null;
  entrypoint_id?: string | null;
  device_id?: string | null;
  credential_id?: string | null;
  token_jti?: string | null;
  action: string;
  result: string;
  metadata?: Record<string, any> | null;
};

export async function logAxwEvent(input: EventInput) {
  try {
    const supabase = supabaseServerService();

    const { error } = await supabase.from("events").insert([
      {
        venue_id: input.venue_id ?? null,
        entrypoint_id: input.entrypoint_id ?? null,
        device_id: input.device_id ?? null,
        credential_id: input.credential_id ?? null,
        token_jti: input.token_jti ?? null,
        action: input.action,
        result: input.result,
        metadata: input.metadata ?? {},
      },
    ]);

    if (error) {
      return { ok: false as const, error: error.message };
    }

    return { ok: true as const };
  } catch (err: any) {
    return { ok: false as const, error: err?.message || "Event log failed" };
  }
}
