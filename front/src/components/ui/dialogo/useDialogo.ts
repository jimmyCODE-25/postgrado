import { useContext } from "react";
import { DialogoContexto } from "./contexto";

export const useDialog = () => {
  const context = useContext(DialogoContexto);
  if (!context) {
    throw new Error("useDialog must be used within a DialogProvider");
  }
  return context;
};
