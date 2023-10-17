import {auth} from '@clerk/nextjs'
import db from '@/lib/prismadb'

const DAY_IN_MS = 86_400_000;


export const checkSubscription = async () => {
    const {userId} = auth();

    if(!userId){
        return false;
    }

    const userSub = await db.userSubscription.findUnique({
        where:{
            userId: userId
        }
        ,
        select:{
            stripeCurrentPeriodEnd: true,
            stripeCustomerId: true,
            stripePriceId: true,
            stripeSubscriptionId: true,
            userId: true
        }
    });

    if(!userSub){
        return false;
    }

    // check the date of the subscription
    const now = Date.now();
    const currentPeriodEnd = userSub.stripeCurrentPeriodEnd?.getTime()!;

    if (currentPeriodEnd + DAY_IN_MS > now && userSub.stripePriceId) {
        return true;
    }

    return false;

}