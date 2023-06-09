import { Box } from '@chakra-ui/react'
import CardUser from './userCard'


const CardWrapper = () => {

    return (
        <Box maxWidth='1032px' display='flex'  
        flexWrap={{desk:'wrap', cel: 'nowrap'}}
        justifyContent='space-between' bgColor={'white'} 
            width={'100%'} maxW={{desk: '1032px', cel: '100%'}} 
            minW={'302px'} minH={'388px'} 
            overflowX={{cel: 'auto'}} gap={{cel: '12px'}}>
            <CardUser carName={'Maserati - Ghibli'} price={10000} fipePrice={6000}/>
            <CardUser carName={'Brasília'} price={2000} fipePrice={5000}/>
            <CardUser carName={'Fusca'} price={5000} fipePrice={4000}/>
            <CardUser carName={'Opala'} price={4000} fipePrice={8000}/>
            <CardUser carName={'Kadet'} price={5000} fipePrice={2000}/>
            <CardUser carName={'Passat'} price={6000} fipePrice={7000}/>
            {/* Componente com valores pra testar a função do icone desconto*/}
        </Box>
    )
}
// flexWrap={{desk: 'wrap', med: 'wrap', cel: 'nowrap'}}

export default CardWrapper