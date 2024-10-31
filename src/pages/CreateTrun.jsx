import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  Grid,
  InputLabel,
  List,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import MenuAppBar from "../components/MenuAppBar";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import TransferList from "../components/TransferListComponet";
import useGetClients from "../hooks/useGetAllClients";
import useGetMecanics from "../hooks/useGetAllMecanics";
import useGetAllServices from "../hooks/useGetAllServices";
import useGetAllSpareParts from "../hooks/useGetAllSpareParts";
import useGetCar from "../hooks/useGetCar";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import useSaveTurn from "../hooks/useSaveTurn";
import dayjs from "dayjs";

const CreateTrun = () => {
  const [id, setId] = useState("null");
  const { cleints, errorClients, loadingClients } = useGetClients();
  const { mecanics, errorMecanics, loadinMecanics } = useGetMecanics();
  const { services, errorServices, loadinServices } = useGetAllServices();
  const { spareParts, errorSpareParts, loadinSpareParts } =
    useGetAllSpareParts();
  const { car, errorCar, loadinCar, refetch } = useGetCar(id);

  const { createTurn, errorTrun, isLoadingTrun } = useSaveTurn();

  const schema = yup.object().shape({
    cliente: yup.string().required("ingrese un valor"),
    mecanico: yup.string().required("ingrese un valor"),
    servicio: yup.array().of(yup.string()),
    repuesto: yup.array().of(yup.string()),
    vehiculo: yup.string().required("El número de teléfono es requerido"),
    fecha: yup.string().required("El número de teléfono es requerido"),
    hora: yup.string().required("ingrese un valor"),
  });

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const onSubmit = (data) => {
    console.log("onSubmit ejecutado");
    console.log(data);
    createTurn(data); // Llama a createTurn con el objeto data directamente
  };
  const handleChangeClient = (event) => {
    const selectedId = event.target.value;
    setId(selectedId);
    refetch();
  };

  return (
    <Box height={"100vh"}>
      <MenuAppBar />
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Grid
          container
          sx={{
            p: 3,
            width: "80%",
            backgroundColor: "rgb(160, 160, 160)",
          }}
        >
          <Grid item xs={12}>
            <h1>Registrar Turno:</h1>
          </Grid>
          <Grid xs={6} md={3}>
            Cliente:
          </Grid>
          <Grid xs={6} md={3}>
            <FormControl variant="filled" sx={{ pt: 1, minWidth: 150 }}>
              <Select
                {...register("cliente")}
                labelId="demo-simple-select-filled-label"
                id="demo-simple-select-filled"
                onChange={handleChangeClient}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {loadingClients ? (
                  <MenuItem disabled>
                    <CircularProgress size={24} />
                  </MenuItem>
                ) : errorClients ? (
                  <MenuItem disabled>Error loading clients</MenuItem>
                ) : (
                  cleints.map((client) => (
                    <MenuItem key={client.idCliente} value={client.idCliente}>
                      {client.nombre} {client.apellido}
                    </MenuItem>
                  ))
                )}
              </Select>
              {errors.cliente && (
                <p style={{ color: "red" }}>complete el campo</p>
              )}
            </FormControl>
          </Grid>
          <Grid xs={6} md={3}>
            Mecanico:
          </Grid>
          <Grid xs={6} md={3}>
            <FormControl variant="filled" sx={{ pt: 1, minWidth: 150 }}>
              <Select
                labelId="demo-simple-select-filled-label"
                id="demo-simple-select-filled"
                {...register("mecanico")}
                name="mecanico"
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {loadinMecanics ? (
                  <MenuItem disabled>
                    <CircularProgress size={24} />
                  </MenuItem>
                ) : errorMecanics ? (
                  <MenuItem disabled>Error loading clients</MenuItem>
                ) : (
                  mecanics.map((mecanics) => (
                    <MenuItem
                      key={mecanics.idMecanico}
                      value={mecanics.idMecanico}
                    >
                      {mecanics.nombre} {mecanics.apellido}
                    </MenuItem>
                  ))
                )}
              </Select>
              {errors.mecanico && (
                <p style={{ color: "red" }}>complete el campo</p>
              )}
            </FormControl>
          </Grid>
          <Grid xs={6} md={3}>
            Vehiculo:
          </Grid>
          <Grid xs={6} md={3}>
            <FormControl variant="filled" sx={{ pt: 1, minWidth: 150 }}>
              <Select
                labelId="demo-simple-select-filled-label"
                id="demo-simple-select-filled"
                {...register("vehiculo")}
                name="vehiculo"
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {loadinCar ? (
                  <MenuItem disabled>
                    <CircularProgress size={24} />
                  </MenuItem>
                ) : errorCar ? (
                  <MenuItem disabled>Error loading clients</MenuItem>
                ) : (
                  car.map((car) => (
                    <MenuItem key={car.idVehiculo} value={car.idVehiculo}>
                      {car.marca} {car.modelo}
                    </MenuItem>
                  ))
                )}
              </Select>
              {errors.auto && <p style={{ color: "red" }}>complete el campo</p>}
            </FormControl>
          </Grid>

          <Grid xs={6} md={3} pt="3px">
            Dia:
          </Grid>
          <Grid xs={6} md={3} pt="3px">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                {...register("fecha")}
                onChange={(newValue) => {
                  const formattedDate = dayjs(newValue).format("YYYY-MM-DD");
                  setValue("fecha", formattedDate); // Envía el formato deseado al formulario
                }}
                format="YYYY/MM/DD"
                renderInput={(params) => (
                  <TextField
                    {...params}
                    error={!!errors.fecha}
                    helperText={errors.fecha ? "Complete el campo" : ""}
                  />
                )}
              />
            </LocalizationProvider>
            {errors.fecha && <p style={{ color: "red" }}>complete el campo</p>}
          </Grid>
          <Grid xs={6} md={3}>
            Hora:
          </Grid>
          <Grid xs={6} md={3}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <TimePicker
                {...register("hora")}
                onChange={(newValue) => {
                  const formattedTime = dayjs(newValue).format("HH:mm:ss");
                  setValue("hora", formattedTime); // Guarda en el formato hh:mm:ss
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    error={!!errors.hora}
                    helperText={errors.hora ? "Complete el campo" : ""}
                  />
                )}
              />
            </LocalizationProvider>
            {errors.hora && <p style={{ color: "red" }}>Complete el campo</p>}
          </Grid>

          <Grid xs={12}>
            <h2>Servicios</h2>
            <TransferList
              services={services}
              idtoUse="idServicio"
              descripcionToUse="nombreServicio"
              register={register}
              setValue={setValue}
              name="servicio"
            />
            <h2>Repuestos</h2>
            <TransferList
              services={spareParts}
              idtoUse="idRepuesto"
              descripcionToUse="descripcion"
              register={register}
              setValue={setValue}
              name="repuesto"
            />
          </Grid>
          <Grid xs={8} pt="7"></Grid>
          <Grid xs={4} pt="7">
            <Button
              variant="contained"
              type="submit"
              onClick={handleSubmit(onSubmit)}
            >
              Crear Turno
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default CreateTrun;
