import { useContext } from "react";
import { AppointmentContext } from "../../context/appointment/AppointmentContext";

export const useAppointmentForm = () => {
  return useContext(AppointmentContext);
};
