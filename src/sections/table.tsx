import {
  Heading,
  VStack,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Stack,
  Skeleton,
} from "@chakra-ui/react";
import {
  IReservation,
  useReservationContext,
} from "context/reservations-context";
import React, { useEffect } from "react";

const ReservationTable = () => {
  const { reservations, loading, fetchReservations } = useReservationContext();
  useEffect(() => {
    fetchReservations();
  });

  return (
    <VStack w="full" h="full" p={10} spacing={10} alignItems="flex-start">
      <Heading size={"xl"}>Current Reservations</Heading>
      <TableContainer overflowY={"scroll"}>
        {loading ? (
          <Stack>
            <Skeleton width="full" height="20px" />
            <Skeleton width="full" height="20px" />
            <Skeleton width="full" height="20px" />
            <Skeleton width="full" height="20px" />
          </Stack>
        ) : (
          <Table variant={"striped"} size="sm">
            <TableCaption placement="top">
              See all available reservations!
            </TableCaption>
            <Thead>
              <Tr>
                <Th>Rental Name</Th>
                <Th>Reserv. ID</Th>
                <Th>Check In</Th>
                <Th>Check Out</Th>
                <Th>Prev. Reserv. ID</Th>
              </Tr>
            </Thead>
            <Tbody>
              {reservations.map((reservation: IReservation) => (
                <Tr key={`${reservation.id}__${reservation.name}`}>
                  <Td>{reservation.rental.name}</Td>
                  <Td>{reservation.name}</Td>
                  <Td>{reservation.check_in.toDateString()}</Td>
                  <Td>{reservation.check_out.toDateString()}</Td>
                  <Td>{reservation.previous?.name}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        )}
      </TableContainer>
    </VStack>
  );
};

export default ReservationTable;
