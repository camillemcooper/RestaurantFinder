import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Grid,
  Button,
  DialogActions,
  makeStyles,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  filters: { display: "flex", justifyContent: "space-around" },
  filterColumn: {
    maxWidth: 200,
    display: "flex",
    flexDirection: "column",
  },
  filter: {
    background: theme.palette.secondary.light,
    margin: 10,
    color: "white",
    border: "5px solid " + theme.palette.secondary.main,
  },
}));

export default function SortDialog({ handleClose, open, chosen }) {
  const classes = useStyles();

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>Choose one of the options below</DialogTitle>
      <DialogContent>
        <Grid className={classes.filters}>
          <Grid className={classes.filterColumn}>
            <Button
              disabled={chosen === "name--a"}
              className={classes.filter}
              onClick={() => handleClose("name", "a")}
            >
              Name: A→Z
            </Button>
            <Button
              disabled={chosen === "name--d"}
              className={classes.filter}
              onClick={() => handleClose("name", "d")}
            >
              Name: Z→A
            </Button>
          </Grid>
          <Grid className={classes.filterColumn}>
            <Button
              disabled={chosen === "price--a"}
              className={classes.filter}
              onClick={() => handleClose("price", "a")}
            >
              Price: low → high
            </Button>
            <Button
              disabled={chosen === "price--d"}
              className={classes.filter}
              onClick={() => handleClose("price", "d")}
            >
              Price: high → low
            </Button>
          </Grid>
          <Grid className={classes.filterColumn}>
            <Button
              disabled={chosen === "rating--a"}
              className={classes.filter}
              onClick={() => handleClose("rating", "a")}
            >
              Rating: low → high
            </Button>
            <Button
              disabled={chosen === "rating--d"}
              className={classes.filter}
              onClick={() => handleClose("rating", "d")}
            >
              Rating: high → low
            </Button>
          </Grid>
        </Grid>
        <DialogActions>
          <Button
            onClick={() => handleClose()}
            variant="contained"
            color="secondary"
          >
            Close
          </Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
}
