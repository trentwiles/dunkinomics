const fs = require("fs");

function parseStore(storeData) {
  /*
    SAMPLE OF STORE DATA
    ----------------
    see sample.json
    */
  var address = `${storeData["address"]}, ${storeData["city"]}, ${storeData["state"]}`;
  var storeID = storeData["recordId"];
  var geoJSON = JSON.parse(storeData["geoJson"]);
  var url = `https://locations.dunkindonuts.com/en/${storeID}`;

  var meta = {
    address: address,
    html_url: url,
    geoJSON: geoJSON,
    id: storeID,
  };

  return meta
}

function readFile(callback) {
  var storesList = [];
  fs.readFile("data/response.json", "utf8", (err, data) => {
    if (err) {
      console.error("Error reading file:", err);
      callback(err);  // Pass error to callback
    } else {
      // Parse the JSON data
      const jsonData = JSON.parse(data);

      // Use the parsed JSON data
      var stores = jsonData.data.storeAttributes;

      for (var i = 0; i < stores.length; i++) {
        storesList.push(parseStore(stores[i]));
      }
      callback(null, storesList);  // Pass null (no error) and storesList
    }
  });
}

module.exports = {
  parseStore,
  readFile
}