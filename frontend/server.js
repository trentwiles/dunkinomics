const express = require("express");
const app = express();
const port = 8392;

PROJECT_NAME = "Dunkinomics"

app.use(express.static("static"));

app.set("view engine", "ejs");

app.get("/", (req, res) => {
  data = {
    title: `${PROJECT_NAME} | Home`,
    html_title: "Map of All Locations",
    description: "blah blah"
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
    description: "blah blah"
  };
  res.render("states.ejs", data);
});

app.get("/disposableincome", (req, res) => {
  data = {
    title: `${PROJECT_NAME} | Disposable Income`,
    html_title: "Disposable Income vs. Cost",
    description: "How much does a coffee relativley cost?"
  };
  res.render("disposable.ejs", data);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
