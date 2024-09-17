const axios = require("axios");
const fs = require("fs");

// add whatever this is to gitignore
const SAVE_PATH = "response.json";
const USER_AGENT = "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:130.0) Gecko/20100101 Firefox/130.0"


fs.unlink(SAVE_PATH, (err) => {
  if (err) {
    console.error("unable to remove file:", err);
  }
});

axios
  .post(
    "https://www.dunkindonuts.com/bin/servlet/dsl",
    {
      service: "DSL",
      origin: "41.3595873,-72.63877",
      radius: "25000",
      maxMatches: "30000",
      pageSize: "100000",
      units: "m",
      ambiguities: "ignore",
    },
    {
      headers: {
        "Content-Type": "multipart/form-data",
        "User-agent": USER_AGENT
      },
    }
  )
  .then((response) => {
    fs.writeFile(SAVE_PATH, JSON.stringify(response.data), function (err) {
      if (err) {
        return console.log(err);
      }
      console.log("The file was saved!");
    });
  });
