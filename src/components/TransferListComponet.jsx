import React, { useEffect } from "react";
import {
  Grid,
  Paper,
  List,
  ListItemButton,
  ListItemIcon,
  Checkbox,
  ListItemText,
  Button,
} from "@mui/material";

function not(a, b) {
  return a.filter((value) => !b.includes(value));
}

function intersection(a, b) {
  return a.filter((value) => b.includes(value));
}

export default function TransferList({
  services,
  idtoUse,
  descripcionToUse,
  register,
  setValue,
  name,
}) {
  const [checked, setChecked] = React.useState([]);
  const [left, setLeft] = React.useState([]);
  const [right, setRight] = React.useState([]);

  useEffect(() => {
    if (Array.isArray(services)) {
      setLeft(services);
      setRight([]);
      setChecked([]);
    }
  }, [services]);

  const leftChecked = intersection(
    checked,
    left.map((service) => service[idtoUse])
  );
  const rightChecked = intersection(
    checked,
    right.map((service) => service[idtoUse])
  );

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const updateValues = (newRight) => {
    setValue(
      name,
      newRight.map((service) => service[idtoUse])
    ); // Actualiza el valor en el formulario
  };

  const handleAllRight = () => {
    const allRight = left.concat(right);
    setRight(allRight);
    setLeft([]);
    updateValues(allRight); // Actualiza los valores en el formulario
  };

  const handleCheckedRight = () => {
    const newRight = right.concat(
      leftChecked.map((id) => left.find((s) => s[idtoUse] === id))
    );
    setRight(newRight);
    setLeft(
      not(
        left,
        leftChecked.map((id) => left.find((s) => s[idtoUse] === id))
      )
    );
    setChecked(not(checked, leftChecked));
    updateValues(newRight); // Actualiza los valores en el formulario
  };

  const handleCheckedLeft = () => {
    const newLeft = left.concat(
      rightChecked.map((id) => right.find((s) => s[idtoUse] === id))
    );
    setLeft(newLeft);
    setRight(not(right, rightChecked));
    setChecked(not(checked, rightChecked));
    updateValues(newLeft); // Actualiza los valores en el formulario
  };

  const handleAllLeft = () => {
    const allLeft = left.concat(right);
    setLeft(allLeft);
    setRight([]);
    updateValues(allLeft); // Actualiza los valores en el formulario
  };

  const customList = (items) => (
    <Paper sx={{ width: 200, height: 230, overflow: "auto" }}>
      <List dense component="div" role="list">
        {items.map((service) => {
          const labelId = `transfer-list-item-${service[idtoUse]}-label`;
          return (
            <ListItemButton
              key={service[idtoUse]}
              role="listitem"
              onClick={handleToggle(service[idtoUse])}
            >
              <ListItemIcon>
                <Checkbox
                  checked={checked.includes(service[idtoUse])}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{
                    "aria-labelledby": labelId,
                  }}
                />
              </ListItemIcon>
              <ListItemText
                id={labelId}
                primary={
                  service[descripcionToUse] || "Descripción no disponible"
                }
              />
            </ListItemButton>
          );
        })}
      </List>
    </Paper>
  );

  return (
    <Grid
      container
      spacing={2}
      sx={{ justifyContent: "center", alignItems: "center" }}
    >
      <Grid item>{customList(left)}</Grid>
      <Grid item>
        <Grid container direction="column" sx={{ alignItems: "center" }}>
          <Button
            sx={{ my: 0.5 }}
            variant="outlined"
            size="small"
            onClick={handleAllRight}
            disabled={left.length === 0}
            aria-label="move all right"
          >
            ≫
          </Button>
          <Button
            sx={{ my: 0.5 }}
            variant="outlined"
            size="small"
            onClick={handleCheckedRight}
            disabled={leftChecked.length === 0}
            aria-label="move selected right"
          >
            &gt;
          </Button>
          <Button
            sx={{ my: 0.5 }}
            variant="outlined"
            size="small"
            onClick={handleCheckedLeft}
            disabled={rightChecked.length === 0}
            aria-label="move selected left"
          >
            &lt;
          </Button>
          <Button
            sx={{ my: 0.5 }}
            variant="outlined"
            size="small"
            onClick={handleAllLeft}
            disabled={right.length === 0}
            aria-label="move all left"
          >
            ≪
          </Button>
        </Grid>
      </Grid>
      <Grid item>{customList(right)}</Grid>
    </Grid>
  );
}
