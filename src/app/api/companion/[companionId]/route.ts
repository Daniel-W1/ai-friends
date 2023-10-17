import db from '@/lib/prismadb'
import { checkSubscription } from '@/lib/subscription';
import { currentUser } from '@clerk/nextjs';
import { NextResponse } from 'next/server';

export async function PUT(req: Request,
    { params: { companionId } }: { params: { companionId: string } }
) {
    const body = await req.json();
    const user = await currentUser();
    const isPro = await checkSubscription();
    const { name, src, description, seed, instructions, categoryId } = body;

    try {
        if(!companionId){
            return new NextResponse("Companion Id is required", { status: 400 });
        }

        if (!user) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        if (!name || !src || !description || !seed || !instructions || !categoryId) {
            return new NextResponse("Missing parameters", { status: 400 });
        }

        if (!isPro){
            return new NextResponse("Unauthorized", { status: 401 });
        }

        await db.companion.update({
            where: {
                id: companionId,
                userId: user.id
            },
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

        return NextResponse.json({ message: 'Companion updated' }, { status: 200 })

    }
    catch (error) {
        console.log('ERROR UPDATING COMPANION: ', error);
        return new NextResponse("Internal server error", { status: 500 });
    }
}


export async function DELETE(req: Request,
    { params: { companionId } }: { params: { companionId: string } }
) {
    const user = await currentUser();

    try {
        if(!companionId){
            return new NextResponse("Companion Id is required", { status: 400 });
        }

        if (!user) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        await db.companion.delete({
            where: {
                id: companionId
            }
        });

        return NextResponse.json({ message: 'Companion deleted' }, { status: 200 })

    }
    catch (error) {
        console.log('ERROR DELETING COMPANION: ', error);
        return new NextResponse("Internal server error", { status: 500 });
    }
}