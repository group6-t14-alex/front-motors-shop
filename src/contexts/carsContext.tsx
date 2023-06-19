import { api, apiKenzieKars } from "@/services/api";
import {useToast} from "@chakra-ui/toast";
import { parseCookies } from "nookies";
import { ReactNode, createContext, useContext, useEffect, useState } from "react";
import { CarRequest } from "@/schemas/car.schema";
import { createAdReturnInterface } from "@/interfaces/createAd.interface";
import jwt_decode from "jwt-decode"

interface Props {
    children: ReactNode;
}

interface carProviderData {
    createAd: (carRequest: CarRequest, onClose: () => void) => void;
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
    const cookies = parseCookies();

    if (cookies["@MotorsShop"]) {
        api.defaults.headers.common.authorization = `Bearer ${cookies["@MotorsShop"]}`;
    }


    useEffect(() => {
        const getApiFipe = async () => {
            try {
                const response = await apiKenzieKars.get("")
    
                const arrayOfbrands: any = []; 
    
                Object.keys(response.data).forEach(key => {
                    arrayOfbrands.push(key);
                })
    
                
    
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
        
        return result;
    };

    const createAd = async (carRequest: CarRequest, onClose: () => void) => {
        
        
        try {
            const response = await api.post("/cars", carRequest)
            console.log(response)
            if(response.data){

                
                setAdProfile(response.data)

                toast({
                    position: "top-right",
                    title: "Sucesso",
                    description: "anúncio criado com sucesso!",
                    status: "success",
                    duration: 6000,
                    isClosable: true,
                  });


                  onClose();
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


