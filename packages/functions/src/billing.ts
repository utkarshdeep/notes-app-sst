import Stripe from "stripe";
import { Config } from "sst/node/config";
import handler from "@notes/core/handler";
import { calculateCost } from "@notes/core/cost";
export const main = handler(async (event) => {
    const { storage, source } = JSON.parse(event.body || "{}");
    const amount = calculateCost(storage);
    const description = "Scratch charge";
    // Load our secret key
    const stripe = new Stripe(Config.STRIPE_SECRET_KEY, {
        apiVersion: "2023-08-16",
    });
    await stripe.paymentIntents.create({
        amount,
        description,
        currency: "usd",
        shipping: {
            name: "Jenny Rosen",
            address: {
                line1: "510 Townsend St",
                postal_code: "98140",
                city: "San Francisco",
                state: "CA",
                country: "US",
            },
        },
    });
    return JSON.stringify({ status: true });
});
