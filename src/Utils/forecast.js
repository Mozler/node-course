const request = require("request");
let stackKey = "92bbf7fb951133d4992c1f743581a82f";

const forecast = (lat, long, callback) => {
  let url = `http://api.weatherstack.com/current?access_key=${stackKey}&query=${lat},${long}&units=m`;
  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("unable to connect to weather services!", undefined);
    } else if (body.error) {
      callback("unable to find the weather data", undefined);
    } else {
      callback(
        undefined,
        `${body.current.temperature} celcius. Humidity is ${body.current.humidity}%.`
      );
    }
  });
};
module.exports = forecast;
