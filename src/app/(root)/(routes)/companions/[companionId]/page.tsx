import CompanionForm from '@/components/companion-form'
import db from '@/lib/prismadb'
import { auth } from '@clerk/nextjs'

interface CompanionIdPageProps {
    params: {
        companionId: string
    }
}

const CompanionIdPage = async ({
    params
}: CompanionIdPageProps) => {

  const { userId } = auth();

  const companion = await db.companion.findUnique({
      where: {
          id: params.companionId,
          userId: userId!
      }
  })

  const categories = await db.category.findMany()

  return (
    <CompanionForm categories={categories} companion={companion} />
  )
}

export default CompanionIdPage