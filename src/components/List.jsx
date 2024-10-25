import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import EditIcon from "@mui/icons-material/Edit";
import { IconButton } from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import DialogState from "./DialogState";
import DialogDelete from "./DialogDelete";

const List = () => {
  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));

  function createData(name, calories, fat, carbs, protein, estado) {
    return { name, calories, fat, carbs, protein, estado };
  }

  const rows = [
    createData(
      "Cambio de aceite",
      "Aceite v.2",
      "Mateo Iriso",
      "22/12",
      "22:30",
      "Solicitado"
    ),
    createData("Alienado", "", "Mateo Iriso", "30/11", "21:30", "Pendiente"),
    createData("Valanceado", "", "Mateo Iriso", "25/12", "7:30", "Confirmado"),
    createData(
      "Cambio de frenos",
      "Frenos j4",
      "Matias Laquiz",
      "22/11",
      "2:30",
      "Cancelado"
    ),
    createData(
      "Cambio de aceite",
      "Aceite v.2",
      "Matias Laquiz",
      "22/11",
      "7:30",
      "Finalizado"
    ),
  ];

  const estados = [
    { id: 1, nombre: "Solicitado" },
    { id: 2, nombre: "Pendiente" },
    { id: 3, nombre: "Confirmado" },
    { id: 4, nombre: "Cancelado" },
    { id: 5, nombre: "Finalizado" },
  ];

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Servico</StyledTableCell>
            <StyledTableCell>Repuesto</StyledTableCell>
            <StyledTableCell>Cliente</StyledTableCell>
            <StyledTableCell>Dia / Horario</StyledTableCell>
            <StyledTableCell>Estado</StyledTableCell>
            <StyledTableCell>Opciones</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow key={row.name}>
              <StyledTableCell>{row.name}</StyledTableCell>
              <StyledTableCell>{row.calories}</StyledTableCell>
              <StyledTableCell>{row.fat}</StyledTableCell>
              <StyledTableCell>
                {row.carbs} {row.protein}
              </StyledTableCell>

              <StyledTableCell>
                <DialogState />
                {row.estado}
              </StyledTableCell>

              <StyledTableCell>
                <IconButton color="primary" aria-label="delete">
                  <EditIcon />
                </IconButton>
                <DialogDelete />
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default List;
