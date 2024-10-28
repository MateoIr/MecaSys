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

export default function TransferList({ services }) {
  const [checked, setChecked] = React.useState([]);
  const [left, setLeft] = React.useState([]);
  const [right, setRight] = React.useState([]);

  // useEffect para actualizar el estado de 'left' cuando 'services' cambia
  useEffect(() => {
    if (Array.isArray(services)) {
      setLeft(services);
      setRight([]);
      setChecked([]);
    }
  }, [services]);

  const leftChecked = intersection(
    checked,
    left.map((service) => service.id)
  );
  const rightChecked = intersection(
    checked,
    right.map((service) => service.id)
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

  const handleAllRight = () => {
    setRight(right.concat(left));
    setLeft([]);
  };

  const handleCheckedRight = () => {
    setRight(
      right.concat(leftChecked.map((id) => left.find((s) => s.id === id)))
    );
    setLeft(
      not(
        left,
        leftChecked.map((id) => left.find((s) => s.id === id))
      )
    );
    setChecked(not(checked, leftChecked));
  };

  const handleCheckedLeft = () => {
    setLeft(
      left.concat(rightChecked.map((id) => right.find((s) => s.id === id)))
    );
    setRight(not(right, rightChecked));
    setChecked(not(checked, rightChecked));
  };

  const handleAllLeft = () => {
    setLeft(left.concat(right));
    setRight([]);
  };

  const customList = (items) => (
    <Paper sx={{ width: 200, height: 230, overflow: "auto" }}>
      <List dense component="div" role="list">
        {items.map((service) => {
          const labelId = `transfer-list-item-${service.id}-label`;
          return (
            <ListItemButton
              key={service.id}
              role="listitem"
              onClick={handleToggle(service.id)}
            >
              <ListItemIcon>
                <Checkbox
                  checked={checked.includes(service.id)}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{
                    "aria-labelledby": labelId,
                  }}
                />
              </ListItemIcon>
              <ListItemText
                id={labelId}
                primary={service.descripcion || "Descripción no disponible"}
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
