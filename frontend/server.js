const express = require("express");
const app = express();
const port = 8392;

PROJECT_NAME = "Dunkinomics"

app.use(express.static("static"));

app.set("view engine", "ejs");

app.get("/", (req, res) => {
  data = {
    title: `${PROJECT_NAME} | Home`,
    html_title: "Dunkinomics",
    description: "During my time working for Dunkin Donuts in the summer after freshman year, I learned plenty",
    next: "/locations_mapped",
    next_title: "Next"
  };
  res.render("home.ejs", data);
});

app.get("/locations_mapped", (req, res) => {
  data = {
    title: `${PROJECT_NAME} | Full Map`,
    html_title: "Map of All Locations",
    description: "blah blah",
    next: "/states",
    next_title: "Next"
  };
  res.render("index.ejs", data);
});

app.get("/states", (req, res) => {
  /*
  Project: auto-set the ranges for the colors, based on the data in the file
  */
  data = {
    title: `${PROJECT_NAME} | States`,
    html_title: "Average Cost By State",
    description: "blah blah",
    next: "/disposableincome",
    next_title: "Next"
  };
  res.render("index.ejs", data);
});

app.get("/disposableincome", (req, res) => {
  data = {
    title: `${PROJECT_NAME} | Disposable Income`,
    html_title: "Disposable Income vs. Cost",
    description: "How much does a coffee relativley cost?",
    next: "/",
    next_title: "Return Home"
  };
  res.render("disposable.ejs", data);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
