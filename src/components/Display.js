import React, { useState, useEffect } from "react";
import API from "../API";
import Restaurants from "./Restaurants";
import Map from "./Map";
import {
  CircularProgress,
  Typography,
  ButtonGroup,
  Button,
  makeStyles,
  Grid,
} from "@material-ui/core";
import UserInput from "./UserInput";
import SortDialog from "./SortDialog";

const useStyles = makeStyles((theme) => ({
  buttons: {
    backgroundColor: "#003487",
  },
  loading: {
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },
  button: { color: "white" },
  middle: {
    alignContent: "center",
    height: "15vh",
  },
  changeIt: {
    display: "flex",
    justifyContent: "space-between",
    margin: "0 30px",
    alignItems: "flex-end",
  },
}));

export default function Display({ lat, lng }) {
  const classes = useStyles();
  const [coords, setCoords] = useState([lat, lng]);
  const [results, setResults] = useState(null);
  const [other, setOther] = useState(false);
  const [sorting, setSorting] = useState(["name", "a"]);
  const [openSort, setOpenSort] = useState(false);

  useEffect(() => {
    if (coords[0] && coords[1]) {
      API.searchRestaurants(coords[0], coords[1], sorting[0], sorting[1]).then(
        (data) => {
          setResults(data);
        }
      );
    } else {
      setOther(true);
    }
  }, [coords, sorting]);

  const setLocation = (location) => {
    switch (location) {
      case "corner":
        setCoords(["38.0338", "-78.4985"]);
        break;
      case "downtown":
        setCoords(["38.0299", "-78.4787"]);
        break;
      default:
        setOther(true);
    }
  };

  const handleClose = (val = sorting[0], order = sorting[1]) => {
    console.log(val, order);
    setSorting([val, order]);
    setOpenSort(false);
  };

  if (results) {
    return (
      <div>
        <Map data={results} lng={coords[1]} lat={coords[0]} />
        <div className={classes.middle}>
          <Typography
            variant="subtitle2"
            align="right"
            style={{ marginRight: 30 }}
          >
            Red circle is the approximate location entered
          </Typography>

          {other ? (
            <UserInput setCoords={setCoords} setOther={setOther} />
          ) : (
            <>
              <Grid className={classes.changeIt}>
                <Grid>
                  <Typography style={{ fontSize: 20 }} align="left">
                    Check out somewhere else
                  </Typography>
                  <ButtonGroup className={classes.buttons}>
                    <Button
                      onClick={() => setLocation("corner")}
                      className={classes.button}
                    >
                      Corner
                    </Button>
                    <Button
                      onClick={() => setLocation("downtown")}
                      className={classes.button}
                    >
                      Downtown Cville
                    </Button>
                    <Button
                      onClick={() => setLocation("other")}
                      className={classes.button}
                    >
                      Other
                    </Button>
                  </ButtonGroup>
                </Grid>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => setOpenSort(true)}
                >
                  Sort
                </Button>
              </Grid>
              <Restaurants data={results} lat={lat} lng={lng} />
              <SortDialog
                handleClose={handleClose}
                open={openSort}
                chosen={sorting[0] + "--" + sorting[1]}
              />
            </>
          )}
        </div>
      </div>
    );
  } else if (lat === undefined && lng === undefined) {
    return (
      <div className={classes.loading}>
        <UserInput setCoords={setCoords} setOther={setOther} />
      </div>
    );
  } else {
    return (
      <div className={classes.loading}>
        <Typography variant="h3">Loading Data</Typography>
        <CircularProgress style={{ color: "#003487" }} />
      </div>
    );
  }
}
