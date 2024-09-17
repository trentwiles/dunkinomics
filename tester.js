const menu = require('./menu')
const locations = require('./locations')

locations.readFile((error, storesList) => {
    if (error) {
      console.error("Error reading file:", error);
    } else {
      console.log("Stores List:");
      console.log(storesList);
    }
  });