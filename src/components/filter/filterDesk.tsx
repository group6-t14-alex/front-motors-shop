import { Box } from "@chakra-ui/react";
import Filter from "./filter";

const FilterDesk = () => {
  return (
    <Box
      height="auto"
      padding="1rem"
      width="18rem"
      display={{ cel: "none", desk: "flex" }}
    >
      <Filter />
    </Box>
  );
};

export default FilterDesk;
