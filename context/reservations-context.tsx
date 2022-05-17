import axios, { AxiosError, AxiosResponse } from "axios";
import * as React from "react";
import { useState, createContext, ReactNode, useContext } from "react";
import Swal from "sweetalert2";
const BASE_URL =
  "https://dickson-python-guestready.herokuapp.com/api/v1/reservations";

interface RentalSchema {
  id: number;
  name: string;
}

export interface IReservation {
  id: number;
  name: string;
  rental: RentalSchema;
  check_in: Date;
  check_out: Date;
  previous?: IReservation | null;
}
type ActionType = "set_reservations" | "create_reservations";
type Action = {
  type: ActionType;
  payload: IReservation | IReservation[] | null;
};

type DataRequest = {
  name: string;
  rental_id: number;
  check_in: string;
  check_out: string;
};

export type Dispatch = (action: Action) => void;
export type ReservationContextType = {
  reservations: IReservation[];
  loading: boolean;
  createLoading: boolean;
  fetchReservations: () => void;
  addNewReservation: (value: DataRequest) => void;
};

export const ReservationCtx = createContext<ReservationContextType>({
  reservations: [
    {
      id: 0,
      name: "",
      rental: { id: 0, name: "" },
      check_in: new Date(),
      check_out: new Date(),
    },
  ],
  loading: false,
  createLoading: false,
  fetchReservations: () => {},
  addNewReservation: () => {},
});

type ProviderProps = {
  children: ReactNode;
};

interface DataResponse {
  id: number;
  name: string;
  rental: RentalSchema;
  check_in: String;
  check_out: String;
  previous?: DataResponse | null;
}

const RtxProvider = (props: ProviderProps) => {
  const [reservations, setReservations] = useState<IReservation[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [createLoading, setCreateLoading] = useState<boolean>(false);
  const fetchReservations = () => {
    setLoading(true);
    axios
      .get(BASE_URL)
      .then((response: AxiosResponse) => {
        if (response.data.success) {
          var data = response.data.data;
          const mappedData: IReservation[] = data.map(
            (reserve: DataResponse) => {
              return {
                id: reserve.id,
                name: reserve.name,
                rental: reserve.rental,
                check_in: new Date(reserve.check_in + "T00:00:00"),
                check_out: new Date(reserve.check_out + "T00:00:00"),
                previous: reserve.previous,
              };
            }
          );
          console.log(mappedData);

          setReservations(mappedData);
          setLoading(false);
        } else {
          setLoading(false);
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong while fetching reservations! Please try again.",
          });
        }
      })
      .catch((err: AxiosError) => {
        setLoading(false);
        console.log(err);
        err.response && console.log(err.response);
        err.response?.data && console.log(err.response.data);

        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong while fetching reservations! Please try again.",
        });
      });
  };

  const addNewReservation = (reservation: DataRequest) => {
    setCreateLoading(false);
    axios
      .post(BASE_URL, reservation)
      .then((response: AxiosResponse) => {
        if (response.data.success) {
          Swal.fire("Success", response.data.message, "success");
          setCreateLoading(false);
          fetchReservations();
        } else {
          setCreateLoading(false);
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong while creating your reservations! Please try again.",
          });
        }
      })
      .catch((err: AxiosError) => {
        setCreateLoading(false);
        console.log(err);
        err.response && console.log(err.response);
        const responseData: any = err.response?.data;
        if (responseData.errors) {
          if (
            responseData.errors.error &&
            responseData.errors.error.length > 0
          ) {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: responseData.errors.error[0],
            });
          } else if (
            responseData.errors.name &&
            responseData.errors.name.length > 0
          ) {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: responseData.errors.name[0],
            });
          } else if (
            responseData.errors.check_in &&
            responseData.errors.check_in.length > 0
          ) {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: responseData.errors.check_in[0],
            });
          }
        } else {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong while fetching reservations! Please try again.",
          });
        }
      });
  };
  return (
    <ReservationCtx.Provider
      value={{
        reservations,
        loading,
        createLoading,
        fetchReservations,
        addNewReservation,
      }}
    >
      {props.children}
    </ReservationCtx.Provider>
  );
};

export const useReservationContext = () => useContext(ReservationCtx);

export default RtxProvider;
