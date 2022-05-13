import { Container, Flex } from "@chakra-ui/react";
import type { NextPage } from "next";
import AddNewForm from "../src/sections/form";
import ReservationTable from "../src/sections/table";
const Home: NextPage = () => {
  return (
    <Container maxW="container.xl" p={0}>
      <Flex
        h={{ base: "auto", md: "100vh" }}
        py={[0, 10, 20]}
        direction={{ base: "column-reverse", md: "row" }}
      >
        <ReservationTable />
        <AddNewForm />
      </Flex>
    </Container>
  );
};

export default Home;
