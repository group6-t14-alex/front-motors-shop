import { ListItem } from "@chakra-ui/react";

const FilterList = ({ filter }: { filter: string }) => {
  return (
    <>
      <ListItem cursor="pointer" color="grey3">
        {filter[0].toUpperCase() + filter.substring(1)}
      </ListItem>
    </>
  );
};

export default FilterList;
