const axios = require("axios");
const fs = require("fs");
const TOKEN = "d2f28b0ab69842ac91412d448ad10680";
const CSV_PATH = "data/index.csv";

// if it doesn't exit, then create the header of the CSV
if (!fs.existsSync(CSV_PATH)) {
  fs.writeFileSync(CSV_PATH, "store,price,address,url,geoJSON\n", {
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
  res = `${metaData["storeID"]},${price},${metaData["price"]},${metaData["url"]},${metaData["lat"]},${metaData["lon"]}\n`
  return res
}

async function scrapeMenu(storeID, storeMetaData) {
    setTimeout(() => {
        // Code to be executed after the delay
        console.log('Waited 2 seconds');
      }, 2000);

    // Validate arguments before anything
    if (!storeMetaData || !storeMetaData.hasOwnProperty("address")) {
      console.log("Invalid arguments passed for store:", storeID);
      return false;
    }
  
    const ENDPOINT = `https://mapi-dun.prod.ddmprod.dunkindonuts.com/menu-management/v1/menus/v4/${storeID}`;
    const CONFIGURATION = {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
    };
  
    try {
      const response = await axios.get(ENDPOINT, CONFIGURATION);
      // parseMenuData is sync :)
      await parseMenuData(response.data, storeMetaData);
    } catch (error) {
      console.error("Error scraping menu for store", storeID, error);
    }
  }
  

module.exports = {
  scrapeMenu,
};
