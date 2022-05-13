import {
  Heading,
  SimpleGrid,
  Text,
  VStack,
  FormControl,
  FormLabel,
  Input,
  GridItem,
  Select,
  Button,
  useBreakpointValue,
  Spinner,
} from "@chakra-ui/react";
import { useReservationContext } from "context/reservations-context";
import React, { ChangeEventHandler, useState } from "react";

const AddNewForm = () => {
  const colSpan = useBreakpointValue({ base: 2, md: 1 });
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [rental, setRental] = useState("");
  const [name, setName] = useState("");
  const { createLoading, addNewReservation } = useReservationContext();

  const handleSubmit = () => {
    addNewReservation({
      name,
      rental_id: parseInt(rental),
      check_in: checkIn,
      check_out: checkOut,
    });
  };
  return (
    <VStack
      w="full"
      h="full"
      p={10}
      spacing={10}
      alignItems="flex-start"
      bg="gray.50"
    >
      <Heading size={"xl"}>Create New Reservation</Heading>
      <Text>Use the form below to tell us about your reservations!</Text>
      <SimpleGrid columns={2} columnGap={3} rowGap={4} w="full">
        <GridItem colSpan={colSpan}>
          <FormControl>
            <FormLabel htmlFor="name">Select Rental</FormLabel>
            <Select
              onChange={(event: any) => setRental(event.target?.value)}
              placeholder="Select Preferred Rental"
            >
              <option value={1}>Guest House 1</option>
              <option value={2}>Guest House 2</option>
            </Select>
          </FormControl>
        </GridItem>
        <GridItem colSpan={colSpan}>
          <FormControl>
            <FormLabel htmlFor="name">Reservation Name</FormLabel>
            <Input
              id="name"
              placeholder="Reservation Name"
              onChange={(event: any) => setName(event.target.value)}
            />
          </FormControl>
        </GridItem>
        <GridItem colSpan={colSpan}>
          <FormControl>
            <FormLabel htmlFor="name">Check In</FormLabel>
            <Input
              id="name"
              placeholder="2022-03-26"
              onChange={(e: any) => setCheckIn(e.target.value)}
            />
          </FormControl>
        </GridItem>
        <GridItem colSpan={colSpan}>
          <FormControl>
            <FormLabel htmlFor="name">Check Out</FormLabel>
            <Input
              id="name"
              placeholder="2022-03-30"
              onChange={(e: any) => setCheckOut(e.target.value)}
            />
          </FormControl>
        </GridItem>
        <GridItem colSpan={2}>
          {createLoading ? (
            <Spinner size="lg" />
          ) : (
            <Button
              size={"lg"}
              w={"full"}
              onClick={() => {
                handleSubmit();
              }}
            >
              CREATE RESERVATION
            </Button>
          )}
        </GridItem>
      </SimpleGrid>
    </VStack>
  );
};

export default AddNewForm;
