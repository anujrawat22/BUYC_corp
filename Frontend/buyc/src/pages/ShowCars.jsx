import React, { useEffect, useRef, useState } from "react";
import { CarId } from "../Contexts/carContext";
import {
  Badge,
  Box,
  Button,
  Center,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  HStack,
  Heading,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";

import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "../Contexts/AuthContext";
import Swal from 'sweetalert2'

const ShowCars = () => {
  const { authUser } = useAuth();
  const { CarObj } = CarId();
  const [data, setData] = useState([]);
  const { OEMid } = CarObj;
  const [caritem, setCaritem] = useState({});
  const { isOpen, onOpen, onClose } = useDisclosure();
  const kmsOnOdometer = useRef(null);
  const price = useRef(null);
  const accidentsReported = useRef(null);
  const registrationPlace = useRef(null);
  const [majorScratches, setmajorScratches] = useState(false);
  const [originalPaint, setoriginalPaint] = useState(false);
  const previousBuyers = useRef(null);

  const fetchdata = async () => {
    try {
      fetch(`https://buyc-1n1z.onrender.com/api/OEMspecs/getspecs/${OEMid}`,{
        headers : {
          authorization  : `bearer ${authUser.token}`
        }
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setData(data.model)
        }
          )
        .catch((err) => console.log(err));
    } catch (error) {
      console.log(error);
    }
  };

  const handlesubmit = () => {
    let obj = {
      kmsOnOdometer: +kmsOnOdometer.current.value,
      price: +price.current.value,
      accidentsReported: +accidentsReported.current.value,
      registrationPlace: registrationPlace.current.value,
      majorScratches: majorScratches,
      originalPaint: originalPaint,
      previousBuyers: +previousBuyers.current.value,
      oemSpecs: OEMid,
    };

    if (
      !obj.accidentsReported ||
      !obj.kmsOnOdometer ||
      !obj.previousBuyers ||
      !obj.price ||
      !obj.registrationPlace
    ) {
      toast.error("Please fill all fields", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      return;
    }
    fetch(`https://buyc-1n1z.onrender.com/api/inventory/create/${caritem._id}`, {
      method: "POST",
      body: JSON.stringify(obj),
      headers: {
        "Content-type": "application/json",
        authorization: `bearer ${authUser.token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if(data.msg === 'Inventory for model created'){
            onClose()
            Swal.fire({
                title: "Congratulations",
                text: `You Bought ${caritem.model} ${caritem.year}`,
                icon: 'success',
                confirmButtonText: 'Continue'
              })  
        }
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchdata();
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
        {data.length>0 ? data.map((item) => {
          return (
            <Center py={6} key={item._id}>
              <Stack
                borderWidth="1px"
                borderRadius="lg"
                w={{ sm: "100%", md: "700px" }}
                height={{ sm: "auto", md: "auto" }}
                direction={{ base: "column", md: "row" }}
                boxShadow={"2xl"}
                padding={4}
              >
                <Flex flex={1} bg="blue.200">
                  <Image objectFit="cover" boxSize="100%" src={item.image} />
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
                    {item.model}
                  </Heading>
                  <Text fontWeight={600} color={"gray.500"} size="sm" mb={4}>
                    Year : {item.year}
                  </Text>
                  <Text
                    textAlign={"center"}
                    px={3}
                    fontWeight={600}
                    color={"gray.500"}
                    size="sm"
                    mb={4}
                  >
                    List Price - ₹{item.listPrice}
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
                        {item.torque}bhp
                      </Badge>
                    </Text>
                    <Text>
                      Mileage
                      <Badge px={2} py={1} fontWeight={"400"}>
                        {item.mileage}kmpl
                      </Badge>
                    </Text>
                    <Text>
                      Top Speed
                      <Badge px={2} py={1} fontWeight={"400"}>
                        {item.maxSpeed}kmph
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
                      onClick={() => {
                        onOpen();
                        setCaritem(item);
                      }}
                    >
                      Buy
                    </Button>
                  </Stack>
                </Stack>
              </Stack>
            </Center>
          );
        })
      : <h1>No Cars to Show</h1>}
        <Modal isOpen={isOpen} onClose={onClose} w={80}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>
              {caritem.model} {caritem.year}
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Stack spacing={8} mx={"auto"} maxW={"lg"}>
                <Box
                  rounded={"lg"}
                  bg={useColorModeValue("white", "gray.700")}
                  boxShadow={"lg"}
                  p={8}
                  w={400}
                  h={400}
                >
                  <Stack spacing={4}>
                    <HStack>
                      <Box>
                        <FormControl id="kms" isRequired>
                          <FormLabel>Kms On Odometer</FormLabel>
                          <Input
                            type="text"
                            placeholder="kms"
                            ref={kmsOnOdometer}
                          />
                        </FormControl>
                      </Box>
                      <Box>
                        <FormControl id="accidents" isRequired>
                          <FormLabel>Accidents </FormLabel>
                          <Input
                            type="number"
                            placeholder="eg. 2"
                            ref={accidentsReported}
                          />
                        </FormControl>
                      </Box>
                    </HStack>
                    <HStack>
                      <Box>
                        <FormControl id="buyers" isRequired>
                          <FormLabel>Previous Buyers</FormLabel>
                          <Input type="number" ref={previousBuyers} />
                        </FormControl>
                      </Box>
                      <Box>
                        <FormControl id="registration" isRequired>
                          <FormLabel>Registration Place</FormLabel>
                          <Input type="text" ref={registrationPlace} />
                        </FormControl>
                      </Box>
                    </HStack>
                    <FormControl id="kms" isRequired>
                      <FormLabel>Price</FormLabel>
                      <Input type="number" placeholder="₹" ref={price} />
                    </FormControl>
                    <HStack spacing={8}>
                      <Checkbox
                        onChange={() => setoriginalPaint(!originalPaint)}
                      >
                        Original Paint
                      </Checkbox>
                      <Checkbox
                        onChange={() => setmajorScratches(!majorScratches)}
                      >
                        Major Scratches
                      </Checkbox>
                    </HStack>
                  </Stack>
                </Box>
              </Stack>
            </ModalBody>

            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={onClose}>
                Close
              </Button>
              <Button variant="ghost" onClick={handlesubmit}>
                Buy
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </div>
    </>
  );
};

export default ShowCars;
