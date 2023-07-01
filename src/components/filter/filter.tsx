import { UnorderedList, Input, Box, Text, Button } from "@chakra-ui/react";
import FilterList from "./filterList/filtersList";
import { useCarContext } from "@/contexts/carsContext";
import { useEffect, useState } from "react";
import { api } from "@/services/api";
import { createAdReturnInterface } from "@/interfaces/createAd.interface";

const Filter = () => {
  const [kmMin, setKmMin] = useState(0);
  const [kmMax, setKmMax] = useState(0);
  const [priceMin, setPriceMin] = useState(0);
  const [priceMax, setPriceMax] = useState(0);  

  const { 
    getBrands, colors, filterOptions, years, fuelTypes, models, filtredCars, 
    setFiltredCars, brandFilter, getCarsByBrand, getCarsByModel, getCarsByColor, 
    getCarsByFuel, getCarsByKm, getCarsByYear, getCarsByPrice, getAllAvailableCars
  } = useCarContext()
  


    useEffect(() => {
      const getUserCarsKm = async () => {
        if (kmMin > 0 && kmMax > 0) {
          await getCarsByKm(kmMin, kmMax);
        }
      }

      getUserCarsKm();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [kmMin, kmMax])

    useEffect(() => {
      const getUserCarsPrice = async () => {
        if (priceMin > 0 && priceMax > 0) {
          await getCarsByPrice(priceMin, priceMax);
        }
      }

      getUserCarsPrice();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [priceMin, priceMax])

  const handleKmMin = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setKmMin(Number.parseInt(event.target.value));
  }

  const handleKmMax = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setKmMax(Number.parseInt(event.target.value));
  }

  const handlePriceMin = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setPriceMin(Number.parseInt(event.target.value));
  }

  const handlePriceMax = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setPriceMax(Number.parseInt(event.target.value));
  }

  const resetFilters = () => {    
    getAllAvailableCars()
  }

  return (
    <Box display="flex" gap="1.6rem" flexDirection="column">
      <Text fontSize="heading4" fontWeight="bold" color="black">
        Marca
      </Text>
      <UnorderedList listStyleType="none">        
        {brandFilter.map((brand: any) => {
          return(
            <FilterList key={brand} filter={brand} onFilter={() => getCarsByBrand(brand)}/>
          )
        })}
      </UnorderedList>

      <Text fontSize="heading4" fontWeight="bold" color="black">
        Modelo
      </Text>
      <UnorderedList listStyleType="none">
      {models.map((model) => {
          return(
            <FilterList key={model} filter={model} onFilter={() => getCarsByModel(model)}/>
          )
        })}
      </UnorderedList>

      <Text fontSize="heading4" fontWeight="bold" color="black">
        Cor
      </Text>
      <UnorderedList listStyleType="none">
      {colors.map((color) => {
          return(
            <FilterList key={color} filter={color} onFilter={() => getCarsByColor(color)}/>
          )
      })}
      
      </UnorderedList>

      <Text fontSize="heading4" fontWeight="bold" color="black">
        Ano
      </Text>

      <UnorderedList listStyleType="none">
      {years.map((year) => {
          return(
            <FilterList key={year} filter={year} onFilter={() => getCarsByYear(year)}/>
          )
      })}
      </UnorderedList>

      <Text fontSize="heading4" fontWeight="bold" color="black">
        Combustível
      </Text>

      <UnorderedList listStyleType="none">
      {fuelTypes.map((fuel) => {
          return(
            <FilterList key={fuel} filter={fuel} onFilter={() => getCarsByFuel(fuel)}/>
          )
      })}
      </UnorderedList>

      <Text fontSize="heading4" fontWeight="bold" color="black">
        Km
      </Text>
      <Box
        display="flex"
        gap={'26px'}
        alignItems="center"
        width="100%"
      >
        <Input
          type="number"
          width="7.8rem"
          borderRadius="none"
          bg="grey5"
          placeholder="Mínima"
          onChange={handleKmMin}
        />
        <Input
          width="7.8rem"
          borderRadius="none"
          bg="grey5"
          placeholder="Máxima"
          onChange={handleKmMax}
        />
      </Box>

      <Text fontSize="heading4" fontWeight="bold" color="black">
        Preço
      </Text>
      <Box
        display="flex"        
        gap={'26px'}
        alignItems="center"
        width="100%"
      >
        <Input
          type="number"
          width="7.8rem"
          borderRadius="none"
          bg="grey5"
          placeholder="Mínima"
          onChange={handlePriceMin}
        />
        <Input
          width="7.8rem"
          borderRadius="none"
          bg="grey5"
          placeholder="Máxima"
          onChange={handlePriceMax}
        />
      </Box>
      <Button
        onClick={() => resetFilters()}
        border={"solid 1.5px #adb5bd"}
        borderRadius={"4px"}            
        p={"12px 28px"}
        width={"100%"}                
        textAlign={"center"}
        textDecoration={"none"}
        fontWeight={"600"}
        fontSize={"heading7"}
        fontFamily={"body"}
        fontStyle={"normal"}
        bgColor={"white"}
        transition={"0.3s ease-in"}
        _hover={{ bg: "grey0", color: "grey10", fontStyle: "none"}}
        _focus={{ bg: "grey0", color: "grey10", fontStyle: "none"}}
      >
        Limpar Filtros
      </Button>
    </Box>
  );
};

export default Filter;
