import React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import EditIcon from "@mui/icons-material/Edit";
import { IconButton, CircularProgress } from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import DialogState from "./DialogState";
import DialogDelete from "./DialogDelete";
import useGetTruns from "../hooks/useGetTurns";
import useGetClients from "../hooks/useGetAllClients";
import useGetMecanics from "../hooks/useGetAllMecanics";
import { useNavigate } from "react-router-dom";

const List = () => {
  const { turns, refetch, errorTurns, loadinTurns } = useGetTruns({});
  const { cleints, errorClients, loadingClients } = useGetClients();
  const { mecanics, errorMecanics, loadinMecanics } = useGetMecanics();

  const navigate = useNavigate();

  // Verifica si se están cargando los datos de turnos, clientes o mecánicos
  if (loadinTurns || loadingClients || loadinMecanics) {
    return <CircularProgress />; // O cualquier otro indicador de carga
  }

  if (errorTurns) {
    return <div>Error al cargar turnos: {errorTurns.message}</div>;
  }

  if (errorClients) {
    return <div>Error al cargar clientes: {errorClients.message}</div>;
  }

  if (errorMecanics) {
    return <div>Error al cargar mecánicos: {errorMecanics.message}</div>;
  }

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
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));

  const getClienteNombre = (clienteId) => {
    const cliente = cleints.find((c) => c.idCliente === clienteId);
    return cliente
      ? `${cliente.nombre} ${cliente.apellido}`
      : "Cliente no encontrado";
  };

  const getMecanicoNombre = (mecanicId) => {
    const mecanico = mecanics.find((c) => c.idMecanico === mecanicId);
    return mecanico
      ? `${mecanico.nombre} ${mecanico.apellido}`
      : "Mecánico no encontrado";
  };

  const tablaDatos = Array.isArray(turns)
    ? turns.map((turno) => {
        const clienteNombre = getClienteNombre(turno.cliente);
        const servicios = turno.detalle.map((d) => d.servicio).filter(Boolean);
        const repuestos = turno.detalle
          .map((d) => d.nombreRepuesto)
          .filter(Boolean);
        const mecanicoNombre = getMecanicoNombre(turno.mecanico);
        const fecha = turno.fecha;
        const hora = turno.hora;
        const estado = turno.estadoTruno;

        // Construir el detalle solo si hay elementos en servicios o repuestos
        const detalle = [
          servicios.length > 0 ? servicios.join(", ") : null,
          repuestos.length > 0 ? repuestos.join(", ") : null,
        ]
          .filter(Boolean)
          .join(", ");

        return {
          cliente: clienteNombre,
          detalle: detalle, // Asignar el detalle procesado aquí
          mecanico: mecanicoNombre,
          dia: fecha,
          hora: hora,
          estado: estado,
          id: turno.idturno, // Asegúrate de asignar el id aquí
        };
      })
    : [];

  const estados = {
    1: "Solicitado",
    2: "Pendiente a confirmar",
    3: "Confirmado",
    4: "Cancelado",
    5: "Finalizado",
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Cliente</StyledTableCell>
            <StyledTableCell>Detalle</StyledTableCell>
            <StyledTableCell>Mecánico</StyledTableCell>
            <StyledTableCell>Dia / Horario</StyledTableCell>
            <StyledTableCell>Estado</StyledTableCell>
            <StyledTableCell>Opciones</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tablaDatos.map((row) => (
            <StyledTableRow key={row.id}>
              <StyledTableCell>{row.cliente}</StyledTableCell>
              <StyledTableCell>{row.detalle}</StyledTableCell>
              <StyledTableCell>{row.mecanico}</StyledTableCell>
              <StyledTableCell>
                {row.dia} {row.hora}
              </StyledTableCell>
              <StyledTableCell>
                <DialogState refetch={refetch} id={row.id} />
                {estados[row.estado]}{" "}
              </StyledTableCell>
              <StyledTableCell>
                <IconButton
                  color="primary"
                  aria-label="edit"
                  onClick={() => navigate(`/turno/actualizar/${row.id}`)}
                >
                  <EditIcon />
                </IconButton>
                <DialogDelete id={row.id} refetch={refetch} />{" "}
                {/* Cambia a row.id */}
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default List;
