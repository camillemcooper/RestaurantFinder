import axios from "axios";

require("dotenv").config();

const API_KEY = process.env.REACT_APP_GOOGLE_PLACES_API_KEY;

class API {
  static searchRestaurants(latitude, longitude, sortBy, direction) {
    return new Promise((resolve, reject) => {
      let center = latitude + "," + longitude;
      let radius = "3000";
      let url =
        "https://cors-anywhere-hclaunch.herokuapp.com/https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=" +
        center +
        "&radius=" +
        radius +
        "&type=restaurant&opennow&key=" +
        API_KEY;
      axios
        .get(url)
        .then((response) => {
          const results = response.data.results;

          let arr = [];

          results.forEach((result) => {
            if (result.price_level == null) {
              result.price_level = 0;
            }
            arr.push({
              name: result.name,
              price: result.price_level,
              rating: result.rating,
              lat: result.geometry.location.lat,
              long: result.geometry.location.lng,
              address: result.vicinity,
            });
          });

          direction === "a"
            ? arr.sort((a, b) => (a[sortBy] > b[sortBy] ? 1 : -1))
            : arr.sort((a, b) => (b[sortBy] > a[sortBy] ? 1 : -1));

          resolve(arr);
        })
        .catch((err) => {
          console.error(err);
        });
    });
  }

  static searchCuisine(latitude, longitude, cuisine) {
    return new Promise((resolve, reject) => {
      let center = latitude + "," + longitude;
      let radius = "3000";
      let url =
        "https://cors-anywhere-hclaunch.herokuapp.com/https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=" +
        center +
        "&radius=" +
        radius +
        "&type=restaurant&opennow&keyword=" +
        cuisine +
        "&key=" +
        API_KEY;

      axios.get(url).then((response) => {
        let results = response.data.results;

        let arr = [];

        results.forEach((result) => {
          if (result.price_level == null) {
            result.price_level = 0;
          }
          arr.push({
            name: result.name,
            price: result.price_level,
            rating: result.rating,
            lat: result.geometry.location.lat,
            long: result.geometry.location.lng,
            address: result.vicinity,
          });
        });
        resolve(arr);
      });
    });
  }
}

export default API;
