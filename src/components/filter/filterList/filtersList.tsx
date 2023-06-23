import { Button } from "@chakra-ui/react";

const FilterList = ({ filter, handleFunction }: any) => {

  return (
    <>
      <Button variant={'ghost'} key={filter} cursor="pointer" color="grey3" onClick={() => handleFunction(filter)}>
        {filter[0].toUpperCase() + filter.substring(1) }
      </Button>
    </>
  );
};

export default FilterList;
