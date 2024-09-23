import os
import csv
import json


if not os.path.exists("data/prices.csv"):
    raise ValueError("prices CSV file does not exist, please run shell script")

def convertStateToAbv(stateFullName):
    states = {
        "Alabama": "AL",
        "Alaska": "AK",
        "Arizona": "AZ",
        "Arkansas": "AR",
        "California": "CA",
        "Colorado": "CO",
        "Connecticut": "CT",
        "Delaware": "DE",
        "Florida": "FL",
        "Georgia": "GA",
        "Hawaii": "HI",
        "Idaho": "ID",
        "Illinois": "IL",
        "Indiana": "IN",
        "Iowa": "IA",
        "Kansas": "KS",
        "Kentucky": "KY",
        "Louisiana": "LA",
        "Maine": "ME",
        "Maryland": "MD",
        "Massachusetts": "MA",
        "Michigan": "MI",
        "Minnesota": "MN",
        "Mississippi": "MS",
        "Missouri": "MO",
        "Montana": "MT",
        "Nebraska": "NE",
        "Nevada": "NV",
        "New Hampshire": "NH",
        "New Jersey": "NJ",
        "New Mexico": "NM",
        "New York": "NY",
        "North Carolina": "NC",
        "North Dakota": "ND",
        "Ohio": "OH",
        "Oklahoma": "OK",
        "Oregon": "OR",
        "Pennsylvania": "PA",
        "Rhode Island": "RI",
        "South Carolina": "SC",
        "South Dakota": "SD",
        "Tennessee": "TN",
        "Texas": "TX",
        "Utah": "UT",
        "Vermont": "VT",
        "Virginia": "VA",
        "Washington": "WA",
        # added this to fix states.json error
        "District of Columbia": "DC",
        "West Virginia": "WV",
        "Wisconsin": "WI",
        "Wyoming": "WY"
    }
    
    if stateFullName not in states:
        return None
    return states[stateFullName]


def getAverageByState(stateAbv):

    total = 0
    totalLocations = 0

    with open("data/prices.csv", "r") as c:
        csvl = csv.reader(c)
        for x in csvl:
            if x[0] != "price":
                # now determine if the state matches the input
                addy = x[2]
                state = addy[-2:]
                if state == stateAbv:
                    total += float(x[0])
                    totalLocations += 1
                    
    if totalLocations == 0:
        return -1
    return round(total/totalLocations, 2)

# I'm going to use the attached static_data/states.json file as a template for the OSM map
# Edit each "density" value with the average price, then save the file under frontend/static/states.json

jsonData = None
with open("static_data/states.json", "r") as orginal:
    jsonData = json.loads(orginal.read())

for stateObj in jsonData["features"]:
    name = stateObj["properties"]["name"]
    
    stateAbv = convertStateToAbv(name)
    if stateAbv != None:
        stateObj["properties"]["density"] = getAverageByState(stateAbv)
    else:
        # if the state doesn't exist, it doesn't have dunkin...
        stateObj["properties"]["density"] = -1

# Now, jsonData now contains the data from Dunkin Donuts
# It can be saved into frontend for use in the OSM map

save_path = "../frontend/static/states.json"
if os.path.exists(save_path):
    os.remove(save_path)

with open(save_path, "a") as a:
    a.write(json.dumps(jsonData))