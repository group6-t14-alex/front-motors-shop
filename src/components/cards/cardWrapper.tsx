import { Box } from "@chakra-ui/react";
import CardUser from "./userCard";
import { useCarContext } from "@/contexts/carsContext";

// const CardWrapper = ({ cars }: any) => {
const CardWrapper = () => {
  const { cars, setCars, filtredCars, filterOptions }: any = useCarContext();
  

  // const {filtredCars, setFiltredCars} = useCarContext()
  console.log(cars)
  
  // console.log(filtredCars) 
  // console.log(filtredCars.length)

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
        })
      // filtredCars.lenght > 0 ? (
      //   filtredCars.map((carFiltred: any) => {
      //     return (
      //       <CardUser
      //         key={carFiltred.id}
      //         userId={carFiltred.userId}
      //         carName={carFiltred.model}
      //         price={carFiltred.price}
      //         fipePrice={carFiltred.priceFipe}
      //         userName={carFiltred.user.name}
      //         carImage={carFiltred.imageUrl}
      //         km={carFiltred.km}
      //         year={carFiltred.year}
      //         description={carFiltred.description}
      //       />
      //     );
      //   })
      // ) : (
      //   cars.map((car: any) => {
      //     return (
      //       <CardUser
      //         key={car.id}
      //         userId={car.userId}
      //         carName={car.model}
      //         price={car.price}
      //         fipePrice={car.priceFipe}
      //         userName={car.user.name}
      //         carImage={car.imageUrl}
      //         km={car.km}
      //         year={car.year}
      //         description={car.description}
      //       />
      //     );
      //   })
      // )
     };

      
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
