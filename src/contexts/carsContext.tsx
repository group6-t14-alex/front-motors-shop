import { api, apiKenzieKars } from "@/services/api";
import Toast from "@/components/Toasts/toast";
import { useRouter } from "next/router";
import { ReactNode, createContext, useContext, useState } from "react";
import { CarRequest } from "@/schemas/car.schema";
import { CreateAdInterface, createAdReturnInterface } from "@/interfaces/createAd.interface";


interface Props {
    children: ReactNode;
  }

  interface carProviderData {
    createAd: (carRequest: CarRequest) => void;
    getBrandByFipe: (brand: string) => Promise<any>;
    adProfile: createAdReturnInterface[];
    setAdProfile:React.Dispatch<React.SetStateAction<createAdReturnInterface[]>>
  }

const CarContext = createContext<carProviderData>({} as carProviderData);

export const CarProvider = ({children}: Props) => {
    const [adProfile, setAdProfile] = useState<
    createAdReturnInterface[]
  >([]);
    const router = useRouter();

    const getBrandByFipe = async (brand: string) => {
        const { data: result }= await apiKenzieKars.get("/", {
          params: { brand: brand },
        });
        console.log(brand)
        return result;
    };

    const createAd = async (carRequest: CarRequest) => {
        try {
            const response = await api.post("/cars", carRequest)

            if(response.data){
                setAdProfile(response.data.car)

                Toast({ message: "Anúncio criado com sucesso"});
            }

        } catch (error) {
            Toast({ message: "Erro ao anunciar veículo. Tente novamente!" });
        }
    };


    return (
        <CarContext.Provider value={{createAd, getBrandByFipe, adProfile, setAdProfile}}>
            {children}
        </CarContext.Provider>
    )
}

export const useCarContext = () => {
    return useContext(CarContext);
};


