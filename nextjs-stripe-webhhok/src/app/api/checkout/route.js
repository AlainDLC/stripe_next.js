import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_KEY, {
  apiVersion: "2023-10-16", // eller den version du använder
});

export async function POST(req) {
  const session = await stripe.checkout.sessions.create({
    success_url: "http://localhost:3000/success",
    line_items: [
      {
        price_data: {
          currency: "sek",
          product_data: {
            name: "Kawasaki",
            images: [
              "https://storage.kawasaki.eu/public/kawasaki.eu/en-EU/model/25MY_Ninja_650_GY1_STU__1_.png",
            ],
          },
          unit_amount: 100000,
        },
        quantity: 1,
      },
    ],
    mode: "payment",
  });

  console.log(session);
  return NextResponse.json("batala");
}
