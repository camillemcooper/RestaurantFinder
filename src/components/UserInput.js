import React, { useState } from "react";
import axios from "axios";
import {
  makeStyles,
  TextField,
  Button,
  Typography,
  ButtonGroup,
} from "@material-ui/core";

require("dotenv").config();

const API_KEY = process.env.REACT_APP_GOOGLE_PLACES_API_KEY;

const useStyles = makeStyles({
  header: { color: "navy" },
  root: {
    padding: 10,
  },
  addressInput: { width: 200, margin: 10 },
  button: { color: "white", backgroundColor: "#003487" },
});

export default function UserInput({ setCoords, setOther }) {
  const classes = useStyles();
  const [formData, setFormData] = useState({
    streetNumber: "",
    streetName: "",
    city: "",
    state: "",
    streetType: "",
  });

  const handleChangeText = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const { streetNumber, streetName, city, state, streetType } = formData;

  const submitAddress = () => {
    const base = "https://maps.googleapis.com/maps/api/geocode/json?address=";
    const address = `${streetNumber}+${streetName}+${streetType}+${city}+${state}`;
    const url = base + address + "&key=" + API_KEY;

    axios.get(url).then((response) => {
      const lat = response.data.results[0].geometry.location.lat;
      const lng = response.data.results[0].geometry.location.lng;

      setCoords([lat, lng]);
      setOther(false);
    });
  };

  return (
    <div className={classes.root}>
      <Typography variant="h4" className={classes.header}>
        Enter Location
      </Typography>
      <TextField
        id="steetNumber"
        label="Street Number (i.e. 4375)"
        onChange={handleChangeText}
        className={classes.addressInput}
      />
      <TextField
        id="streetName"
        label="Street Name (i.e. 14th)"
        onChange={handleChangeText}
        className={classes.addressInput}
      />
      <TextField
        id="streetType"
        label="Street Type (i.e. St)"
        onChange={handleChangeText}
        className={classes.addressInput}
      />
      <br></br>
      <TextField
        id="city"
        label="City"
        onChange={handleChangeText}
        className={classes.addressInput}
      />
      <TextField
        id="state"
        label="State"
        onChange={handleChangeText}
        className={classes.addressInput}
      />
      <br />
      <ButtonGroup style={{ margin: 50 }}>
        <Button className={classes.button} onClick={submitAddress}>
          Explore Restaurants Here
        </Button>
        <Button className={classes.button} onClick={() => setOther(false)}>
          Close
        </Button>
      </ButtonGroup>
    </div>
  );
}
