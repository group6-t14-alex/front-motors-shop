import { api, apiKenzieKars } from "@/services/api";
import { useToast } from "@chakra-ui/toast";
import { parseCookies } from "nookies";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { CarRequest } from "@/schemas/car.schema";
import { createAdReturnInterface } from "@/interfaces/createAd.interface";
import { useAuth } from "./authContext";
import { GetServerSideProps } from "next";

interface Props {
  children: ReactNode;
}

interface carProviderData {
    createAd: (carRequest: CarRequest, onClose: () => void) => void;
    getBrandByFipe: (brand: string) => Promise<any>;
    adProfile: createAdReturnInterface[];
    setAdProfile:React.Dispatch<React.SetStateAction<createAdReturnInterface[]>>;
    getBrands: string[];
    userCars:createAdReturnInterface[];
    models:string[];
    years: number[];
    colors: string[];
    filterOptions: (ads: createAdReturnInterface[]) => void;
}

const CarContext = createContext<carProviderData>({} as carProviderData);


export const CarProvider = ({children}: Props) => {
    const [adProfile, setAdProfile] = useState<createAdReturnInterface[]>([]);
    const [userCars, setUserCars] = useState<createAdReturnInterface[]>([]);
    const [models, setModels] = useState<string[]>([]);
    const [fuelTypes, setFuelTypes] = useState<string[]>([]);
    const [getBrands, setGetBrands] = useState<string[]>([]);
    const [years, setYears] = useState<number[]>([]);
    const [colors, setColors] = useState<string[]>([]);
    
    const {user} = useAuth()
    const toast = useToast();

    const cookies = parseCookies();

    if (cookies["@MotorsShop"]) {
        api.defaults.headers.common.authorization = `Bearer ${cookies["@MotorsShop"]}`;
    }

  const { user } = useAuth();
  const toast = useToast();
  const [getBrands, setGetBrands] = useState([]);
  const cookies = parseCookies();

  if (cookies["@MotorsShop"]) {
    api.defaults.headers.common.authorization = `Bearer ${cookies["@MotorsShop"]}`;
  }

  useEffect(() => {
    const getApiFipe = async () => {
      try {
        const response = await apiKenzieKars.get("");

        const arrayOfbrands: any = [];

        Object.keys(response.data).forEach((key) => {
          arrayOfbrands.push(key);
        });

        setGetBrands(arrayOfbrands);
      } catch (error) {
        console.log(error);
      }
    };

    getApiFipe();
  }, []);

  const getBrandByFipe = async (brand: string) => {
    const { data: result } = await apiKenzieKars.get("", {
      params: { brand: brand },
    });

    return result;
  };


    const filterOptions = (ads: createAdReturnInterface[]) => {
    
        const carsColors = ads.map((elem) => elem.color);
        const carsFuel = ads.map((elem) => elem.fuel);
        const carsYears = ads.map((elem) => elem.year);
    
        //remover info repetida
        const modelsSetAnos = new Set(carsYears);
        const modelsSetCores = new Set(carsColors);
        const modelsSetCombustiveis = new Set(carsFuel);
    
        setYears(Array.from(modelsSetAnos));
        setColors(Array.from(modelsSetCores));
        setFuelTypes(Array.from(modelsSetCombustiveis));
    };

    return (
        <CarContext.Provider value={{createAd, adProfile, setAdProfile, getBrandByFipe, getBrands, userCars, models, years, colors, filterOptions}}>
            {children}
        </CarContext.Provider>
    )
}


      if (response.data) {
        setAdProfile((previousProfile) => [...previousProfile, response.data]);
        setUserCars((previousUserCars) => [...previousUserCars, response.data]);

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
      console.log(errors);
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

  useEffect(() => {
    const getUserCars = async () => {
      try {
        const response = await api.get(`/user/${user!.id}`);

        if (response.data) {
          setUserCars(response.data.car);
        }
      } catch (errors) {
        console.log(errors);
      }
    };

    getUserCars();
  }, [user]);

  return (
    <CarContext.Provider
      value={{
        createAd,
        adProfile,
        setAdProfile,
        getBrandByFipe,
        getBrands,
        userCars,
        cars,
        setCars,
      }}
    >
      {children}
    </CarContext.Provider>
  );
};

export const useCarContext = () => {
  return useContext(CarContext);
};
