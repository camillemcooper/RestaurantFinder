import React from "react";
import { Typography, CssBaseline, makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  footer: {
    padding: 30,
  },
});

export default function Footer() {
  const classes = useStyles();
  return (
    <footer className={classes.footer}>
      <CssBaseline />
      <Typography>
        Restaurant Finder is a project assigned as part of Forge Launch SWE
        2021. Students are expected to show their ability to integrate APIs in
        the creation of functional and beautiful React web apps.
      </Typography>
      <br></br>
      <Typography>
        Made with <span>❤️</span>by Camille Cooper
      </Typography>
    </footer>
  );
}
