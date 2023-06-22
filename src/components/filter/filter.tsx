import { UnorderedList, Input, Box, Text } from "@chakra-ui/react";
import FilterList from "./filterList/filtersList";
import { useCarContext } from "@/contexts/carsContext";
import { useEffect } from "react";
import { api } from "@/services/api";
import { createAdReturnInterface } from "@/interfaces/createAd.interface";

const Filter = () => {
  const {getBrands, colors, filterOptions, years, fuelTypes} = useCarContext()

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

  return (
    <Box display="flex" gap="1.6rem" flexDirection="column">
      <Text fontSize="heading4" fontWeight="bold" color="black">
        Marca
      </Text>
      <UnorderedList listStyleType="none">
        {getBrands.map((brand) => {
          return(
            <FilterList key={brand} filter={brand}/>
          )
        })}
      </UnorderedList>

      <Text fontSize="heading4" fontWeight="bold" color="black">
        Modelo
      </Text>
      <UnorderedList listStyleType="none">
        {" "}
        <FilterList filter={"Modelo 1"} />
        <FilterList filter={"Modelo 2"} />
        <FilterList filter={"Modelo 3"} />
        <FilterList filter={"Modelo 4"} />
        <FilterList filter={"Modelo 5"} />
      </UnorderedList>

      <Text fontSize="heading4" fontWeight="bold" color="black">
        Cor
      </Text>
      <UnorderedList listStyleType="none">
      {colors.map((color) => {
          return(
            <FilterList key={color} filter={color}/>
          )
      })}
      
      </UnorderedList>

      <Text fontSize="heading4" fontWeight="bold" color="black">
        Ano
      </Text>

      <UnorderedList listStyleType="none">
      {years.map((year) => {
          return(
            <FilterList key={year} filter={year}/>
          )
      })}
      </UnorderedList>

      <Text fontSize="heading4" fontWeight="bold" color="black">
        Combustível
      </Text>

      <UnorderedList listStyleType="none">
      {fuelTypes.map((fuel) => {
          return(
            <FilterList key={fuel} filter={fuel}/>
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
