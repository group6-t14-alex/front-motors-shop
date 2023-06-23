import { ListItem } from "@chakra-ui/react";

const FilterList = ({ filter, setFilteredCars }: any) => {
  // console.log(filteredCars)
  return (
    <>
      <ListItem key={filter} cursor="pointer" color="grey3" onChange={(e) => setFilteredCars(e.currentTarget.value)}>
        {filter[0].toUpperCase() + filter.substring(1) }
      </ListItem>
    </>
  );
};

export default FilterList;
