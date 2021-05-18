import React, { useState } from "react";
import {
  Typography,
  ButtonGroup,
  Button,
  makeStyles,
  Box,
} from "@material-ui/core";
import Footer from "./Footer";
import Display from "./Display";

const useStyles = makeStyles((theme) => ({
  root: {
    border: "15px solid #003487",
    height: "100vh",
    backgroundColor: theme.palette.primary.main,
    display: "flex",
    flexDirection: "column",
  },
  buttons: {
    margin: 15,
    backgroundColor: "#0B79E5",
    marginTop: "10vh",
  },
  button: {
    color: "white",
    fontSize: 20,
    [theme.breakpoints.down("xs")]: { fontSize: 13 },
  },
  content: { flex: "1 0 auto", maxHeight: "100%" },
  footer: { flexShrink: 0 },
}));

export default function RestaurantFinder() {
  const classes = useStyles();

  const [selected, setSelected] = useState(null);

  if (!selected || selected === "Other") {
    return (
      <div className={classes.root}>
        <div className={classes.content}>
          <Box style={{ padding: 30, marginTop: 30 }}>
            <Typography variant="h3">
              Welcome to the Charlottesville* Restaurant Finder
            </Typography>
            <br />
            <Typography variant="h6">
              *Feel free to use this app for any location not just
              Charlottesville.
            </Typography>
            <ButtonGroup className={classes.buttons}>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => setSelected(["38.0338", "-78.4985"])}
                className={classes.button}
              >
                UVA Corner
              </Button>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => setSelected(["38.0299", "-78.4787"])}
                className={classes.button}
              >
                Downtown Cville
              </Button>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => setSelected([undefined, undefined])}
                className={classes.button}
              >
                Other Location
              </Button>
            </ButtonGroup>
            <Typography variant="h6">
              Choose your location to get started!
            </Typography>
          </Box>
        </div>
        <Footer className={classes.footer} />
      </div>
    );
  } else {
    return (
      <div className={classes.root}>
        <div className={classes.content}>
          <Display lat={selected[0]} lng={selected[1]} />
        </div>
      </div>
    );
  }
}
