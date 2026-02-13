import { NextResponse } from "next/server";
import Stripe from "stripe";
import { z } from "zod";

export const dynamic = "force-dynamic";

const BodySchema = z.object({
  plan: z.enum(["starter", "pro", "enterprise"]),
});

function mustEnv(name: string) {
  const v = process.env[name];
  if (!v) throw new Error(`${name} missing`);
  return v;
}

function getPriceId(plan: "starter" | "pro" | "enterprise") {
  if (plan === "starter") return mustEnv("STRIPE_PRICE_STARTER");
  if (plan === "pro") return mustEnv("STRIPE_PRICE_PRO");
  return mustEnv("STRIPE_PRICE_ENTERPRISE");
}

export async function POST(req: Request) {
  try {
    const stripe = new Stripe(mustEnv("STRIPE_SECRET_KEY"), {
      apiVersion: "2024-06-20",
    });

    const json = await req.json().catch(() => ({}));
    const parsed = BodySchema.safeParse(json);

    if (!parsed.success) {
      return NextResponse.json(
        { ok: false, error: "Invalid body. Expected { plan: starter|pro|enterprise }" },
        { status: 400 }
      );
    }

    const plan = parsed.data.plan;
    const priceId = getPriceId(plan);

    const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${appUrl}/checkout?success=1&plan=${plan}&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${appUrl}/checkout?canceled=1&plan=${plan}`,
      allow_promotion_codes: true,
    });

    return NextResponse.json({ ok: true, url: session.url, session_id: session.id });
  } catch (e: any) {
    return NextResponse.json(
      { ok: false, error: e?.message || "Stripe error" },
      { status: 500 }
    );
  }
}
