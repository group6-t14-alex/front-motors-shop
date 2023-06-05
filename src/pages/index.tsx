import { Lexend } from 'next/font/google'
import CardUser from '@/components/cards/userCard'
import { NextPage } from 'next'
const lexendFont = Lexend({ subsets: ['latin'] })

const HomePage: NextPage = () => {
  return (
    <main>
      <CardUser/>
    </main>
  )
}

export default HomePage
