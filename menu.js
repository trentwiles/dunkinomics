const axios = require("axios");
const fs = require("fs");
const TOKEN = "d2f28b0ab69842ac91412d448ad10680";
const CSV_PATH = "data/index.csv";

// if it doesn't exit, then create the header of the CSV
if (!fs.existsSync(CSV_PATH)) {
  fs.writeFileSync(filePath, "store,price,address,url,geoJSON\n", {
    flag: "w",
  });
  console.log("index.csv has been created.");
}

function parseMenuData(menuData, metaData) {
  var allCategories = menuData["categoryFamilies"];
  var validCat = null;
  for (var i = 0; i < allCategories.length; i++) {
    if (allCategories[i]["displayName"] == "Categories") {
      validCat = allCategories[i];
      break;
    }
  }
  if (validCat == null) {
    console.log("invalid categories for store " + menuData["menuId"]);
  }

  var validDrinkCat = null;
  for (var i = 0; i < validCat.categories.length; i++) {
    if (validCat.categories[i]["displayName"] == "Iced Drinks") {
      validDrinkCat = validCat.categories[i];
      break;
    }
  }
  if (validDrinkCat == null) {
    console.log("invalid drink categories for store " + menuData["menuId"]);
  }

  var icedDrinks = validDrinkCat["categories"][0]["subCategories"];
  var icedCoffee = null;
  for (var i = 0; i < icedDrinks.length; i++) {
    if (icedDrinks[i]["displayName"] == "Coffee") {
      icedCoffee = icedDrinks[i];
      break;
    }
  }
  if (icedCoffee == null) {
    console.log(
      "invalid iced coffee categories for store " + menuData["menuId"]
    );
  }

  var originalIcedCoffee = null;
  for (var i = 0; i < icedCoffee["menuItems"].length; i++) {
    if (
      icedCoffee["menuItems"][i]["displayName"] == "Original Blend Iced Coffee"
    ) {
      originalIcedCoffee = icedCoffee["menuItems"][i];
    }
  }
  if (originalIcedCoffee == null) {
    console.log("invalid iced coffee listing for store " + menuData["menuId"]);
  }

  var price = originalIcedCoffee["price"];
  console.log(price);

  // Format: store,price,address,url,geoJSON
  fs.writeFile(
    CSV_PATH,
    `12345,${price},${metaData["price"]},${metaData["url"]},${metaData["geoJSON"]}\n`,
    { flag: "w" },
    (err) => {
      if (err) {
        console.error("Error writing to CSV file", err);
      }
    }
  );
}

function scrapeMenu(storeID, storeMetaData) {
  // before anything, ensure that the storeMetaData looks right
  if(storeMetaData == null || !storeMetaData.hasOwnProperty("address")){
    console.log("invalid arguments passed")
    return false
  }

  const ENDPOINT = `https://mapi-dun.prod.ddmprod.dunkindonuts.com/menu-management/v1/menus/v4/${storeID}`;

  const CONFIGURATION = {
    headers: {
      Authorization: `Bearer ${TOKEN}`,
    },
  };

  axios
    .get(ENDPOINT, CONFIGURATION)
    .then((response) => {
      return parseMenuData(response.data, storeMetaData);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

module.exports = {
  scrapeMenu,
};
