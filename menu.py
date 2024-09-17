import requests
import csv
import time
import os

TOKEN = "d2f28b0ab69842ac91412d448ad10680"
# in case we need to prevent getting rate limits
WAIT_TIME = 0

# we now have this stores.csv file from the javascript code
# it is our job to parse it and send a request to the DD api
# to get the iced coffee price from each store

with open("data/prices.csv", "a") as p:
    p.write("price,id,address,url,cords\n")

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
        
        time.sleep(WAIT_TIME)
        # get price data
        price = getPrice(row[0])
        
        # create the csv row to go into the brand new csv file
        csv_modified = f'{price},{row[0]},"{row[1]}",{row[2]},"{row[3]},{row[4]}"\n'
        
        # write to the new csv file
        with open("data/prices.csv", "a") as p:
            p.write(csv_modified)
        
# now that all of the data from the old csv file has been extracted, destroy it
os.remove(stores.csv)