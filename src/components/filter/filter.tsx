import { UnorderedList, Input, Box, Text } from "@chakra-ui/react";
import FilterList from "./filterList/filtersList";
import { useCarContext } from "@/contexts/carsContext";
import { useEffect, useState } from "react";
import {useToast} from "@chakra-ui/toast";
import { api } from "@/services/api";
import { createAdReturnInterface } from "@/interfaces/createAd.interface";

const Filter = () => {
  const toast = useToast();
  const {getBrands, colors, filterOptions, years, fuelTypes, models, selectedCars, setSelectedCars} = useCarContext()

  useEffect(() => {

      (async () => {
        const announcements = await api.get<createAdReturnInterface[]>('/cars');

        const filteringAnnouncements = announcements.data.filter((ad) => 
          ad
        )

        if (filteringAnnouncements) {
          filterOptions(filteringAnnouncements);
        }
      })();
   
  }, [filterOptions]);

  const handleFilter = (car: any) => {
    if(car === selectedCars){
      setSelectedCars("")
      return;
    }
    setSelectedCars(car)
  }

//   const getFilteredCars = (selectedFilters: string, existingBrands: string[]) => {
//     return existingBrands.filter(car => car === selectedFilters)
// }
 
//   const carFilter = getFilteredCars(selectedCars, getBrands)


  return (
    <Box display="flex" gap="1.6rem" flexDirection="column">
      <Text fontSize="heading4" fontWeight="bold" color="black">
        Marca
      </Text>
      <UnorderedList listStyleType="none" display={"flex"} flexDir={'column'} alignItems={"flex-start"}>
        {getBrands.map((brand: any) => {
          return(
            <FilterList handleFunction={handleFilter(brand)} key={brand} filter={brand}/>
          )
        })}
      </UnorderedList>

      <Text fontSize="heading4" fontWeight="bold" color="black">
        Modelo
      </Text>
      <UnorderedList listStyleType="none" display={"flex"} flexDir={'column'} alignItems={"flex-start"}>
      {models.map((model) => {
          return(
            <FilterList handleFunction={handleFilter(model)} key={model} filter={model}/>
          )
        })}
      </UnorderedList>

      <Text fontSize="heading4" fontWeight="bold" color="black">
        Cor
      </Text>
      <UnorderedList listStyleType="none" display={"flex"} flexDir={'column'} alignItems={"flex-start"}>
      {colors.map((color) => {
          return(
            <FilterList handleFunction={handleFilter(color)} key={color} filter={color}/>
          )
      })}
      
      </UnorderedList>

      <Text fontSize="heading4" fontWeight="bold" color="black">
        Ano
      </Text>

      <UnorderedList listStyleType="none" display={"flex"} flexDir={'column'} alignItems={"flex-start"}>
      {years.map((year) => {
          return(
            <FilterList handleFunction={handleFilter(year)} key={year} filter={year}/>
          )
      })}
      </UnorderedList>

      <Text fontSize="heading4" fontWeight="bold" color="black" display={"flex"} flexDir={'column'} alignItems={"flex-start"}>
        Combustível
      </Text>

      <UnorderedList listStyleType="none">
      {fuelTypes.map((fuel) => {
          return(
            <FilterList handleFunction={handleFilter(fuelTypes)} key={fuel} filter={fuel}/>
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
        />
        <Input
          width="7.8rem"
          borderRadius="none"
          bg="grey5"
          placeholder="Máxima"
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
        />
        <Input
          width="7.8rem"
          borderRadius="none"
          bg="grey5"
          placeholder="Máxima"
        />
      </Box>
    </Box>
  );
};

export default Filter;
