import requests
import csv
import sys
import time

TOKEN = "d2f28b0ab69842ac91412d448ad10680"

# we now have this stores.csv file from the javascript code
# it is our job to parse it and send a request to the DD api
# to get the iced coffee price from each store

def getPrice(id):
    res = requests.get(
        f"https://mapi-dun.prod.ddmprod.dunkindonuts.com/menu-management/v1/menus/v4/{id}",
        headers={
            "Authorization": f"Bearer {TOKEN}"
        }
    )
    
    # The second box of categories is the non seasonal items
    allCats = res.json()["categoryFamilies"][1]["categories"]
    for cat in allCats:
        # Find iced drinks in non-seasonal items
        if cat["displayName"] == "Iced Drinks":
            icedDrinks = cat
            for singleIcedDrink in icedDrinks["categories"][0]["subCategories"]:
                # find coffee under iced drinks
                if singleIcedDrink["displayName"] == "Coffee":
                    icedCoffee = singleIcedDrink
                    for icedCoffeeVarient in icedCoffee["menuItems"]:
                        # find orignal blend under coffee
                        if icedCoffeeVarient["displayName"] == "Original Blend Iced Coffee":
                            # this is the price for a small
                            return icedCoffeeVarient["price"]

# Open the CSV file
with open('data/stores.csv', mode='r', newline='') as file:
    csv_reader = csv.reader(file)
    
    # Iterate over each row in the CSV
    for row in csv_reader:
        # skip first row
        if row[0] == "id":
            continue
        
        price = getPrice(row[0])
        print(f"Price for {row[1]}: {price}")
        #time.sleep(3)
        
        