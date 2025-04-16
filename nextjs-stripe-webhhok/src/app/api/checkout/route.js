import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_KEY, {
  apiVersion: "2025-03-31.basil",
});

export async function POST(req) {
  const body = await req.json();

  const session = await stripe.checkout.sessions.create({
    success_url: "http://localhost:3000/success",
    line_items: [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: body.name,
            images: [body.image],
          },
          unit_amount: body.price,
        },
        quantity: 1,
      },
    ],
    metadata: {
      productId: body.id,
    },
    mode: "payment",
  });

  return NextResponse.json(session);
}
