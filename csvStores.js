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
    console.log(csvContent);
    header = "id,address,url,lat,lon\n";
    try{
        fs.writeFile("data/stores.csv", header + csvContent);
    }catch{
        console.log("failed to write")
    }
  }
});