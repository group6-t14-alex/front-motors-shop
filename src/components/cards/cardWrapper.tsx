import { UnorderedList, Box } from '@chakra-ui/react'
import CardUser from './userCard'
import { wrap } from 'module'


const CardWrapper = () => {
    return (
        <UnorderedList maxWidth='1032px' display='flex' flexWrap='wrap' justifyContent='space-between' margin='0 auto'>
            <CardUser carName={'Maserati - Ghibli'}/>
            <CardUser carName={'Brasília'}/>
            <CardUser carName={'Fusca'}/>
            <CardUser carName={'Opala'}/>
            <CardUser carName={'Kadet'}/>
            <CardUser carName={'Passat'}/>
        </UnorderedList>
    )
}

export default CardWrapper