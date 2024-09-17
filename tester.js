const menu = require("./menu");
const locations = require("./locations");
const fs = require("fs");
const readline = require("readline");

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
    fs.writeFile("data/stores.csv", header + csvContent);
  }
});

// next, read that csv file

var storeMetaHolder
const fileStream = fs.createReadStream("data/stores.csv", "utf8");

// Create an interface for reading lines
const rl = readline.createInterface({
  input: fileStream,
  crlfDelay: Infinity, // Recognize all instances of CR LF (\r\n) and LF (\n) as a single line break
});

// Listen for each line
rl.on("line", (line) => {
  // 0 - id
  // 1 - address
  // 2 - url
  // 3 - latitude
  // 4 - longitude
  data = line.split(",")
  id = data[0]
  metadata = {
    
  }
});

// Handle end of file
rl.on("close", () => {
  console.log("File reading finished.");
});

// Handle errors
rl.on("error", (err) => {
  console.error("Error reading file:", err);
});
