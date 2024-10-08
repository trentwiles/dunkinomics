const locations = require("./locations");
const fs = require("fs");

// first- add the stores and their metadata to a csv file
locations.readFile((error, storesList) => {
  if (error) {
    console.error("Error reading file:", error);
  } else {
    // now we have the prepared stores list:
    csvContent = storesList
      .map((element) => {
        return `${element["id"]},"${element["address"]}",${element["html_url"]},${element["geoJSON"]["coordinates"][0]},${element["geoJSON"]["coordinates"][1]}\n`;
      })
      .join("");
    header = "id,address,url,lat,lon\n";
    fs.writeFile("data/stores.csv", header + csvContent, "utf8", (err) => {
      if (err) throw err;
      console.log("CSV file available at data/stores.csv");
    });
  }
});
