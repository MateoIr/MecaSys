import { Box, Grid } from "@mui/material";
import MenuAppBar from "../components/MenuAppBar";
import List from "../components/List";

const ListTurn = () => {
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
        <Grid sx={{ margin: 1, width: "80%" }}>
          <List></List>
        </Grid>
      </Box>
    </Box>
  );
};

export default ListTurn;
