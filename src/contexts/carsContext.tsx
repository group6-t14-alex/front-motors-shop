import { api, apiKenzieKars } from "@/services/api";
import {useToast} from "@chakra-ui/toast";
import { parseCookies } from "nookies";
import { ReactNode, createContext, useContext, useEffect, useState } from "react";
import { CarRequest, CarRequestEdit } from "@/schemas/car.schema";
import { createAdReturnInterface } from "@/interfaces/createAd.interface";
import { useAuth } from "./authContext";

interface Props {
    children: ReactNode;
}

interface carProviderData {
    createAd: (carRequest: CarRequest, onClose: () => void) => void;    
    editAd: (formData: CarRequestEdit, id: number, onClose: () => void) => Promise<void>
    // deleteAd: (id: string) => Promise<void>
    deleteAd: (id: string, onClose: () => void) => Promise<void>
    getBrandByFipe: (brand: string) => Promise<any>;
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
    setUserCars: React.Dispatch<React.SetStateAction<createAdReturnInterface[]>>
    filtredCars: any
    setFiltredCars: any
    brandFilter: any
    setBrandFilter: React.Dispatch<any>
    getCarsByBrand: (brand: string) => Promise<void>
    getCarsByModel: (model: string) => Promise<void>
    getCarsByColor: (color: string) => Promise<void>
    getCarsByFuel: (fuel: string) => Promise<void>
    getCarsByYear: (year: number) => Promise<void>
    getCarsByKm: (kmMin: number, kmMax: number) => Promise<void>
    getCarsByPrice: (priceMin: number, priceMax: number) => Promise<void>
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
    const [filtredCars, setFiltredCars] = useState<any>([]);
    const [brandFilter, setBrandFilter] = useState<any>([]);
    
    const {user} = useAuth()
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

    const getCarsByBrand = async (brand: string) => {
        const response = await api.get('/cars');
        const data = response.data.filter((item: { brand: string; }) => item.brand == brand)
        console.log(data);
        setFiltredCars(data);
    };

    const getCarsByModel = async (model: string) => {
        const response = await api.get('/cars');
        const data = response.data.filter((item: { model: string; }) => item.model == model)
        console.log(data);
        setFiltredCars(data);
    };

    const getCarsByColor = async (color: string) => {
        const response = await api.get('/cars');
        const data = response.data.filter((item: { color: string; }) => item.color == color)
        console.log(data);
        setFiltredCars(data);
    };

    const getCarsByFuel = async (fuel: string) => {
        const response = await api.get('/cars');
        const data = response.data.filter((item: { fuel: string; }) => item.fuel == fuel)
        console.log(data);
        setFiltredCars(data);
    };

    const getCarsByYear = async (year: number) => {
        const response = await api.get('/cars');
        const data = response.data.filter((item: { year: number; }) => item.year == year)
        console.log(data);
        setFiltredCars(data);
    };

    const getCarsByKm = async (kmMin: number, kmMax: number) => {
        const response = await api.get('/cars');
        console.log(response.data)
        const data = response.data.filter((item: { km: number; }) => item.km >= kmMin && item.km <= kmMax)
        console.log(data);
        setFiltredCars(data);
    };

    const getCarsByPrice = async (priceMin: number, priceMax: number) => {
        const response = await api.get('/cars');
        console.log(response.data)
        const data = response.data.filter((item: { price: number; }) => 
            item.price >= priceMin && item.price <= priceMax)
        console.log(data);
        setFiltredCars(data);
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

    const editAd = async (formData: CarRequestEdit, id: number, onClose: () => void,) => {
 
        try {

            const response = await api.patch(`/cars/${id}`, formData)

            if (response.data) {
                                
                setAdProfile((prevCarData) =>
                    prevCarData.map((carData) => {
                        if (+carData.id == id) {
                            return response.data
                        }
                        return carData;
                    })
                );

                setUserCars((prevCarData) =>
                    prevCarData.map((carData) => {
                        if (+carData.id == id) {
                            return response.data
                        }
                        return carData;
                })
            );
                onClose();
                
                toast({
                    position: "top-right",
                    title: "Sucesso",
                    description: "Veículo atualizado!",
                    status: "success",
                    duration: 6000,
                    isClosable: true,
                });
            }
                   
        } catch (error) {
            console.log(error)
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

    const deleteAd = async (id: string,  onClose: () => void) => {
        try {
            await api.delete(`/cars/${id}`);            

            const prevAdProfile = adProfile.filter((ad) => {
                return ad.id !== id
            })
            setAdProfile(prevAdProfile)

            const prevAdUserCars = userCars.filter((ad) => {
                return ad.id !== id
            })
            setUserCars(prevAdUserCars)            

            onClose()

            toast({
                position: "top-right",
                title: "Sucesso",
                description: "Anúncio deletado!",
                status: "success",
                duration: 6000,
                isClosable: true,
            });  
            
        } catch (error) {
            console.log(error);
            toast({
                position: "top-right",
                title: "Erro",
                description: "Ocorreu um erro!",
                status: "error",
                duration: 6000,
                isClosable: true,
            });
        }
    }

    const filterOptions = (ads: createAdReturnInterface[]) => {
        const carsBrand = ads.map((model) => model.brand);
        const carsModels = ads.map((model) => model.model);
        const carsColors = ads.map((elem) => elem.color);
        const carsFuel = ads.map((elem) => elem.fuel);
        const carsYears = ads.map((elem) => elem.year);
    
        //remover info repetida
        const modelsSetBrand = new Set(carsBrand);
        const modelsSetModel = new Set(carsModels);
        const modelsSetAnos = new Set(carsYears);
        const modelsSetCores = new Set(carsColors);
        const modelsSetCombustiveis = new Set(carsFuel);
    
        setBrandFilter(Array.from(modelsSetBrand));
        setYears(Array.from(modelsSetAnos));
        setColors(Array.from(modelsSetCores));
        setFuelTypes(Array.from(modelsSetCombustiveis));
        setModels(Array.from(modelsSetModel))
    };


    return (
        <CarContext.Provider value={{createAd, adProfile, setAdProfile, getBrandByFipe, getBrands, userCars,cars,
        setCars, models, years, colors, filterOptions, setYears, setColors, setFuelTypes, fuelTypes, setUserCars,
        filtredCars, setFiltredCars, setBrandFilter, brandFilter, getCarsByBrand, getCarsByModel, getCarsByColor,
        getCarsByFuel, getCarsByYear, getCarsByKm, getCarsByPrice, editAd, deleteAd
        }}>
            {children}
        </CarContext.Provider>
    )
}

export const useCarContext = () => {
    return useContext(CarContext);
};
