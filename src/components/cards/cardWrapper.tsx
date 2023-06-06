import { UnorderedList, Box } from '@chakra-ui/react'
import CardUser from './userCard'
import { wrap } from 'module'


const CardWrapper = () => {

    return (
        <UnorderedList maxWidth='1032px' display='flex' flexWrap='wrap' justifyContent='space-between' margin='0 auto'>
            <CardUser carName={'Maserati - Ghibli'} price={10000} fipePrice={6000}/>
            <CardUser carName={'Brasília'} price={2000} fipePrice={5000}/>
            <CardUser carName={'Fusca'} price={5000} fipePrice={4000}/>
            <CardUser carName={'Opala'} price={4000} fipePrice={8000}/>
            <CardUser carName={'Kadet'} price={5000} fipePrice={2000}/>
            <CardUser carName={'Passat'} price={6000} fipePrice={7000}/>
        </UnorderedList>
    )
}

export default CardWrapper