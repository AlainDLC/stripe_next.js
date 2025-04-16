import { NextResponse } from "next/server";
import { headers } from "next/headers";
import Stripe from "stripe";

const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_KEY, {
  apiVersion: "2025-03-31.basil",
});

const webhooksecret = process.env.NEXT_PUBLIC_WEB_KEY;

export async function POST(req) {
  const body = await req.text();
  const headerList = headers();

  const sign = headerList.get("stripe-signature");

  let event;

  try {
    event = stripe.webhooks.constructEvent(body, sign, webhooksecret);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: error.massage }, { status: 400 });
  }

  switch (event.type) {
    case "checkout.session.completed":
      const checkoutSessionCompleted = event.data.object;

      console.log({ checkoutSessionCompleted });
      break;

    default:
      console.log(`Det sket sig ${event}`);
  }

  return new Response(null, { status: 200 });
}
