import { useCarContext } from '@/contexts/carsContext'
import { FipeApi } from '@/interfaces/carApi.interface'
import { CarRequest, carSchemaRequest } from '@/schemas/car.schema'
import { fipeCarsData } from '@/schemas/carsFipe/cars.schema'

import {useForm} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    useDisclosure,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalBody,
    ModalCloseButton,
    ModalHeader,
    Button,
    Heading,
    Text,
    FormLabel,
    Box,
    FormControl,
    Input,
    Textarea,
    ModalFooter,
    Stack,
    FormErrorMessage
} from '@chakra-ui/react'

import { GetServerSideProps } from 'next'
import { useEffect, useState } from 'react'

// export const getServerSideProps: GetServerSideProps = async (cxt) => {
//     const response = await apiKenzieKars.get<fipeCarsData[]>("/cars")



//     return {
//       props: {car: response.data}
//     }
// }

const CreateAd = ({car}: any) => {
    const [brand, setBrand] = useState("");
    const [model, setModel] = useState("");
    const [models, setModels] = useState<FipeApi[]>([]);
    const { isOpen, onOpen, onClose } = useDisclosure();

    const {createAd, getBrandByFipe, getBrands} = useCarContext()

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<CarRequest>({
        resolver: zodResolver(carSchemaRequest),
    })

    const handleBrand= async (event: any) => {
        setBrand(event.target.textContent.toLowerCase())

        await getBrandByFipe(event.target.textContent.toLowerCase())
    }

    useEffect(() => {
        if(brand.length){
            console.log(brand)
            const getModelsBrand = async () => {
                setModels(await getBrandByFipe(brand))
            }

            getModelsBrand()
        }
    }, [brand, getBrandByFipe])

    useEffect(() => {
        if (model.length) {
          const getInfos = async () => {

            const findingModel = models.find((car) => car.name === model);
            if (findingModel) {
              const fuelTypes = ["Flex", "Diesel", "Eletrico"];
              const fuelType = fuelTypes[findingModel.fuel - 1];
         
              setValue("year", findingModel.year);
              setValue("fuel", fuelType);
              setValue("priceFipe", findingModel.value);
            }
          };
          getInfos();
        }

      }, [model, setValue, models]);


    const submitHandler = (formData: CarRequest) => {
        console.log(formData);

        createAd({...formData, km: +formData.km, brand: brand.charAt(0).toUpperCase(), model: model.charAt(0).toUpperCase()});
    };

 
    return (
        <>
            <Button size={'lg'} colorScheme={'brand1'} borderRadius={'4px'} color={'brand1'} fontFamily={'body'} fontWeight={'600'} fontSize={'body1'} variant='outline' _hover={{bg:'brand4'}} onClick={onOpen}>Criar anuncio</Button>

            <Modal onClose={onClose} isOpen={isOpen} isCentered>
                <ModalOverlay/>

                <ModalContent display={'flex'} alignItems={'center'} bg={'white'} mt={'80px'}>

                    <ModalHeader alignSelf={"flex-start"}>
                        <Heading color={"grey1"} fontSize={"heading7" }fontFamily={"heading"} fontWeight={'500'}>Criar anúncio</Heading>
                        <ModalCloseButton color={"grey4"} border={"1px solid grey4"}/>
                    </ModalHeader>
                    <ModalBody p={'0px'} display={"flex"} flexDirection={'column'} alignItems={"flex-start"} borderRadius='4px' marginTop={"28px"} bg={'white'} gap={'24px'} w={'90%'}>
                        <Text color={"grey1"} fontSize={"body2"} fontFamily={"body"} fontWeight={'500'}>Informações do veículo</Text>

                        <form onSubmit={handleSubmit(submitHandler)}>
                            <Stack display={'flex'} flexDirection={'column'} alignItems={'flex-start'} gap={'24px'} w={'100%'}>
                                <FormControl id="brand" isInvalid={Boolean(errors.brand)}>
                                    <FormLabel width={'100%'} color={"grey1"} fontSize={"body2"} fontFamily={"body"} fontWeight={'500'}>Marca</FormLabel>

                                    <Input {...register("brand")} type={'text'} color={"grey3"} fontSize={"body2"} fontFamily={"body"} fontWeight={'400'} variant='outline' placeholder={'Ex: Mercedez Benz'} focusBorderColor={'brand1'} />
                                    {/* <datalist id='brands'>
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
                                    </datalist> */}
                                    <FormErrorMessage>{errors.brand && errors.brand.message}</FormErrorMessage>
                                </FormControl>

                                <FormControl id="model" isInvalid={Boolean(errors.model)}>
                                    <FormLabel width={'100%'} color={"grey1"} fontSize={"body2"} fontFamily={"body"} fontWeight={'500'}>Modelo</FormLabel>

                                    <Input {...register("model")} type={'text'} color={"grey3"} fontSize={"body2"} fontFamily={"body"} fontWeight={'400'} variant='outline' placeholder={'A 200 CGI ADVANCE SEDAN'} focusBorderColor={'brand1'} list='model'/>
                                        <datalist id='model'>
                                            <option value=""></option>
                                        </datalist>

                                    <FormErrorMessage>{errors.model && errors.model.message}</FormErrorMessage>
                                </FormControl>

                                <Box width={'100%'} display={'flex'} flexDir={'row'} gap={'10px'}>
                                    <FormControl id="year" isInvalid={Boolean(errors.year)}  display={'flex'} flexDir={'column'}>
                                        <FormLabel color={"grey1"} fontSize={"body2"} fontFamily={"body"} fontWeight={'500'}>Ano</FormLabel>

                                        <Input {...register("year")} focusBorderColor={'brand1'} color={"grey3"} fontSize={"body2"} fontFamily={"body"} fontWeight={'400'} variant='outline' placeholder={'2018'}/>

                                        <FormErrorMessage>{errors.year && errors.year.message}</FormErrorMessage>
                                    </FormControl>

                                    <FormControl id="fuel" isInvalid={Boolean(errors.fuel)} display={'flex'} flexDir={'column'}>
                                        <FormLabel color={"grey1"} fontSize={"body2"} fontFamily={"body"} fontWeight={'500'}>Combustível</FormLabel>
                                        <Input {...register("fuel")} type={'text'} focusBorderColor={'brand1'} color={"grey3"} fontSize={"body2"} fontFamily={"body"} fontWeight={'400'} variant='outline' placeholder={'Gasolina / Etanol'}/>

                                        <FormErrorMessage>{errors.fuel && errors.fuel.message}</FormErrorMessage>
                                    </FormControl>
                                </Box>

                                <Box width={'100%'} display={'flex'} flexDir={'row'}  gap={'10px'}>
                                    <FormControl id="km" isInvalid={Boolean(errors.km)} display={'flex'} flexDir={'column'}>
                                        <FormLabel color={"grey1"} fontSize={"body2"} fontFamily={"body"} fontWeight={'500'}>Quilometragem</FormLabel>

                                        <Input {...register("km")} focusBorderColor={'brand1'} color={"grey3"} fontSize={"body2"} fontFamily={"body"} fontWeight={'400'} variant='outline' placeholder={'30.000'}/>

                                        <FormErrorMessage>{errors.km && errors.km.message}</FormErrorMessage>
                                    </FormControl>

                                    <FormControl id="color" isInvalid={Boolean(errors.color)} display={'flex'} flexDir={'column'}>
                                        <FormLabel color={"grey1"} fontSize={"body2"} fontFamily={"body"} fontWeight={'500'}>Cor</FormLabel>

                                        <Input {...register("color")} type={'text'}  focusBorderColor={'brand1'} color={"grey3"} fontSize={"body2"} fontFamily={"body"} fontWeight={'400'} variant='outline' placeholder={'Branco'}/>

                                        <FormErrorMessage>{errors.color && errors.color.message}</FormErrorMessage>
                                    </FormControl>
                                </Box>
    

                                <Box width={'100%'} display={'flex'} flexDir={'row'}  gap={'10px'}>
                                    <FormControl id="priceFipe" isInvalid={Boolean(errors.priceFipe)}  width={'50%'} display={'flex'} flexDir={'column'}>
                                        <FormLabel color={"grey1"} fontSize={"body2"} fontFamily={"body"} fontWeight={'500'}>Preço tabela FIPE</FormLabel>

                                        <Input {...register("priceFipe")}   focusBorderColor={'brand1'} color={"grey3"} fontSize={"body2"} fontFamily={"body"} fontWeight={'400'} variant='outline' placeholder={'R$ 48.000,00'}/>

                                        <FormErrorMessage>{errors.priceFipe && errors.priceFipe.message}</FormErrorMessage>
                                    </FormControl>

                                    <FormControl id="price" isInvalid={Boolean(errors.price)}  width={'50%'} display={'flex'} flexDir={'column'}>
                                        <FormLabel color={"grey1"} fontSize={"body2"} fontFamily={"body"} fontWeight={'500'}>Preço</FormLabel>

                                        <Input {...register("price")}  focusBorderColor={'brand1'} color={"grey3"} fontSize={"body2"} fontFamily={"body"} fontWeight={'400'} variant='outline' placeholder={'R$ 50.000,00'}/>

                                        <FormErrorMessage>{errors.price && errors.price.message}</FormErrorMessage>
                                    </FormControl>
                                </Box>

                                <FormControl id="description" isInvalid={Boolean(errors.description)}>
                                    <FormLabel width={'100%'} color={"grey1"} fontSize={"body2"} fontFamily={"body"} fontWeight={'500'}>Descrição </FormLabel>
                                    <Textarea {...register("description")} color={"grey2"} fontSize={"body2"} fontFamily={"body"} fontWeight={'400'}  variant='outline' placeholder={'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry.'} focusBorderColor={'brand1'}/>
                                </FormControl>

                                <FormControl id="imageUrl" isInvalid={Boolean(errors.imageUrl)}>
                                    <FormLabel  color={"grey1"} fontSize={"body2"} fontFamily={"body"} fontWeight={'500'} width={'100%'}>Imagem da capa</FormLabel>

                                    <Input {...register("imageUrl")} type={'text'} color={"grey3"} fontSize={"body2"} fontFamily={"body"} fontWeight={'400'} variant='outline' placeholder={'https://image.com'} focusBorderColor={'brand1'}/>

                                    <FormErrorMessage>{errors.imageUrl && errors.imageUrl.message}</FormErrorMessage>
                                </FormControl>

                                <FormControl>
                                    <FormLabel width={'100%'} color={"grey1"} fontSize={"body2"} fontFamily={"body"} fontWeight={'500'}>1ª imagem da galeria</FormLabel>

                                    <Input type={'text'} color={"grey3"} fontSize={"body2"} fontFamily={"body"} fontWeight={'400'} variant='outline' placeholder={'https://image.com'} focusBorderColor={'brand1'}/>
                                </FormControl>

                                <FormControl>
                                    <FormLabel width={'100%'} color={"grey1"} fontSize={"body2"} fontFamily={"body"} fontWeight={'500'}>2ª imagem da galeria</FormLabel>

                                    <Input type={'text'} color={"grey3"} fontSize={"body2"} fontFamily={"body"} fontWeight={'400'} variant='outline' placeholder={'https://image.com'} focusBorderColor={'brand1'}/>
                                </FormControl>

                                <Button size={'sm'} bg={'brand4'} color={'brand1'} marginBottom={'20px'} fontSize={"body2"} fontFamily={"body"} fontWeight={'600'}>Adicionar campo para imagem da galeria</Button>

                                <ModalFooter marginBottom={'32px'} w={'100%'} justifyContent={{cel:'space-between', desk: 'flex-end'}} gap={{desk:'0.5rem'}}>
                                    <Button onClick={() => onClose} w={{cel:'48%', desk:'126px'}} size={'md'} bg={'grey6'} color={"grey2"} fontSize={"body2"} fontFamily={"body"} fontWeight={'600'}>Cancelar</Button>
                                    <Button type='submit' w={{cel:'48%', desk:'193px'}} size={'md'} bg={'brand3'} color={"brand4"} fontSize={"body2"} fontFamily={"body"} fontWeight={'600'} _hover={{bg:'brand1', color:'white'}}>Criar Anúncio</Button>
                                </ModalFooter>
                            </Stack>
                        </form>
                    </ModalBody>

                </ModalContent>

            </Modal>
        </>
    )
}

export default CreateAd

