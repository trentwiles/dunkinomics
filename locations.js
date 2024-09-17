const fs = require('fs')

function parseStore(storeData){
    /*
    SAMPLE OF STORE DATA
    ----------------
    see sample.json
    */
   var address = `${storeData["address"]}, ${storeData["city"]}, ${storeData["state"]}`
   var storeID = storeData["recordId"]
   var geoJSON = JSON.parse(storeData["geoJson"])
}


fs.readFile('response.json', 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading file:', err);
    } else {
      // Parse the JSON data
      const jsonData = JSON.parse(data);

      // Use the parsed JSON data
      console.log(jsonData);
      var stores = jsonData.data.storeAttributes

      console.log(stores.length)

      for(var i = 0; i < stores.length; i++){
        parseStore(stores[i])
      }
    }
  });