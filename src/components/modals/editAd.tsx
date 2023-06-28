import { useCarContext } from '@/contexts/carsContext'
import { FipeApi } from '@/interfaces/carApi.interface'
import { CarRequest, CarRequestEdit, carSchemaRequest } from '@/schemas/car.schema'
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
    FormErrorMessage,
    Select
} from '@chakra-ui/react'

import { useEffect, useState } from 'react'



const EditAd = ({ car, }: any) => {
    const [brand, setBrand] = useState("");
    const [model, setModel] = useState("");
    const [models, setModels] = useState<FipeApi[]>([]);
    const [published, setPublished] = useState("sim");
    const { isOpen, onOpen, onClose } = useDisclosure();

    const {createAd, getBrandByFipe, getBrands, adProfile, editAd, userCars} = useCarContext()
    // console.log(car)
    // console.log(userCars)

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<CarRequest>({
        resolver: zodResolver(carSchemaRequest),
    })

    const handleBrand= async (event: any) => {
        const gettingValue= event.target.value.toLowerCase()

        const verifiyng = getBrands.map((marca) => marca === gettingValue)

        if(verifiyng){
            setBrand(gettingValue)
        }
    }

    useEffect(() => {
        if(brand.length){            
            const getModelsBrand = async () => {
                setModels(await getBrandByFipe(brand))
            }

            getModelsBrand()
        }
    }, [brand, getBrandByFipe])

    const handleModel = async (event: any) => {
        const gettingModelValue= event.target.value.toLowerCase()

        const verifiyngModel = models.map((modelo) => modelo === gettingModelValue)

        if(verifiyngModel){
            setModel(gettingModelValue)
        }        
    }

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


    const submitHandler = (formData: CarRequestEdit) => {
        console.log(formData);
        editAd(formData,onClose);
    };
    
    // const [optionValue, setOptionValue] = React.useState();
    // let options: any[] = []
    // const selectUse = () => {


    //     getBrands.map((brd) =>{
    //         options.push({
    //             label: brd,
    //             value: brd,
    //         })
    //     })
    // };

    return (
        <>
            <Button 
             colorScheme='grey1' 
             variant='outline'
             onClick={onOpen}
            >
                Editar
            </Button>
            
            <Modal motionPreset='slideInBottom' onClose={onClose} isOpen={isOpen} isCentered>
                <ModalOverlay/>

                <ModalContent display={'flex'} alignItems={'center'} bg={'white'} mt={'80px'}>

                    <ModalHeader alignSelf={"flex-start"}>
                        <Heading color={"grey1"} fontSize={"heading7" }fontFamily={"heading"} fontWeight={'500'}>Editar anúncio</Heading>
                        <ModalCloseButton color={"grey4"} border={"1px solid grey4"}/>
                    </ModalHeader>
                    <ModalBody p={'0px'} display={"flex"} flexDirection={'column'} alignItems={"flex-start"} borderRadius='4px' marginTop={"28px"} bg={'white'} gap={'24px'} w={'90%'}>
                        <Text color={"grey1"} fontSize={"body2"} fontFamily={"body"} fontWeight={'500'}>Informações do veículo</Text>

                        <form onSubmit={handleSubmit(submitHandler)}>
                            <Stack display={'flex'} flexDirection={'column'} alignItems={'flex-start'} gap={'24px'} w={'100%'}>
                                <FormControl 
                                  id="brand" 
                                  // isInvalid={Boolean(errors.brand)}
                                >
                                    <FormLabel width={'100%'} color={"grey1"} fontSize={"body2"} fontFamily={"body"} fontWeight={'500'}>Marca</FormLabel>
                                    <Input                                    
                                        defaultValue={car.brand}                                            
                                        {...register('brand')}                                             
                                        color={"grey2"} 
                                        fontSize={"body2"} 
                                        fontFamily={"body"} 
                                        fontWeight={'400'} 
                                        variant='outline' 
                                        placeholder={'Edite a marca'} 
                                        focusBorderColor={'brand1'}
                                    >
                                    </Input>                            
                                    <FormErrorMessage>{errors.brand && errors.brand.message}</FormErrorMessage>
                                </FormControl>

                                <FormControl 
                                  id="model" 
                                //   isInvalid={Boolean(errors.model)}
                                >
                                    <FormLabel width={'100%'} color={"grey1"} fontSize={"body2"} fontFamily={"body"} fontWeight={'500'}>Modelo</FormLabel>
                                    <Input 
                                        defaultValue={car.carName} 
                                        {...register('model')} 
                                        color={"grey2"} 
                                        fontSize={"body2"} 
                                        fontFamily={"body"} 
                                        fontWeight={'400'} 
                                        variant='outline' 
                                        placeholder={'Edite o modelo do carro.'} 
                                        focusBorderColor={'brand1'}
                                    >                                    
                                    </Input>
                                    <FormErrorMessage>{errors.model && errors.model.message}</FormErrorMessage>
                                </FormControl>

                                <Box width={'100%'} display={'flex'} flexDir={'row'} gap={'10px'}>
                                    <FormControl 
                                        id="year" 
                                        // isInvalid={Boolean(errors.year)}  
                                        display={'flex'} 
                                        flexDir={'column'}
                                    >
                                        <FormLabel color={"grey1"} fontSize={"body2"} fontFamily={"body"} fontWeight={'500'}>Ano</FormLabel>
                                        <Input
                                            defaultValue={car.year}
                                            {...register("year")} 
                                            focusBorderColor={'brand1'} 
                                            color={"grey2"} 
                                            fontSize={"body2"} 
                                            fontFamily={"body"} 
                                            fontWeight={'400'} 
                                            variant='outline' 
                                            placeholder={'Ano de fabricação'}                                     
                                        />
                                        <FormErrorMessage>{errors.year && errors.year.message}</FormErrorMessage>
                                    </FormControl>

                                    <FormControl 
                                        id="fuel" 
                                        // isInvalid={Boolean(errors.fuel)} 
                                        display={'flex'} 
                                        flexDir={'column'}
                                    >
                                        <FormLabel color={"grey1"} fontSize={"body2"} fontFamily={"body"} fontWeight={'500'}>Combustível</FormLabel>
                                        <Input 
                                            defaultValue={car.fuel}
                                            {...register("fuel")} 
                                            type={'text'} 
                                            focusBorderColor={'brand1'} 
                                            color={"grey2"} 
                                            fontSize={"body2"} 
                                            fontFamily={"body"} 
                                            fontWeight={'400'} 
                                            variant='outline' 
                                            placeholder={'Gasolina / Etanol'}
                                        />
                                        <FormErrorMessage>{errors.fuel && errors.fuel.message}</FormErrorMessage>
                                    </FormControl>
                                </Box>

                                <Box width={'100%'} display={'flex'} flexDir={'row'}  gap={'10px'}>
                                    <FormControl 
                                        id="km" 
                                        // isInvalid={Boolean(errors.km)}
                                        display={'flex'} 
                                        flexDir={'column'}
                                    >
                                        <FormLabel color={"grey1"} fontSize={"body2"} fontFamily={"body"} fontWeight={'500'}>Quilometragem</FormLabel>
                                        <Input 
                                            defaultValue={car.km}
                                            type={'number'} 
                                            {...register("km")} 
                                            focusBorderColor={'brand1'} 
                                            color={"grey2"} 
                                            fontSize={"body2"} 
                                            fontFamily={"body"} 
                                            fontWeight={'400'} 
                                            variant='outline' 
                                            placeholder={'Insira a quilometragem'}
                                        />

                                        <FormErrorMessage>{errors.km && errors.km.message}</FormErrorMessage>
                                    </FormControl>

                                    <FormControl 
                                        id="color" 
                                        // isInvalid={Boolean(errors.color)} 
                                        display={'flex'} 
                                        flexDir={'column'}
                                    >
                                        <FormLabel color={"grey1"} fontSize={"body2"} fontFamily={"body"} fontWeight={'500'}>Cor</FormLabel>
                                        <Input 
                                            defaultValue={car.color}
                                            {...register("color")} 
                                            type={'text'}  
                                            focusBorderColor={'brand1'} 
                                            color={"grey2"} 
                                            fontSize={"body2"} 
                                            fontFamily={"body"} 
                                            fontWeight={'400'} 
                                            variant='outline' 
                                            placeholder={'Informe a cor'}
                                        />
                                        <FormErrorMessage>{errors.color && errors.color.message}</FormErrorMessage>
                                    </FormControl>
                                </Box>    

                                <Box width={'100%'} display={'flex'} flexDir={'row'}  gap={'10px'}>
                                    <FormControl 
                                        id="priceFipe" 
                                        // isInvalid={Boolean(errors.priceFipe)}
                                        width={'50%'} 
                                        display={'flex'} 
                                        flexDir={'column'}
                                    >
                                        <FormLabel color={"grey1"} fontSize={"body2"} fontFamily={"body"} fontWeight={'500'}>Preço tabela FIPE</FormLabel>
                                        <Input 
                                            defaultValue={car.fipePrice}
                                            {...register("priceFipe")} 
                                            focusBorderColor={'brand1'} 
                                            color={"grey2"} 
                                            fontSize={"body2"} 
                                            fontFamily={"body"} 
                                            fontWeight={'400'} 
                                            variant='outline' 
                                            placeholder={'valor tabela fipe'} 
                                            disabled 
                                            type='number'
                                        />
                                        <FormErrorMessage>{errors.priceFipe && errors.priceFipe.message}</FormErrorMessage>
                                    </FormControl>

                                    <FormControl 
                                        id="price" 
                                        // isInvalid={Boolean(errors.price)}
                                        width={'50%'} 
                                        display={'flex'} 
                                        flexDir={'column'}
                                    >
                                        <FormLabel color={"grey1"} fontSize={"body2"} fontFamily={"body"} fontWeight={'500'}>Preço</FormLabel>
                                        <Input 
                                            defaultValue={car.price}
                                            {...register("price")}  
                                            focusBorderColor={'brand1'} 
                                            color={"grey3"} 
                                            fontSize={"body2"} 
                                            fontFamily={"body"} 
                                            fontWeight={'400'} 
                                            variant='outline' 
                                            placeholder={'Valor do veículo'} 
                                            type='number'
                                        />
                                        <FormErrorMessage>{errors.price && errors.price.message}</FormErrorMessage>
                                    </FormControl>
                                </Box>

                                <FormControl 
                                    id="description" 
                                    isInvalid={Boolean(errors.description)}
                                >
                                    <FormLabel width={'100%'} color={"grey1"} fontSize={"body2"} fontFamily={"body"} fontWeight={'500'}>Descrição </FormLabel>
                                    <Textarea 
                                    defaultValue={car.description}
                                    {...register("description")} 
                                    color={"grey2"} 
                                    fontSize={"body2"} 
                                    fontFamily={"body"} 
                                    fontWeight={'400'} 
                                    variant='outline' 
                                    placeholder={'Trazer informação do carro atual'} 
                                    focusBorderColor={'brand1'}
                                    />
                                </FormControl>

                                <FormControl 
                                 id="published" 
                                //  isInvalid={Boolean(errors.published)}
                                >
                                    <FormLabel  color={"grey1"} fontSize={"body2"} fontFamily={"body"} fontWeight={'500'} width={'100%'}>Publicado</FormLabel>
                                    
                                    <Stack direction="row" spacing={4}>
                                    <Button
                                        bg={published == "sim" ? "brand1" : "white"}
                                        color={published == "sim" ? "white" : "grey0"}
                                        border={published == "sim" ? "white" : "grey3"}
                                        variant={published == "sim" ? "solid" : "outline"}
                                        width={"49%"}
                                        _hover={
                                            published == "sim"
                                            ? { bg: "brand1" }
                                            : { bg: "grey0", color: "grey10" }
                                        }
                                        _focus={
                                            published == "sim"
                                            ? { bg: "brand1" }
                                            : { bg: "brand2", color: "grey10",  }
                                        }
                                        onClick={() => setPublished("sim")}
                                        >
                                        sim
                                        </Button>
                                        <Button
                                        bg={published == "não" ? "brand1" : "white"}
                                        color={published == "não" ? "white" : "grey0"}
                                        border={published == "não" ? "white" : "grey3"}
                                        variant={published == "não" ? "solid" : "outline"}
                                        width={"49%"}
                                        _hover={
                                            published == "não"
                                            ? { bg: "brand1" }
                                            : { bg: "grey0", color: "grey10" }
                                        }
                                        _focus={
                                            published == "não"
                                            ? { bg: "brand1" }
                                            : { bg: "brand2", color: "grey10" }
                                        }
                                        onClick={() => setPublished("não")}
                                        >
                                    não
                                    </Button>
                                </Stack>


                                </FormControl>

                                <FormControl 
                                    id="imageUrl" 
                                    // isInvalid={Boolean(errors.imageUrl)}
                                >
                                    <FormLabel color={"grey1"} fontSize={"body2"} fontFamily={"body"} fontWeight={'500'} width={'100%'}>Imagem da capa</FormLabel>
                                    <Input
                                        defaultValue={car.carImage} 
                                        {...register("imageUrl")} 
                                        type={'text'} 
                                        color={"grey3"} 
                                        fontSize={"body2"} 
                                        fontFamily={"body"} 
                                        fontWeight={'400'} 
                                        variant='outline' 
                                        placeholder={'Link da imagem'} 
                                        focusBorderColor={'brand1'}
                                    />
                                    <FormErrorMessage>{errors.imageUrl && errors.imageUrl.message}</FormErrorMessage>
                                </FormControl>

                                <FormControl>
                                    <FormLabel 
                                        width={'100%'} 
                                        color={"grey1"} 
                                        fontSize={"body2"} 
                                        fontFamily={"body"} 
                                        fontWeight={'500'}
                                    >
                                        1ª imagem da galeria
                                    </FormLabel>
                                    <Input 
                                        type={'text'} 
                                        color={"grey3"} 
                                        fontSize={"body2"} 
                                        fontFamily={"body"} 
                                        fontWeight={'400'} 
                                        variant='outline' 
                                        placeholder={'Link da imagem da Galeria 1'} 
                                        focusBorderColor={'brand1'}
                                    />
                                </FormControl>

                                <FormControl>
                                    <FormLabel 
                                        width={'100%'} 
                                        color={"grey1"} 
                                        fontSize={"body2"} 
                                        fontFamily={"body"} 
                                        fontWeight={'500'}
                                    >
                                        2ª imagem da galeria
                                    </FormLabel>

                                    <Input 
                                        type={'text'} 
                                        color={"grey3"} 
                                        fontSize={"body2"} 
                                        fontFamily={"body"} 
                                        fontWeight={'400'} 
                                        variant='outline' 
                                        placeholder={'Link da imagem da Galeria 2'} 
                                        focusBorderColor={'brand1'}
                                    />
                                </FormControl>

                                <Button size={'sm'} bg={'brand4'} color={'brand1'} marginBottom={'20px'} fontSize={"body2"} fontFamily={"body"} fontWeight={'600'}>Adicionar campo para imagem da galeria</Button>

                                <ModalFooter marginBottom={'32px'} w={'100%'} justifyContent={{cel:'space-between', desk: 'space-between'}} gap={{desk:'0.5rem'}}>
                                    <Button onClick={onClose} w={{cel:'48%', desk:'126px'}} size={'md'} bg={'grey6'} color={"grey2"} fontSize={"body2"} fontFamily={"body"} fontWeight={'600'}>Excluir Anúncio</Button>
                                    <Button type='submit' w={{cel:'48%', desk:'193px'}} size={'md'} bg={'brand3'} color={"brand4"} fontSize={"body2"} fontFamily={"body"} fontWeight={'600'} _hover={{bg:'brand1', color:'white'}}>Salvar Alterações</Button>
                                </ModalFooter>
                            </Stack>
                        </form>
                    </ModalBody>

                </ModalContent>

            </Modal>
        </>
    )
}

export default EditAd

