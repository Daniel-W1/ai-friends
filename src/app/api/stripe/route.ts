import { stripe } from '@/lib/stripe';
import { absoluteUrl } from '@/lib/utils'
import { auth, currentUser } from '@clerk/nextjs'
import { NextResponse } from 'next/server';

import db from '@/lib/prismadb'

const settings_url = absoluteUrl('/settings');

export async function GET() {
    try {
        const { userId } = auth();
        const user = await currentUser();

        if (!userId || !user) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const userSubscription = await db.userSubscription.findUnique({
            where: {
                userId: userId
            },
        });

        if (userSubscription && userSubscription.stripeCustomerId) {
            const stripeSession = await stripe.billingPortal.sessions.create({
                customer: userSubscription.stripeCustomerId,
                return_url: settings_url,
            });

            return new NextResponse(JSON.stringify({ url: stripeSession.url }));
        }
        
        const stripeSession = await stripe.checkout.sessions.create({
            mode: "subscription",
            payment_method_types: ["card"],
            success_url: settings_url,
            cancel_url: settings_url,
            billing_address_collection: "auto",
            customer_email: user.emailAddresses[0].emailAddress,
            line_items: [
                {
                    price_data: {
                        currency: "USD",
                        product_data: {
                            name: "ai-friends Pro",
                            description: "Create Custom ai-friends"
                        },
                        unit_amount: 999,
                        recurring: {
                            interval: "month"
                        }
                    },
                    quantity: 1,
                },
            ],
            metadata: {
                userId,
            },
        });

        return new NextResponse(JSON.stringify({ url: stripeSession.url }));

    } catch (error) {
        console.log('ERROR ON STRIPE CHECKOUT SESSION', error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}