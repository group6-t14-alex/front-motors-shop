import { UnorderedList, Input, Box, Text } from "@chakra-ui/react";
import FilterList from "./filterList/filtersList";
import { useCarContext } from "@/contexts/carsContext";

const Filter = () => {
  const {getBrands} = useCarContext()
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
        <FilterList filter={"cor 1"} />
        <FilterList filter={"cor 2"} />
        <FilterList filter={"cor 3"} />
        <FilterList filter={"cor 4"} />
        <FilterList filter={"cor 5"} />
      </UnorderedList>

      <Text fontSize="heading4" fontWeight="bold" color="black">
        Ano
      </Text>

      <UnorderedList listStyleType="none">
        <FilterList filter={"9999"} />
        <FilterList filter={"9999"} />
        <FilterList filter={"9999"} />
        <FilterList filter={"9999"} />
        <FilterList filter={"9999"} />
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
