import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { IconButton } from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import useDeleteTurn from "../hooks/useDEleteTurn";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function DialogDelete({ id, refetch }) {
  const [open, setOpen] = React.useState(false);

  const deleteTurnoMutation = useDeleteTurn();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleConfirm = () => {
    console.log(id);

    deleteTurnoMutation.mutate(id, {
      onSuccess: () => {
        refetch(); // Llama a refetch para actualizar la lista de turnos
      },
      onError: (error) => {
        console.error("Error al eliminar el turno:", error);
      },
    });
    setOpen(false); // Cierra el diálogo de confirma
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <IconButton color="primary" aria-label="delete" onClick={handleClickOpen}>
        <DeleteForeverIcon />
      </IconButton>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Eliminaras el turno seleccionado"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Estas Seguro que quieres eliminar el turno?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button onClick={handleConfirm}>Confirmar</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
