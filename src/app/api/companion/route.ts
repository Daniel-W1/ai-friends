import db from '@/lib/prismadb'
import { checkSubscription } from '@/lib/subscription';
import { currentUser } from '@clerk/nextjs';
import { NextResponse } from 'next/server';

export async function POST(req: Request){           
    const body = await req.json();
    const user = await currentUser();
    const isPro = await checkSubscription();

    const {name, src, description, seed, instructions, categoryId} = body;
        
    try {
        if(!user){
            return new NextResponse("Unauthorized", { status: 401 });
        }
    
        if(!name || !src || !description || !seed || !instructions || !categoryId){
            return new NextResponse("Missing required fields", { status: 400 });
        }

        if(!isPro){
            return new NextResponse("Unauthorized", { status: 401 });
        }
        
        const companion = await db.companion.create({
            //@ts-ignore
            data: {
                name,
                src,
                description,
                seed,
                instructions,
                categoryId,
                userId: user.id,
                userName: user.firstName + ' ' + user.lastName,
            }
        });

        return NextResponse.json(companion, {status: 201})

    } catch (error) {        
        console.log('ERROR CREATING COMPANION: ', error);
        return new NextResponse("Internal server error", { status: 500 });
    }
}