import React, { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import { useAuth } from "../Contexts/AuthContext";
import {
  Badge,
  Button,
  Center,
  Flex,
  Heading,
  Image,
  Stack,
  Text,
} from "@chakra-ui/react";
import Swal from "sweetalert2";

const Dealers = () => {
  const { authUser } = useAuth();
  const [data, setData] = useState([]);
  const [caritem,setCaritem] = useState({})
  const fetchData = async () => {
    try {
      fetch(`https://buyc-1n1z.onrender.com/api/inventory/allData`, {
        headers: {
          authorization: `bearer ${authUser.token}`,
        },
      })
        .then((res) => res.json())
        .then((newdata) => {
          console.log(newdata.data);
          setData(newdata.data);
        })
        .catch((err) => console.log(err));
    } catch (error) {}
  };

  const handleSubmit = (id)=>{
   console.log(id);
   fetch(`https://buyc-1n1z.onrender.com/api/booking/create/${id}`,{
    method : "POST",
    headers : {
      'Content-type' : "application/json",
      authorization : `Bearer ${authUser.token}`
    }
   })
   .then(res=> res.json())
   .then(({msg}) => {
    if(msg == 'Booking created'){
    Swal.fire({
      title: "Congratulations",
      text: `You Bought ${caritem.model} ${caritem.year}`,
      icon: 'success',
      confirmButtonText: 'Continue'
    })
    }
   })
   .catch(err=>console.log(err))
  }

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
      <ToastContainer
        position="bottom-right"
        autoClose={1500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

      <ToastContainer />
      
      <div>
        { data.length>0 ? data.map((item) => {
          return (
            <Center py={6} key={item._id}>
              <Stack
                borderWidth="1px"
                borderRadius="lg"
                w={{ sm: "100%", md: "900px" }}
                height={{ sm: "auto", md: "auto" }}
                direction={{ base: "column", md: "row" }}
                boxShadow={"2xl"}
                padding={4}
              >
                <Flex flex={1} bg="blue.200">
                  <Image
                    objectFit="cover"
                    boxSize="100%"
                    src={item.oemData[0].image}
                  />
                </Flex>
                <Stack
                  flex={1}
                  flexDirection="column"
                  justifyContent="center"
                  alignItems="center"
                  p={1}
                  pt={2}
                >
                  <Heading fontSize={"2xl"} fontFamily={"body"}>
                    {item.oemData[0].model}
                  </Heading>
                  <Text fontWeight={600} color={"gray.500"} size="sm" mb={4}>
                    Year : {item.oemData[0].year}
                  </Text>
                  <Text
                    textAlign={"center"}
                    px={3}
                    fontWeight={600}
                    color={"gray.500"}
                    size="sm"
                    mb={4}
                  >
                    List Price - ₹{item.oemData[0].listPrice}
                  </Text>
                  <Text textAlign={"center"} px={3} fontSize={"2xl"}>
                    Specs
                  </Text>
                  <Stack
                    align={"center"}
                    justify={"center"}
                    direction={"row"}
                    mt={6}
                  >
                    <Text>
                      Power
                      <Badge px={2} py={1} fontWeight={"400"}>
                        {item.power}bhp
                      </Badge>
                    </Text>
                    <Text>
                      Torque
                      <Badge px={2} py={1} fontWeight={"400"}>
                        {item.oemData[0].torque}bhp
                      </Badge>
                    </Text>
                    <Text>
                      Mileage
                      <Badge px={2} py={1} fontWeight={"400"}>
                        {item.oemData[0].mileage}kmpl
                      </Badge>
                    </Text>
                    <Text>
                      Top Speed
                      <Badge px={2} py={1} fontWeight={"400"}>
                        {item.oemData[0].maxSpeed}kmph
                      </Badge>
                    </Text>
                  </Stack>

                  <Stack
                    align={"center"}
                    justify={"center"}
                    direction={"row"}
                    mt={6}
                  >
                    <Text>
                      Odometer
                      <Badge px={2} py={1} fontWeight={"400"}>
                        {item.kmsOnOdometer}kms
                      </Badge>
                    </Text>
                    <Text>
                      Scratches
                      <Badge px={2} py={1} fontWeight={"400"}>
                        {item.majorScratches ? "Yes" : "No"}
                      </Badge>
                    </Text>
                    <Text>
                      Original Paint
                      <Badge px={2} py={1} fontWeight={"400"}>
                        {item.originalPaint ? "Yes" : "No"}
                      </Badge>
                    </Text>
                    <Text>
                      No. of Buyers
                      <Badge px={2} py={1} fontWeight={"400"}>
                        {item.previousBuyers}
                      </Badge>
                    </Text>
                  </Stack>
                  <Stack
                    align={"center"}
                    justify={"center"}
                    direction={"row"}
                    mt={6}
                  >
                    <Text>
                      Dealer Name
                      <Badge px={2} py={1} fontWeight={"400"}>
                        {item.userData[0].username}
                      </Badge>
                    </Text>
                    <Text>
                      Registration Place
                      <Badge px={2} py={1} fontWeight={"400"}>
                        {item.registrationPlace}
                      </Badge>
                    </Text>
                    <Text>
                      Price
                      <Badge px={2} py={1} fontWeight={"400"}>
                        ₹{item.price}
                      </Badge>
                    </Text>
                  </Stack>
                  <Stack
                    width={"100%"}
                    mt={"2rem"}
                    direction={"row"}
                    padding={2}
                    justifyContent={"space-between"}
                    alignItems={"center"}
                  >
                    <Button
                      flex={1}
                      fontSize={"sm"}
                      rounded={"full"}
                      bg={"blue.400"}
                      color={"white"}
                      boxShadow={
                        "0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)"
                      }
                      _hover={{
                        bg: "blue.500",
                      }}
                      _focus={{
                        bg: "blue.500",
                      }}
                      onClick={()=>{
                        console.log(item.oemData[0]);
                        setCaritem(item.oemData[0])
                        handleSubmit(item._id)}}
                    >
                      Buy
                    </Button>
                  </Stack>
                </Stack>
              </Stack>
            </Center>
          );
        })
      : 
      null} 
      </div>
    </>
  );
};

export default Dealers;
