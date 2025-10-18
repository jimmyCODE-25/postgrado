import { createContext } from "react";

type DialogoContextoProps = {
  openDialog: boolean;
  setOpenDialog: (open: boolean) => void;
};

export const DialogoContexto = createContext<DialogoContextoProps | undefined>(
  undefined
);
