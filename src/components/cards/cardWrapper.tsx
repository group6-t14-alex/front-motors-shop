import { Box } from "@chakra-ui/react";
import CardUser from "./userCard";
import { useCarContext } from "@/contexts/carsContext";

const CardWrapper = () => {
  const { cars, setCars, filtredCars, filterOptions }: any = useCarContext();
  
  return (
    <Box
      maxWidth="1032px"
      display="flex"
      flexWrap={{ desk: "wrap", cel: "nowrap" }}
      justifyContent="space-between"
      bgColor={"white"}
      width={"100%"}
      maxW={{ desk: "1032px", cel: "100%" }}
      minW={"302px"}
      minH={"388px"}
      overflowX={{ cel: "auto" }}
      gap={{ cel: "12px" }}
    >
     
     {
        filtredCars.map((carFiltred: any) => {
          if (carFiltred.isActive === true) {
            return (
              <CardUser
                key={carFiltred.id}
                userId={carFiltred.userId}
                carName={carFiltred.model}
                price={carFiltred.price}
                fipePrice={carFiltred.priceFipe}
                userName={carFiltred.user.name}
                carImage={carFiltred.imageUrl}
                km={carFiltred.km}
                year={carFiltred.year}
                description={carFiltred.description}
              />
            );
          } else {
            <></>
          }
        })      
     }
    </Box>
  );
};

export default CardWrapper;
