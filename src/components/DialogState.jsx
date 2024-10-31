import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import SleectState from "./SleectState";
import { Box, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import useUpdateState from "../hooks/useUpdateState";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AlertDialogSlide({ refetch, id }) {
  const [open, setOpen] = React.useState(false);
  const [estado, setEstado] = React.useState();

  const { createUpdateState, errorUpdateState, isLoadingUpdateState } =
    useUpdateState();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleConfirm = () => {
    createUpdateState(
      { estado, id },
      {
        onSuccess: () => {
          refetch(); // Llama a refetch solo después de que la actualización sea exitosa
          setOpen(false); // Cierra el diálogo después de actualizar
        },
        onError: (error) => {
          console.error("Error al actualizar el estado:", error);
        },
      }
    );
  };
  return (
    <React.Fragment>
      <IconButton color="primary" aria-label="delete" onClick={handleClickOpen}>
        <EditIcon />
      </IconButton>

      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <Box p="20px">
          <DialogTitle>{"Cambiar el estado del turno"}</DialogTitle>
        </Box>
        <SleectState state={estado} set={setEstado}></SleectState>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button onClick={handleConfirm}>Guardar</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
