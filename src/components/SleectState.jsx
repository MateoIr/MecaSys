import { Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import React from "react";

const SleectState = ({ state, set }) => {
  const [status, setStatus] = React.useState("");

  const handleChange = (event) => {
    set(event.target.value);
    setStatus(event.target.value);
  };
  return (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      <FormControl sx={{ width: "90%" }}>
        <InputLabel id="status-select-label">Estado</InputLabel>
        <Select
          labelId="status-select-label"
          id="status-select"
          value={state}
          label="Estado"
          onChange={handleChange}
        >
          <MenuItem value={1}>Solicitado</MenuItem>
          <MenuItem value={2}>Pendiente</MenuItem>
          <MenuItem value={3}>Confirmado</MenuItem>
          <MenuItem value={4}>Cancelado</MenuItem>
          <MenuItem value={5}>Finalizado</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};

export default SleectState;
