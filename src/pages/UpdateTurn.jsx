import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  Grid,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import MenuAppBar from "../components/MenuAppBar";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
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
import dayjs from "dayjs";
import { useParams } from "react-router-dom";
import useGetUnicTrun from "../hooks/useGetUnicTurn";
import useUpdateTrun from "../hooks/useUpdateTrun";

const UpdateTurn = () => {
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [selectedTime, setSelectedTime] = useState(dayjs());

  const [id, setId] = useState("null");
  const [turnToLoad, setTurnToLoad] = useState("null");
  const { cleints, errorClients, loadingClients } = useGetClients();
  const { mecanics, errorMecanics, loadinMecanics } = useGetMecanics();
  const { services, errorServices, loadinServices } = useGetAllServices();
  const { spareParts, errorSpareParts, loadinSpareParts } =
    useGetAllSpareParts();
  const { car, errorCar, loadinCar, refetch } = useGetCar(id);

  const { createUpdateTurn, errorUpdateTrun, isLoadingUpdateTrun } =
    useUpdateTrun();

  const { id: idToSearch } = useParams();

  useEffect(() => {
    setTurnToLoad(idToSearch);

    console.log(trun);
  }, [idToSearch]);

  const {
    trun,
    errorTrun: errorTrunToSearch,
    loadinTrun: loadinTruntoSearch,
  } = useGetUnicTrun(turnToLoad);

  const schema = yup.object().shape({
    cliente: yup.string().required("ingrese un valor"),
    mecanico: yup.string().required("ingrese un valor"),
    servicio: yup.array().of(yup.string()).nullable(), // Permite que sea nulo o vacío
    repuesto: yup.array().of(yup.string()).nullable(), // Permite que sea nulo o vacío
    vehiculo: yup.string().required("El número de teléfono es requerido"),
    fecha: yup.string().required("El número de teléfono es requerido"),
    hora: yup
      .string()
      .required("Ingrese un valor")
      .test(
        "valid-time",
        "La hora debe estar entre las 6:00 am y las 11:59 pm",
        (value) => {
          if (!value) return false;
          const [hours, minutes] = value.split(":").map(Number);
          return hours >= 6 && hours < 24; // permite horas entre las 6:00 y las 23:59
        }
      ),
  });
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  useEffect(() => {
    if (trun) {
      // Pre-cargar valores en los campos del formulario
      setValue("cliente", trun.cliente);
      setId(trun.cliente);
      setValue("mecanico", trun.mecanico);
      setValue("vehiculo", trun.vehiculo);
      setValue("fecha", dayjs(trun.fecha, "DD/MM/YYYY").format("YYYY-MM-DD"));
      const formattedHora = dayjs(trun.hora, "HH:mm:ss").format("HH:mm:ss");
      setValue("hora", formattedHora); // Establecer el valor de hora en el formulario en el formato esperado
      setSelectedTime(dayjs(trun.hora, "HH:mm:ss")); // Asegura que el `TimePicker` reciba un objeto Dayjs

      setValue("servicio", []);
      setValue("repuesto", []);
    }
  }, [trun, setValue]);

  const onSubmit = (data) => {
    console.log(schema.hora);
    createUpdateTurn({ data, id: idToSearch }); // Llama a createTurn con el objeto data directamente
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
                onChange={(event) => {
                  handleChangeClient(event); // Actualiza el ID del cliente seleccionado
                  setValue("cliente", event.target.value); // Asegura que el formulario actualice el valor
                }}
                value={watch("cliente") || ""} // Usa watch para enlazar el valor dinámicamente
                disabled={true}
              >
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
                {...register("mecanico")}
                labelId="demo-simple-select-filled-label"
                id="demo-simple-select-filled"
                onChange={(event) => {
                  setValue("mecanico", event.target.value); // Asegura que el formulario actualice el valor
                }}
                value={watch("mecanico") || ""} // Usa watch para enlazar el valor dinámicamente
              >
                {loadinMecanics ? (
                  <MenuItem disabled>
                    <CircularProgress size={24} />
                  </MenuItem>
                ) : errorMecanics ? (
                  <MenuItem disabled>Error loading mechanics</MenuItem>
                ) : (
                  mecanics.map((mecanico) => (
                    <MenuItem
                      key={mecanico.idMecanico}
                      value={mecanico.idMecanico}
                    >
                      {mecanico.nombre} {mecanico.apellido}
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
                onChange={(event) => {
                  setValue("vehiculo", event.target.value); // Asegura que el formulario actualice el valor seleccionado
                }}
                value={watch("vehiculo") || ""} // Usa watch para enlazar el valor dinámicamente
              >
                {loadinCar ? (
                  <MenuItem disabled>
                    <CircularProgress size={24} />
                  </MenuItem>
                ) : errorCar ? (
                  <MenuItem disabled>Error loading vehicles</MenuItem>
                ) : (
                  car.map((car) => (
                    <MenuItem key={car.idVehiculo} value={car.idVehiculo}>
                      {car.marca} {car.modelo}
                    </MenuItem>
                  ))
                )}
              </Select>
              {errors.vehiculo && (
                <p style={{ color: "red" }}>Complete el campo</p>
              )}
            </FormControl>
          </Grid>

          <Grid xs={6} md={3} pt="3px">
            Dia:
          </Grid>
          <Grid xs={6} md={3} pt="3px">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                value={selectedDate}
                onChange={(newValue) => {
                  setSelectedDate(newValue);
                  const formattedDate = dayjs(newValue).format("YYYY-MM-DD");
                  setValue("fecha", formattedDate);
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
                value={selectedTime}
                onChange={(newValue) => {
                  setSelectedTime(newValue);
                  const formattedTime = dayjs(newValue).format("HH:mm:ss");
                  setValue("hora", formattedTime);
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    error={!!errors.hora}
                    helperText={errors.hora ? errors.hora.message : ""}
                  />
                )}
              />
            </LocalizationProvider>
            {errors.hora && (
              <p style={{ color: "red" }}>{errors.hora.message}</p>
            )}
          </Grid>

          <Grid xs={12}>
            <h2>Servicios</h2>
            <h6>
              Seleccionado con anteriorida:<br></br>
              {trun?.detalle.map((d) => d.servicio)}
            </h6>
            <TransferList
              services={services}
              idtoUse="idServicio"
              descripcionToUse="nombreServicio"
              register={register}
              setValue={setValue}
              name="servicio"
            />
            <h2>Repuestos</h2>
            <h6>
              Seleccionado con anteriorida:<br></br>
              {trun?.detalle.map((d) => d.nombreRepuesto)}
            </h6>
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
              Modificar Turno
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default UpdateTurn;
