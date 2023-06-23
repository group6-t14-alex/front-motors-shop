import { Box } from "@chakra-ui/react";
import CardUser from "./userCard";
import { useCarContext } from "@/contexts/carsContext";

const CardWrapper = ({ cars }: any) => {
  const { setCars, filteredCars, filtering }: any = useCarContext();
 
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
    >{
      filtering.length <= 0 ? cars.map((car: any) => {
        return (
          <CardUser
            key={car.id}
            userId={car.userId}
            carName={car.model}
            price={car.price}
            fipePrice={car.priceFipe}
            userName={car.user.name}
            carImage={car.imageUrl}
            km={car.km}
            year={car.year}
            description={car.description}
          />
        )}): filtering.map((car: any) => {
          return (
            <CardUser
              key={car.id}
              userId={car.userId}
              carName={car.model}
              price={car.price}
              fipePrice={car.priceFipe}
              userName={car.user.name}
              carImage={car.imageUrl}
              km={car.km}
              year={car.year}
              description={car.description}
            />
          )})
    }
      {/* {cars.map((car: any) => {
        return (
          <CardUser
            key={car.id}
            userId={car.userId}
            carName={car.model}
            price={car.price}
            fipePrice={car.priceFipe}
            userName={car.user.name}
            carImage={car.imageUrl}
            km={car.km}
            year={car.year}
            description={car.description}
          />
        );
      })} */}
    </Box>
  );
};

export default CardWrapper;
