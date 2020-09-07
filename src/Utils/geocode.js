const request = require("request");
const apiKey =
  "pk.eyJ1IjoibW96bGVyIiwiYSI6ImNrZTM4ODk2OTBncnkzMXBkMXh0dzBwcWMifQ.--QpzaU2yEDI2M_WyhM0iQ";

const geocode = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    address
  )}.json?access_token=${apiKey}&limit=1`;
  request({ url, json: true }, (error, { body } = {}) => {
    if (error) {
      callback("unable to connect to location services!", undefined);
    } else if (body.features.length === 0) {
      callback("unable to find the location", undefined);
    } else {
      callback(undefined, {
        latitude: body.features[0].center[1],
        longitude: body.features[0].center[0],
        location: body.features[0].place_name,
      });
    }
  });
};

module.exports = geocode;
