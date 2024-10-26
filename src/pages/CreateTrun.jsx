import {
  Box,
  FormControl,
  Grid,
  InputLabel,
  List,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import MenuAppBar from "../components/MenuAppBar";

const CreateTrun = () => {
  return (
    <Box height={"100vh"}>
      <MenuAppBar />
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "red",
        }}
      >
        <Grid container sx={{ margin: 1, width: "80%" }}>
          <Grid xs={6} md={3}>
            Cliente:
          </Grid>
          <Grid xs={6} md={3}>
            <FormControl variant="filled" sx={{ m: 1, minWidth: 120 }}>
              <Select
                labelId="demo-simple-select-filled-label"
                id="demo-simple-select-filled"
                // value={age}
                // onChange={handleChange}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid xs={6} md={3}>
            Nombres:
          </Grid>
          <Grid xs={6} md={3}>
            <TextField id="filled-basic" label="Filled" variant="filled" />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default CreateTrun;
