import { fipeCarsData } from '@/schem/carsFipe/cars.schema'
import apiKenzieKars from '@/services/api'
import {
    Button,
    FormControl,
    FormLabel,
    Input,
    Box,
    ButtonGroup,
    Textarea,
    useDisclosure
} from '@chakra-ui/react'
import { GetServerSideProps } from 'next'

// interface CreateAdProps {
//     car: fipeCarsData[]
// }

export const getServerSideProps: GetServerSideProps = async (cxt) => {
    const response = await apiKenzieKars.get<fipeCarsData[]>("cars")

    return {
      props: {car: response.data}
    }
}

const CreateAdForm = ({car}: any) => {
    const { onClose } = useDisclosure();

    console.log(car)

    return (
        <>
            <form>
                <FormControl display={'flex'} flexDirection={'column'} alignItems={'flex-start'} gap={'24px'} w={'100%'}>
                    <FormLabel width={'100%'} color={"grey1"} fontSize={"body2"} fontFamily={"body"} fontWeight={'500'}>Marca 
                    <Input type={'text'} color={"grey3"} fontSize={"body2"} fontFamily={"body"} fontWeight={'400'} variant='outline' placeholder={'Mercedez Benz'} focusBorderColor={'brand1'} list='brand'/>
                    <datalist id='brand'>
                        <option value="chevrolet"></option>
                        <option value="citroen"></option>
                        <option value="fiat"></option>
                        <option value="ford"></option>
                        <option value="honda"></option>
                        <option value="Hyundai"></option>
                        <option value="nissan"></option>
                        <option value="peugeot"></option>
                        <option value="renault"></option>
                        <option value="toyota"></option>
                        <option value="volkswagen"></option>
                    </datalist>
                    </FormLabel>

                    <FormLabel width={'100%'} color={"grey1"} fontSize={"body2"} fontFamily={"body"} fontWeight={'500'}>Modelo
                    <Input type={'text'} color={"grey3"} fontSize={"body2"} fontFamily={"body"} fontWeight={'400'} variant='outline' placeholder={'A 200 CGI ADVANCE SEDAN'} focusBorderColor={'brand1'}/>
                    </FormLabel>

                    <Box width={'100%'} display={'flex'} flexDir={'row'}>
                        <Box  display={'flex'} flexDir={'column'}>
                            <FormLabel color={"grey1"} fontSize={"body2"} fontFamily={"body"} fontWeight={'500'}>Ano
                            <Input type={'number'} focusBorderColor={'brand1'} color={"grey3"} fontSize={"body2"} fontFamily={"body"} fontWeight={'400'} variant='outline' placeholder={'2018'}/>
                            </FormLabel>
                        </Box>

                        <Box display={'flex'} flexDir={'column'}>
                            <FormLabel color={"grey1"} fontSize={"body2"} fontFamily={"body"} fontWeight={'500'}>Combustível
                            <Input type={'text'} focusBorderColor={'brand1'} color={"grey3"} fontSize={"body2"} fontFamily={"body"} fontWeight={'400'} variant='outline' placeholder={'Gasolina / Etanol'}/>
                            </FormLabel>
                        </Box>
                    </Box>

                    <Box width={'100%'} display={'flex'} flexDir={'row'}>
                        <Box display={'flex'} flexDir={'column'}>
                            <FormLabel color={"grey1"} fontSize={"body2"} fontFamily={"body"} fontWeight={'500'}>Quilometragem
                            <Input type={'number'} focusBorderColor={'brand1'} color={"grey3"} fontSize={"body2"} fontFamily={"body"} fontWeight={'400'} variant='outline' placeholder={'30.000'}/>
                            </FormLabel>
                        </Box>

                        <Box display={'flex'} flexDir={'column'}>
                            <FormLabel color={"grey1"} fontSize={"body2"} fontFamily={"body"} fontWeight={'500'}>Cor
                            <Input type={'text'}  focusBorderColor={'brand1'} color={"grey3"} fontSize={"body2"} fontFamily={"body"} fontWeight={'400'} variant='outline' placeholder={'Branco'}/>
                            </FormLabel>
                        </Box>
                    </Box>
    

                    <Box width={'100%'} display={'flex'} flexDir={'row'}>
                        <Box width={'50%'} display={'flex'} flexDir={'column'}>
                            <FormLabel color={"grey1"} fontSize={"body2"} fontFamily={"body"} fontWeight={'500'}>Preço tabela FIPE
                            <Input type={'number'}  focusBorderColor={'brand1'} color={"grey3"} fontSize={"body2"} fontFamily={"body"} fontWeight={'400'} variant='outline' placeholder={'R$ 48.000,00'}/>
                            </FormLabel>
                        </Box>

                        <Box width={'50%'} display={'flex'} flexDir={'column'}>
                            <FormLabel color={"grey1"} fontSize={"body2"} fontFamily={"body"} fontWeight={'500'}>Preço
                            <Input type={'number'}  focusBorderColor={'brand1'} color={"grey3"} fontSize={"body2"} fontFamily={"body"} fontWeight={'400'} variant='outline' placeholder={'R$ 50.000,00'}/>
                            </FormLabel>
                        </Box>
                    </Box>

                    <FormLabel width={'100%'} color={"grey1"} fontSize={"body2"} fontFamily={"body"} fontWeight={'500'}>Descrição </FormLabel>
                    <Textarea color={"grey2"} fontSize={"body2"} fontFamily={"body"} fontWeight={'400'}  variant='outline' placeholder={'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry.'} focusBorderColor={'brand1'}/>

                    <FormLabel  color={"grey1"} fontSize={"body2"} fontFamily={"body"} fontWeight={'500'} width={'100%'}>Imagem da capa
                    <Input type={'text'} color={"grey3"} fontSize={"body2"} fontFamily={"body"} fontWeight={'400'} variant='outline' placeholder={'https://image.com'} focusBorderColor={'brand1'}/>
                    </FormLabel>

                    <FormLabel width={'100%'} color={"grey1"} fontSize={"body2"} fontFamily={"body"} fontWeight={'500'}>1ª imagem da galeria
                    <Input type={'text'} color={"grey3"} fontSize={"body2"} fontFamily={"body"} fontWeight={'400'} variant='outline' placeholder={'https://image.com'} focusBorderColor={'brand1'}/>
                    </FormLabel>

                    <FormLabel width={'100%'} color={"grey1"} fontSize={"body2"} fontFamily={"body"} fontWeight={'500'}>2ª imagem da galeria
                    <Input type={'text'} color={"grey3"} fontSize={"body2"} fontFamily={"body"} fontWeight={'400'} variant='outline' focusBorderColor={'brand1'} placeholder={'https://image.com'}/>
                    </FormLabel>

                    <Button size={'sm'} bg={'brand4'} color={'brand1'} marginBottom={'20px'} fontSize={"body2"} fontFamily={"body"} fontWeight={'600'}>Adicionar campo para imagem da galeria</Button>

                    <ButtonGroup marginBottom={'32px'} w={'100%'} justifyContent={{cel:'center', desk: 'flex-end'}}>
                        <Button onClick={() => onClose} w={{cel:'48%', desk:'126px'}} size={'md'} bg={'grey6'} color={"grey2"} fontSize={"body2"} fontFamily={"body"} fontWeight={'600'}>Cancelar</Button>
                        <Button type='submit' w={{cel:'48%', desk:'193px'}} size={'md'} bg={'brand3'} color={"brand4"} fontSize={"body2"} fontFamily={"body"} fontWeight={'600'} _hover={{bg:'brand1', color:'white'}}>Criar Anúncio</Button>
                    </ButtonGroup>
                </FormControl>
            </form>
        </>
    )
}

export default CreateAdForm