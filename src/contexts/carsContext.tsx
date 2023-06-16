import { api, apiKenzieKars } from "@/services/api";
import Toast from "@/components/Toasts/toast";
import { ReactNode, createContext, useContext, useEffect, useState } from "react";
import { CarRequest } from "@/schemas/car.schema";
import { CreateAdInterface, createAdReturnInterface } from "@/interfaces/createAd.interface";


interface Props {
    children: ReactNode;
}


interface carProviderData {
    createAd: (carRequest: CarRequest) => void;
    getBrandByFipe: (brand: string) => Promise<any>;
    adProfile: createAdReturnInterface[];
    setAdProfile:React.Dispatch<React.SetStateAction<createAdReturnInterface[]>>;
    getBrands: []
}

const CarContext = createContext<carProviderData>({} as carProviderData);

export const CarProvider = ({children}: Props) => {
    const [adProfile, setAdProfile] = useState<
    createAdReturnInterface[]
  >([]);
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
        try {
            const response = await api.post("/cars", carRequest)

            if(response.data){
                console.log(response.data)
                setAdProfile(response.data)

                Toast({ message: "Anúncio criado com sucesso"});
            }

        } catch (error) {
            Toast({ message: "Erro ao anunciar veículo. Tente novamente!" });
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


