import { api, apiKenzieKars } from "@/services/api";
import {useToast} from "@chakra-ui/toast";
import { ReactNode, createContext, useContext, useEffect, useState } from "react";
import { CarRequest } from "@/schemas/car.schema";
import { createAdReturnInterface } from "@/interfaces/createAd.interface";


interface Props {
    children: ReactNode;
}


interface carProviderData {
    createAd: (carRequest: CarRequest) => void;
    getBrandByFipe: (brand: string) => Promise<any>;
    adProfile: createAdReturnInterface[];
    setAdProfile:React.Dispatch<React.SetStateAction<createAdReturnInterface[]>>;
    getBrands: never[]
}

const CarContext = createContext<carProviderData>({} as carProviderData);

export const CarProvider = ({children}: Props) => {
    const [adProfile, setAdProfile] = useState<
    createAdReturnInterface[]
  >([]);
    const toast = useToast();
    const [getBrands, setGetBrands] = useState([])

    useEffect(() => {
        const getApiFipe = async () => {
            try {
                const response = await apiKenzieKars.get("")
    
                const arrayOfbrands: any = []; 
    
                Object.keys(response.data).forEach(key => {
                    arrayOfbrands.push(key);
                })
    
                console.log(arrayOfbrands)
    
                setGetBrands(arrayOfbrands)
    
            } catch (error) {
                console.log(error)
            }
        }

        getApiFipe()
    }, [])
    

    const getBrandByFipe = async (brand: string) => {
        const { data: result }= await apiKenzieKars.get("", {
          params: { brand: brand },
        });
        console.log(brand)
        return result;
    };

    const createAd = async (carRequest: CarRequest) => {
        const token = localStorage.getItem("motorsShop")
        try {
            const response = await api.post("/cars", carRequest,{
                headers: {
                  Authorization: `Bearer ${token}`
                }
            })

            if(response.data){
                
                setAdProfile(response.data)
                console.log(adProfile)

                toast({
                    position: "top-right",
                    title: "Sucesso",
                    description: "anúncio criado com sucesso!",
                    status: "success",
                    duration: 6000,
                    isClosable: true,
                  });;
            }

        } catch (errors) {
            console.log(errors)
            toast({
                position: "top-right",
                title: "Error",
                description: "Ops! tente novamente",
                status: "error",
                duration: 6000,
                isClosable: true,
              });
        }
    };


    return (
        <CarContext.Provider value={{createAd, adProfile, setAdProfile, getBrandByFipe, getBrands}}>
            {children}
        </CarContext.Provider>
    )
}

export const useCarContext = () => {
    return useContext(CarContext);
};


