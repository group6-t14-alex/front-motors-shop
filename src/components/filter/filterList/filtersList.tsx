import { ListItem } from "@chakra-ui/react";

const FilterList = ({ filter }: { filter: string }) => {
  return (
    <>
      <ListItem cursor="pointer" color="grey3">
        {filter}
      </ListItem>
    </>
  );
};

export default FilterList;
