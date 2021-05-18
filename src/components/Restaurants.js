import React, { useState } from "react";
import {
  Box,
  Typography,
  makeStyles,
  Button,
  Grid,
  IconButton,
  CircularProgress,
} from "@material-ui/core";
import DirectionsIcon from "@material-ui/icons/Directions";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "50vh",
    marginTop: 10,
    overflow: "hidden",
    bottom: 0,
    position: "absolute",
    marginBottom: 15,
  },
  restaurant: {
    border: "10px solid #003487",
    margin: 15,
    padding: 10,
    width: "40vw",
    backgroundColor: "#0B79E5",
    justifyContent: "space-between",
    display: "flex",
    flexDirection: "column",
    color: "white",
    maxWidth: 400,
  },
  cards: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "scroll",
    height: "calc(100% - 15px)",
    width: "calc(100vw - 30px)",
    paddingBottom: 20,
    [theme.breakpoints.down("xs")]: { width: "80vw" },
  },
  details: { padding: "5px 0" },
  button: { color: "white", backgroundColor: "#003487" },
  listItem: {
    display: "flex",
    width: "90vw",
    overflow: "scroll",
    padding: "5px 2vw",
    margin: "5px auto",
    background: "#0B79E5",
    alignItems: "center",
    color: "white",
    border: `5px solid ${theme.palette.secondary.main}`,
  },
  list: {
    height: "calc(100% - 15px)",
    paddingBottom: 35,
    overflow: "scroll",
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    width: "calc(100vw - 30px)",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    padding: "0 30px",
    alignItems: "center",
  },
}));

export default function Restaurants({ data, lat, lng }) {
  const [view, setView] = useState("Cards");
  const classes = useStyles();

  if (data)
    return (
      <div className={classes.root}>
        {view === "Cards" ? (
          <>
            <div className={classes.header}>
              <Typography align="left" style={{ fontSize: 25 }}>
                Explore the {data.length} restaurants open right now!
              </Typography>

              <Button
                variant="contained"
                color="secondary"
                onClick={() => setView("List")}
                style={{ marginBottom: 10 }}
              >
                List View
              </Button>
            </div>

            <div className={classes.cards}>
              {data.map((restaurant) => (
                <Box className={classes.restaurant} key={restaurant.address}>
                  <Typography variant="h5">{restaurant.name}</Typography>
                  <Grid className={classes.details}>
                    <Typography variant="body1" align="left">
                      {restaurant.address}
                    </Typography>
                    <Typography variant="body1" align="left">
                      Rating: {"⭐️".repeat(restaurant.rating)} (
                      {restaurant.rating})
                    </Typography>
                    <Typography variant="body1" align="left">
                      Price:{" "}
                      {restaurant.price === 0
                        ? "N/A"
                        : "$".repeat(restaurant.price)}
                    </Typography>
                  </Grid>
                  <Button
                    className={classes.button}
                    href={`https://www.google.com/maps/dir/${lat},${lng}/${encodeURIComponent(
                      restaurant.address
                    )}`}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    Directions
                  </Button>
                </Box>
              ))}
            </div>
          </>
        ) : (
          <>
            <div className={classes.header}>
              <Typography align="left" style={{ fontSize: 25 }}>
                Explore the {data.length} restaurants open right now!
              </Typography>

              <Button
                variant="contained"
                color="secondary"
                onClick={() => setView("Cards")}
                style={{ marginBottom: 10 }}
              >
                Card View
              </Button>
            </div>
            <div className={classes.list}>
              {data.map((restaurant) => (
                <Box className={classes.listItem} key={restaurant.address}>
                  <Grid style={{ width: "-webkit-fill-available" }}>
                    <Typography align="left">
                      <strong>{restaurant.name}</strong>
                    </Typography>
                    <Typography align="left">{restaurant.address}</Typography>
                  </Grid>
                  <Grid style={{ width: 150 }}>
                    <Typography>
                      <strong>Price</strong>
                    </Typography>
                    {restaurant.price === 0
                      ? "N/A"
                      : "$".repeat(restaurant.price)}
                  </Grid>
                  <Grid style={{ width: 200 }}>
                    <Typography>
                      <strong>Rating</strong>
                    </Typography>
                    {"⭐️".repeat(restaurant.rating)} ({restaurant.rating})
                  </Grid>
                  <IconButton
                    style={{ width: 100 }}
                    href={`https://www.google.com/maps/dir/${lat},${lng}/${encodeURIComponent(
                      restaurant.address
                    )}`}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    <DirectionsIcon style={{ color: "white" }} />
                  </IconButton>
                </Box>
              ))}
            </div>
          </>
        )}
      </div>
    );
  else {
    return (
      <>
        <br />
        <CircularProgress style={{ color: "navy", marginTop: "10vh" }} />
        <Typography style={{ fontSize: 25 }}>Loading Restaurants...</Typography>
      </>
    );
  }
}
