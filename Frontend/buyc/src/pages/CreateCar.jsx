import React, { useRef } from "react";
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  HStack,
  InputRightElement,
  Stack,
  Button,
  Heading,
  useColorModeValue,
} from "@chakra-ui/react";
import { useState } from "react";
import { AddIcon, CloseIcon } from "@chakra-ui/icons";
import { ToastContainer, toast } from "react-toastify";


import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "../Contexts/AuthContext";
import Swal from "sweetalert2";

const CreateCar = () => {
  
  const [colors, setColors] = useState([]);
  const { authUser } = useAuth()
  console.log(authUser)
   const model = useRef(null);
  const year = useRef(null);
  const mileage = useRef(null);
  const torque = useRef(null);
  const maxSpeed = useRef(null);
  const image = useRef(null);
  const color = useRef(null);
  const power = useRef(null)
  const price = useRef(null)
  const addColor = () => {
    if (color.current.value) {
      setColors([...colors, color.current.value]);
      color.current.value = null;
    }
  };

  const handleSubmit = async () => {
    let obj = {
      model : model.current.value,
      year : +year.current.value,
      mileage : +mileage.current.value,
      power : +power.current.value,
      torque : +torque.current.value,
      maxSpeed : +maxSpeed.current.value,
      image : image.current.value,
      colors : colors ,
      listPrice : +price.current.value
    };

    for (let key in obj) {
      if (obj[key] == null || !obj.colors.length>0) {
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
    }
      try {
        let res = await fetch(`https://buyc-1n1z.onrender.com/api/OEMSpecs/create`,{
          method : "POST",
          body : JSON.stringify(obj),
          headers : {
            'content-type' : "application/json",
            authorization : `bearer ${authUser.token}`
           }
        })
        let { msg }= await res.json()
        console.log(msg);
        if(msg === 'Model of the vehicle create sucessfully')
        Swal.fire({
          title: "Congratulations",
          text: `Model Created Sucessfully`,
          icon: 'success',
          confirmButtonText: 'Continue'
        })
        
      } catch (error) {
       
      }
        
      
    
  };

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

      <Flex
        minH={"100vh"}
        align={"center"}
        justify={"center"}
        bg={useColorModeValue("gray.50", "gray.800")}
      >
        <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
          <Stack align={"center"}>
            <Heading fontSize={"4xl"} textAlign={"center"}>
              Add a new Car
            </Heading>
          </Stack>
          <Box
            rounded={"lg"}
            bg={useColorModeValue("white", "gray.700")}
            boxShadow={"lg"}
            p={8}
          >
            <Stack spacing={4}>
              <HStack>
                <Box>
                  <FormControl id="model" isRequired>
                    <FormLabel>Model name</FormLabel>
                    <Input type="text" ref={model} placeholder="Model" />
                  </FormControl>
                </Box>
                <Box>
                  <FormControl id="year" isRequired>
                    <FormLabel>Year</FormLabel>
                    <Input type="number" ref={year} placeholder="eg. 2018"/>
                  </FormControl>
                </Box>
              </HStack>
              <FormControl id="mileage" isRequired>
                <FormLabel>Mileage</FormLabel>
                <Input type="number" ref={mileage} placeholder="km/liter"/>
              </FormControl>
              <FormControl id="power" isRequired>
                <FormLabel>Power</FormLabel>
                <Input type="number" ref={power} placeholder="bhp"/>
              </FormControl>
              <FormControl id="torque" isRequired>
                <FormLabel>Torque</FormLabel>
                <Input type="number" ref={torque} placeholder="Nm"/>
              </FormControl>
              <FormControl id="maxSpeed" isRequired>
                <FormLabel>Max Speed</FormLabel>
                <Input type="number" ref={maxSpeed} placeholder="km/h"/>
              </FormControl>
              <FormControl id="image" isRequired >
                <FormLabel>Image</FormLabel>
                <Input type="text" ref={image} placeholder="url"/>
              </FormControl>
              <FormControl id="price" isRequired>
                <FormLabel>Price</FormLabel>
                <Input type="number" ref={price} placeholder="₹" />
              </FormControl>
              <FormControl id="colors" isRequired>
                <FormLabel>Colors</FormLabel>
                <InputGroup>
                  <Input type="text" ref={color} />
                  <InputRightElement h={"full"}>
                    <Button variant={"ghost"} onClick={addColor}>
                      <AddIcon />
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              
              <Box>
                {colors.length > 0 &&
                  colors.map((item) => {
                    return (
                      <span
                        style={{
                          padding: "2px 15px",
                          borderRadius: "20px",
                          textAlign: "center",
                          backgroundColor: "#F2F2F2",
                          margin: "0px 10px",
                        }}
                      >
                        {item}
                        <CloseIcon
                          w={2.5}
                          h={2.5}
                          style={{ margin: "0 5px", cursor: "pointer" }}
                        />
                      </span>
                    );
                  })}
              </Box>
              <Stack spacing={10} pt={2}>
                <Button
                  loadingText="Submitting"
                  size="lg"
                  bg={"blue.400"}
                  color={"white"}
                  _hover={{
                    bg: "blue.500",
                  }}
                  onClick={handleSubmit}
                >
                  Add Car
                </Button>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Flex>
    </>
  );
};

export default CreateCar;
