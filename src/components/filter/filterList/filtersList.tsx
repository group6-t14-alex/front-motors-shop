import { useCarContext } from "@/contexts/carsContext";
import { api } from "@/services/api";
import { ListItem } from "@chakra-ui/react";

const FilterList = ({ filter }: any) => {

  const {filtredCars, setFiltredCars, getCarsByBrand} = useCarContext()

  return (
    <>
      <ListItem cursor="pointer" color="grey3" 
        onClick={() => getCarsByBrand(filter)}
      >
        {filter[0].toUpperCase() + filter.substring(1)}
      </ListItem>
    </>
  );
};

export default FilterList;
