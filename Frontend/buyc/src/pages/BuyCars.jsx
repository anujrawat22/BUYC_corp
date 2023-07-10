import {
  Box,
  Button,
  Center,
  Heading,
  Image,
  Stack,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { CarId } from "../Contexts/carContext";
import { useNavigate } from "react-router-dom";

const BuyCars = () => {
  const [carData, setCarData] = useState([]);
  const { CarObj , setCarObj } = CarId()
  const navigate  = useNavigate()

  const fetchCarData = async () => {
    fetch("http://localhost:8080/api/user/OEMdata")
      .then((res) => res.json())
      .then((data) => setCarData(data.data))
      .catch((err) => console.log(err));
  };
 
  const setOEMid = (id)=>{
  setCarObj({ ...CarObj , OEMid : id })
  console.log(CarObj);
   navigate("/showcars")
  }


  useEffect(() => {
    fetchCarData();
  }, []);


  return (
    <>
    <Box display="flex" alignItems="center" justifyContent="center" p={5}>

    <Heading fontSize={'2xl'} fontFamily={'body'} fontWeight={500} >
            Car Brands
          </Heading>

    </Box>
    
    <div
      style={{
        width: "100dvw",
        height: "auto",
        display: "flex",
        flexWrap: "wrap",
        padding: "5% ",
      }}
    >
      
      {carData.length>0 &&
        carData.map((item) => {
          return (
            <Center py={9} key={item._id}>
              <Box
                role={"group"}
                p={6}
                maxW={"330px"}
                w={"full"}
                // bg={useColorModeValue("white", "gray.800")}
                boxShadow={"2xl"}
                rounded={"lg"}
                pos={"relative"}
                zIndex={1}
                m={10}
              >
                <Box
                  rounded={"lg"}
                  mt={-12}
                  pos={"relative"}
                  height={"230px"}
                  _after={{
                    transition: "all .3s ease",
                    content: '""',
                    w: "full",
                    h: "full",
                    pos: "absolute",
                    top: 5,
                    left: 0,
                    backgroundImage: `url(${item.image})`,
                    filter: "blur(15px)",
                    zIndex: -1,
                  }}
                  _groupHover={{
                    _after: {
                      filter: "blur(20px)",
                    },
                  }}
                >
                  <Image
                    rounded={"lg"}
                    height={230}
                    width={282}
                    objectFit={"cover"}
                    src={item.image}
                  />
                </Box>
                <Stack pt={10} align={"center"}>
                  <Heading
                    fontSize={"2xl"}
                    fontFamily={"body"}
                    fontWeight={500}
                  >
                    {item.username}
                  </Heading>
                  <Stack direction={"row"} align={"center"}>
                  <Button colorScheme='blue' onClick={()=>setOEMid(item._id)}>Show Cars</Button>
                  </Stack>
                </Stack>
              </Box>
            </Center>
          );
        })}
    </div>
    
    </>
  );
};

export default BuyCars;
