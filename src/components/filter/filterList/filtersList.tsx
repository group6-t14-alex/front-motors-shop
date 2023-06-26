import { useCarContext } from "@/contexts/carsContext";
import { api } from "@/services/api";
import { ListItem } from "@chakra-ui/react";

const FilterList = ({ filter }: any) => {

  const teste = () => {
    console.log(filter)
  }

  const {filtredCars, setFiltredCars} = useCarContext()

  const getCarsByBrand = async (brand: string) => {
    const response = await api.get('/cars');
    console.log(response.data.filter((marca: { brand: string; }) => marca.brand === brand));
    setFiltredCars(response.data.filter((marca: { brand: string; }) => marca.brand === brand));
  };

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
