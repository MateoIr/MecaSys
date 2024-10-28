import {
  Box,
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

const CreateTrun = () => {
  const { cleints, errorClients, loadingClients } = useGetClients();
  const { mecanics, errorMecanics, loadinMecanics } = useGetMecanics();
  const { services, errorServices, loadinServices } = useGetAllServices();
  const { spareParts, errorSpareParts, loadinSpareParts } =
    useGetAllSpareParts();

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
            p: 5,
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
                labelId="demo-simple-select-filled-label"
                id="demo-simple-select-filled"
                // value={age} // Asigna aquí el valor que desees
                // onChange={handleChange} // Maneja el cambio aquí
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
                    <MenuItem key={client.id} value={client.id}>
                      {client.descripcion}
                    </MenuItem>
                  ))
                )}
              </Select>
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
                // value={age} // Asigna aquí el valor que desees
                // onChange={handleChange} // Maneja el cambio aquí
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
                    <MenuItem key={mecanics.id} value={mecanics.id}>
                      {mecanics.descripcion}
                    </MenuItem>
                  ))
                )}
              </Select>
            </FormControl>
          </Grid>

          <Grid xs={6} md={3}>
            Dia:
          </Grid>
          <Grid xs={6} md={3}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker />
            </LocalizationProvider>
          </Grid>
          <Grid xs={6} md={3}>
            Hora:
          </Grid>
          <Grid xs={6} md={3}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["TimePicker"]}>
                <TimePicker label="Basic time picker" />
              </DemoContainer>
            </LocalizationProvider>
          </Grid>

          <Grid xs={12}>
            <h2>Servicios</h2>
            <TransferList services={services} />
            <h2>Repuestos</h2>
            <TransferList services={spareParts} />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default CreateTrun;
