import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";

import mecanico from "../img/mecanico.jpg";
import servicio from "../img/cambioDeAciete.jpg";
import MenuAppBar from "../components/MenuAppBar";
import { Navigate, useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <Box height={"100vh"}>
      <MenuAppBar />
      <Grid
        container
        spacing={0.5}
        sx={{
          pt: { xs: 3, sm: 20 },
          width: "100%",
          height: "auto",
          justifyContent: "center",
        }}
      >
        <Grid item xs={12} sm={5.75} display="flex" justifyContent="center">
          <Card
            sx={{
              maxWidth: 345,
              backgroundColor: "gray",
              height: "auto",
              boxShadow: "0px 0px 3px rgba(255, 255, 255, 0.3)",
            }}
          >
            <CardActionArea onClick={() => navigate("/turnos")}>
              <CardMedia
                component="img"
                height="140"
                image={mecanico}
                alt="green iguana"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Listado de Turnos
                </Typography>
                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                  Ver turnos, eliminar, cambiar estados y modificar turnos
                  <br />
                  <br />
                  <br />
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>

        <Grid item xs={12} sm={5.75} display="flex" justifyContent="center">
          <Card
            sx={{
              maxWidth: 345,
              backgroundColor: "gray",
              height: "auto",
              boxShadow: "0px 0px 3px rgba(255, 255, 255, 0.3)",
            }}
          >
            <CardActionArea onClick={() => navigate("/turno")}>
              <CardMedia
                component="img"
                height="140"
                image={servicio}
                alt="green iguana"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Crear Turno
                </Typography>
                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                  Crea turnos para tus clientes elginedo mecanico, servicios y
                  repuestos
                  <br />
                  <br />
                  <br />
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Home;
