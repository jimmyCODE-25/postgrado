import { useState } from "react";
import { DialogoContexto } from "./contexto";

type DialogoProveedorProps = {
  children: React.ReactNode;
};

export function DialogoProveedor({ children }: DialogoProveedorProps) {
  const [openDialog, setOpenDialog] = useState<boolean>(false);

  return (
    <DialogoContexto.Provider value={{ openDialog, setOpenDialog }}>
      {children}
    </DialogoContexto.Provider>
  );
}
