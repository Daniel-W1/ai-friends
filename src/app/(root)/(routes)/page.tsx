import CategoriesBar from "@/components/categories-bar"
import Companions from "@/components/companions"
import SearchBar from "@/components/search-bar"
import db from '@/lib/prismadb'

interface HomeProps {
    searchParams:{
        categoryId: string
        name: string
    }        
}

const Home = async ({
    searchParams
}: HomeProps) => {
    
    const categories = await db.category.findMany({})

    const companions = await db.companion.findMany({
        where:{
            categoryId: searchParams.categoryId,
            name: {
                contains: searchParams.name
            }
        },

        orderBy: {
            createdAt: 'desc'
        },

        include: {
            _count: {
                select: { 
                    messages: true 
                }
            }
        }
    })
    

    return (
        <div className="pl-10 pr-5 pt-5">
            <SearchBar/>
            <CategoriesBar categories={categories}/>
            <Companions data ={companions}/>
        </div>
    )
}

export default Home

