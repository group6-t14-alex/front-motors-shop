import { api, apiKenzieKars } from "@/services/api";
import { CarRequest } from "@/schemas/car.schema";
import { createAdReturnInterface } from "@/interfaces/createAd.interface";

import {useToast} from "@chakra-ui/toast";
import { parseCookies } from "nookies";
import { ReactNode, createContext, useContext, useEffect, useState } from "react";

interface Props {
    children: ReactNode;
}

interface carProviderData {
    createAd: (carRequest: CarRequest, onClose: () => void) => void;
    getBrandByFipe: (brand: string) => Promise<any>;
    getFilteredCarsBrand: (selectedFilters: string, existingCars: string[]) => void;
    adProfile: createAdReturnInterface[];
    setAdProfile:React.Dispatch<React.SetStateAction<createAdReturnInterface[]>>;
    getBrands: string[];
    userCars:createAdReturnInterface[];
    models:string[];
    cars:createAdReturnInterface[];
    setCars:React.Dispatch<React.SetStateAction<createAdReturnInterface[]>>;
    years: number[];
    setYears: React.Dispatch<React.SetStateAction<number[]>>
    colors: string[];
    setColors: React.Dispatch<React.SetStateAction<string[]>>
    setFuelTypes: React.Dispatch<React.SetStateAction<string[]>>;
    fuelTypes: string[]
    filterOptions: (ads: createAdReturnInterface[]) => void;
    setUserCars: React.Dispatch<React.SetStateAction<createAdReturnInterface[]>>;
    selectedCars: string;
    setSelectedCars:React.Dispatch<React.SetStateAction<string>>;
}

const CarContext = createContext<carProviderData>({} as carProviderData);

export const CarProvider = ({children}: Props) => {
    const [adProfile, setAdProfile] = useState<createAdReturnInterface[]>([]);
    const [userCars, setUserCars] = useState<createAdReturnInterface[]>([]);
    const [models, setModels] = useState<string[]>([]);
    const [cars, setCars] = useState<createAdReturnInterface[]>([]);
    const [fuelTypes, setFuelTypes] = useState<string[]>([]);
    const [getBrands, setGetBrands] = useState<string[]>([]);
    const [years, setYears] = useState<number[]>([]);
    const [colors, setColors] = useState<string[]>([]);
    const [maxKm, setMaxKm] = useState<string | undefined>();
    const [minKm, setMinKm] = useState<string | undefined>();
    const [maxPrice, setMaxPrice] = useState<string | undefined>();
    const [minPrice, setMinPrice] = useState<string | undefined>();
    const [selectedCars, setSelectedCars] = useState<string>("")

    const toast = useToast();

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
            
            if(response.data){
                
                setAdProfile((previousProfile) => [...previousProfile,response.data])
                setUserCars((previousUserCars) => [...previousUserCars, response.data])

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

    const filterOptions = (ads: createAdReturnInterface[]) => {
        const carsModels = ads.map((model) => model.model)
        const carsColors = ads.map((elem) => elem.color);
        const carsFuel = ads.map((elem) => elem.fuel);
        const carsYears = ads.map((elem) => elem.year);
    
        //remover info repetida
        const modelsSetModel = new Set(carsModels)
        const modelsSetAnos = new Set(carsYears);
        const modelsSetCores = new Set(carsColors);
        const modelsSetCombustiveis = new Set(carsFuel);
    
        setYears(Array.from(modelsSetAnos));
        setColors(Array.from(modelsSetCores));
        setFuelTypes(Array.from(modelsSetCombustiveis));
        setModels(Array.from(modelsSetModel))
    };

    const getFilteredCarsBrand = (selectedFilters: string, existingCars: string[]) => {
        return existingCars.filter(car => car === selectedFilters)
    }


    return (
        <CarContext.Provider value={{createAd, adProfile, setAdProfile, getBrandByFipe, getBrands, userCars,cars,
        setCars, models, years, colors, filterOptions, setYears, setColors, setFuelTypes, fuelTypes, setUserCars, selectedCars, setSelectedCars, getFilteredCarsBrand}}>
            {children}
        </CarContext.Provider>
    )



}

export const useCarContext = () => {
    return useContext(CarContext);
};


