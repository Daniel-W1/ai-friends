import db from '@/lib/prismadb'
import { currentUser } from '@clerk/nextjs';
import { NextResponse } from 'next/server';

export async function POST(req: Request){           
    const body = await req.json();
    const user = await currentUser();
    const {name, src, description, seed, instructions, categoryId} = body;
        
    try {
        if(!user){
            return {
                status: 401,
                body: {
                    error: 'Unauthorized'
                }
            }
        }
    
        if(!name || !src || !description || !seed || !instructions || !categoryId){
            return {
                status: 400,
                body: {
                    error: 'Missing parameters'
                }
            }
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