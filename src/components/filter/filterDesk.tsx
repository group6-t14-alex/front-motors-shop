import { Box } from "@chakra-ui/react";
import Filter from "./filter";

const FilterDesk = () => {
  return (
    <Box
      height="auto"      
      width="100%"
      display={{ cel: "none", desk: "flex" }}
      bgColor={'white'}
      minW={'320px'}
      maxW={'454px'}
    >
      <Filter />
    </Box>
  );
};

export default FilterDesk;