const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./Utils/geocode");
const forecast = require("./Utils/forecast");

const publicDir = path.join(__dirname, "../public");
const viewsDir = path.join(__dirname, "../templates/views");
const partialsDir = path.join(__dirname, "../templates/partials");
const app = express();

app.set("view engine", "hbs");
app.set("views", viewsDir);
hbs.registerPartials(partialsDir);

app.use(express.static(publicDir));

app.get("", (req, res) => {
  res.render("index", {
    title: "Homepage",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Helper Cat",
  });
});

app.get("/about", (req, res) => {
  res.render("about", { title: "About Page" });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({ error: "Address must be provided" });
  }

  geocode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send({ error });
      }
      forecast(latitude, longitude, (error, castData) => {
        if (error) {
          return res.send({ error });
        }
        res.send({
          address: req.query.address,
          location: location,
          temperature: castData,
        });
      });
    }
  );
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404 - Page not Found",
    errorText: "The help article you are looking could not be found",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404 - Page not Found",
    errorText: "The page you are looking could not be found",
  });
});

app.listen(3000, () => {});
